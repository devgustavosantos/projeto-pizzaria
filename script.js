listarPizzas()

function listarPizzas() {
    let areaDasPizzas = document.getElementById("area-das-pizzas");
    areaDasPizzas.innerHTML = ""
    
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
        Number.isInteger(pizzaJson[cont].price)?elementoPizza.txtPreco.innerText = `R$ ${pizzaJson[cont].price}.00`:elementoPizza.txtPreco.innerText = `R$ ${pizzaJson[cont].price}`;        
        elementoPizza.txtSabor.innerText = `${pizzaJson[cont].name}`;
        elementoPizza.txtDescricao.innerText = `${pizzaJson[cont].description}`

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


function mostrarDetalhes(evento) {

    //Função apenas para receber o evento de clique
    const itemQueAtivouOEvento = evento.target;
    const idDoItemQueAtivou = itemQueAtivouOEvento.getAttribute("produto");
    
    console.log(idDoItemQueAtivou);

    let modal = document.getElementById("modal-exemplo");
    modal.classList.remove("ocultar-modal");
    modal.classList.add("mostrar-modal");

    //Ocultando o modal após a escolha
    const botaoAdicionarCarinho = document.getElementById("botao-adicionar-carinho");
    const botaoCancelar = document.getElementById("botao-cancelar");

    botaoAdicionarCarinho.addEventListener("click", ocultarDetalhes);
    botaoCancelar.addEventListener("click", ocultarDetalhes);
    

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