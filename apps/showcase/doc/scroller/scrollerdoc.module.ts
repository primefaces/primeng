import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Scroller } from 'primeng/scroller';
import { Skeleton } from 'primeng/skeleton';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { DelayDoc } from './delaydoc';
import { GridDoc } from './griddoc';
import { HorizontalDoc } from './horizontaldoc';
import { ImportDoc } from './importdoc';
import { LazyLoadDoc } from './lazyloaddoc';
import { LoaderDoc } from './loaderdoc';
import { ProgrammaticDoc } from './programmaticdoc';
import { ScrollOptionsDoc } from './scrolloptionsdoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, Scroller, Skeleton, ButtonModule],
    declarations: [BasicDoc, DelayDoc, ImportDoc, HorizontalDoc, GridDoc, LazyLoadDoc, LoaderDoc, ScrollOptionsDoc, StyleDoc, TemplateDoc, ProgrammaticDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class VirtualScrollerDocModule {}
