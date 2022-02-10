import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { AppCodeModule } from '../../app.code.component';
import { AppDemoActionsModule } from '../../app.demoactions.component';
import { DockDemo } from './dockdemo';
import { DockDemoRoutingModule } from './dockdemo-routing.module';
import { DockModule } from 'primeng/dock';
import { MenubarModule } from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { GalleriaModule } from 'primeng/galleria';
import { TerminalModule } from 'primeng/terminal';
import { TreeModule } from 'primeng/tree';

@NgModule({
	imports: [
		CommonModule,
		DockDemoRoutingModule,
		CardModule,
        DockModule,
		TabViewModule,
		AppCodeModule,
        MenubarModule,
        DialogModule,
        TerminalModule,
        TreeModule,
        ToastModule,
        GalleriaModule,
		AppDemoActionsModule
	],
	declarations: [
		DockDemo
	]
})
export class DockDemoModule {}
