import { Component, Input } from '@angular/core';

@Component({
    selector: 'architecture-doc',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                PrimeNG is a design agnostic library so unlike other UI libraries it does not enforce a certain styling such as material or bootstrap. In order to achieve this, styling has been separated into two parts, core and theme. Core resides
                inside PrimeNG to implement the structure of the components such as positioning whereas theme brings the colors, paddings and margins. vVarious free themes and premium themes are available along with premium templates that provide an
                application layout as well. All the free themes are built with the <a href="https://www.primefaces.org/designer/primeng">Theme Designer</a> and the npm package brings the compiled CSS output of the theme whereas SCSS is kept as a
                premium feature in the designer.
            </p>
        </app-docsectiontext>
        <img alt="Architecture" src="https://primefaces.org/cdn/primeng/images/architecture.jpg" class="w-full mb-5" />
    </div>`
})
export class ArchitectureDoc {
    @Input() id: string;

    @Input() title: string;
}
