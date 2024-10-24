import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primengrtl/menubar';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { TemplateDoc } from './templatedoc';
import { BasicDoc } from './basicdoc';
import { ImportDoc } from './importdoc';
import { StyleDoc } from './styledoc';
import { InputTextModule } from 'primengrtl/inputtext';
import { AccessibilityDoc } from './accessibilitydoc';
import { BadgeModule } from 'primengrtl/badge';
import { RippleModule } from 'primengrtl/ripple';
import { AvatarModule } from 'primengrtl/avatar';
import { CommandDoc } from './commanddoc';
import { ToastModule } from 'primengrtl/toast';
import { RouterDoc } from './routerdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, MenubarModule, InputTextModule, AppDocModule, BadgeModule, RippleModule, AvatarModule, ToastModule],
    declarations: [BasicDoc, ImportDoc, StyleDoc, TemplateDoc, CommandDoc, RouterDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class MenubarDocModule {}
