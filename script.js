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

// Form validation on submit
document.querySelector('form').addEventListener('submit', function(event) {
    var idInput = document.getElementById('idnumber');
    var idValue = idInput.value;

    if (!isValidSAID(idValue)) {
        event.preventDefault(); // Prevent form submission
        alert('Invalid South African ID Number. Please check and try again.');
        idInput.focus();
        idInput.style.borderColor = "red"; // Visual feedback
    } else {
        idInput.style.borderColor = ""; // Reset style

        // Add loading state to prevent double submission
        var submitBtn = document.querySelector('input[type="submit"]');
        submitBtn.value = 'Submitting...';
        submitBtn.disabled = true;
    }
});
