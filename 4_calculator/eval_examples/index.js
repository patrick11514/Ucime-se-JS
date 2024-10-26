const content = document.querySelector('main')
document.querySelector('button#input')?.addEventListener('click', () => {
    content.innerHTML = `
    <input type="text" palceholder="Zadej příklad" />
    <button>Vypočítat</button>
    <p>Výsledek:</p>
    `

    content.querySelector('button')?.addEventListener('click', () => {
        const input = content.querySelector('input')
        try {
            const result = eval(input?.value)
            content.querySelector('p').textContent = `Výsledek: ${result}`
        } catch (e) {
            console.error(e)
            content.querySelector('p').textContent = `Chyba: ${e}`
        }
    })
})

document.querySelector('button#textarea')?.addEventListener('click', () => {
    content.innerHTML = `
    <textarea palceholder="Zadej příklad"></textarea>
    <button>Vypočítat</button>
    <p>Výsledek:</p>
    `

    content.querySelector('button')?.addEventListener('click', () => {
        const input = content.querySelector('textarea')
        try {
            const result = eval(input?.value)
            content.querySelector('p').textContent = `Výsledek: ${result}`
        } catch (e) {
            console.error(e)
            content.querySelector('p').textContent = `Chyba: ${e}`
        }
    })
})

const toStr = (date) => {
    const d = new Date(date)

    const month = d.getMonth().toString().padStart(2, '0')
    const day = d.getDate().toString().padStart(2, '0')

    return `${d.getFullYear()}-${month}-${day}`
}

document.querySelector('button#database')?.addEventListener('click', () => {
    content.innerHTML = `
    <input type="text" placeholder="Zadej novou zprávu" />
    <button>Odeslat</button
    <br/>
    <h1>Chat window</h1>
    <div id="chat">
    </div>
    `

    const chat = content.querySelector('div#chat')

    //Load saved messages
    const data = localStorage.getItem('data')
    if (data) {
        const parsed = JSON.parse(data)
        for (const item of parsed) {
            const span = document.createElement('span')
            span.innerHTML = item

            if (chat.children.length == 0) {
                chat.appendChild(span)
            } else {
                chat.insertBefore(span, chat.firstChild)
            }
        }
    }

    content.querySelector('button')?.addEventListener('click', () => {
        const input = content.querySelector('input')?.value
        if (!input) return

        const messages = localStorage.getItem('data') || '[]'
        const parsed = JSON.parse(messages)

        const message = `${toStr(new Date())}: ${input}`

        content.querySelector('input').value = ''

        parsed.push(message)
        localStorage.setItem('data', JSON.stringify(parsed))

        const span = document.createElement('span')
        span.innerHTML = message
        if (chat.children.length == 0) {
            chat.appendChild(span)
        } else {
            chat.insertBefore(span, chat.firstChild)
        }
    })
})
