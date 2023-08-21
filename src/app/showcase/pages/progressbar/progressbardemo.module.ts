import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressBarDocModule } from '../../doc/progressbar/progressbardoc.module';
import { ProgressBarDemo } from './progressbardemo';
import { ProgressBarDemoRoutingModule } from './progressbardemo-routing.module';

@NgModule({
    imports: [CommonModule, ProgressBarDemoRoutingModule, ProgressBarDocModule],
    declarations: [ProgressBarDemo]
})
export class ProgressBarDemoModule {}
