import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {TabMenuDemo, InfoComponent, MessageComponent} from './tabmenudemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: TabMenuDemo, children:[
				{path:'', redirectTo:'info', pathMatch:'full'},
				{path:'info',component: InfoComponent},
				{path:'message',component: MessageComponent}
			]},
		])
	],
	exports: [
		RouterModule
	]
})
export class TabMenuDemoRoutingModule {}
