function sendMail() {
    var params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    };

    const serviceID = "service_j50uyo8"; // Replace with your EmailJS Service ID
    const templateID_Admin = "template_ryys5vg"; // Replace with Admin Email Template ID
    const templateID_AutoReply = "template_5vbv67k"; // Replace with Auto-Reply Template ID

    // Send email to admin
    emailjs.send(serviceID, templateID_Admin, params)
        .then(res => {
            console.log("Message sent Sucessfully!!!");
        })
        .catch(err => console.log(err));

    // Send auto-reply email to sender
    emailjs.send(serviceID, templateID_AutoReply, params)
        .then(res => {
            alert("Your message has been sent! You will receive a confirmation email shortly.");
            document.getElementById("contact-form").reset();
        })
        .catch(err => console.log(err));
}
