import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ColorPickerDocModule } from '../../doc/colorpicker/colorpickerdoc.module';
import { ColorPickerDemo } from './colorpickerdemo';
import { ColorPickerDemoRoutingModule } from './colorpickerdemo-routing.module';

@NgModule({
    imports: [CommonModule, ColorPickerDemoRoutingModule, ColorPickerDocModule],
    declarations: [ColorPickerDemo]
})
export class ColorPickerDemoModule {}
