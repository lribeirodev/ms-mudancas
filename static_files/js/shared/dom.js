export function createElement(tagName, className, text) {
    const element = document.createElement(tagName);

    if (className) {
        element.className = className;
    }

    if (text !== undefined && text !== null) {
        element.textContent = text;
    }

    return element;
}

export function createLink(item, className) {
    const link = createElement("a", className, item.label);
    link.href = item.href;

    if (item.external) {
        link.target = "_blank";
        link.rel = "noopener";
    }

    return link;
}

export function createSectionTitle(content) {
    const titleWrapper = createElement("div", "section-title");
    titleWrapper.appendChild(createElement("span", "", content.eyebrow));
    titleWrapper.appendChild(createElement("h2", "", content.title));
    return titleWrapper;
}
