import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule}    from '@angular/forms';
import {SidebarDemo} from './sidebardemo';
import {SidebarDemoRoutingModule} from './sidebardemo-routing.module';
import {SidebarModule} from '../../../components/sidebar/sidebar';
import {ButtonModule} from '../../../components/button/button';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		SidebarDemoRoutingModule,
        FormsModule,
        SidebarModule,
        ButtonModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		SidebarDemo
	]
})
export class SidebarDemoModule {}
