import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FluidDemo } from './fluiddemo';
import { FluidDemoRoutingModule } from './fluiddemo-routing.module';
import { FluidDocModule } from '@doc/fluid/fluiddoc.module';

@NgModule({
    imports: [CommonModule, FluidDemoRoutingModule, FormsModule, FluidDocModule],
    declarations: [FluidDemo]
})
export class FluidDemoModule {}
