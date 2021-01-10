import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ListboxDemo} from './listboxdemo';
import {ListboxDemoRoutingModule} from './listboxdemo-routing.module';
import {AppInputStyleSwitchModule} from '../../app.inputstyleswitch.component';
import {AppCodeModule} from '../../app.code.component';
import {ListboxModule} from 'primeng/listbox';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';

@NgModule({
	imports: [
		CommonModule,
        FormsModule,
		ListboxDemoRoutingModule,
        ListboxModule,
        ButtonModule,
		TabViewModule,
		AppInputStyleSwitchModule,
		AppCodeModule
	],
	declarations: [
		ListboxDemo
	]
})
export class ListboxDemoModule {}
