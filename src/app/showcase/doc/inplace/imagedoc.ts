import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'image-doc',
    template: `
        <app-docsectiontext>
            <p>Any content such as an image can be placed inside an Inplace.</p>
        </app-docsectiontext>
        <div class="card">
            <p-inplace>
                <ng-template pTemplate="display">
                    <div class="inline-flex align-items-center">
                        <span class="pi pi-image" style="vertical-align: middle"></span>
                        <span class="ml-2">View Picture</span>
                    </div>
                </ng-template>
                <ng-template pTemplate="content">
                    <img src="https://primefaces.org/cdn/primeng/images/demo/galleria/galleria5.jpg" alt="Nature" />
                </ng-template>
            </p-inplace>
        </div>
        <app-code [code]="code" selector="inplace-image-demo"></app-code>
    `
})
export class ImageDoc {
    code: Code = {
        basic: `<p-inplace>
    <ng-template pTemplate="display">
        <div class="inline-flex align-items-center">
            <span class="pi pi-image" style="vertical-align: middle"></span>
            <span class="ml-2">View Picture</span>
        </div>
    </ng-template>
    <ng-template pTemplate="content">
        <img 
            src="https://primefaces.org/cdn/primeng/images/demo/galleria/galleria5.jpg" 
            alt="Nature" />
    </ng-template>
</p-inplace>`,
        html: `<div class="card">
    <p-inplace>
        <ng-template pTemplate="display">
            <div class="inline-flex align-items-center">
                <span class="pi pi-image" style="vertical-align: middle"></span>
                <span class="ml-2">View Picture</span>
            </div>
        </ng-template>
        <ng-template pTemplate="content">
            <img 
                src="https://primefaces.org/cdn/primeng/images/demo/galleria/galleria5.jpg" 
                alt="Nature" />
        </ng-template>
    </p-inplace>
</div>`,
        typescript: `import { Component } from '@angular/core';
import { InplaceModule } from 'primeng/inplace';

@Component({
    selector: 'inplace-image-demo',
    templateUrl: './inplace-image-demo.html',
    standalone: true,
    imports: [InplaceModule]
})
export class InplaceImageDemo {}`
    };
}
