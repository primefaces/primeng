import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FloatLabelDemo } from './floatlabeldemo';
import { FloatLabelDemoRoutingModule } from './floatlabeldemo-routing.module';

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
import { TabViewModule } from 'primeng/tabview';

import { PasswordModule } from 'primeng/password';
import { AppCodeModule } from 'src/app/showcase/layout/doc/code/app.code.component';
import { AppDemoActionsModule } from '../../layout/demoactions/app.demoactions.component';

@NgModule({
    imports: [
        CommonModule,
        FloatLabelDemoRoutingModule,
        ButtonModule,
        PanelModule,
        TabViewModule,
        InputTextModule,
        AutoCompleteModule,
        CalendarModule,
        CascadeSelectModule,
        ChipsModule,
        InputMaskModule,
        InputNumberModule,
        DropdownModule,
        MultiSelectModule,
        InputTextareaModule,
        FormsModule,
        AppDemoActionsModule,
        AppCodeModule,
        PasswordModule
    ],
    declarations: [FloatLabelDemo]
})
export class FloatLabelDemoModule {}
