import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ListboxModule } from 'primeng/listbox';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { AppComponent } from './app.component';

import { CarService } from './service/carservice';
import { CountryService } from './service/countryservice';
import { EventService } from './service/eventservice';
import { NodeService } from './service/nodeservice';

import { AppConfigService } from './service/appconfigservice';
import { CustomerService } from './service/customerservice';
import { IconService } from './service/iconservice';
import { JsonService } from './service/jsonservice';
import { PhotoService } from './service/photoservice';
import { ProductService } from './service/productservice';

import { BadgeModule } from 'primeng/badge';
import { AppConfigComponent } from './app.config.component';
import { AppDemoActionsModule } from './app.demoactions.component';
import { AppFooterComponent } from './app.footer.component';
import { AppInputStyleSwitchModule } from './app.inputstyleswitch.component';
import { AppMainComponent } from './app.main.component';
import { AppMenuComponent } from './app.menu.component';
import { AppNewsComponent } from './app.news.component';
import { AppTopBarComponent } from './app.topbar.component';
import { LandingComponent } from './components/landing/landing.component';

@NgModule({
    declarations: [AppComponent, AppNewsComponent, AppTopBarComponent, AppMenuComponent, AppConfigComponent, AppFooterComponent, LandingComponent, AppMainComponent],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AutoCompleteModule,
        ButtonModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        TooltipModule,
        AppInputStyleSwitchModule,
        AppDemoActionsModule,
        ChartModule,
        TabMenuModule,
        SliderModule,
        CalendarModule,
        TreeModule,
        ProgressBarModule,
        InputNumberModule,
        ChipModule,
        SelectButtonModule,
        TableModule,
        CheckboxModule,
        ListboxModule,
        InputMaskModule,
        DropdownModule
    ],
    providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }, CarService, CountryService, EventService, NodeService, IconService, CustomerService, PhotoService, JsonService, AppConfigService, ProductService],
    bootstrap: [AppComponent]
})
export class AppModule {}
