import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { KnobDocModule } from '../../doc/knob/knobdoc.module';
import { KnobDemo } from './knobdemo';
import { KnobDemoRoutingModule } from './knobdemo-routing.module';

@NgModule({
    imports: [CommonModule, KnobDemoRoutingModule, KnobDocModule],
    declarations: [KnobDemo]
})
export class KnobDemoModule {}
