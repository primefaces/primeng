import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule}    from '@angular/forms'
import {ColorPickerDemo} from './colorpickerdemo';
import {ColorPickerDemoRoutingModule} from './colorpickerdemo-routing.module';
import {ColorPickerModule} from '../../../components/colorpicker/colorpicker';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
        FormsModule,
		ColorPickerDemoRoutingModule,
        ColorPickerModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		ColorPickerDemo
	]
})
export class ColorPickerDemoModule {}
