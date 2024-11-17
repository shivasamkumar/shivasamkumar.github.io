// Toggle Appearance Setting
function settingtoggle() {
    document.getElementById("setting-container").classList.toggle("settingactivate");
    document.getElementById("visualmodetogglebuttoncontainer").classList.toggle("visualmodeshow");
}

// window.addEventListener("load", function () {
//     loader.style.display = "none";
//     document.querySelector('.hey').classList.add('popup');
//   })

  

// Toggle Visual Mode
function visualmode() {
    document.body.classList.toggle("light-mode");
    document.querySelectorAll(".needtobeinvert").forEach(function (element) {
        element.classList.toggle("invertapplied");
    });

    // Save the current mode to localStorage
    if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }
}




// Apply saved theme on load
window.addEventListener("scroll", () => {
    let currentSection = "";
    const sections = document.querySelectorAll("section, footer");

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (pageYOffset >= sectionTop - 200 && pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute("id");
        }
    });

    // Update the active state for desktop navbar
    const navLi = document.querySelectorAll(".navbar .navbar-tabs .navbar-tabs-ul li");
    navLi.forEach((li) => {
        li.classList.remove("activeThistab");
        if (li.querySelector('a').getAttribute('href').substring(1) === currentSection) {
            li.classList.add("activeThistab");
        }
    });

    // Update the active state for mobile navbar
    const mobilenavLi = document.querySelectorAll(".mobiletogglemenu .mobile-navbar-tabs-ul li");
    mobilenavLi.forEach((li) => {
    li.classList.remove("activeThismobiletab");
    if (li.querySelector('a').getAttribute('href').substring(1) === currentSection) {
        li.classList.add("activeThismobiletab");
        }
    });
});

// Hamburger Menu Functionality
function hamburgerMenu() {
    document.body.classList.toggle("stopscrolling");
    document.getElementById("mobiletogglemenu").classList.toggle("show-toggle-menu");
    document.getElementById("burger-bar1").classList.toggle("hamburger-animation1");
    document.getElementById("burger-bar2").classList.toggle("hamburger-animation2");
    document.getElementById("burger-bar3").classList.toggle("hamburger-animation3");
}

function hidemenubyli() {
    document.body.classList.remove("stopscrolling");
    document.getElementById("mobiletogglemenu").classList.remove("show-toggle-menu");
    document.getElementById("burger-bar1").classList.remove("hamburger-animation1");
    document.getElementById("burger-bar2").classList.remove("hamburger-animation2");
    document.getElementById("burger-bar3").classList.remove("hamburger-animation3");
}

// Scroll Back to Top Button
let mybutton = document.getElementById("backtotopbutton");
window.onscroll = function(){
    scrollFunction()
  };

function scrollFunction() {
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function scrolltoTopfunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

window.onscroll = function () {
    scrollFunction();
};


// Prevent right-click on images
document.addEventListener("contextmenu", function (e) {
    if (e.target.nodeName === "IMG") {
        e.preventDefault();
    }
}, false);

// Follow the mouse with eyes in footer
let Pupils = document.getElementsByClassName("footer-pupil"),
    pupilsArr = Array.from(Pupils),
    pupilStartPoint = -10,
    pupilRangeX = 20,
    pupilRangeY = 15,
    mouseXStartPoint = 0,
    mouseXEndPoint = window.innerWidth,
    currentXPosition = 0,
    fracXValue = 0,
    mouseYEndPoint = window.innerHeight,
    currentYPosition = 0,
    fracYValue = 0,
    mouseXRange = mouseXEndPoint - mouseXStartPoint;

const mouseMove = (e) => {
    fracXValue = (currentXPosition = e.clientX - mouseXStartPoint) / mouseXRange;
    fracYValue = (currentYPosition = e.clientY) / mouseYEndPoint;
    let t = pupilStartPoint + fracXValue * pupilRangeX,
        o = pupilStartPoint + fracYValue * pupilRangeY;
    pupilsArr.forEach(e => {
        e.style.transform = `translate(${t}px, ${o}px)`;
    });
};

const windowResize = (e) => {
    mouseXEndPoint = window.innerWidth;
    mouseYEndPoint = window.innerHeight;
    mouseXRange = mouseXEndPoint - mouseXStartPoint;
};

window.addEventListener("resize", windowResize);

// Add the following to reinitialize animations after resize
let resizeTimeout;

window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (typeof AOS !== 'undefined') {
            AOS.refresh();  // If using AOS library, refresh animations
        }
        reinitializeAnimations();  // Reinitialize custom animations if needed
    }, 200); // Debounce to improve performance
});

// Custom function to reinitialize animations
function reinitializeAnimations() {
    // Example: Reapply fade-in animation classes as needed
    const projectSections = document.querySelectorAll('.project-section');
    projectSections.forEach(section => {
        if (isElementInViewport(section)) {
            section.classList.add('fade-in');  // Add your fade-in class here
        }
    });
}

// Helper function to check if an element is in the viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

window.addEventListener("mousemove", mouseMove);
window.addEventListener("resize", windowResize);
