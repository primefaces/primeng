import { ChangeDetectorRef, Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'dynamic-doc',
    template: `
        <app-docsectiontext>
            <p>Value is reactive so updating it dynamically changes the bar as well.</p>
        </app-docsectiontext>
        <div class="card">
            <p-toast />
            <p-progressBar [value]="value" />
        </div>
        <app-code [code]="code" selector="progress-bar-dynamic-demo"></app-code>
    `,
    providers: [MessageService]
})
export class DynamicDoc implements OnInit, OnDestroy {
    value: number = 0;

    interval: any;

    constructor(private messageService: MessageService, private cd: ChangeDetectorRef, private ngZone: NgZone) {}

    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            this.interval = setInterval(() => {
                this.ngZone.run(() => {
                    this.value = this.value + Math.floor(Math.random() * 10) + 1;
                    if (this.value >= 100) {
                        this.value = 100;
                        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Process Completed' });
                        clearInterval(this.interval);
                    }
                    this.cd.markForCheck();
                });
            }, 2000);
        });
    }

    ngOnDestroy() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    code: Code = {
        basic: `<p-progressBar [value]="value" />`,
        html: `<div class="card">
    <p-toast />
    <p-progressBar [value]="value" />
</div>`,
        typescript: `import { Component, NgZone, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'progress-bar-dynamic-demo',
    templateUrl: './progress-bar-dynamic-demo.html',
    standalone: true,
    imports: [ProgressBarModule, ToastModule],
    providers: [MessageService]
})
export class ProgressBarDynamicDemo implements OnInit {
    value: number = 0;

    interval: any;

    constructor(private messageService: MessageService, private ngZone: NgZone) {}

    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            this.interval = setInterval(() => {
                this.ngZone.run(() => {
                    this.value = this.value + Math.floor(Math.random() * 10) + 1;
                    if (this.value >= 100) {
                        this.value = 100;
                        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Process Completed' });
                        clearInterval(this.interval);
                    }
                });
            }, 2000);
        });
    }

    ngOnDestroy() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}`
    };
}
