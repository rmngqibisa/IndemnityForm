// Cached DOM elements
var emergencyToggle = document.getElementById('emergencyToggle');
var emergencyDetails = document.getElementById('emergencyDetails');
var idInput = document.getElementById('idnumber');

// Show emergency contact fields if checkbox is selected
emergencyToggle.addEventListener('change', function () {
    var isChecked = this.checked;
    emergencyDetails.style.display = isChecked ? 'block' : 'none';
    this.setAttribute('aria-expanded', isChecked);
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
    var idError = document.getElementById('id-error');
    var idValue = idInput.value;

    if (!isValidSAID(idValue)) {
        event.preventDefault(); // Prevent form submission

        // Show inline error
        idError.textContent = 'Invalid South African ID Number. Please check and try again.';
        idError.classList.add('visible');
        idInput.classList.add('input-error');
        idInput.setAttribute('aria-invalid', 'true');

        idInput.focus();
    } else {
        // Clear error
        idError.classList.remove('visible');
        idInput.classList.remove('input-error');
        idInput.setAttribute('aria-invalid', 'false');
        idError.textContent = '';
    }
});
