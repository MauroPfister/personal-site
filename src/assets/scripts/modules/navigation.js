import * as focusTrap from 'focus-trap';

const SELECTORS = {
    nav: '.nav',
    toggleBtn: '.nav__toggle',
    hamburger: '.hamburger',
}

const CLASSES = {
    noScroll: 'no-scroll',
    navOpen: 'nav--open',
    hamburgerOpen: 'hamburger--open',
}

class Navigation {
    constructor() {
        this.isOpen = false;

        this.nav = document.querySelector(SELECTORS.nav);
        this.toggleBtn = this.nav.querySelector(SELECTORS.toggleBtn);
        this.hamburger = this.nav.querySelector(SELECTORS.hamburger);

        // Close navigation when focus trap is deactivated with Esc key.
        this.focusTrap = focusTrap.createFocusTrap(this.nav, {
            escapeDeactivates : () => {
                this.toggleNav(false);
                return true;
            }
        });

        this.toggleBtn.addEventListener("click", () => this.toggleNav() );
    }

    /**
     * Open and close mobile navigation
     * @param {boolean} force Overwrites value of this.isOpen when passed.
     */
    toggleNav (force) {
        this.isOpen = typeof force === 'boolean' ? force : !this.isOpen;

        this.nav.classList.toggle(CLASSES.navOpen, this.isOpen);
        this.hamburger.classList.toggle(CLASSES.hamburgerOpen, this.isOpen);
        document.querySelector('body').classList.toggle(CLASSES.noScroll, this.isOpen);

        if (this.isOpen) {
            this.focusTrap.activate();
        } else {
            this.focusTrap.deactivate();
        }
    }
}

if (document.querySelector(SELECTORS.nav)) {
    new Navigation();
}