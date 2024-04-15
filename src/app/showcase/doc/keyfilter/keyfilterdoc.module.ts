import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from '@alamote/primeng/inputtext';
import { KeyFilterModule } from '@alamote/primeng/keyfilter';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { ImportDoc } from './importdoc';
import { PresetsDoc } from './presetsdoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { RegexDoc } from './regexdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, ReactiveFormsModule, AppDocModule, KeyFilterModule, InputTextModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, PresetsDoc, RegexDoc, AccessibilityDoc, ReactiveFormsDoc]
})
export class KeyFilterDocModule {}
