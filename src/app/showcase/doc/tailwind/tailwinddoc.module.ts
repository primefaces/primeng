import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { OverviewDoc } from './overviewdoc';
import { PluginDoc } from './plugindoc';
import { ExtensionsDoc } from './extensionsdoc';
import { OverrideDoc } from './overridedoc';
import { ColorPaletteDoc } from './colorpalettedoc';
import { FormDoc } from './formdoc';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { HeadlessDoc } from './headlessdoc';
import { DialogModule } from 'primeng/dialog';
import { AnimationsDoc } from './animationsdoc';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        AppCodeModule,
        AppDocModule,
        TagModule,
        ButtonModule,
        InputTextModule,
        TextareaModule,
        SelectModule,
        DatePickerModule,
        FormsModule,
        DialogModule,
    ],
    declarations: [OverviewDoc, PluginDoc, ExtensionsDoc, OverrideDoc, ColorPaletteDoc, FormDoc, HeadlessDoc, AnimationsDoc],
    exports: [AppDocModule],
})
export class TailwindDocModule {}
