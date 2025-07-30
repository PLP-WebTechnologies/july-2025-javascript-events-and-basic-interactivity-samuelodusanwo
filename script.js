// Ensure the DOM is fully loaded before running JavaScript
document.addEventListener('DOMContentLoaded', () => {

    // =========================================================
    // PART 1: JavaScript Event Handling and Interactive Elements
    // =========================================================
    console.log("--- Part 1: Event Handling ---");

    // 1. Basic Button Click Event
    const alertButton = document.getElementById('alertButton');
    const messageDisplay = document.getElementById('messageDisplay');

    alertButton.addEventListener('click', () => {
        // alert('Welcome to the interactive page!'); // Old school alert
        messageDisplay.textContent = "Welcome, user! You clicked the button!";
        messageDisplay.style.color = "#3498db"; // Set text color
        console.log("Welcome message displayed.");
    });

    // 2. Mouse Over and Mouse Out Events
    const hoverBox = document.getElementById('hoverBox');

    hoverBox.addEventListener('mouseenter', () => {
        hoverBox.textContent = "You're hovering!";
        hoverBox.classList.add('hovered'); // Add a class for styling
        console.log("Mouse entered hoverBox.");
    });

    hoverBox.addEventListener('mouseleave', () => {
        hoverBox.textContent = "Hover over me!";
        hoverBox.classList.remove('hovered'); // Remove the class
        console.log("Mouse left hoverBox.");
    });

    // 3. Keyboard Input Event (e.g., detecting Enter key)
    const keyboardInput = document.getElementById('keyboardInput');
    const keyboardMessage = document.getElementById('keyboardMessage');

    keyboardInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') { // Check if the pressed key is Enter
            keyboardMessage.textContent = `You typed: "${keyboardInput.value}" and pressed Enter!`;
            keyboardMessage.style.color = "#27ae60"; // Green color
            keyboardInput.value = ''; // Clear the input field
            console.log("Enter key pressed in keyboard input.");
        }
    });


    // =========================================================
    // PART 2: Building Interactive Elements
    // =========================================================
    console.log("\n--- Part 2: Interactive Components ---");

    // 1. Interactive Feature: Light/Dark Mode Toggle
    const modeToggle = document.getElementById('modeToggle');
    const body = document.body;
    const currentModeSpan = document.getElementById('currentMode');

    // Check for user's preferred mode from localStorage (if previously set)
    const savedMode = localStorage.getItem('theme');
    if (savedMode === 'dark') {
        body.classList.add('dark-mode');
        currentModeSpan.textContent = 'Dark';
    } else {
        body.classList.remove('dark-mode');
        currentModeSpan.textContent = 'Light';
    }

    modeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode'); // Add or remove 'dark-mode' class

        if (body.classList.contains('dark-mode')) {
            currentModeSpan.textContent = 'Dark';
            localStorage.setItem('theme', 'dark'); // Save preference
            console.log("Switched to Dark Mode.");
        } else {
            currentModeSpan.textContent = 'Light';
            localStorage.setItem('theme', 'light'); // Save preference
            console.log("Switched to Light Mode.");
        }
    });

    // 2. Interactive Feature: Simple Counter
    const decrementBtn = document.getElementById('decrementBtn');
    const incrementBtn = document.getElementById('incrementBtn');
    const counterValueSpan = document.getElementById('counterValue');

    let counter = 0; // Initialize counter

    decrementBtn.addEventListener('click', () => {
        counter--; // Decrement the counter
        counterValueSpan.textContent = counter; // Update display
        console.log(`Counter decremented to: ${counter}`);
    });

    incrementBtn.addEventListener('click', () => {
        counter++; // Increment the counter
        counterValueSpan.textContent = counter; // Update display
        console.log(`Counter incremented to: ${counter}`);
    });

    // 3. Interactive Feature: Collapsible FAQ Section
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling; // Get the very next sibling (the answer paragraph)

            // Toggle 'active' class on the question to change its style/arrow
            question.classList.toggle('active');

            // Toggle 'hidden' class on the answer to show/hide it
            answer.classList.toggle('hidden');

            console.log(`FAQ item "${question.textContent.trim()}" toggled.`);
        });
    });


    // =========================================================
    // PART 3: Form Validation with JavaScript
    // =========================================================
    console.log("\n--- Part 3: Custom Form Validation ---");

    const registrationForm = document.getElementById('registrationForm');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const termsCheckbox = document.getElementById('terms');
    const formSuccessMessage = document.getElementById('formSuccessMessage');

    // Get error message display elements
    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const termsError = document.getElementById('termsError');

    // Function to display an error message
    function showError(element, message) {
        element.textContent = message;
        element.classList.remove('hidden');
    }

    // Function to clear an error message
    function clearError(element) {
        element.textContent = '';
        element.classList.add('hidden'); // Ensure it's hidden if no message
    }

    // Validation functions for each field
    function validateFullName() {
        if (fullNameInput.value.trim() === '') {
            showError(fullNameError, 'Full Name is required.');
            return false;
        } else if (fullNameInput.value.trim().length < 3) {
            showError(fullNameError, 'Full Name must be at least 3 characters.');
            return false;
        }
        clearError(fullNameError);
        return true;
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex

        if (email === '') {
            showError(emailError, 'Email is required.');
            return false;
        } else if (!emailRegex.test(email)) {
            showError(emailError, 'Please enter a valid email address.');
            return false;
        }
        clearError(emailError);
        return true;
    }

    function validatePassword() {
        const password = passwordInput.value;
        // Password must be at least 8 characters long, contain a number, an uppercase and a lowercase letter
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

        if (password === '') {
            showError(passwordError, 'Password is required.');
            return false;
        } else if (password.length < 8) {
            showError(passwordError, 'Password must be at least 8 characters long.');
            return false;
        } else if (!passwordRegex.test(password)) {
            showError(passwordError, 'Password needs 1 uppercase, 1 lowercase, 1 number.');
            return false;
        }
        clearError(passwordError);
        return true;
    }

    function validateConfirmPassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (confirmPassword === '') {
            showError(confirmPasswordError, 'Please confirm your password.');
            return false;
        } else if (password !== confirmPassword) {
            showError(confirmPasswordError, 'Passwords do not match.');
            return false;
        }
        clearError(confirmPasswordError);
        return true;
    }

    function validateTerms() {
        if (!termsCheckbox.checked) {
            showError(termsError, 'You must agree to the Terms & Conditions.');
            return false;
        }
        clearError(termsError);
        return true;
    }

    // Add event listeners for "blur" to validate as user leaves a field
    // This provides real-time feedback before submission
    fullNameInput.addEventListener('blur', validateFullName);
    emailInput.addEventListener('blur', validateEmail);
    passwordInput.addEventListener('blur', validatePassword);
    confirmPasswordInput.addEventListener('blur', validateConfirmPassword);
    termsCheckbox.addEventListener('change', validateTerms); // Use 'change' for checkboxes

    // Form Submission Event
    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission (which reloads the page)

        // Run all validation checks
        const isFullNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const areTermsAccepted = validateTerms();

        // Check if ALL fields are valid
        if (isFullNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && areTermsAccepted) {
            // All good! Display success message
            formSuccessMessage.classList.remove('hidden');
            console.log("Form submitted successfully!");
            // In a real application, you would send this data to a server here.
            registrationForm.reset(); // Clear the form fields after successful submission
            // Hide success message after a few seconds
            setTimeout(() => {
                formSuccessMessage.classList.add('hidden');
            }, 5000);
        } else {
            // If any validation fails, ensure success message is hidden
            formSuccessMessage.classList.add('hidden');
            console.log("Form validation failed. Please correct the errors.");
        }
    });

    console.log("\nJavaScript initialized. Interact with the page!");
}); // End of DOMContentLoaded