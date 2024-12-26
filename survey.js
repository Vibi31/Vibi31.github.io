// survey.js
document.getElementById("survey-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Collect ratings and comments
    const formData = {};
    document.querySelectorAll(".question").forEach((question, index) => {
        const selectedButton = question.querySelector(".dynamic[style*='background-color']");
        formData[`Question ${index + 1}`] = selectedButton ? selectedButton.dataset.value : "No response";
    });

    // Add comments to formData
    formData["Feedback 1"] = document.getElementById("feedback1").value.trim();
    formData["Feedback 2"] = document.getElementById("feedback2").value.trim();
    formData["Feedback 3"] = document.getElementById("feedback3").value.trim();

    // Send data using EmailJS
    emailjs.send("service_5y79wro", "template_mwx7pyc", formData)
    .then(() => {
            alert("Survey submitted successfully!");
            // Clear the form after submission
            document.getElementById("survey-form").reset();

            // Redirect to a "Thank You" page
            window.location.href = "thank_you.html";
        })
        .catch(err => {
            console.error("Error sending email:", err);
            alert("An error occurred, please try again.");
        });
});
