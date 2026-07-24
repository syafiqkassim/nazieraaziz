const loginForm = document.getElementById('loginForm');
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const loginButton = document.getElementById('loginButton');
const spinner = document.getElementById('spinner');
const notification = document.getElementById('notification');

function showNotification(type, message) {
  notification.textContent = message;
  notification.className = `notification notification-visible notification--${type}`;
}

function clearNotification() {
  notification.textContent = '';
  notification.className = 'notification notification-hidden';
}

function setLoading(isLoading) {
  if (isLoading) {
    loginButton.disabled = true;
    spinner.classList.add('active');
  } else {
    loginButton.disabled = false;
    spinner.classList.remove('active');
  }
}

togglePassword.addEventListener('click', () => {
  const isPasswordVisible = passwordInput.type === 'text';
  passwordInput.type = isPasswordVisible ? 'password' : 'text';
  togglePassword.textContent = isPasswordVisible ? 'Show' : 'Hide';
  togglePassword.setAttribute('aria-label', isPasswordVisible ? 'Show password' : 'Hide password');
});

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  clearNotification();

  const email = loginForm.email.value.trim();
  const password = loginForm.password.value.trim();

  if (!email || !password) {
    showNotification('error', 'Please enter both email and password.');
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showNotification('error', 'Please enter a valid email address.');
    return;
  }

  setLoading(true);

  try {
    const resp = await fetch('/api/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await resp.json().catch(() => ({}));

    if (resp.ok) {
      showNotification('success', data.message || 'Login successful. Redirecting...');
      setTimeout(() => {
        window.location.href = data.redirect || '/admin/dashboard.html';
      }, 600);
      return;
    }

    const message = data.error || (resp.status === 401 ? 'Invalid email or password.' : 'Login failed.');
    showNotification('error', message);
  } catch (err) {
    showNotification('error', 'Network error. Please try again.');
  } finally {
    setLoading(false);
  }
});
