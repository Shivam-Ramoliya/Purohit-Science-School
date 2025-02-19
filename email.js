function sendMail(){
    let params={
        name:document.getElementById("name").value,
        email:document.getElementById("email").value,
        message:document.getElementById("message").value,
    }

    console.log(params);
    emailjs.send("service_6ax33ic","template_f10cb3c",params)
        .then(alert("Email Sent!!!!"))
        .catch((error)=>console.log("error",error));
}