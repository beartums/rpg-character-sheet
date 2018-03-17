import { Component }              from '@angular/core';
import { FormControl }            from '@angular/forms';
//import { RollService } from './roll.service'
import { Character } from './character.class';
import { ATTRIBUTES, RACES } from './data/constants';
import { Roll } from './shared/roll';
import { CharacterService } from './character.service';
import { DataService } from './data.service';
import { AuthService } from './auth.service';

import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'my-app',
  template: 
		`<div class="container">
			<app-auth></app-auth>
			<character-creation *ngIf="authService.user | async"></character-creation>
		</div>`,
	providers: [ DataService, CharacterService ]
})
export class AppComponent  {
	title: string = "app works!";
	item: any;
  
	constructor(public authService: AuthService) {

	}
	
	
}
