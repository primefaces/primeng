import { CommonModule } from '@angular/common';
import { Component, computed, effect, input } from '@angular/core';
import { AppDocSectionNav } from './app.docsection-nav';

@Component({
    selector: 'app-docptsection',
    standalone: true,
    imports: [CommonModule, AppDocSectionNav],
    template: `
        <div class="doc-main">
            @if (ptComponent()) {
                <section class="py-6" id="pt.viewer">
                    <ng-container *ngComponentOutlet="ptComponent()" />
                </section>
            }
        </div>
        <app-docsection-nav [docs]="navItems()" />
    `
})
export class AppDocPtSection {
    ptComponent = input<any>();

    componentName = input<string>('');

    constructor() {
        effect(() => {
            console.log(this.componentName());
        });
    }

    navItems = computed(() => [
        {
            id: 'pt.viewer',
            label: 'Viewer'
        },
        {
            id: 'pt.doc.options'
            // label: this.componentName().charAt(0).toUpperCase() + this.componentName().slice(1) + ' PT Options'
        }
    ]);
}
