import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DeferDocModule } from '@doc/defer/deferdoc.module';
import { DeferDemo } from './deferdemo';
import { DeferDemoRoutingModule } from './deferdemo-routing.module';

@NgModule({
    imports: [CommonModule, DeferDemoRoutingModule, DeferDocModule],
    declarations: [DeferDemo]
})
export class DeferDemoModule {}
