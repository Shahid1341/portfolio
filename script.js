// Sticky Navigation Bar
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Toggle icon (bars to times)
    const icon = menuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when link is clicked
const links = document.querySelectorAll('.nav-links li a');
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Scroll Reveal Animation (Intersection Observer)
const revealElements = document.querySelectorAll('.reveal');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// Active Link Highlight on Scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Modal Logic
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Re-enable scrolling
    }
}

// Close modal when clicking outside of modal-content
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

// ===== Hero Role Typing Animation =====

const roles = [
    "Software Engineer",
    ".NET Developer",
    "Backend Specialist",
    "API Developer",
    "SQL Performance Engineer"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const roleElement = document.getElementById("typingRole");

function typeRole() {

    const currentRole = roles[roleIndex];

    if (!isDeleting) {
        roleElement.textContent = currentRole.substring(0, charIndex++);
    } else {
        roleElement.textContent = currentRole.substring(0, charIndex--);
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentRole.length + 1) {
        speed = 1500;
        isDeleting = true;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(typeRole, speed);
}

typeRole();


const progresses = document.querySelectorAll(".progress")

window.addEventListener("scroll",()=>{

progresses.forEach(p=>{
const rect = p.getBoundingClientRect()

if(rect.top < window.innerHeight){
p.style.width = p.dataset.width + "%"
}

})

})


fetch("https://api.github.com/users/Shahid1341/repos")
.then(res=>res.json())
.then(data=>{

const container=document.getElementById("githubRepos")

data.slice(0,6).forEach(repo=>{

container.innerHTML+=`
<div class="repo-card">
<h3>${repo.name}</h3>
<p>${repo.language || ""}</p>
<a href="${repo.html_url}" target="_blank">View Repo</a>
</div>
`

})

})


const themeToggle = document.getElementById("themeToggle")
const icon = themeToggle.querySelector("i")

themeToggle.addEventListener("click", () => {

document.body.classList.toggle("light")

if(document.body.classList.contains("light")){
icon.classList.replace("fa-moon","fa-sun")
localStorage.setItem("theme","light")
}else{
icon.classList.replace("fa-sun","fa-moon")
localStorage.setItem("theme","dark")
}

})

if(localStorage.getItem("theme") === "light"){
document.body.classList.add("light")
icon.classList.replace("fa-moon","fa-sun")
}


// Animated Counters

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

const updateCount = () => {

const target = +counter.getAttribute("data-target");
const count = +counter.innerText;

const increment = target / 200;

if(count < target){

counter.innerText = Math.ceil(count + increment);
setTimeout(updateCount,20);

}else{
counter.innerText = target;
}

};

updateCount();

});




const glow = document.getElementById("cursorGlow");

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateGlow() {
    glow.style.left = mouseX + "px";
    glow.style.top = mouseY + "px";
    requestAnimationFrame(animateGlow);
}

animateGlow();



// Project Filter

const filterButtons = document.querySelectorAll(".project-filters button");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {

button.addEventListener("click", () => {

document.querySelector(".project-filters .active").classList.remove("active");
button.classList.add("active");

const filter = button.getAttribute("data-filter");

projectCards.forEach(card => {

if(filter === "all" || card.classList.contains(filter)){
card.style.display = "block";
}else{
card.style.display = "none";
}

});

});

});

const cardsTilt = document.querySelectorAll(".project-card");

cardsTilt.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0deg) rotateY(0deg)";
    });

});



// EMAILJS CONTACT FORM

(function () {
emailjs.init("mgmPMwJxzPBQqcCsp");
})();

const form = document.getElementById("contact-form");

form.addEventListener("submit", function (e) {

e.preventDefault();

Swal.fire({
title: 'Sending...',
allowOutsideClick: false,
didOpen: () => {
Swal.showLoading()
}
});

emailjs.sendForm(
"service_p0accje",
"template_ulasodh",
"#contact-form"
)
.then(() => {

Swal.fire({
icon: 'success',
title: 'Message Sent!',
text: 'I will get back to you soon.'
});

form.reset();

})
.catch(() => {

Swal.fire({
icon: 'error',
title: 'Failed!',
text: 'Please try again later.'
});

});

});



const fades=document.querySelectorAll(".fade-up")

window.addEventListener("scroll",()=>{

fades.forEach(el=>{
const rect=el.getBoundingClientRect()

if(rect.top < window.innerHeight){
el.classList.add("show")
}

})

})