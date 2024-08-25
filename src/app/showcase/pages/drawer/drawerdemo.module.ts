import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DrawerDocModule } from '@doc/drawer/drawerdoc.module';
import { DrawerDemo } from './drawerdemo';
import { DrawerDemoRoutingModule } from './drawerdemo-routing.module';

@NgModule({
    imports: [CommonModule, DrawerDemoRoutingModule,DrawerDocModule],
    declarations: [DrawerDemo]
})
export class DrawerDemoModule {}
