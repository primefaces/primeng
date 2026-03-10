import { Component } from '@angular/core';
import { ImageCompareModule } from 'primeng/imagecompare';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, AppDemoWrapper, ImageCompareModule],
    template: `
        <app-docsectiontext>
            <p>Images are defined using templating with <i>left</i> and <i>right</i> templates. Use the <i>style</i> or <i>class</i> properties to define the size of the container.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-imagecompare class="shadow-lg rounded-2xl">
                    <ng-template #left>
                        <img src="https://primefaces.org/cdn/primevue/images/compare/island1.jpg" />
                    </ng-template>
                    <ng-template #right>
                        <img src="https://primefaces.org/cdn/primevue/images/compare/island2.jpg" />
                    </ng-template>
                </p-imagecompare>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class BasicDoc {}
