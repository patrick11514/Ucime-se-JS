const input = document.querySelector('input')
const tasks = document.querySelector('#tasks')

document.querySelector('button')?.addEventListener('click', () => {
    const task = input.value

    if (!task) return

    createTask(task)
    saveTask(task)

    input.value = ''
})

const createTask = (task) => {
    const div = document.createElement('div')
    div.classList.add('item')

    const h4 = document.createElement('h4')
    h4.innerText = task

    div.appendChild(h4)

    const button = document.createElement('button')
    button.innerText = 'X'

    button.addEventListener('click', removeTarget)

    div.appendChild(button)

    tasks.appendChild(div)
}

const removeTarget = (ev) => {
    console.log(ev.currentTarget.parentNode)

    const parent = ev.currentTarget.parentNode

    removeTask(parent.querySelector('h4').textContent)

    parent.remove()
}

//bonus

let taskList = []

const saveTask = (task) => {
    taskList.push(task)

    localStorage.setItem('tasks', JSON.stringify(taskList))
}

const removeTask = (task) => {
    taskList = taskList.filter((t) => t != task)
    localStorage.setItem('tasks', JSON.stringify(taskList))
}

const loadTasks = () => {
    const items = localStorage.getItem('tasks')

    if (!items) return

    taskList = JSON.parse(items)

    taskList.forEach(createTask)
}

loadTasks()
