import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SliderDocModule } from '@doc/slider/sliderdoc.module';
import { SliderDemo } from './sliderdemo';
import { SliderDemoRoutingModule } from './sliderdemo-routing.module';

@NgModule({
    imports: [CommonModule, SliderDemoRoutingModule, SliderDocModule],
    declarations: [SliderDemo]
})
export class SliderDemoModule {}
