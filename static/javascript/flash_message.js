document.getElementById('liveAlertBtn').addEventListener('click', () => {
    var name = document.forms["contact-form"]["name"].value;
    var email = document.forms["contact-form"]["email"].value;
    var contact = document.forms["contact-form"]["contact"].value;
    var msg = document.forms["contact-form"]["message"].value;

    var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    var alertTrigger = document.getElementById('liveAlertBtn')

    function alert(message, type) {
        var wrapper = document.createElement('div')
        wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

        alertPlaceholder.append(wrapper)
    }

    if (name == "" || email === "" || contact === "" || msg === "") {
        alert('Failed to Send the Message. Please fill the form correctly.', 'danger')
    } else {
        alert('Thanks for the feedback. We willreach out to you soon!', 'success')
    }
})