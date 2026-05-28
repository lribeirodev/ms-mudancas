import { createElement, createSectionTitle } from "../../shared/dom.js";

export default function renderValues(block, content) {
    const container = createElement("div", "container");
    const valuesGrid = createElement("div", "values-grid");
    const cards = createElement("div", "our-values-container");

    cards.setAttribute("aria-label", "Valores da empresa");

    content.items.forEach((item) => {
        const card = createElement("article", "our-values-card");
        const description = createElement("div", "our-values-description");

        card.style.backgroundImage = `url("${item.image}")`;
        description.appendChild(createElement("p", "", item.description));
        card.append(createElement("span", "our-values-card-title", item.title), description);
        cards.appendChild(card);
    });

    valuesGrid.appendChild(cards);
    container.append(createSectionTitle(content), valuesGrid);
    block.appendChild(container);
}
