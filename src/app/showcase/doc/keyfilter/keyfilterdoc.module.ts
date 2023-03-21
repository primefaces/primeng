import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { ImportDoc } from './importdoc';
import { PresetsDoc } from './presetsdoc';
import { PropsDoc } from './propsdoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { RegexDoc } from './regexdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, ReactiveFormsModule, AppDocModule, KeyFilterModule, InputTextModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, PresetsDoc, RegexDoc, PropsDoc, AccessibilityDoc, ReactiveFormsDoc]
})
export class KeyFilterDocModule {}
