import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ListboxModule } from 'primeng/listbox';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TreeModule } from 'primeng/tree';
import { AppNewsModule } from '../../layout/news/app.news.module';
import { LandingComponent } from './landing.component';

@NgModule({
    imports: [
        CommonModule,
        NgOptimizedImage,
        FormsModule,
        SidebarModule,
        InputSwitchModule,
        ButtonModule,
        RadioButtonModule,
        InputNumberModule,
        TabMenuModule,
        ChartModule,
        ProgressBarModule,
        TreeModule,
        ChipModule,
        SelectButtonModule,
        SliderModule,
        BadgeModule,
        CalendarModule,
        TableModule,
        DropdownModule,
        ListboxModule,
        RouterModule,
        CheckboxModule,
        AppNewsModule
    ],
    exports: [LandingComponent],
    declarations: [LandingComponent]
})
export class LandingModule {}
