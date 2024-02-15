import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DockDocModule } from '../../doc/dock/dockdoc.module';
import { DockDemo } from './dockdemo';
import { DockDemoRoutingModule } from './dockdemo-routing.module';

@NgModule({
    imports: [CommonModule, DockDemoRoutingModule, DockDocModule],
    declarations: [DockDemo]
})
export class DockDemoModule {}
