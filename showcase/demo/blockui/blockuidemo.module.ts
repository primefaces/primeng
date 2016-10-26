import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlockUIDemo} from './blockuidemo';
import {BlockUIDemoRoutingModule} from './blockuidemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		BlockUIDemoRoutingModule
	],
	declarations: [
		BlockUIDemo
	]
})
export class BlockUIDemoModule {}
