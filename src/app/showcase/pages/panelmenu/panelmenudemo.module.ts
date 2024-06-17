import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PanelMenuDocModule } from '@doc/panelmenu/panelmenudoc.module';
import { PanelMenuDemo } from './panelmenudemo';
import { PanelMenuDemoRoutingModule } from './panelmenudemo-routing.module';

@NgModule({
    imports: [CommonModule, PanelMenuDemoRoutingModule, PanelMenuDocModule],
    declarations: [PanelMenuDemo]
})
export class PanelMenuDemoModule {}
