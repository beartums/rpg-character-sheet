"use strict";
exports.characterAttributes = [
    { name: 'Strength', abbreviation: 'STR', shortAbbreviation: 'S' },
    { name: 'Dexterity', abbreviation: 'DEX', shortAbbreviation: 'D' },
    { name: 'Constitution', abbreviation: 'CON', shortAbbreviation: 'C' },
    { name: 'Intelligence', abbreviation: 'INT', shortAbbreviation: 'I' },
    { name: 'Wisdom', abbreviation: 'WIS', shortAbbreviation: 'W' },
    { name: 'Charisma', abbreviation: 'CHA', shortAbbreviation: 'Ch' },
];
var characterAttributeNames;
(function (characterAttributeNames) {
    characterAttributeNames[characterAttributeNames["STRENGTH"] = 0] = "STRENGTH";
    characterAttributeNames[characterAttributeNames["DEXTERITY"] = 1] = "DEXTERITY";
    characterAttributeNames[characterAttributeNames["CONSTITUTION"] = 2] = "CONSTITUTION";
    characterAttributeNames[characterAttributeNames["INTELLIGENCE"] = 3] = "INTELLIGENCE";
    characterAttributeNames[characterAttributeNames["WISDOM"] = 4] = "WISDOM";
    characterAttributeNames[characterAttributeNames["CHARISMA"] = 5] = "CHARISMA";
})(characterAttributeNames || (characterAttributeNames = {}));
var characterAttributeKeys;
(function (characterAttributeKeys) {
    characterAttributeKeys[characterAttributeKeys["STR"] = 0] = "STR";
    characterAttributeKeys[characterAttributeKeys["DEX"] = 1] = "DEX";
    characterAttributeKeys[characterAttributeKeys["CON"] = 2] = "CON";
    characterAttributeKeys[characterAttributeKeys["INT"] = 3] = "INT";
    characterAttributeKeys[characterAttributeKeys["WIS"] = 4] = "WIS";
    characterAttributeKeys[characterAttributeKeys["CHA"] = 5] = "CHA";
})(characterAttributeKeys || (characterAttributeKeys = {}));
var characterAttributeInitials;
(function (characterAttributeInitials) {
    characterAttributeInitials[characterAttributeInitials["S"] = 0] = "S";
    characterAttributeInitials[characterAttributeInitials["D"] = 1] = "D";
    characterAttributeInitials[characterAttributeInitials["C"] = 2] = "C";
    characterAttributeInitials[characterAttributeInitials["I"] = 3] = "I";
    characterAttributeInitials[characterAttributeInitials["W"] = 4] = "W";
    characterAttributeInitials[characterAttributeInitials["CH"] = 5] = "CH";
})(characterAttributeInitials || (characterAttributeInitials = {}));
var savingThrowNames;
(function (savingThrowNames) {
    savingThrowNames[savingThrowNames["BREATH_ATTACKS"] = 0] = "BREATH_ATTACKS";
    savingThrowNames[savingThrowNames["POISON"] = 1] = "POISON";
    savingThrowNames[savingThrowNames["PETRIFY_OR_PARALYZE"] = 2] = "PETRIFY_OR_PARALYZE";
    savingThrowNames[savingThrowNames["WANDS"] = 3] = "WANDS";
    savingThrowNames[savingThrowNames["SPELLS"] = 4] = "SPELLS";
})(savingThrowNames || (savingThrowNames = {}));
var savingThrowGroups;
(function (savingThrowGroups) {
    savingThrowGroups[savingThrowGroups["MONSTERS"] = 0] = "MONSTERS";
    savingThrowGroups[savingThrowGroups["THIEVES"] = 1] = "THIEVES";
    savingThrowGroups[savingThrowGroups["MAGIC"] = 2] = "MAGIC";
    savingThrowGroups[savingThrowGroups["FIGHTERS"] = 3] = "FIGHTERS";
    savingThrowGroups[savingThrowGroups["RELIGIOUS"] = 4] = "RELIGIOUS";
})(savingThrowGroups || (savingThrowGroups = {}));
var characterRaceNames;
(function (characterRaceNames) {
    characterRaceNames[characterRaceNames["ELF"] = 0] = "ELF";
    characterRaceNames[characterRaceNames["DWARF"] = 1] = "DWARF";
    characterRaceNames[characterRaceNames["GNOME"] = 2] = "GNOME";
    characterRaceNames[characterRaceNames["HALFLING"] = 3] = "HALFLING";
    characterRaceNames[characterRaceNames["HALF_ELF"] = 4] = "HALF_ELF";
    characterRaceNames[characterRaceNames["HALF_ORC"] = 5] = "HALF_ORC";
    characterRaceNames[characterRaceNames["HUMAN"] = 6] = "HUMAN";
})(characterRaceNames || (characterRaceNames = {}));
var characterClassNames;
(function (characterClassNames) {
    characterClassNames[characterClassNames["ASSASSIN"] = 0] = "ASSASSIN";
    characterClassNames[characterClassNames["THIEF"] = 1] = "THIEF";
    characterClassNames[characterClassNames["DRUID"] = 2] = "DRUID";
    characterClassNames[characterClassNames["CLERIC"] = 3] = "CLERIC";
    characterClassNames[characterClassNames["MONK"] = 4] = "MONK";
    characterClassNames[characterClassNames["FIGHTER"] = 5] = "FIGHTER";
    characterClassNames[characterClassNames["PALADIN"] = 6] = "PALADIN";
    characterClassNames[characterClassNames["RANGER"] = 7] = "RANGER";
    characterClassNames[characterClassNames["MAGIC_USER"] = 8] = "MAGIC_USER";
    characterClassNames[characterClassNames["ILLUSIONIST"] = 9] = "ILLUSIONIST";
})(characterClassNames || (characterClassNames = {}));
var characterRaces = [
    // ELF
    {
        key: characterRaceNames.ELF, name: 'Elf', adjective: 'Elven', plural: 'Elves',
        description: 'Elves have pointed ears, and are thin, fey beings. They are very ' +
            'diverse in appearance, much like humans, and there are said to ' +
            'be different kinds of elves in distant locations. They typically ' +
            'weigh about 120 pounds and are between 5 and 5 ½ feet tall. ' +
            'Though very peaceful people who enjoy good, light food and ' +
            'play, elves are very talented fighters and users of magic.',
        attributeEffects: {
            'STR': { modValue: 0, minValue: 3, maxValue: 18 },
            'DEX': { modValue: 1, minValue: 7, maxValue: 19 },
            'CON': { modValue: 0, minValue: 6, maxValue: 18 },
            'INT': { modValue: 0, minValue: 8, maxValue: 18, required: 9 },
            'WIS': { modValue: 0, minValue: 3, maxValue: 18 },
            'CHA': { modValue: 0, minValue: 3, maxValue: 18 },
        },
        savingThrowMods: {},
        additionalSkills: [
            "Infravision (60')",
            "Keen Eyes (detect hidden doors 1-2 (d6))",
            "unaffected by paralysis (ghouls)"
        ],
        languages: [
            "Comon", "Elvish", "Gnoll", "Hobgoblin", "Orc"
        ]
    },
    // DWARF
    {
        key: characterRaceNames.DWARF, name: 'Dwarf', adjective: 'Dwarven', plural: 'Dwarves',
        description: 'Dwarves have a reputation for having surly attitudes, and are ' +
            'particularly gruff with elves. Dwarves are stout, short, bearded ' +
            'demi-humans who average a height of approximately 4 feet and ' +
            'weigh about 150 pounds. Dwarves value precious metals and ' +
            'stones, and live underground. Perhaps not surprisingly, they ' +
            'have skin, hair and eye colors in earth tones. Due to their short ' +
            'height, dwarves cannot use two-handed weapons or longbows. ' +
            'However, they can use any other weapons or armor allowed by ' +
            'their class.',
        attributeEffects: {
            'STR': { modValue: 0, minValue: 8, maxValue: 18 },
            'DEX': { modValue: 0, minValue: 3, maxValue: 17 },
            'CON': { modValue: 1, minValue: 12, maxValue: 18, required: 9 },
            'INT': { modValue: 0, minValue: 3, maxValue: 18 },
            'WIS': { modValue: 0, minValue: 3, maxValue: 18 },
            'CHA': { modValue: -1, minValue: 3, maxValue: 16 },
        },
        savingThrowMods: {
            breathAttacks: 2,
            poison: 4,
            petrifyOrParalyze: 4,
            wands: 3,
            spells: 4,
        },
        additionalSkills: [
            "Infravision (60')",
            "Underground skillz (detect traps, etc 1-2 (d6))"
        ],
        languages: [
            "Common", "Dwarvish", "Goblin", "Gnome", "Kobold"
        ]
    },
    // GNOME
    {
        key: characterRaceNames.GNOME, name: 'Gnome', adjective: 'Gnomish', plural: 'Gnomes',
        description: 'Gnomes are cousins to dwarves, and share many of their ' +
            'idiosyncrasies. They have a wide range of appearances, and ' +
            'average about 4 feet tall like dwarves; they tend to be much ' +
            'more slender, averaging 100 pounds. Gnomes generally dwell in ' +
            'hills or on mountainsides, dividing their time equally above and ' +
            'below ground. Their habitations often overlap with halflings, and ' +
            'these two races are typically very friendly, if not familial, to each ' +
            'other. Gnomes may not use large and two-handed weapons, but ' +
            'they may use weapon and armor as indicated by class.',
        attributeEffects: {
            'STR': { modValue: 0, minValue: 6, maxValue: 18 },
            'DEX': { modValue: 0, minValue: 3, maxValue: 18, required: 8 },
            'CON': { modValue: 0, minValue: 8, maxValue: 18, required: 9 },
            'INT': { modValue: 0, minValue: 7, maxValue: 18 },
            'WIS': { modValue: 0, minValue: 3, maxValue: 18 },
            'CHA': { modValue: 0, minValue: 8, maxValue: 16 },
        },
        savingThrowMods: {
            breathAttacks: 2,
            poison: 4,
            petrifyOrParalyze: 4,
            wands: 1,
            spells: 2
        },
        additionalSkills: [
            "Infravision (60')",
            "Structural skills (detect unsafe structures, etc 1-2 (d6))",
            "Know depth and direction",
            "Notice slopes"
        ],
        languages: [
            "Common", "Dwarvish", "Goblin", "Gnome", "Kobold", "Halfing", "Orc"
        ]
    },
    // HALFLING
    {
        key: characterRaceNames.HALFLING,
        name: 'Halfing', adjective: 'Halfing', plural: 'Haflings',
        description: 'Halflings are even smaller than dwarves, being about 60 pounds ' +
            'and only attaining a height of around 3 feet. They are as diverse ' +
            'in appearance as humans, but have furry feet and curly hair. ' +
            'Halflings have a gentle nature, and value free time, good food, ' +
            'and good drink. They will engage in playful activities when not ' +
            'on an adventure. They love comfort, and will spend their riches ' +
            'on the most extravagant items. Like dwarves, ' +
            'halflings may not use large and two-handed ' +
            'weapons, but may use any other weapon and armor as ' +
            'indicated by class. ',
        attributeEffects: {
            'STR': { modValue: -1, minValue: 6, maxValue: 17 },
            'DEX': { modValue: +1, minValue: 8, maxValue: 18, required: 9 },
            'CON': { modValue: 0, minValue: 10, maxValue: 19, required: 9 },
            'INT': { modValue: 0, minValue: 6, maxValue: 18 },
            'WIS': { modValue: 0, minValue: 3, maxValue: 17 },
            'CHA': { modValue: 0, minValue: 3, maxValue: 18 },
        },
        savingThrowMods: {
            breathAttacks: 2,
            poison: 4,
            petrifyOrParalyze: 4,
            wands: 3,
            spells: 4
        },
        additionalSkills: [
            "Hide in outdoor cover (90%)",
            "Hide underground (1-2 (d6), when silent and motionless)",
            "Dexterity (+1 to initiative when alone, +1 missile attacks)",
            "Small (AC -2, when attacked by cratures larger than human)"
        ],
        languages: [
            "Common", "Halfling", "Dwarvish", "Goblin", "Gnome", "Kobold", "Orc"
        ]
    },
    // HALF ELF
    {
        key: characterRaceNames.HALF_ELF,
        name: 'Half-Elf', adjective: 'Half-Elf', plural: 'Half-Elves',
        description: 'Halflings are even smaller than dwarves, being about 60 pounds ' +
            'and only attaining a height of around 3 feet. They are as diverse ' +
            'in appearance as humans, but have furry feet and curly hair. ' +
            'Halflings have a gentle nature, and value free time, good food, ' +
            'and good drink. They will engage in playful activities when not ' +
            'on an adventure. They love comfort, and will spend their riches ' +
            'on the most extravagant items. Like dwarves, ' +
            'halflings may not use large and two-handed ' +
            'weapons, but may use any other weapon and armor as ' +
            'indicated by class. ',
        attributeEffects: {
            'STR': { modValue: 0, minValue: 3, maxValue: 18 },
            'DEX': { modValue: 0, minValue: 6, maxValue: 18, },
            'CON': { modValue: 0, minValue: 6, maxValue: 18, },
            'INT': { modValue: 0, minValue: 4, maxValue: 18 },
            'WIS': { modValue: 0, minValue: 3, maxValue: 18 },
            'CHA': { modValue: 0, minValue: 3, maxValue: 18 },
        },
        savingThrowMods: {},
        additionalSkills: [
            "Infravision (60')",
            "Keen Eyes (detect hidden doors 1-2 (d6))",
            "+4 against paralysis (ghouls)"
        ],
        languages: [
            "Common", "Elvish", "Gnoll", "Hobgoblin", "Orc"
        ]
    },
    // HALF-ORC
    {
        key: characterRaceNames.HALF_ORC,
        name: 'Half-Orc', adjective: 'Half-Orc', plural: 'Half-Orcs',
        description: 'Half-orcs result from orc and human matings. Orcs will breed ' +
            'with nearly any humanoid, and are fertile beings. The majority ' +
            'of orcish cross-breeds are nearly indistinguishable from orcs in ' +
            'appearance and behavior. Player character half-orcs are ' +
            'assumed to be within the rare 10% of orc hybrids that can pass ' +
            'as ugly humans. ',
        attributeEffects: {
            'STR': { modValue: +1, minValue: 6, maxValue: 18 },
            'DEX': { modValue: 0, minValue: 3, maxValue: 17, },
            'CON': { modValue: +1, minValue: 13, maxValue: 19, required: 9 },
            'INT': { modValue: 0, minValue: 3, maxValue: 17 },
            'WIS': { modValue: 0, minValue: 3, maxValue: 14 },
            'CHA': { modValue: -2, minValue: 3, maxValue: 12 },
        },
        savingThrowMods: {},
        additionalSkills: [
            "Infravision (60')",
            "Keen Eyes (detect hidden doors 1-2 (d6))"
        ],
        languages: [
            "Common", "Orc"
        ]
    },
    // HUMAN
    {
        key: characterRaceNames.HUMAN,
        name: 'Human', adjective: 'Human', plural: 'Humans',
        description: 'Humans come in a wide range of appearances, and are versatile ' +
            'beings. This very versatility grants them the ability to choose any ' +
            'class, with no level restrictions. Humans are generally the most ' +
            'common race in a fantasy world, and they serve as the baseline ' +
            'from which all of the demi-human races are compared. ',
        attributeEffects: {
            'STR': { modValue: 0, minValue: 3, maxValue: 18 },
            'DEX': { modValue: 0, minValue: 3, maxValue: 18 },
            'CON': { modValue: 0, minValue: 3, maxValue: 18 },
            'INT': { modValue: 0, minValue: 3, maxValue: 18 },
            'WIS': { modValue: 0, minValue: 3, maxValue: 18 },
            'CHA': { modValue: 0, minValue: 3, maxValue: 18 },
        },
        savingThrowMods: {},
        additionalSkills: [],
        languages: [
            "Common", "Human"
        ]
    },
];
var characterClasses = [
    // ASSASSIN
    {
        name: "Assassin", savingThrowGroup: 1, hitDieSides: 6, attackGroup: 1,
        primeRequisites: [].
            attributeRequirements }, { STR: 12, DEX: 12, INT: 12 },
    additionalSkills, [
        "Assassination (50% after surprise and backstab, adjusting by 5% per 1 level difference)",
        "Disguise (95%, -5% for different race, sex or height)",
        "Poison Use",
    ],
    weaponNotes, "All weapons",
    armorNotes, "Shields, but no armor heavier than leather",];
// CLERIC
{
    name: "Cleric", savingThrowGroup;
    4, hitDieSides;
    8, attackGroup;
    1,
        description;
    'Clerics have pledged their lives to serve a deity. To this end, ' +
        'they conduct their lives in a way to further the desires and will of ' +
        'their gods or goddesses. Clerics may use divine energy in the ' +
        'form of spells, which are granted through prayer and worship. ' +
        'The power and number of cleric spells available to a character ' +
        'are determined by level. Clerics are also trained to fight, and ' +
        'they should be thought of not as passive priests but as fighting ' +
        'holy crusaders. If a cleric ever falls from favor, due to violating ' +
        'the beliefs of his god or breaking the rules of his clergy, the god ' +
        'may impose penalties upon the cleric. These penalties are ' +
        'entirely up to the Labyrinth Lord, but may include penalties to ' +
        'attack (-1) or even a reduction in spells available. 		';
    primeRequisites: ["WIS"].
        attributeRequirements;
    { }
    additionalSkills: [
        "Turn Undead",
        "Cleric Spells",
        "No weapons with sharp edges"
    ],
        weaponNotes;
    "No cutting or impaling weapons",
        armorNotes;
    "All armor",
    ;
}
// DRUID
{
    name: "Druid", savingThrowClass;
    4, hitDieSides;
    8, attackGroup;
    1,
        description;
    'Druids are a secretive subclass of clerics. Their ambitions ' +
        'and methods are often not understood, which makes them objects of ' +
        'both fascination and fear. Much like clerics, druids can be seen ' +
        'as "holy warriors,"" but their allegiance is not to a typical god. ' +
        'Rather, they pay homage to nature. The sun, the moon, the ' +
        'earth, the elements, and all things associated with these forces ' +
        'are their gods. As a consequence, druids are not bound by ' +
        'typical concepts of „good‰ or „evil,‰ for nature does not exist to ' +
        'adhere to human moral concepts. Thus, all druids must be ' +
        'neutrally aligned. Druids are dedicated to protecting the balance ' +
        'of nature; sometimes protecting that balance requires acts ' +
        'others might view as "evil" or "good"';
    primeRequisites: ["WIS", "CHA"].
        attributeRequirements;
    {
        WIS: 12, CHA;
        15;
    }
    additionalSkills: [
        "Druid Spells",
        "May use magical items available to Clerics (except spells)",
        "+2 to saving throw against fire or electrical attacks",
        "(3rd level) Identify plants and animals",
        "(3rd level) Determine if food or water is pure, safe, or poisoned",
        "(7th level) Assume animal shapes",
        "(7th level) Immune to sylvan creature charms and charm-like effects",
        "(3rd level) Identify planst and animals",
    ],
        weaponNotes;
    "All weapons other than bows and crossbows",
        armorNotes;
    "No metal armor or shields",
    ;
}
// FIGHTER
{
    name: "Fighter", savingThrowGroup;
    3, hitDieSides;
    10, attackGroup;
    3,
        description;
    'Fighters, as their name implies, are exclusively trained in the arts ' +
        'of combat and war. They are specialists at dealing physical ' +
        'blows. Unlike other classes, fighters are particularly burdened in ' +
        'a group of adventurers because they are tougher and must take ' +
        'the lead to defend others. ';
    primeRequisites: ["STR"].
        attributeRequirements;
    { }
    additionalSkills: [
        "(15th level) one extra attack each round (+1 for each additional 5 levels, max 4)"
    ],
        weaponNotes;
    "All weapons",
        armorNotes;
    "All armor",
    ;
}
// ILLUSIONIST
{
    name: "Illusionist", savingThrowGroup;
    2, hitDieSides;
    4, attackGroup;
    2,
        description;
    'Illusionists are a specialized form of magic-user. They have ' +
        'access to some of the same spells, but also an array of specialist ' +
        'spells designed to confuse the senses and deceive the unwary. ' +
        'Although they share all of the same restrictions that apply to ' +
        'magic-users. Illusionists may use many ' +
        'of the same magic items available to all characters. However, ' +
        'there are some differences compared to magic-users. ';
    primeRequisites: [].
        attributeRequirements;
    {
        INT: 15, DEX;
        16;
    }
    additionalSkills: [
        "Illusionist spells",
        "(15th level) one extra attack each round (+1 for each additional 5 levels, max 4)"
    ],
        weaponNotes;
    "Only small weapons (such as dagger)",
        armorNotes;
    "No armor or shields",
    ;
}
// MAGIC USER
{
    name: "Magic User", savingThrowGroup;
    2, hitDieSides;
    4, attackGroup;
    2,
        description;
    'Sometimes called wizards, warlocks, or witches, magic-users ' +
        'study arcane secrets and cast spells. Magic-users are able to cast ' +
        'a greater number of increasingly more powerful spells as they ' +
        'advance in level. However, they are limited in their choice of ' +
        'weapons, as they are only able to use small weapons such as a ' +
        'dagger. They are unable to use shields or wear any kind of ' +
        'armor. For these reasons, magic-users are weak at low levels, ' +
        'and in an adventuring group they should be protected. ';
    primeRequisites: [].
        attributeRequirements;
    {
        INT: 15, DEX;
        16;
    }
    additionalSkills: [
        "Magic-User spells",
        "(9th level) Able to create spells and magic items"
    ],
        weaponNotes;
    "Only small weapons (such as dagger)",
        armorNotes;
    "No armor or shields",
    ;
}
// MONK
{
    name: "Monk", savingThrowGroup;
    4, hitDieSides;
    4, attackGroup;
    1,
        description;
    'Monks are a subclass of clerics; however, while clerics look ' +
        'outward for wisdom monks seek inner enlightenment. They do ' +
        'not learn or cast spells. Rather, they finely hone themselves to ' +
        'their full potential through training of both mind and body. As a ' +
        'result, they are able to perform feats unattainable by other ' +
        'classes. Monks may be of any alignment; the sphere they ' +
        'adhere to reveals the path they take toward inner perfection, ' +
        'whether it be through law, chaos, or a balance of forces in ' +
        'neutrality. Monks may only have small amounts of money, like paladins. ';
    primeRequisites: [].
        attributeRequirements;
    {
        WIS: 15, DEX;
        15, STR;
        12;
    }
    additionalSkills: [
        "+1 damage (per 2 levels) using any weapon",
        "NO STR or DEX Bonuses",
        "Stun (for 1d6 rounds if fighting bare handed and succeeding by +5)",
        "Dodge missiles (Save against breath attacks)",
        "Dodge magic missiles (Save against spells)",
        "Successful save ALWAYS reduces damage to 0",
        "Pick Locks (+5%)",
        "Find and remove traps (+10%)",
        "Move silently (+10%)",
        "Climb walls",
        "Hide in shadows (+10%)",
        "Hear noise",
        "(4th level) Speak with plants",
        "(4th level) additional attacks",
        "(5th level) Feign death (1d6 * level turns)",
        "(5th level) Fall up to 20' with no damage (if within 1' of wall)",
        "(6th level) Resistance to ESP (works only 10% of the time, -1% for each additional level)",
        "(6th level) Fall up to 30' with no damage (if within 4' of wall)",
        "(7th level) Meditate for 1 turn (heal 1d6+1 hp) once per day",
        "(8th level) Immune to hypnosis and suggestion",
        "(8th level) 50% immune to charm-related effects",
        "(9th level) Unsuccessful save halves damage",
        "(10th level) Immune to geas, quest, and all poison",
        "(13th level) Quivering Palm",
        "(13th level) Fall from any height unhurt (within 8' of wall)",
    ],
        weaponNotes;
    "Any weapon",
        armorNotes;
    "No armor or shields",
    ;
}
// PALADIN
{
    name: "Paladin", savingThrowGroup;
    3, hitDieSides;
    10, attackGroup;
    3,
        description;
    'Paladins are a type of fighter that adheres to a strict moral code. ' +
        'They must always have a lawful alignment and never may ' +
        'commit morally questionable, or evil, acts. Should a paladin ' +
        'knowingly act in a chaotic way, only confession and paying ' +
        'penance to a cleric of 7th level or higher will remove the mark of ' +
        'the sin. However, committing an evil act is unforgivable, and a ' +
        'paladin immediately loses all special class abilities and becomes ' +
        'an ordinary fighter of equal level, with the lowest possible ' +
        'experience points. Paladins may only ' +
        'have (1) magical suit of armor, (1) magical ' +
        'shield, (4) magical weapons (not counting magical arrows or ' +
        'quarrels), and (4) miscellaneous magical items. Paladins may ' +
        'only keep small amounts of money, and pay 10% of all earnings ' +
        'to a church. Any excess items or money found must be donated ' +
        'to the paladin\'s church or another worthy church of similar ' +
        'alignment and moral code. Note that paladins may only ever ' +
        'hire lawful henchman. They will adventure with chaotic ' +
        'characters, but they will cease to do so with characters who ' +
        'commit evil acts. ';
    primeRequisites: ["STR", "WIS"].
        attributeRequirements;
    {
        WIS: 13, INT;
        9, STR;
        12, CHA;
        17;
    }
    additionalSkills: [
        "Lay on Hands 1x/day (Heal 2 hp/leval to a wounded being)",
        "Cure diseases 1x/day (per 5 levels)",
        "Immune to disease",
        "Detect Evil at 60', when concentrating",
        "Radiate 10' Protection forom Evil at all times",
        "+2 on all saving throws",
        "(3rd level) Turn undead (as a cleric 2 levels lower)",
        "(4th level) Summon special war horse once per 10 years",
        "(9th level) Cast clerical spells (but cannot use scrolls)",
    ],
        weaponNotes;
    "Any weapon",
        armorNotes;
    "No armor or shields",
    ;
}
// RANGER
{
    name: "Ranger", savingThrowGroup;
    3, hitDieSides;
    8, attackGroup;
    3,
        description;
    'This sub-class of the fighter is a specialist of wilderness survival, ' +
        'whether that wilderness be above or below ground. They adhere ' +
        'to their own sort of morals, such that they may be lawful, ' +
        'chaotic, or neutral with their larger world views, which may not ' +
        'reflect their disposition to other beings. In this regard, they have ' +
        'some similarity to the druids. Rangers must meet the prime ' +
        'requisite requirements for all of the prime requisite abilities listed ' +
        'above in order to receive a bonus to experience. Due to their ' +
        'vagabond lifestyles, rangers may only own what can be carried ' +
        '(on person and/or on a mount); any other items or treasure ' +
        'must be donated (but not to other PCs). Rangers cannot hire ' +
        'henchman until they reach 8th level. In addition, only three ' +
        'rangers can adventure together at a time, although there is no ' +
        'restriction of numbers of any other class in the adventuring ' +
        'party.';
    primeRequisites: ["STR", "WIS", "INT"].
        attributeRequirements;
    {
        WIS: 12, INT;
        12, CON;
        15;
    }
    additionalSkills: [
        "+1 per level to damage against goblinoids and giants (bugbears, orcs, kobolds, goblins, hobgoblins, ogres, ettins, all giants, and trolls).",
        "Unflappable (surprised only on 1 (d6)",
        "Stealthy (surprise others on 1-3 (d6)",
        "Immune to disease",
        "Wilderness and underground tracking",
        "(8th level) Access to Druid spells",
        "(9th level) Access to Magic-User spells",
        "(10th level) Use any magic item (excpet scrolls) for clairvoyance, clairaudience, ESP, or telepathy"
    ],
        weaponNotes;
    "Any weapon",
        armorNotes;
    "Any armor",
    ;
}
// THIEF
{
    name: "Thief", savingThrowGroup;
    1, hitDieSides;
    6, attackGroup;
    1,
        description;
    'Thieves have a range of unique skills associated with their ' +
        'profession that make them very handy companions in ' +
        'adventures. However, thieves can be a bit shady and they ' +
        'sometimes are not as trustworthy as other classes. A thief will ' +
        'usually belong to a Guild from the character\'s local ' +
        'town, where he can seek shelter and information between ' +
        'adventures. At the Labyrinth Lord\'s discretion, a thief may have ' +
        'to forfeit a portion of his earnings to the guild in exchange for ' +
        'protection. ';
    primeRequisites: ["DEX"].
        attributeRequirements;
    { }
    additionalSkills: [
        "Backstab",
        "Pick Pockets",
        "Find and Remove traps",
        "Pick Locks",
        "Move silently",
        "Climb walls",
        "Hide in Shadows",
        "Hear noise",
        "(4th level) Read any non-magical language (80%)",
        "(10th level) Read and cast magic from Magic user scrolls (90%)"
    ],
        weaponNotes;
    "All weapons",
        armorNotes;
    "No armor heavier than leather; no shields",
    ;
}
// {
//		AttackGroupId: [
//		array of armor classes which will be hit by roll of 19,
//			index corresponds to level (or hit dice in the case of mosters)
// 	]
// }
// calculation to hit: lookupAC - targetAC + 19 (below 2 is 2, above 20 is 20)
// e.g. level 2 fighter vs ac4:
//		lookupAC = 0
// 		targetAC = 4
//		0 - 4 + 19 = 15 to hit
var attackTables = (_a = {
        // Monsters
        savingThrowGroups: .MONSTERS
    },
    _a[0, 0, -1, -2, -3, -4, -5, -6, -7, -7, -8, -8, -9, -9, -10, -10, -11, -11, -12, -12, -13, -13, -14] = 
    // Thieves/Assassins/Druids/Clerics/Monks
    savingThrowGroups.THIEVES,
    _a[null, 0, 0, 0, -1, -1, -2, -2, -2, -3, -3, -4, -5, -6, -6, -7, -7, -8, -8, -9, -9, -10] = ,
    // Thieves/Assassins/Druids/Clerics/Monks
    _a.savingThrowGroups = .RELIGIOUS,
    _a[null, 0, 0, 0, -1, -1, -2, -2, -2, -3, -3, -4, -5, -6, -6, -7, -7, -8, -8, -9, -9, -10] = ,
    // Magic-Users/Illusionists
    _a.savingThrowGroups = .MAGIC,
    _a[null, 0, 0, 0, -1, -1, -1, -1, -2, -2, -2, -3, -3, -4, -5, -5, -6, -6, -6, -7, -7, -8, -8, -8, -9, ] = ,
    // Fighters
    _a.savingThrowGroups = .FIGHTERS,
    _a[1, 0, 0, -1, -2, -3, -4, -5, -5, -6, -7, -7, -8, -9, -10, -11, -12, -13, -14, -15] = ,
    _a
);
// {
//		savingThrowGroupId: {
//			BA:
//			}
//}
var savingThrowTables = {
    // Thieves/Assassins
    savingThrowGroups: .THIEVES }, _b = void 0, savingThrowNames = _b.savingThrowNames, _c = _b.BREATH_ATTACKS, _d = _c === void 0 ? null : _c,  = _b[16],  = _b[16],  = _b[16],  = _b[16],  = _b[14],  = _b[14],  = _b[14],  = _b[14],  = _b[12],  = _b[12],  = _b[12],  = _b[12],  = _b[10],  = _b[10],  = _b[10],  = _b[10],  = _b[8],  = _b[8],  = _b[8],  = _b[8], savingThrowNames = _b.savingThrowNames, _e = _b.POISON, _f = _e === void 0 ? null : _e,  = _b[14],  = _b[14],  = _b[14],  = _b[14],  = _b[12],  = _b[12],  = _b[12],  = _b[12],  = _b[10],  = _b[10],  = _b[10],  = _b[10],  = _b[8],  = _b[8],  = _b[8],  = _b[8],  = _b[6],  = _b[6],  = _b[6],  = _b[6], _g = _b.petrifyOrParalyze, petrifyOrParalyze = _g === void 0 ? [null, 13, 13, 13, 13, 11, 11, 11, 11, 9, 9, 9, 9, 7, 7, 7, 7, 5, 5, 5, 5] : _g, savingThrowNames = _b.savingThrowNames, _h = _b.WANDS, _j = _h === void 0 ? null : _h,  = _b[15],  = _b[15],  = _b[15],  = _b[15],  = _b[13],  = _b[13],  = _b[13],  = _b[13],  = _b[11],  = _b[11],  = _b[11],  = _b[11],  = _b[9],  = _b[9],  = _b[9],  = _b[9],  = _b[7],  = _b[7],  = _b[7],  = _b[7], savingThrowNames = _b.savingThrowNames, _k = _b.SPELLS, _l = _k === void 0 ? null : _k,  = _b[14],  = _b[14],  = _b[14],  = _b[14],  = _b[12],  = _b[12],  = _b[12],  = _b[12],  = _b[10],  = _b[10],  = _b[10],  = _b[10],  = _b[8],  = _b[8],  = _b[8],  = _b[8],  = _b[6],  = _b[6],  = _b[6],  = _b[6], 
//Magic-Users/Illusionists
savingThrowGroups, MAGIC;
savingThrowNames.BREATH_ATTACKS;
[null, 16, 16, 16, 16, 16, 14, 14, 14, 14, 14, 12, 12, 12, 12, 12, 8, 8, 8, 7],
    savingThrowNames.POISON;
[null, 13, 13, 13, 13, 13, 11, 11, 11, 11, 11, 9, 9, 9, 9, 9, 7, 7, 7, 6],
    petrifyOrParalyze[null, 13, 13, 13, 13, 13, 11, 11, 11, 11, 11, 9, 9, 9, 9, 9, 6, 6, 6, ],
    savingThrowNames.WANDS;
[null, 13, 13, 13, 13, 13, 11, 11, 11, 11, 11, 9, 9, 9, 9, 9, 5, 5, 5, 4],
    savingThrowNames.SPELLS;
[null, 14, 14, 14, 14, 14, 12, 12, 12, 12, 12, 8, 8, 8, 8, 8, 6, 6, 6, 4],
;
// Fighters/Paladins/Rangers
savingThrowGroups.FIGHTERS;
{
    savingThrowNames.BREATH_ATTACKS;
    [17, 15, 15, 15, 13, 13, 13, 9, 9, 9, 7, 7, 7, 5, 5, 5, 4],
        savingThrowNames.POISON;
    [14, 12, 12, 12, 10, 10, 10, 8, 8, 8, 6, 6, 6, 4, 4, 4, 4, 4, 4, 3],
        petrifyOrParalyze[16, 14, 14, 14, 12, 12, 12, 10, 10, 10, 8, 8, 8, 6, 6, 6, 5, 5, 5, 4],
        savingThrowNames.WANDS;
    [15, 13, 13, 13, 11, 11, 11, 9, 9, 9, 7, 7, 7, 5, 5, 5, 4, 4, 4, 3],
        savingThrowNames.SPELLS;
    [18, 16, 16, 16, 14, 14, 14, 12, 12, 12, 10, 10, 10, 8, 8, 8, 7, 7, 7, 6],
    ;
}
// Clerics/Druids/Monks
savingThrowGroups.RELIGIOUS;
{
    savingThrowNames.BREATH_ATTACKS;
    [null, 16, 16, 16, 16, 14, 14, 14, 14, 12, 12, 12, 12, 8, 8, 8, 8, 6],
        savingThrowNames.POISON;
    [null, 11, 11, 11, 11, 9, 9, 9, 9, 7, 7, 7, 7, 3, 3, 3, 3, 2],
        petrifyOrParalyze[null, 14, 14, 14, 14, 12, 12, 12, 12, 10, 10, 10, 10, 8, 8, 8, 8, 6],
        savingThrowNames.WANDS;
    [null, 12, 12, 12, 12, 10, 10, 10, 10, 8, 8, 8, 8, 4],
        savingThrowNames.SPELLS;
    [null, 15, 15, 15, 15, 12, 12, 12, 12, 9, 9, 9, 9, 6, 6, 6, 6, 5],
    ;
}
var _a;
//# sourceMappingURL=info.js.map