// Cached DOM elements
var emergencyToggle = document.getElementById('emergencyToggle');
var emergencyDetails = document.getElementById('emergencyDetails');

// Show emergency contact fields if checkbox is selected
emergencyToggle.addEventListener('change', function () {
    if (this.checked) {
        emergencyDetails.style.display = 'block';
    } else {
        emergencyDetails.style.display = 'none';
    }
});

// Validate South African ID Number using Luhn Algorithm
function isValidSAID(id) {
    // Check length and numeric
    if (!/^\d{13}$/.test(id)) {
        return false;
    }

    var sum = 0;
    var isSecond = false;

    // Loop from right to left
    for (var i = id.length - 1; i >= 0; i--) {
        var d = parseInt(id.charAt(i), 10);

        if (isSecond) {
            d = d * 2;
            if (d > 9) {
                d -= 9; // Equivalent to adding digits: 16 -> 1+6=7, 16-9=7
            }
        }

        sum += d;
        isSecond = !isSecond;
    }

    return (sum % 10 === 0);
}

// Helper to manage error messages
function showError(input, message) {
    input.classList.add('input-error');

    // Check if error message already exists
    var existingError = input.nextElementSibling;
    if (existingError && existingError.classList.contains('error-message')) {
        existingError.textContent = message;
    } else {
        var errorSpan = document.createElement('span');
        errorSpan.className = 'error-message';
        errorSpan.textContent = message;
        input.parentNode.insertBefore(errorSpan, input.nextSibling);
    }
}

function clearError(input) {
    input.classList.remove('input-error');
    var existingError = input.nextElementSibling;
    if (existingError && existingError.classList.contains('error-message')) {
        existingError.remove();
    }
}

// Form validation on submit
document.querySelector('form').addEventListener('submit', function(event) {
    var idInput = document.getElementById('idnumber');
    var idValue = idInput.value;
    var submitBtn = this.querySelector('input[type="submit"]');

    clearError(idInput);

    if (!isValidSAID(idValue)) {
        event.preventDefault(); // Prevent form submission
        showError(idInput, 'Invalid South African ID Number. Please check and try again.');
        idInput.focus();
    } else {
        // Valid, proceed to submit
        submitBtn.value = "Submitting...";
        submitBtn.disabled = true;
    }
});
