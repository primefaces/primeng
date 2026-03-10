import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [AppCode, AppDemoWrapper, AppDocSectionText, CardModule],
    template: `
        <app-docsectiontext>
            <p>A simple Card is created with a <i>header</i> property along with the content as children.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="mb-4 p-8">
                <p-card header="Simple Card">
                    <p class="m-0 text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
                        quas!
                    </p>
                </p-card>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class BasicDoc {}
