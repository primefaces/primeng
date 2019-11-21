import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenubarDemo} from './menubardemo';
import {MenubarDemoRoutingModule} from './menubardemo-routing.module';
import {MenubarModule} from '../../../components/menubar/menubar';
import {InputTextModule} from '../../../components/inputtext/inputtext';
import {ButtonModule} from '../../../components/button/button';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

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
