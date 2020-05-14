const play = document.getElementById('play');
const slider = document.getElementById('slider');
const value = document.getElementById('value');

// Muudab value väärtust kui sliderit liigutatakse
slider.addEventListener('input', () => {
    value.innerText = slider.value;
});

// Play nupu vajutamine
player.addEventListener('onclick', () => {
    startGame(slider.value);
});

function startGame(cards) {

}