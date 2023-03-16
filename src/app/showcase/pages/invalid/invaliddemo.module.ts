import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { InvalidDemo } from './invaliddemo';
import { InvalidDemoRoutingModule } from './invaliddemo-routing.module';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { TabViewModule } from 'primeng/tabview';
import { TreeSelectModule } from 'primeng/treeselect';

import { AppCodeModule } from 'src/app/showcase/layout/doc/code/app.code.component';
import { AppDemoActionsModule } from '../../layout/demoactions/app.demoactions.component';

@NgModule({
    imports: [
        CommonModule,
        InvalidDemoRoutingModule,
        ButtonModule,
        CascadeSelectModule,
        PanelModule,
        TabViewModule,
        InputTextModule,
        AutoCompleteModule,
        CalendarModule,
        ChipsModule,
        InputMaskModule,
        InputNumberModule,
        DropdownModule,
        MultiSelectModule,
        InputTextareaModule,
        PasswordModule,
        TreeSelectModule,
        FormsModule,
        AppDemoActionsModule,
        AppCodeModule
    ],
    declarations: [InvalidDemo]
})
export class InvalidDemoModule {}
