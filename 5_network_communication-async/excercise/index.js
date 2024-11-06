/*const xhttp = new XMLHttpRequest()
xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
        console.log(xhttp.responseText)
    }
}

xhttp.open('GET', 'https://learn.patrick115.eu/api', true)
xhttp.send()*/

/*fetch('https://learn.patrick115.eu/api')
    .then((response) => response.text())
    .then((text) => console.log(text))*/

/*; (async function() {
    const response = await fetch('https://learn.patrick115.eu/api')
    const text = await response.text()

    console.log(text)
})()*/

/*const promise = new Promise((resolve, reject) => {
    console.log('Promise byl vytvořen')
    setTimeout(reject, 5 * 1000)
})

promise.then(() => console.log('Promise byl dokončen')).catch(() => console.log('Sorry nevyšlo to'))*/

function getData(url) {
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest()

        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4) {
                resolve(xhttp.responseText)
            }
        }

        xhttp.ontimeout = () => {
            reject()
        }

        xhttp.open('GET', url, true)
        xhttp.send()
    })
}

/*getData('https://learn.patrick115.eu/api')
    .then((content) => console.log(content))
    .catch(() => console.error(':('))*/

/*function resolvePromiseWithNumber(n) {
    return new Promise((resolve) => resolve(n))
}

async function resolvePromiseWithNumber2(n) {
    return n
}

resolvePromiseWithNumber(10).then(console.log)
resolvePromiseWithNumber2(20).then(console.log)
*/
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
/*
async function returnAfterNS(n, s) {
    await sleep(s)
    return n
}

returnAfterNS(5, 2 * 1000).then(console.log)

async function foo() {
    await 1
}

function foo1() {
    return Promise.resolve(1).then(() => undefined)
}

function returnAfterNS2(n, s) {
    return sleep(s).then(() => n)
}

returnAfterNS2(5, 2 * 1000).then(console.log)*/

/*.then((value) => console.log(value))
.then(console.log)

function then(fn) {
    value = 10
    fn(value)
}

function ahoj(fn) {
    fn('Ahoj')
}

function franta(pozdrav) {
    console.log(`${pozdrav} Franto`)
}

function reverse(text) {
    let arr = text.split('')
    arr.reverse()

    console.log(arr.join(''))
}

ahoj(franta)
ahoj(reverse)*/

/*async function run() {
    await sleep(3 * 1000)

    console.log('Computation started')

    async function computation() {
        let sum = 0
        for (let i = 0; i < Math.pow(2, 33); ++i) {
            sum += i
        }
        return sum
    }

    computation().then(console.log)

    for (let i = 0; i < Math.pow(2, 5); ++i) {
        console.log(i)
    }

    console.log('main done')
}

run()*/

async function main() {
    /*    try {
        const value = await getData('https://learn.patrick115.eu/api')

        console.log(value)
    } catch(e) {
        console.error(e)
    }*/
}

main()

console.log(Promise.resolve(10))
console.log(Promise.reject('ERROR'))

async function slowFetch(ret = false) {
    const urls = Array.from({ length: 5 }).map((_, i) => `https://learn.patrick115.eu/api/name/Karel-${Date.now() * (i + 1)}`)

    const start = Date.now()

    for (const url of urls) {
        const response = await fetch(url)
        const text = await response.text()
    }

    if (ret) return Date.now() - start
    else console.log(`Trvalo to Slower: ${Date.now() - start}ms`)
}

async function fasterFetch(ret = false) {
    const urls = Array.from({ length: 5 }).map((_, i) => `https://learn.patrick115.eu/api/name/Karel-${Date.now() * (i + 1)}`)

    const promises = urls.map(async (url) => {
        const response = await fetch(url)
        const text = await response.text()
    })

    const start = Date.now()

    await Promise.all(promises)

    if (ret) return Date.now() - start
    else console.log(`Trvalo to Faster: ${Date.now() - start}ms`)
}

//slowFetch()
//fasterFetch()
//benchmarks
/*; (async function() {
    {
        const attempts = 100
        let sum = 0

        for (let i = 0; i < attempts; ++i) {
            sum += await slowFetch(true)
        }

        console.log(`Slow: ~${sum / attempts}ms`)
    }
    {
        let attempts = 100
        let sum = 0

        for (let i = 0; i < attempts; ++i) {
            sum += await fasterFetch(true)
        }

        console.log(`Faster: ~${sum / attempts}ms`)
    }
})()*/

Promise.allSettled([Promise.resolve(10), Promise.resolve(15), Promise.reject('err'), Promise.resolve('456465')]).then(console.log)

    //const promise = new Promise((resolve, reject) => {...})

    //const {promise, resolve, reject} = Promise.withResolvers()
    /*    ; (async function() {
                            const params = new URLSearchParams()
                            params.append('key', 'value')
                            params.append('name', 'Patrik')
                    
                            const response = await fetch(`https://learn.patrick115.eu/api/query?${params.toString()}`)
                            const data = await response.json()
                            console.log(data)
                        })()*/
    ; (async function() {
        //const params = new URLSearchParams()
        //params.append('key', 'value')
        //params.append('name', 'Patrik')
        const formData = new FormData()
        formData.append('key', 'value')
        formData.append('name', 'Patrik')

        const response = await fetch('https://learn.patrick115.eu/api/post', {
            method: 'POST',
            headers: {
                //'Content-Type': 'application/x-www-form-urlencoded'
                'Content-Type': 'application/json'
            },
            body: formData /*JSON.stringify({
                key: 'value',
                name: 'Patrik'
            })*/
        })

        const data = await response.json()

        console.log(data)
    })()
