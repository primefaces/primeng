import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'licence-doc',
    standalone: true,
    imports: [AppDocSectionText],
    template: `<app-docsectiontext>
        <ul class="leading-normal px-10 mb-2 list-disc">
            <li>
                <div class="font-bold">Will purchasing a PrimeBlocks license include access to PrimeOne components?</div>
                <p>No. The PrimeBlocks license does not grant access to the PrimeOne UI Kit. They are separate products with individual licenses.</p>
            </li>
        </ul>
    </app-docsectiontext>`
})
export class LicenceDoc {}
