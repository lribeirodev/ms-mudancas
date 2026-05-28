import { createElement, createLink } from "../../shared/dom.js";

export default function renderHero(block, content) {
    block.style.setProperty("--hero-image", `url("/${content.image}")`);

    const container = createElement("div", "container hero-layout");
    const heroContent = createElement("div", "hero-content");
    const heading = createElement("h1");
    const buttons = createElement("div", "hero-buttons");
    const features = createElement("div", "hero-features");

    features.setAttribute("aria-label", "Diferenciais da MS Mudanças");
    heading.append(document.createTextNode(`${content.title} `), createElement("span", "", content.highlight));

    content.buttons.forEach((button) => {
        buttons.appendChild(createLink(button, `btn btn-${button.variant}`));
    });

    content.features.forEach((item) => {
        const feature = createElement("article", "feature");
        const body = createElement("div");

        body.append(createElement("strong", "", item.title), createElement("p", "", item.description));
        feature.append(createElement("span", "feature-icon", item.icon), body);
        features.appendChild(feature);
    });

    heroContent.append(
        createElement("span", "eyebrow", content.eyebrow),
        heading,
        createElement("p", "", content.description),
        buttons,
        features
    );
    container.appendChild(heroContent);
    block.appendChild(container);
}
