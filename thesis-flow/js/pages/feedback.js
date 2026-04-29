// ── FEEDBACK PAGE ────────────────────────────────────────────

function renderFeedback(user) {
  const content = document.getElementById('page-content');

  let feedbacks = [];
  if (user.role === 'student') {
    const group = MockDB.getGroupByUserId(user.id);
    feedbacks = group ? MockDB.getFeedbackByGroup(group.id) : [];
  } else if (user.role === 'adviser') {
    const groups = MockDB.getGroupsByAdviserId(user.id).map(g => g.id);
    feedbacks = MockDB.getAllFeedback().filter(f => groups.includes(f.groupId));
  } else if (user.role === 'panelist') {
    const groups = Array.isArray(user.assignedGroups) ? user.assignedGroups : [];
    feedbacks = MockDB.getAllFeedback().filter(f => groups.includes(f.groupId));
  } else {
    feedbacks = MockDB.getAllFeedback();
  }

  // Sort newest first
  feedbacks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  content.innerHTML = `
    <div class="page-header">
      <h2>💬 Feedback & Remarks</h2>
      <p>Review comments and evaluations from faculty advisers.</p>
    </div>

    ${feedbacks.length === 0
      ? `<div class="empty-state"><div class="empty-icon">💬</div><h3>No Feedback Yet</h3><p>No comments or reviews have been posted.</p></div>`
      : `<div class="timeline" style="max-width:800px;">
          ${feedbacks.map(f => renderFeedbackItem(f)).join('')}
         </div>`
    }
  `;
}

function renderFeedbackItem(f) {
  const author = MockDB.getUserById(f.authorId);
  const group  = MockDB.getGroupById(f.groupId);
  const sub    = MockDB.getAllSubmissions().find(s => s.id === f.submissionId);

  const ratingHtml = f.rating
    ? `<div style="color:var(--warning);font-size:0.85rem;margin-bottom:4px;">${'⭐'.repeat(f.rating)}</div>`
    : '';

  return `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <div class="timeline-title">${author ? author.name : 'Unknown Faculty'}</div>
        <div class="timeline-meta">
          ${formatDateTime(f.createdAt)}
          ${sub ? ` · <span style="color:var(--primary-2);">Re: ${sub.title}</span>` : ''}
          ${group && getCurrentUser().role !== 'student' ? ` · <span>👥 ${group.title.slice(0, 30)}…</span>` : ''}
        </div>
        <div class="timeline-body">
          ${ratingHtml}
          ${f.content}
        </div>
      </div>
    </div>
  `;
}
