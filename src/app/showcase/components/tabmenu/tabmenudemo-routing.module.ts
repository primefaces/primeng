import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {TabMenuDemo} from './tabmenudemo';
import { TabMenuDemoCalendar, TabMenuDemoDocumentation, TabMenuDemoEdit, TabMenuDemoHome, TabMenuDemoSettings } from './tabmenudemo-children.component';

@NgModule({
	imports: [
		RouterModule.forChild([
      {path: '', component: TabMenuDemo, children: [
        {path:'', redirectTo: 'home', pathMatch: 'full' },
        {path:'home', component: TabMenuDemoHome},
        {path:'calendar', component: TabMenuDemoCalendar},
        {path:'edit', component: TabMenuDemoEdit},
        {path:'documentation', component: TabMenuDemoDocumentation},
        {path:'settings', component: TabMenuDemoSettings}
      ]}
		])
	],
	exports: [
		RouterModule
	]
})
export class TabMenuDemoRoutingModule {}
