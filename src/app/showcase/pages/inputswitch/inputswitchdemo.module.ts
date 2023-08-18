import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputSwitchDocModule } from '../../doc/inputswitch/inputswitchdoc.module';
import { InputSwitchDemo } from './inputswitchdemo';
import { InputSwitchDemoRoutingModule } from './inputswitchdemo-routing.module';

@NgModule({
    imports: [CommonModule, InputSwitchDemoRoutingModule, InputSwitchDocModule],
    declarations: [InputSwitchDemo]
})
export class InputSwitchDemoModule {}
