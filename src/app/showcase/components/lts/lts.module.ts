import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LTSComponent} from './lts.component';
import {LTSRoutingModule} from './lts-routing.module';
import {CodeHighlighterModule} from 'primeng/codehighlighter';
import {AccordionModule} from 'primeng/accordion';
import { AppCodeModule } from '../../app.code.component';

@NgModule({
  imports: [
    CommonModule,
    LTSRoutingModule,
    CodeHighlighterModule,
    AccordionModule,
    AppCodeModule,
  ],
  declarations: [
    LTSComponent
  ]
})
export class LTSModule {}