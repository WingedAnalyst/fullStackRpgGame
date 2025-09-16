let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
let tutorialMode = true;
let tutorialStep = 0;

const button1 = document.querySelector("#button1");
const button2 = document.querySelector ("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNametext = document.querySelector("#monsterNameText");
const monsterHealthText = document.querySelector("#monsterHealthText");
const mentorBox = document.querySelector("#mentorBox");
const mentorText = document.querySelector("#mentorText");
const casino = document.getElementById("casino");
const casinoBtn = document.getElementById("casinoBtn");
const guessBtn = document.getElementById("guessBtn");
const guessInput = document.getElementById("guessInput");
const casinoResult = document.getElementById("casinoResult");
const originalHeroSrc = heroImage.src;

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
        "button text": ["Go to Store","Go to Cave", "Play Bet-Shet"],
        "button functions": [goStore, goCave, playBetShet],
        text: "You are in the Town Square, Monsters are in the cave shhhhh......."

    },

    {
        name : "store",
        "button text": ["Buy 10 health (10 Gold)", "Buy Weapon (30 gold)", "Sell Weapon"],
        "button functions": [buyHealth, buyWeapon, sellWeapon],
        text: "You Enter the Store"
    },
    {
        name: "cave",
        "button text": ["Fight Armed beast: 4Arms", "Fight Fanged Beast: Slither", "Fight Dragon"],
        "button functions" : [fight4Arms, fightSlither, fightDragon],
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
        "button text" : ["Go to Cave", "Play Bet-Shet", "Go to Store"],
        "button functions" : [goCave, playBetShet, goStore],
        text: "The monster screams 'AhhhhhGRRRRRrr' as it dies, You gain XP and GOLD"
    },
    {

        name: "lose",
        "button text" : ["Play Again?", "Go to Town Square", "Go to Store"],
        "button functions" : [playAgain, goToTown, goStore],
        text: "You Die ☠"
    },
    {
        name: "betShet",
        "button text" : ["Guess a Num", "Go to Town Square" , "Go to Store"],
        "button functions" : [playBetShet, goToTown , goStore],
        text : " Welcome to the Bet-Shet! Try your luck by guessing a number between 1 and 5 \n \n Disclaimer: Izzat at Risk"
    }
]

     
// Initialise Buttons

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = playBetShet;
button4.onclick = goToTown;


nextTutorialStep();

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
    if (tutorialMode && tutorialStep === 3) {
        nextTutorialStep();
        button4.style.boxShadow = "";
    } else if (!tutorialMode) {
                mentorBox.style.display ="none";
                button4.style.boxShadow = "";
    }
    update(locations[0]);

    heroImage.src = "assets/townImg.jpg";
}


function goStore () {
    if (tutorialMode && tutorialStep === 1) {
    nextTutorialStep();
    }
    update(locations[1]);
     heroImage.src = "assets/Store.png";
 
}


function goCave () {
    mentorBox.style.display = "block";
    heroImage.src = "assets/caveImg.jpg";
        if (tutorialMode && tutorialStep === 4) {
    nextTutorialStep();
    
}
    update(locations[2])

}

function buyHealth() {
    if (gold >=10) {
            gold = gold - 10;
            health = health + 10;
            flashGold(-10);
            goldText.innerText = gold;
            healthText.innerText = health
    } else {
            text.innerText ="Not enough Gold"    
        }
        
}

function buyWeapon() {
if (currentWeapon < weapons.length - 1) {
    if (tutorialMode && tutorialStep === 2) {
    nextTutorialStep();
}
    if (gold >= 30) {
                gold = gold - 30;
                currentWeapon = currentWeapon + 1;
                goldText.innerText = gold
                flashGold(-30);
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
        goldText.innerText = gold;
        flashGold(15);

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
    heroImage.src = "assets/4Arms.jpg";
}

function fightSlither() {
    fighting = 1;
    heroImage.src = "assets/Slither.png";
    goFight();
}

function fightDragon () {
    fighting = 2;
    heroImage.src = "assets/dragon.png";
    goFight ();
}

function goFight() {
   update (locations[3]);
   monsterHealth = monsters[fighting].health;
   monsterStats.style.display = "block";
   monsterNametext.innerText = monsters[fighting].name;
   monsterHealthText.innerText = monsterHealth
    if (tutorialMode && tutorialStep === 5) {
    nextTutorialStep();
    }
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
    if (tutorialMode && tutorialStep === 6) {
    nextTutorialStep();
    }
  let goldEarned = gold + Math.floor(monsters[fighting].level * 6.7);
  let xpEarned = Math.floor(monsters[fighting].lvl * 9);
  xp = xp + xpEarned
  gold = goldEarned + gold
  goldText.innerText = gold;
  flashGold(goldEarned);
  xpText.innerText = xp;
   flashXp(xpEarned);
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
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goToTown();
}

function playBetShet() {
     update(locations[6]);
    casino.style.display = "block";
    heroImage.src = "assets/Casino.png";

    guessBtn.onclick = function() {
        let guess = guessInput.value;
        guess = Number(guess);
        if (!guess || guess <1 || guess >5) {
            casinoResult.innerText = " ZERO Izzat! Please Enter a valid number"
        return;
        }

        let luckyNumber = Math.floor(Math.random() *5) + 1

        if (luckyNumber === guess) {
            gold = gold + 20;
            goldText.innerText = gold;
            flashGold(20);
            casinoResult.innerText = " 100 Izzat! You win 20 gold \n \n Your Guess was " + guess+ " and the corect number was " + luckyNumber;
            casinoResult.style.color = "green"
        } else {
            gold = gold - 10;
            goldText.innerText = gold;
            flashGold(-10);
            casinoResult.innerText = "Zero-Shiroo! You lose 10 gold! \n \n Your Guess was " + guess+ " and the corect number was " + luckyNumber;
            casinoResult.style.color = "red"
        }
    }
}

function clearGlow() {
    button1.style.boxShadow = "";
    button2.style.boxShadow = "";
    button3.style.boxShadow = "";
    button1.style.display = "inline-block";
    button2.style.display = "inline-block";
    button3.style.display = "inline-block";
    button4.style.display = "inline-block";
}

//guide function 
function nextTutorialStep() {
    clearGlow();
    if (tutorialStep === 0) {
        mentorBox.style.display = "block";
        button1.style.boxShadow = "0 0 10px #d4af37";
        button2.style.display = "none";
        button3.style.display = "none";
        button4.style.display = "none";
    } else if (tutorialStep === 1) {
        mentorText.innerText = "Now buy a Weapon.";
        button2.style.boxShadow = "0 0 10px #d4af37";
        button1.style.display = "none";
        button3.style.display = "none";
        button4.style.display = "none";
    } else if (tutorialStep === 2) {
        mentorText.innerText = "Great! Head to the Cave to face your first challenge.  You will find the enterence to the cave in the town square! \n \nRemember: once you have unloacked the better weapon, you can sell your weaker weapon!";
        button4.style.boxShadow = "0 0 10px #d4af37";
        button1.style.display = "none";
        button2.style.display = "none";
        button3.style.display = "none";
    } else if (tutorialStep === 3) {
        mentorText.innerText = "Head to the Cave to face your first challenge.";
        button2.style.boxShadow = "0 0 10px #d4af37";
        button1.style.display = "none";
        button3.style.display = "none";
        button4.style.display = "none";
    }else if (tutorialStep === 4) {
        mentorText.innerText = "Now Choose a Monster to Fight! Start with 4Arms!";
        button1.style.boxShadow = "0 0 10px #d4af37";
    } else if (tutorialStep === 5) {
        mentorText.innerText = "Now you can choose to Attack/dodge and Run \n Remember if you run the monster heals while you DO NOT! ";
        button1.style.boxShadow = "0 0 10px #d4af37";
        button3.style.boxShadow = "0 0 10px #f37e7eff"
    } else if (tutorialStep === 6) {
        mentorText.innerText = "Well done, warrior. You are ready. I will leave you now.";
        setTimeout(() => {
            mentorBox.style.display = "none";
            tutorialMode = false;
        }, 3000);
    } 
    tutorialStep = tutorialStep + 1; 
}

function flashGold(change) {
  if (change > 0) {
    goldText.style.color = "green";
  } else if (change < 0) {
    goldText.style.color = "red";
  } setTimeout(() => {
    goldText.style.color = "white";
  }, 500);
}

function flashXp(change) {
  if (change > 0) {
    goldText.style.color = "green";
  } else if (change < 0) {
    goldText.style.color = "red";
  } setTimeout(() => {
    goldText.style.color = "white";
  }, 500);
}
