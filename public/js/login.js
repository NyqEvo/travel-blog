const loginFormHandler = async (event) => {
    event.preventDefault();
    const name = document.querySelector('#name-signup').value.trim();
  
    // Collect values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    const signupEmail = document.querySelector('#email-signup').value.trim();
    const signupPassword = document.querySelector('#password-signup').value.trim();
  
    if (email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/displayposts');
      } else {
        alert(response.statusText);
      }
    }

    if (name && signupEmail && signupPassword) {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/displayposts');
      } else {
        alert(response.statusText);
      }
    }
  };

  document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);


  document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
