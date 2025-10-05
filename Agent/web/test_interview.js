// Global variables
let room;
let connected = false;
let audioElements = new Map(); // Track audio elements for cleanup

// Wait for LiveKit to load
function checkLiveKitLoaded() {
    if (typeof LivekitClient === 'undefined') {
        console.error('LiveKit client not loaded yet');
        updateStatus('Loading LiveKit SDK...', 'connecting');
        setTimeout(checkLiveKitLoaded, 100);
        return false;
    }
    console.log('LiveKit client loaded successfully');
    return true;
}

// Initialize when page loads
window.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded, checking LiveKit...');
    if (checkLiveKitLoaded()) {
        updateStatus('Ready to connect', 'disconnected');
    }
});

// Update status message
function updateStatus(message, type) {
    const statusEl = document.getElementById('status');
    statusEl.textContent = message;
    statusEl.className = `status ${type}`;
}

// Update participant list
function updateParticipants() {
    const listEl = document.getElementById('participantList');
    const infoEl = document.getElementById('participantInfo');
    
    // Safety check - make sure room exists and is connected
    if (!room || !room.state || room.state !== 'connected') {
        infoEl.classList.remove('show');
        return;
    }
    
    // Check if participants exist
    const hasRemoteParticipants = room.participants && room.participants.size > 0;
    
    if (!hasRemoteParticipants && !room.localParticipant) {
        infoEl.classList.remove('show');
        return;
    }

    infoEl.classList.add('show');
    listEl.innerHTML = '';

    // Add local participant (you)
    if (room.localParticipant) {
        const localDiv = document.createElement('div');
        localDiv.className = 'participant-item';
        localDiv.innerHTML = `<span class="audio-indicator"></span> You (${room.localParticipant.identity})`;
        listEl.appendChild(localDiv);
    }

    // Add remote participants (AI agent)
    if (hasRemoteParticipants) {
        room.participants.forEach((participant) => {
            const div = document.createElement('div');
            div.className = 'participant-item';
            div.innerHTML = `<span class="audio-indicator"></span> ${participant.identity}`;
            listEl.appendChild(div);
        });
    }
}

// Connect to the interview room
async function connect() {
    // Check if LiveKit is loaded
    if (typeof LivekitClient === 'undefined') {
        updateStatus('Error: LiveKit SDK not loaded. Please refresh the page.', 'error');
        console.error('LivekitClient is not defined');
        return;
    }

    const serverUrl = document.getElementById('serverUrl').value.trim();
    const token = document.getElementById('token').value.trim();

    if (!serverUrl || !token) {
        updateStatus('Please enter both server URL and token', 'error');
        return;
    }

    const connectBtn = document.getElementById('connectBtn');
    const disconnectBtn = document.getElementById('disconnectBtn');
    
    connectBtn.disabled = true;
    updateStatus('Connecting to interview room...', 'connecting');

    try {
        // Create a new LiveKit room with optimized settings
        room = new LivekitClient.Room({
            adaptiveStream: true,
            dynacast: true,
            audioCaptureDefaults: {
                autoGainControl: true,
                echoCancellation: true,
                noiseSuppression: true,
            },
        });

        // Event: When a participant joins
        room.on('participantConnected', (participant) => {
            console.log('Participant joined:', participant.identity);
            updateParticipants();
            
            // If it's the AI agent joining
            if (participant.identity.toLowerCase().includes('agent') || 
                participant.identity.toLowerCase().includes('ai') ||
                participant.identity.toLowerCase().includes('friday')) {
                updateStatus('AI Interviewer (Friday) has joined! Listen carefully.', 'connected');
            }
        });

        // Event: When a participant leaves
        room.on('participantDisconnected', (participant) => {
            console.log('Participant left:', participant.identity);
            updateParticipants();
            
            // Clean up audio elements for this participant
            if (audioElements.has(participant.sid)) {
                const elements = audioElements.get(participant.sid);
                elements.forEach(el => el.remove());
                audioElements.delete(participant.sid);
            }
        });

        // Event: When a new track (audio/video) is available
        room.on('trackSubscribed', (track, publication, participant) => {
            console.log('Track subscribed:', track.kind, 'from', participant.identity);
            
            if (track.kind === 'audio') {
                try {
                    // Attach the audio track to play it
                    const audioElement = track.attach();
                    audioElement.volume = 1.0; // Max volume
                    audioElement.autoplay = true; // Ensure autoplay
                    
                    // Store reference for cleanup
                    if (!audioElements.has(participant.sid)) {
                        audioElements.set(participant.sid, []);
                    }
                    audioElements.get(participant.sid).push(audioElement);
                    
                    document.body.appendChild(audioElement);
                    console.log('Audio track attached and playing from:', participant.identity);
                    
                    // Log playback status
                    audioElement.onplay = () => console.log('Audio playing from:', participant.identity);
                    audioElement.onerror = (e) => console.error('Audio playback error:', e);
                } catch (error) {
                    console.error('Error attaching audio track:', error);
                }
            }
        });

        // Event: When a track is removed
        room.on('trackUnsubscribed', (track, publication, participant) => {
            console.log('Track unsubscribed:', track.kind, 'from', participant.identity);
            const elements = track.detach();
            elements.forEach(element => {
                element.remove();
                // Remove from our tracking map
                if (audioElements.has(participant.sid)) {
                    const elementList = audioElements.get(participant.sid);
                    const index = elementList.indexOf(element);
                    if (index > -1) {
                        elementList.splice(index, 1);
                    }
                }
            });
        });

        // Event: When disconnected from room
        room.on('disconnected', () => {
            console.log('Disconnected from room');
            updateStatus('Disconnected from interview', 'disconnected');
            connectBtn.disabled = false;
            disconnectBtn.classList.remove('show');
            connected = false;
            document.getElementById('participantInfo').classList.remove('show');
            
            // Clean up all audio elements
            audioElements.forEach(elements => {
                elements.forEach(el => el.remove());
            });
            audioElements.clear();
        });

        // Event: Connection state changed
        room.on('connectionStateChanged', (state) => {
            console.log('Connection state changed:', state);
            
            if (state === 'connected') {
                console.log('Fully connected to room');
            } else if (state === 'reconnecting') {
                updateStatus('Reconnecting...', 'connecting');
            }
        });

        // Event: Connection quality changed
        room.on('connectionQualityChanged', (quality, participant) => {
            console.log('Connection quality:', quality, 'for', participant.identity);
        });

        // Connect to the LiveKit room
        console.log('Attempting to connect...');
        await room.connect(serverUrl, token);
        
        console.log('Connected to room:', room.name);
        console.log('Room state:', room.state);
        updateStatus('Connected! Enabling microphone...', 'connecting');
        
        // Enable microphone with error handling
        try {
            await room.localParticipant.setMicrophoneEnabled(true);
            console.log('Microphone enabled');
            updateStatus('Microphone enabled. Waiting for AI interviewer...', 'connected');
        } catch (micError) {
            console.error('Microphone access denied:', micError);
            updateStatus('⚠️ Microphone access denied. Please allow microphone access and try again.', 'error');
            await room.disconnect();
            connectBtn.disabled = false;
            return;
        }
        
        connected = true;
        connectBtn.disabled = true;
        disconnectBtn.classList.add('show');
        
        // Wait a bit before updating participants to ensure room is fully connected
        setTimeout(() => {
            updateParticipants();
            
            // Check if agent is already in the room
            if (room.participants && room.participants.size > 0) {
                updateStatus('AI Interviewer (Friday) is ready! The interview will begin shortly.', 'connected');
            } else {
                updateStatus('Connected! Waiting for AI interviewer to join...', 'connected');
            }
        }, 1000);

    } catch (error) {
        console.error('Connection error:', error);
        let errorMessage = 'Connection failed';
        
        // Provide more specific error messages
        if (error.message.includes('token')) {
            errorMessage = 'Invalid token. Please check your access token.';
        } else if (error.message.includes('timeout')) {
            errorMessage = 'Connection timeout. Please check your internet connection.';
        } else {
            errorMessage = `Connection failed: ${error.message}`;
        }
        
        updateStatus(errorMessage, 'error');
        connectBtn.disabled = false;
    }
}

// Disconnect from the room
async function disconnect() {
    if (room) {
        console.log('Disconnecting from room...');
        await room.disconnect();
        room = null;
        connected = false;
        document.getElementById('connectBtn').disabled = false;
        document.getElementById('disconnectBtn').classList.remove('show');
        updateStatus('You have left the interview', 'disconnected');
        document.getElementById('participantInfo').classList.remove('show');
        
        // Clean up all audio elements
        audioElements.forEach(elements => {
            elements.forEach(el => el.remove());
        });
        audioElements.clear();
    }
}

// Handle page unload (close/refresh)
window.addEventListener('beforeunload', () => {
    if (connected && room) {
        room.disconnect();
    }
});

// Log when script loads
console.log('Interview client script loaded successfully');