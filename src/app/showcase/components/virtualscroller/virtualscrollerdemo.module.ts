import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {VirtualScrollerDemo} from './virtualscrollerdemo';
import {VirtualScrollerDemoRoutingModule} from './virtualscrollerdemo-routing.module';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

@NgModule({
	imports: [
        CommonModule,
        FormsModule,
		VirtualScrollerDemoRoutingModule,
        VirtualScrollerModule,
        ButtonModule,
        InputTextModule,
        DropdownModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		VirtualScrollerDemo
	]
})
export class VirtualScrollerDemoModule {}
