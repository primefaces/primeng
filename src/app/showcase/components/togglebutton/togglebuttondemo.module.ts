import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule}  from '@angular/forms';
import {ToggleButtonDemo} from './togglebuttondemo';
import {ToggleButtonDemoRoutingModule} from './togglebuttondemo-routing.module';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {TabViewModule} from 'primeng/tabview';
import {AppCodeModule} from '../../app.code.component';

@NgModule({
	imports: [
		CommonModule,
        FormsModule,
		ToggleButtonDemoRoutingModule,
        ToggleButtonModule,
		TabViewModule,
		AppCodeModule
	],
	declarations: [
		ToggleButtonDemo
	]
})
export class ToggleButtonDemoModule {}
