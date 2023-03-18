import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollerModule } from 'primeng/scroller';
import { SkeletonModule } from 'primeng/skeleton';
import { SpinnerModule } from 'primeng/spinner';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { BasicDoc } from './basicdoc';
import { DelayDoc } from './delaydoc';
import { EventsDoc } from './eventsdoc';
import { HorizontalDoc } from './horizonntaldoc';
import { HorizontalAndVerticalDoc } from './horizontalandverticaldoc';
import { ImportDoc } from './importdoc';
import { LazyLoadDoc } from './lazyloaddoc';
import { LoaderBasicDoc } from './loaderbasicdoc';
import { LoaderTemplateDoc } from './loadertemplatedoc';
import { MethodsDoc } from './methodsdoc';
import { PropsDoc } from './propsdoc';
import { ScrollOptionsDoc } from './scrolloptionsdoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';
import { TemplatesDoc } from './templatesdoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, ScrollerModule, SkeletonModule, SpinnerModule],
    declarations: [BasicDoc, DelayDoc, ImportDoc, EventsDoc, HorizontalDoc, HorizontalAndVerticalDoc, LazyLoadDoc, LoaderBasicDoc, LoaderTemplateDoc, MethodsDoc, PropsDoc, ScrollOptionsDoc, StyleDoc, TemplatesDoc, TemplateDoc],
    exports: [AppDocModule]
})
export class ScrollerDocModule {}
