import renderFooter from "./blocks/footer/footer.js";
import renderHeader from "./blocks/header/header.js";
import renderHero from "./blocks/hero/hero.js";
import renderProcess from "./blocks/process/process.js";
import renderQuote from "./blocks/quote/quote.js";
import renderServices from "./blocks/services/services.js";
import renderStats from "./blocks/stats/stats.js";
import renderTestimonials from "./blocks/testimonials/testimonials.js";
import renderValues from "./blocks/values/values.js";
import renderWhatsapp from "./blocks/whatsapp/whatsapp.js";

const blockDecorators = {
    header: renderHeader,
    hero: renderHero,
    services: renderServices,
    values: renderValues,
    process: renderProcess,
    stats: renderStats,
    testimonials: renderTestimonials,
    quote: renderQuote,
    footer: renderFooter,
    whatsapp: renderWhatsapp
};

async function loadContent() {
    const contentPath = document.body.dataset.content || "content/home.json";
    const response = await fetch(contentPath);

    if (!response.ok) {
        throw new Error(`Could not load ${contentPath}`);
    }

    return response.json();
}

function decorateBlocks(content) {
    document.querySelectorAll("[data-block]").forEach((block) => {
        const blockName = block.dataset.block;
        const decorator = blockDecorators[blockName];

        if (!decorator) {
            return;
        }

        decorator(block, content[blockName] || {}, content);
        block.dataset.decorated = "true";
    });
}

function initMobileMenu() {
    const siteHeader = document.querySelector(".site-header");
    const menuToggle = document.querySelector(".menu-toggle");

    if (!siteHeader || !menuToggle) {
        return;
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = siteHeader.classList.toggle("menu-open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.querySelectorAll(".site-menu a").forEach((link) => {
        link.addEventListener("click", () => {
            siteHeader.classList.remove("menu-open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

async function initPage() {
    try {
        const pageContent = await loadContent();
        decorateBlocks(pageContent);
        initMobileMenu();
    } catch (error) {
        console.error(error);
        document.body.insertAdjacentHTML(
            "afterbegin",
            '<p class="content-error">Não foi possível carregar o conteúdo da página. Execute o site em um servidor local.</p>'
        );
    }
}

initPage();
