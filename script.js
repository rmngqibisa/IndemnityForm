// Cached DOM elements
var emergencyToggle = document.getElementById('emergencyToggle');
var emergencyDetails = document.getElementById('emergencyDetails');
var idInput = document.getElementById('idnumber');

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

// Helper functions for inline error handling
function showError(input, message) {
    var errorId = input.id + '-error';
    var errorElement = document.getElementById(errorId);

    // Add error class to input
    input.classList.add('input-error');

    // Create error message if it doesn't exist
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.id = errorId;
        errorElement.className = 'error-message';
        // Insert after the input
        input.parentNode.insertBefore(errorElement, input.nextSibling);
    }

    errorElement.textContent = message;
}

function clearError(input) {
    var errorId = input.id + '-error';
    var errorElement = document.getElementById(errorId);

    // Remove error class
    input.classList.remove('input-error');

    // Remove error message if it exists
    if (errorElement) {
        errorElement.parentNode.removeChild(errorElement);
    }
}

// Form validation on submit
document.querySelector('form').addEventListener('submit', function(event) {
    var idInput = document.getElementById('idnumber');
    var idValue = idInput.value;

    if (!isValidSAID(idValue)) {
        event.preventDefault(); // Prevent form submission
        showError(idInput, 'Invalid South African ID Number. Please check and try again.');
        idInput.focus();
    } else {
        clearError(idInput);
    }
});
