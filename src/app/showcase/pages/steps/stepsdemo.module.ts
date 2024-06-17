import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StepsDocModule } from '@doc/steps/stepsdoc.module';
import { StepsDemo } from './stepsdemo';
import { StepsDemoRoutingModule } from './stepsdemo-routing.module';

@NgModule({
    imports: [CommonModule, StepsDemoRoutingModule, StepsDocModule],
    declarations: [StepsDemo]
})
export class StepsDemoModule {}
