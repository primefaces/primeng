import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AppConfigService } from '../../service/appconfigservice';

@Component({
    templateUrl: './uikit.component.html',
    styleUrls: ['uikit.component.scss']
})
export class UIKitComponent implements OnInit, OnDestroy {
    subscription: Subscription;

    colorScheme: string = 'light';

    constructor(private configService: AppConfigService, private titleService: Title, private metaService: Meta) {
        this.titleService.setTitle('UI Kit - PrimeNG');
        this.metaService.updateTag({ name: 'description', content: 'PrimeNG Angular UI Kit' });
    }

    ngOnInit() {
        this.subscription = this.configService.configUpdate$.subscribe((config) => {
            this.colorScheme = config.darkMode ? 'dark' : 'light';
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
