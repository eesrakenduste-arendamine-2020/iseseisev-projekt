// Tagastab suvalise int'i antud vahemikus, defaultib 0'i ja max'i vahele kui anda üks argument
// Ei tagasta kunagi max väärtust kuna Math.random() ei ole kunagi 1
const randomInt = (min, max) => {
    if (!max && max !== 0) [min, max] = [0, min];
    return Math.floor(Math.random() * (max - min) + min);
};

// Durstenfeld'i (Fisher-Yates) suvaline järjestus
// https://stackoverflow.com/a/12646864
const shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

class Card {
    constructor(face) {
        this.face = face;
        // State peaks olema 'hidden', 'visible' või 'temporarilyVisible'
        this.state = 'hidden';
    }

    get face() {
        return this.face;
    }

    get state() {
        return this.state;
    }

    set state(state) {
        if (![
            'hidden',
            'visible',
            'temporarilyVisible'
        ].includes(state)) {
            throw Error('Attempted to set unknown card state');
        }

        this.state = state;
    }
}

class Deck {
    constructor(pairs) {
        // TODO: this.faces on tõenäoliselt ebavajalik, generateFaces() ja generateDeck() peaks kombineerima
        this.faces = this.generateFaces(pairs);
        this.deck = this.generateDeck(this.faces);
    }

    get deck() {
        return this.deck;
    }

    // TODO: valida suvaline emoji teema
    generateFaces(pairs, theme) {
        const themes = ['foods'];
        const emojis = [];

        // Toidud
        for (let i = 0x1f344; i <= 0x1f37a; i++) {
            emojis.push(String.fromCodePoint(i));
        }

        const select = [];

        for (let i = 0; i < pairs; i++) {
            const random = randomInt(emojis.length);
            select.push(emojis[random]);
            // Eemaldame saadud elemendi emojide valikust
            emojis.splice(random, 1);
        }

        // Teeme topelt pikkusega array sest iga paar tähendab kahte identset pilti
        select.push(...select);
        shuffle(select);
        console.log(select);

        return select;
    }

    generateDeck(faces) {
        const deck = [];

        for (const face of faces) {
            deck.push(new Card(face));
        }

        return deck;
    }
}

// TODO: need tuleb uuesti hankida body taasloomisel
const play = document.getElementById('play');
const slider = document.getElementById('slider');
const value = document.getElementById('value');

const validCardsAmounts = [
    4,
    8,
    16,
    32,
    64
];

/*
// See on võib-olla halb idee, aga kas halvad ideed on mind kunagi takistanud koodi kirjutamast?
Object.defineProperty(Array.prototype, 'shuffle', {
    value(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
});
*/

// Tagastab clone'i body'st
const clearBody = () => {
    // Deep clone body node'i et me saaks selle pärast uuesti luua
    const bodyClone = document.body.cloneNode(true);

    for (const node of document.body.childNodes) {
        node.removeChild(node);
    }

    return bodyClone;
};

// Muudab value väärtust kui sliderit liigutatakse
// Samuti ükkab slideri thumb'i lähima lubatud väärtuse peale, sest brauserid seda ei ise ei tee
slider.oninput = () => {

    let lowestDiff = 64;
    let closestValidValue = 0;

    // Leiame kas üks lubatud väärtustest on valitud, aga eeldame et ei ole, nii et saame vajadusel sundida lubatud väärtuse peale
    const isValid = validCardsAmounts.some(num => {
        const diff = Math.abs(Number(slider.value) - num);
        if (diff < lowestDiff) {
            lowestDiff = diff;
            closestValidValue = num;
        }
        return num === Number(slider.value);
    });

    if (!isValid) {
        slider.value = closestValidValue;
    }
    value.innerText = slider.value;
};

// Play nupu vajutamisel alustame mänguga
play.onclick = () => startGame(slider.value / 2, clearBody());

// Nõuab kaartide kogust ja body clone'i
function startGame(pairs, body) {
    const deck = new Deck(pairs);


}