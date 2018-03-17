import { Injectable } from '@angular/core';
import { ATTRIBUTES, RACES, CLASSES, XP_ADJUSTMENTS, SPELLS, CLASS_GROUP_XREF, 
				SAVING_THROW_NAMES, SAVING_THROWS, ATTRIBUTE_ABILITY_MODIFIERS_XREF, 
				ATTRIBUTE_ABILITY_MODIFIERS, LANGUAGE_PROFICIENCY, ATTACK_TABLES,
				CURRENCY_VALUES } from  './data/constants';
import { Attribute, Character, STAGE, Gear } from './character.class';
import { NAMES } from './data/mock-names';
import { EQUIPMENT } from './data/equipment';

import { AuthService } from './auth.service';
import { AngularFireDatabase } from 'angularfire2/database';


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
	Equipment = EQUIPMENT;
	CurrencyValues = CURRENCY_VALUES
	
	user: any;
	urls: any = {};
	
	dbObservable: any;
	
	public userData: any = {
		userRolls: {},
		userCharacter: {}
	}

	constructor(private authService: AuthService, private db: AngularFireDatabase) {
		authService.user.subscribe( user => {
			this.user = user;

			if (user) {
				this.urls.user = 'Users/' + user.uid;
				this.urls.userRolls = this.urls.user + '/RollCounts';
				this.urls.userCharacter = this.urls.user + '/Character';
				this.db.object(this.urls.user + '/profile').set({
													displayName: this.user.displayName,
													email: this.user.email,
													phoneNumber: this.user.phoneNumber,
													photoURL: this.user.photoURL});
				/**
				this.db.object(this.urls.userRolls).valueChanges().subscribe(values => {
					//console.log('changeValues',snapshot);
					if (!values) {
						values = { 'attributeRolls':0,'xpRolls':0 }
						this.db.object(this.urls.userRolls).set(values);
					}
					Object.assign(this.userData.userRolls,values);
				});
				**/
				this.db.object(this.urls.userCharacter).valueChanges().subscribe(values => {
					//console.log('changeValues',snapshot);
					if (!values) {
						values = new Character();
						this.db.object(this.urls.userCharacter).set(values);
					}
					Object.assign(this.userData.userCharacter, values);
				});
			}	else {
				this.userData = {};
				this.urls = {};
			}
		});
	}

	/// Add values, a value to an object.s properties, 
	/// or two objects with intersecting properties
	addObjectsAndValues(...inputs: any[]): any {
		let objs = [], values = [];
		// force this for now, ignore all values that are not numbers
		let ignoreNaN = true
		
		// group objects and values
		inputs.forEach(input => {
			if (isNaN(input)) objs.push(input)
			else values.push(input);
		});
		
		// reduce objects and values to a single of each
		let value = this.addValues(...values);
		let obj = this.addObjects(...objs);
		
		// If either doesn't exist, return the other;
		if (!value) return obj;
		if (!obj || obj == {}) return value;
		
		// otherwise, add the value to all the numeric properties
		Object.keys(obj).forEach(key => { 
			let keyVal = obj[key];
			if (!isNaN(keyVal)) obj[key] += value;
		});
		
		return obj;
	}
	
	// given an array of objects, output an object with a union
	// of all the input object properties where repeated properties
	// are a sum of all the properties with the same key.
	addObjects(...inputs: any[]): any {
		// force this for now -- ignore all values that are not numbers
		let ignoreNaN = true;
		let obj = {};
		inputs.forEach(input => {
			Object.keys(input).forEach(inputKey => {
				let value = input[inputKey];
				if (!ignoreNaN || !isNaN(value)) {
					if (!obj[inputKey]) obj[inputKey] = value;
					else obj[inputKey] += value;
				}	
			});
		});
		return obj;
	}
	
	// add an array of numeric values
	addValues(...values: number[]): number {
		let value: number = values.reduce( (total,val) => { return total + val }, 0);
		return value;
	}
	
	getAcZeroHit(className: string, level: number) {
		let acHit;
		try {
			let charClass = this.getClass(className);
			let classGroup = this.getClassGroup(className);
			let attackTable = ATTACK_TABLES[classGroup];
			acHit = !attackTable ? 20 : attackTable[level] + 19
		} catch(e) {
			// level 0 human
			return 20;
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
	
	getDenomination(denom: string): any {
		let currency = this.CurrencyValues[denom];
		return currency;
	}
	
	getEquipment(): Array<any> {
		let equipment = this.Equipment;
		return equipment;
	}

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
			return table[character.level];
		}
		if (!values) return null;
		
		return table;
	}
	
	incrementRoll(rollType: string) {
		this.userData.userRolls[rollType]++;
		this.updateRollCount(this.userData.userRolls);
	}
	
	updateRollCount(countObj) {
		let upObject = {};
		upObject[this.urls.userRolls]=countObj;
		this.db.object('/').update(upObject);
	}
	updateCharacter(character: Character) {
		let upObject = {}
		upObject[this.urls.userCharacter] = character;
		this.db.object('/').update(upObject);
		
	}
	
	// sort an array of objects by any first-level properties in those objects
	sortObjectArray(objects: any[], ...properties): any[] {
		return objects.sort((obj1,obj2) => {
			for (let i = 0; i < properties.length; i++) {
				let prop = properties[i];
				let isLast = i === properties.length-1;
				if (!obj1[prop] || !obj2[prop]) {
					if (isLast) return 0;
				} else {
					if (obj1[prop] > obj2[prop]) return 1;
					if (obj1[prop] < obj2[prop]) return -1;
					if (obj1[prop] == obj2[prop] && isLast) return 0;
				}
			}
			return 0;
		});
	
	}
		
}
