import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SetupComponent} from './setup.component';
import {SetupRoutingModule} from './setup-routing.module';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

@NgModule({
  imports: [
    CommonModule,
    CodeHighlighterModule,
    SetupRoutingModule
  ],
  declarations: [
    SetupComponent
  ]
})
export class SetupModule {}