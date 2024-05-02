import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TristatecheckboxDocModule } from '@doc/tristatecheckbox/tristatecheckboxdoc.module';
import { TriStateCheckboxDemo } from './tristatecheckboxdemo';
import { TriStateCheckboxDemoRoutingModule } from './tristatecheckboxdemo-routing.module';

@NgModule({
    imports: [CommonModule, TriStateCheckboxDemoRoutingModule, TristatecheckboxDocModule],
    declarations: [TriStateCheckboxDemo]
})
export class TriStateCheckboxDemoModule {}
