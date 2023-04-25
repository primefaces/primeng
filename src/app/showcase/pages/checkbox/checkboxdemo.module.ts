import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { CheckboxDocModule } from '../../doc/checkbox/checkboxdoc.module';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { CheckboxDemo } from './checkboxdemo';
import { CheckboxDemoRoutingModule } from './checkboxdemo-routing.module';

@NgModule({
    imports: [CommonModule, CheckboxDemoRoutingModule, CheckboxModule, AppDocModule, CheckboxDocModule],
    declarations: [CheckboxDemo]
})
export class CheckboxDemoModule {}
