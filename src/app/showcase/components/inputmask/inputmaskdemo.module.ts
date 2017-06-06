import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule}    from '@angular/forms';
import {InputMaskDemo} from './inputmaskdemo';
import {InputMaskDemoRoutingModule} from './inputmaskdemo-routing.module';
import {InputMaskModule} from '../../../components/inputmask/inputmask';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

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
