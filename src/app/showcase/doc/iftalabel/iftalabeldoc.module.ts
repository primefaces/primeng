import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ImportDoc } from './importdoc';
import { BasicDoc } from './basicdoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, FormsModule, IftaLabelModule, InputTextModule],
    declarations: [ImportDoc, BasicDoc],
    exports: [AppDocModule],
})
export class IftaLabelDocModule {}
