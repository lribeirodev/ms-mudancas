import { createElement, createLink } from "../../shared/dom.js";

export default function renderQuote(block, content) {
    block.style.setProperty("--quote-image", `url("/${content.background}")`);

    const container = createElement("div", "container route-layout");
    const copy = createElement("div", "quote-copy");
    const title = createElement("h2");
    const featureList = createElement("div", "route-features");
    const buttons = createElement("div", "route-actions");

    title.append(document.createTextNode(content.title.replace(content.highlight, "")), createElement("span", "", content.highlight));

    content.features.forEach((item) => {
        const feature = createElement("article", "route-feature");
        const body = createElement("div");

        body.append(createElement("strong", "", item.title), createElement("p", "", item.description));
        const img = createElement("img", "route-feature-icon");
        img.src = item.icon;
        feature.append(img, body);
        featureList.appendChild(feature);
    });

    content.buttons.forEach((button) => {
        buttons.appendChild(createLink(button, `btn btn-${button.variant}`));
    });

    copy.append(
        createElement("span", "eyebrow", content.eyebrow),
        title,
        createElement("p", "", content.description),
        featureList,
        buttons
    );

    container.appendChild(copy);
    block.appendChild(container);
}
