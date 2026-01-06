// Show emergency contact fields if checkbox is selected
document.getElementById('emergencyToggle').addEventListener('change', function () {
    var emergencyDetails = document.getElementById('emergencyDetails');
    if (this.checked) {
        emergencyDetails.style.display = 'block';
    } else {
        emergencyDetails.style.display = 'none';
    }
});

// Validate South African ID Number using Luhn Algorithm
function isValidSAID(id) {
    if (!/^\d{13}$/.test(id)) return false;
    let sum = 0;
    for (let i = 0; i < 13; i++) {
        let digit = parseInt(id.charAt(i));
        // Double every second digit from the right (which are odd indices 1, 3, 5... 11)
        if (i % 2 === 1) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
    }
    return sum % 10 === 0;
}

const idInput = document.getElementById('idnumber');
if (idInput) {
    idInput.addEventListener('input', function() {
        // Only validate if we have the full length to avoid annoyance while typing
        if (this.value.length === 13) {
            if (!isValidSAID(this.value)) {
                this.setCustomValidity('Invalid South African ID Number checksum.');
            } else {
                this.setCustomValidity('');
            }
        } else {
            // Reset validity while typing (HTML minlength handles length validation on submit)
            this.setCustomValidity('');
        }
    });
}
