function() {
    alert('Welcome to SPACE BATTLES');

    if (confirm(`Greetings comrade! Earth has been attacked by a horde of aliens! You are the captain of the USS Assembly, 
    on a mission to destroy every last alien ship. Battle the aliens as you try to destroy them with your lasers.
    There are six alien ships. The aliens' weakness is that they are too logical and attack one at a time: 
    they will wait to see the outcome of a battle before deploying another alien ship. Your strength is that you have the initiative and get to attack first. 
    However, you do not have targeting lasers and can only attack the aliens in order. After you have destroyed a ship, you have the option to make a hasty retreat. 
    Do you wish to fight? Press [OK] to continue or [Cancel] to exit.`)) {
        alert('Attack!');
    }

class Ship {
    constructor(name, hull, firepower, accuracy) {
        this.name = name;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    }
};

const game = {
    title: "Space Battle",
    playing: true,
    ussAssembly: new Ship('USS Assembly', 20, 5, 0.7),
    ailenShipNames: ['Yehat', 'Zoni', 'Sdanli', 'Rutans', 'Optera', 'Jotoki'],
    alienShips: [],

    attack: function (attacker, attacked) {
     console.log(`${attacker.name} is attacking ${attacked.name}!`);
        console.log(`%c${attacker.name} is attacking ${attacked.name}!`, `color: green`);
        alert(`${attacker.name} is attacking ${attacked.name}`);
    
        if (Math.random() < attacked.accuracy) {
         console.log(`${attacked.name} has been hit!`);
            console.log(`%c${attacker.name} HITS the ${attacked.name}!!!`, `color: red`);
             
            attacked.hull = attacked.hull - attacker.firepower;
            
            console.log(`%cYou have done ${attacker.firepower} damage on the ${attacked.name}`, `border: 1px solid grey`);
            
            if (attacked.hull < 0) { attacked.hull = 0 };
            
            console.log(`${attacked.name}'s hull is now ${attacked.hull}.`);
            
            if (attacked.hull === 0) {
                console.log(`${attacked.name} has been DESTROYED!`);
             
                if (attacked.name !== 'USS Schwarzenegger') {
                    alert(`Great job, Captain. ${attacked.name} has been DESTROYED!\n\nThe ${attacker.name}'s remaining hull is at ${attacker.hull}.`);
                }
                alert(`Great job, Captain. ${attacked.name} has been DESTROYED!\n\nThe ${attacker.name}'s remaining hull is at ${attacker.hull}.`);
                if (attacked.name === 'USS Assembly') {
                    console.log('You LOSE!');
                    alert(`Mission failed the aliens have taken over earth`)
                
                    this.playing = false;
                }
                else {
                    
                    this.removeDestroyed(attacked);
            
                    if (this.alienShips.length === 0) {
                        alert('Congratulation, you have saved earth from the alien destruction!')
                    }
                    if (this.alienShips.length > 0) {
                        
                        let answer = prompt('Would you like to attack the next ship or retreat? \nYou can choose the following options: \ntype \'attack\' to continue or type \"retreat\" to quit.\nOR you can also, \nClick [OK] to continue or [Cancel] to exit.\n');
                        //if answer is retreat, game is over
                        if (answer.toLowerCase() === 'retreat') {
                            console.log('Go ahead and run. COWARD!');
                            
                            this.playing = false;
                        }
                        else if (answer.toLowerCase() === 'attack') {
                            
                            this.pickShip();
                        }
                    }
                    else {
                        
                        console.log('You saved mankind!');
                        this.playing = false;
                    }
                }
            }
            
            else {
                this.attack(attacked, attacker);
            }
        }
        else {
            //tell us the attacking ship missed
            console.log(`${attacker.name} has missed!`);
            this.attack(attacked, attacker);
        }
    },

    
    generateEnemies() {
        
        for (ship of this.alienShipNames) {
            
            let name = ship;
            let hull = (Math.floor(Math.random() * (6 - 3 + 1) + 3));
            let firepower = (Math.floor(Math.random() * (4 - 2 + 1) + 2));
        
            let accuracy = Math.random() * (0.8 - 0.6) + 0.6;
        
            let alienShip = new Ship(ship, hull, firepower, accuracy);
            
            this.alienShips.push(alienShip);
        }
    },

    
    reset: function () {
        game.playing = true;
        game.ussAssembly.hull = 20;
        game.alienShips = [];
    },

    
    displayAliens: function () {
        let description = '';
        for (i = 0; i < this.alienShips.length; i++) {
            let alien = this.alienShips[i];
            description = description + `[${i + 1}] ${alien.name}\nHull: ${alien.hull}, Firepower: ${alien.firepower}, Accuracy: ${alien.accuracy}\n`
        }
        return prompt('Attack);
    },

    
    pickShip: function () {
        
        let AlienToAttack = parseInt(this.displayAliens()) - 1; 
        
        this.attack(this.ussAssembly, this.alienShips[AlienToAttack]);
    },

    
    removeDestroyed: function (enemy) {
        for (i = 0; i < this.alienShips.length; i++) {
            if (enemy === this.alienShips[i]) {
                for (ship of this.alienShips) {
                }
                this.alienShips.splice(i, 1);
            };
        };
    },

     generateEnemies(){
        while (this.playing === true) {
                
            let AlienToAttack = parseInt(this.displayAliens())-1;
            this.attack(this.ussAssembly, this.alienShips[AlienToAttack]);
            this.pickShip();
        }
        
        if(confirm('Would you like to play again? \nClick [OK] to continue or [Cancel] to exit.')) {
            alert('Way to go!');
            game.reset();
            game.play();
        }
        else {
            alert('Are you sure you want to leave!');
            this.playing = false;
        }
    }
    else {
        alert('Earth has been invaded way to go!');
        this.playing = false;
    };
     }
            
            
    }
}

console.log(game.play());
