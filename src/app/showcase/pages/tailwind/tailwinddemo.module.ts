import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TailwindDemo } from './tailwinddemo';
import { TailwindDemoRoutingModule } from './tailwinddemo-routing.module';
import { TailwindDocModule } from '@doc/tailwind/tailwinddoc.module';

@NgModule({
    imports: [CommonModule, TailwindDemoRoutingModule, TailwindDocModule],
    declarations: [TailwindDemo],
})
export class TailwindDemoModule {}
