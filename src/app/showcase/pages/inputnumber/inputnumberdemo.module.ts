import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputNumberDocModule } from '@doc/inputnumber/inputnumberdoc.module';
import { InputNumberDemo } from './inputnumberdemo';
import { InputNumberDemoRoutingModule } from './inputnumberdemo-routing.module';

@NgModule({
    imports: [CommonModule, InputNumberDemoRoutingModule, InputNumberDocModule],
    declarations: [InputNumberDemo]
})
export class InputNumberDemoModule {}
