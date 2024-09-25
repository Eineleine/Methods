import { Character } from './character';

export class Magician extends Character {
    constructor(name,type) {
        super(name,type);
        this.attack = 10;
        this.defence = 40;
    }
}