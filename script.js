//cria um array de objetos representando o estoque 
const estoque = [
    {codigo:101,descricao:"Teclado Mecanico",preco: 180.00, quantidadeEmEstoque:10},
    {codigo:102,descricao:"Mause Gamer",preco: 95.50,quantidadeEmEstoque:10},
    {codigo:103,descricao:"Monitor 24 polegadas",preco: 750.00,quantidadeEmEstoque:10},
    {codigo:104,descricao:"Hedset usb",preco: 150.00,quantidadeEmEstoque:10},
    {codigo:105,descricao:"Notebook 16 GB Ram",preco: 30000,quantidadeEmEstoque:10}
];


//criar carrinho
let carrinho =[];

//cupom de promoçao 
let cupons= [];
//salvar cupons
function salvarCupons(){
    localStorage.setItem("cupons_pdv", JSON.stringify(cupons));
}
function carregarCuponsDoBanco(){
    const dadosSalvos = localStorage.getItem("cupons_pdv");
    if(dadosSalvos){
        cupons = JSON.parse(dadosSalvos);
    }else {
        cupons = [
            {codigo: "DESCONTO20", desconto: 20},
            {codigo:"MAMAE10", desconto: 10}
        ];
        salvarCupons();
    }
}
//carregar cupons
function renderizarCupons(){
    const tbodyCupons = document.getElementById("tabela-cupons");
    tbodyCupons.innerHTML = "";
    cupons.forEach(cupom =>{ tbodyCupons.innerHTML+=`
        <tr>
                <td>${cupom.codigo}</td>
                <td>${cupom.desconto}%</td>
                <td><button onclick="excluirCupom('${cupom.codigo}')">Excluir</button></td>
            </tr>
        
        `;
})
}
//excluir cupons
function excluirCupom(codigo){
    cupons =cupons.filter(cupom => cupom.codigo !== codigo);
    salvarCupons();
    renderizarCupons();
}

//filtrar estoque 

function filtrarEstoque(termo){
    return estoque.filter(prod=>prod.descricao.toLowerCase().includes(termo.toLowerCase()));
}
//salvar estoque 
function salvarEstoque(){
    localStorage.setItem("estoque_pdv", JSON.stringify(estoque));
}
//salvar no banco  local 
function carregarEstoqueDoBanco(){
    const dadosSalvos = localStorage.getItem("estoque_pdv");
    if (dadosSalvos){
        const estoqueSalvo = JSON.parse(dadosSalvos);
        estoque.length = 0;
        estoque.push(...estoqueSalvo);

    }
}

//cadastrar cupons
function cadastrarCupom(){
    const codigo = document.getElementById("input-cupom-codigo").value.trim().toUpperCase();
    const desconto = Number(document.getElementById("input-cupom-desconto").value);
    if(!codigo || !desconto){
        alert("preencha o codigo e o desconto do cupom.");
        return;
    }
    if (desconto<1|| desconto>100){
        alert("o desconto deve estar entre 1 e 100.");
        return;

    }
    if(cupons.some(c=> c.codigo=== codigo)){
        alert("este cupom ja existe.");
        return;
    }
    cupons.push({codigo: codigo, desconto: desconto});
    salvarCupons();
    renderizarCupons();
    
    document.getElementById("input-cupom-codigo").value = "";
     document.getElementById("input-cupom-desconto").value = "";
}

//redenizar o estoque na tela 
function carregarEstoque(termo = ""){
    const lista = filtrarEstoque(termo);

    const tbodyEstoque = document.getElementById("tabela-estoque");
    tbodyEstoque.innerHTML = "";
    lista.forEach(prod => {
        tbodyEstoque.innerHTML += `
            <tr>
            
                <td>${prod.codigo}</td>
                <td>${prod.descricao}</td> 
                <td>${prod.preco}</td>
                <td>${prod.quantidadeEmEstoque}</td>
            
            </tr>
        `;

   } );

}


//adicionar item selecionado ao carrinho 
function adicionarAoCarrinho(){
    const codigo =Number( document.getElementById("input-codigo").value);
    const quantidade =Number( document.getElementById("input-qtd").value);
if (!codigo || quantidade <=0){
    alert("Informe um codigo valido e uma quantidade maior que 0");
    return;
}
const produtoEncontrado = estoque.find(p => p.codigo === codigo)
if(!produtoEncontrado){
    alert("produto nao encontrado no estoque ");
    return;
}
if(quantidade>produtoEncontrado.quantidadeEmEstoque){
    alert("estoque insuficiente. Disponivel: "+ produtoEncontrado.quantidadeEmEstoque );
    return;
}

const itemExistente = carrinho.find(item => item.codigo === codigo);
    if(itemExistente){
        itemExistente.quantidade += quantidade;
        itemExistente.subtotal = itemExistente.quantidade * itemExistente.precoUnitario;
    } else{
        //inserir novo item no carrinho 
        carrinho.push({
            codigo: produtoEncontrado.codigo,
            descricao: produtoEncontrado.descricao,
            precoUnitario: produtoEncontrado.preco,
            quantidade: quantidade,
            subtotal: produtoEncontrado.preco*quantidade


        });
    }

produtoEncontrado.quantidadeEmEstoque-=quantidade;
salvarEstoque();
atualizarTabelaCarrinho();
carregarEstoque();
    

//filtro de busca


//limpar campos apos inseção

document.getElementById("input-codigo").value="";
document.getElementById("input-qtd").value="";
document.getElementById("resultado-total").innerHTML = "";
}


function atualizarTabelaCarrinho (){
    const tbodyCarrinho=document.getElementById("tabela-carrinho");
    tbodyCarrinho.innerHTML="";
    if (carrinho.length === 0 ){
        tbodyCarrinho.innerHTML =`<tr><td colspan="4" style="text-align:center;">Carrinho vazio</td></tr>`;   
        return; 
    }

    carrinho.forEach(item => {
        tbodyCarrinho.innerHTML += ` 

            <tr>
                <td>${item.descricao}</td>
                <td>${item.quantidade}</td>
                <td>${item.precoUnitario.toFixed(2)}</td>
                <td>${item.subtotal.toFixed(2)}</td>
            </tr>
        `;


    }  );

    }


function finalizarCompra(){
    if(carrinho.length === 0 ){
        alert("adicione item aos carrinhos antes de finalizar ");
        return;
    }
    const totalGeral = carrinho.reduce((acumulador,item)=> acumulador + item.subtotal,0);
    document.getElementById("resultado-total").innerText = `Compra finalizada com sucesso. valor total: R$ ${totalGeral.toFixed(2)} `

}
document.getElementById("input-busca").addEventListener("input",function(){
    carregarEstoque(this.value);
});

carregarCuponsDoBanco();
renderizarCupons();
carregarEstoqueDoBanco();

carregarEstoque();

