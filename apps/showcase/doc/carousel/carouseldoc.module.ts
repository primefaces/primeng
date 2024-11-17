import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Button, ButtonDirective } from 'primeng/button';
import { Carousel } from 'primeng/carousel';
import { Tag } from 'primeng/tag';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { CircularDoc } from './circulardoc';
import { ImportDoc } from './importdoc';
import { NumScrollDoc } from './numscrolldoc';
import { ResponsiveDoc } from './responsivedoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';
import { VerticalDoc } from './verticaldoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, Carousel, Button, ButtonDirective, Tag],
    declarations: [ImportDoc, BasicDoc, CircularDoc, NumScrollDoc, StyleDoc, ResponsiveDoc, TemplateDoc, VerticalDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class CarouselDocModule {}
