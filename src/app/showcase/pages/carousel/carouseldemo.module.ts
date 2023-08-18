import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarouselDocModule } from '../../doc/carousel/carouseldoc.module';
import { CarouselDemo } from './carouseldemo';
import { CarouselDemoRoutingModule } from './carouseldemo-routing.module';

@NgModule({
    imports: [CommonModule, CarouselDemoRoutingModule, CarouselDocModule],
    declarations: [CarouselDemo]
})
export class CarouselDemoModule {}
