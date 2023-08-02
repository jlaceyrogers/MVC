document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
        console.info('DOM loaded');
    }

    // Login Form Handler
    const loginForm = document.querySelector('#login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const usernameEl = document.querySelector('#username-input').value.trim();
            const passwordEl = document.querySelector('#password-input').value.trim();
            
            if (usernameEl && passwordEl) {
                const response = await fetch('/api/users/login', {
                    method: 'POST',
                    body: JSON.stringify({ username: usernameEl, password: passwordEl }),
                    headers: { 'Content-Type': 'application/json' },
                });
                
                if (response.ok) {
                    document.location.replace('/dashboard');
                } else {
                    alert('Failed to log in');
                }
            }
        });
    }

    // Sign Up Form Handler
    const signupForm = document.querySelector('#signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const usernameEl = document.querySelector('#username-signup').value.trim();
            const passwordEl = document.querySelector('#password-signup').value.trim();
            
            if (usernameEl && passwordEl) {
                const response = await fetch('/api/users', {
                    method: 'POST',
                    body: JSON.stringify({ username: usernameEl, password: passwordEl }),
                    headers: { 'Content-Type': 'application/json' },
                });
                
                if (response.ok) {
                    document.location.replace('/dashboard');
                } else {
                    alert('Failed to sign up');
                }
            }
        });
    }

    // New Post Handler
    const newPostForm = document.querySelector('#new-post-form');
    if (newPostForm) {
        newPostForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const postTitleEl = document.querySelector('#post-title').value.trim();
            const postContentEl = document.querySelector('#post-content').value.trim();
            
            if (postTitleEl && postContentEl) {
                const response = await fetch('/api/posts', {
                    method: 'POST',
                    body: JSON.stringify({ title: postTitleEl, content: postContentEl }),
                    headers: { 'Content-Type': 'application/json' },
                });
                
                if (response.ok) {
                    document.location.replace('/dashboard');
                } else {
                    alert('Failed to create post');
                }
            }
        });
    }


});
