import { createElement, createLink } from "../../shared/dom.js";

export default function renderFooter(block, content, pageContent) {
    const site = pageContent.site;
    const footer = createElement("footer", "site-footer");
    const grid = createElement("div", "container footer-grid");
    const brand = createElement("div");
    const logo = createElement("img");
    const bottom = createElement("p", "footer-bottom", site.copyright);

    logo.src = site.logo;
    logo.alt = site.name;
    brand.append(logo, createElement("p", "", content.description));
    grid.appendChild(brand);

    content.columns.forEach((column) => {
        const columnWrapper = createElement("div");
        columnWrapper.appendChild(createElement("h3", "", column.title));
        column.links.forEach((link) => columnWrapper.appendChild(createLink(link)));
        grid.appendChild(columnWrapper);
    });

    footer.append(grid, bottom);
    block.replaceWith(footer);
}
