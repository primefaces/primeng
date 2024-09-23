import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FocusTrapModule } from 'primeng/focustrap';
import { ImportDoc } from './importdoc';
import { BasicDoc } from './basicdoc';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        AppCodeModule,
        AppDocModule,
        FormsModule,
        ButtonModule,
        InputTextModule,
        FocusTrapModule,
        FloatLabelModule,
        IconFieldModule,
        InputIconModule,
        CheckboxModule,
    ],
    declarations: [ImportDoc, BasicDoc],
    exports: [AppDocModule],
})
export class FocusTrapDocModule {}
