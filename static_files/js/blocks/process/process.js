import { createElement, createSectionTitle } from "../../shared/dom.js";

export default function renderProcess(block, content) {
    const container = createElement("div", "container");
    const grid = createElement("div", "process-grid");

    content.items.forEach((item) => {
        const card = createElement("article", "process-card");
        card.append(
            createElement("span", "process-icon", item.icon || item.number),
            createElement("h3", "", `${item.number}. ${item.title}`),
            createElement("p", "", item.description)
        );
        grid.appendChild(card);
    });

    container.append(createSectionTitle(content), grid);
    block.appendChild(container);
}
