'use strict'

class Subscriber {
    #pages;
    #groups;
    #canMonetize;

    constructor (pages, groups, canMonetize) {
      this.#pages = pages;
      this.#groups = groups;
      this.#canMonetize = canMonetize;
    }

    get pages() {
        return this.#pages
    }

    get groups(){
        return this.#groups
    }

    get canMonetize() {
        return this.#canMonetize
    }

    getInfo() {
        return  `Pages: ${this.pages}\nGroups: ${this.groups}\nMonetized: ${this.canMonetize}\n`;
    }
}

export { Subscriber }