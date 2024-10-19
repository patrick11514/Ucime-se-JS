const string = 'Ahoj'

console.log(string.length)

console.log(string[2])
console.log(string.at(2))

console.log(string.toUpperCase())

console.log(
    string
        .split('')
        .map((c) => c.toUpperCase())
        .join('')
)

const string2 = 'Ahoj kamarádi'

console.log(string2.split('').reverse().join(''))

//////

let ahoj = '10'

const h1 = document.querySelector('h1')

function klik() {
    console.log('Kliknul jsem')
}

function klik2() {
    console.log('idk')
}

h1.addEventListener('click', klik)
h1.addEventListener('click', klik2, {
    once: true
})

h1.removeEventListener('click', klik)

h1.addEventListener('click', console.log)

document.addEventListener('keypress', console.log)

////

const button = document.createElement('button')

button.innerText = 'Super čudl'

const div = document.createElement('div')

div.appendChild(button)

document.body.appendChild(div)

///

const tlacitko = document.querySelector('button')

tlacitko.addEventListener('click', () => {
    button.classList.toggle('blue')
})
