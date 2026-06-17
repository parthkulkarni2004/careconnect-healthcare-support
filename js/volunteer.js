// ===========================
// VOLUNTEER.JS - Volunteer Registration Form
// ===========================

// Form validation patterns
const validationPatterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[\d\s\-\+\(\)]{10,}$/,
};

// Get form elements
const volunteerForm = document.getElementById('volunteerForm');
const volunteerNameInput = document.getElementById('volunteerName');
const volunteerEmailInput = document.getElementById('volunteerEmail');
const volunteerPhoneInput = document.getElementById('volunteerPhone');
const skillInput = document.getElementById('skill');
const availabilityInput = document.getElementById('availability');
const motivationInput = document.getElementById('motivation');
const termsInput = document.getElementById('terms');
const volunteerSuccess = document.getElementById('volunteerSuccess');

// Form validation functions
function validateFullName(name) {
    return name.trim().length >= 2;
}

function validateEmail(email) {
    return validationPatterns.email.test(email);
}

function validatePhone(phone) {
    return validationPatterns.phone.test(phone);
}

function validateSkill(skill) {
    return skill !== '';
}

function validateAvailability(availability) {
    return availability !== '';
}

function validateMotivation(motivation) {
    return motivation.trim().length >= 20;
}

function validateTerms(checked) {
    return checked;
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
volunteerNameInput.addEventListener('blur', () => {
    if (!validateFullName(volunteerNameInput.value)) {
        showError(volunteerNameInput, 'volunteerNameError', 'Please enter a valid full name (at least 2 characters)');
    } else {
        clearError(volunteerNameInput, 'volunteerNameError');
    }
});

volunteerEmailInput.addEventListener('blur', () => {
    if (!validateEmail(volunteerEmailInput.value)) {
        showError(volunteerEmailInput, 'volunteerEmailError', 'Please enter a valid email address');
    } else {
        clearError(volunteerEmailInput, 'volunteerEmailError');
    }
});

volunteerPhoneInput.addEventListener('blur', () => {
    if (!validatePhone(volunteerPhoneInput.value)) {
        showError(volunteerPhoneInput, 'volunteerPhoneError', 'Please enter a valid phone number');
    } else {
        clearError(volunteerPhoneInput, 'volunteerPhoneError');
    }
});

skillInput.addEventListener('change', () => {
    if (!validateSkill(skillInput.value)) {
        showError(skillInput, 'skillError', 'Please select your area of expertise');
    } else {
        clearError(skillInput, 'skillError');
    }
});

availabilityInput.addEventListener('change', () => {
    if (!validateAvailability(availabilityInput.value)) {
        showError(availabilityInput, 'availabilityError', 'Please select your availability');
    } else {
        clearError(availabilityInput, 'availabilityError');
    }
});

motivationInput.addEventListener('blur', () => {
    if (!validateMotivation(motivationInput.value)) {
        showError(motivationInput, 'motivationError', 'Please provide at least 20 characters explaining your motivation');
    } else {
        clearError(motivationInput, 'motivationError');
    }
});

termsInput.addEventListener('change', () => {
    if (!validateTerms(termsInput.checked)) {
        showError(termsInput, 'termsError', 'You must agree to the terms and conditions');
    } else {
        clearError(termsInput, 'termsError');
    }
});

// Form submission
volunteerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    let isValid = true;

    if (!validateFullName(volunteerNameInput.value)) {
        showError(volunteerNameInput, 'volunteerNameError', 'Please enter a valid full name');
        isValid = false;
    } else {
        clearError(volunteerNameInput, 'volunteerNameError');
    }

    if (!validateEmail(volunteerEmailInput.value)) {
        showError(volunteerEmailInput, 'volunteerEmailError', 'Please enter a valid email address');
        isValid = false;
    } else {
        clearError(volunteerEmailInput, 'volunteerEmailError');
    }

    if (!validatePhone(volunteerPhoneInput.value)) {
        showError(volunteerPhoneInput, 'volunteerPhoneError', 'Please enter a valid phone number');
        isValid = false;
    } else {
        clearError(volunteerPhoneInput, 'volunteerPhoneError');
    }

    if (!validateSkill(skillInput.value)) {
        showError(skillInput, 'skillError', 'Please select your area of expertise');
        isValid = false;
    } else {
        clearError(skillInput, 'skillError');
    }

    if (!validateAvailability(availabilityInput.value)) {
        showError(availabilityInput, 'availabilityError', 'Please select your availability');
        isValid = false;
    } else {
        clearError(availabilityInput, 'availabilityError');
    }

    if (!validateMotivation(motivationInput.value)) {
        showError(motivationInput, 'motivationError', 'Please provide details about your motivation (at least 20 characters)');
        isValid = false;
    } else {
        clearError(motivationInput, 'motivationError');
    }

    if (!validateTerms(termsInput.checked)) {
        showError(termsInput, 'termsError', 'You must agree to the terms and conditions');
        isValid = false;
    } else {
        clearError(termsInput, 'termsError');
    }

    if (isValid) {
        // Create volunteer registration object
        const volunteerReg = {
            id: Date.now(),
            name: volunteerNameInput.value.trim(),
            email: volunteerEmailInput.value.trim(),
            phone: volunteerPhoneInput.value.trim(),
            skill: skillInput.value,
            availability: availabilityInput.value,
            motivation: motivationInput.value.trim(),
            submittedAt: new Date().toLocaleString()
        };

        // Save to Local Storage
        saveVolunteerRegistration(volunteerReg);

        // Show success message
        displaySuccessMessage(volunteerReg.id);

        // Reset form
        volunteerForm.reset();

        // Scroll to success message
        volunteerSuccess.scrollIntoView({ behavior: 'smooth' });
    }
});

// Local Storage functions
function saveVolunteerRegistration(registration) {
    try {
        let registrations = JSON.parse(localStorage.getItem('volunteerRegistrations')) || [];
        registrations.push(registration);
        localStorage.setItem('volunteerRegistrations', JSON.stringify(registrations));
    } catch (error) {
        console.error('Error saving volunteer registration:', error);
    }
}

function getVolunteerRegistrations() {
    try {
        return JSON.parse(localStorage.getItem('volunteerRegistrations')) || [];
    } catch (error) {
        console.error('Error retrieving volunteer registrations:', error);
        return [];
    }
}

// Display success message
function displaySuccessMessage(volunteerId) {
    document.getElementById('volunteerId').textContent = volunteerId;
    volunteerSuccess.classList.remove('hidden');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        volunteerSuccess.classList.add('hidden');
    }, 5000);
}

// Log all volunteer registrations (for development)
function logAllVolunteers() {
    const registrations = getVolunteerRegistrations();
    console.log('All Volunteer Registrations:', registrations);
}

// Optional: Load existing registrations on page load
window.addEventListener('load', () => {
    const registrations = getVolunteerRegistrations();
    console.log(`${registrations.length} volunteer registration(s) found in Local Storage`);
});
