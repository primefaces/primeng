import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/app.code.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '@alamote/primeng/button';
import { InputTextModule } from '@alamote/primeng/inputtext';
import { DropdownModule } from '@alamote/primeng/dropdown';
import { FocusTrapModule } from '@alamote/primeng/focustrap';
import { ImportDoc } from './importdoc';
import { BasicDoc } from './basicdoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, FormsModule, ButtonModule, InputTextModule, DropdownModule, FocusTrapModule],
    declarations: [ImportDoc, BasicDoc],
    exports: [AppDocModule]
})
export class FocusTrapDocModule {}
