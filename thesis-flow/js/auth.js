// ── AUTH ─────────────────────────────────────────────────────

let currentUser = null;

function getCurrentUser() { return currentUser; }

function switchAuthTab(tab) {
  const loginForm = document.getElementById('form-login');
  const regForm   = document.getElementById('form-register');
  const tabLogin  = document.getElementById('tab-login');
  const tabReg    = document.getElementById('tab-register');
  if (tab === 'login') {
    loginForm.classList.remove('hidden');
    regForm.classList.add('hidden');
    tabLogin.classList.add('active');
    tabReg.classList.remove('active');
  } else {
    regForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    tabReg.classList.add('active');
    tabLogin.classList.remove('active');
  }
}

function handleLogin(e) {
  e.preventDefault();
  const email    = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const errEl    = document.getElementById('login-error');
  const btn      = document.getElementById('btn-login');
  const loader   = btn.querySelector('.btn-loader');
  const text     = btn.querySelector('.btn-text');

  errEl.classList.add('hidden');
  text.classList.add('hidden');
  loader.classList.remove('hidden');
  btn.disabled = true;

  setTimeout(() => {
    const user = MockDB.getUserByEmail(email);
    if (!user || user.password !== password) {
      errEl.textContent = 'Invalid email or password. Try the demo credentials below.';
      errEl.classList.remove('hidden');
      text.classList.remove('hidden');
      loader.classList.add('hidden');
      btn.disabled = false;
      return;
    }
    currentUser = user;
    sessionStorage.setItem('tf_user', JSON.stringify(user));
    text.classList.remove('hidden');
    loader.classList.add('hidden');
    btn.disabled = false;
    bootApp();
  }, 800);
}

function handleRegister(e) {
  e.preventDefault();
  const name     = document.getElementById('reg-name').value.trim();
  const email    = document.getElementById('reg-email').value.trim();
  const role     = document.getElementById('reg-role').value;
  const password = document.getElementById('reg-password').value;
  const errEl    = document.getElementById('reg-error');

  errEl.classList.add('hidden');

  if (!email.toLowerCase().endsWith('@plmun.edu.ph')) {
    errEl.textContent = 'Please use your official @plmun.edu.ph email address.';
    errEl.classList.remove('hidden');
    return;
  }

  if (MockDB.getUserByEmail(email)) {
    errEl.textContent = 'An account with this email already exists.';
    errEl.classList.remove('hidden');
    return;
  }
  if (password.length < 8) {
    errEl.textContent = 'Password must be at least 8 characters.';
    errEl.classList.remove('hidden');
    return;
  }

  const newUser = {
    id: MockDB.genId('u'),
    name, email, password, role,
    groupId: null,
    avatar: name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2),
    createdAt: new Date().toISOString().split('T')[0]
  };
  MockDB.addUser(newUser);
  currentUser = newUser;
  sessionStorage.setItem('tf_user', JSON.stringify(newUser));
  showToast('Account created! Welcome to ThesisFlow.', 'success');
  bootApp();
}

function handleLogout() {
  currentUser = null;
  sessionStorage.removeItem('tf_user');
  document.getElementById('screen-app').classList.add('hidden');
  document.getElementById('screen-app').classList.remove('active');
  document.getElementById('screen-auth').classList.add('active');
  document.getElementById('screen-auth').classList.remove('hidden');
  document.getElementById('form-login').reset();
  switchAuthTab('login');
}

function tryRestoreSession() {
  try {
    const saved = sessionStorage.getItem('tf_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Re-fetch from MockDB to get latest data
      const fresh = MockDB.getUserById(parsed.id);
      if (fresh) { currentUser = fresh; return true; }
    }
  } catch(_) {}
  return false;
}
