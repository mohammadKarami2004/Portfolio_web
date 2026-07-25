// این فایل منطق رندر کردن سایت رو مدیریت می‌کنه.
// چیزی که باید ویرایش کنی توی js/config.js هست، نه اینجا.

let isFa = true;

function pick(field) {
    // field می‌تونه رشته‌ی ساده باشه یا { fa, en }
    if (typeof field === "string") return field;
    return isFa ? field.fa : field.en;
}

function renderHero() {
    document.getElementById("heroName").textContent = SITE_DATA.profile.firstName;
    document.getElementById("heroRole").textContent = SITE_DATA.profile.role;
    document.getElementById("heroTagline").textContent = pick(SITE_DATA.profile.tagline);
    document.getElementById("resumeBtn").setAttribute("href", SITE_DATA.profile.resumeUrl);
    document.getElementById("availabilityBadge").style.display = SITE_DATA.profile.availableForWork
        ? "inline-flex"
        : "none";
}

function renderPhone() {
    const screen = document.getElementById("phoneScreen");
    const dotsWrap = document.getElementById("phoneDots");
    const bgClasses = ["slide-bg-1", "slide-bg-2", "slide-bg-3"];
    const items = SITE_DATA.projects.slice(0, 3);

    screen.innerHTML = items
        .map(
            (p, i) => `
            <div class="screen-slide ${bgClasses[i % 3]} ${i === 0 ? "active" : ""}">
                <div class="slide-title">// ${p.title}</div>
                <div class="slide-block"></div>
                <div class="slide-block small"></div>
                <div class="slide-block tiny"></div>
            </div>`,
        )
        .join("");

    dotsWrap.innerHTML = items.map((_, i) => `<div class="dot ${i === 0 ? "active" : ""}"></div>`).join("");

    const slides = screen.querySelectorAll(".screen-slide");
    const dots = dotsWrap.querySelectorAll(".dot");
    let idx = 0;
    if (window.__phoneInterval) clearInterval(window.__phoneInterval);
    if (slides.length > 1) {
        window.__phoneInterval = setInterval(() => {
            slides[idx].classList.remove("active");
            dots[idx].classList.remove("active");
            idx = (idx + 1) % slides.length;
            slides[idx].classList.add("active");
            dots[idx].classList.add("active");
        }, 2600);
    }
}

function renderAbout() {
    document.getElementById("aboutParagraphs").innerHTML = SITE_DATA.about.paragraphs
        .map((p) => `<p>${pick(p)}</p>`)
        .join("");

    document.getElementById("stackList").innerHTML = SITE_DATA.about.stack
        .map((s) => `<span class="pill">${s}</span>`)
        .join("");

    document.getElementById("nowLearningText").textContent = pick(SITE_DATA.about.currentlyLearning);
}

function renderProjects() {
    document.getElementById("projectsGrid").innerHTML = SITE_DATA.projects
        .map((p) => {
            // اسکرین‌شات گوشی (عمودی) داخل قاب با پس‌زمینه‌ی محوشده از خودش نمایش داده می‌شه
            // تا کل عکس دیده بشه و مثل قبل بریده/زوم‌شده به‌نظر نرسه
            const media = p.image
                ? `<div class="media-backdrop" style="background-image:url('${p.image}')"></div>
                   <img src="${p.image}" alt="${p.title} preview" />`
                : `<div class="ph">${isFa ? "[ GIF پیش‌نمایش اپ ]" : "[ App preview GIF ]"}</div>`;

            const lock = p.isPrivate ? `<div class="lock-badge">🔒 Private / NDA</div>` : "";

            const badges = p.badges.map((b) => `<span class="badge">${b}</span>`).join("");

            const links = p.links
                .map((l) => {
                    const label = pick(l.label);
                    if (l.disabled) return `<span class="link-btn disabled">${label}</span>`;
                    return `<a href="${l.url}" class="link-btn" target="_blank" rel="noopener">${label}</a>`;
                })
                .join("");

            return `
                <div class="project-card reveal in">
                    <div class="project-media">${lock}${media}</div>
                    <div class="project-body">
                        <h3>${p.title}</h3>
                        <p>${pick(p.description)}</p>
                        <div class="badges">${badges}</div>
                        <div class="project-links">${links}</div>
                    </div>
                </div>`;
        })
        .join("");
}

function renderSkills() {
    document.getElementById("skillsCols").innerHTML = SITE_DATA.skills
        .map(
            (col) => `
            <div class="skill-col reveal in">
                <h4>${col.label}</h4>
                ${col.items.map((i) => `<span class="pill">${i}</span>`).join("")}
            </div>`,
        )
        .join("");
}

function renderContact() {
    document.getElementById("contactLinks").innerHTML = SITE_DATA.social
        .map((s) => `<a href="${s.url}" class="btn btn-ghost" target="_blank" rel="noopener">${s.label}</a>`)
        .join("");
}

function renderDynamicSections() {
    renderHero();
    renderPhone();
    renderAbout();
    renderProjects();
    renderSkills();
    renderContact();
}

// ── i18n برای متن‌های ثابت (نویگیشن، تیتر بخش‌ها و...) ──
const langBtn = document.getElementById("langBtn");
const i18nEls = document.querySelectorAll("[data-en]");
const i18nPlaceholders = document.querySelectorAll("[data-en-placeholder]");
i18nEls.forEach((el) => {
    el.dataset.fa = el.innerHTML;
});
i18nPlaceholders.forEach((el) => {
    el.dataset.faPlaceholder = el.getAttribute("placeholder");
});

function applyStaticLang() {
    document.body.setAttribute("dir", isFa ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", isFa ? "fa" : "en");
    i18nEls.forEach((el) => {
        el.innerHTML = isFa ? el.dataset.fa : el.dataset.en;
    });
    i18nPlaceholders.forEach((el) => {
        el.setAttribute("placeholder", isFa ? el.dataset.faPlaceholder : el.dataset.enPlaceholder);
    });
}

langBtn.addEventListener("click", () => {
    isFa = !isFa;
    applyStaticLang();
    renderDynamicSections();
});

// ── scroll reveal ──
function setupReveal() {
    const revealEls = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    e.target.classList.add("in");
                    io.unobserve(e.target);
                }
            });
        },
        { threshold: 0.15 },
    );
    revealEls.forEach((el) => io.observe(el));
}

// ── contact form (Formspree) ──
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const formMsgs = {
    demo: {
        fa: "این فرم دمو است — بعد از ساخت فرم در Formspree، آدرس action رو جایگزین کن تا واقعی بشه.",
        en: "This form is a demo — replace the action URL with your real Formspree endpoint to activate it.",
    },
    sending: { fa: "در حال ارسال...", en: "Sending..." },
    success: {
        fa: "پیام شما ارسال شد، ممنون از تماستون!",
        en: "Your message was sent, thank you for reaching out!",
    },
    error: {
        fa: "ارسال پیام با خطا مواجه شد، لطفاً دوباره تلاش کنید.",
        en: "Something went wrong sending your message, please try again.",
    },
};
contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const action = contactForm.getAttribute("action");
    if (action.includes("YOUR_FORM_ID")) {
        formStatus.textContent = isFa ? formMsgs.demo.fa : formMsgs.demo.en;
        formStatus.className = "form-status";
        return;
    }
    formStatus.textContent = isFa ? formMsgs.sending.fa : formMsgs.sending.en;
    formStatus.className = "form-status";
    try {
        const res = await fetch(action, {
            method: "POST",
            body: new FormData(contactForm),
            headers: { Accept: "application/json" },
        });
        if (res.ok) {
            formStatus.textContent = isFa ? formMsgs.success.fa : formMsgs.success.en;
            formStatus.className = "form-status success";
            contactForm.reset();
        } else {
            formStatus.textContent = isFa ? formMsgs.error.fa : formMsgs.error.en;
            formStatus.className = "form-status error";
        }
    } catch (err) {
        formStatus.textContent = isFa ? formMsgs.error.fa : formMsgs.error.en;
        formStatus.className = "form-status error";
    }
});

// ── init ──
renderDynamicSections();
applyStaticLang();
setupReveal();
