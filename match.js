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

// Play nupu vajutamine
play.onclick = () => startGame(slider.value);

function startGame(cards) {

}