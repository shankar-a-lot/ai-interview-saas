import asyncio
import csv
import json
from datetime import datetime
from livekit import agents, noise_cancellation

# Assuming INTERVIEWER_AGENT and SESSION_INSTRUCTION are defined elsewhere
INTERVIEWER_AGENT = "You are an interviewer for [Candidate Name]..."
SESSION_INSTRUCTION = "Start the interview process."

class InterviewAgent(agents.Agent):
    def __init__(self, candidate_name: str = "Candidate", role_applied: str = "Software Engineer", mode: str = "full_pipeline"):
        super().__init__(
            instructions=INTERVIEWER_AGENT.replace("[Candidate Name]", candidate_name),
            llm=agents.google.beta.realtime.RealtimeModel(
                voice="Aoede",
                temperature=0.5,
                max_output_tokens=500,
            ),
        )
        self.candidate_name = candidate_name
        self.role_applied = role_applied
        self.mode = mode
        self.question_count = 0
        self.transcript = []
        self.start_time = datetime.now()
        self.candidates = {}
        self.templates = {
            "Software Engineer": [
                "What programming languages are you comfortable with?",
                "How have you applied them in projects?",
                "What’s your greatest strength?",
                "Share a team project challenge.",
                "What area do you want to improve?",
                "How do you stay updated with tech?",
                "Where do you see yourself in five years?",
                "Describe a complex problem you solved.",
                "How do you handle deadlines?",
                "What motivates you in this role?",
                "How do you ensure code quality?"
            ],
            "HR": ["Tell me about your HR experience.", "How do you handle conflicts?"]
        }

    async def on_message(self, msg: str, session: agents.AgentSession):
        print(f"Received message: {msg}")  # Debug log
        self.transcript.append(f"Candidate: {msg}")
        self.question_count += 1

        if self.question_count == 1:
            print(f"Step 1: Sending welcome message for {self.mode} mode")
            if self.mode == "full_pipeline":
                await session.send_text(f"Welcome, {self.candidate_name}! A job for {self.role_applied} has been posted. Please apply or confirm invitation.")
            else:
                await session.send_text(f"Welcome, {self.candidate_name}! You’ve been scheduled for a {self.role_applied} interview. Please log in.")
            return

        if self.question_count == 2:
            print("Step 2: Prompting for login")
            login = input("Login: Enter credentials (e.g., username): ").strip()
            print(f"Login entered: {login}")
            if not login:
                await session.send_text("Invalid login. Please try again or restart.")
                return
            print("Step 2: Skipping system check (typing mode)")
            print("Step 2: Proceeding to intro")
            await session.send_text(f"Great, {self.candidate_name}! Tell me about yourself and the {self.role_applied} role you applied for.")
            return

        if self.question_count == 3:
            print(f"Step 3: Asking first question: {self.templates[self.role_applied][0]}")
            await session.send_text(f"Thanks for the intro! {self.templates[self.role_applied][0]}")
        elif 4 <= self.question_count <= 3 + len(self.templates[self.role_applied]):
            idx = self.question_count - 4
            if idx < len(self.templates[self.role_applied]):
                question = self.templates[self.role_applied][idx]
                print(f"Step 4+: Asking question {idx + 1}: {question}")
                if len(msg.split()) < 5 and idx > 0:
                    await session.send_text(f"Can you elaborate on {self.templates[self.role_applied][idx-1].lower()}?")
                else:
                    await session.send_text(f"{question}")
            else:
                print("All questions asked, ending interview")
                await self.end_interview(session)
        else:
            print("Forcing interview end")
            await self.end_interview(session)

    async def end_interview(self, session: agents.AgentSession):
        print("Ending interview and generating report")
        await session.send_text("Interview complete. Thank you!")
        try:
            await self.evaluate_and_report()
            self.save_transcript()
            self.update_candidate_status()
        except Exception as e:
            print(f"Error during end process: {e}")
        finally:
            print("End process completed")
            await asyncio.sleep(5)  # Ensure report displays

    async def evaluate_and_report(self):
        print("Evaluating and generating report")
        if not self.transcript:
            print("Warning: Transcript is empty, using default scores")
            technical_score = 50
            soft_skills_score = 50
        else:
            technical_score = 70 + min(20, sum(1 for msg in self.transcript if any(lang in msg.lower() for lang in ["python", "java", "javascript"])))
            soft_skills_score = 75 + min(15, sum(1 for msg in self.transcript if "team" in msg.lower() or "communicat" in msg.lower()))
        job_fit_score = (technical_score + soft_skills_score) // 2

        evaluation = {
            "technical": {"score": technical_score, "explanation": "Based on technical skills."},
            "soft_skills": {"score": soft_skills_score, "explanation": "Based on teamwork/communication."},
            "job_fit": {"score": job_fit_score, "explanation": "Overall recommendation."}
        }
        print("\nAuto-generated Evaluation Report:")
        print(json.dumps(evaluation, indent=2))

    def save_transcript(self):
        filename = f"{self.candidate_name}_transcript_{self.start_time.strftime('%Y%m%d_%H%M%S')}.csv"
        with open(filename, "w", newline='') as f:
            writer = csv.writer(f)
            writer.writerow(["Speaker", "Message"])
            for line in self.transcript:
                speaker, message = line.split(":", 1)
                writer.writerow([speaker, message.strip()])
        print(f"Transcript saved as {filename}")
        print(f"PDF export simulated for {self.candidate_name}")

    def update_candidate_status(self):
        self.candidates[self.candidate_name] = {
            "status": "Completed",
            "role": self.role_applied,
            "timestamp": self.start_time.strftime("%Y-%m-%d %H:%M:%S"),
            "evaluation": {"summary": "Interview completed, see report."}
        }
        print("Recruiter Dashboard Update:")
        print(json.dumps(self.candidates, indent=2))

async def entrypoint(ctx: agents.JobContext):
    mode = "full_pipeline"
    candidate_name = input("Enter candidate name: ") or "John"
    role_applied = input("Enter role applied (e.g., Software Engineer, HR): ") or "Software Engineer"
    print(f"Starting interview for {candidate_name} as {role_applied}")
    agent = InterviewAgent(candidate_name, role_applied, mode)

    session = agents.AgentSession()

    await session.start(
        room=ctx.room,
        agent=agent,
        room_input_options=agents.RoomInputOptions(
            video_enabled=False,  # Disable video to avoid audio issues
            noise_cancellation=noise_cancellation.BVC(),
        ),
    )

    await ctx.connect()

    await session.generate_reply(instructions=SESSION_INSTRUCTION)

if __name__ == "__main__":
    agents.cli.run_app(agents.WorkerOptions(entrypoint_fnc=entrypoint))