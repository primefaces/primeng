import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Tooltip } from 'primeng/tooltip';
import { AccessibilityDoc } from './accessibilitydoc';
import { AutoHideDoc } from './autohidedoc';
import { CustomDoc } from './customdoc';
import { DelayDoc } from './delaydoc';
import { EventDoc } from './eventdoc';
import { ImportDoc } from './importdoc';
import { OptionsDoc } from './optionsdoc';
import { PositionDoc } from './positiondoc';
import { StyleDoc } from './styledoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, Tooltip, ButtonModule, InputTextModule, AppDocModule],
    declarations: [ImportDoc, StyleDoc, PositionDoc, EventDoc, AutoHideDoc, DelayDoc, CustomDoc, OptionsDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class TooltipDocModule {}
