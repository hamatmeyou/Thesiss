const ClassData = [
  { id: 1, title: 'Advanced Web Systems', code: 'CS-402', teacher: 'Prof. Sarah Jenkins' },
  { id: 2, title: 'Artificial Intelligence', code: 'CS-301', teacher: 'Dr. James Wilson' },
  { id: 3, title: 'Cybersecurity Fundamentals', code: 'IT-305', teacher: 'Prof. Elena Rodriguez' },
  { id: 4, title: 'Cloud Infrastructure', code: 'IT-408', teacher: 'Dr. Michael Chen' }
];

const UI = {
  dashboard: document.querySelector('main'),
  classGrid: document.getElementById('class-grid'),
  brand: document.querySelector('.brand'),
  modal: document.getElementById('modal-overlay'),
  modalContent: document.getElementById('modal-content'),
  
  init() {
    this.setupEventListeners();
    console.log('CampusFlow Initialized');
  },

  setupEventListeners() {
    // Class Card Clicks
    document.querySelectorAll('.class-card').forEach((card, index) => {
      card.onclick = () => this.openClassroom(ClassData[index]);
    });

    // Brand Click (Return to Dashboard)
    this.brand.onclick = () => this.showDashboard();

    // Modal Triggers
    document.getElementById('btn-join').onclick = () => this.showModal('join');
    document.getElementById('btn-create').onclick = () => this.showModal('create');
  },

  showModal(type) {
    this.modal.classList.remove('hidden');
    if (type === 'join') {
      this.modalContent.innerHTML = `
        <h2 style="font-family: var(--font-heading); margin-bottom: 1.5rem;">Join Class</h2>
        <p style="color: var(--text-muted); margin-bottom: 1rem;">Enter the class code provided by your instructor.</p>
        <input type="text" placeholder="Class Code (e.g. abc-123)" style="width: 100%; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); padding: 0.75rem; border-radius: 12px; color: white; margin-bottom: 1.5rem;">
        <button class="btn btn-primary" style="width: 100%; justify-content: center;">Join Class</button>
      `;
    } else {
      this.modalContent.innerHTML = `
        <h2 style="font-family: var(--font-heading); margin-bottom: 1.5rem;">Create Class</h2>
        <input type="text" placeholder="Class Name" style="width: 100%; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); padding: 0.75rem; border-radius: 12px; color: white; margin-bottom: 1rem;">
        <input type="text" placeholder="Subject / Section" style="width: 100%; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); padding: 0.75rem; border-radius: 12px; color: white; margin-bottom: 1.5rem;">
        <button class="btn btn-primary" style="width: 100%; justify-content: center;">Create Class</button>
      `;
    }
  },

  openClassroom(classObj) {
    this.dashboard.classList.add('animate-fade-out');
    
    setTimeout(() => {
      this.dashboard.innerHTML = `
        <section class="classroom-header animate-fade-in">
          <button class="btn btn-ghost" onclick="UI.showDashboard()" style="margin-bottom: 1rem;">← Back to Dashboard</button>
          <h1 style="font-family: var(--font-heading); font-size: 2.5rem; margin-bottom: 0.5rem;">${classObj.title}</h1>
          <p style="color: var(--secondary); font-weight: 600;">${classObj.code} • ${classObj.teacher}</p>
        </section>

        <div class="classroom-container">
          <aside class="classroom-nav animate-fade-in" style="animation-delay: 0.1s;">
            <div class="nav-item active">📢 Stream</div>
            <div class="nav-item">📚 Classwork</div>
            <div class="nav-item">👥 People</div>
            <div class="nav-item">📈 Grades</div>
          </aside>

          <div class="content-area animate-fade-in" style="animation-delay: 0.2s;">
            <div class="glass-card">
              <div class="post-input" style="display: flex; gap: 1rem; align-items: center;">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" style="width: 40px; border-radius: 50%;">
                <input type="text" placeholder="Announce something to your class..." style="flex: 1; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); padding: 0.75rem; border-radius: 12px; color: white;">
              </div>
            </div>

            <div class="glass-card feed-post">
              <div class="post-header">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" style="width: 40px; border-radius: 50%;">
                <div>
                  <div class="post-author">${classObj.teacher}</div>
                  <div class="post-date">Posted 2 hours ago</div>
                </div>
              </div>
              <p>Welcome to the new semester! I've uploaded the syllabus and the first module in the Classwork section. Please review them before our next meeting.</p>
              <div style="margin-top: 1rem; padding: 1rem; background: rgba(0,0,0,0.2); border-radius: 12px; display: flex; align-items: center; gap: 1rem;">
                <span style="font-size: 1.5rem;">📄</span>
                <div>
                  <div style="font-weight: 500;">Syllabus_Spring2026.pdf</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">2.4 MB • PDF Document</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      window.scrollTo(0, 0);
    }, 300);
  },

  showDashboard() {
    location.reload(); // Simple way for demo to reset state
  }
};

document.addEventListener('DOMContentLoaded', () => UI.init());
