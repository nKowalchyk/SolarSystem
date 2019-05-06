const RealEvent = [
    "Created a baby drone",
    "Was born",
    "Has Died"
]

const RandomEvent = [
    "Found a neat rock", 
    "Took the day off",
    "Watched the sunrise on both sides of the planet",
    "Cleaned Treads",
    "Dreamed of electric sheep",
    "Calculated odds of escaping",
    "Was scared of its own shadow",
];

const DuoEvents = [
    "Fell in love",
    "continued their game of Words with Friends",
    "Debated whether Han shot first",
    "Looked at old cat pictures",

]

class Messager {
    constructor() {
        this.messages = [];
        this.document = document.getElementById("console");

        this.pushMessage("Initializing Console...");
        this.pushMessage("Booting drones...");
    }

    pushMessage(message) {
        this.messages.push(message);
        this.document.innerHTML += (message + "<br>");
    }

    pushRandomMessage(name) {
        let message = RandomEvent[Math.floor(Math.random() * (RandomEvent.length - 1))];
        this.messages.push(name + message);
        this.document.innerHTML += (name + " " + message + "<br>");
    }

    pushDuoMessage(name1, name2) {
        let message = DuoEvents[Math.floor(Math.random() * (DuoEvents.length - 1))];
        this.messages.push(name1 + " and " + name2 + " " + message);
        this.document.innerHTML += (name1 + " and " + name2 + " " + message + "<br>");
    }

    pushRealEvent(name, index) {
        let message = RealEvent[index];
        this.messages.push(name + " " + message);
        this.document.innerHTML += (name + " " + message + "<br>");
    }

    displayLogs() {
        for(let i = 0; i < this.messages.length; i++) {
            console.log(this.messages[i]);
        }
    }
};