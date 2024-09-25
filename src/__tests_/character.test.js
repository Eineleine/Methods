import { Character } from '../character';

describe('Character', () => {
    test('should create a character with valid name and type', () => {
        const character = new Character('John', 'Bowerman');
        expect(character.name).toBe('John');
        expect(character.type).toBe('Bowerman');
        expect(character.health).toBe(100);
        expect(character.level).toBe(1);
    });

    test('should throw error for invalid name', () => {
        expect(() => new Character('A', 'Bowerman')).toThrow('Неверный формат имени');
        expect(() => new Character('TooLongName', 'Bowerman')).toThrow('Неверный формат имени');
        expect(() => new Character(123, 'Bowerman')).toThrow('Неверный формат имени');
    });

    test('should throw error for invalid type', () => {
        expect(() => new Character('John', 'NonexistentType')).toThrow('Такого класса не существует');
    });

    test('should increase level and reset health on level up', () => {
        const character = new Character('John', 'Bowerman');
        character.attack = 10;
        character.defence = 10;

        character.levelUp();
        
        expect(character.level).toBe(2);
        expect(character.health).toBe(100);
        expect(character.attack).toBe(12); // 10 + 20%
        expect(character.defence).toBe(12); // 10 + 20%
    });

    test('should throw error if level up is called on a dead character', () => {
        const character = new Character('John', 'Bowerman');
        character.health = 0;
        
        expect(() => character.levelUp()).toThrow('Нельзя повысить левел умершего');
    });

    test('should reduce health correctly on taking damage', () => {
        const character = new Character('John', 'Bowerman');
        character.defence = 50; // 50%
        character.health = 100;
        character.damage(50); // taking 50 points of damage
        expect(character.health).toBe(75); // 50 - (50 * 0.5) = 25
    });

    test('should not allow health to go below 0', () => {
        const character = new Character('John', 'Bowerman');
        character.health = 0;
        character.damage(200);
        expect(character.health).toBe(0); // health should not go negative
    });

});