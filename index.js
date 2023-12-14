class Room {
    constructor(name) {
        this._name = name;
        this._description = "";
        this._linkedRooms = {};
        this._character = "";
        this._locked = false;
    }

    get name() {
        return(this._name);
    }

    get description() {
        return(this._description);
    }

    get character() {
        return(this._character);
    }

    get locked() {
        return this._locked;
    }

    set name(value) {
        if (value.length < 4) {
            alert("Name is too short!");
            return;
        }
        this._name = value;
    }

    set description(value) {
        if (value.length < 4) {
            alert("Description is too short!");
            return;
        }
        this._description = value;
    }

    set character(value) {
        this._character = value;
    }

    describe() { //Describe the room the user is currently in
        return `Looking around the ${this._name} you can see ${this._description}`;
    }

    linkRoom(direction, roomToLink, isLocked=false) { //Link the rooms together
        if (isLocked) {
            this._linkedRooms[direction] = null; //Dont allow the user if the room is locked
        } else {
            this._linkedRooms[direction] = roomToLink; //Allow the user if the room is unlocked
        }

        
    }

    getDetails() {
        const entries = Object.entries(this._linkedRooms);
        let details = [];
        
        for (const [direction, room] of entries) {
            if (room) {
                let text = ` The ${room.name} is to the ${direction}`;
                details.push(text);
            } else {
                let text = ` A locked room is to the ${direction}`;
                details.push(text);
            }
        }
        return details;
    }
    

    move(direction) { //Code to allow the user to move to another room OR deny them to go an invalid way
        if (this._linkedRooms[direction]) {
            const nextRoom = this._linkedRooms[direction];
            if (nextRoom && !nextRoom.locked) {
                return nextRoom;
            } else {
                alert(`The ${nextRoom.name} is locked!`);
                return this;
            }
        } else {
            alert("You can't go that way!");
            return this;
        }
    } //End of class "room"

    unlock() {
        this._locked = false;
        alert(`You have unlocked the ${this._name}!`)
    }
}

class Item {
    constructor(name) {
        this._name = name,
        this._description = ""
    }
}

class Character {
    constructor(name) {
        this._name = name,
        this._description = ""
        this._conversation = ""
    }

    set name(value) {
        if (value.length < 4) {
            alert("Name is too short!");
            return;
        }
        this._name = value;
    }

    set description(value) {
        if (value.length < 4) {
            alert("Description is too short!");
            return;
        }
        this._description = value;
    }

    set conversation(value) {
        if (value.length < 4) {
            alert("Conversation is too short!");
            return;
        }
        this._conversation = value;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get conversation() {
        return this._conversation;
    }

    describe() {
        return `You have met ${this._name}, ${this._name} is ${this._description}`;
    }

    converse() {
        return  `${this._name} says ${this._conversation}`;
    }
}

//Create our rooms and descriptions
const mainHall = new Room("Main Hall");
mainHall.description = "a large hall fit for a king linking to most of the rooms of the castle. It seems as though nature is taking over.";
const diningRoom = new Room("Dining Room");
diningRoom.description = "a large room with a grand table as the center piece, decorated with gold.";
const kitchen = new Room("Kitchen");
kitchen.description = "a narrow room with counters all around, it seems as though there are still items around from when the castle was abandonded..";
const mainBedroom = new Room("Main Bedroom");
mainBedroom.description = "a room with a large bed and dressing areas, vines have been abundant here for a while."
const storageRoom = new Room("Storage Room");
storageRoom.description = "a small room with a large collection of clothes alongside a couple of keys.."
const dungeon = new Room("Dungeon");
dungeon.description = "a dark and dingy dungeon that's been left untouched for centuries.";

//Connect the rooms
//false means the room is not locked, true means the room is locked
mainHall.linkRoom("west", diningRoom, false)
mainHall.linkRoom("north", mainBedroom, false)
mainHall.linkRoom("east", dungeon, true)
diningRoom.linkRoom("west", kitchen, false)
diningRoom.linkRoom("east", mainHall, false)
kitchen.linkRoom("east", diningRoom, false)
mainBedroom.linkRoom("east", storageRoom, true)
mainBedroom.linkRoom("south", mainHall, false)
storageRoom.linkRoom("west", mainBedroom, false)
dungeon.linkRoom("west", mainHall, false)

function displayRoomInfo(Room) {
    let occupantMsg = "";
    if (Room.character === "") {
        occupantMsg = "";
    } else {
        occupantMsg = `${Room.character.describe()}. ${Room.character.converse()}`
    }

    textContent = "<p>" + Room.describe() + "</p>" + "<p>" + occupantMsg + "</p>" + "<p>" + Room.getDetails() + "</p>";

    document.getElementById("textArea").innerHTML = textContent;
    document.getElementById("userText").innerHTML = '><input type="text" id="usertext" />';
    document.getElementById("userText").focus();
}

function startGame() {
    document.getElementById("startPage").style.display = "none";
    document.getElementById("gameArea").style.display = "block";

    currentRoom = mainHall
    displayRoomInfo(currentRoom);

    document.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            command = document.getElementById("userText").value;
            const directions = ["north", "south", "west", "east"]
            if (directions.includes(command.toLowerCase())) {
                currentRoom = currentRoom.move(command);
                document.getElementById("userText").value = "";
                displayRoomInfo(currentRoom);
            } else {
                document.getElementById("userText").value = "";
                alert("That is not a valid command, please try again!")
            }
        }
    });
}