import { Component, Input } from '@angular/core';

@Component({
    selector: 'licence-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>PrimeNG is an open source and free to use library licensed under MIT license whereas <b>PrimeNG LTS</b> is a commercial software licensed under <a href="https://www.primefaces.org/lts/licenses/">LTS License.</a></p>
        </app-docsectiontext>
        <div class="card">
            <ul>
                <li>A license is required to be obtained before installing and importing an LTS package.</li>
                <li>LTS license is per developer and period is 1 year.</li>
                <li>License needs to be renewed after the expiration to be able to continue using the LTS versions of PrimeNG.</li>
                <li>Licenses can be obtained online at <a href="https://www.primefaces.org/store">PrimeStore</a>.</li>
                <li>Please contact <a href="mailto:contact@primetek.com.tr">PrimeTek</a> regarding any inquiry such as alternative payment methods and license terms.</li>
            </ul>
        </div>
    </section>`
})
export class LicenceDoc {
    @Input() id: string;

    @Input() title: string;
}
