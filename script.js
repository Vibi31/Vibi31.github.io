// Initialize EmailJS
emailjs.init('uzRzidPrUymVo71yb'); // Replace with your EmailJS user ID

// Button click to handle rating and color change
document.addEventListener("DOMContentLoaded", function () {
    // Attach click events to dynamic rating buttons
    const ratingButtons = document.querySelectorAll('.dynamic');
    ratingButtons.forEach(button => {
        button.addEventListener('click', function () {
            const value = parseInt(this.getAttribute('data-value'));
            rate(this, value);
        });
    });

    // Form submission handler
    const form = document.getElementById('survey-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevents the default form submission
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Send data via EmailJS
        emailjs.send('service_5y79wro', 'template_mwx7pyc', data)
            .then(() => {
                alert('Thank you! Your survey has been submitted.');
                form.reset();
            })
            .catch(error => {
                console.error('Error sending email:', error);
                alert('There was an error submitting your survey. Please try again.');
            });
    });
});

// Function to handle rating click
function rate(button, value) {
    const buttons = button.parentNode.querySelectorAll('button');
    buttons.forEach(btn => btn.classList.remove('green', 'red')); // Remove previous color classes
    if (value >= 6) {
        button.classList.add('green'); // If 6 or above, add green class
    } else {
        button.classList.add('red'); // If below 6, add red class
    }
}
