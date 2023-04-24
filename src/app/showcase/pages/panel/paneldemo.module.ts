import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PanelDocModule } from '../../doc/panel/paneldoc.module';
import { PanelDemo } from './paneldemo';
import { PanelDemoRoutingModule } from './paneldemo-routing.module';

@NgModule({
    imports: [CommonModule, PanelDemoRoutingModule, PanelDocModule],
    declarations: [PanelDemo]
})
export class PanelDemoModule {}
