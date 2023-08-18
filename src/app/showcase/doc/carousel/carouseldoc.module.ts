import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { ImportDoc } from './importdoc';
import { TagModule } from 'primeng/tag';
import { BasicDoc } from './basicdoc';
import { StyleDoc } from './styledoc';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { CircularDoc } from './circulardoc';
import { NumScrollDoc } from './numscrolldoc';
import { ResponsiveDoc } from './responsivedoc';
import { TemplateDoc } from './templatedoc';
import { VerticalDoc } from './verticaldoc';
import { AccessibilityDoc } from './accessibilitydoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, CarouselModule, ButtonModule, TagModule],
    declarations: [ImportDoc, BasicDoc, CircularDoc, NumScrollDoc, StyleDoc, ResponsiveDoc, TemplateDoc, VerticalDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class CarouselDocModule {}
