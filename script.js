let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick" , "Dagger", "Sword"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector ("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthtext = document.querySelector("#healthText");
const goldtext = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats")
const monsterNametext = document.querySelector("#monsterNameText");
const monsterHealthText = document.querySelector("#monsterHealthText");

// saw myself writting the same code again, this funtion helps solve that
const locations = [
    {
        name: "town Square",
        "button text": ["Go to Store","Go to Cave", "Fight Dragon"],
        "button functions": [goStore, goCave, fightDragon ],
        text: "You are in the Town Square and you see a sign that says 'Store'"

    },

    {
        name : "store",
        "button text": ["Buy 10 health (10 Gold)", "Buy Weapon (30 gold)", "Go to Town Square"],
        "button functions": [buyHealth, buyWeapon, goToTown],
        text: "You Enter the Store"
    },
    {
        name: "cave",
        "button text": ["Fight Armed beast: 4Arms", "Fight Fanged Beast: Slither", "Go to Town Square"],
        "button functions" : [fight4Arms, fightSlither, goToTown],
        text: "You are in the cave and you see some monsters"
    }
]
     
// Initialise Buttons

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;


//Creating Functions for the abovr buttons

function update (location) {
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}

function goToTown () {
    update(locations[0]);

}


function goStore () {
    update(locations[1]);

}


function goCave () {
    update(locations[2])

}

function fightDragon () {
    console.log ("Fighting Dragon")
}


function buyHealth() {

}

function buyWeapon() {

}

function fight4Arms() {
    console.log("fight 4arms")
}

function fightSlither() {
    console.log("Fight slither")
}