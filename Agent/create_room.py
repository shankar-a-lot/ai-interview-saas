"""
Standalone script to create interview rooms and generate candidate tokens
Run this to set up interviews before starting the agent
"""
import os
import asyncio
from dotenv import load_dotenv
from livekit.api import AccessToken, VideoGrants

load_dotenv()


async def create_interview_room(candidate_name: str, candidate_email: str = None):
    """Create an interview room and generate access credentials"""
    
    livekit_url = os.getenv("LIVEKIT_URL")
    api_key = os.getenv("LIVEKIT_API_KEY")
    api_secret = os.getenv("LIVEKIT_API_SECRET")
    
    if not all([livekit_url, api_key, api_secret]):
        raise ValueError(
            "Missing environment variables. Please set:\n"
            "- LIVEKIT_URL\n"
            "- LIVEKIT_API_KEY\n"
            "- LIVEKIT_API_SECRET"
        )
    
    # Generate room name
    room_name = f"interview-{candidate_name.lower().replace(' ', '-')}"
    
    print(f"✓ Room name: {room_name}")
    print("✓ Generating access token...")
    
    # Generate candidate token
    token = AccessToken(api_key, api_secret)
    token.with_identity(candidate_name)
    token.with_name(candidate_name)
    token.with_grants(
        VideoGrants(
            room_join=True,
            room=room_name,
            can_publish=True,
            can_subscribe=True,
            can_publish_data=True,
        )
    )
    
    candidate_access_token = token.to_jwt()
    candidate_join_url = f"{livekit_url}?token={candidate_access_token}"
    
    # Print results
    print("\n" + "="*70)
    print("INTERVIEW ROOM READY")
    print("="*70)
    print(f"Candidate: {candidate_name}")
    if candidate_email:
        print(f"Email: {candidate_email}")
    print(f"Room: {room_name}")
    print(f"\nCandidate Join URL:")
    print(f"{candidate_join_url}")
    print("\n" + "="*70)
    print("\nIMPORTANT:")
    print("- The room will be created automatically when the candidate joins")
    print("- Make sure your agent is running (python agent.py dev)")
    print("- Share the URL above with the candidate")
    print("="*70 + "\n")
    
    return {
        "room_name": room_name,
        "candidate_token": candidate_access_token,
        "candidate_url": candidate_join_url,
        "livekit_url": livekit_url,
    }


async def main():
    import sys
    
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python create_room.py create <candidate_name> [email]")
        print("\nExamples:")
        print('  python create_room.py create "John Doe"')
        print('  python create_room.py create "John Doe" "john@example.com"')
        return
    
    command = sys.argv[1]
    
    if command == "create":
        if len(sys.argv) < 3:
            print("Please provide candidate name")
            print('Example: python create_room.py create "John Doe"')
            return
        
        candidate_name = sys.argv[2]
        candidate_email = sys.argv[3] if len(sys.argv) > 3 else None
        
        await create_interview_room(candidate_name, candidate_email)
        
        print("\nNext steps:")
        print("1. Share the join URL with the candidate")
        print("2. Start your agent with: python agent.py dev")
        print("   (The agent should be running when the candidate joins)")
    
    else:
        print(f"Unknown command: {command}")
        print("Available commands: create")


if __name__ == "__main__":
    asyncio.run(main())