'use strict';

// Event listeners
const addEventOnElements = function (elements, eventType, callback) {
    for (let i = 0, len = elements.length; i < len; i++) {
        elements[i].addEventListener(eventType, callback);
    }
}

// Mobile Nav
const navbar = document.querySelector('[data-navbar]');
const navbarTogglers = document.querySelectorAll('[data-nav-toggler]');
const navbarLinks = document.querySelectorAll('[data-nav-link]');
const overlay = document.querySelector('[data-overlay]');

const togglerNav = function () {
    navbar.classList.toggle('active');
    overlay.classList.toggle('active');
}

addEventOnElements(navbarTogglers, "click", togglerNav);

const closeNav = function () {
    navbar.classList.remove('active');
    overlay.classList.remove('active');
}

addEventOnElements(navbarLinks, 'click', closeNav);


// Header & back to top button
// const header = document.querySelector('[data-header]');
const backToTopBtn = document.querySelector('[data-back-top-btn]');

window.addEventListener('scroll', function () {
    // header.classList.toggle('active', window.scrollY > 50);
    backToTopBtn.classList.toggle('active', window.scrollY > 50);
});




