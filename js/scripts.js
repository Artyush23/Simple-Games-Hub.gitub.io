// ელემენტების ანიმაციური გამოჩენა viewport-ში
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".section");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.1 });

    sections.forEach((section) => observer.observe(section));
});

// თამაშების ღილაკებზე კლიკით ეფექტი
function playGame(gameName) {
    const container = document.querySelector(".section-container");

    // ანიმაციის დამატება
    container.style.animation = "shake 0.5s";
    container.addEventListener("animationend", () => {
        container.style.animation = ""; // წაშლა რომ განმეორდეს
    });

    // ნოტიფიკაცია
    setTimeout(() => {
        alert(`Redirecting to the ${gameName} game!`);
        console.log(`Game "${gameName}" clicked.`);
    }, 500);
}

// ნავიგაციის ღილაკის ჩნობა page scroll-ის დროს
const scrollToTopButton = document.createElement("button");
scrollToTopButton.textContent = "↑ Top";
scrollToTopButton.id = "scrollToTop";
scrollToTopButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: var(--primary-color);
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
    box-shadow: var(--card-shadow);
    cursor: pointer;
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    transition: all 0.3s ease;
`;
document.body.appendChild(scrollToTopButton);

window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        scrollToTopButton.style.display = "flex";
    } else {
        scrollToTopButton.style.display = "none";
    }
});

scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// დინამიკური footer წლის განახლება
const footer = document.querySelector("footer p:last-of-type");
const currentYear = new Date().getFullYear();
footer.textContent = `© ${currentYear} Simple Games Hub. All rights reserved.`;

// shake ანიმაციის კოდის დამატება (CSS)
const style = document.createElement("style");
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        50% { transform: translateX(10px); }
        75% { transform: translateX(-10px); }
    }
`;
document.head.appendChild(style);
