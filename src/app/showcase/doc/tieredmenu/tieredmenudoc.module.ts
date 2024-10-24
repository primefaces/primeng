import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TieredMenuModule } from 'primengrtl/tieredmenu';
import { ButtonModule } from 'primengrtl/button';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { BadgeModule } from 'primengrtl/badge';
import { ToastModule } from 'primengrtl/toast';
import { BasicDoc } from './basicdoc';
import { ImportDoc } from './importdoc';
import { PopupDoc } from './popupdoc';
import { TemplateDoc } from './templatedoc';
import { CommandDoc } from './commanddoc';
import { RouterDoc } from './routerdoc';
import { StyleDoc } from './styledoc';
import { AccessibilityDoc } from './accessibilitydoc';
import { MessageService } from 'primengrtl/api';
import { FloatLabelModule } from 'primengrtl/floatlabel';

@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, TieredMenuModule, ButtonModule, AppDocModule, BadgeModule, ToastModule, FloatLabelModule],
    declarations: [BasicDoc, ImportDoc, PopupDoc, StyleDoc, AccessibilityDoc, TemplateDoc, CommandDoc, RouterDoc],
    exports: [AppDocModule],
    providers: [MessageService]
})
export class TieredMenuDocModule {}
