import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FocusTrapDocModule } from '../../doc/focustrap/focustrapdoc.module';
import { FloatLabelDemo } from './floatlabeldemo';
import { FloatLabelDemoRoutingModule } from './floatlabeldemo-routing.module';

@NgModule({
    imports: [CommonModule, FloatLabelDemoRoutingModule, FormsModule, FocusTrapDocModule],
    declarations: [FloatLabelDemo]
})
export class FloatLabelDemoModule {}
