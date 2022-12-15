/*****************************************
        User Class
*****************************************/

class User {

    #id;
    #name;
    #userName;
    #email

    constructor (id, name, userName, email) {
        this.#id = id;
        this.#name = name;
        this.#userName = userName;
        this.#email = email;
    }

    get id(){
        return this.#id;
    }

    get name(){
        return this.#name;
    }

    get userName(){
        return this.#userName;
    }

    get email(){
        return this.#email
    }

    getInfo() {
        return `ID: ${this.id}\nName: ${this.name}\nUsername: ${this.userName}\nEmail: ${this.email}\n`;
    }
}


export { User }