import { Component } from '@angular/core';
import { AppDocModule } from '@/components/doc/app.doc.module';

@Component({
    selector: 'tokens-doc',
    standalone: true,
    imports: [AppDocModule],
    template: `<app-docsectiontext>
        <ul class="leading-normal px-10 mb-2 list-disc">
            <li>
                <div class="font-bold">Is Tokens Studio too slow?</div>
                <p>This might be caused by using the wrong Apply method when pushing your changes. Since PrimeOne is a large file, using <b>Apply to Document</b> can result in very long processing times.</p>
                <p>We recommend using <b>Apply to Selection</b> or <b>Apply to Page</b> instead for better performance.</p>
            </li>
        </ul>
    </app-docsectiontext>`
})
export class TokensDoc {}
