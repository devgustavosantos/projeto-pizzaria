let carrinho = [];
let produtoAtual;
let tamanhoAtual;
let quantidadeAtual;
listarPizzas();

function listarPizzas() {
    let areaDasPizzas = document.getElementById("area-das-pizzas");
    areaDasPizzas.innerHTML = "";
    
    //Laço que percorre o array
    for(let cont in pizzaJson) {

        //Criando os elementos html
        let elementoPizza = {
            containerPizza: document.createElement("div"),
            topoContainer: document.createElement("div"),
            containerFotoPizza: document.createElement("div"),
            fotoPizza: document.createElement("img"),
            iconeAdicionar: document.createElement("div"),
            basaContainer: document.createElement("div"),
            txtPreco: document.createElement("p"),
            txtSabor: document.createElement("h2"),
            txtDescricao: document.createElement("h3")
        }

        //Adicionando identificação para os elementos de cada pizza
        for(let chave in elementoPizza) {
            elementoPizza[chave].setAttribute("produto", `${cont}`);
        }
        
        //Adicionando evento de click ao elemento
        elementoPizza.topoContainer.addEventListener("click", mostrarDetalhes);


        //Adicionando evento de passar o mouse no elemento
        elementoPizza.topoContainer.addEventListener("mouseenter", iconeAdicionarNovo);
        elementoPizza.topoContainer.addEventListener("mouseout", iconeAdicionarVelho);

        elementoPizza.containerFotoPizza.addEventListener("mouseenter", iconeAdicionarNovo);
        elementoPizza.containerFotoPizza.addEventListener("mouseout", iconeAdicionarVelho);

        elementoPizza.iconeAdicionar.addEventListener("mouseenter", iconeAdicionarNovo);
        elementoPizza.iconeAdicionar.addEventListener("mouseout", iconeAdicionarVelho);
        
        elementoPizza.iconeAdicionar.setAttribute("id", `adicionar-${cont}`);
        
        //Colocando as classes CSS nos elementos
        elementoPizza.containerPizza.classList.add("container-pizza");
        elementoPizza.topoContainer.classList.add("topo-container");
        elementoPizza.containerFotoPizza.classList.add("container-foto-pizza");
        elementoPizza.fotoPizza.classList.add("foto-pizza");

        elementoPizza.iconeAdicionar.classList.add("icone-adicionar");
        elementoPizza.basaContainer.classList.add("base-container");

        //Colocando o conteudo nos itens
        elementoPizza.fotoPizza.setAttribute("src",`${pizzaJson[cont].img}`);
            //Condição para adicionar ".00" se for um número inteiro
            Number.isInteger(pizzaJson[cont].price)?elementoPizza.txtPreco.innerText = `R$ ${pizzaJson[cont].price}.00`:elementoPizza.txtPreco.innerText = `R$ ${pizzaJson[cont].price}`;        
        elementoPizza.txtSabor.innerText = `${pizzaJson[cont].name}`;
        elementoPizza.txtDescricao.innerText = `${pizzaJson[cont].description}`;

        //Orgarnizando a hierarquia dos itens
        elementoPizza.containerPizza.appendChild(elementoPizza.topoContainer);
        elementoPizza.containerPizza.appendChild(elementoPizza.basaContainer);

        elementoPizza.topoContainer.appendChild(elementoPizza.containerFotoPizza);
        elementoPizza.topoContainer.appendChild(elementoPizza.iconeAdicionar);

        elementoPizza.basaContainer.appendChild(elementoPizza.txtPreco);
        elementoPizza.basaContainer.appendChild(elementoPizza.txtSabor);
        elementoPizza.basaContainer.appendChild(elementoPizza.txtDescricao);
        
        elementoPizza.containerFotoPizza.appendChild(elementoPizza.fotoPizza);

        //Colocando o elemento pronto na tela
        areaDasPizzas.appendChild(elementoPizza.containerPizza);
    }
}

function ocultarDetalhes(evento) {
    let modal = document.getElementById("modal-exemplo");
    modal.classList.remove("mostrar-modal");
    modal.classList.add("ocultar-modal");
}

function iconeAdicionarNovo (evento) {
    //Recebendo a info de quem ativou
    const item = evento.target;

    //Pegando o numero do produto
    let numProduto = item.getAttribute("produto");

    //Pegando o botao adicionar correspondente
    let idAdicionar = document.getElementById(`adicionar-${numProduto}`);
    
    //Mudando a classe dele
    idAdicionar.classList.add("icone-adicionar-novo");
}

function iconeAdicionarVelho(evento) {
    //Recebendo a info de quem ativou
    const item = evento.target;

    //Pegando o numero do produto
    let numProduto = item.getAttribute("produto");

    //Pegando o botao adicionar correspondente
    let idAdicionar = document.getElementById(`adicionar-${numProduto}`);
    
    //Removendo a classe dele
    idAdicionar.classList.remove("icone-adicionar-novo");
}

function mostrarDetalhes(evento) {
    const itemQueAtivouOEvento = evento.target;
    const numProdutoQueAtivou = itemQueAtivouOEvento.getAttribute("produto");
    produtoAtual = numProdutoQueAtivou
    
    console.log(numProdutoQueAtivou);

    //Mosntrando o modal na tela
    let modal = document.getElementById("modal-exemplo");
    modal.classList.remove("ocultar-modal");
    modal.classList.add("mostrar-modal");

    //Alterando o conteudo para o sabor escolhido
    let fotoModal = document.getElementById("foto-modal");
    let saborModal = document.getElementById("sabor-modal");
    let precoModal = document.getElementById("preco-modal");
    let descricaoModal = document.getElementById("descricao-modal");
    let tamanhosModal = {
        pequeno: document.getElementById("tamanho-pequeno"),
        medio: document.getElementById("tamanho-medio"),
        grande: document.getElementById("tamanho-grande")
    }

    fotoModal.setAttribute("src", `${pizzaJson[numProdutoQueAtivou].img}`);
    fotoModal.setAttribute("alt", `Foto de uma Pizza Sabor ${pizzaJson[numProdutoQueAtivou].name}`);
    saborModal.innerText = `${pizzaJson[numProdutoQueAtivou].name}`;
    descricaoModal.innerText = `${pizzaJson[numProdutoQueAtivou].description}`;
    tamanhosModal.pequeno.innerText = `${pizzaJson[numProdutoQueAtivou].sizes[0]}`;
    tamanhosModal.medio.innerText = `${pizzaJson[numProdutoQueAtivou].sizes[1]}`;
    tamanhosModal.grande.innerText = `${pizzaJson[numProdutoQueAtivou].sizes[2]}`;
        //Condição para adicionar ".00" se for um número inteiro
        Number.isInteger(pizzaJson[numProdutoQueAtivou].price) ? precoModal.innerText = `R$ ${pizzaJson[numProdutoQueAtivou].price}.00` : precoModal.innerText = `R$ ${pizzaJson[numProdutoQueAtivou].price}`;
    
    //Ocultando o modal após a escolha
    const botaoAdicionarCarrinho = document.getElementById("botao-adicionar-carrinho");
    const botaoCancelar = document.getElementById("botao-cancelar");
    
    botaoAdicionarCarrinho.addEventListener("click", adicionarAoCarrinho);
    botaoCancelar.addEventListener("click", ocultarDetalhes);
    
    
    escolherTamanho();
    escolherQuantidade();
}

function escolherTamanho() {
    let elementoTamanhos = document.getElementById("tamanhos");
    
    //Condição para deixar o tamanho "grande" como padrão
    let tamanhoEscolhido = document.getElementById("tamanho-escolhido");
    if (tamanhoEscolhido == null) {
        tamanhoEscolhido = elementoTamanhos.children[2];
        tamanhoEscolhido.setAttribute("id", "tamanho-escolhido");
        tamanhoAtual = tamanhoEscolhido
    } else {
        tamanhoEscolhido.removeAttribute("id", "tamanho-escolhido");
        tamanhoEscolhido = elementoTamanhos.children[2];
        tamanhoEscolhido.setAttribute("id", "tamanho-escolhido");
        tamanhoAtual = tamanhoEscolhido
    }

    let filhosElementoTamanhos = elementoTamanhos.children

    //Adicionando identificação e eventos aos tamanhos
    for(let cont in filhosElementoTamanhos){
        //Condição para não acessar itens indesejados do objeto
        if(cont < filhosElementoTamanhos.length){
            filhosElementoTamanhos[cont].setAttribute("tipo-tamanho", `${cont}`);
            filhosElementoTamanhos[cont].addEventListener("click", mudarTamanho);
        }
    }

    function mudarTamanho(evento) {
        let itemQueAtivouOEvento = evento.currentTarget;

        //Aqui vamos pegar o atributo
        let atributoDoItemQueAtivou = itemQueAtivouOEvento.getAttribute("tipo-tamanho");
        
        //Retirar a estilização do tamanho anterior
        tamanhoEscolhido.removeAttribute("id", "tamanho-escolhido");

        //Colocando o novo tamanho na variavel
        tamanhoEscolhido = elementoTamanhos.children[atributoDoItemQueAtivou];
        tamanhoAtual = tamanhoEscolhido

        //Recolocando a estilização
        tamanhoEscolhido.setAttribute("id", "tamanho-escolhido");
    }
}

function escolherQuantidade() {
    let diminuirQuantidade = document.getElementById("quantidade-modal").children[0];
    let txtQuantidadeModal = document.getElementById("quantidade-modal").children[1];
    let aumentarQuantidade = document.getElementById("quantidade-modal").children[2];
    
    //Por padrão, ao abrir o modal a quantidade será 1
    let numQuantidadeModal = 1;
    txtQuantidadeModal.innerText = `${numQuantidadeModal}`;
    quantidadeAtual = numQuantidadeModal;
    
    aumentarQuantidade.addEventListener("click", function() {
        numQuantidadeModal++;
        txtQuantidadeModal.innerText = `${numQuantidadeModal}`;
        quantidadeAtual = numQuantidadeModal;
    });
    
    diminuirQuantidade.addEventListener("click", function() {
        if(numQuantidadeModal > 1) {
            numQuantidadeModal--;
            txtQuantidadeModal.innerText = `${numQuantidadeModal}`;
            quantidadeAtual = numQuantidadeModal;
        }
    });
}

function adicionarAoCarrinho() {
    console.log(produtoAtual)
    console.log(tamanhoAtual.children[0].children[0].innerText);
    console.log(quantidadeAtual)
    
}