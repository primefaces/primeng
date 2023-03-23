import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputGroupDocModule } from '../../doc/inputgroup/inputgroupddoc.module';
import { InputGroupDemo } from './inputgroupdemo';
import { InputGroupDemoRoutingModule } from './inputgroupdemo-routing.module';

@NgModule({
    imports: [CommonModule, InputGroupDemoRoutingModule, InputGroupDocModule],
    declarations: [InputGroupDemo]
})
export class InputGroupDemoModule {}
