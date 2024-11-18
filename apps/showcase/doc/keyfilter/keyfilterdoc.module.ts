import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilter } from 'primeng/keyfilter';
import { AccessibilityDoc } from './accessibilitydoc';
import { ImportDoc } from './importdoc';
import { PresetsDoc } from './presetsdoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { RegexDoc } from './regexdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, ReactiveFormsModule, AppDocModule, KeyFilter, InputTextModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, PresetsDoc, RegexDoc, AccessibilityDoc, ReactiveFormsDoc]
})
export class KeyFilterDocModule {}
