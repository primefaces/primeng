import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolbarDemo} from './toolbardemo';
import {ToolbarDemoRoutingModule} from './toolbardemo-routing.module';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {SplitButtonModule} from 'primeng/splitbutton';
import {TabViewModule} from 'primeng/tabview';
import {AppCodeModule} from '../../app.code.component';

@NgModule({
	imports: [
		CommonModule,
		ToolbarDemoRoutingModule,
        ToolbarModule,
        ButtonModule,
        SplitButtonModule,
		TabViewModule,
		AppCodeModule
	],
	declarations: [
		ToolbarDemo
	]
})
export class ToolbarDemoModule {}
