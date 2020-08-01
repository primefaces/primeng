import {NgModule} from '@angular/core';
import { RouterModule } from '@angular/router'
import { FloatLabelDemo } from './floatlabeldemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: FloatLabelDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class FloatLabelDemoRoutingModule {}
