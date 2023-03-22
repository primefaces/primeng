import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

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
import { AppConfigModule } from './config/app.config.module';
import { AppFooterComponent } from './footer/app.footer.component';
import { AppMenuModule } from './menu/app.menu.module';
import { AppNewsComponent } from './news/app.news.component';
import { AppTopbarModule } from './topbar/app.topbar.module';

@NgModule({
    declarations: [AppComponent, AppNewsComponent, AppFooterComponent, AppMainComponent],
    imports: [FormsModule, ReactiveFormsModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule, LandingModule, AppConfigModule, AppTopbarModule, AppMenuModule],
    providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }, CarService, CountryService, EventService, NodeService, IconService, CustomerService, PhotoService, AppConfigService, ProductService],
    bootstrap: [AppComponent]
})
export class AppModule {}
