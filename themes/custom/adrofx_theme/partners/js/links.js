

const calculatorLinks = {
    $rangeSlider: document.getElementById("mynum"),
    $rangeProgress: document.querySelector('.range__progress'),
    $rangeIndicator: document.querySelector(".range__indicator"),
    $rangeInput: document.querySelector('.range__input'),
    $renderNumber: document.querySelector(".render-number"),
    $button: document.querySelectorAll(".btn-button"),
    $btnStandard: document.querySelector(".btn-standard"),
    $btnCent: document.querySelector(".btn-cent"),
    $calculatorLabel: document.querySelectorAll('.ib-calculator__label'),
}

const mainHeaderLinks = {
    $toggleButton: document.querySelector('.toggle-menu'),
    $mobileMenu: document.querySelector('.mobile-menu'),
    $menu: document.querySelector('.menu'),
    $btnCLose: document.querySelector('.btn-close'),
    $menuLinks: document.querySelectorAll('.nav-list__link')
}


const counterLinks = {
    $counters: document.querySelectorAll('.cpa-program-advantages__body-title span'),
    $firstCounter: document.querySelector('.cpa-program-advantages__item:first-child'),
    $firstStep: document.querySelector(".step__img-container:first-child"),
    $progressBar: document.querySelectorAll(".step__progress svg circle"),
    $stepCounters: document.querySelectorAll(".step-counter"),
    $indicator: document.querySelector(".range__indicator"),
    $rangeProgress: document.querySelector('.range__progress'),
}

export { calculatorLinks, mainHeaderLinks, counterLinks };