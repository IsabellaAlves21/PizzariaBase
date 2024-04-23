
let modalQtd;
let cart = []
let modalKey = 0;
 
//-----------------Inicio Exibe informações das pizzas -------------------------//
 
pizzaJson.map((item, index) => {
    //clonando o pizza-item
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true);
 
 
     //O atributo data-key permite enviar dados através do html, esses dados podem se utilizados posteriormente por uma janela modal ou por qualquer outro componente.
    //definindo um atributo chamado data-key ao elemento .pizza-item contendo o id da pizza que foi selecionada pelo usuário
    pizzaItem.setAttribute('data-key', index);
 
    pizzaItem.querySelector('.pizza-item--img img').src  = item.img;
    //toFixed = permite definir quantas casas decimais o javascript irá exibir na tela
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
 
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
 
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
 
    pizzaItem.querySelector('a').addEventListener('click', (event) => {
 
        event.preventDefault();
 
        //iniciando a variável sempre com o valor 1
        modalQtd = 1
        //--------Está variável será usada para identificar em qual pizza o usuário clicar em adicionar pizza ao carrinho
        modalKey = index;
        //queremos pegar a key da pizza ou seja a posição dela no array para sabermos qual pizza foi clicada. Sabemos que todas as pizzas posuem um atrributo data-key com a chave da mesma, assim iremos utilizar o closest para selecionar o elemento e pegar esta key.
        //closest = busca a partir do elemento especificado o elemento mais próximo com a classe ou id especificado, primeiro ele irá procurar dentro de si e depois o elemento mais próximo, seja acima ou abaixo dele.
        //getAttribute =  pega o valor de um atributo
        let key = event.target.closest('.pizza-item').getAttribute('data-key');
 
        document.querySelector('.pizzaBig img').src = pizzaJson[key].img;
        document.querySelector('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        document.querySelector('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
        document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`
 
        //removendo a classe selecionada dos tamanhos de pizza, assim garantimos que nenhuma pizza estará selecionada antes do usuário selecionar um tamanho
        //.pizzaInfo--size.selected = quando no javascript quisermos fazer referência a um elemento que possui duas classes, devemos informar o nome destas classes juntas conforme fizemos abaixo, desta forma o javascript irá entender que deve selecionar apenas o elemento que possuir as duas classes.
        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected')
 
        //selecionando todos os elementos pizzaInfo--size pegando o tamanho da pizza e a posição dos elementos
        document.querySelectorAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
 
            //fará que o tamanho grande sempre seja selecionada por padrão ao usuário clicar em uma pizza
            if (sizeIndex == 2) {
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
            //size.querySelector('span').innerHTML = '123';
        });
 
        //definindo opacidade 0 para que o modal não seja exibido na tela logo de inicio
        document.querySelector('.pizzaWindowArea').style.opacity = 0;
 
        //exibindo a janela modal na tela ao clicar em uma pizza
        document.querySelector('.pizzaWindowArea').style.display = 'flex';
 
        //setTimeout = permite executar um código depois de um tempo estipulado, esse tempo será em milisegundos
        setTimeout(() => {
            //definindo a opacidade para 1 para que a modal seja exibida na tela, lembrando, no css temos uma transition e assim qualquer animação adicionada irá demorar o tempo da transition para acontecer, nesse caso será de 0.5s, assim a opacidade irá do 0 ao 1 demorando 0.5 para acontecer, isso irá gerar um efeito de transição suave dando a impressão que a modal está surgindo na tela.
            document.querySelector('.pizzaWindowArea').style.opacity = 1;
        }, 200)
 
 
 
 
 
 
 
    });
 
    document.querySelector('.pizza-area').append(pizzaItem);
 
});
 
//-------------------- Fim Exibe informações das pizzas -----------------------------//
 
 
//----------------------Funcionalidades janela modal ------------------------------------//
 
//------------------------Função que fecha o modal----------------
 
//eventos modal
function closeModal() {
    document.querySelector('.pizzaWindowArea').style.opacity = 0;
 
    setTimeout(() => {
        document.querySelector('.pizzaWindowArea').style.display = 'none';
    }, 500)
}
 
//Estamos usando o forEach para que automaticamente ele selecione automaticamente cada um dos elementos com as classes abaixo e adicione um EventListener nesses elementos, a cada vez que o usuário clicar em algum botão de fechar ele irá detectar o clique e irá chamar a função closeModal para fechar a janela.
document.querySelectorAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});
 
 
//----------------------Quantidade de Pizzas-----------------------------//
 
document.querySelector('.pizzaInfo--qtmais').addEventListener('click', () => {
    //a cada vez que o usuário clicar no modal a variável modalQtd será incrementada em +1
    modalQtd++;
 
    //selecionando o elemento onde a quantidade de pizzas irá aparecer e atualizando-o conforme a variável modalQtd
 
    document.querySelector('.pizzaInfo--qt').innerHTML = modalQtd;
 
//selecionando o elemento onde a quantidade de pizzas irá aparecer e atualizando-o conforme a variável modalQtd
document.querySelector('.pizzaInfo--qt').innerHTML =
modalQtd;
 
document.querySelector('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if (modalQtd > 1) {
        modalQtd--;
        document.querySelector('.pizzaInfo--qt').innerHTML = modalQtd;
    }
 
});
    });
 
 
//------------------------------------Tamanho das Pizzas--------------------------------//
 
//selecionando todos os elementos pizzaInfo--size pegando o tamanho da pizza e a posição dos elementos
document.querySelectorAll('.pizzaInfo--size').forEach((item, sizeIndex) => {
    //sempre que em um sistemas tivermos que selecionar uma opção diferente e uma opção anterior estiver selecionada, devemos primeiro tirar a seleção de todas as opções anteriores e só depois selecionar a nova opção que o usuário selecionou.
    item.addEventListener('click', (event) => {
 
        //removendo a classe selecionada dos tamanhos de pizza, assim garantimos que nenhuma pizza estará selecionada antes do usuário selecionar um tamanho
        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected')
        //adicionando a classe selected ao tamanho que o usuário está clicando.
        item.classList.add('selected')
    })
})
 
 
 
//------------Botão Adicionar AO Carrinho-----------------------------
 
document.querySelector('.pizzaInfo--addButton').addEventListener('click', () => {
    //Quando o usuário clicar no botão adicionar pizza ao carrinho precisaremos saber - Qual a pizza - Qual o tamanho da pizza, -Quantas pizzas serão adicionadas.
 
    // Qual a pizza
    //console.log("Pizza: "+ modalkey)
 
    //Qual o tamanho da pizza
    //para sabermos o tamanho da pizza, iremos pegar o valor do atributo data-key pois cada número identifica um tamanho de pizza
    //parseInt = converter o tamanho que está no data-key em inteiro pois o mesmo é uma string
    let size = parseInt(document.querySelector('.pizzaInfo--size.selected').getAttribute('data-key'));
    //console.log("tamanho: "+size)
 
    //criando um identificador para detectar quando estão sendo adicionadas pizzas iguais ao carrinho, assim evitamos que ele crie uma nova chave para a mesma pizza
    let identifier = pizzaJson[modalKey].id + '@' + size;
 
    //console.log(identifier)
    let key = cart.findIndex((item) => {
        return item.identifier == identifier
    })
 
    //caso seja encontrado itens iguais ao vetor, ou seja pizzas iguais no vetor iremos atualizar a quantidade de pizzas ao invés de adicionar uma nova.
    if(key > -1) {
 
        cart[key].qt += modalQtd;
    } else {
        //push = permite adicionar novos elementos ao final do array, ou seja, ao usar o push todo o que for passado a ele será adicionado ao final do array
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size,
            qt: modalQtd
        })
    }
   
    console.log(cart)
    updateCart();
    closeModal();
 
});
 
//--------------------------Atualização Carrinho-------------------------
 
//exibindo o carrinho caso tenham pizzas adicionadas
document.querySelector('.menu-openner').addEventListener('click', () => {
    if (cart.length > 0) {
        document.querySelector('aside').style.left = '0';
 
    }
})
 
//escondendo o carrinho ao usuário clicar em fechar carrinho
document.querySelector('.menu-closer').addEventListener('click', () => {
 
    document.querySelector('aside').style.left = '100vw';
 
})
 
function updateCart() {
    //atualizando a quantidade de pizzas no carrinho na versão mobile
    document.querySelector('.menu-openner span').innerHTML = cart.length
 
    //verificando se o carrinho possue pizzas adicionadas
    if (cart.length > 0) {
        //adicionando a classe show a tag aside, isso fará com que o carrinho seja exibido na tela.
        document.querySelector('aside').classList.add('show');
 
        //limpando o html antes de exibir as pizzas novamente
        document.querySelector('.cart').innerHTML = '';
 
        let subTotal = 0;
        let desconto = 0;
        let total = 0;
 
        cart[3, 5, 10]
        for (let i in cart) {
            //iremos procurar dentro no pizzaJson itens que tenham o mesmo id da pizza a qual o usuário clicou, a função find irá buscar no array e em seguida jogar dentro do parãmetro item. Nesse caso usamos a função find ao invés de findIndex pois queremos retornar todas as informações dos itens do json e não somente o índice dele(posição no array)
            let pizzaItem = pizzaJson.find((item) => {
                //procurnado nos itens do array que serão adicionados no parãmetro (variável) item e iremos procurar no id deste item por um item que seja igual ao item que estiver no caminho, assim poderemos exibir as informações desse item.
                return item.id == cart[i].id;
            });
 
            //atualizando o subtotal
            subTotal += pizzaItem.price * cart[i].qt;
 
 
            //clonando o elemento pizza-item onde serão exibidos os dados da pizza no carrinho
            let cartItem = document.querySelector('.models .cart--item').cloneNode(true);
 
            //o switch case irá percorrer o array de tamanho de pizzas adicionando uma letra correspondente ao tamanho da pizza, se não fizessemos isso não teriamos como o usuário saber o tamanho da pizza que ele está comprando.
            let pizzaSizeName;
            switch (cart[i].size) {
                case 0:
                    pizzaSizeName = 'P'
                    break;
                case 1:
                    pizzaSizeName = 'M'
                    break;
                case 2:
                    pizzaSizeName = 'G'
                    break;
 
            }
 
            //concatenando o nome da pizza com o tamanho da mesma
            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`
 
            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            //detectando quando o usuário clicar no botão de diminuir quantidade de pizza e atualizando a quantidade
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if (cart[i].qt > 1) {
                    cart[i].qt--;
                } else {
                    //iremos usar o splice para remover a pizza do carrinho, pois somente iremos entrar no else se quantidade de pizzas no carrinho forem maiores que 1, caso seja 1 e o usuário clicar no botão - significa que o usuário quer remover a pizza do carrinho.
                    //splice = possibilita remover elementos de um array, no caso abaixo, diremos que queremos remover o item que está na posição i e em seguida diremos quantos itens ele irá remover, como só temos um item no array ele irá remover este item
                    cart.splice(i, 1)
                }
 
                //chamamos o updateCart pois sem ele o número de pizza não irá ser exibido na tela.
                updateCart();
            });
 
 
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].qt++
                  updateCart();
            });
 
            //adicionando o elemento clonado do html ao carrinho
            document.querySelector('.cart').append(cartItem);
           
        }
 
        //calculando o desconto de 10% sobre o valor
        desconto = subTotal * 0.1;
 
        total = subTotal - desconto;
        document.querySelector('.subtotal span:last-child').innerHTML = `R$ ${subTotal.toFixed(2)}`;
        document.querySelector('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        document.querySelector('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;
    } else {
        //escondendo menu desktop
        document.querySelector('aside').classList.remove('show');
        //escondendo menu mobile
        document.querySelector('aside').style.left = '100vw';
    }
}