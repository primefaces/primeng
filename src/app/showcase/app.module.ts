import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';

import { CarService } from './service/carservice';
import { CountryService } from './service/countryservice';
import { EventService } from './service/eventservice';
import { NodeService } from './service/nodeservice';

import { IconService } from './service/iconservice';
import { CustomerService } from './service/customerservice';
import { PhotoService } from './service/photoservice';
import { VersionService } from './service/versionservice';
import { AppConfigService } from './service/appconfigservice';
import { ProductService } from './service/productservice';

import { AppNewsComponent } from './app.news.component';
import { AppTopBarComponent } from './app.topbar.component';
import { AppMenuComponent } from './app.menu.component';
import { AppConfigComponent } from './app.config.component';
import { AppFooterComponent } from './app.footer.component';
import { AppInputStyleSwitchModule } from './app.inputstyleswitch.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AppNewsComponent,
        AppTopBarComponent,
        AppMenuComponent,
        AppConfigComponent,
        AppFooterComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ButtonModule,
        RadioButtonModule,
        InputSwitchModule,
        TooltipModule,
        AppInputStyleSwitchModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CarService,CountryService,EventService,NodeService,IconService,CustomerService,PhotoService,VersionService,AppConfigService, ProductService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
