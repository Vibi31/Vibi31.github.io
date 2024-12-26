emailjs.init("uzRzidPrUymVo71yb");

document.getElementById("survey-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    // Collect ratings
    const ratings = {};
    document.querySelectorAll(".question .rating-box").forEach((box, index) => {
        const selectedButton = box.querySelector("button[style*='background-color']");
        ratings[`rating${index + 1}`] = selectedButton ? selectedButton.dataset.value : "No response";
    });

    // Collect feedback
    const feedback1 = document.getElementById("feedback1").value || "No response";
    const feedback2 = document.getElementById("feedback2").value || "No response";
    const feedback3 = document.getElementById("feedback3").value || "No response";

    const data = { ...ratings, feedback1, feedback2, feedback3 };

    try {
        const result = await emailjs.send("service_5y79wro", "template_mwx7pyc", data);
        alert("Survey submitted successfully!");
        document.getElementById("survey-form").reset();
    } catch (error) {
        alert("Submission failed. Please try again.");
    }
});
