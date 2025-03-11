function sendMail(event) {
    event.preventDefault(); // Prevent form reload

    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var message = document.getElementById("message").value.trim();
    var sendButton = document.querySelector(".submit-btn"); // Fix ID mismatch

    if (!name || !email || !message) {
        alert("Please fill in all fields before sending your message.");
        return;
    }

    var params = { name, email, message };

    const serviceID = "service_j50uyo8"; 
    const templateID_Admin = "template_ryys5vg";
    const templateID_AutoReply = "template_5vbv67k";

    sendButton.disabled = true;
    sendButton.innerText = "Sending...";

    emailjs.send(serviceID, templateID_Admin, params)
        .then(res => {
            console.log("Message sent successfully to admin!");
            return emailjs.send(serviceID, templateID_AutoReply, params);
        })
        .then(res => {
            alert("Your message has been sent! You will receive a confirmation email shortly.");
            document.getElementById("contact-form").reset();
        })
        .catch(err => {
            console.log("Error sending email:", err);
            alert("Something went wrong. Please try again.");
        })
        .finally(() => {
            setTimeout(() => {
                sendButton.disabled = false;
                sendButton.innerText = "Send Email";
            }, 7000);
        });
}
