import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GalleriaDocModule } from '../../doc/galleria/galleriadoc.module';
import { GalleriaDemo } from './galleriademo';
import { GalleriaDemoRoutingModule } from './galleriademo-routing.module';

@NgModule({
    imports: [CommonModule, GalleriaDemoRoutingModule, GalleriaDocModule],
    declarations: [GalleriaDemo]
})
export class GalleriaDemoModule {}
