// Initialize EmailJS
emailjs.init('uzRzidPrUymVo71yb'); // Replace with your EmailJS user ID

const form = document.getElementById('survey-form');

// Event listener for form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent default form submission

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Get ratings for all questions
    data.q1_rating = getRating('q1');
    data.q2_rating = getRating('q2');
    data.q3_rating = getRating('q3');

    // Send email via EmailJS
    emailjs.send('service_5y79wro', 'template_mwx7pyc', data)
        .then(() => {
            alert('Thank you! Your survey has been submitted.');
            form.reset();  // Reset form after submission
        })
        .catch((error) => {
            console.error('Error sending email:', error);
            alert('There was an error submitting your survey. Please try again.');
        });
});

// Rating color change function
function rate(button, value) {
    const buttons = button.parentNode.querySelectorAll('button');
    buttons.forEach(btn => btn.classList.remove('green', 'red'));  // Reset previous ratings
    if (value >= 6) {
        button.classList.add('green');  // Color green for rating 6 and above
    } else {
        button.classList.add('red');  // Color red for rating below 6
    }
}

// Get rating from the selected button in each question
function getRating(questionId) {
    const selectedButton = document.querySelector(`#${questionId} .dynamic[style*="background-color"]`);
    return selectedButton ? selectedButton.dataset.value : null;
}

// Add click event to each dynamic button
document.querySelectorAll('.dynamic').forEach(button => {
    button.addEventListener('click', function() {
        const value = parseInt(this.dataset.value, 10);
        rate(this, value);
    });
});
