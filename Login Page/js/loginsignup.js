document.addEventListener('DOMContentLoaded', () => {
    const signupButtons = document.querySelectorAll('.signup-btn');
    const loginButtons = document.querySelectorAll('.login-btn');
    const socialButtons = document.querySelectorAll('.social-btn');
    const loginForm = document.querySelector('form'); // Select the form

    // Function to check if the current page is login.html or signup.html
    function isLoginPage() {
        return window.location.pathname.includes('login.html');
    }

    function isSignupPage() {
        return window.location.pathname.includes('signup.html');
    }

    function showSignup() {
        if (!isSignupPage()) { // Only redirect if not on signup.html
            window.location.href = 'signup.html';
        }
    }

    function showLogin() {
        if (!isLoginPage()) { // Only redirect if not on login.html
            window.location.href = 'login.html';
        }
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

    // Disable Login button if on login.html
    if (isLoginPage()) {
        loginButtons.forEach(button => {
            button.disabled = true;
            button.style.opacity = '0.5';
            button.style.cursor = 'not-allowed';
            button.title = 'You are already on the login page';
        });
    }

    // Disable Sign Up button if on signup.html
    if (isSignupPage()) {
        signupButtons.forEach(button => {
            button.disabled = true;
            button.style.opacity = '0.5';
            button.style.cursor = 'not-allowed';
            button.title = 'You are already on the signup page';
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

    // Handle Form Submission for "Let's Start" button
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent form from submitting traditionally

        // Get form values
        const username = loginForm.querySelector('input[type="text"]').value.trim();
        const password = loginForm.querySelector('input[type="password"]').value.trim();

        // Mock user and partner data (replace with real data or API call)
        const accounts = [
            { username: 'student1', password: 'pass123', role: 'user' },
            { username: 'canteen1', password: 'pass123', role: 'partner' }
        ];

        // Find matching account
        const matchedAccount = accounts.find(account =>
            account.username === username && account.password === password
        );

        // Redirect based on role
        if (matchedAccount) {
            if (matchedAccount.role === 'user') {
                window.location.href = '../landing page/home.html'; // Adjusted path
            } else if (matchedAccount.role === 'partner') {
                window.location.href = '../dashboard/manage-orders.html'; // Adjusted path
            }
        } else {
            alert('Invalid username or password. Please try again.');
        }
    });

    // Placeholder functions for social sign-in (replace with actual API calls)
    function handleAppleSignIn() {
        console.log('Apple Sign-In clicked');
        alert('Apple Sign-In functionality needs to be implemented with Apple’s SDK and your client ID.');
        // Example: Integrate Apple ID SDK here
    }

    function handleGoogleSignIn() {
        console.log('Google Sign-In clicked');
        alert('Google Sign-In functionality needs to be implemented with Google’s SDK and your client ID.');
        // Example: Integrate Google Identity Services here
    }

    function handleXSignIn() {
        console.log('X Sign-In clicked');
        alert('X (Twitter) Sign-In functionality needs to be implemented with Twitter’s API and your credentials.');
        // Example: Integrate Twitter OAuth here
    }
});