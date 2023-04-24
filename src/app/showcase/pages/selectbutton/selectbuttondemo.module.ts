import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SelectButtonDocModule } from '../../doc/selectbutton/selectbuttondoc.module';
import { SelectButtonDemo } from './selectbuttondemo';
import { SelectButtonDemoRoutingModule } from './selectbuttondemo-routing.module';

@NgModule({
    imports: [CommonModule, SelectButtonDemoRoutingModule, SelectButtonDocModule],
    declarations: [SelectButtonDemo]
})
export class SelectButtonDemoModule {}
