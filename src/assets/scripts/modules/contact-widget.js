const SELECTORS = {
    contact: '.contact',
    response: '.contact__response',
}

const CLASSES = {
    responseVisible: 'contact__response--visible',
    formHidden: 'contact__form--hidden',
}

class ContactWidget {
    constructor(element) {
        this.element = element;
        this.response = element.querySelector(SELECTORS.response);
        this.form = element.querySelector('form');
        this.form.addEventListener('submit', (event) => this.submit(event))
    }

    submit(event) {
        event.preventDefault()
        const formData = new FormData(this.form)
        fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        }).catch((error) => alert(error))

        // Hide form and show success message
        this.form.classList.toggle(CLASSES.formHidden);
        this.response.classList.toggle(CLASSES.responseVisible);
    }
}

const container = document.querySelector(SELECTORS.contact)
if (container) {
    new ContactWidget(container);
}