
/* Open and close mobile navigation */
document.querySelector('.nav-toggle').addEventListener("click", (e) => { 

    document.querySelector('.header-nav').classList.toggle('header-nav--open');
    document.querySelector('.nav-toggle').classList.toggle('open')
    document.querySelector('body').classList.toggle('open');
});