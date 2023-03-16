import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { BasicDoc } from './basicdoc';
import { DisabledDoc } from './disableddoc';
import { FloatLabelDoc } from './floatlabeldoc';
import { HelpTextDoc } from './helptextdoc';
import { IconsDoc } from './iconsdoc';
import { ImportDoc } from './importdoc';
import { InvalidDoc } from './invaliddoc';
import { KeyFilterDoc } from './keyfilterdoc';
import { PropsDoc } from './propsdoc';
import { SizesDoc } from './sizesdoc';
import { StyleDoc } from './styledoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, InputTextModule, FormsModule, AppDocModule, KeyFilterModule],
    declarations: [BasicDoc, DisabledDoc, FloatLabelDoc, HelpTextDoc, IconsDoc, InvalidDoc, KeyFilterDoc, SizesDoc, ImportDoc, PropsDoc, StyleDoc],
    exports: [AppDocModule]
})
export class InputtextDocModule {}
