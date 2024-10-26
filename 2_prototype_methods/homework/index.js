const data = `
Hra1: 1:0
Hra2: 0:1
Hra3: 1:1
Hra4: 1:0
Hra5: 0:1
Hra6: 1:1
Hra7: 1:0
Hra8: 1:0
`

const lines = data.trim().split('\n')

let team1 = 0
let team2 = 0

lines.forEach((data) => {
    let [game, scoreOne, scoreTwo] = data.split(':')

    console.log(game, scoreOne, scoreTwo)

    const gameId = game.slice(3)

    scoreOne = scoreOne.trim()

    if (scoreOne == '1') {
        team1++
    }

    if (scoreTwo == '1') {
        team2++
    }

    if (scoreOne == scoreTwo) {
        console.log(`Hra číslo ${gameId} skončila remízou.`)
    } else {
        console.log(`Hra číslo ${gameId} skončila výhrou týmu ${scoreOne == '1' ? '1' : '2'} nad týmem ${scoreTwo == '1' ? '1' : '2'}`)
    }
})

console.log(`Team1: ${team1}, Team2: ${team2}`)
