import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageDocModule } from '../../doc/Image/imagedoc.module';
import { ImageDemo } from './imagedemo';
import { ImageDemoRoutingModule } from './imagedemo-routing.module';

@NgModule({
    imports: [CommonModule, ImageDemoRoutingModule, ImageDocModule],
    declarations: [ImageDemo]
})
export class ImageDemoModule {}
