/*
This page is helped by AI Gemini. If there is any infringement, please contact me immediately
本页面由AI Gemini帮助完成，如果任何地方存在侵权，请立即联系我
 */
console.log(`

 ╱\\、
(˚ˎ。7  
 |、 ˜〵          
 じしˍ,)ノ

This page is helped by AI Gemini. If there is any infringement, please contact me immediately.

本页面由AI Gemini帮助完成，如果任何地方存在侵权，请立即联系我。

utopiaxc@utopiaxc.com

`);
document.addEventListener('DOMContentLoaded', () => {

    // --- DOM 元素引用 ---
    const docElement = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const langSwitcherButton = document.getElementById('lang-switcher-button');
    const langSwitcherMenu = document.getElementById('lang-switcher-menu');
    const currentLangSpan = document.getElementById('current-lang');
    const yearSpan = document.getElementById('current-year');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    // --- 功能设置函数 ---

    function applyTheme(theme) {
        if (theme === 'dark') {
            docElement.classList.add('dark-mode');
        } else {
            docElement.classList.remove('dark-mode');
        }
    }

    function setupThemeToggle() {
        if (!themeToggle) return;

        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        darkModeMediaQuery.addEventListener('change', (e) => {
            localStorage.removeItem('theme');
            applyTheme(e.matches ? 'dark' : 'light');
        });

        themeToggle.addEventListener('click', () => {
            const newTheme = docElement.classList.contains('dark-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    }

    async function setupI18n() {
        if (!langSwitcherButton) return;

        const loadedTranslations = {}; // 用于缓存已加载的语言文件
        const supportedLangs = ['en', 'zh', 'ja']; // 定义支持的语言

        const applyTranslations = (translations) => {
            const elements = document.querySelectorAll('[data-i18n-key]');
            elements.forEach(element => {
                const key = element.getAttribute('data-i18n-key');
                if (translations && translations[key]) {
                    element.innerHTML = translations[key];
                }
            });
        };

        const loadAndSetLanguage = async (lang) => {
            // 验证语言是否受支持，如果不支持则退回英语
            const effectiveLang = supportedLangs.includes(lang) ? lang : 'en';

            docElement.setAttribute('lang', effectiveLang);
            localStorage.setItem('language', effectiveLang);
            currentLangSpan.textContent = effectiveLang.toUpperCase();

            if (loadedTranslations[effectiveLang]) {
                applyTranslations(loadedTranslations[effectiveLang]);
                return;
            }

            try {
                const response = await fetch(`assets/i18n/${effectiveLang}.json`);
                if (!response.ok) throw new Error(`Could not load ${effectiveLang}.json`);
                const translations = await response.json();

                loadedTranslations[effectiveLang] = translations;
                applyTranslations(translations);

            } catch (error) {
                console.error('Failed to load or apply language:', error);
            }
        };

        // ---【新】语言优先级逻辑 ---
        // 1. 从 URL 参数获取
        const urlParams = new URLSearchParams(window.location.search);
        const langFromUrl = urlParams.get('lang');

        // 2. 确定初始语言 (URL 参数 > localStorage > 浏览器默认)
        const initialLang = langFromUrl || localStorage.getItem('language') || (navigator.language.startsWith('zh') ? 'zh' : (navigator.language.startsWith('ja') ? 'ja' : 'en'));

        // 加载并设置初始语言
        loadAndSetLanguage(initialLang);

        // --- 事件监听器保持不变 ---
        langSwitcherButton.addEventListener('click', (event) => {
            event.stopPropagation();
            langSwitcherButton.classList.toggle('active');
            langSwitcherMenu.classList.toggle('show');
        });

        langSwitcherMenu.addEventListener('click', (event) => {
            if (event.target.tagName === 'LI') {
                const lang = event.target.getAttribute('data-lang');
                loadAndSetLanguage(lang);
                langSwitcherButton.classList.remove('active');
                langSwitcherMenu.classList.remove('show');
            }
        });
    }

    function setupScrollObserver() {
        if (sections.length === 0) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    const id = entry.target.getAttribute('id');
                    const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                    if (activeLink) activeLink.classList.add('active');
                }
            });
        }, { root: null, rootMargin: '0px', threshold: 0.4 });
        sections.forEach(section => observer.observe(section));
    }

    function setupFooter() {
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    }

    function setupGlobalClickListener() {
        document.addEventListener('click', () => {
            if (langSwitcherMenu && langSwitcherMenu.classList.contains('show')) {
                langSwitcherButton.classList.remove('active');
                langSwitcherMenu.classList.remove('show');
            }
        });
    }

    // --- 初始化所有功能 ---
    setupThemeToggle();
    setupScrollObserver();
    setupFooter();
    setupGlobalClickListener();
    setupI18n();
});