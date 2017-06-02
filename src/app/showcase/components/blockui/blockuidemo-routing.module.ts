import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {BlockUIDemo} from './blockuidemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: BlockUIDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class BlockUIDemoRoutingModule {}
