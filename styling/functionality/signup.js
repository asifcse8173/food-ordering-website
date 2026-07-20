// Get form elements
const form = document.getElementById('signupForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const termsCheckbox = document.getElementById('terms');
const successMessage = document.getElementById('successMessage');

// Get error message elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmError = document.getElementById('confirmError');
const termsError = document.getElementById('termsError');

// Validation functions
function validateName(name) {
    if (name.trim().length === 0) {
        return 'Full name is required';
    }
    if (name.trim().length < 3) {
        return 'Name must be at least 3 characters';
    }
    return '';
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim().length === 0) {
        return 'Email is required';
    }
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }
    return '';
}

function validatePassword(password) {
    if (password.length === 0) {
        return 'Password is required';
    }
    if (password.length < 8) {
        return 'Password must be at least 8 characters';
    }
    return '';
}

function validateConfirmPassword(password, confirmPassword) {
    if (confirmPassword.length === 0) {
        return 'Please confirm your password';
    }
    if (password !== confirmPassword) {
        return 'Passwords do not match';
    }
    return '';
}

function validateTerms(checked) {
    if (!checked) {
        return 'You must agree to the terms and conditions';
    }
    return '';
}

// Update field styling based on validation
function updateFieldStyle(input, error) {
    input.classList.remove('error', 'success');
    if (error) {
        input.classList.add('error');
    } else if (input.value.trim() !== '') {
        input.classList.add('success');
    }
}

// Real-time validation for each field
nameInput.addEventListener('blur', () => {
    const error = validateName(nameInput.value);
    nameError.textContent = error;
    updateFieldStyle(nameInput, error);
});

emailInput.addEventListener('blur', () => {
    const error = validateEmail(emailInput.value);
    emailError.textContent = error;
    updateFieldStyle(emailInput, error);
});

passwordInput.addEventListener('blur', () => {
    const error = validatePassword(passwordInput.value);
    passwordError.textContent = error;
    updateFieldStyle(passwordInput, error);
});

confirmPasswordInput.addEventListener('blur', () => {
    const error = validateConfirmPassword(passwordInput.value, confirmPasswordInput.value);
    confirmError.textContent = error;
    updateFieldStyle(confirmPasswordInput, error);
});

passwordInput.addEventListener('change', () => {
    // Re-validate confirm password when password changes
    if (confirmPasswordInput.value) {
        const error = validateConfirmPassword(passwordInput.value, confirmPasswordInput.value);
        confirmError.textContent = error;
        updateFieldStyle(confirmPasswordInput, error);
    }
});

termsCheckbox.addEventListener('change', () => {
    const error = validateTerms(termsCheckbox.checked);
    termsError.textContent = error;
});

// Form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    const nameErr = validateName(nameInput.value);
    const emailErr = validateEmail(emailInput.value);
    const passwordErr = validatePassword(passwordInput.value);
    const confirmErr = validateConfirmPassword(passwordInput.value, confirmPasswordInput.value);
    const termsErr = validateTerms(termsCheckbox.checked);

    // Update errors
    nameError.textContent = nameErr;
    emailError.textContent = emailErr;
    passwordError.textContent = passwordErr;
    confirmError.textContent = confirmErr;
    termsError.textContent = termsErr;

    // Update field styles
    updateFieldStyle(nameInput, nameErr);
    updateFieldStyle(emailInput, emailErr);
    updateFieldStyle(passwordInput, passwordErr);
    updateFieldStyle(confirmPasswordInput, confirmErr);

    // If no errors, show success message
    if (!nameErr && !emailErr && !passwordErr && !confirmErr && !termsErr) {
        // Log the form data (in a real app, you'd send this to a server)
        const formData = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        };
        console.log('Form submitted successfully:', formData);

        // Show success message
        successMessage.classList.add('show');

        // Reset form
        form.reset();
        nameInput.classList.remove('success');
        emailInput.classList.remove('success');
        passwordInput.classList.remove('success');
        confirmPasswordInput.classList.remove('success');

        // Hide success message after 3 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 3000);
    }
});
