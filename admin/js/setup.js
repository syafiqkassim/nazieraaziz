const setupForm = document.getElementById('setupForm');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const togglePassword = document.getElementById('togglePassword');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
const setupButton = document.getElementById('setupButton');
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
    setupButton.disabled = true;
    spinner.classList.add('active');
  } else {
    setupButton.disabled = false;
    spinner.classList.remove('active');
  }
}

function toggleVisibility(input, button) {
  const isHidden = input.type === 'password';
  input.type = isHidden ? 'text' : 'password';
  button.textContent = isHidden ? 'Hide' : 'Show';
  button.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
}

[togglePassword, toggleConfirmPassword].forEach((button) => {
  button.addEventListener('click', () => {
    const targetInput = button.id === 'toggleConfirmPassword' ? confirmPasswordInput : passwordInput;
    toggleVisibility(targetInput, button);
  });
});

setupForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  clearNotification();

  const fullName = setupForm.fullName.value.trim();
  const email = setupForm.email.value.trim();
  const password = setupForm.password.value;
  const confirmPassword = setupForm.confirmPassword.value;

  if (!fullName || !email || !password || !confirmPassword) {
    showNotification('error', 'Please complete every field.');
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showNotification('error', 'Please enter a valid email address.');
    return;
  }

  if (password.length < 8) {
    showNotification('error', 'Password must be at least 8 characters long.');
    return;
  }

  if (password !== confirmPassword) {
    showNotification('error', 'Passwords do not match.');
    return;
  }

  setLoading(true);

  try {
    const response = await fetch('/api/setup', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ fullName, email, password, confirmPassword }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || 'Unable to create the administrator.');
    }

    showNotification('success', data.message || 'Administrator created successfully.');
    setupForm.reset();
  } catch (error) {
    showNotification('error', error.message || 'Unable to create the administrator.');
  } finally {
    setLoading(false);
  }
});
