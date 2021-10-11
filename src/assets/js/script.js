/* Open and close mobile navigation */
document.querySelector('.nav__toggle').addEventListener("click", (e) => { 

    document.querySelector('.nav').classList.toggle('nav--open');
    document.querySelector('.hamburger').classList.toggle('hamburger--open');
    document.querySelector('body').classList.toggle('no-scroll');
});