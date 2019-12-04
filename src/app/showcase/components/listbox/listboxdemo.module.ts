import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ListboxDemo} from './listboxdemo';
import {ListboxDemoRoutingModule} from './listboxdemo-routing.module';
import {ListboxModule} from 'primeng/listbox';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
        FormsModule,
		ListboxDemoRoutingModule,
        ListboxModule,
        ButtonModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		ListboxDemo
	]
})
export class ListboxDemoModule {}
