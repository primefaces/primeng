import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {InputMaskDemo} from './inputmaskdemo';
import {InputMaskDemoRoutingModule} from './inputmaskdemo-routing.module';
import {InputMaskModule} from 'primeng/inputmask';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
        FormsModule,
		InputMaskDemoRoutingModule,
        InputMaskModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		InputMaskDemo
	]
})
export class InputMaskDemoModule {}
