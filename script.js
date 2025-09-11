let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick" , "Dagger", "Sword"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector ("#Button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthtext = document.querySelector("#healthtext");
const goldtext = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats")
const monsterNametext = document.querySelector("#monsterNameText");
const monsterHealthText = document.querySelector("#monsterHealthText")
     
// Initialise Butoons

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;


//Creating Functions for the abovr buttons

function goStore () {
    
}
