"""
Simplified AI Interview Agent
This version uses higher-level abstractions for easier setup
"""
from dotenv import load_dotenv
from livekit import agents
from livekit.agents import JobContext, WorkerOptions, cli
from livekit.plugins import google, silero
from prompts import INTERVIEWER_AGENT, SESSION_INSTRUCTION

load_dotenv()


async def entrypoint(ctx: JobContext):
    """Called when a participant joins a room"""
    
    print(f"\n{'='*60}")
    print(f"🤖 AI Agent dispatched to room: {ctx.room.name}")
    print(f"{'='*60}\n")
    
    # Connect to the room
    await ctx.connect(auto_subscribe=agents.AutoSubscribe.AUDIO_ONLY)
    
    # Wait for the participant (candidate)
    participant = await ctx.wait_for_participant()
    print(f"Participant detected: {participant.identity}")
    
    # Create the assistant components
    print("🔧 Setting up AI components...")
    
    # Google Text-to-Speech (Agent's voice)
    tts = google.TTS(voice="Aoede")
    print("  ✓ Text-to-Speech ready")
    
    # Google Speech-to-Text (Hearing the candidate)
    stt = google.STT()
    print("  ✓ Speech-to-Text ready")
    
    # Google LLM (Brain)
    llm = google.LLM(model="gemini-2.0-flash-exp")
    print("  ✓ Language Model ready")
    
    # Voice Activity Detection (Detect when candidate is speaking)
    vad = silero.VAD.load()
    print("  ✓ Voice Activity Detection ready")
    
    print("\nStarting interview...\n")
    
    # Speak the greeting
    print(f"Agent: {SESSION_INSTRUCTION}")
    await tts.synthesize_to_room(ctx.room, SESSION_INSTRUCTION)
    
    # Conversation history
    messages = [
        {"role": "system", "content": INTERVIEWER_AGENT},
        {"role": "assistant", "content": SESSION_INSTRUCTION}
    ]
    
    # Listen and respond loop
    async for event in stt.stream():
        if event.is_final and event.alternatives:
            user_text = event.alternatives[0].text.strip()
            
            if user_text:
                print(f"Candidate: {user_text}")
                
                # Add user message to history
                messages.append({"role": "user", "content": user_text})
                
                # Generate AI response
                response = ""
                async for chunk in llm.chat(chat=messages):
                    if hasattr(chunk, 'content'):
                        response += chunk.content
                
                print(f"Agent: {response}\n")
                
                # Add assistant response to history
                messages.append({"role": "assistant", "content": response})
                
                # Speak the response
                await tts.synthesize_to_room(ctx.room, response)


if __name__ == "__main__":
    # Run the agent worker
    cli.run_app(
        WorkerOptions(
            entrypoint_fnc=entrypoint,
        ),
    )