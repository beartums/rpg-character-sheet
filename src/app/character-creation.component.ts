import { Component }              from '@angular/core';
//import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { RollService } from './roll.service'
import { Character, Attribute } from './character.class';
import { CharacterService } from './character.service';
import { DataService } from './data.service';
import { HostListener } from '@angular/core';

@Component({
	selector: 'character-creation',
  templateUrl: './character-creation.component.html',
	styleUrls: ['./character-creation.component.css','app.component.css'],
	providers: [CharacterService, DataService],
})

export class CharacterCreationComponent  {

	character: Character = new Character();

	rollCount: number = 0;
	allowedRolls: number = 3;

	selectedIndex:number;
	detailsLocked: boolean = true;
	attributesLocked: boolean = false;
	hpLocked: boolean = true;

	JSON = JSON;
	isNaN = isNaN;

	constructor(private cs: CharacterService, private ds: DataService) {
		this.character.level=1
		this.character.experiencePoints=0;
		this.character.gold = 0;
		// this.character.goldPieces=0
	}

	generateAttributes(): void {
		this.character.attributes = this.cs.generateAttributesArray();
		this.selectedIndex = null;
		this.rollCount++;
	}

	generateName(raceName?:string, gender?: string): void {
		raceName = raceName || this.character.raceName;
		gender = gender || this.character.gender;
		gender = (gender !== 'Male' && gender !== 'Female') ? null : gender;

		try {
			let fName = this.cs.generateName(raceName,gender);
			let lName = this.cs.generateName(raceName,'family');
			this.character.name = fName + ' ' + lName;
		} catch(e) {
			console.log(e);
		}
	}

	getAdjustedAttributes(attributes: Attribute[]): Attribute[] {
		attributes = attributes || this.character.attributes;
		if (!attributes || attributes.length < 1) return [];
		if (!this.character.raceName) return attributes;
		return this.cs.getAdjustedAttributes(attributes, this.character.raceName);
	}

	getAttribute(attributes: Attribute[], key: string): Attribute {
		for (let i = 0; i < attributes.length; i++) {
			if (attributes[i].key == key) return attributes[i];
		}
		return null;
	}

	getAttributeRaceMod(attributeKey: string, raceName: string, className?: string): number {
		if (!raceName) return 0;
		return this.cs.getAttributeRaceMod(attributeKey, raceName, className)
	}

	// getModifiedValue(key: string, value: number, raceName?: string, classname?: string): any {
	// 	//return this.ds.getModifiedValue(key, value, raceName, className);
	// }

	getClassValidity(className: string, raceName?: string): any {
		if (!this.character.attributes) return [];
		raceName = raceName || this.character.raceName || "";
		raceName = raceName.length==0 ? null : raceName;
		let validity: any = this.cs
								.getValidity(this.character.attributes,className,raceName);
		return validity.meetsClassRequirements;
	}

	getRaceValidity(raceName: string, className?: string): any {
		if (!this.character.attributes) return [];
		className = className || this.character.className || "";
		className = className.length==0 ? null : className;
		let validity: any = this.cs
								.getValidity(this.character.attributes,className,raceName);
		return validity.meetsRaceRequirements;
	}

	getValidClasses(raceName?: string): any[] {
		raceName = raceName || this.character.raceName;
		let classes = this.ds.getClasses();
		let validClasses: any[] = [];
		for (let i = 0; i < classes.length; i++) {
			if (this.getClassValidity(classes[i].name, raceName)) {
				validClasses.push(classes[i]);
			}
		}
		return validClasses;

	}

	/**
	 * Get a list of the valid races for the specified class
	 * @param  {string} className (optional) Name of class chosen
	 * @return {any[]}            array of valid race objects
	 */
	getValidRaces(className?: string): any[] {
		className = className || this.character.className;
		let races = this.ds.getRaces();
		let validRaces: any[] = [];
		for (let i = 0; i < races.length; i++) {
			if (this.getRaceValidity(races[i].name, className)) {
				validRaces.push(races[i]);
			}
		}
		return validRaces;
	}

	@HostListener('window:keydown', ['$event'])
/**
 * Listen for keyboard shortcuts
 * @param  {any}    event Keyboard event object
 * @return {void}
 */
	keyboardInput(event: any) {

		// if nothing is selected, or the pressed key is not one we are capturing
		// just return.
		if (!this.selectedIndex && this.selectedIndex!==0) return;
		if (event.key!="ArrowDown" && event.key!="ArrowUp" && event.key !="Escape") return;

		// prevent any other DOM element from capturing
		event.preventDefault();

		// Unselect all attributes on Escape
		if (event.key=="Escape") {
				this.selectedIndex = null;
				return;
		}

		// keydown moves the attribute value to the next attribute,
		// keyup moves it to the previous attribute
		let a = this.character.attributes[this.selectedIndex];
		let newIndex: number

		if (event.key == "ArrowDown") {
		 	if (this.selectedIndex >= this.character.attributes.length-1) return;
			newIndex = this.selectedIndex + 1;
		} else if (event.key=="ArrowUp") {
			if (this.selectedIndex <1) return;
			newIndex = this.selectedIndex-1;
		}

		// swap values
		let b = this.character.attributes[newIndex];
		let c = a.value;
		a.value = b.value;
		b.value = c;
		// move selection to the attribute that got the moving value
		this.selectedIndex = newIndex;
	}

	/**
	 * Handle the dropping of an attribute from drag and dropping:
	 * swap the value of the dropped att with the target att
	 * @param {any} event Event object
	 */
	onAttributeDrop(event:any): void {
		// get the target attribute
		let key = event.nativeEvent.currentTarget.id;
		let targetAttribute = this.getAttribute(this.character.attributes, key);
		// gt the source attribute
		key = event.dragData.key;
		let sourceAttribute = this.getAttribute(this.character.attributes, key);

		if (!targetAttribute || !sourceAttribute || sourceAttribute == targetAttribute) return;
		let hold = sourceAttribute.value;
		sourceAttribute.value = targetAttribute.value;
		targetAttribute.value = hold;
	}

	/**
	 * Lock the attribute-generation and allow editing of other detailsLocked
	 * @return {void} [description]
	 */
	toggleAttributeLock() {
		// ignore if the details are locked
		if (this.detailsLocked && this.attributesLocked) return;
		this.selectedIndex = null;
		this.attributesLocked = !this.attributesLocked;
		this.detailsLocked = !this.attributesLocked;
		// clear the details -- should not be filled out if attributes are unlocked
		this.clearDetails();
	}

	toggleDetailsLock() {
		this.detailsLocked = !this.detailsLocked;
		if (!this.detailsLocked) {
			// we just unlocked, so wipe it
			this.character.gold = 0;
			this.character.experiencePoints = 0;
			this.character.level = 0;
			this.character.hitPoints = 0
		} else {
			// generate starting gold (with a little bit of luck thrown in
			let luck = this.cs.roll('1d10');
			let luckMultiplier = luck == 1 ? 1 :
														luck == 10 ? 100 : 10;
			this.character.gold = this.cs.roll('3d6') * luckMultiplier;
			// Generate Starting XP
			luck = this.cs.roll('1d10');
			luckMultiplier = luck == 1 ? 1 :
														luck == 10 ? 100 : 10;
			this.character.experiencePoints = this.cs.roll('5d6k3') * luckMultiplier;
			this.character.level = this.cs.getClassLevel(this.character.className,this.character.experiencePoints);
//			let hpSpecs = this.cs.getClassLevelHpSpecs(this.character.className,this.character.level);
			this.character.hitPoints = this.cs.generateHitPoints(this.character.className, this.character.level,this.character.attributes);
		}
	}

	isDetailsValid(): boolean {
		if (!this.character.gender) return false;
		if (!this.character.className) return false;
		if (!this.character.raceName) return false;
		if (!this.character.alignmentLaw) return false;
		if (!this.character.alignmentGood) return false;
		if (!this.character.name) return false;
		return true;
	}

	/**
	 * Clear the detail fields
	 */
	clearDetails(): void {
		this.character.raceName = null;
		this.character.className = null;
		this.character.gender = null;
		this.character.alignmentGood = null;
		this.character.alignmentLaw = null;
		this.character.name = null;
		this.character.nickname = null;
	}

	/**
	 * Select an attribute index to be moved by keyboard arrows
	 * @param {number} idx Index of the attribute to be moved
	 */
	selectIndex(idx: number): void {
		if (this.attributesLocked) return;
		if (this.selectedIndex == idx) this.selectedIndex = null;
		else this.selectedIndex = idx;
	}
	
	isIn(a: any[], lookup: any): boolean {
		if (!a || !a.length) return true;
		for (let i = 0; i < a.length; i++) {
			if (a[i]==lookup) return true
		}
		return false;
	}
}
