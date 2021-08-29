/*<label class="todo_item">
                <input type="checkbox">
                <div>Teste item 1</div>
                <input type="button" value="x">
            </label>*/
// essa parte deve ser flexivel por isso é retirada do html
//local storage uma chave e um item ele fica no banco efunciona com string

const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [] // ?? siginica se estiver vazio passa a proxima funcao que coloquei
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco))


const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label')
    item.classList.add('todo_item')
    item.innerHTML = ` 
        <input type="checkbox" ${status} data-indice = ${indice}>
        <div>${tarefa}</div> 
        <input type="button" value="X" data-indice = ${indice}>
    `
    //indice para difereniar qual esta sendo clicado
    document.getElementById('todoList').appendChild(item)

}

const limparTarefas = () => {
    const todoList = document.getElementById('todoList')
    while (todoList.firstChild){
        todoList.removeChild(todoList.lastChild) // enquanto existir o primeiro filho, remove o ultimo filho
    }
}

const atualizarTela = () => {
    limparTarefas()
    const banco = getBanco()
    banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice)) //pega um item manda pro criar item e manda item.tafera
}

const inserirItem = (evento) => {
    const tecla = evento.key
    const texto = evento.target.value
    if(tecla === 'Enter'){
        const banco = getBanco()
        banco.push({'tarefa': texto, 'status': ''})
        setBanco(banco)
        atualizarTela()
        evento.target.value = '' //limpa a tarefa

    }
    
}

const removerItem = (indice) =>{
    const banco = getBanco()
    banco.splice(indice, 1)
    setBanco(banco)
    atualizarTela()
}
const atualizarItem = (indice) =>{
    const banco = getBanco()
    banco[indice].status = banco[indice].status == '' ? 'checked' : ''
    setBanco(banco)
    atualizarTela()
}
const clickItem = (evento) => {
    const elemento = evento.target // mostra onde clicou
    if(elemento.type === 'button'){
        const indice = elemento.dataset.indice
        removerItem(indice)
    } else if(elemento.type === 'checkbox'){
        const indice = elemento.dataset.indice
        atualizarItem(indice)
    }
    
}

document.getElementById('newItem').addEventListener('keypress', inserirItem)
document.getElementById('todoList').addEventListener('click', clickItem)

atualizarTela() // toda hora que mudar algo no banco ele vai mandar atualizar tela
