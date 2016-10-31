import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {TerminalDemo} from './terminaldemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: TerminalDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class TerminalDemoRoutingModule {}
