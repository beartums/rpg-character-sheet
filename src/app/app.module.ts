import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent }  from './app.component';
import { CharacterCreationComponent }  from './character-creation.component';
import { SavingThrowChartComponent }  from './saving-throw-chart.component';
import { RaceInfoComponent }  from './race-info.component';
import { ClassInfoComponent }  from './class-info.component';
import { SelectByLabelComponent }  from './shared/select-by-label.component';
import {Ng2DragDropModule} from "ng2-drag-drop";

import { ModifierPipe } from './shared/modifier.pipe';
import { CaseConvertPipe } from './shared/case-convert.pipe';
import { ObjectAsValuesPipe } from './shared/object-as-values.pipe';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports:      [ BrowserModule, FormsModule, NgbModule.forRoot(), Ng2DragDropModule ],
  declarations: [ AppComponent, CharacterCreationComponent, SavingThrowChartComponent, SelectByLabelComponent, RaceInfoComponent, ClassInfoComponent, ModifierPipe, CaseConvertPipe, ObjectAsValuesPipe ],
  bootstrap:    [ AppComponent ],
	exports: [ CharacterCreationComponent ],
})
export class AppModule { }
