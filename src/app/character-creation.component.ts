import { Component }              from '@angular/core';
//import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { RollService } from './roll.service'
import { Character, Attribute, STAGE } from './character.class';
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
	

	character: Character = this.ds.userData.userCharacter;

	rollCount: number = 0;
	allowedRolls: number = 3;
	
	// for dragging and dropping attributes
	draggingKey: string = '';

	selectedIndex:number;
	detailsLocked: boolean = true;
	attributesLocked: boolean = false;
	hpLocked: boolean = true;
	STAGE = STAGE;

	JSON = JSON;
	isNaN = isNaN;

	constructor(private cs: CharacterService, private ds: DataService) {
		//this.character.level=1
		//this.character.experiencePoints=0;
		//this.character.gold = 0;
		// this.character.goldPieces=0
	}
	
	generateAttributes(): void {
		this.character.attributes = this.cs.generateAttributesArray();
		this.selectedIndex = null;
		this.ds.incrementRoll('attributeRolls');
		// save values
		this.ds.updateCharacter(this.character);
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

	getAdjustedAttributes(attributes?: Attribute[], raceName?: string): Attribute[] {
		attributes = attributes || this.character.attributes;
		raceName = raceName || this.character.raceName
		if (!attributes || attributes.length < 1) return [];
		if (!raceName) return attributes;
		return this.cs.getAdjustedAttributes(attributes, raceName);
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
		//this.ds.updateCharacter(this.character);

	}

	/**
	 * Handle the dropping of an attribute from drag and dropping:
	 * swap the value of the dropped att with the target att
	 * @param {any} event Event object
	 */
	drop(event:any): void {
		//console.log(event);
		// get the target attribute
		let key = event.srcElement.id;
		let targetAttribute = this.getAttribute(this.character.attributes, key);
		// gt the source attribute
		//key = event.dragData.key;
		key = this.draggingKey;
		let sourceAttribute = this.getAttribute(this.character.attributes, key);
		this.draggingKey = '';
		
		if (!targetAttribute || !sourceAttribute || sourceAttribute == targetAttribute) return;
		let hold = sourceAttribute.value;
		sourceAttribute.value = targetAttribute.value;
		targetAttribute.value = hold;
		this.ds.updateCharacter(this.character);

	}
	
	dragStart(event: any) {
		//console.log(event);
		this.draggingKey = event.srcElement.id;
	}
	allowDrop(event) {
		event.preventDefault();
	}

	toggleAttributeStage() {
		// if stage is completed, cannot toggle the attributes
		if (this.character.stage == STAGE.Complete) return;
		// if stage is details, then moving back to attributes
		else if (this.character.stage == STAGE.Details) {
			this.clearDetails() // make sure the details are nulled
			this.ds.updateCharacter(this.character); // save to firebase	
			this.character.stage = STAGE.Attributes;
		} else {
			this.ds.updateCharacter(this.character);
			this.character.stage = STAGE.Details;			
		}
		this.ds.updateCharacter(this.character);
	}

	toggleDetailsStage() {
		if (this.character.stage == STAGE.Attributes) return;
		// if stage is details, then moving on to completed
		else if (this.character.stage == STAGE.Details) {
			this.generateBeginningBalances(this.character);
			this.ds.updateCharacter(this.character); // save to firebase	
			this.character.stage = STAGE.Complete;
			this.ds.incrementRoll("xpRolls");
		// if stage is completed, then move back to details
		} else {
			this.clearBeginningBalances(this.character);
			this.ds.updateCharacter(this.character);
			this.character.stage = STAGE.Details;			
		}
		this.ds.updateCharacter(this.character);
	}
	
	generateBeginningBalances(character: Character) {
			// generate starting gold (with a little bit of luck thrown in
			let luck = this.cs.roll('1d10');
			let luckMultiplier = luck == 1 ? 1 :
														luck == 10 ? 100 : 10;
			character.gold = this.cs.roll('3d6') * luckMultiplier;
			// Generate Starting XP
			luck = this.cs.roll('1d10');
			luckMultiplier = luck == 1 ? 1 :
														luck == 10 ? 100 : 10;
			character.experiencePoints = this.cs.roll('5d6k3') * luckMultiplier;
			character.level = 
					this.cs.getClassLevel(character.className,character.experiencePoints);
			character.hitPoints = 
					this.cs.generateHitPoints(character.className, character.level,
									this.getAdjustedAttributes(character.attributes, character.raceName));
	}
	clearBeginningBalances(character: Character) {
		character.experiencePoints = 0;
		character.gold = 0;
		character.level = 1;
		character. hitPoints = 0;
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
		if (this.character.stage != STAGE.Attributes) return;
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
