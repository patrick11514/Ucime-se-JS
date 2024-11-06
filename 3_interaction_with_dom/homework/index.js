const data = `Hra1: 1:0
Hra2: 0:1
Hra3: 1:1
Hra4: 1:0
Hra5: 0:1
Hra6: 1:1
Hra7: 1:0
Hra8: 1:0`

const totalScores = [0, 0]
data.split("\n").map((line) => {
    const [gameName, ...scores] = line.split(":");
    const [s1, s2] = scores.map(s => Number(s.trim()));

    let status;

    if (s1 == s2) status = "remízou";
    else if (s1 > s2) status = "výhrou týmu 1 nad týmem 2";
    else status = "výhrou týmu 2 nad týmem 1";

    totalScores[0] += s1;
    totalScores[1] += s2;

    console.log(`Hra číslo ${gameName[3]} skončila ${status}.`);
});

console.log(`Team1: ${totalScores[0]}, Team2: ${totalScores[1]}`);
