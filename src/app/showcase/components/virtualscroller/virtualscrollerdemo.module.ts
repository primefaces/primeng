import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {VirtualScrollerDemo} from './virtualscrollerdemo';
import {VirtualScrollerDemoRoutingModule} from './virtualscrollerdemo-routing.module';
import {VirtualScrollerModule} from '../../../components/virtualscroller/virtualscroller';
import {ButtonModule} from '../../../components/button/button';
import {ToastModule} from '../../../components/toast/toast';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		VirtualScrollerDemoRoutingModule,
        VirtualScrollerModule,
        ButtonModule,
        ToastModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		VirtualScrollerDemo
	]
})
export class VirtualScrollerDemoModule {}
