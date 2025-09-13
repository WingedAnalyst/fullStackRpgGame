let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector ("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldtext = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNametext = document.querySelector("#monsterNameText");
const monsterHealthText = document.querySelector("#monsterHealthText");

const weapons = [
    {
        name : "stick",
        power: 5
    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "claw hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    }        
];

const monsters = [
    {
        name : "4arms",
        level: 2,
        health: 100
    },
    {
        name: "slither",
        level: 8,
        health: 300
    },
    {
        name: "Dragon",
        level: 20,
        health: 400
    }
         
]

// saw myself writting the same code again, this const and update function (ln53) helps solve that
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
    },
    {
        name: "fighting arena",
        "button text" : ["Attack", "Dodge", "Run"],
        "button functions" : [attack, dodge, goToTown],
        text: "you are fighting a dragon"
    }, 
    {

        name: "kill Monster",
        "button text" : ["Go to Town Square", "Go to Town Square", "Go to Store"],
        "button functions" : [goToTown, goToTown, goStore],
        text: "The monster screams 'AhhhhhGRRRRRrr' as it dies, You gain XP and GOLD"
    },
    {

        name: "lose",
        "button text" : ["Play Again?", "Go to Town Square", "Go to Store"],
        "button functions" : [playAgain, goToTown, goStore],
        text: "You Die ☠"
    }
]

     
// Initialise Buttons

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;


//Creating Functions for the abovr buttons

function update (location) {
    monsterStats.style.display = "none";
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


function buyHealth() {
    if (gold >=10) {
            gold = gold - 10;
            health = health + 10

            goldtext.innerText = gold;
            healthText.innerText = health
    } else {
            text.innerText ="Not enough Gold"    
        }
        
}

function buyWeapon() {
if (currentWeapon < weapons.length - 1) {

    if (gold >= 30) {
                gold = gold - 30;
                currentWeapon = currentWeapon + 1;
                goldtext.innerText = gold
                let newWeapon = weapons[currentWeapon].name;
                text.innerText = "You have purchaced a " + newWeapon + ". ";
                inventory.push(newWeapon);
                text.innerText = text.innerText + "In your Inventory you have: " + inventory;
        }   else {
                text.innerText = "You do no have Enough gold to buy a weapon"
            }    
    } else { 
        text.innerText = "you already have MAX Weapons"
        button2.innerText = "sell your Weapon for 15 Gold"
        button2.onclick = sellWeapon;
        }
} 

function sellWeapon () {
    if (inventory.length > 1) {
        gold = gold + 15;
        goldtext.innerText = gold;

        let currentWeapon = inventory.shift();
        text.innerText = "You have sold a " + currentWeapon + ".";
        text.innerText = text.innerText + "in your inventory you have " + inventory
    
    } else {
        text.innerText = "You cannot sell a Stick, not wise to sell your only weapon....."
    } 
}



function fight4Arms() {
    fighting = 0;
    goFight ();
}

function fightSlither() {
    fighting = 1;
    goFight();
}

function fightDragon () {
    fighting = 2;
    goFight ();
}

function goFight() {
   update (locations[3]);
   monsterHealth = monsters[fighting].health;
   monsterStats.style.display = "block";
   monsterNametext.innerText = monsters[fighting].name;
   monsterHealthText.innerText = monsterHealth
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks." 
  text.innerText = text.innerText + "You attack it with your " + weapons[currentWeapon].name + ".";
  health = health - monsters[fighting].level;
  monsterHealth = monsterHealth - weapons[currentWeapon].power + Math.floor(Math.random()* xp) + 1;
  monsterHealthText.innerText = monsterHealth;
  healthText.innerText = health;
    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        defeatMonster ();
    }

}

function dodge() {
  text.innerText = "You Dodge an attack from " + monsters[fighting].name + ".";
}

function defeatMonster() {
  gold = gold + Math.floor(monsters[fighting].level * 6.7);
  goldtext.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function playAgain() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldtext.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goToTown();
}


