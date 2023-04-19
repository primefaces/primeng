import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressSpinnerDocModule } from '../../doc/progressspinner/progressspinnerdoc.module';
import { ProgressSpinnerDemo } from './progressspinnerdemo';
import { ProgressSpinnerDemoRoutingModule } from './progressspinnerdemo-routing.module';

@NgModule({
    imports: [CommonModule, ProgressSpinnerDemoRoutingModule, ProgressSpinnerDocModule],
    declarations: [ProgressSpinnerDemo]
})
export class ProgressSpinnerDemoModule {}
