// ══════════════════════════════════════════════════════════════════
//  فقط همین فایل رو ویرایش کن.
//  فایل‌های دیگه (app.js, style.css) رو دست نزن مگه بلد باشی.
//
//  هر جا { fa: "...", en: "..." } دیدی یعنی متن فارسی و انگلیسی
//  جدا از همه؛ هر دو رو پر کن تا دکمه‌ی FA/EN بالای سایت درست کار کنه.
// ══════════════════════════════════════════════════════════════════

const SITE_DATA = {
    // ─── اطلاعات کلی (بالای صفحه) ─────────────────────────────────
    profile: {
        firstName: "Mohammad", // اسمی که با گرادیان بنفش نمایش داده می‌شه
        role: "Android Developer · Kotlin & Jetpack Compose",
        availableForWork: true, // اگه false باشه، نوار "در دسترس برای همکاری" مخفی می‌شه
        tagline: {
            fa: "توسعه‌دهنده‌ی اندروید با تمرکز بر معماری تمیز و تجربه‌ی کاربری روان؛ از پیاده‌سازی رابط کاربری با Jetpack Compose تا مدیریت داده و همگام‌سازی با Coroutines و Room.",
            en: "Android developer focused on clean architecture and smooth UX — from building interfaces with Jetpack Compose to managing data and sync with Coroutines and Room.",
        },
        // لینک دانلود فایل رزومه (PDF) - فایل رزومه رو کنار index.html بذار
        resumeUrl: "resume.pdf",
    },

    // ─── شبکه‌های اجتماعی (بخش تماس) ──────────────────────────────
    social: [
        { label: "LinkedIn", url: "#" },
        { label: "GitHub", url: "#" },
        { label: "Telegram", url: "#" },
    ],

    // ─── بخش «درباره من» ───────────────────────────────────────────
    about: {
        // هر پاراگراف یک آیتم؛ برای تاکید از <strong>...</strong> استفاده کن
        paragraphs: [
            {
                fa: "مسیر حرفه‌ای‌ام را از <strong>مهندسی کامپیوتر</strong> آغاز کردم و به توسعه‌ی <strong>اندروید</strong> ادامه دادم؛ در حال حاضر مسیر <strong>فول‌استک</strong> را نیز دنبال می‌کنم تا توانایی توسعه‌ی کامل یک محصول را داشته باشم.",
                en: "I started my professional path in <strong>Computer Engineering</strong> and moved into <strong>Android development</strong>; I'm currently expanding into <strong>full-stack</strong> to be able to build a complete product end-to-end.",
            },
            {
                fa: "تمرکز اصلی‌ام بر نوشتن کدی با معماری تمیز، قابل نگهداری و مقیاس‌پذیر است. در کنار برنامه‌نویسی، به بدنسازی می‌پردازم؛ نظم و پشتکاری که در این حوزه کسب کرده‌ام، در روند کاری‌ام نیز بازتاب دارد.",
                en: "My main focus is writing clean, maintainable, and scalable code. Outside of programming, I do bodybuilding — the discipline and consistency I've built there carries over into how I work.",
            },
        ],
        stack: [
            "Kotlin",
            "Jetpack Compose",
            "MVVM",
            "Clean Architecture",
            "Coroutines / Flow",
            "Hilt / Koin",
            "Retrofit",
            "Room",
            "ML Kit",
            ".NET / ASP.NET Core",
        ],
        currentlyLearning: {
            fa: "ASP.NET Core برای بک‌اند + معماری چندماژولی در Compose",
            en: "ASP.NET Core for backend + multi-module architecture in Compose",
        },
    },

    // ─── پروژه‌ها (بخش «پروژه‌ها») ──────────────────────────────────
    // برای هر پروژه:
    //   image: مسیر عکس یا گیف (بذارش توی پوشه‌ی assets/) یا null برای پلیس‌هولدر
    //          نکته: عکس‌های عمودی گوشی خودشون قاب می‌شن، نیازی به کراپ کردن نیست
    //   isPrivate: true اگه کد خصوصی/NDA هست (نشان قفل نشون داده می‌شه)
    //   links: هر آیتم { label, url } یا { label, disabled:true } برای دکمه‌ی غیرفعال
    projects: [
        {
            title: "Bulletin News",
            image: "assets/bulletin-news.png",
            isPrivate: false,
            description: {
                fa: "اپ خبری آفلاین-فرست با معماری Clean Architecture، صفحه‌بندی Paging 3 + RemoteMediator، کش محلی با Room و سینک پس‌زمینه با WorkManager.",
                en: "Offline-first news app with Clean Architecture, Paging 3 + RemoteMediator, local Room caching, and background sync via WorkManager.",
            },
            badges: ["Compose", "Paging 3", "Hilt", "Room", "WorkManager"],
            links: [
                { label: "GitHub ↗", url: "https://github.com/mohammadKarami2004/Bulletin" },
            ],
        },
        {
            title: "GuessThePlayer",
            image: null,
            isPrivate: false,
            description: {
                fa: "بازی حدس بازیکن فوتبال با انیمیشن‌های روان و منطق بازی مبتنی بر State در Compose.",
                en: "A football player guessing game with smooth animations and state-driven game logic in Compose.",
            },
            badges: ["Compose", "MVVM", "Coroutines"],
            links: [
                { label: "GitHub ↗", url: "#" },
                { label: "Google Play ↗", url: "#" },
            ],
        },
        {
            title: "SmartReceipt",
            image: null,
            isPrivate: true,
            description: {
                fa: "تشخیص هوشمند اطلاعات رسید با پردازش تصویر؛ برای یک کارفرمای خصوصی توسعه داده شده.",
                en: "Smart receipt data extraction using image processing; built for a private client.",
            },
            badges: ["ML Kit", "Room", "Hilt"],
            links: [
                { label: { fa: "کد محرمانه است", en: "Code is confidential" }, disabled: true },
                { label: { fa: "دموی ویدیویی ↗", en: "Demo video ↗" }, url: "#" },
            ],
        },
        {
            title: "StudentManagerAPI",
            image: null,
            isPrivate: false,
            description: {
                fa: "بک‌اند مدیریت دانشجویان با ASP.NET Core و اتصال به اپ اندروید سمت کلاینت.",
                en: "Student management backend built with ASP.NET Core, connected to the Android client app.",
            },
            badges: ["ASP.NET Core", "EF Core", "REST"],
            links: [{ label: "GitHub ↗", url: "#" }],
        },
    ],

    // ─── مهارت‌ها ───────────────────────────────────────────────────
    skills: [
        {
            label: "// Android",
            items: ["Kotlin", "Jetpack Compose", "XML Views", "Coroutines", "Room", "WorkManager"],
        },
        {
            label: "// Backend",
            items: ["ASP.NET Core", "EF Core", "REST API", "SQL Server"],
        },
        {
            label: "// Tools",
            items: ["Git", "Android Studio", "Figma", "Postman"],
        },
    ],
};
