import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccordionDocModule } from '../../doc/accordion/accordiondoc.module';
import { AccordionDemo } from './accordiondemo';
import { AccordionDemoRoutingModule } from './accordiondemo-routing.module';

@NgModule({
    imports: [CommonModule, AccordionDemoRoutingModule, AccordionDocModule],
    declarations: [AccordionDemo]
})
export class AccordionDemoModule {}
