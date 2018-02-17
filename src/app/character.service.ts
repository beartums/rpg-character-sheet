import { Injectable, Inject } from '@angular/core';

import { Roll } from './roll';
import { Character, Attribute, SavingThrowDetail } from './character.class';
import { DataService } from './data.service';

@Injectable()
export class CharacterService {

	constructor(@Inject(DataService) private ds: DataService) {}

	generateAttributesArray(rollNotation: string='5d6k3'): any[] {
		let attributes: Attribute[] = [];
		for (let key in this.ds.Attributes) {
			attributes.push(this.generateAttribute(key, rollNotation));
		}
		return attributes;
	}

	generateAttribute(key: string, rollNotation: string = '5d6k3'): Attribute {
		let attribute = new Attribute(key, Roll.roll(rollNotation));
		return attribute;
	}

	/**
	 * Get an random name for the character
	 * @param  {string} race String key for the race
	 * @param  {string} type Type of name to get: male, female, family
	 * @return {string}      Random name
	 */
	generateName(race: string, type?: string): string {
		race = race.toLowerCase();
		let halfRaceName = this.getHalfRace(race);
		let races = halfRaceName ? [halfRaceName, 'human'] : [race];
		let names = [];
		races.forEach(raceName => {
			let raceObj: any = this.ds.Names[raceName];
			if (!raceObj) throw `invalid race (${race})`;
			if (type) {
				type = type.toLowerCase();
				names = names.concat(raceObj[type]);
				if (!names) throw `invalid name type (${type})`;
			} else {
				names = names.concat(raceObj.male.concat(raceObj.female));
			}
		});

		let idx: number = Math.floor(Math.random() * names.length);
		let name = names[idx];
		return name;
	}
	
	getHalfRace(raceName: string): string {
		let halfRace: string = raceName.replace('half-','');
		if (halfRace==raceName) return null;
		return halfRace;
	}

	/**
	 * Generate character hit points based on class and level
	 * @param  {string} characterClassName "name" property from character class"
	 * @param  {number} characterLevel     Level
	 * @return {number}                    Randomized hit point value
	 */
	generateHitPoints(characterClassName: string, characterLevel: number, attributes: Attribute[]): number {
			let characterClass = this.ds.getClass(characterClassName);
			let hpSpecs = this.getClassLevelHpSpecs(characterClassName,characterLevel);
			if (!characterClass) {
				console.log(`invalid character class name (${characterClassName}). Defaulting to d6`);
				hpSpecs.sides = 6
			}
			if (!characterLevel || characterLevel < 1) {
				console.log(`invalid character level (${characterLevel}).  Defaulting to 1`);
				hpSpecs.dice = 1
			}
			let con = this.ds.getObjectByProperty(attributes,'key','CON');
			let mod = this.getAbilityModByAbility('hitPointsPerDie',con.key,con.value);
			let modifier = mod.value + hpSpecs.points;
			let rollNotation = `${hpSpecs.dice}d${hpSpecs.sides}+${modifier}`;
			return Roll.roll(rollNotation);
		}
		
	roll(rollNotation: string): number {
		return Roll.roll(rollNotation);
	}

	/**
	 * Get ability Modification Values
	 * @param  {string} attributeKey Attribute key
	 * @param		{number}	attributeValue	Valu eof Attribute
	 * @return {any[]}                Arrary of ability modifiers
	 */
	getAbilityModsByAttribute(attributeKey:string, attributeValue:number): any[] {
		let abilityMods: any[] = [];
		for (let abilityKey in this.ds.AttributeAbilityModifiersXref) {
			let ability = this.getAbilityModByAbility(abilityKey, attributeKey, attributeValue);
			if (ability) abilityMods.push(ability);
		}
		return abilityMods;
	}

	getAbilityModByAbility(abilityKey: string, attributeKey: string, attributeValue: number): any {
		let ability = this.ds.AttributeAbilityModifiersXref[abilityKey];
		if (!ability) return null;
		if (ability.attribute !== attributeKey) return null;
		let table: any[] = this.ds.AttributeAbilityModifiers[ability.key];
		if (!table) return null;
		let value: any = table[attributeValue];
		if (value !== 0 && !value) return null;
		if (abilityKey == 'Proficiency') {
			value = this.ds.LanguageProficiency[value];
		}
		return {ability: abilityKey, attribute: attributeKey, value: value};
	}

	/**
	 * Get a copy of the attributes array, adjusted for race modifiers
	 * @param  {Attribute[]} attributes Raw attributes
	 * @param  {string}      raceName   Name of the race
	 * @return {Attribute[]}            Attribute array, adjusted with race modifiers
	 **/
	getAdjustedAttributes(attributes: Attribute[], raceName: string, className?: string): Attribute[] {

		let adjustedAttributes: Attribute[] = [];

		for (let i = 0; i < attributes.length; i++ ) {
			let attribute = attributes[i];
			let mod = this.getAttributeRaceMod(attribute.key,raceName,className)
			adjustedAttributes.push(new Attribute(attribute.key, attribute.value + mod ));
		}
		return adjustedAttributes;
	}

	getAttributeRaceMod(attributeKey: string, raceName: string, className?: string): number {
		let race = this.ds.getRace(raceName);
		if (!race) throw `Invalid Race Name (${raceName})`;
		let cClass = this.ds.getClass(className);
		if (className && !cClass) throw `Invalid class Name (${className})`;

		let attributeEffect = race.attributeEffects[attributeKey];
		if (!attributeEffect) throw `Attribute key not found (${attributeKey})`;

		let negateMods = cClass && cClass.ignoreAttributeMods && cClass.ignoreAttributeMods[attributeKey];

		return negateMods ? 0 : attributeEffect.modValue;
	}

	getAttributeAbilityModList(adjustedAttributes: Attribute[]): any[] {
		let xref = this.ds.AttributeAbilityModifiersXref;
		let mods: any[] = [];
		for (let prop in xref) {
			let lookup = this.ds.AttributeAbilityModifiers[xref[prop].key];
			let attribute: Attribute = this.ds.getObjectByProperty(adjustedAttributes, 'key', xref[prop].attribute);
			let mod: any = {};
			mod.name = prop;

			if (prop=='languageProficiency') {
				mod.description = this.ds.LanguageProficiency[lookup[attribute.value]];
				mod.value = 1;
			} else if (prop=='additionalSpells') {
				mod.description = lookup[attribute.value];
				if (!mod.description) continue;
				mod.description = this.stringifyArrayOrdinally(mod.description);
				mod.name = prop + 'ByLevel';
				mod.value = 1;
			} else { 
				mod.value = lookup[attribute.value] * (xref[prop].isPercent ? 100 : 1);
			}

			mod.type = xref[prop].type;
			mod.isPercent = xref[prop].isPercent;
			mod.classes = xref[prop].classes;
			mods.push(mod);
		}
		return mods;
	}
	
	getClass(className: string): any {
		return this.ds.getClass(className);
	}

	getClasses(): any[] {
		return this.ds.getClasses();
	}

	getClassLevel(className: string, xp: number): number {
		let levels = this.getClass(className).levelProgression;
		for (let i = 0; i < levels.length; i++) {
			let level = levels[i];
			if (level.xpMin > xp) {
				// assumin XP is never less than 0
				if (i>0) return levels[i-1].level
				else return 0;
			}
		}
		return levels[length-1].level;
	}
	
	getClassLevelHpSpecs(className: string, level: number): any {
		let cClass = this.getClass(className);
		let levels = cClass.levelProgression;
		let spec = { dice: 0, points: 0, sides: cClass.hitDieSides }
		let i = 0;
		while (level>=levels[i].level) {
			let levelSpec = levels[i];
			spec.dice += levelSpec.addHpType == 'd' ? levelSpec.addHpQty : 0
			spec.points += levelSpec.addHpType == 'p' ? levelSpec.addHpQty : 0
			if (++i>levels.length) return spec;
		}
		return spec;
	}

	
	getRace(raceName: string): any {
		return this.ds.getRace(raceName);
	}

	getRaces(): any[] {
		return this.ds.getRaces();
	}

	getRelevantTables(character: Character): any[] {
		let tables = [];
		
		// everyone gets an attack table
		let acZeroHit = this.ds.getAcZeroHit(character.className, character.level);
		let attackTable = {
			name: 'Attack Table',
			description: 'd20 value needed to hit against AC...',
			values: {}
		};
		
		for (let i = -6; i < 10; i++) {
			let hit = acZeroHit - i;
			hit = hit > 20 ? 20 : hit < 2 ? 2 : hit;
			attackTable.values[i] = hit;
		}
		tables.push(attackTable);
		
		let tableValues;
		
		// Clerics get turnUndead Tabel
		tableValues = this.ds.getTable('turnUndead',character);
		if (tableValues) {
			let table = {
				name: 'Turn Undead',
				description: '2d6 value needed to turn undead of HD...',
				values: tableValues
			}
			tables.push(table);
		}
		
		// Thieves get theifAbility tabler
		tableValues = this.ds.getTable('thiefSkills',character);
		if (tableValues) {
			let table = {
				name: 'Thief Skills',
				description: '% chance thief will be able to...',
				values: tableValues
			}
			tables.push(table);
		}

		// magic folks get spell-count table
		tableValues = this.ds.getTable('spellProgression',character);
		if (tableValues) {
			let table = {
				name: 'Available Spells',
				description: '# of spells of each level this character can memorize',
				values: tableValues
			}
			tables.push(table);
		}

		return tables;
	}

	getSavingThrowDetailObject(savingThrowName: string, level: number, className?: string, raceName?: string, attributes?: Attribute[]): SavingThrowDetail {
		let stdObj = new SavingThrowDetail();
		stdObj.savingThrowName = savingThrowName;
		stdObj.rollTarget = this.ds.getSavingThrow(savingThrowName, className, level);
		stdObj.raceMod = this.ds.getSavingThrowRaceMod(savingThrowName, raceName);
		stdObj.attributeMod = this.ds.getSavingThrowAttributeMod(savingThrowName, attributes);
		stdObj.classMod = this.ds.getSavingThrowClassMod(savingThrowName, className);
		return stdObj;
	}

	getSavingThrowList( level: number = 1, raceName: string = 'Human', className: string = "Fighter", attributes?: Attribute[]): any[] {
		raceName = raceName || "Human";
		className = className || "Fighter";
		let savingThrowList: SavingThrowDetail[] = [];
		let savingThrowNames = this.ds.getSavingThrowNames();

		for (let i = 0; i < savingThrowNames.length; i++) {
			let name = savingThrowNames[i];
			let stdObj = this.getSavingThrowDetailObject(name, level, className, raceName, attributes);
			savingThrowList.push(stdObj);
		}

		return savingThrowList;
	}

	getSpells(className?:string, level?: number): any[] {
		return this.ds.getSpells(className, level);
	}

	getValidity(attributes?: Attribute[], className?: string, raceName?: string): any {
		let charClass = className ?	this.ds.getClass(className) : null;
		if (!charClass && className) throw `Invalid class name (${className})`

		let race = raceName ? this.ds.getRace(raceName) : null;
		if (!race && raceName) throw `Invalid race name (${raceName})`;

		let adjustedAttributes: any[] = [];

		if (attributes) adjustedAttributes = (!raceName) ? attributes : this.getAdjustedAttributes(attributes, raceName);

		let validity = {
			race: race,
			charClass: charClass,
			adjustedAttributes: adjustedAttributes,
			meetsRaceRequirements: true,
			meetsClassRequirements: true,
			xpAdjustment: 0
		}

		if (raceName) {
			validity.meetsRaceRequirements =  this.meetsRaceRequirements(adjustedAttributes, raceName, className);
		};

		if (className) {
			validity.meetsClassRequirements = this.meetsClassRequirements(adjustedAttributes, className),
			validity.xpAdjustment = this.getXpAdjustment(adjustedAttributes, className)
		}
		return validity;
	}

	getXpAdjustment(attributes: Attribute[], className: string): number {
		let characterClass: any = this.ds.getClass(className);
		if (!characterClass) throw 	`Invalid class name ${className}`;
		let requisites = characterClass.primeRequisites;
		if (requisites.length<1) return 0;

		let requisiteTotal = 0, requisiteCount = 0;
		for (let i = 0; i < attributes.length; i++) {
			let key = attributes[i].key;
			let value = attributes[i].value;
			for (let j = 0; j < requisites; j++) {
				if (requisites[j]==key) {
					requisiteTotal += value;
					requisiteCount += 1;
				}
			}
		}
		let avg = Math.ceil(requisiteTotal/requisiteCount);
		let xpAdjustment = this.ds.XpAdjustments[avg];
		return xpAdjustment;
	}

	meetsClassRequirements(attributes?: Attribute[], className?: string): boolean {
		let characterClass: any = this.ds.getClass(className);
		if (className && !characterClass) throw 	`Invalid class name (${className})`;
		if (!characterClass) return true;
		let requirements = characterClass.attributeRequirements;
		attributes = attributes || [];

		let hasRequirements = true;
		for (let i = 0; i < attributes.length; i++) {
			let key = attributes[i].key;
			let value = attributes[i].value;
			if (requirements[key] && value < requirements[key]) {
				hasRequirements = false;
				break;
			}
		}
		return hasRequirements;
	}

/**
 * Is the specified race valid given the specified attributes and class
 * @param  {Attribute[]} attributes (optional) Race-Adjusted attributes
 * @param  {string}      raceName   (optional) Name of race to validate
 * @param  {string}      className  (optional) Name of class to validate race against
 * @return {boolean}                Given the inputs, this is valid or not vlaid
 */
	meetsRaceRequirements(attributes?: Attribute[], raceName?: string, className?: string): boolean {
		let race = raceName ? this.ds.getRace(raceName) : null;
		if (!race && raceName) throw `Invalid race name (${raceName})`;
		if (!race) return true;
		let charClass: any = this.ds.getClass(className);
		if (className && ! charClass)  throw `Invalid class name (${className})`;
		let requirements = race.attributeEffects;
		attributes = attributes || [];

		let hasRequirements = true;
		for (let i = 0; i < attributes.length; i++) {
			let key = attributes[i].key;
			let value = attributes[i].value;
			let requirement = requirements[key];
			// Get rid of max requirements.  Can be handled in the future by
			// deducting to max, if wanted
			// || value > requirement.maxValue
			if (requirement &&
				(value < requirement.minValue  ||
				(requirement.required && requirement.required > value))
			) {
				return false;
			}
		}

		// race affects attributes, so this race is not available if the class
		// is specified and this race adjusts the attributes so they don't match the
		// class
		if (className) {
			return this.meetsClassRequirements(attributes, className);
		}
		return true;
	}
	
	ordinalize(input: number): string {
		let ordinalizers: string[] = ['th','st','nd','rd','th','th','th','th','th','th'];
		let num = input % 100;
		if (num < 20 && num > 9) return input + 'th';
		num = num % 10;
		return input + ordinalizers[num];
	}
	stringifyArrayOrdinally(a: string[], separator: string = ';'): string {
		let returnString = '';
		for (let i = 0; i < a.length; i++) {
			let ordinal = this.ordinalize(i+1);
			returnString += (i==0 ? '' : '; ') + ordinal + ': ' + a[i];
		}
		return returnString;
	}
	}
