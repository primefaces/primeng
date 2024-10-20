import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Scroller } from 'primeng/scroller';
import { Skeleton } from 'primeng/skeleton';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { BasicDoc } from './basicdoc';
import { DelayDoc } from './delaydoc';
import { HorizontalDoc } from './horizontaldoc';
import { GridDoc } from './griddoc';
import { ImportDoc } from './importdoc';
import { LazyLoadDoc } from './lazyloaddoc';
import { LoaderDoc } from './loaderdoc';
import { ScrollOptionsDoc } from './scrolloptionsdoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';
import { ButtonModule } from 'primeng/button';
import { ProgrammaticDoc } from './programmaticdoc';
import { AccessibilityDoc } from './accessibilitydoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, Scroller, Skeleton, ButtonModule],
    declarations: [
        BasicDoc,
        DelayDoc,
        ImportDoc,
        HorizontalDoc,
        GridDoc,
        LazyLoadDoc,
        LoaderDoc,
        ScrollOptionsDoc,
        StyleDoc,
        TemplateDoc,
        ProgrammaticDoc,
        AccessibilityDoc,
    ],
    exports: [AppDocModule],
})
export class ScrollerDocModule {}
