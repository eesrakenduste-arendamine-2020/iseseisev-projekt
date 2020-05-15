const play = document.getElementById('play');
const slider = document.getElementById('slider');
const value = document.getElementById('value');

// Muudab value väärtust kui sliderit liigutatakse
slider.oninput = () => (value.innerText = slider.value);

// Play nupu vajutamine
play.onclick = () => startGame(slider.value);

function startGame(cards) {

}