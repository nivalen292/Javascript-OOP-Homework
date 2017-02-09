function solve() {
    'use strict';

    const ERROR_MESSAGES = {
        INVALID_NAME_TYPE: 'Name must be string!',
        INVALID_NAME_LENGTH: 'Name must be between between 2 and 20 symbols long!',
        INVALID_NAME_SYMBOLS: 'Name can contain only latin symbols and whitespaces!',
        INVALID_MANA: 'Mana must be a positive integer number!',
        INVALID_EFFECT: 'Effect must be a function with 1 parameter!',
        INVALID_DAMAGE: 'Damage must be a positive number that is at most 100!',
        INVALID_HEALTH: 'Health must be a positive number that is at most 200!',
        INVALID_SPEED: 'Speed must be a positive number that is at most 100!',
        INVALID_COUNT: 'Count must be a positive integer number!',
        INVALID_SPELL_OBJECT: 'Passed objects must be Spell-like objects!',
        NOT_ENOUGH_MANA: 'Not enough mana!',
        TARGET_NOT_FOUND: 'Target not found!',
        INVALID_BATTLE_PARTICIPANT: 'Battle participants must be ArmyUnit-like!'
    };

    // your implementation goes here

    const getNextId = (function () {
        let counter = 0;

        return function () {
            counter++;
            return counter;
        }
    });

    class Validator {

        static validateString(str, display) {
            if (typeof str !== "string") {
                throw new Error(display);
            }
        }

        static validateLength(str, min, max, display) {
            if (str.length < min || str.length > max) {
                throw new Error(display);
            }
        }

        static validateStringSymbols(str, display) {
            if (!/^[a-zA-Z ]*$/.test(str)) {
                throw new Error(display);
            }
        }

        static validatePositiveInt(n, display) {
            if (isNaN(n) || n < 1 || n % 1 !== 0) {
                throw new Error(display);
            }
        }

        static validateNonNegativeInt(n, display) {
            if (isNaN(n) || n < 0 || n % 1 !== 0) {
                throw new Error(display);
            }
        }

        static validateEffect(effect, display) {
            if (typeof effect !== "function" || effect.arguments.length !== 1) {
                throw new Error(display);
            }
        }

        static validateAlignment(alignment, display) {
            if (alignment !== "good" && alignment !== "evil" && alignment !== "neutral") {
                throw new Error(display);
            }
        }

        static validateNumberRange(n, min, max, display) {
            if (isNaN(n) || n < min || n > max || n % 1 !== 0) {
                throw new Error(display);
            }
        }
    }

    class Spell {
        constructor(name, manaCost, effect) {
            this.name = name;
            this.manaCost = manaCost;
            this.effect = effect;
        }

        set name(name) {
            Validator.validateString(name, ERROR_MESSAGES.INVALID_NAME_TYPE);
            Validator.validateLength(name, 2, 20, ERROR_MESSAGES.INVALID_NAME_LENGTH);
            Validator.validateStringSymbols(name, ERROR_MESSAGES.INVALID_NAME_SYMBOLS);

            this._name = name;
        }

        get name() {
            return this._name;
        }

        set manaCost(manaCost) {
            Validator.validatePositiveInt(manaCost, ERROR_MESSAGES.INVALID_MANA);

            this._manaCost = manaCost;
        }

        get manaCost() {
            return this._manaCost;
        }
    }

    class Unit {
        constructor(name, alignment) {
            this.name = name;
            this.alignment = alignment;
        }

        set name(name) {
            Validator.validateString(name, ERROR_MESSAGES.INVALID_NAME_TYPE);
            Validator.validateLength(name, 2, 20, ERROR_MESSAGES.INVALID_NAME_LENGTH);
            Validator.validateStringSymbols(name, ERROR_MESSAGES.INVALID_NAME_SYMBOLS);

            this._name = name;
        }

        get name() {
            return this._name;
        }

        set alignment(alignment) {
            Validator.validateString(alignment);
            Validator.validateAlignment(alignment, "Alignment must be good, neutral or evil!");

            this._alignment = alignment;
        }

        get alignment() {
            return this._alignment;
        }
    }

    class ArmyUnit extends Unit {
        constructor(name, alignment, damage, health, count, speed) {
            super(name, alignment);

            this._id = getNextId();
            this.damage = damage;
            this.health = health;
            this.count = count;
            this.speed = speed;
        }

        set damage(damage) {
            Validator.validateNumberRange(damage, 0, 100, ERROR_MESSAGES.INVALID_DAMAGE);

            this._damage = damage;
        }

        get damage() {
            return this._damage;
        }

        set health(health) {
            Validator.validateNumberRange(health, 0, 200, ERROR_MESSAGES.INVALID_HEALTH);

            this._health = health;
        }

        get health() {
            return this._health;
        }

        set count(count) {
            Validator.validateNonNegativeInt(count, ERROR_MESSAGES.INVALID_COUNT);

            this._count = count;
        }

        get count() {
            return this._count;
        }

        set speed(speed) {
            Validator.validatePositiveInt(speed, ERROR_MESSAGES.INVALID_SPEED);
            if (speed > 100) {
                throw new Error(ERROR_MESSAGES.INVALID_COUNT);
            }

            this._speed = speed;
        }

        get speed() {
            return this._speed;
        }
    }

    class Commander extends Unit {
        constructor(name, alignment, mana, spellbook, army) {
            super(name, alignment);

            this.mana = mana;
            this.spellbook = [];
            this.army = [];
        }

        set mana(mana) {
            Validator.validatePositiveInt(mana, ERROR_MESSAGES.INVALID_MANA);

            this._mana = mana;
        }

        get mana() {
            return this._mana;
        }
    }

    class battleManager {
        constructor() {
            this._commanders = [];
            this._armyUnits = [];
        }

        getCommander(name, alignment, mana) {
            return new Commander(name, alignment, mana);
        }

        getArmyUnit(options) {
            return new ArmyUnit(options.name, options.alignment, options.damage, options.health, options.count, options.speed);
        }

        getSpell(name, manaCost, effect) {
            return new Spell(name, manaCost, effect)
        }

        addCommanders(...comanders) {
            this._commanders.push(...comanders);
            return this;
        }

        addArmyUnitTo(commanderName, armyUnit) {
            let commander = this._commanders.find(commander => commander.name === commanderName);
            if (commander === undefined) {
                throw new Error("No such commander");
            }

            this._armyUnits.push(armyUnit);
            commander.army.push(armyUnit);
            return this;
        }

        addSpellsTo(commanderName, ...spells) {
            let commander = this._commanders.find(commander => commander.name === commanderName);
            if (commander === undefined) {
                throw new Error("No such commander");
            }

            commander.spellbook.push(...spells);
            return this;
        }
    }

    return new battleManager;
}