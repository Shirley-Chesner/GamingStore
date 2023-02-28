import fetch from 'node-fetch'

const API_KEY = 'd4687bc2b72c4bd281670ceae4e8c209';
const API_URL = 'https://api.rawg.io/api/';

async function getGames(url) {
    const res = await fetch(url, {headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
    }})
    return res.json();
}


async function script() {
    const url = `${API_URL}games?key=${API_KEY}&page_size=40`;
    const fetch1 = await getGames(url)
    const fetch2 = await getGames(fetch1.next)
    const fetch3 = await getGames(fetch2.next)
    const games = [...fetch1.results,...fetch2.results,...fetch3.results]
    const res = games.map(async (game, i) => {
        await fetch('http://localhost:1234/games', {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({gameID: game.id, price: Math.floor(Math.random() * 301), rating: game.rating})
        })
    })
    await Promise.all(res)
    console.log('help me');
}

script();
