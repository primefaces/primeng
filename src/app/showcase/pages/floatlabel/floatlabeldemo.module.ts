import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelDemo } from './floatlabeldemo';
import { FloatLabelDemoRoutingModule } from './floatlabeldemo-routing.module';
import { FloatLabelDocModule } from '@doc/floatlabel/floatlabeldoc.module';

@NgModule({
    imports: [CommonModule, FloatLabelDemoRoutingModule, FormsModule, FloatLabelDocModule],
    declarations: [FloatLabelDemo]
})
export class FloatLabelDemoModule {}
