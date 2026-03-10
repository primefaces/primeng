import { Component } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'template-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, AppDemoWrapper, ImageModule],
    template: `
        <app-docsectiontext>
            <p>An eye icon is displayed by default when the image is hovered in preview mode. Use the <i>indicator</i> template for custom content.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-image src="https://primefaces.org/cdn/primeng/images/galleria/galleria11.jpg" [preview]="true" alt="Image" width="250">
                    <ng-template #indicator>
                        <i class="pi pi-search"></i>
                    </ng-template>
                    <ng-template #image>
                        <img src="https://primefaces.org/cdn/primeng/images/galleria/galleria11.jpg" alt="image" width="250" />
                    </ng-template>
                    <ng-template #preview let-style="style" let-previewCallback="previewCallback">
                        <img src="https://primefaces.org/cdn/primeng/images/galleria/galleria11.jpg" alt="image" [style]="style" (click)="previewCallback()" />
                    </ng-template>
                </p-image>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class TemplateDoc {}
