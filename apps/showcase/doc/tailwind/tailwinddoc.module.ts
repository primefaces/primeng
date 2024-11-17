import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Button } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { Dialog } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Tag } from 'primeng/tag';
import { Textarea } from 'primeng/textarea';
import { AnimationsDoc } from './animationsdoc';
import { ColorPaletteDoc } from './colorpalettedoc';
import { ExtensionsDoc } from './extensionsdoc';
import { FormDoc } from './formdoc';
import { HeadlessDoc } from './headlessdoc';
import { OverrideDoc } from './overridedoc';
import { OverviewDoc } from './overviewdoc';
import { PluginDoc } from './plugindoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, Tag, Button, InputText, Textarea, Select, DatePicker, FormsModule, Dialog],
    declarations: [OverviewDoc, PluginDoc, ExtensionsDoc, OverrideDoc, ColorPaletteDoc, FormDoc, HeadlessDoc, AnimationsDoc],
    exports: [AppDocModule]
})
export class TailwindDocModule {}
