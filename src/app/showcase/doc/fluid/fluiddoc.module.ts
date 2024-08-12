import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { FormsModule } from '@angular/forms';
import { BasicDoc } from './basicdoc';
import { ImportDoc } from './importdoc';
import { InputTextModule } from 'primeng/inputtext';
import { FluidModule } from 'primeng/fluid';
import { AccessibilityDoc } from './accessibilitydoc';


@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, FormsModule, InputTextModule, FluidModule],
    declarations: [BasicDoc, ImportDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class FluidDocModule {}
