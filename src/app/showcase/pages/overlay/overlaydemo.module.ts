import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OverlayDocModule } from '../../doc/overlay/overlaydoc.module';
import { OverlayDemo } from './overlaydemo';
import { OverlayDemoRoutingModule } from './overlaydemo-routing.module';

@NgModule({
    imports: [CommonModule, OverlayDemoRoutingModule, OverlayDocModule],
    declarations: [OverlayDemo]
})
export class OverlayDemoModule {}
