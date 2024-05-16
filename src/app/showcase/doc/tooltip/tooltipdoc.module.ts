import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { ImportDoc } from './importdoc';
import { StyleDoc } from './styledoc';
import { PositionDoc } from './positiondoc';
import { EventDoc } from './eventdoc';
import { AutoHideDoc } from './autohidedoc';
import { DelayDoc } from './delaydoc';
import { OptionsDoc } from './optionsdoc';
import { AccessibilityDoc } from './accessibilitydoc';
import { CustomDoc } from './customdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, TooltipModule, ButtonModule, InputTextModule, AppDocModule],
    declarations: [ImportDoc, StyleDoc, PositionDoc, EventDoc, AutoHideDoc, DelayDoc, CustomDoc, OptionsDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class TooltipDocModule {}
