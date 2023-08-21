import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputMaskDocModule } from '../../doc/inputmask/inputmaskdoc.module';
import { InputMaskDemo } from './inputmaskdemo';
import { InputMaskDemoRoutingModule } from './inputmaskdemo-routing.module';

@NgModule({
    imports: [CommonModule, InputMaskDemoRoutingModule, InputMaskDocModule],
    declarations: [InputMaskDemo]
})
export class InputMaskDemoModule {}
