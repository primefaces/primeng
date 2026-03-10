import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'template-doc',
    standalone: true,
    imports: [FormsModule, RatingModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Templating allows customizing the content where the icon instance is available as the implicit variable.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-rating [(ngModel)]="value">
                    <ng-template #onicon>
                        <img src="https://primefaces.org/cdn/primeng/images/demo/rating/custom-icon-active.png" height="24" width="24" />
                    </ng-template>
                    <ng-template #officon>
                        <img src="https://primefaces.org/cdn/primeng/images/demo/rating/custom-icon.png" height="24" width="24" />
                    </ng-template>
                </p-rating>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class TemplateDoc {
    value!: number;
}
