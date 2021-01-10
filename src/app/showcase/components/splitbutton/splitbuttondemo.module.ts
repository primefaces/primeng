import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SplitButtonDemo} from './splitbuttondemo';
import {SplitButtonDemoRoutingModule} from './splitbuttondemo-routing.module';
import {SplitButtonModule} from 'primeng/splitbutton';
import {ToastModule} from 'primeng/toast';
import {TabViewModule} from 'primeng/tabview';
import { AppCodeModule } from '../../app.code.component';

@NgModule({
	imports: [
		CommonModule,
		SplitButtonDemoRoutingModule,
        SplitButtonModule,
        ToastModule,
		TabViewModule,
		AppCodeModule
	],
	declarations: [
		SplitButtonDemo
	]
})
export class SplitButtonDemoModule {}
