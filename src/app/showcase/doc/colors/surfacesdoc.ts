import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConfig } from '../../domain/appconfig';
import { AppConfigService } from '../../service/appconfigservice';

@Component({
    selector: 'surfaces-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Surface palette is used when designing the layers such as headers, content, footers, overlays and dividers. Surface palette varies between 0 - 900 and named surfaces are also available.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="color-stack">
                <div *ngFor="let shade of shades">
                    <div class="color-box" [ngStyle]="{ backgroundColor: 'var(--surface-' + shade, color: config.dark ? (shade > 400 ? '#000' : '#fff') : shade > 500 ? '#fff' : '#000' }">surface-{{ shade }}</div>
                </div>
            </div>
        </div>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Variable</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>--surface-ground</td>
                        <td>Base ground color.</td>
                    </tr>
                    <tr>
                        <td>--surface-section</td>
                        <td>Background color of a section on a ground surface.</td>
                    </tr>
                    <tr>
                        <td>--surface-card</td>
                        <td>Color of a surface used as a card.</td>
                    </tr>
                    <tr>
                        <td>--surface-overlay</td>
                        <td>Color of overlay surfaces.</td>
                    </tr>
                    <tr>
                        <td>--surface-border</td>
                        <td>Color of a divider.</td>
                    </tr>
                    <tr>
                        <td>--surface-hover</td>
                        <td>Color of an element in hover state.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`,
    styles: [
        `
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
        `
    ]
})
export class SurfacesDoc implements OnInit, OnDestroy {
    @Input() id: string;

    @Input() title: string;

    colors: string[] = ['blue', 'green', 'yellow', 'cyan', 'pink', 'indigo', 'red', 'teal', 'orange', 'bluegray', 'purple', 'gray', 'primary'];

    shades: number[] = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

    config: AppConfig;

    subscription: Subscription;

    constructor(private configService: AppConfigService) {}

    ngOnInit() {
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe((config) => (this.config = config));
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
