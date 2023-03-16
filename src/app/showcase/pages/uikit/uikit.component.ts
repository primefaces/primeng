import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConfigService } from '../../service/appconfigservice';
import { UIKitService } from '../../service/uikitservice';

@Component({
    templateUrl: './uikit.component.html',
    styleUrls: ['uikit.component.scss']
})
export class UIKitComponent implements OnInit, OnDestroy {
    subscription: Subscription;

    pricingSubscription: Subscription;

    colorScheme: string = 'light';

    pricing: any;

    constructor(private configService: AppConfigService, private uiKitService: UIKitService) {}

    ngOnInit() {
        this.subscription = this.configService.configUpdate$.subscribe((config) => {
            this.colorScheme = config.dark ? 'dark' : 'light';
        });

        this.pricingSubscription = this.uiKitService.getPricingList().subscribe((data) => {
            this.pricing = data;
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.pricingSubscription) {
            this.pricingSubscription.unsubscribe();
        }
    }
}
