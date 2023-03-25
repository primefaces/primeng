import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RadioButtonDocModule } from '../../doc/radiobutton/radiobuttondoc.module';
import { RadioButtonDemo } from './radiobuttondemo';
import { RadioButtonDemoRoutingModule } from './radiobuttondemo-routing.module';

@NgModule({
    imports: [CommonModule, RadioButtonDemoRoutingModule, RadioButtonDocModule],
    declarations: [RadioButtonDemo]
})
export class RadioButtonDemoModule {}
