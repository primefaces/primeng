import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SplitButtonDocModule } from '../../doc/splitbutton/splitbuttondoc.module';
import { SplitButtonDemo } from './splitbuttondemo';
import { SplitButtonDemoRoutingModule } from './splitbuttondemo-routing.module';

@NgModule({
    imports: [CommonModule, SplitButtonDemoRoutingModule, SplitButtonDocModule],
    declarations: [SplitButtonDemo]
})
export class SplitButtonDemoModule {}
