const mynum = document.getElementById('mynum');
if(mynum !== null) {
    mynum.addEventListener("input", (e) => {
        updateIndicator(e.target.value);
      });
    
}

const rangeSlider = document.querySelector("#mynum");
const indicator = document.querySelector(".range__indicator");
const progressBar = document.querySelector('.range__progress')
 

indicator.addEventListener("mousedown", () => {
  indicator.style.cursor = "grabbing";
  document.addEventListener("mousemove", moveIndicator);
  document.addEventListener("mouseup", stopMovingIndicator);
});

function updateIndicator(value) {
  indicator.innerHTML = Math.trunc(value);
  const offsetPercentage = (value - rangeSlider.min) / (rangeSlider.max - rangeSlider.min) * 97;
  indicator.style.left = `${offsetPercentage}%`;
  progressBar.style.width = `${(value - rangeSlider.min) / (rangeSlider.max - rangeSlider.min) * 100}%`

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

updateIndicator(rangeSlider.value);


// window.addEventListener("scroll", stepCounter);

// function hasReached(el) {
//     if(el === null)
//         return false;
//     const topPosition = el.getBoundingClientRect().top;

//     if(window.innerHeight >= topPosition + el.offsetHeight)
//         return true;
//     else return false;
// }

// function stepCounter() {
//     if (!hasReached(firstStep)) return;

//     stepCounters.forEach((counter, i) => {
//         let target = +counter.dataset.target;

//         if (window.innerWidth >= 575) {
//             let strokeValue = 271 - 271 * (target / 100);
//             progressBar[i].style.setProperty("--target", strokeValue);
//         } else {
//             let strokeValue = 428 - 428 * (target / 100);
//             progressBar[i].style.setProperty("--target", strokeValue);
//         }
//     });
//     progressBar.forEach(
//         (el) => (el.style.animation = "progress 2s ease-in-out forwards")
//     );
// }

// function getCheckedRadio() {
//     document
//         .querySelectorAll(".ib-calculator__label")
//         .forEach((el) => {
//             el.addEventListener("click", (e) => {
//                 const target = e.currentTarget;
//                 if (
//                     target.classList.contains(
//                         "ib-calculator__label"
//                     )
//                 ) {
//                     document
//                         .querySelectorAll(".ib-calculator__label")
//                         .forEach((el) => el.classList.remove("checked"));
//                 }

//                 if (
//                     target.classList.contains(
//                         "ib-calculator__label"
//                     )
//                 ) {
//                     target.classList.add("checked");
//                 }
//             });
//         });
// }
// getCheckedRadio();

// function selectAccount() {
//     document.querySelectorAll(".btn-button").forEach((btn) => {
//         btn.addEventListener("click", (e) => {
//             const targetBtn = e.target;

//             if (targetBtn.classList.contains("btn-button")) {
//                 document
//                     .querySelectorAll(".btn-button")
//                     .forEach((el) => el.classList.remove("active"));
//             }

//             if (targetBtn.classList.contains("btn-button")) {
//                 targetBtn.classList.add("active");
//             }
//         });
//     });
// }

// selectAccount();

// function renderResult(val) {
//     const btnStandard = document.querySelector(".btn-standard");
//     const btnCent = document.querySelector(".btn-cent");

//     if (btnCent.classList.contains("active")) {
//         document
//             .querySelectorAll(".ib-calculator__label")
//             .forEach((el, i) => {
//                 if (el.classList.contains("checked")) {
//                     const centData = +el.dataset.cent;
//                     document.querySelector(".render-number").innerHTML = (val * centData).toLocaleString();
//                     onHandleACtiveCheckbox(val);

//                 }
//             });
//     }

//     if (btnStandard.classList.contains("active")) {
//         document
//             .querySelectorAll(".ib-calculator__label")
//             .forEach((el, i) => {
//                 if (el.classList.contains("checked")) {
//                     const standardData = +el.dataset.standard;

//                     document.querySelector(".render-number").textContent = (val * standardData).toLocaleString();
//                     onHandleACtiveCheckbox(val);

//                 }
//             });
//     }
// }

// function onHandleACtiveCheckbox(val) {
//     const btnStandard = document.querySelector(".btn-standard");
//     const btnCent = document.querySelector(".btn-cent");

//     btnCent.addEventListener('click', () => {
//         updateCentCounter()

//         document
//             .querySelectorAll(".ib-calculator__label")
//             .forEach(el => {
//                 const centData = +el.dataset.cent

//                 if (el.classList.contains('checked')) {
//                     document.querySelector(".render-number").textContent = (val * centData).toLocaleString();
//                 }
//             });

//     })

//     btnStandard.addEventListener('click', () => {
//         updateStandardCounter()

//         document
//             .querySelectorAll(".ib-calculator__label")
//             .forEach(el => {
//                 if (el.classList.contains('checked')) {
//                     const standardData = +el.dataset.standard
//                     document.querySelector(".render-number").textContent = (val * standardData).toLocaleString();

//                 }
//             });
//     })



//     if ( btnStandard.classList.contains('active')) {
//         document
//             .querySelectorAll(".ib-calculator__label")
//             .forEach((el, i) => {
//                 el.addEventListener("click", () => {
//                     document.querySelector(".render-number").textContent = (val * +el.dataset.standard).toLocaleString();


//                 });
//             });

//     }

//     function updateCentCounter() {
//         document
//             .querySelectorAll(".ib-calculator__label")
//             .forEach((el, i) => {
//                 const centData = +el.dataset.cent
//                 el.addEventListener("click", () => {
//                     document.querySelector(".render-number").textContent = (val * centData).toLocaleString();
//                 });
//             });
//     }

//     function updateStandardCounter() {
//         document
//             .querySelectorAll(".ib-calculator__label")
//             .forEach((el, i) => {
//                 el.addEventListener("click", () => {
//                     document.querySelector(".render-number").textContent = (val * +el.dataset.standard).toLocaleString();
//                 });
//             });
//     }
// }

// function renderStartNumber() {
//     const inputMin = document.querySelector('.range__input').value
//     const btnStandard = document.querySelector(".btn-standard");
//     const btnCent = document.querySelector(".btn-cent");

//     document
//         .querySelectorAll(".ib-calculator__label")
//         .forEach(el => {

//             el.addEventListener('click', ()=>{
//                 if (el.classList.contains('checked') ) {
//                     const currentTarget = el.dataset.standard

//                     document.querySelector(".render-number").textContent = (inputMin * currentTarget).toLocaleString();

//                 }
//             })

//             if (el.classList.contains('checked') ) {
//                 const currentTarget = el.dataset.standard

//                 document.querySelector(".render-number").textContent = (inputMin * currentTarget).toLocaleString();

//             }
//         });

//     btnCent.addEventListener('click', () => {
//         document
//             .querySelectorAll(".ib-calculator__label")
//             .forEach(el => {

//                 if (el.classList.contains('checked')) {
//                     const currentTarget = el.dataset.cent

//                     document.querySelector(".render-number").textContent = (inputMin * currentTarget).toLocaleString();
//                 }
//             });
//     })

//     btnStandard.addEventListener('click', () => {
//         document
//             .querySelectorAll(".ib-calculator__label")
//             .forEach(el => {

//                 if (el.classList.contains('checked')) {
//                     const currentTarget = el.dataset.standard

//                     document.querySelector(".render-number").textContent = (inputMin * currentTarget).toLocaleString();
//                 }
//             });
//     })

// }
 


  