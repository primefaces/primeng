import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@alamote/primeng/dialog';
import { DockModule } from '@alamote/primeng/dock';
import { GalleriaModule } from '@alamote/primeng/galleria';
import { MenubarModule } from '@alamote/primeng/menubar';
import { RadioButtonModule } from '@alamote/primeng/radiobutton';
import { TerminalModule } from '@alamote/primeng/terminal';
import { ToastModule } from '@alamote/primeng/toast';
import { TreeModule } from '@alamote/primeng/tree';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { AdvancedDoc } from './advanceddoc';
import { BasicDoc } from './basicdoc';
import { ImportDoc } from './importdoc';
import { StyleDoc } from './styledoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, DockModule, FormsModule, RadioButtonModule, MenubarModule, ToastModule, DialogModule, GalleriaModule, TerminalModule, TreeModule, AppDocModule],
    declarations: [AdvancedDoc, BasicDoc, ImportDoc, StyleDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class DockDocModule {}
