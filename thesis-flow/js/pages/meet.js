// ── NATIVE MEET PAGE (PeerJS) ───────────────────────────────────

let localStream = null;
let myPeer = null;
const peers = {}; // Track active calls

function renderMeet(user) {
  const content = document.getElementById('page-content');
  
  // Suggest a room based on group
  const group = MockDB.getGroupByUserId(user.id);
  const roomName = group ? group.title : (user.role === 'adviser' ? 'Faculty Consultation' : 'Personal Room');

  content.innerHTML = `
    <div class="page-header">
      <h2>📹 Native Meet</h2>
      <p>Secure, built-in video conferencing for your thesis team.</p>
    </div>

    <div id="meet-setup" class="card" style="max-width: 500px; margin: 0 auto;">
      <div style="text-align:center; padding: 20px 0;">
        <div style="font-size: 64px; margin-bottom: 20px;">🛡️</div>
        <h3 style="font-family:'Outfit',sans-serif; margin-bottom: 10px;">Ready to join?</h3>
        <p style="color:var(--text-2); font-size:0.9rem; margin-bottom:24px;">
          You are joining: <strong>${roomName}</strong>
        </p>
        
        <div id="media-preview" class="media-preview">
          <div class="preview-placeholder">Camera is off</div>
          <video id="local-preview-video" autoplay muted playsinline class="hidden"></video>
        </div>

        <div style="display:flex; gap:10px; justify-content:center; margin: 20px 0;">
          <button id="btn-toggle-cam-init" class="btn-sm btn-outline" onclick="togglePreviewVideo()">📷 Toggle Camera</button>
          <button id="btn-toggle-mic-init" class="btn-sm btn-outline" onclick="togglePreviewAudio()">🎤 Toggle Mic</button>
        </div>

        <button class="btn-primary btn-full" onclick="joinNativeMeeting()">
          Join Meeting Now
        </button>
      </div>
    </div>

    <div id="meet-active" class="meet-active-container hidden">
      <div id="video-grid" class="video-grid">
        <!-- Videos will be injected here -->
      </div>

      <div class="meet-controls">
        <button class="control-btn" onclick="toggleMic()" id="mic-btn" title="Toggle Mic">🎤</button>
        <button class="control-btn" onclick="toggleCam()" id="cam-btn" title="Toggle Camera">📷</button>
        <button class="control-btn btn-danger" onclick="leaveMeeting()" title="Leave Meeting">🛑</button>
      </div>
    </div>
  `;

  // Try to get initial stream for preview
  initMediaPreview();
}

async function initMediaPreview() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localStream = stream;
    const video = document.getElementById('local-preview-video');
    const placeholder = document.querySelector('.preview-placeholder');
    if (video) {
      video.srcObject = stream;
      video.classList.remove('hidden');
      placeholder.classList.add('hidden');
    }
  } catch (err) {
    console.error("Media Error:", err);
    showToast("Could not access camera/mic. Please check permissions.", "error");
  }
}

function togglePreviewVideo() {
  if (localStream) {
    const videoTrack = localStream.getVideoTracks()[0];
    videoTrack.enabled = !videoTrack.enabled;
    document.getElementById('local-preview-video').style.opacity = videoTrack.enabled ? '1' : '0.2';
  }
}

function togglePreviewAudio() {
  if (localStream) {
    const audioTrack = localStream.getAudioTracks()[0];
    audioTrack.enabled = !audioTrack.enabled;
  }
}

async function joinNativeMeeting() {
  const user = getCurrentUser();
  const setup = document.getElementById('meet-setup');
  const active = document.getElementById('meet-active');

  setup.classList.add('hidden');
  active.classList.remove('hidden');

  // Initialize PeerJS (defaults to PeerJS Cloud)
  myPeer = new Peer('TF-' + user.id);
  
  // Add local stream immediately so the user sees themselves
  addVideoStream(localStream, user.name, true);

  myPeer.on('open', id => {
    console.log('My peer ID is: ' + id);
    discoverPeers(user);
  });

  myPeer.on('call', call => {
    call.answer(localStream);
    const peerUser = MockDB.getUserById(call.peer.replace('TF-', ''));
    const name = peerUser ? peerUser.name : 'Participant';
    
    call.on('stream', userStream => {
      addVideoStream(userStream, name, false, call.peer);
    });
  });

  showToast("Meeting started", "success");
}

function discoverPeers(user) {
  // Logic: In a real app, a backend tells us who is online.
  // In this mock, we try to call everyone in the same group.
  const group = MockDB.getGroupByUserId(user.id);
  if (!group) return;

  const membersToCall = group.memberIds.filter(id => id !== user.id);
  if (group.adviserId) membersToCall.push(group.adviserId);

  membersToCall.forEach(memberId => {
    const peerId = 'TF-' + memberId;
    console.log("Attempting to call:", peerId);
    
    // We try to call them. If they aren't online, it just fails silently or times out.
    const call = myPeer.call(peerId, localStream);
    
    if (call) {
      const peerUser = MockDB.getUserById(memberId);
      call.on('stream', userStream => {
        addVideoStream(userStream, peerUser.name, false, peerId);
      });
      peers[peerId] = call;
    }
  });
}

function addVideoStream(stream, name, isLocal = false, peerId = null) {
  const grid = document.getElementById('video-grid');
  
  // Avoid duplicates
  if (peerId && document.getElementById('video-' + peerId)) return;

  const container = document.createElement('div');
  container.className = 'video-container glass-card';
  if (peerId) container.id = 'video-' + peerId;

  const video = document.createElement('video');
  video.srcObject = stream;
  video.autoplay = true;
  video.playsinline = true;
  if (isLocal) video.muted = true;

  const label = document.createElement('div');
  label.className = 'video-label';
  label.textContent = isLocal ? name + ' (You)' : name;

  container.appendChild(video);
  container.appendChild(label);
  grid.appendChild(container);
  
  // Explicitly play the video
  video.play().catch(e => console.warn("Video play failed:", e));
  
  updateGridLayout();
}

function updateGridLayout() {
  const grid = document.getElementById('video-grid');
  const count = grid.children.length;
  if (count <= 1) grid.style.gridTemplateColumns = '1fr';
  else if (count <= 2) grid.style.gridTemplateColumns = '1fr 1fr';
  else grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
}

function toggleMic() {
  if (localStream) {
    const audioTrack = localStream.getAudioTracks()[0];
    audioTrack.enabled = !audioTrack.enabled;
    document.getElementById('mic-btn').textContent = audioTrack.enabled ? '🎤' : '🔇';
    document.getElementById('mic-btn').classList.toggle('off', !audioTrack.enabled);
  }
}

function toggleCam() {
  if (localStream) {
    const videoTrack = localStream.getVideoTracks()[0];
    videoTrack.enabled = !videoTrack.enabled;
    document.getElementById('cam-btn').textContent = videoTrack.enabled ? '📷' : '❌';
    document.getElementById('cam-btn').classList.toggle('off', !videoTrack.enabled);
  }
}

function leaveMeeting() {
  confirmAction("Are you sure you want to leave?", () => {
    if (myPeer) myPeer.destroy();
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    navigateTo('dashboard');
    showToast("Left meeting", "info");
  });
}
