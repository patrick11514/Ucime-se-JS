/**
 * @type HTMLInputElement | null
 */
const display = document.getElementById('display')

const dictionary = {
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

for (const data of Object.entries(dictionary)) {
    const id = data[0]
    const value = data[1]

    const button = document.getElementById(id)
    button.addEventListener('click', function () {
        display.value += value
    })
}

const resetButton = document.getElementById('reset')
resetButton.addEventListener('click', function () {
    display.value = ''
})

const removeButton = document.getElementById('backslash')
removeButton.addEventListener('click', function () {
    display.value = display.value.substring(0, display.value.length - 1)
})

const equalsButton = document.getElementById('=')
equalsButton.addEventListener('click', function () {
    try {
        display.value = eval(display.value)
    } catch (_) {
        alert('Syntax error')
    }
})
