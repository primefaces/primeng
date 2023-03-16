import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChipModule } from 'primeng/chip';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { ChipBasicDemo } from './basicdoc';
import { EventsDoc } from './eventsdoc';
import { ChipIconDemo } from './icondoc';
import { ChipImageDemo } from './imagedoc';
import { ImportDoc } from './importdoc';
import { PropsDoc } from './propsdoc';
import { StyleDoc } from './styledoc';
import { ChipTemplatingDemo } from './templatingdoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, ChipModule],
    declarations: [ImportDoc, ChipBasicDemo, ChipIconDemo, ChipImageDemo, PropsDoc, StyleDoc, ChipTemplatingDemo, EventsDoc],
    exports: [AppDocModule]
})
export class ChipDocModule {}
