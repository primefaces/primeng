import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FocusTrapModule } from 'primeng/focustrap';
import { ImportDoc } from './importdoc';
import { BasicDoc } from './basicdoc';
import { PropsDoc } from './propsdoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, FormsModule, ButtonModule, InputTextModule, DropdownModule, FocusTrapModule],
    declarations: [ImportDoc, BasicDoc, PropsDoc],
    exports: [AppDocModule]
})
export class FocusTrapDocModule {}
