import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenubarDemo} from './menubardemo';
import {MenubarDemoRoutingModule} from './menubardemo-routing.module';
import {MenubarModule} from 'primeng/menubar';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		MenubarDemoRoutingModule,
        MenubarModule,
        InputTextModule,
        ButtonModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		MenubarDemo
	]
})
export class MenubarDemoModule {}
