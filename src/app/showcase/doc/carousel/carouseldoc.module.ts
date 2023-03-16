import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { ImportDoc } from './importdoc';
import { CarouselBasicDemo } from './basicdoc';
import { StyleDoc } from './styledoc';
import { PropsDoc } from './propsdoc';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { CarouselCircularDemo } from './circulardoc';
import { EventsDoc } from './eventsdoc';
import { CarouselNumScrollDemo } from './numscrolldoc';
import { ResponsiveDoc } from './responsivedoc';
import { CarouselTemplateDemo } from './templatedoc';
import { CarouselVerticalDemo } from './verticaldoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, CarouselModule, ButtonModule],
    declarations: [ImportDoc, CarouselBasicDemo, CarouselCircularDemo, EventsDoc, CarouselNumScrollDemo, PropsDoc, StyleDoc, ResponsiveDoc, CarouselTemplateDemo, CarouselVerticalDemo],
    exports: [AppDocModule]
})
export class CarouselDocModule {}
