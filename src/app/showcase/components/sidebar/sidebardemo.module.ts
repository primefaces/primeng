import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SidebarDemo} from './sidebardemo';
import {SidebarDemoRoutingModule} from './sidebardemo-routing.module';
import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {AppCodeModule} from '../../app.code.component';

@NgModule({
	imports: [
		CommonModule,
		SidebarDemoRoutingModule,
        FormsModule,
        SidebarModule,
        ButtonModule,
		TabViewModule,
		AppCodeModule
	],
	declarations: [
		SidebarDemo
	]
})
export class SidebarDemoModule {}
