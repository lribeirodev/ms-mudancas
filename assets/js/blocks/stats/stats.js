import { createElement } from "../../shared/dom.js";

const animationDuration = 2000;

function getNumericStat(value) {
    const text = String(value);
    const match = text.match(/^([^0-9]*)([\d.,]+)([^0-9]*)$/);

    if (!match) {
        return null;
    }

    const [, prefix, numberText, suffix] = match;
    const normalizedNumber = Number(numberText.replace(/\./g, "").replace(",", "."));

    if (!Number.isFinite(normalizedNumber)) {
        return null;
    }

    return {
        prefix,
        suffix,
        target: normalizedNumber,
        decimals: numberText.includes(",") ? numberText.split(",")[1].length : 0
    };
}

function formatStatValue(value, stat) {
    const formattedValue = Math.round(value).toLocaleString("pt-BR", {
        maximumFractionDigits: stat.decimals,
        minimumFractionDigits: stat.decimals
    });

    return `${stat.prefix}${formattedValue}${stat.suffix}`;
}

function animateStat(element, stat) {
    const startTime = performance.now();

    const update = (currentTime) => {
        const progress = Math.min((currentTime - startTime) / animationDuration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = stat.target * easedProgress;

        element.textContent = formatStatValue(currentValue, stat);

        if (progress < 1) {
            requestAnimationFrame(update);
            return;
        }

        element.textContent = formatStatValue(stat.target, stat);
    };

    requestAnimationFrame(update);
}

function initStatsAnimation(block) {
    const statElements = [...block.querySelectorAll("[data-stat-target]")];

    if (!statElements.length) {
        return;
    }

    const runAnimations = () => {
        statElements.forEach((element) => {
            const stat = getNumericStat(element.dataset.statTarget);

            if (!stat) {
                return;
            }

            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                element.textContent = element.dataset.statTarget;
                return;
            }

            animateStat(element, stat);
        });
    };

    if (!("IntersectionObserver" in window)) {
        runAnimations();
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            if (!entries.some((entry) => entry.isIntersecting)) {
                return;
            }

            runAnimations();
            observer.disconnect();
        },
        { threshold: 0.35 }
    );

    observer.observe(block);
}

export default function renderStats(block, content) {
    const grid = createElement("div", "container stats-grid");

    content.items.forEach((item) => {
        const stat = createElement("div");
        const value = createElement("strong", "", item.value);
        const numericStat = getNumericStat(item.value);

        if (numericStat) {
            value.textContent = formatStatValue(0, numericStat);
            value.dataset.statTarget = item.value;
        }

        stat.append(
            createElement("span", "stat-icon", item.icon),
            value,
            createElement("span", "", item.label)
        );
        grid.appendChild(stat);
    });

    block.appendChild(grid);
    initStatsAnimation(block);
}
