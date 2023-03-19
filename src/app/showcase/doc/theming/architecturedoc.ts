import { Component, Input } from '@angular/core';

@Component({
    selector: 'architecture-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p class="line-height-3 bg-indigo-600 text-white p-3 text-lg" style="border-radius: 10px">
                <strong>Note</strong>: In upcoming versions, theming architecture will be redesigned to utilize CSS variables instead of SCSS variables in a backward compatible way for a dynamic approach. In addition, a new
                <strong>Unstyled</strong> mode will be provided as an alternative to the default styling so that CSS libraries like Tailwind or Bootstrap can be used to style the components. This work is planned to be completed in Q3 2023.
            </p>
            <p>
                PrimeNG is a design agnostic library so unlike other UI libraries it does not enforce a certain styling such as material or bootstrap. In order to achieve this, styling has been separated into two parts, core and theme. The core
                resides inside PrimeNG to implement the structure of the components such as positioning whereas theme brings the colors and spacing.
            </p>
        </app-docsectiontext>
        <img alt="Architecture" src="https://primefaces.org/cdn/primeng/images/architecture.jpg" class="w-full mb-5" />
    </section>`
})
export class ArchitectureDoc {
    @Input() id: string;

    @Input() title: string;
}
