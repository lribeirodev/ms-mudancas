import { createElement, createLink, createSectionTitle } from "../../shared/dom.js";

export default function renderServices(block, content) {
    const container = createElement("div", "container");
    const grid = createElement("div", "services-grid");

    content.items.forEach((item) => {
        const card = createElement("article", "service-card");
        const media = createElement("div", "service-media");
        const image = createElement("img");
        const icon = createElement("img", "service-icon");
        const cardContent = createElement("div", "service-content");
        
        icon.src = item.icon;
        image.src = item.image;
        image.alt = item.alt || item.title;
        media.append(image, icon);
        cardContent.append(
            createElement("h3", "", item.title),
            createElement("p", "", item.description),
            createLink(item.link)
        );
        card.append(media, cardContent);
        grid.appendChild(card);
    });

    container.append(createSectionTitle(content), grid);
    block.appendChild(container);
}
