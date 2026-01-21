import { Component, signal } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'loading-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ButtonModule],
    template: `
        <app-docsectiontext>
            <p>Busy state is controlled with the <i>loading</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-center gap-4">
            <p-button label="Search" icon="pi pi-check" [loading]="loading()" (onClick)="load()" />
        </div>
        <app-code></app-code>
    `
})
export class LoadingDoc {
    loading = signal(false);

    load() {
        this.loading.set(true);

        setTimeout(() => {
            this.loading.set(false);
        }, 2000);
    }
}
