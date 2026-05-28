import { createElement, createSectionTitle } from "../../shared/dom.js";

export default function renderTestimonials(block, content) {
    const container = createElement("div", "container");
    const grid = createElement("div", "testimonials-grid");

    content.items.forEach((item) => {
        const card = createElement("article", "testimonial-card");
        const person = createElement("div", "testimonial-person");
        const avatar = createElement("span", "testimonial-avatar", item.name.charAt(0));
        const body = createElement("div");

        body.append(createElement("strong", "", item.name), createElement("span", "", item.service));
        person.append(avatar, body);
        card.append(
            createElement("span", "quote-mark", "“"),
            createElement("p", "", item.quote),
            createElement("span", "rating", item.rating),
            person
        );
        grid.appendChild(card);
    });

    container.append(createSectionTitle(content), grid);
    block.appendChild(container);
}
