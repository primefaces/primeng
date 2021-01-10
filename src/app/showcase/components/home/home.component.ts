import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppConfigService } from '../../service/appconfigservice';
import { AppConfig } from '../../domain/appconfig';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

    config: AppConfig;

    subscription: Subscription;

    constructor(private configService: AppConfigService) {}

    ngOnInit() {
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(config => this.config = config);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
