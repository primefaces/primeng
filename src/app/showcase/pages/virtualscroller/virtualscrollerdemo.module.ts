import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VirtualScrollerDocModule } from '../../doc/virtualscroller/virtualscrollerdoc.module';
import { VirtualScrollerDemo } from './virtualscrollerdemo';
import { VirtualScrollerDemoRoutingModule } from './virtualscrollerdemo-routing.module';

@NgModule({
    imports: [CommonModule, VirtualScrollerDemoRoutingModule, VirtualScrollerDocModule],
    declarations: [VirtualScrollerDemo]
})
export class VirtualScrollerDemoModule {}
