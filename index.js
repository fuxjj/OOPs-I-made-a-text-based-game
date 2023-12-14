let currentRoom;
class Room {
    constructor(name) {
        this._name = name;
        this._description = "";
        this._linkedRooms = {};
        this._character = "";
        this._locked = false;
        this._items = [];
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

    get items() {
        return this._items;
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

    describeItems() {
        if (this._items.length > 0) {
            const itemNames = this._items.map(item => item.name);
            return `You see ${itemNames.join(', ')} in the ${this._name}.`;
        } else {
            return `There are no items in the ${this._name}.`;
        }
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
    

    move(direction) {
        if (this._linkedRooms[direction]) {
            const nextRoom = this._linkedRooms[direction];
            if (nextRoom && nextRoom.locked) {
                if (player.hasKey()) {
                    nextRoom.unlock();
                    player.useKey();
                    return nextRoom;
                } else {
                    alert(`The ${nextRoom.name} is locked, and you don't have the key!`);
                    return this;
                }
            } else {
                return nextRoom;
            }
        } else {
            alert("You can't go that way!");
            return this;
        }
    }
    

    unlock() {
        this._locked = false;
        alert(`You have unlocked the ${this._name}!`)
    }

    addItem(item) {
        this._items.push(item)
    }
}

class Item {
    constructor(name, description, isKey = false) {
        this._name = name,
        this._description = description
        this._isKey = isKey
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get isKey() {
        return this._isKey;
    }
}

class Character {
    constructor(name) {
        this._name = name,
        this._description = ""
        this._conversation = ""
        this._inventory = [];
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

    addItemToInventory(item) {
        this._inventory.push(item);
    }

    describeInventory() {
        if(this._inventory.length >  0) {
            const itemNames = this._inventory.map(item => item.name);
            return `You have ${itemNames.join(', ')} in your inventory.`
        } else {
            return `Your inventory is empty.`;
        }
    }

    hasKey() {
        return this._inventory.some(item => item.isKey);
    }

    useKey() {
        // Remove the key from the player's inventory
        const keyIndex = this._inventory.findIndex(item => item.isKey);
        if (keyIndex !== -1) {
            this._inventory.splice(keyIndex, 1);
        }
    }
}

const player = new Character("PlayerName");

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

    let inventoryMsg = player.describeInventory();

    let textContent = "<p>" + Room.describe() + "</p>" + "<p>" + occupantMsg + "</p>" + "<p>" + Room.getDetails() + "</p>" + "<p>" + inventoryMsg + "</p>";

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
                const newRoom = currentRoom.move(command);
                if (newRoom !== currentRoom) {
                    currentRoom = newRoom;
                    displayRoomInfo(currentRoom);
                }
                document.getElementById("userText").value = "";
            } else {
                document.getElementById("userText").value = "";
                alert("That is not a valid command, please try again!")
            }
        }
    });

    if (currentRoom === kitchen) {
        player.addItemToInventory(knife);
    }
    
}

//add Items for the user to collect
const knife = new Item("Knife", "A cooking knife");
kitchen.addItem(knife);

