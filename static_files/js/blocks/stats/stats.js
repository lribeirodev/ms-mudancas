import { createElement } from "../../shared/dom.js";

export default function renderStats(block, content) {
    const grid = createElement("div", "container stats-grid");

    content.items.forEach((item) => {
        const stat = createElement("div");
        stat.append(
            createElement("span", "stat-icon", item.icon),
            createElement("strong", "", item.value),
            createElement("span", "", item.label)
        );
        grid.appendChild(stat);
    });

    block.appendChild(grid);
}
