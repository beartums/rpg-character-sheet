//import { Roll } from '.\roll';
export enum AlignmentLaw {
	"Lawful", "Neutral", "Good"
}
export class Character {
	name: string;
	nickname: string;
	level: number;
	gender: string;
	className: string;
	raceName: string;
	hitPoints: number;
	experiencePoints: number;
	alignmentLaw: string;
	alignmentGood: string;
	attributes: Attribute[];
	equipment: Equipment;
	treasure: Treasure[];
	gold: number;
}

export class Attribute {
	constructor(public key: string, public value: number) {}
}


export class Equipment {
	gear: Gear[];
	weapons: Weapon[];
	armor: Armor[];
	inUse: any[];
}

export class Gear {
	name: string;
	cost: number;
	denomination: string;
	weight: number;
}

export class Weapon extends Gear {
	description: string;
	damageOneHanded: string;					 // roll notation
	damageTwoHanded: string;
}
export class Armor extends Gear {
	description: string;
	armorClass: number;
	armorClassMod: number;
}

export class Treasure {
	type: string;
	name: string;
	description: string;
	quantity: number;
	value: number; // GP value
}

export class SavingThrowDetail {
	savingThrowName: string;
	rollTarget: number;
	raceMod: number;
	classMod: number;
	attributeMod: number;
}
