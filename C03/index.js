/**
 * @type HTMLInputElement | undefined
 */
const display = document.querySelector('#display')

const mapping = {
    leftBracket: '(',
    rightBracket: ')',
    '+': '+',
    '-': '-',
    '/': '/',
    '*': '*',
    dot: '.',
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9
}

for (const data of Object.entries(mapping)) {
    const id = data[0]
    const value = data[1]

    const button = document.getElementById(id)
    button.addEventListener('click', function () {
        display.value += value
    })
}

const removeButton = document.getElementById('backslash')
removeButton.addEventListener('click', () => {
    const val = display.value
    display.value = val.substring(0, val.length - 1)
})

const resetButton = document.getElementById('reset')
resetButton.addEventListener('click', () => {
    display.value = ''
})

const solveButton = document.getElementById('=')

solveButton.addEventListener('click', function () {
    try {
        display.value = eval(display.value)
    } catch (_) {
        alert('Sytax error')
    }
})
