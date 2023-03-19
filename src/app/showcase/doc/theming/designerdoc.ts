import { Component, Input } from '@angular/core';

@Component({
    selector: 'designer-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                CSS of the themes share the same license as PrimeNG which is MIT, this means the generated CSS can be customized per your needs however this should be avoided if your customizations are not simple. For instance even to change a
                primary color, since there is no variable a find and replace should be performed various times. On the other hand, this can be achieved by changing a single variable e.g. <i>$primaryColor</i>. Visit the
                <a href="https://www.primefaces.org/designer/api/primeng/15.0.0">SASS API</a> for the documentation of available customization options.
            </p>
            <p class="doc-section-description">
                <a href="https://www.primefaces.org/designer/primeng">Designer</a> is the ultimate tool to create your own PrimeNG experience powered by a SASS based theme engine with 500+ variables and a Visual Designer. PrimeNG only ships the
                generated CSS of the themes whereas Designer provides full access to the whole SASS structure and the variables of these pre-built themes for easier customization.
            </p>
            <p class="doc-section-description">Whether you have your own style guide or just need a custom theme, Designer is the right tool to design and bring them to existence.</p>
            <p class="doc-section-description">Visit <a href="https://www.primefaces.org/designer/primeng">Designer Website</a> for more information and live demos.</p>
        </app-docsectiontext>
        <img alt="PrimeNG Designer" src="https://primefaces.org/cdn/primevue/images/primevue-designer.jpg" class="w-full mb-5" />
    </section>`
})
export class DesignerDoc {
    @Input() id: string;

    @Input() title: string;
}
