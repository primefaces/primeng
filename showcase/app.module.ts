import {NgModule} from '@angular/core';
import {FormsModule,ReactiveFormsModule}    from '@angular/forms'
import {HttpModule}    from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {LocationStrategy,HashLocationStrategy} from '@angular/common';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {HomePageComponent} from './homepage.component';

import {CarService} from './demo/service/carservice';
import {CountryService} from './demo/service/countryservice';
import {EventService} from './demo/service/eventservice';
import {NodeService} from './demo/service/nodeservice';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        HomePageComponent
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        CarService,CountryService,EventService,NodeService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }