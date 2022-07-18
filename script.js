let inputText               = document.querySelector('#new-task');
let inputSelect             = document.querySelector('#task-type');
let botaoAdicionarTarefa    = document.querySelector('#botao-tarefa-nova');
let listaTarefas            = document.querySelector('.lista-tarefas')
let buscaTarefa             = document.querySelector('#busca')
let buscaButton             = document.querySelector('#buscar')
let divForReturn            = document.querySelector('#space-for-button-return')

//adicionando tarefas na lista e no html
let arrayTarefas = [];

botaoAdicionarTarefa.addEventListener('click', (event) => {
    event.preventDefault();
    inputText.value.trim();

    if (inputText.value !== '' && inputSelect.value !== '') {
        let newObject = {}
        newObject.tarefa = inputText.value;
        newObject.classe = inputSelect.value;

        arrayTarefas.push(newObject)

        inputText.value = ''
        inputSelect.value = ''
        objectInnerHTML(arrayTarefas, listaTarefas)
    }
    
});

function createTask(element, index) {
    let tagLi = document.createElement('li');

    let tagP = document.createElement('p');
    tagP.innerText = element.tarefa;
    tagLi.appendChild(tagP);

    let button = document.createElement('button');
    tagLi.appendChild(button);

    let simbolTrash = document.createElement('span');
    simbolTrash.classList.add('material-symbols-outlined')
    simbolTrash.innerText = 'delete'
    simbolTrash.setAttribute.id = index;
    button.appendChild(simbolTrash);

    if (element.classe === 'a') {
        tagLi.style.backgroundColor = '#f58737'
        button.style.backgroundColor = '#f58737'
        simbolTrash.style.backgroundColor = '#f58737'
    }

    if (element.classe === 'b') {
        tagLi.style.backgroundColor = '#d6e340'
        button.style.backgroundColor = '#d6e340'
        simbolTrash.style.backgroundColor = '#d6e340'
    }

    if (element.classe === 'c') {
        tagLi.style.backgroundColor = '#77e864'
        button.style.backgroundColor = '#77e864'
        simbolTrash.style.backgroundColor = '#77e864'
    }

    return tagLi;
}

function objectInnerHTML (array, listaHTML) {
    listaHTML.innerHTML = '';
    array.sort(comparingClasses)    

    for (let i = 0; i < array.length; i++) {
        let card = createTask(array[i]);

        listaHTML.appendChild(card)
    }
}

function comparingClasses(objectA, objectB) {
    if (objectA.classe < objectB.classe) {
        return -1;
    } 

    if (objectA.classe > objectB.classe) {
        return 1;
    }

    return 0
}

// remover tarefas da array usando o button 
listaTarefas.addEventListener('click', (event) => {
    let buttonRemove = event.target;
    
    if (buttonRemove.tagName == 'SPAN') {
        
        let index = buttonRemove.id
        arrayTarefas.splice(index, 1);

        objectInnerHTML(arrayTarefas, listaTarefas);
    }
})

//pesquisar por tarefas existentes usando o metodo includes() 

buscaButton.addEventListener('click', (event) => {
    event.preventDefault();

    buscaTarefa.value.trim();
    
    if (buscaTarefa.value !== '') {
        let inputSearchValue = buscaTarefa.value;
        let searchResult = search(inputSearchValue, arrayTarefas);
        objectInnerHTML(searchResult, listaTarefas);

    } else {
        objectInnerHTML(arrayTarefas, listaTarefas);
        
    }
    
})

function search(input ,array) {
    let result = [];

    input.toLowerCase();

    for (let i = 0; i < array.length; i++) {
        let taskName = array[i].tarefa.toLowerCase();
        
        if (taskName.includes(input)) {
            result.push(array[i]);
        }
    }

    return result;
}

