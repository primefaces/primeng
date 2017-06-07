import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {ColorPickerDemo} from './colorpickerdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: ColorPickerDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class ColorPickerDemoRoutingModule {}
