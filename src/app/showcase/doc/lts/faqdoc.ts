import { Component, Input } from '@angular/core';

@Component({
    selector: 'faq-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id"></app-docsectiontext>
        <div class="card">
            <p-accordion>
                <p-accordionTab header="Is LTS license mandatory to use PrimeNG?">
                    No, latest version of PrimeNG is free to use under the MIT License. Maintenance releases of the latest version are also free to use until a new major version comes which happens every 6 months.
                </p-accordionTab>
                <p-accordionTab header="Is the license per organization, per developer or per cpu/server?"> LTS license is per developer, for example if your team has 5 developers who work with PrimeNG, then 5 licenses are required. </p-accordionTab>
                <p-accordionTab header="How long is the duration of the LTS license?"> Duration is 1 year. </p-accordionTab>
                <p-accordionTab header="What happens after the license duration ends?"> Licenses need to be renewed at PrimeStore. </p-accordionTab>
                <p-accordionTab header="Does the license renew automatically?"> No, renewal should be done manually at PrimeStore. </p-accordionTab>
                <p-accordionTab header="Is it possible to add developers to the existing license?">
                    At PrimeStore there is an option to add developers to an existing license in case your team grows. Fee is calculated based on the remaining time until the expiry of your license.
                </p-accordionTab>
                <p-accordionTab header="Does LTS provide a support contact?"> No, PrimeNG PRO is the service where response of PrimeTek engineers is secured within 1 business day. </p-accordionTab>
                <p-accordionTab header="How about the older versions that are not covered by LTS?"> PrimeNG PRO covers versions even that are not covered by the LTS. </p-accordionTab>
                <p-accordionTab header="Does PRO provide access to the LTS releases?"> Yes, PRO users are granted licenses to access LTS releases. </p-accordionTab>
                <p-accordionTab header="What is the difference between LTS and PRO?">
                    PrimeNG PRO is a premium support service delivered via <a href="htps://pro.primefaces.org">pro.primefaces.org</a> where support engineers of PrimeTek provide assistance within 1 business day to the raised tickets. LTS on the other
                    hand provides a license to utilize the long term support versions.
                </p-accordionTab>
            </p-accordion>
        </div>
    </section>`
})
export class FaqDoc {
    @Input() id: string;

    @Input() title: string;
}
