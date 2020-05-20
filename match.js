/**
 * Tagastab suvalise int'i antud vahemikus, defaultib 0'i ja max'i vahele kui anda üks argument.
 * Ei tagasta kunagi max väärtust kuna Math.random() ei ole kunagi 1.
 * @param {number} min või max kui max puudub
 * @param {number} [max]
 * @returns {number}
 */
const randomInt = (min, max) => {
    if (!max && max !== 0) [min, max] = [0, min];
    return Math.floor(Math.random() * (max - min) + min);
};
/**
 * Durstenfeld'i (Fisher-Yates) suvaline järjestus
 * https://stackoverflow.com/a/12646864
 * @param {Array} array
 */
const shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

class Card {
    constructor(deck, face) {
        this.face = face;
        // State peaks olema 'hidden', 'visible' või 'temporarilyVisible'
        this._state = 'hidden';
        this.id = this.generateSafeGuid(deck);
        this.elementReference = undefined;
    }

    get state() {
        return this._state;
    }

    /**
     * @param {string} state peaks olema 'hidden', 'visible' või 'temporarilyVisible'
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

    generateSafeGuid(deck) {
        const guid = this.generateQuickGuid();
        return deck.guids.includes(guid) ? this.generateQuickGuid(deck) : guid;
    }

    // https://stackoverflow.com/a/13403498
    generateQuickGuid() {
        return Math.random().toString(36)
            .substring(2, 15) +
                Math.random().toString(36)
                    .substring(2, 15);
    }
}

class Deck {
    constructor(pairs) {
        const faces = this.generateFaces(pairs);
        this.cards = this.generateDeck(faces);
        this.locked = false;
    }

    generateFaces(pairs) {
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

        return select;
    }

    generateDeck(faces) {
        const cards = [];

        for (const face of faces) {
            cards.push(new Card(this, face));
        }

        return cards;
    }

    get guids() {
        const guids = [];

        // See on vajalik sest this.cards ei eksisteeri esimesel korral seega iteratimine viskaks errori
        if (!this.hasOwnProperty('cards')) return [];

        for (const card of this.cards) {
            guids.push(card.id);
        }

        return guids;
    }

    /**
     * Tagastab objekti kõikide kaartide staatustega
     * Kuidas ma returni dokumenteerin??
     */
    get states() {
        const states = {
            hidden: [],
            visible: [],
            temporarilyVisible: []
        };

        for (const card of this.cards) {
            states[card.state].push(card);
        }

        return states;
    }
}

/**
 * Tühjendab body sisu ning tagastab clone'i body'st
 * @returns {HTMLElement} bodyClone
 */
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

/**
 * Loob menüü event listenerid, seda funktsiooni on vaja kasutada pärast mängu lõppu ka
 * Seda vist saaks event delegation'iga inimlikumalt teha, siin ei ole vaja 3 event listenerit
 */
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
    play.onclick = () => setTimeout(() => {
        startGame(slider.value / 2, clearBody());
    }, 100);
}

setupMenuEventListeners();

/**
 * Kui element on arrays olemas siis ta tagastab selle, kui mitte, siis tagastab undefined
 * @param {HTMLElement[]} path Event'ist saadud capture path
 * @param {string} name Otsitava klassi nimi
 * @returns {(HTMLElement|undefined)} Element või undefined
 */
const getElementInPath = (path, name) => path.find(element => element.className.includes(name));

/**
 * @param {Deck} deck
 */
function setupGameEventListeners(deck, bodyClone) {

    document.body.onclick = event => {
        const path = event.composedPath();
        // Kuna me teame et path'i kaks viimast elementi on mõtetud ja nende className võib tekitada probleeme
        const card = getElementInPath(path.slice(0, path.length - 2), 'card-container');

        // Kui elementi ei ole path'is siis selle väärtus on undefined
        // Või me lukustasime decki muutmise ajutiselt
        if (!card || deck.locked) return;

        gameEventHandler(deck, card, bodyClone);
    };
}

/**
 * @param {Deck} deck
 * @param {HTMLElement} cardElement
 */
function gameEventHandler(deck, cardElement, bodyClone) {
    const idFromElement = cardElement.getAttribute('data-id');

    const matchingCard = deck.cards.find(card => card.id === idFromElement);

    // Varajane return kui see kaart on juba nähtaval
    if (matchingCard.state === 'temporarilyVisible' || matchingCard.state === 'visible') return;

    cardElement.classList.toggle('hidden');
    matchingCard.state = 'temporarilyVisible';

    const states = deck.states;

    if (states.temporarilyVisible.length > 1) {

        // Kontrollime kas elemendid klapivad emojide poolest
        // Eeldame et on ainult kaks elementi
        if (states.temporarilyVisible[0].face === states.temporarilyVisible[1].face) {
            deck.locked = false;
            for (const card of states.temporarilyVisible) {
                card.state = 'visible';
            }

            // Kas mäng on läbi?
            if (!states.hidden.length) {
                gameVictoryHandler(bodyClone);
            }
        } else {
            deck.locked = true;
            const game = document.getElementsByClassName('game')[0];
            game.classList.add('unhoverable');
            setTimeout(() => {
                for (const card of states.temporarilyVisible) {
                    card.state = 'hidden';
                    card.elementReference.classList.toggle('hidden');
                    game.classList.remove('unhoverable');
                }
                deck.locked = false;
            }, 1167);
        }
    }
}

/**
 * Teavitab mängijat võidust
 * @param {HTMLElement} bodyClone
 */
function gameVictoryHandler(bodyClone) {

    // Taasloob menüü
    document.body.replaceWith(bodyClone);
    setupMenuEventListeners();
}

/**
 * Ehitab HTML'i struktuuri vastavalt kaartidele
 * @param {Deck} deck
 */
const buildDeckInterface = deck => {
    const fragment = document.createDocumentFragment();
    const game = document.createElement('div');
    game.classList.add('game');

    for (const card of deck.cards) {
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');
        cardContainer.setAttribute('data-id', card.id);

        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        const front = document.createElement('div');
        front.classList.add('front');
        cardElement.appendChild(front);

        const back = document.createElement('div');
        back.classList.add('back');
        // Muudab emoji twemojiks
        // eslint-disable-next-line no-undef
        const emoji = twemoji.parse(card.face, {
            folder: 'svg',
            ext: '.svg'
        });
        back.innerHTML = emoji;
        cardElement.appendChild(back);

        cardContainer.appendChild(cardElement);

        // Loome seose elemendi ja temaga seotud kaardi vahel
        card.elementReference = cardContainer;

        game.appendChild(cardContainer);
    }

    fragment.appendChild(game);

    return fragment;
};

/**
 * Alustab mängu
 * @param {number} pairs Kaartide arv
 * @param {HTMLElement} bodyClone Koopia menüü body'st et see pärast taasluua
 */
function startGame(pairs, bodyClone) {
    const deck = new Deck(pairs);

    const fragment = buildDeckInterface(deck);
    document.body.appendChild(fragment);

    setupGameEventListeners(deck, bodyClone);
}