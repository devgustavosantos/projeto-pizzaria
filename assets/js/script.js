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
    areaDasPizzas.children[item].children[1].classList.add("base-container");

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
    
    eventoBotoesModal()
    colocarConteudoModal(evento)
    destacarTamanhoGrande();
    valorPadraoQuantidadeModal();
    colocarEventoQuantidade();
}

function eventoBotoesModal() {
    let botaoCancelar = document.getElementById("botoes-cancelar-voltar");
    let botAdicionarCarrinho = document.getElementById("botao-adicionar-carrinho");

    botaoCancelar.addEventListener("click", ocultarModal);
    botAdicionarCarrinho.addEventListener("click", adicionarCarrinho);
}

function ocultarModal() {
    let modal = document.getElementById("modal-exemplo");
    modal.classList.remove("mostrar-modal");
    modal.classList.add("ocultar-modal");
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
    //Pegar as informações do modal
    let infoModal = coletarInfoModal();

    //Validando se é o primeiro pedido
    if (pizzasPedido.length == 0) {
        console.log("primeiro pedido")
        adicionarNovoProduto(infoModal);
        atualizarAreaCarrinho();
        ocultarModal();
    } else {
        //Validando se é um produto repetido 
        let infoProdutoRepetido = validarProdutoRepetido(infoModal);
        
        if(infoProdutoRepetido == false) {
            console.log("pedido novo");
            adicionarNovoProduto(infoModal)
            atualizarAreaCarrinho();
            ocultarModal()
        } else {
            console.log("pedido repetido")
            pizzasPedido[infoProdutoRepetido.posicaoRepetido].quantidadeModal += infoModal.quantidadeModal;
            atualizarAreaCarrinho();
            ocultarModal();
        }
    }
    console.log(pizzasPedido)
}

function coletarInfoModal() {
    return {
        jsonIdModal: parseInt(document.getElementById("janela-modal").getAttribute("json-id")),
        tamanhoModal: document.getElementById("tamanho-escolhido").children[0].children[0].innerText,
        quantidadeModal: parseInt(document.getElementById("quantidade-modal").children[1].innerText)
    };
}

function adicionarNovoProduto(infoModal) {
    pizzasPedido.push(infoModal);
}

function validarProdutoRepetido(infoModal) {
    for(let cont in pizzasPedido) {
        if(pizzasPedido[cont].jsonIdModal == infoModal.jsonIdModal && pizzasPedido[cont].tamanhoModal == infoModal.tamanhoModal) {
            //Se retornar apenas a posição(cont), e o primeiro "item" do array for igual ao que está no modal, ele vai considerar que não há itens repetidos (pois 0 é igual a false), e vai colocar como se fosse um novo pedido.
            let infoProdutoRepetido = {
                pedidoRepetido: true,
                posicaoRepetido: cont
            }
            return infoProdutoRepetido;
        } 
    }
    return false;
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

function organizarPizzaEscolhida(pizza) {
    pizza.container.appendChild(pizza.itensConteudo);
    pizza.container.appendChild(pizza.itensQuantidade);

    pizza.itensConteudo.appendChild(pizza.conteudoFoto);
    pizza.itensConteudo.appendChild(pizza.conteudoSabor);

    pizza.itensQuantidade.appendChild(pizza.quantidadeBotDiminuir);
    pizza.itensQuantidade.appendChild(pizza.quantidadeTxtQunatidade);
    pizza.itensQuantidade.appendChild(pizza.quantidadeBotAumentar);

    return pizza.container;
}

function limparAreaCarrinho() {
    let areaDasPizzas = document.getElementById("area-pizzas-escolhidas");
    areaDasPizzas.innerHTML = "";
}

function colocarHtmlCarrinho(container) {
    let areaDasPizzas = document.getElementById("area-pizzas-escolhidas");
    areaDasPizzas.appendChild(container);
}

function percorrerPizzasPedido(blocoComandos) {
    for(let cont in pizzasPedido) {
        blocoComandos(cont);
    }
}

function mostrarEstruturaCarrinho() {
    let estrutura = estruturaPizzaEscolhida();
    let container = organizarPizzaEscolhida(estrutura);
    colocarHtmlCarrinho(container);
}

function percorrerElementosCarrinho(blocoComandos) {
    let pizzasEscolhidas = document.getElementById("area-pizzas-escolhidas");
    for(let cont in pizzasEscolhidas.children) {
        //Condição para não acessar itens indesejados desse "Array"
        if (cont < pizzasEscolhidas.children.length) {
            blocoComandos(cont, pizzasEscolhidas);
        }
    }
}

function identificarElementosCarrinho(cont, elemento) {
    elemento.children[cont].setAttribute("json-id", `${pizzasPedido[cont].jsonIdModal}`);
    elemento.children[cont].setAttribute("index-carrinho", `${cont}`)
}


function colocarConteudoCarrinho(cont, elemento) {
    let jsonIdProduto = elemento.children[cont].getAttribute("json-id");
    let indexDoProduto = parseInt(jsonIdProduto) - 1;

    elemento.children[cont].children[0].children[0].setAttribute("src", `${pizzaJson[indexDoProduto].img}`);
    elemento.children[cont].children[0].children[0].setAttribute("alt", `Foto de uma deliciosa pizza sabor: ${pizzaJson[indexDoProduto].name}`);
    elemento.children[cont].children[0].children[1].innerText = `${pizzaJson[indexDoProduto].name} (${pizzasPedido[cont].tamanhoModal.substr(0, 1)})`;

    elemento.children[cont].children[1].children[0].innerText = "-";
    elemento.children[cont].children[1].children[1].innerText = `${pizzasPedido[cont].quantidadeModal}`;
    elemento.children[cont].children[1].children[2].innerText = "+";
}

function colocarEstiloCarrinho(cont, elemento) {
    elemento.children[cont].classList.add("pizza-escolhida");
    
    elemento.children[cont].children[0].classList.add("escolhida-foto-nome");
    elemento.children[cont].children[1].classList.add("quantidade-carrinho");
    elemento.children[cont].children[1].classList.add("botoes-quantidade");

    elemento.children[cont].children[0].children[0].classList.add("foto-pizza-escolhida");
}


function atualizarAreaCarrinho() {
    limparAreaCarrinho();
    percorrerPizzasPedido(validarQuantidadePizzaPedidos);
    percorrerPizzasPedido(mostrarEstruturaCarrinho);
    percorrerElementosCarrinho(identificarElementosCarrinho);
    percorrerElementosCarrinho(colocarConteudoCarrinho);
    percorrerElementosCarrinho(colocarEstiloCarrinho);
    percorrerElementosCarrinho(colocarEventosCarrinho);
    percorrerPizzasPedido(atualizarSubtotal)
    atualizarDesconto();
    atualizarTotal();
   
    verificarVersao();


    quantidadeItensCarrinho()

}

function colocarEventosCarrinho(cont, elemento) {
    let botDiminuirQuantidade = elemento.children[cont].children[1].children[0];
    let botAumentarQuantidade = elemento.children[cont].children[1].children[2];

    botDiminuirQuantidade.addEventListener("click", diminuirQuantidadeCarrinho);
    botAumentarQuantidade.addEventListener("click", aumentarQuantidadeCarrinho);
}

function diminuirQuantidadeCarrinho(evento) {
    let indexQueAtivou = evento.currentTarget.parentNode.parentNode.getAttribute("index-carrinho");
    let quantidade = pizzasPedido[indexQueAtivou].quantidadeModal
    quantidade--;
    pizzasPedido[indexQueAtivou].quantidadeModal = quantidade;
    atualizarAreaCarrinho();
}

function aumentarQuantidadeCarrinho(evento) {
    let indexQueAtivou = evento.currentTarget.parentNode.parentNode.getAttribute("index-carrinho");
    let quantidade = pizzasPedido[indexQueAtivou].quantidadeModal
    quantidade++;
    pizzasPedido[indexQueAtivou].quantidadeModal = quantidade;
    atualizarAreaCarrinho();
}

function validarQuantidadePizzaPedidos(contador) {
    //Condição para remover o item do carrinho caso a quantidade seja menor que 1.
    if(pizzasPedido[contador].quantidadeModal < 1) {
        pizzasPedido.splice(contador, 1);
    }
}

function atualizarSubtotal(cont) {
    let txtSubtotal = document.getElementById("itens-subtotal-carrinho").children[1];
    let indexDoProdutoNoJson = pizzasPedido[cont].jsonIdModal - 1;
    let quantidade = pizzasPedido[cont].quantidadeModal;
    let precoUnitario = pizzaJson[indexDoProdutoNoJson].price;
    let precoComQuantidade = quantidade * precoUnitario;

    if(cont == 0) {
        valorSubtotal = 0;
        valorSubtotal = precoComQuantidade;
    } else {
        valorSubtotal += precoComQuantidade;
    }

    //Manipulação para não haver casas decimais indesejadas
    valorSubtotal = parseFloat(valorSubtotal.toFixed(2));

    //Garantindo que mostre duas casas decimais na tela
    txtSubtotal.innerText = `R$ ${valorSubtotal.toFixed(2)}`;
}

function atualizarDesconto() {
    let txtDesconto = document.getElementById("itens-desconto-carrinho").children[1];
    valorDesconto = (valorSubtotal * 10) /100;

    //Manipulação para não haver casas decimais indesejadas
    valorDesconto = parseFloat(valorDesconto.toFixed(2));

    //Garantindo que mostre duas casas decimais na tela
    txtDesconto.innerText = `R$ ${valorDesconto.toFixed(2)}`;
}

function atualizarTotal() {
    let txtTotal = document.getElementById("itens-total-carrinho").children[1];
    valorTotal = valorSubtotal - valorDesconto;
    txtTotal.innerText = `R$ ${valorTotal.toFixed(2)}`;
}

function mostrarAreaCarrinho() {
    let areaCarrinho = document.getElementById("area-carrinho");
    if(pizzasPedido.length == 0) {
        areaCarrinho.classList.remove("itens-carrinho");
        areaCarrinho.classList.add("ocultar-itens-carrinho");
    } else {
        areaCarrinho.classList.remove("ocultar-itens-carrinho");
        areaCarrinho.classList.add("itens-carrinho");
    }
    
}

//------------------------------------ Versão Mobile -----------------------------------------

function verificarVersao() {
    let largura = window.screen.width;
    if(largura < 841) {
        versaoMobile()
        if(mostrarCarrinhoMobile == true) {
            mostrarAreaCarrinho();
        } else {
            ocultarAreaCarrinho()
        }
    } else {
        mostrarAreaCarrinho();
    }
}

function versaoMobile() {
    botoesMobile();
   
}

function botoesMobile() {
    let botCarrinho = document.getElementById("itens-menu");
    let botFecharCarrinho = document.getElementById("botao-fechar-carrinho");
    
    botCarrinho.addEventListener("click", mostrarAreaCarrinho);
    botCarrinho.addEventListener("click", ativarMostrarCarrinho);

    botFecharCarrinho.addEventListener("click", ocultarAreaCarrinho);
    botFecharCarrinho.addEventListener("click", desativarMostrarCarrinho);

}

function ativarMostrarCarrinho() {
    mostrarCarrinhoMobile = true;
}

function desativarMostrarCarrinho() {
    mostrarCarrinhoMobile = false;
}

function ocultarAreaCarrinho(){
    console.log("clicou para fechar")
    let areaCarrinho = document.getElementById("area-carrinho");
    areaCarrinho.classList.remove("itens-carrinho");
    areaCarrinho.classList.add("ocultar-itens-carrinho");
}

function quantidadeItensCarrinho() {
    console.log(pizzasPedido.length)
    
    let quantidadeDeItens = document.getElementById("quantidade-mobile");
    quantidadeDeItens.innerText = `${pizzasPedido.length}`;
}

function mostrarConsole() {
    console.log("teste");
}


let pizzasPedido = []
let valorSubtotal;
let valorDesconto;
let valorTotal;
let mostrarCarrinhoMobile = false;



estruturaHtmlNaTela();

percorrerEstruturaHTML(colocarConteudo);
percorrerEstruturaHTML(colocarIdentificacao);
percorrerEstruturaHTML(colocarEstilo);
percorrerEstruturaHTML(colocarEventosProdutos);

percorrerTamanhosModal(colocarEventoTamanhos);

verificarVersao()

window.addEventListener("resize", verificarVersao)