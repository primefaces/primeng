import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SplitterDocModule } from '@doc/splitter/splitterdoc.module';
import { SplitterDemo } from './splitterdemo';
import { SplitterDemoRoutingModule } from './splitterdemo-routing.module';

@NgModule({
    imports: [CommonModule, SplitterDemoRoutingModule, SplitterDocModule],
    declarations: [SplitterDemo]
})
export class SplitterDemoModule {}
