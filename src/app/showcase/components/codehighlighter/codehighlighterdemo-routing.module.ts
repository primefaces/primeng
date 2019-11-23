import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {CodeHighlighterDemo} from './codehighlighterdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: CodeHighlighterDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class CodeHighlighterDemoRoutingModule {}
