import { Component }              from '@angular/core';
import { FormControl }            from '@angular/forms';
//import { RollService } from './roll.service'
import { Character } from './character.class';
import { ATTRIBUTES, RACES } from './constants';
import { Roll } from './roll';
import { CharacterService } from './character.service';
import { DataService } from './data.service';

@Component({
	selector: 'my-app',
  template: `<div class="container">
			<character-creation></character-creation>
		</div>`,
	providers: [ DataService, CharacterService ]
})
export class AppComponent  {
	title: string = "app works!";
}
