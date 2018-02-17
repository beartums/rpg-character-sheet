import { Injectable } from '@angular/core';
import { ATTRIBUTES, RACES, CLASSES, XP_ADJUSTMENTS, SPELLS, CLASS_GROUP_XREF, 
				SAVING_THROW_NAMES, SAVING_THROWS, ATTRIBUTE_ABILITY_MODIFIERS_XREF, 
				ATTRIBUTE_ABILITY_MODIFIERS, LANGUAGE_PROFICIENCY, ATTACK_TABLES } from  './constants';
import { Attribute, Character } from './character.class';
import { NAMES } from './mock-names';

@Injectable()
export class DataService {

	Attributes = ATTRIBUTES;
	Races = RACES;
	Classes = CLASSES;
	XpAdjustments = XP_ADJUSTMENTS;
	Spells = SPELLS;
	ClassGroupXref = CLASS_GROUP_XREF;
	SavingThrowNames = SAVING_THROW_NAMES;
	SavingThrows = SAVING_THROWS;
	AttributeAbilityModifiersXref = ATTRIBUTE_ABILITY_MODIFIERS_XREF;
	AttributeAbilityModifiers = ATTRIBUTE_ABILITY_MODIFIERS;
	Names = NAMES;
	LanguageProficiency = LANGUAGE_PROFICIENCY;

	constructor() {
	}

	getAcZeroHit(className: string, level: number) {
		let acHit;
		try {
			let charClass = this.getClass(className);
			let classGroup = this.getClassGroup(className);
			let attackTable = ATTACK_TABLES[classGroup];
			acHit = attackTable[level]
		} catch(e) {
			return null;
		}
		return acHit;
	}
	
	getClass(key: string, prop: string = "name"): any {
		let charClass = this.getObjectByProperty(this.Classes, prop, key);
		if (key && !charClass) {
			throw `Could not find a class with property (${prop}) equal to '${key}'`
		}

		return charClass;
	}

	getClasses(): any[] {
		return this.Classes;
	}

	getClassGroup(className: string): string {
		for (let i = 0; i < this.ClassGroupXref.length; i++) {
			if (this.ClassGroupXref[i][0] == className) return this.ClassGroupXref[i][1];
		}
		return null;
	}

	// getModifiedValue(key: string, character: Character): any {
	// 	let modifiedValue = {
	// 		key: key,
	// 		originalValue: value,
	// 		modifications: any[],
	// 		actualValue: null
	// 	}
	// 	let raceMod = getRaceModification(key, value,)
	// }

	/**
	 * Search an array of objects and return the object with the matching property
		 * @param  {any[]}  objArray  Array of objects to Search
		 * @param  {string} property  Name of property to compared
		 * @param  {any}    propValue Value that property should matching
		 * @return {any}              First object encountered with the specified property = to the specified value
		 */
	getObjectByProperty(objArray: any[], property: string, propValue: any): any {
		for (let i = 0; i < objArray.length; i++) {
			if (objArray[i][property] == propValue) return objArray[i];
		}
		return null;
	}

	getRace(key: string, prop: string = "name"): any {
		let race = this.getObjectByProperty(this.Races, prop, key);
		if (key && !race) {
			throw `Could not find a Race with property (${prop}) equal to '${key}'`
		}

		return race;
	}

	getRaces(): any[] {
		return this.Races;
	}

	getSavingThrow(savingThrowName: string, className: string, level: number = 1): number {
		let classGroup = this.getClassGroup(className);
		let savingThrows = this.getSavingThrowTargetArray(savingThrowName, classGroup);
		let savingThrow = savingThrows[level];
		return savingThrow;
	}

	getSavingThrowAttributeMod(stName: string, attributes: Attribute[]): number {
		// xref table looks up ability (in this case, stName + 'SavingThrow'), if
		// no value is found, this saving throw does not have an attribute-based modifiers
		let xref = this.AttributeAbilityModifiersXref;
		let xrefLookup = xref[stName + 'SavingThrow'];
		if (!xrefLookup) return 0;

		// Otherwise, lookup the attribute used for this modifier
		let attribute = this.getObjectByProperty(attributes,'key', xrefLookup.attribute);
		let attValue = attribute.value;
		// get the appropriate modifier table
		let modifiers = this.AttributeAbilityModifiers[xrefLookup.key];
		// pull and return appropriate value
		let modValue = modifiers[attValue];
		return modValue;
	}

	getSavingThrowClassMod(stName: string, className: string): number {
		let charClass = this.getClass(className);
		if (!charClass) return 0;
		let savingThrowMods = charClass.savingThrowMods;
		if (!savingThrowMods) return 0;
		let savingThrowMod = savingThrowMods[stName];
		if (!savingThrowMod) return 0;
		return savingThrowMod;
	}

	getSavingThrowNames(): string[] {
		return this.SavingThrowNames;
	}

	getSavingThrowRaceMod(stName: string, raceName: string): number {
		let race = this.getRace(raceName);
		let savingThrowMods = race.savingThrowMods;
		if (!savingThrowMods) return 0;
		let savingThrowMod = savingThrowMods[stName];
		if (!savingThrowMod) return 0;
		return savingThrowMod;
	}

	getSavingThrowTargetArray(stName: string, classGroup: string): any[] {
		let classSavingThrows = this.SavingThrows[classGroup];
		let savingThrows = classSavingThrows[stName];
		return savingThrows;
	}

	getSpells(className?: string, level?: number): any[] {

		let requestedSpells: any[] = [];
		for (let i = 0; i < this.Spells.length; i++) {
			if (!className || className == this.Spells[i].type) {
				if (!level || level == this.Spells[i].level) {
					requestedSpells.push(this.Spells[i]);
				}
			}
		}
		requestedSpells.sort(function(a,b) {
			if (a.level>b.level) return 1;
			if (a.level<b.level) return -1;
			if (a.name>b.name) return 1;
			if (a.name<b.name) return -1;
			return 0;
		});

		return requestedSpells;
	}
			
	getTable(tableAttributeName: string, character: Character): any {
		let cClass = this.getClass(character.className);
		if (!cClass) return null;
		
		let table = cClass[tableAttributeName];
		if (!table) return null;
		
		let values;
		if (tableAttributeName == 'spellProgression') {
			for (let prop in table) {
				let propValues = table[prop][character.level];
				if (propValues) {
					if (!values) values = {};
					values[prop] = propValues;
				}
			}
		} else {
			values = table[character.level];
		}
		if (!values) return null;
		
		
		return table;
	}
}
