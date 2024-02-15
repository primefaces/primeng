import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TooltipDocModule } from '../../doc/tooltip/tooltipdoc.module';
import { TooltipDemo } from './tooltipdemo';
import { TooltipDemoRoutingModule } from './tooltipdemo-routing.module';

@NgModule({
    imports: [CommonModule, TooltipDemoRoutingModule, TooltipDocModule],
    declarations: [TooltipDemo]
})
export class TooltipDemoModule {}
