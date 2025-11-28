import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { AppCode } from '@/components/doc/app.code';
import { Code } from '@/domain/code';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'anchored-overlays-doc',
    standalone: true,
    imports: [AppDocSectionText, SelectModule, FormsModule, AppCode],
    template: `
        <app-docsectiontext>
            <p>
                Anchored overlays are the components that have a floating ui positioned relatively to another element such as Select, Popover. The enter and leave animations are defined with the <i>.p-anchored-overlay-enter-active</i> and
                <i>.p-anchored-overlay-leave-active</i>
                classes.
            </p>
            <div class="card flex justify-center">
                <p-select [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" placeholder="Select a City" class="w-full md:w-56" [pt]="{ overlay: { class: 'demo-select-overlay' } }" />
            </div>

            <app-code [code]="code" hideToggleCode hideStackBlitz></app-code>
        </app-docsectiontext>
    `,
    styles: [
        `
            .demo-select-overlay.p-anchored-overlay-enter-active {
                animation: demo-overlay-in 300ms ease-out;
            }

            .demo-select-overlay.p-anchored-overlay-leave-active {
                animation: demo-overlay-out 250ms ease-in;
            }

            @keyframes demo-overlay-in {
                from {
                    opacity: 0;
                    transform: translateY(10%);
                }
            }

            @keyframes demo-overlay-out {
                to {
                    opacity: 0;
                    transform: translateY(10%);
                }
            }
        `
    ]
})
export class AnchoredOverlaysDoc {
    cities: City[];

    selectedCity: City | undefined;

    ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
    }
    code: Code = {
        scss: `.p-anchored-overlay-enter-active {
    animation: demo-overlay-in 300ms ease-out;
}

.p-anchored-overlay-leave-active {
    animation: demo-overlay-out 250ms ease-in;
}

@keyframes demo-overlay-in {
    from {
        opacity: 0;
        transform: translateY(10%);
    }
}

@keyframes demo-overlay-out {
    to {
        opacity: 0;
        transform: translateY(10%);
    }
}`
    };
}
