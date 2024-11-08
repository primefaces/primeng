import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { OverviewDoc } from './overviewdoc';
import { PluginDoc } from './plugindoc';
import { ExtensionsDoc } from './extensionsdoc';
import { OverrideDoc } from './overridedoc';
import { ColorPaletteDoc } from './colorpalettedoc';
import { FormDoc } from './formdoc';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { Textarea } from 'primeng/textarea';
import { HeadlessDoc } from './headlessdoc';
import { Dialog } from 'primeng/dialog';
import { AnimationsDoc } from './animationsdoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, Tag, Button, InputText, Textarea, Select, DatePicker, FormsModule, Dialog],
    declarations: [OverviewDoc, PluginDoc, ExtensionsDoc, OverrideDoc, ColorPaletteDoc, FormDoc, HeadlessDoc, AnimationsDoc],
    exports: [AppDocModule]
})
export class TailwindDocModule {}
