import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PopoverDocModule } from '@doc/popover/popoverdoc.module';
import { PopoverDemo } from './popoverdemo';
import { PopoverDemoRoutingModule } from './popoverdemo-routing.module';

@NgModule({
    imports: [CommonModule, PopoverDemoRoutingModule, PopoverDocModule],
    declarations: [PopoverDemo],
})
export class PopoverDemoModule {}
