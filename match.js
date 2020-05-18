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
        this._state = 'hidden';
    }

    get state() {
        return this._state;
    }

    /**
     * @param {string} state should be 'hidden', 'visible' or 'temporarilyVisible'
     */
    set state(state) {
        if (![
            'hidden',
            'visible',
            'temporarilyVisible'
        ].includes(state)) {
            throw Error('Attempted to set unknown card state');
        }

        this._state = state;
    }
}

class Deck {
    constructor(pairs) {
        // TODO: this.faces on tõenäoliselt ebavajalik, generateFaces() ja generateDeck() peaks kombineerima
        this.faces = this.generateFaces(pairs);
        this.cards = this.generateDeck(this.faces);
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
        const cards = [];

        for (const face of faces) {
            cards.push(new Card(face));
        }

        return cards;
    }
}

// Tagastab clone'i body'st
const clearBody = () => {
    // Deep clone body node'i et me saaks selle pärast uuesti luua
    const bodyClone = document.body.cloneNode(true);

    // document.body.textContent = '';
    const body = document.body;
    while (body.firstChild) {
        body.removeChild(body.lastChild);
    }

    return bodyClone;
};

// Loob menüü event listenerid, seda funktsiooni on vaja kasutada pärast mängu lõppu ka
function setupMenuEventListeners() {
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

    // Play nupu vajutamisel alustame mänguga ja tühjendame <body> sisu
    play.onclick = () => startGame(slider.value / 2, clearBody());
}

setupMenuEventListeners();

const buildDeckInterface = deck => {
    const fragment = document.createDocumentFragment();

    for (const card of deck.cards) {
        const container = document.createElement('div');
        container.classList.add('card-container');

        const front = document.createElement('div');
        front.classList.add('front');
        const text = document.createTextNode(card.face);
        front.appendChild(text);
        container.appendChild(front);

        const back = document.createElement('div');
        back.classList.add('back');
        container.appendChild(back);

        fragment.appendChild(container);
    }

    return fragment;
};

// Nõuab kaartide kogust ja body clone'i
function startGame(pairs, bodyClone) {
    const deck = new Deck(pairs);

    const fragment = buildDeckInterface(deck);
    document.body.appendChild(fragment);

    return;
    // Taasloob menüü
    document.body.replaceWith(bodyClone);
    setupMenuEventListeners();
}