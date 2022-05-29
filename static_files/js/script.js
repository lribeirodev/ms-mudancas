const PATH_BACKGROUND = "static_files/images/background-images/";
const ourValuesWrapperItems = [
    {
        title:'Segurança',
        image:'header.jpg',
        description:'Prestamos pela segurança do inicio ao fim'
    }, 
    {
        title:'Qualidade',
        image:'moving-box.jpg',
        description:'A qualidade que você merece em cada detalhe'
    },
    {
        title:'Atendimento',
        image:'call-center.jpg',
        description:'Temos um atedimento diferenciado'
    }
];
const CEP_ORIGEM = document.getElementById('CEP_ORIGEM');
const CEP_DESTINO = document.getElementById('CEP_DESTINO');
const PHONE_NUMBER = '11982631867';

function initServiceSection(){
    let ourValuesWrapper = document.getElementsByClassName('our-values-container')[0];
    ourValuesWrapperItems.forEach(item => {
        
        let div = document.createElement('div');
        let title = document.createElement('span');
        let divDesc = document.createElement('div');
        let description = document.createElement('span');

        div.classList.add('our-values-card');
        title.classList.add('our-values-card-title');
        divDesc.classList.add('our-values-description');
        divDesc.appendChild(description);
        
        div.style.backgroundImage = `url(${PATH_BACKGROUND}${item.image})`;
        title.innerText = item.title;
        description.innerText = item.description;
        
        div.appendChild(title);
        div.appendChild(divDesc);
        ourValuesWrapper.appendChild(div);

    });

}

function openServico(){
    window.open('#servico','_self');
}

function openSobre(){
    window.open('#sobre','_self');
}

function openOrcamento(){
    window.open('#orcamento','_self');
}

function eventCepOrigem(){
    CEP_ORIGEM.maxLength = 8;
    CEP_ORIGEM.type = 'number';
    if(CEP_ORIGEM.value.length === 8){
        fetch(`https://viacep.com.br/ws/${CEP_ORIGEM.value}/json/`)
            .then((v) => {return v.json()})
            .then((data) => {
                if(data.erro){
                    CEP_ORIGEM.style.backgroundColor = 'RED';
                }else{
                    CEP_ORIGEM.style.backgroundColor = '#FFFFFF';
                    document.forms[0].elements['UF_ORIGEM'].value = data.uf;
                    document.forms[0].elements['LOGRADOURO_ORIGEM'].value = data.logradouro;
                    document.getElementById('NUMERO_ORIGEM').focus();
                }
            }).catch((error) =>{
                CEP_ORIGEM.style.backgroundColor = 'RED';
            });
    }
}

function eventCepDestino(){
    CEP_DESTINO.maxLength = 8;
    CEP_DESTINO.type = 'number';
    if(CEP_DESTINO.value.length === 8){
        fetch(`https://viacep.com.br/ws/${CEP_DESTINO.value}/json/`)
        .then((v) => {return v.json()})
        .then((data) => {
            if(data.erro){
                CEP_DESTINO.style.backgroundColor = 'RED';
            }else{
                CEP_DESTINO.style.backgroundColor = '#FFFFFF';
                document.forms[0].elements['UF_DESTINO'].value = data.uf;
                document.forms[0].elements['LOGRADOURO_DESTINO'].value = data.logradouro;
                document.getElementById('NUMERO_DESTINO').focus();
            }
        }).catch((error) =>{
            CEP_DESTINO.style.backgroundColor = 'RED';
        });
    }
}

function sendMessage(){
    window.open(`https://wa.me/55${PHONE_NUMBER}`);
}

function sendMessageText(){
    
    let form = document.forms[0];
    let message = {
        nome : form.elements['NOME'].value,
        telefone : form.elements['TELEFONE'].value,
        servico : form.elements['SERVICO'].value,
        origem : {
            cep : form.elements['CEP_ORIGEM'].value,
            uf : form.elements['UF_ORIGEM'].value,
            logradouro : form.elements['LOGRADOURO_ORIGEM'].value,
            numero : form.elements['NUMERO_ORIGEM'].value,
        },
        destino : {
            cep : form.elements['CEP_DESTINO'].value,
            uf : form.elements['UF_DESTINO'].value,
            logradouro : form.elements['LOGRADOURO_DESTINO'].value,
            numero : form.elements['NUMERO_DESTINO'].value,
        },
        observacao : form.elements['OBS'].value
    };

    window.open(`https://wa.me/55${PHONE_NUMBER}?text=Olá estou enviando um pedido de orçamento, segue os meus dados abaixo${'%0a*NOME:* '+message.nome+'%0a*TELEFONE:* '+message.telefone+'%0a*TIPO SERVIÇO:* '+message.servico+'%0a%0a*CEP ORIGEM:* '+message.origem.cep+'%0a*UF:* '+message.origem.uf+'%0a*LOGRADOURO:* '+message.origem.logradouro+'%0a*NÚMERO:* '+message.origem.numero+'%0a%0a*CEP DESTINO:* '+message.destino.cep+'%0a*UF:* '+message.destino.uf+'%0a*LOGRADOURO:* '+message.destino.logradouro+'%0a*NÚMERO:* '+message.destino.numero+'%0a%0a*OBSERVAÇÃO:*%0a'+message.observacao}`)
}

initServiceSection();