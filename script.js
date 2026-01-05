// Show emergency contact fields if checkbox is selected
document.getElementById('emergencyToggle').addEventListener('change', function () {
    var emergencyDetails = document.getElementById('emergencyDetails');
    if (this.checked) {
        emergencyDetails.style.display = 'block';
    } else {
        emergencyDetails.style.display = 'none';
    }
});
