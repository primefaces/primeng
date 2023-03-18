import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollerDocModule } from '../../doc/scroller/scrollerdoc.module';
import { ScrollerDemo } from './scrollerdemo';
import { ScrollerDemoRoutingModule } from './scrollerdemo-routing.module';

@NgModule({
    imports: [CommonModule, ScrollerDocModule, ScrollerDemoRoutingModule],
    declarations: [ScrollerDemo]
})
export class ScrollerDemoModule {}
