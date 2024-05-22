import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'chip-image-demo',
    template: `
        <app-docsectiontext>
            <p>The <i>image</i> property is used to display an image like an avatar.</p>
        </app-docsectiontext>
        <div class="card flex align-items-center gap-2 flex-wrap">
            <p-chip label="Amy Elsner" image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" alt="Avatar image" />
            <p-chip label="Asiya Javayant" image="https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png" alt="Avatar image" />
            <p-chip label="Onyama Limba" image="https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png" alt="Avatar image" />
            <p-chip label="Xuxue Feng" image="https://primefaces.org/cdn/primeng/images/demo/avatar/xuxuefeng.png" alt="Avatar image" [removable]="true" />
        </div>
        <app-code [code]="code" selector="chip-image-demo"></app-code>
    `
})
export class ImageDoc {
    code: Code = {
        basic: `<p-chip 
    label="Amy Elsner" 
    image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" 
    alt="Avatar image" />`,
        html: `<div class="card flex align-items-center gap-2 flex-wrap">
    <p-chip 
        label="Amy Elsner" 
        image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" 
        alt="Avatar image" />
    <p-chip 
        label="Asiya Javayant" 
        image="https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png" 
        alt="Avatar image" />
    <p-chip 
        label="Onyama Limba" 
        image="https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png" 
        alt="Avatar image" />
    <p-chip 
        label="Xuxue Feng" 
        image="https://primefaces.org/cdn/primeng/images/demo/avatar/xuxuefeng.png" 
        alt="Avatar image" 
        [removable]="true" />
</div>`,
        typescript: `import { Component } from '@angular/core';
import { ChipModule } from 'primeng/chip';

@Component({
    selector: 'chip-image-demo',
    templateUrl: './chip-image-demo.html',
    standalone: true,
    imports: [ChipModule]
})
export class ChipImageDemo {}`
    };
}
