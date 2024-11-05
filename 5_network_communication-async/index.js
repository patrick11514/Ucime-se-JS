///XMLHTTPREQUEST

//Hello ^^
var xhttp = new XMLHttpRequest()
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(xhttp.responseText)
    }
}
xhttp.open('GET', 'http://localhost:5555/', true)
xhttp.send()

//FETCH

fetch('http://localhost:5555/hello')
    .then((res) => res.text())
    .then((json) => console.log(json))
    .catch((err) => console.error(err))

fetch('http://gsdgsdgk')
    .then((res) => res.text())
    .then((json) => console.log(json))
    .catch((err) => console.error(err))

    ///
    ; (async () => {
        const res = await fetch('http://localhost:5555/json')
        const json = await res.json()
        console.log(json)
    })()

///PROMISE

{
    const promise = new Promise((resolve, reject) => {
        console.log('Promise vytvořen')
        setTimeout(resolve, 5 * 1000)
    })

    promise.then(() => console.log('Toto se ukáže za 5s')).catch(() => console.log('Toto se ukáže při chybě'))
}
{
    const promise = new Promise((resolve, reject) => {
        console.log('Promise vytvořen')
        setTimeout(reject, 5 * 1000)
    })

    promise.then(() => console.log('Toto se ukáže za 5s')).catch(() => console.log('Toto se ukáže při chybě'))
}

///PROMISIFY

function getData(url) {
    return new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
                resolve(xhttp.responseText)
            }
        }
        xhttp.ontimeout = function() {
            reject()
        }

        xhttp.open('GET', url, true)
        xhttp.send()
    })
}

getData('http://localhost:5555/name/Patrik')
    .then((text) => console.log(text))
    .catch((err) => console.error(err))

//ASYNC/AWAIT

function resolvePromiseWithNumber(n) {
    return new Promise((resolve) => resolve(n))
}

resolvePromiseWithNumber(5).then(console.log)

async function resolvePromiseWithNumber2(n) {
    return n
}

resolvePromiseWithNumber2(5).then(console.log)

//await
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

async function returnAfterXS(n, s) {
    await sleep(s)
    return n
}

returnAfterXS(5555, 2 * 1000).then(console.log)
    /*; (async function() {
                                                                                                            await sleep(10 * 1000)
                                                                                                    
                                                                                                            console.log('Computation started')
                                                                                                    
                                                                                                            async function computation() {
                                                                                                                let sum = 0
                                                                                                                for (let i = 0; i < Math.pow(2, 33); ++i) {
                                                                                                                    sum += i
                                                                                                                }
                                                                                                                return sum
                                                                                                            }
                                                                                                    
                                                                                                            computation().then(console.log)
                                                                                                    
                                                                                                            for (let i = 0; i < Math.pow(2, 5); ++i) console.log(i)
                                                                                                    
                                                                                                            console.log('Main done')
                                                                                                        })()*/
    ; (async function() {
        const data = await getData('http://localhost:5555/name/Nejake Jine Jmeno')
        console.log(data)
    })()
    ; (async function() {
        async function slowFetch(ret = false) {
            const urls = Array.from({ length: 5 }).map((_, i) => `http://localhost:5555/name/Karel-${Date.now() * (i + 1)}`)

            const start = Date.now()

            for (const url of urls) {
                const response = await fetch(url, { cache: 'no-cache' })
                const text = await response.text()
            }

            if (ret) return Date.now() - start
            else console.log(`Trvalo to Slower: ${Date.now() - start}ms`)
        }

        async function fasterFetch(ret = false) {
            const urls = Array.from({ length: 5 }).map((_, i) => `http://localhost:5555/name/Karel-${Date.now() * (i + 1)}`)

            const promises = urls.map(async (url) => {
                const response = await fetch(url, { cache: 'no-cache' })
                const text = await response.text()
            })

            const start = Date.now()

            await Promise.all(promises)

            if (ret) return Date.now() - start
            else console.log(`Trvalo to Faster: ${Date.now() - start}ms`)
        }

        slowFetch()
        fasterFetch()
        return
        //benchmarks
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
    })()

    ////
    //
    //
    //
    ; (async function() {
        Promise.all([Promise.resolve(1), Promise.resolve(2), Promise.reject(3)])
            .then(console.log)
            .catch(console.error)
    })()
    ; (async function() {
        Promise.allSettled([Promise.resolve(1), Promise.resolve(2), Promise.reject(3)])
            .then(console.log)
            .catch(console.error)
    })()

const params = new URLSearchParams()
params.append('key', 'value')
params.append('jmeno', 'Patrik')
console.log(params.toString())

    ///
    ; (async function() {
        const response = await fetch(`http://localhost:5555/query?${params.toString()}`)
        const json = await response.json()
        console.log(json)
    })()
    ; (async function() {
        {
            const response = await fetch('http://localhost:5555/post', {
                ///options
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params.toString()
            })
            const json = await response.json()
            console.log(json)
        }

        {
            const response = await fetch('http://localhost:5555/post', {
                ///options
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    key: 'value',
                    jmeno: 'Patrik'
                })
            })
            const json = await response.json()
            console.log(json)
        }

        {
            const formData = new FormData()
            formData.append('key', 'value')
            formData.append('jmeno', 'Patrik')

            const response = await fetch('http://localhost:5555/post', {
                ///options
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData
            })
            const json = await response.json()
            console.log(json)
        }
    })()
