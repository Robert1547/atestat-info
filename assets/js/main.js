document.addEventListener("DOMContentLoaded", () => {

    // --- Mobile Hamburger Menu ---
    const nav = document.querySelector('nav');
    if (nav) {
        const hamburgerBtn = document.createElement('button');
        hamburgerBtn.className = 'hamburger-btn toggle-btn';
        hamburgerBtn.innerHTML = '☰ Meniu';
        hamburgerBtn.style.alignSelf = 'center';

        nav.insertBefore(hamburgerBtn, nav.firstChild);

        hamburgerBtn.addEventListener('click', () => {
            nav.classList.toggle('nav-open');
        });
    }

    // --- Dark Mode Logic ---
    const darkModeBtn = document.getElementById("darkModeToggle");
    const body = document.body;
    
    // Verificare setare anterioara in localStorage
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-theme");
        if(darkModeBtn) darkModeBtn.innerHTML = "☀️ <span class='lang-ro'>Luminos</span><span class='lang-en'>Light</span>";
    }

    if(darkModeBtn) {
        darkModeBtn.addEventListener("click", () => {
            body.classList.toggle("dark-theme");
            
            if (body.classList.contains("dark-theme")) {
                localStorage.setItem("darkMode", "enabled");
                darkModeBtn.innerHTML = "☀️ <span class='lang-ro'>Luminos</span><span class='lang-en'>Light</span>";
                updateLangDisplay(); // Re-apply language display to the dynamically changed HTML
            } else {
                localStorage.setItem("darkMode", "disabled");
                darkModeBtn.innerHTML = "🌙 <span class='lang-ro'>Întunecat</span><span class='lang-en'>Dark</span>";
                updateLangDisplay();
            }
        });
    }

    // --- Language Logic ---
    const langBtn = document.getElementById("langToggle");
    
    // Funcție pentru a forța redarea corectă a limbilor în cazul în care conținutul e editat dinamic
    function updateLangDisplay() {
        const isEnglish = body.classList.contains("en-mode");
        const roSpans = document.querySelectorAll(".lang-ro");
        const enSpans = document.querySelectorAll(".lang-en");
        
        if (isEnglish) {
            roSpans.forEach(s => s.style.display = "none");
            enSpans.forEach(s => s.style.display = "inline-block");
            if(langBtn) langBtn.innerHTML = "🌍 RO"; // Butonul va arăta opțiunea de a comuta pe română
        } else {
            roSpans.forEach(s => s.style.display = "inline-block");
            enSpans.forEach(s => s.style.display = "none");
            if(langBtn) langBtn.innerHTML = "🌍 EN"; // Butonul va arăta opțiunea de a comuta pe engleză
        }
    }

    if (localStorage.getItem("lang") === "en") {
        body.classList.add("en-mode");
    }

    if (langBtn) {
        langBtn.addEventListener("click", () => {
            body.classList.toggle("en-mode");
            
            if (body.classList.contains("en-mode")) {
                localStorage.setItem("lang", "en");
            } else {
                localStorage.setItem("lang", "ro");
            }
            updateLangDisplay();
        });
    }

    // Rulare inițială pentru a seta corect textele din butoane
    updateLangDisplay();
});
