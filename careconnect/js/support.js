// ===========================
// SUPPORT.JS - Patient Support Request Form
// ===========================

// Form validation patterns
const validationPatterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[\d\s\-\+\(\)]{10,}$/,
};

// Get form elements
const supportForm = document.getElementById('supportForm');
const fullNameInput = document.getElementById('fullName');
const ageInput = document.getElementById('age');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const supportTypeInput = document.getElementById('supportType');
const descriptionInput = document.getElementById('description');
const successMessage = document.getElementById('successMessage');

// Form validation functions
function validateFullName(name) {
    return name.trim().length >= 2;
}

function validateAge(age) {
    const ageNum = parseInt(age);
    return age !== '' && ageNum >= 1 && ageNum <= 120;
}

function validateEmail(email) {
    return validationPatterns.email.test(email);
}

function validatePhone(phone) {
    return validationPatterns.phone.test(phone);
}

function validateSupportType(type) {
    return type !== '';
}

function validateDescription(desc) {
    return desc.trim().length >= 10;
}

// Display error message
function showError(input, errorElementId, message) {
    const errorElement = document.getElementById(errorElementId);
    if (errorElement) {
        errorElement.textContent = message;
        input.classList.add('error');
    }
}

// Clear error message
function clearError(input, errorElementId) {
    const errorElement = document.getElementById(errorElementId);
    if (errorElement) {
        errorElement.textContent = '';
        input.classList.remove('error');
    }
}

// Real-time validation
fullNameInput.addEventListener('blur', () => {
    if (!validateFullName(fullNameInput.value)) {
        showError(fullNameInput, 'fullNameError', 'Please enter a valid full name (at least 2 characters)');
    } else {
        clearError(fullNameInput, 'fullNameError');
    }
});

ageInput.addEventListener('blur', () => {
    if (!validateAge(ageInput.value)) {
        showError(ageInput, 'ageError', 'Please enter a valid age (1-120)');
    } else {
        clearError(ageInput, 'ageError');
    }
});

emailInput.addEventListener('blur', () => {
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'emailError', 'Please enter a valid email address');
    } else {
        clearError(emailInput, 'emailError');
    }
});

phoneInput.addEventListener('blur', () => {
    if (!validatePhone(phoneInput.value)) {
        showError(phoneInput, 'phoneError', 'Please enter a valid phone number');
    } else {
        clearError(phoneInput, 'phoneError');
    }
});

supportTypeInput.addEventListener('change', () => {
    if (!validateSupportType(supportTypeInput.value)) {
        showError(supportTypeInput, 'supportTypeError', 'Please select a support type');
    } else {
        clearError(supportTypeInput, 'supportTypeError');
    }
});

descriptionInput.addEventListener('blur', () => {
    if (!validateDescription(descriptionInput.value)) {
        showError(descriptionInput, 'descriptionError', 'Please provide at least 10 characters');
    } else {
        clearError(descriptionInput, 'descriptionError');
    }
});

// Form submission
supportForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    let isValid = true;

    if (!validateFullName(fullNameInput.value)) {
        showError(fullNameInput, 'fullNameError', 'Please enter a valid full name');
        isValid = false;
    } else {
        clearError(fullNameInput, 'fullNameError');
    }

    if (!validateAge(ageInput.value)) {
        showError(ageInput, 'ageError', 'Please enter a valid age');
        isValid = false;
    } else {
        clearError(ageInput, 'ageError');
    }

    if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'emailError', 'Please enter a valid email address');
        isValid = false;
    } else {
        clearError(emailInput, 'emailError');
    }

    if (!validatePhone(phoneInput.value)) {
        showError(phoneInput, 'phoneError', 'Please enter a valid phone number');
        isValid = false;
    } else {
        clearError(phoneInput, 'phoneError');
    }

    if (!validateSupportType(supportTypeInput.value)) {
        showError(supportTypeInput, 'supportTypeError', 'Please select a support type');
        isValid = false;
    } else {
        clearError(supportTypeInput, 'supportTypeError');
    }

    if (!validateDescription(descriptionInput.value)) {
        showError(descriptionInput, 'descriptionError', 'Please provide details about your healthcare needs');
        isValid = false;
    } else {
        clearError(descriptionInput, 'descriptionError');
    }

    if (isValid) {
        // Create support request object
        const supportRequest = {
            id: Date.now(),
            name: fullNameInput.value.trim(),
            age: ageInput.value,
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim(),
            supportType: supportTypeInput.value,
            description: descriptionInput.value.trim(),
            submittedAt: new Date().toLocaleString()
        };

        // Save to Local Storage
        saveSupportRequest(supportRequest);

        // Show success message
        displaySuccessMessage(supportRequest.id);

        // Reset form
        supportForm.reset();

        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth' });
    }
});

// Local Storage functions
function saveSupportRequest(request) {
    try {
        let requests = JSON.parse(localStorage.getItem('supportRequests')) || [];
        requests.push(request);
        localStorage.setItem('supportRequests', JSON.stringify(requests));
    } catch (error) {
        console.error('Error saving support request:', error);
    }
}

function getSupportRequests() {
    try {
        return JSON.parse(localStorage.getItem('supportRequests')) || [];
    } catch (error) {
        console.error('Error retrieving support requests:', error);
        return [];
    }
}

// Display success message
function displaySuccessMessage(requestId) {
    document.getElementById('requestId').textContent = requestId;
    successMessage.classList.remove('hidden');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        successMessage.classList.add('hidden');
    }, 5000);
}

// Log all support requests (for development)
function logAllRequests() {
    const requests = getSupportRequests();
    console.log('All Support Requests:', requests);
}

// Optional: Load existing requests on page load
window.addEventListener('load', () => {
    const requests = getSupportRequests();
    console.log(`${requests.length} support request(s) found in Local Storage`);
});
