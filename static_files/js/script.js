const PATH_BACKGROUND = "static_files/images/background-images/";
const PHONE_NUMBER = "11982631867";

const ourValuesWrapperItems = [
    {
        title: "Segurança",
        image: "header.jpg",
        description: "Proteção dos seus bens desde a embalagem até a entrega."
    },
    {
        title: "Qualidade",
        image: "moving-box.jpg",
        description: "Organização em cada etapa para uma mudança mais tranquila."
    },
    {
        title: "Atendimento",
        image: "call-center.jpg",
        description: "Contato próximo para orientar, tirar dúvidas e combinar detalhes."
    }
];

const CEP_ORIGEM = document.getElementById("CEP_ORIGEM");
const CEP_DESTINO = document.getElementById("CEP_DESTINO");
const quoteForm = document.getElementById("quote-form");
const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");

function initValuesSection() {
    const ourValuesWrapper = document.querySelector(".our-values-container");

    if (!ourValuesWrapper) {
        return;
    }

    ourValuesWrapper.innerHTML = "";

    ourValuesWrapperItems.forEach((item) => {
        const card = document.createElement("article");
        const title = document.createElement("span");
        const descriptionWrapper = document.createElement("div");
        const description = document.createElement("p");

        card.classList.add("our-values-card");
        title.classList.add("our-values-card-title");
        descriptionWrapper.classList.add("our-values-description");

        card.style.backgroundImage = `url(${PATH_BACKGROUND}${item.image})`;
        title.innerText = item.title;
        description.innerText = item.description;

        descriptionWrapper.appendChild(description);
        card.appendChild(title);
        card.appendChild(descriptionWrapper);
        ourValuesWrapper.appendChild(card);
    });
}

function setCepState(input, state) {
    input.classList.toggle("field-error", state === "error");
}

function onlyNumbers(value) {
    return value.replace(/\D/g, "").slice(0, 8);
}

function fillAddressFields(prefix, data) {
    const uf = document.getElementById(`UF_${prefix}`);
    const logradouro = document.getElementById(`LOGRADOURO_${prefix}`);
    const numero = document.getElementById(`NUMERO_${prefix}`);

    uf.value = data.uf || "";
    logradouro.value = data.logradouro || "";
    numero.focus();
}

function searchCep(input, prefix) {
    input.value = onlyNumbers(input.value);

    if (input.value.length !== 8) {
        setCepState(input, "idle");
        return;
    }

    fetch(`https://viacep.com.br/ws/${input.value}/json/`)
        .then((response) => response.json())
        .then((data) => {
            if (data.erro) {
                setCepState(input, "error");
                return;
            }

            setCepState(input, "ok");
            fillAddressFields(prefix, data);
        })
        .catch(() => {
            setCepState(input, "error");
        });
}

function eventCepOrigem() {
    searchCep(CEP_ORIGEM, "ORIGEM");
}

function eventCepDestino() {
    searchCep(CEP_DESTINO, "DESTINO");
}

function sendMessage() {
    window.open(`https://wa.me/55${PHONE_NUMBER}`, "_blank");
}

function getFormValue(form, fieldName) {
    return form.elements[fieldName]?.value.trim() || "";
}

function buildWhatsappMessage(form) {
    const message = [
        "Olá, estou enviando um pedido de orçamento. Seguem meus dados:",
        "",
        `*NOME:* ${getFormValue(form, "NOME")}`,
        `*TELEFONE:* ${getFormValue(form, "TELEFONE")}`,
        `*TIPO SERVIÇO:* ${getFormValue(form, "SERVICO")}`,
        "",
        `*CEP ORIGEM:* ${getFormValue(form, "CEP_ORIGEM")}`,
        `*UF:* ${getFormValue(form, "UF_ORIGEM")}`,
        `*LOGRADOURO:* ${getFormValue(form, "LOGRADOURO_ORIGEM")}`,
        `*NÚMERO:* ${getFormValue(form, "NUMERO_ORIGEM")}`,
        "",
        `*CEP DESTINO:* ${getFormValue(form, "CEP_DESTINO")}`,
        `*UF:* ${getFormValue(form, "UF_DESTINO")}`,
        `*LOGRADOURO:* ${getFormValue(form, "LOGRADOURO_DESTINO")}`,
        `*NÚMERO:* ${getFormValue(form, "NUMERO_DESTINO")}`,
        "",
        `*OBSERVAÇÃO:* ${getFormValue(form, "OBS")}`
    ];

    return encodeURIComponent(message.join("\n"));
}

function sendMessageText(event) {
    event?.preventDefault();

    if (quoteForm && !quoteForm.reportValidity()) {
        return;
    }

    const form = quoteForm || document.forms[0];
    window.open(`https://wa.me/55${PHONE_NUMBER}?text=${buildWhatsappMessage(form)}`, "_blank");
}

function initMobileMenu() {
    if (!siteHeader || !menuToggle) {
        return;
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = siteHeader.classList.toggle("menu-open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.querySelectorAll(".site-menu a").forEach((link) => {
        link.addEventListener("click", () => {
            siteHeader.classList.remove("menu-open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

initValuesSection();
initMobileMenu();
quoteForm?.addEventListener("submit", sendMessageText);
