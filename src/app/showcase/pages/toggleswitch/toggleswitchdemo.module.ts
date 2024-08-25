import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputSwitchDocModule } from '@doc/toggleswitch/inputswitchdoc.module';
import { ToggleSwitchDemo } from './toggleswitchdemo';
import { ToggleSwitchDemoRoutingModule } from './toggleswitchdemo-routing.module';

@NgModule({
    imports: [CommonModule, ToggleSwitchDemoRoutingModule, InputSwitchDocModule],
    declarations: [ToggleSwitchDemo]
})
export class ToggleSwitchDemoModule {}
