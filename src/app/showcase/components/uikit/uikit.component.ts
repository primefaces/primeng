import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConfigService } from '../../service/appconfigservice';

@Component({
    templateUrl: './uikit.component.html',
    styleUrls: ['uikit.component.scss']
})
export class UIKitComponent implements OnInit, OnDestroy {

    subscription: Subscription;

    colorScheme: string = 'light';

    constructor(private configService: AppConfigService) {}

    ngOnInit() {
        this.subscription = this.configService.configUpdate$.subscribe(config => {
            this.colorScheme = config.dark ? 'dark' : 'light';
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}