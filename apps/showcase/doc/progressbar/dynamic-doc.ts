import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'dynamic-doc',
    standalone: true,
    imports: [ProgressBarModule, ToastModule, AppCode, AppDemoWrapper, AppDocSectionText],
    providers: [MessageService],
    template: `
        <app-docsectiontext>
            <p>Value is reactive so updating it dynamically changes the bar as well.</p>
        </app-docsectiontext>
        <p-toast />
        <app-demo-wrapper>
            <p-progressbar [value]="value" />
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class DynamicDoc implements OnInit, OnDestroy {
    value: number = 0;

    interval: any;

    constructor(
        private messageService: MessageService,
        private cd: ChangeDetectorRef,
        private ngZone: NgZone
    ) {}

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
}
