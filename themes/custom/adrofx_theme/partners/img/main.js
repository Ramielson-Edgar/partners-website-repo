// const { default: gsap } = require("./gsap");

window.addEventListener('load', () => {
    const rangeSlider = document.getElementById('mynum');
    if (rangeSlider !== null) {
        rangeSlider.addEventListener("input", (e) => {
            updateIndicator(e.target.value);
        });

    }
    const firstStep = document.querySelector(
        ".step__img-container:first-child"
    );
    const progressBar = document.querySelectorAll(
        ".step__progress svg circle"
    );
    const stepCounters = document.querySelectorAll(".step-counter");
    const indicator = document.querySelector(".range__indicator");
    const rangeProgress = document.querySelector('.range__progress')
    const headerMenuLinks = document.querySelectorAll('.partnership-programs__nav-link')

    let isDragging = false;

   if(indicator) {
    
    indicator.addEventListener("mousedown", () => {
        startDragging();

        indicator.style.cursor = "grabbing";
        document.addEventListener("mousemove", moveIndicator);
        document.addEventListener("mouseup", stopMovingIndicator);
    });

    indicator.addEventListener("touchstart", (e) => {
        e.preventDefault(); 
        startDragging();
      });


    document.addEventListener("touchend", () => {
        stopDragging();
      });

      document.addEventListener("touchmove", (e) => {
        if (isDragging) {
          e.preventDefault(); 
          moveIndicator(e.touches[0]);
        }
      });
   }
      

    function updateIndicator(value) {
        indicator.innerHTML = Math.trunc(value);

        if (window.innerWidth < 575) {
            const offsetPercentage = (value - rangeSlider.min) / (rangeSlider.max - rangeSlider.min) * 89;
            indicator.style.left = `${offsetPercentage}%`;
            rangeProgress.style.width = `${(value - rangeSlider.min) / (rangeSlider.max - rangeSlider.min) * 100}%`
        } else {
            const offsetPercentage = (value - rangeSlider.min) / (rangeSlider.max - rangeSlider.min) * 97;
            indicator.style.left = `${offsetPercentage}%`;
            rangeProgress.style.width = `${(value - rangeSlider.min) / (rangeSlider.max - rangeSlider.min) * 100}%`
        }


        renderResult(value);
    }

    function moveIndicator(e) {
        const rect = rangeSlider.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const sliderWidth = rect.width;

        const percentage = Math.min(100, Math.max(0, (offsetX / sliderWidth) * 100));

        const newValue = (percentage * (rangeSlider.max - rangeSlider.min)) / 100 + parseFloat(rangeSlider.min);
        rangeSlider.value = newValue;
        updateIndicator(newValue);
    }


    function stopMovingIndicator() {
        indicator.style.cursor = "pointer";
        document.removeEventListener("mousemove", moveIndicator);
        document.removeEventListener("mouseup", stopMovingIndicator);
    }

    if (rangeSlider !== null)
        updateIndicator(rangeSlider.value);

    function startDragging() {
        isDragging = true;
        indicator.style.cursor = "grabbing";
      }

      function stopDragging() {
        isDragging = false;
        indicator.style.cursor = "pointer";
      }



    window.addEventListener("scroll", stepCounter);

    function hasReached(el) {
        if(el === null)
            return false;
        const topPosition = el.getBoundingClientRect().top;

        if(window.innerHeight >= topPosition + el.offsetHeight)
            return true;
        else return false;
    }

    function stepCounter() {
        if (!hasReached(firstStep)) return;

        stepCounters.forEach((counter, i) => {
            let target = +counter.dataset.target;

            if (window.innerWidth >= 575) {
                let strokeValue = 271 - 271 * (target / 100);
                progressBar[i].style.setProperty("--target", strokeValue);
            } else {
                let strokeValue = 428 - 428 * (target / 100);
                progressBar[i].style.setProperty("--target", strokeValue);
            }
        });
        progressBar.forEach(
            (el) => (el.style.animation = "progress 2s ease-in-out forwards")
        );
    }

    function getCheckedRadio() {
        document
            .querySelectorAll(".ib-calculator__label")
            .forEach((el) => {
                el.addEventListener("click", (e) => {
                    const target = e.currentTarget;
                    if (
                        target.classList.contains(
                            "ib-calculator__label"
                        )
                    ) {
                        document
                            .querySelectorAll(".ib-calculator__label")
                            .forEach((el) => el.classList.remove("checked"));
                    }

                    if (
                        target.classList.contains(
                            "ib-calculator__label"
                        )
                    ) {
                        target.classList.add("checked");
                    }
                });
            });
    }
    getCheckedRadio();

    function selectAccount() {
        document.querySelectorAll(".btn-button").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const targetBtn = e.target;

                if (targetBtn.classList.contains("btn-button")) {
                    document
                        .querySelectorAll(".btn-button")
                        .forEach((el) => el.classList.remove("active"));
                }

                if (targetBtn.classList.contains("btn-button")) {
                    targetBtn.classList.add("active");
                }
            });
        });
    }

    selectAccount();

    function renderResult(val) {
        const btnStandard = document.querySelector(".btn-standard");
        const btnCent = document.querySelector(".btn-cent");

        if (btnCent.classList.contains("active")) {
            document
                .querySelectorAll(".ib-calculator__label")
                .forEach((el, i) => {
                    if (el.classList.contains("checked")) {
                        const centData = +el.dataset.cent;
                        document.querySelector(".render-number").innerHTML = (val * centData).toLocaleString();
                        onHandleACtiveCheckbox(val);

                    }
                });
        }

        if (btnStandard.classList.contains("active")) {
            document
                .querySelectorAll(".ib-calculator__label")
                .forEach((el, i) => {
                    if (el.classList.contains("checked")) {
                        const standardData = +el.dataset.standard;

                        document.querySelector(".render-number").textContent = (val * standardData).toLocaleString();
                        onHandleACtiveCheckbox(val);

                    }
                });
        }
    }

    function onHandleACtiveCheckbox(val) {
        const btnStandard = document.querySelector(".btn-standard");
        const btnCent = document.querySelector(".btn-cent");

        btnCent.addEventListener('click', () => {
            updateCentCounter()

            document
                .querySelectorAll(".ib-calculator__label")
                .forEach(el => {
                    const centData = +el.dataset.cent

                    if (el.classList.contains('checked')) {
                        document.querySelector(".render-number").textContent = (val * centData).toLocaleString();
                    }
                });

        })

        btnStandard.addEventListener('click', () => {
            updateStandardCounter()

            document
                .querySelectorAll(".ib-calculator__label")
                .forEach(el => {
                    if (el.classList.contains('checked')) {
                        const standardData = +el.dataset.standard
                        document.querySelector(".render-number").textContent = (val * standardData).toLocaleString();

                    }
                });
        })



        if (btnStandard.classList.contains('active')) {
            document
                .querySelectorAll(".ib-calculator__label")
                .forEach((el, i) => {
                    el.addEventListener("click", () => {
                        document.querySelector(".render-number").textContent = (val * +el.dataset.standard).toLocaleString();


                    });
                });

        }

        function updateCentCounter() {
            document
                .querySelectorAll(".ib-calculator__label")
                .forEach((el, i) => {
                    const centData = +el.dataset.cent
                    el.addEventListener("click", () => {
                        document.querySelector(".render-number").textContent = (val * centData).toLocaleString();
                    });
                });
        }

        function updateStandardCounter() {
            document
                .querySelectorAll(".ib-calculator__label")
                .forEach((el, i) => {
                    el.addEventListener("click", () => {
                        document.querySelector(".render-number").textContent = (val * +el.dataset.standard).toLocaleString();
                    });
                });
        }
    }

    function renderStartNumber() {
        const inputMin = document.querySelector('.range__input').value
        const btnStandard = document.querySelector(".btn-standard");
        const btnCent = document.querySelector(".btn-cent");

        document
            .querySelectorAll(".ib-calculator__label")
            .forEach(el => {

                el.addEventListener('click', () => {
                    if (el.classList.contains('checked')) {
                        const currentTarget = el.dataset.standard

                        document.querySelector(".render-number").textContent = (inputMin * currentTarget).toLocaleString();

                    }
                })

                if (el.classList.contains('checked')) {
                    const currentTarget = el.dataset.standard

                    document.querySelector(".render-number").textContent = (inputMin * currentTarget).toLocaleString();

                }
            });

        btnCent.addEventListener('click', () => {
            document
                .querySelectorAll(".ib-calculator__label")
                .forEach(el => {

                    if (el.classList.contains('checked')) {
                        const currentTarget = el.dataset.cent

                        document.querySelector(".render-number").textContent = (inputMin * currentTarget).toLocaleString();
                    }
                });
        })

        btnStandard.addEventListener('click', () => {
            document
                .querySelectorAll(".ib-calculator__label")
                .forEach(el => {

                    if (el.classList.contains('checked')) {
                        const currentTarget = el.dataset.standard

                        document.querySelector(".render-number").textContent = (inputMin * currentTarget).toLocaleString();
                    }
                });
        })

    }

    if(document.querySelector('.range__input') !== null)
        renderStartNumber()

    const toggleButton = document.querySelector('.toggle-menu')
    const mobileMenu = document.querySelector('.mobile-menu')
    const menu = document.querySelector('.menu')
    const btnCLose = document.querySelector('.btn-close')
    const menuLinks =document.querySelectorAll('.partnership-programs__nav-link')

    function onHandleToggleMenu () {
        if (toggleButton !== null) {
            toggleButton.addEventListener('click', (e) => {
                e.preventDefault();
                mobileMenu.classList.toggle('is-active');
                menu.classList.toggle('is-active');
            })

            menu.addEventListener('click', (e) => {
                const isMenuClicked = mobileMenu.contains(e.target);

                if (!isMenuClicked) {
                    menu.classList.remove('is-active')
                }

            })

            btnCLose.addEventListener('click', () => {
                menu.classList.remove('is-active')
            })

            menuLinks.forEach(el => el.addEventListener('click', () => {
                menu.classList.remove('is-active')
            }))

        } else {
            return
        }
     
        // toggleButton.addEventListener('click',(e)=>{
        //     mobileMenu.classList.toggle('is-active')
        //     menu.classList.toggle('is-active')
        // })

        // menu.addEventListener('click',(e)=>{

        //     const isMenuClicked = mobileMenu.contains(e.target);
        //     console.log(isMenuClicked)

        //     if(!isMenuClicked) {
        //         menu.classList.remove('is-active')
        //     }

        // })

        // btnCLose.addEventListener('click',()=>{
        //     menu.classList.remove('is-active')
        // })

        // menuLinks.forEach( el => el.addEventListener('click',()=>{
        //     menu.classList.remove('is-active')
        // }))


    }

    onHandleToggleMenu ();
    const partnershipProgramsHeader = document.querySelector('.partnership-programs-header');

    const counters = document.querySelectorAll('.cpa-program-advantages__body-title span')
    const firstCounter = document.querySelector('.cpa-program-advantages__item:first-child')

    window.addEventListener('scroll', () => {
        benefitsCounter()
    })

    function hasReachedBenefits(el) {
        let top = el.getBoundingClientRect().top

        if (window.innerHeight >= top + el.offsetHeight) return true
        return false
    }

    function updateCounter(num, maxNum) {
        const currentNum = +num.innerText

        if (currentNum < maxNum) {
            num.innerText = currentNum + 1;
            setTimeout(() => {
                updateCounter(num, maxNum)
            }, 3)
        }
    }

    function benefitsCounter() {
        if (!hasReachedBenefits) return false

        counters.forEach(el => {
            let target = el.dataset.target

            setTimeout(() => {
                updateCounter(el, target)
            }, 400)
        })
    }


    function onHandleActiveMenuTab () {
        headerMenuLinks.forEach( link => {
            link.addEventListener('click', () => {
                 removeActiveClassLink()
                link.classList.add('is-active')
            })
        })
    }

    onHandleActiveMenuTab ()

    function removeActiveClassLink() {
        headerMenuLinks.forEach(link => link.classList.remove('is-active'))
    }


    // =========== Gsap ============= //
    gsap.config({ nullTargetWarn: false });

    gsap.to(".cpa-program-icons", {
        scrollTrigger: {
            start: "top bottom",
            scrub: 1,
        },
        y: 100,
    })

    gsap.to(".cpa-program-feedback", {
        scrollTrigger: {
            start: "top bottom",
            scrub: 1,
        },
        y: -100,
    })

    gsap.to(".profit-icons", {
        scrollTrigger: {
            start: "top bottom",
            scrub: 1,
        },
        y: 60,
    })

    gsap.to(".ib-hero-icons", {
        scrollTrigger: {
            trigger: ".ib-hero-icons",
            scrub: 1,
        },
        y: 50,
    })

    gsap.to(".ib-rebate-icons", {
        scrollTrigger: {
            trigger: ".ib-rebate-icons",
            scrub: 1,
        },
        y: 50,
    })

    gsap.to(".ib-copy-trade-icons", {
        scrollTrigger: {
            trigger: ".ib-copy-trade-icons",
            scrub: 1,
        },
        y: 50,
    })

    gsap.to(".hybrid-program-icons", {
        scrollTrigger: {
            trigger: ".hybrid-program-icons",
            scrub: 1,
        },
        y: 30,
    })

    gsap.to(".hybrid-hero-icons ", {
        scrollTrigger: {
            trigger: ".hybrid-hero-icons",
            scrub: 1,
        },
        y: 30,
    })

    ScrollTrigger.matchMedia({
        '(min-width:768px)': function () {

            gsap.set(".panel", { zIndex: (i, target, targets) => targets.length - i });

            var images = gsap.utils.toArray('.panel:not(.img-5)');

            images.forEach((image, i) => {

                var tl = gsap.timeline({

                    scrollTrigger: {
                        trigger: " .wrapper",
                        start: () => "top -" + (window.innerHeight * (i + 0.1)),
                        end: () => "+=" + window.innerHeight,
                        scrub: 1,
                    }
                })

                tl.to(image, { "clip-path": "inset(0 0 200% 0)", ease: "power1.inOut", });

            });



            gsap.set(".panel-text", { zIndex: (i, target, targets) => targets.length - i });

            const texts = gsap.utils.toArray('.panel-text');

            texts.forEach((text, i) => {

                var tl = gsap.timeline({

                    scrollTrigger: {
                        trigger: ".wrapper",
                        start: () => "top -" + (window.innerHeight * i),
                        end: () => "+=" + window.innerHeight,
                        scrub: 1,
                    }

                })

                gsap
                    .from(text, {
                        scrollTrigger: {
                            trigger: text,
                            start: "top bottom",
                            scrub: 1,
                        },
                        duration: 1, y: 50,
                    })

            });

        },

    })
})
window.onload = function () {
    (function ($) {
        $(document).ready(function () {
            $('#notification button.close').on('click', (function (e) {
                e.preventDefault();
                $('#notification').hide('slow');
            }));
            const currentButton = $('.partnership-programs-plans__btn-container .btn-base')
            currentButton.hover(function () {
                if ($(this).hasClass('btn-base-small')) {
                    $(this).addClass('is-active')
                    $(this).removeClass('btn-base-small')
                    $(this).addClass('btn-base-lg')
                }

                $(this).siblings($('.btn-base')).removeClass('is-active')
                $(this).siblings($(".btn-base")).removeClass('btn-base-lg')
                $(this).siblings($(".btn-base")).addClass('btn-base-small')
            });

            $('.owl-carousel-plans').owlCarousel({
                loop: true,
                margin: 10,
                nav: false,

                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 1,
                        autoplayTimeout: 5000,
                        stagePadding: 0,
                        URLhashListener: true,
                        autoplayHoverPause: true,
                        startPosition: "URLHash",
                    },
                    900: {
                        items: 2,
                        nav: false,
                    }
                }
            })

            $('.owl-carousel-awards').owlCarousel({
                loop: true,
                margin: 10,
                nav: false,

                responsive: {
                    0: {
                        items: 2
                    },
                    575: {
                        items: 2,
                        autoplayTimeout: 5000,
                        stagePadding: 0,
                        URLhashListener: true,
                        autoplayHoverPause: true,
                        startPosition: "URLHash",
                    },

                }
            })

            $('.owl-carousel-features').owlCarousel({
                loop: false,
                margin: 10,
                nav: false,
                dots: true,
                autoplayTimeout: 5000,
                stagePadding: 0,
                URLhashListener: true,
                autoplayHoverPause: true,
                startPosition: "URLHash",
                responsive: {
                    0: {
                        items: 1,
                        dots: true,
                    },
                    600: {
                        items: 1,
                        dots: true,
                    },

                },

            })

            $('.owl-carousel-advantages').owlCarousel({
                loop: true,
                margin: 10,
                nav: true,

                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: false,
                startPosition: "URLHash",
                responsive: {
                    0: {
                        items: 1,
                        nav: false,
                    },
                    600: {
                        nav: false,
                        items: 1
                    },
                    900: {
                        items: 2,
                        nav: false,
                    }

                }
            })

            $('.banner-carousel').owlCarousel({
                loop: true,
                margin: 10,
                nav: false,
                dots:true,

                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: false,
                responsive: {
                    0: {
                        items: 1,
                        dots:true,
                    },
                    600: {
                        dots:true,
                        items: 1
                    },
                    900: {
                        items: 1,
                        dots:true,

                    }

                }
            })

            function collapsed() {
                $(".card-header h2").find("button").addClass('collapsed')
            }
            collapsed()

            // plans carousel//
            $('.owl-carousel-price').owlCarousel({
                loop: false,
                margin: 30,
                stagePadding: 50,
                nav: false,
                responsive: {
                    0: {
                        items: 1,
                        stagePadding: 0,
                        margin: 10,
                    },
                    600: {
                        items: 1
                    },

                }
            })

            // plans benefits//
            $('.advantages-carousel').owlCarousel({
                loop: false,
                margin: 10,
                stagePadding: 50,
                nav: false,
                responsive: {
                    0: {
                        items: 1,
                        stagePadding: 0,
                        margin: 10,
                    },
                    600: {
                        items: 1
                    },

                }
            })

            // plans benefits//
            $('.owl-carousel-why').owlCarousel({
                loop: false,
                margin: 10,
                nav: false,
                autoplay: true,
                autoplayTimeout: 3000,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        items: 1,
                        margin: 20,
                    },
                    600: {
                        items: 1,
                        nav: false,
                    },

                }
            })

            $('.owl-carousel-hybrid').owlCarousel({
                loop: true,
                margin: 10,
                nav: false,
                autoplay: true,
                autoplayTimeout: 3000,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        items: 1,
                        dots: true,
                    },
                    600: {
                        items: 2,
                        nav: false,
                        dots: true,
                        stagePadding: 30,
                        margin: 10,
                    },

                }
            })

            if($('#splide-ib-benefits').length) {
               new Splide('#splide-ib-benefits', {
                    type: 'loop',
                    focus: 'center',
                    gap: 10,
                    height: '15rem',
    
                    pagination: false,
                    arrows: false,
    
                    autoScroll: {
                        speed: 2,
                        pauseOnHover: false,
                        pauseOnFocus: false,
                    },
    
    
                    perPage: 5,
                    breakpoints: {
                        1440: {
                            perPage: 4,
                        },
                        1198: {
                            perPage: 4,
                        },
                        991: {
                            perPage: 3,
                        },
                        800: {
                            perPage: 2,
                        },
                        600: {
                            perPage: 1,
                        }
                    },
                }).mount(window.splide.Extensions);
            }
           
            if($('#splide-first').length){
                new Splide('#splide-first', {
                    type: 'loop',
                    drag: 'free',
                    focus: 'center',
                    perPage: 3,
                    pagination: false,
                    arrows: false,
                    dots: false,
                    autoScroll: {
                        speed: 1,
                    },
                    breakpoints: {

                        575: {
                            perPage: 2,
                        },
                        320: {
                            perPage: 1,
                        },
                    }
                }).mount(window.splide.Extensions);
            }
        })
    })(jQuery)
}
