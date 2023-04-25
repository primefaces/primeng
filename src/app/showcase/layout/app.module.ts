import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { CarService } from '../service/carservice';
import { CountryService } from '../service/countryservice';
import { EventService } from '../service/eventservice';
import { NodeService } from '../service/nodeservice';

import { AppConfigService } from '../service/appconfigservice';
import { CustomerService } from '../service/customerservice';
import { IconService } from '../service/iconservice';
import { PhotoService } from '../service/photoservice';
import { ProductService } from '../service/productservice';

import { LandingModule } from '../pages/landing/landing.module';
import { AppMainComponent } from './app.main.component';
import { AppConfigModule } from '../layout//config/app.config.module';
import { AppFooterComponent } from '../layout/footer/app.footer.component';
import { AppMenuModule } from '../layout//menu/app.menu.module';
import { AppNewsModule } from '../layout/news/app.news.module';
import { AppTopbarModule } from '../layout/topbar/app.topbar.module';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

@NgModule({
    declarations: [AppComponent, AppFooterComponent, AppMainComponent],
    imports: [
        BrowserModule.withServerTransition({ appId: 'primeng' }),
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        AppNewsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        LandingModule,
        AppConfigModule,
        AppTopbarModule,
        AppMenuModule
    ],
    providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }, CarService, CountryService, EventService, NodeService, IconService, CustomerService, PhotoService, AppConfigService, ProductService],
    bootstrap: [AppComponent]
})
export class AppModule {}
