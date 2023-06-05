import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OverlayPanelDocModule } from '../../doc/overlaypanel/overlaypaneldoc.module';
import { OverlayPanelDemo } from './overlaypaneldemo';
import { OverlayPanelDemoRoutingModule } from './overlaypaneldemo-routing.module';

@NgModule({
    imports: [CommonModule, OverlayPanelDemoRoutingModule, OverlayPanelDocModule],
    declarations: [OverlayPanelDemo]
})
export class OverlayPanelDemoModule {}
