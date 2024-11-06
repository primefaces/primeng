import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RadioButton } from 'primeng/radiobutton';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { DisabledDoc } from './disableddoc';
import { DynamicDoc } from './dynamicdoc';
import { GroupDoc } from './groupdoc';
import { ImportDoc } from './importdoc';
import { InvalidDoc } from './invaliddoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { StyleDoc } from './styledoc';
import { FilledDoc } from './filleddoc';
import { SizesDoc } from './sizesdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, RadioButton, FormsModule, ReactiveFormsModule, RouterModule],
    exports: [AppDocModule],
    declarations: [
        ImportDoc,
        GroupDoc,
        DynamicDoc,
        InvalidDoc,
        DisabledDoc,
        StyleDoc,
        AccessibilityDoc,
        ReactiveFormsDoc,
        FilledDoc,
        SizesDoc,
    ],
})
export class RadioButtonDocModule {}
