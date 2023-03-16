import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChipsModule } from 'primeng/chips';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { BasicDoc } from './basicdoc';
import { CommaSeperatorDoc } from './commaseperator.doc';
import { ImportDoc } from './importdoc';
import { PropsDoc } from './propsdoc';
import { RegexpSeperatorDoc } from './regexpseperator.doc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';

@NgModule({
    imports: [CommonModule, ChipsModule, FormsModule, AppCodeModule, AppDocModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, CommaSeperatorDoc, RegexpSeperatorDoc, TemplateDoc, StyleDoc, PropsDoc]
})
export class ChipsDocModule {}
