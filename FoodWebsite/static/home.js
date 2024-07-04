document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('#pills-login form');
    const registerForm = document.querySelector('#pills-register form');

    // Login form submission
    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(this);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message); // Success message
            } else {
                const errorData = await response.json();
                alert(errorData.message); // Error message
            }
        } catch (error) {
            console.error('Login Error:', error);
            alert('An error occurred during login. Please try again later.');
        }
    });

    // Register form submission
    registerForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(this);
        const name = formData.get('name');
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        const repeatPassword = formData.get('repeatPassword');

        // Add client-side validation for registration form if needed

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, username, email, password, repeatPassword })
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message); // Success message
            } else {
                const errorData = await response.json();
                alert(errorData.message); // Error message
            }
        } catch (error) {
            console.error('Registration Error:', error);
            alert('An error occurred during registration. Please try again later.');
        }
    });
});
