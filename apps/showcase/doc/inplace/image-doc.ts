import { Component } from '@angular/core';
import { InplaceModule } from 'primeng/inplace';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'image-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, AppDemoWrapper, InplaceModule],
    template: `
        <app-docsectiontext>
            <p>Any content such as an image can be placed inside an Inplace.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <p-inplace>
                <ng-template #display>
                    <span class="inline-flex items-center gap-2">
                        <span class="pi pi-image" style="vertical-align: middle"></span>
                        <span class="ml-2 text-sm">View Photo</span>
                    </span>
                </ng-template>
                <ng-template #content>
                    <img class="w-full sm:w-80 shadow-md" src="https://primefaces.org/cdn/primeng/images/demo/galleria/galleria5.jpg" alt="Nature" />
                </ng-template>
            </p-inplace>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class ImageDoc {}
