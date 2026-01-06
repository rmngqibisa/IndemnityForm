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

/**
 * Validates a South African ID number using the Luhn algorithm.
 * @param {string} id - The ID number to validate.
 * @returns {boolean} - True if the ID is valid according to the checksum.
 */
function isValidSAID(id) {
    // South African IDs must be exactly 13 digits
    if (!/^\d{13}$/.test(id)) return false;

    var sum = 0;
    var shouldDouble = false; // Start from right (check digit), which is not doubled

    // Iterate from right to left
    for (var i = 12; i >= 0; i--) {
        var digit = parseInt(id.charAt(i));

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return (sum % 10) === 0;
}

// Validate ID on input/blur
function validateID() {
    var id = idInput.value;

    // Reset validity state
    idInput.setCustomValidity("");

    // Only perform Luhn check if basic length requirement is met
    if (id.length === 13) {
        if (!isValidSAID(id)) {
            idInput.setCustomValidity("Invalid South African ID Number (Checksum failed).");
        }
    }
}

// Check on blur
idInput.addEventListener('blur', validateID);

// Clear error on input if user is correcting it
idInput.addEventListener('input', function() {
    if (this.value.length === 13) {
        validateID();
    } else {
        this.setCustomValidity("");
    }
});
