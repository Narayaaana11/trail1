document.addEventListener('DOMContentLoaded', () => {
    const signupButtons = document.querySelectorAll('.signup-btn');
    const loginButtons = document.querySelectorAll('.login-btn');
    const socialButtons = document.querySelectorAll('.social-btn');
    const startButton = document.querySelector('.start-btn'); // Select the "Let's Start" button

    // Function to check if the current page is signup.html
    function isSignupPage() {
        return window.location.pathname.includes('signup.html');
    }

    function showSignup() {
        if (!isSignupPage()) { // Only redirect if not on signup.html
            window.location.href = 'signup.html';
        }
    }

    function showLogin() {
        window.location.href = 'login.html'; // Always redirect to login.html from signup.html
    }

    // Handle Sign Up buttons
    signupButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            showSignup();
        });
    });

    // Handle Login buttons
    loginButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            showLogin();
        });
    });

    // Disable Sign Up button if on signup.html
    if (isSignupPage()) {
        signupButtons.forEach(button => {
            button.disabled = true;
            button.style.opacity = '0.5';
            button.style.cursor = 'not-allowed';
            button.title = 'You are already on the signup page';
        });
    }

    // Handle "Let's Start" button (form submission)
    if (startButton) {
        startButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default form submission
            // Optional: Basic form validation
            const username = document.querySelector('input[placeholder="Username"]').value;
            const email = document.querySelector('input[placeholder="Email"]').value;
            const password = document.querySelector('input[placeholder="Password"]').value;

            if (username && email && password) {
                console.log('Form submitted with:', { username, email, password });
                // Redirect to login.html after form submission
                window.location.href = 'login.html';
            } else {
                alert('Please fill in all fields before continuing.');
            }
        });
    }

    // Handle Social Sign-In Buttons
    socialButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const provider = button.classList[1]; // Get the provider class (apple, google, or x)

            switch (provider) {
                case 'apple':
                    handleAppleSignIn();
                    break;
                case 'google':
                    handleGoogleSignIn();
                    break;
                case 'x':
                    handleXSignIn();
                    break;
                default:
                    console.log('Unknown social provider');
            }
        });
    });

    // Placeholder functions for social sign-in (replace with actual API calls)
    function handleAppleSignIn() {
        // Step 1: Initialize Apple Sign-In (requires Apple ID SDK or OAuth)
        console.log('Apple Sign-In clicked');
        alert('Apple Sign-In functionality needs to be implemented with Apple’s SDK and your client ID.');
    }

    function handleGoogleSignIn() {
        // Step 1: Load Google Sign-In API (requires Google Identity Services SDK)
        console.log('Google Sign-In clicked');
        alert('Google Sign-In functionality needs to be implemented with Google’s SDK and your client ID.');
    }

    function handleXSignIn() {
        // Step 1: Initialize X (Twitter) Sign-In (requires Twitter OAuth 1.0a or OAuth 2.0)
        console.log('X Sign-In clicked');
        alert('X (Twitter) Sign-In functionality needs to be implemented with Twitter’s API and your credentials.');
    }
});