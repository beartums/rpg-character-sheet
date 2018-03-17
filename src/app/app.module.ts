import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
//import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';

import { AuthService } from './auth.service';
import { DataService } from './data.service';

import { AppComponent }  from './app.component';
import { CharacterCreationComponent }  from './character-creation.component';
import { SavingThrowChartComponent }  from './saving-throw-chart.component';
import { RaceInfoComponent }  from './race-info.component';
import { ClassInfoComponent }  from './class-info.component';
import { SelectByLabelComponent }  from './shared/select-by-label.component';

import { ModifierPipe } from './shared/modifier.pipe';
import { CaseConvertPipe } from './shared/case-convert.pipe';
import { ObjectAsValuesPipe } from './shared/object-as-values.pipe';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthComponent } from './auth/auth.component';
import { EquipmentComponent } from './equipment/equipment.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, NgbModule.forRoot(),
									AngularFireModule.initializeApp(environment.firebase),
									AngularFireAuthModule, AngularFireDatabaseModule ],
  declarations: [ AppComponent, 
									CharacterCreationComponent, 
									SavingThrowChartComponent, 
									SelectByLabelComponent, 
									RaceInfoComponent, 
									ClassInfoComponent, 
									ModifierPipe, 
									CaseConvertPipe, 
									ObjectAsValuesPipe, 
									AuthComponent, 
									EquipmentComponent ],
  bootstrap:    [ AppComponent ],
	providers: [ AuthService, DataService, CaseConvertPipe ],
	exports: [ CharacterCreationComponent ],
})
export class AppModule { }
