class Room {
    constructor(name) {
        this._name = name;
        this._description = "";
        this._linkedRooms = {};
        this._character = "";
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

    linkRoom(direction, roomToLink) { //Link the rooms together
        this._linkedRooms[direction] = roomToLink;
    }

    getDetails() { //Describe to the user what rooms are in what direction
        const entries = object.entries(this._linkedRooms);
        let details = [];
        
        for (const[direction, room] of entries) {
            let text = `The ${room._name} is to the ${direction}`;
            details.push(text);
        }
        return details;
    }

    move(direction) { //Code to allow the user to move to another room OR deny them to go an invalid way
        if(direction in this._linkedRooms) {
            return this._linkedRooms[direction];
        } else {
            alert("You can't go that way!",);
            alert(this._name)
            return this;
        }
    } //End of class "room"
}

class Item {
    constructor(name) {
        this._name = name,
        this._description = ""
    }
}

