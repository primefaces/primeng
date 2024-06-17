import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToggleButtonDocModule } from '@doc/togglebutton/togglebuttondoc.module';
import { ToggleButtonDemo } from './togglebuttondemo';
import { ToggleButtonDemoRoutingModule } from './togglebuttondemo-routing.module';

@NgModule({
    imports: [CommonModule, ToggleButtonDemoRoutingModule, ToggleButtonDocModule],
    declarations: [ToggleButtonDemo]
})
export class ToggleButtonDemoModule {}
