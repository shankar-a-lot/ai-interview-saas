# 🎙️ LiveKit Voice Interviewer

This project is a **voice-based interviewer agent** powered by [LiveKit](https://livekit.io/). It connects to a LiveKit cloud instance and uses AI to handle real-time voice conversations.  

## 🚀 Features
- Real-time voice streaming with LiveKit  
- AI-powered interviewer agent  
- Easy to configure via environment variables  
- Run directly from the console  

---

## 📦 Setup

### 1. Download the project files
Place them in a working directory of your choice.  

### 2. Create and activate virtual environment (optional but recommended)
```bash
python -m venv venv
source venv/bin/activate   # On Linux/Mac
venv\Scripts\activate      # On Windows
3. Install dependencies
bash
Copy code
pip install -r requirements.txt
⚙️ Environment Variables
Create a .env file in the root directory and add the following values:

env
Copy code
LIVEKIT_URL=wss://your-instance.livekit.cloud
LIVEKIT_API_KEY=your_api_key_here
LIVEKIT_API_SECRET=your_api_secret_here

GOOGLE_API_KEY=your_google_api_key_here
🔑 How to get credentials:

Sign up or log in to LiveKit Cloud

Create a project and generate your LIVEKIT_URL, LIVEKIT_API_KEY, and LIVEKIT_API_SECRET

For GOOGLE_API_KEY, create one in Google Cloud Console

▶️ Running the Agent
Run the interviewer agent with:

bash
Copy code
python agent.py console
This will connect to LiveKit and launch the voice interviewer.