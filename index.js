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

    describe() {
        return `Looking around the ${this._name} you can see ${this._description}`;
    }

    linkRoom(direction, roomToLink) {
        this._linkedRooms[direction] = roomToLink;
    }

    getDetails() {
        
    }
}