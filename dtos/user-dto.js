module.exports = class UserDto {
    email;
    id;
    name;
    surname;

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.name = model.name;
        this.surname = model.surname;
    }
}