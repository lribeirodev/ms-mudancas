import { createElement, createLink } from "../../shared/dom.js";

export default function renderHeader(block, content, pageContent) {
    const site = pageContent.site;
    const header = createElement("header", "site-header");
    const navbar = createElement("div", "container navbar");
    const logoLink = createElement("a", "logo-link");
    const logo = createElement("img", "logo");
    const menuButton = createElement("button", "menu-toggle");
    const nav = createElement("nav", "site-menu");
    const actions = createElement("div", "header-actions");

    logoLink.href = "#home";
    logoLink.setAttribute("aria-label", site.name);
    logo.src = site.logo;
    logo.alt = site.name;

    menuButton.type = "button";
    menuButton.setAttribute("aria-label", "Abrir menu");
    menuButton.setAttribute("aria-controls", "site-menu");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.append(createElement("span"), createElement("span"), createElement("span"));

    nav.id = "site-menu";
    content.navigation.forEach((item) => nav.appendChild(createLink(item)));

    actions.appendChild(createLink({ label: site.phone, href: site.phoneHref }, "phone-link"));
    actions.appendChild(createLink(content.cta, "btn btn-primary"));

    logoLink.appendChild(logo);
    navbar.append(logoLink, menuButton, nav, actions);
    header.appendChild(navbar);
    block.replaceWith(header);
}
