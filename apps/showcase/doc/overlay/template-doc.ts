import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { OverlayModule } from 'primeng/overlay';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'template-doc',
    standalone: true,
    imports: [ButtonModule, OverlayModule, AppCode, AppDocSectionText],
    template: ` <app-docsectiontext>
            <p>Content can be customized with the <i>content</i> template.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-button (click)="toggle()" label="Show Overlay"></p-button>
            <p-overlay [(visible)]="overlayVisible" [responsive]="{ breakpoint: '640px', direction: 'bottom', contentStyleClass: 'h-20rem' }" contentStyleClass="p-6 bg-surface-0 dark:bg-surface-900 shadow rounded-border">
                <ng-template #content let-option> Content - {{ option.mode }} </ng-template>
            </p-overlay>
        </div>
        <app-code></app-code>`
})
export class OverlayTemplateDemo {
    overlayVisible: boolean = false;

    toggle() {
        this.overlayVisible = !this.overlayVisible;
    }
}
