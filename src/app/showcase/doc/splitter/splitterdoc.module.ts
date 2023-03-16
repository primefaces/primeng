import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SplitterModule } from 'primeng/splitter';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { EventsDoc } from './eventsdoc';
import { SplitterHorizontalDemo } from './horizontaldoc';
import { ImportDoc } from './importdoc';
import { SplitterNestedDemo } from './nesteddoc';
import { PropsDoc } from './propsdoc';
import { SplitterSizeDemo } from './sizedoc';
import { StyleDoc } from './styledoc';
import { TemplatesDoc } from './templatesdoc';
import { SplitterVerticalDemo } from './verticaldoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, SplitterModule, RouterModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, SplitterHorizontalDemo, SplitterSizeDemo, SplitterVerticalDemo, SplitterNestedDemo, StyleDoc, PropsDoc, EventsDoc, TemplatesDoc]
})
export class SplitterDocModule {}
