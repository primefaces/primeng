import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ColorsDocModule } from '@doc/colors/colorsdoc.module';
import { ColorsDemoRoutingModule } from './colors-routing.module';
import { ColorsDemoComponent } from './colors.component';

@NgModule({
    imports: [CommonModule, ColorsDocModule, ColorsDemoRoutingModule],
    declarations: [ColorsDemoComponent]
})
export class ColorsDemoModule {}
