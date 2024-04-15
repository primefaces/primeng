import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/app.code.component';
import { ToggleClassDoc } from './toggleclassdoc';
import { ImportDoc } from './importdoc';
import { StyleClassModule } from '@alamote/primeng/styleclass';
import { ButtonModule } from '@alamote/primeng/button';
import { InputTextModule } from '@alamote/primeng/inputtext';
import { AnimationDoc } from './animationdoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, StyleClassModule, ButtonModule, InputTextModule],
    declarations: [ImportDoc, ToggleClassDoc, AnimationDoc],
    exports: [AppDocModule]
})
export class StyleClassDocModule {}
