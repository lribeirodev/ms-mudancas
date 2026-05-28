import { createElement } from "../../shared/dom.js";

export default function renderWhatsapp(block, content, pageContent) {
    const link = createElement("a", "float-button");

    link.href = `https://wa.me/${pageContent.site.whatsapp}`;
    link.target = "_blank";
    link.rel = "noopener";
    link.setAttribute("aria-label", `Falar com a ${pageContent.site.name} pelo WhatsApp`);
    link.innerHTML = '<svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="34" height="34" aria-hidden="true"><path d="M12.011719 2C6.505719 2 2.023484 6.478375 2.021484 11.984375c-.001 1.76.459985 3.478188 1.333985 4.992187L2 22l5.232422-1.236328c1.459.796 3.101437 1.213844 4.773437 1.214844h.003907c5.505 0 9.985281-4.479375 9.988281-9.984375.002-2.669-1.035875-5.178407-2.921875-7.066407C17.190172 3.040734 14.683719 2.001 12.011719 2zm-.001953 2c2.136.001 4.143343.833797 5.652343 2.341797 1.509 1.51 2.337938 3.516391 2.335938 5.650391-.002 4.404-3.584235 7.986328-7.990235 7.986328-1.333-.001-2.653406-.335704-3.816406-.970704l-.673828-.367187-.744141.175781-1.96875.464844.480469-1.785156.216797-.800782-.414063-.71875c-.698-1.208-.067406-2.589187-.066406-3.992187C4.023484 7.582375 7.606766 4 12.009766 4z"/></svg>';
    block.replaceWith(link);
}
