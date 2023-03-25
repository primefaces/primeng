import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollPanelDocModule } from '../../doc/scrollpanel/scrollpaneldoc.module';
import { ScrollPanelDemo } from './scrollpaneldemo';
import { ScrollPanelDemoRoutingModule } from './scrollpaneldemo-routing.module';

@NgModule({
    imports: [CommonModule, ScrollPanelDemoRoutingModule, ScrollPanelDocModule],
    declarations: [ScrollPanelDemo]
})
export class ScrollPanelDemoModule {}
