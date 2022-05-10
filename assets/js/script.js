function percorrerJSON(blocoComandos) {
    for(let cont in pizzaJson) {
        blocoComandos();
    }
}

function criarElementosFilho() {
    let elementosFilhos = {
        containerPizza: document.createElement("div"),
        topoContainer: document.createElement("div"),
        containerFotoPizza: document.createElement("div"),
        fotoPizza: document.createElement("img"),
        iconeAdicionar: document.createElement("div"),
        baseContainer: document.createElement("div"),
        txtPreco: document.createElement("p"),
        txtSabor: document.createElement("h2"),
        txtDescricao: document.createElement("h3")
    };

    return elementosFilhos;
}

function criarElementoPai(filhos) {
    filhos.containerPizza.appendChild(filhos.topoContainer);
    filhos.containerPizza.appendChild(filhos.baseContainer);

    filhos.topoContainer.appendChild(filhos.containerFotoPizza);
    filhos.topoContainer.appendChild(filhos.iconeAdicionar);
    
    filhos.baseContainer.appendChild(filhos.txtPreco);
    filhos.baseContainer.appendChild(filhos.txtSabor);
    filhos.baseContainer.appendChild(filhos.txtDescricao);
    
    filhos.containerFotoPizza.appendChild(filhos.fotoPizza);
    
    return filhos.containerPizza;
}

function inserirHtml() {
    let filhos = criarElementosFilho();
    let pai = criarElementoPai(filhos);
    
    let areaDasPizzas = document.getElementById("area-das-pizzas");
    areaDasPizzas.appendChild(pai);
}

function estruturaHtmlNaTela() {
    percorrerJSON(inserirHtml);
}

function percorrerEstruturaHTML(blocoComandos) {
    let areaDasPizzas = document.getElementById("area-das-pizzas");
    for(let cont in areaDasPizzas.children) {
        //Condição para não acessar itens indesejados desse "Array"
        if (cont < areaDasPizzas.children.length) {
            blocoComandos(cont);
        }
    }
}

function colocarConteudo(item) {
    let areaDasPizzas = document.getElementById("area-das-pizzas");

    areaDasPizzas.children[item].children[0].children[0].children[0].setAttribute("src", `${pizzaJson[item].img}`);
    areaDasPizzas.children[item].children[0].children[0].children[0].setAttribute("alt", `Foto de uma deliciosa pizza de ${pizzaJson[item].name}`);
    
    //"Condição" para colocar .00 no preço caso não tenha
    Number.isInteger(pizzaJson[item].price) ? areaDasPizzas.children[item].children[1].children[0].innerText = `R$ ${pizzaJson[item].price}.00` : areaDasPizzas.children[item].children[1].children[0].innerText = `R$ ${pizzaJson[item].price}`;

    areaDasPizzas.children[item].children[1].children[1].innerText = `${pizzaJson[item].name}`;
    areaDasPizzas.children[item].children[1].children[2].innerText = `${pizzaJson[item].description}`;
}

function colocarIdentificacao(item) {
    let areaDasPizzas = document.getElementById("area-das-pizzas");
    let contador = parseInt(item) + 1
    areaDasPizzas.children[item].setAttribute("json-id", `${pizzaJson[item].id}`);
}

function colocarEstilo(item) {
    let areaDasPizzas = document.getElementById("area-das-pizzas");
    areaDasPizzas.children[item].classList.add("container-pizza");

    areaDasPizzas.children[item].children[0].classList.add("topo-container");
    areaDasPizzas.children[item].children[1].classList.add("base-conteiner");

    areaDasPizzas.children[item].children[0].children[0].classList.add("container-foto-pizza");
    areaDasPizzas.children[item].children[0].children[1].classList.add("icone-adicionar");

    areaDasPizzas.children[item].children[0].children[0].children[0].classList.add("foto-pizza");
}

function colocarEventosProdutos(item) {
    let areaDasPizzas = document.getElementById("area-das-pizzas");
    areaDasPizzas.children[item].children[0].addEventListener("click", mostrarModal);

    areaDasPizzas.children[item].children[0].addEventListener("mouseover", destacarIconeAdicionar);

    areaDasPizzas.children[item].children[0].addEventListener("mouseout", suavizarIconeAdicionar);
}

function destacarIconeAdicionar(evento) {
    //Acessando a div do icone e colocando o estilo
    evento.currentTarget.children[1].classList.add("icone-adicionar-novo");
}

function suavizarIconeAdicionar(evento) {
    //Acessando a div do icone e retirando estilo
    evento.currentTarget.children[1].classList.remove("icone-adicionar-novo");
}

//------------------------------------- Area do modal -------------------------------------------

function mostrarModal(evento) {
    let modal = document.getElementById("modal-exemplo");
    modal.classList.remove("ocultar-modal");
    modal.classList.add("mostrar-modal");
    
    ocultarModal(modal);
    colocarConteudoModal(evento)
    destacarTamanhoGrande();
    valorPadraoQuantidadeModal();
    colocarEventoQuantidade();
}

function ocultarModal(modal) {
    let botaoCancelar = document.getElementById("botao-cancelar");
    botaoCancelar.addEventListener("click", function() {
        modal.classList.remove("mostrar-modal");
        modal.classList.add("ocultar-modal");
    });
}

function acessarItensModal() {
    let itens = {
        janelaModal: document.getElementById("janela-modal"),
        fotoModal: document.getElementById("foto-modal"),
        saborModal: document.getElementById("sabor-modal"),
        precoModal: document.getElementById("preco-modal"),
        descricaoModal: document.getElementById("descricao-modal"),
        tamanhosModal: {
            pequeno: document.getElementById("tamanho-pequeno"),
            medio: document.getElementById("tamanho-medio"),
            grande: document.getElementById("tamanho-grande")
        }
    };
    
    return itens;
}

function colocarConteudoModal(itemQueAtivou) {
    const jsonIdDoPai = itemQueAtivou.currentTarget.parentNode.getAttribute("json-id")
    const indexPaiNoJson = parseInt(jsonIdDoPai) - 1;

    let itensModal = acessarItensModal();

    itensModal.janelaModal.setAttribute("json-id", `${jsonIdDoPai}`)
    itensModal.fotoModal.setAttribute("src", `${pizzaJson[indexPaiNoJson].img}`);
    itensModal.fotoModal.setAttribute("alt", ` Foto de uma deliciosa pizza de ${pizzaJson[indexPaiNoJson].name}`);
    itensModal.saborModal.innerText = `${pizzaJson[indexPaiNoJson].name}`;
    itensModal.descricaoModal.innerText = `${pizzaJson[indexPaiNoJson].description}`;
    itensModal.tamanhosModal.pequeno.innerText = `${pizzaJson[indexPaiNoJson].sizes[0]}`;
    itensModal.tamanhosModal.medio.innerText = `${pizzaJson[indexPaiNoJson].sizes[1]}`;
    itensModal.tamanhosModal.grande.innerText = `${pizzaJson[indexPaiNoJson].sizes[2]}`;
    //Condição para adicionar ".00" se for um número inteiro
    Number.isInteger(pizzaJson[indexPaiNoJson].price) ? itensModal.precoModal.innerText = `R$ ${pizzaJson[indexPaiNoJson].price}.00` : itensModal.precoModal.innerText = `R$ ${pizzaJson[indexPaiNoJson].price}`;
}

function percorrerTamanhosModal(blocoComandos) {
    let tamanhos = document.getElementById("tamanhos");
    for(let cont in tamanhos.children) {
        //Condição para não acessar itens indesejados desse "Array"
        if (cont < tamanhos.children.length) {
            blocoComandos(tamanhos.children[cont]);
        }
    }
}

function colocarEventoTamanhos(filhoTamanhos) {
    filhoTamanhos.addEventListener("click", destacarTamanho);
}

//Por padrão, sempre que o modal for aberto o tamanho grande estará selecionado
function destacarTamanhoGrande() {
    percorrerTamanhosModal(suavizarTamanho)
    let tamanhoGrande = document.getElementById("tamanhos").children[2]
    tamanhoGrande.setAttribute("id", "tamanho-escolhido");
}

function destacarTamanho(evento) {
    percorrerTamanhosModal(suavizarTamanho);
    evento.currentTarget.setAttribute("id", "tamanho-escolhido");
}

function suavizarTamanho(elemento) {
    let idElemento = elemento.getAttribute("id");
    
    if(idElemento == "tamanho-escolhido") {
        elemento.removeAttribute("id");
    }
}

function colocarEventoQuantidade() {
    let botDiminuirQuantidade = document.getElementById("quantidade-modal").children[0];
    let botAumentarQuantidade = document.getElementById("quantidade-modal").children[2];

    botDiminuirQuantidade.addEventListener("click", diminuirQuantidade);
    botAumentarQuantidade.addEventListener("click", aumentarQuantidade);
}

function valorPadraoQuantidadeModal() {
    let txtQuantidade = document.getElementById("quantidade-modal").children[1];
    txtQuantidade.innerText = 1;
}

function diminuirQuantidade(evento) {
    let paiDoBotao = evento.currentTarget.parentNode;
    let txtQuantidade = paiDoBotao.children[1];
    let valorQuantidade = parseInt(txtQuantidade.innerText);
    if (valorQuantidade > 1) {
        valorQuantidade--;
        txtQuantidade.innerText = valorQuantidade;
    }
}

function aumentarQuantidade(evento) {
    let paiDoBotao = evento.currentTarget.parentNode;
    let txtQuantidade = paiDoBotao.children[1];
    let valorQuantidade = parseInt(txtQuantidade.innerText);
    valorQuantidade++;
    txtQuantidade.innerText = valorQuantidade;
}

//---------------------------------------- Area do Carirnho ------------------------------------

function adicionarCarrinho() {
    //Colocando evento no botão de Adicionar
    let botAdicionarCarrinho = document.getElementById("botao-adicionar-carrinho");

    //Colocando evento de clique
    botAdicionarCarrinho.addEventListener("click", function() {
        //Pegar as informações do modal
        let infoModal = {
            jsonIdModal: parseInt(document.getElementById("janela-modal").getAttribute("json-id")),
            tamanhoModal: document.getElementById("tamanho-escolhido").children[0].children[0].innerText,
            quantidadeModal: parseInt(document.getElementById("quantidade-modal").children[1].innerText)
        };
        
        console.log(infoModal)

        //Validando se é o primeiro pedido
        if (pizzasPedido.length == 0) {
            pizzasPedido.push(infoModal)
            console.log("primeiro pedido")
        } else {
            //Validando se é um produto repetido 
            let pedidoRepetido;
            let posicaoRepetido;
            //Percorrendo o array com os pedidos já selecionados
            for(let cont in pizzasPedido) {
                if(pizzasPedido[cont].jsonIdModal == infoModal.jsonIdModal && pizzasPedido[cont].tamanhoModal == infoModal.tamanhoModal) {
                    pedidoRepetido = true
                    posicaoRepetido = cont
                } 
            }
            
            if(pedidoRepetido == true) {
                console.log("pedido repetido")
                let novaQuantidade = infoModal.quantidadeModal + pizzasPedido[posicaoRepetido].quantidadeModal
                pizzasPedido[posicaoRepetido].quantidadeModal = novaQuantidade;
                
            } else {
                console.log("pedido novo");
                pizzasPedido.push(infoModal)
            }
        }
        console.log(pizzasPedido)
    });
}

function estruturaPizzaEscolhida() {
    let pizzaEscolhida = {
        container: document.createElement("div"),
        itensConteudo: document.createElement("span"),
        itensQuantidade: document.createElement("span"),
        conteudoFoto: document.createElement("img"),
        conteudoSabor: document.createElement("span"),
        quantidadeBotDiminuir: document.createElement("span"),
        quantidadeTxtQunatidade: document.createElement("span"),
        quantidadeBotAumentar: document.createElement("span")
    }

    return pizzaEscolhida;
}

function mostrarConsole() {
    console.log("teste");
}


let pizzasPedido = []




estruturaHtmlNaTela()

percorrerEstruturaHTML(colocarConteudo)
percorrerEstruturaHTML(colocarIdentificacao)
percorrerEstruturaHTML(colocarEstilo)
percorrerEstruturaHTML(colocarEventosProdutos)

percorrerTamanhosModal(colocarEventoTamanhos)

adicionarCarrinho()









