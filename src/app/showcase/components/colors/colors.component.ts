import {Component} from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConfig } from '../../domain/appconfig';
import { AppConfigService } from '../../service/appconfigservice';

@Component({
    templateUrl: './colors.component.html',
    styles: [`
        .color-stack {
            display: flex;
            flex-direction: column;
        }

        .color-box {
            width: 2.5rem;
            display: flex;
            align-items: center;
            padding: 1rem;
            width: 250px;
            font-weight: bold;
        }

        .sample-layout {
            width: 375px;
        }
    `]
})
export class ColorsDemoComponent {

    colors: any[] = ['blue', 'green', 'yellow', 'cyan', 'pink', 'indigo', 'teal', 'orange', 'bluegray', 'purple', 'gray'];

    shades: any[] = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

    config: AppConfig;

    subscription: Subscription;

    constructor(private configService: AppConfigService) { }

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
