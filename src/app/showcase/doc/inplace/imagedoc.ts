import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'image-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
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
    </section>`
})
export class ImageDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
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
</p-inplace>`,
        html: `
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
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'inplace-image-demo',
    templateUrl: './inplace-image-demo.html'
})
export class InplaceImageDemo {}`
    };
}
