import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'avatar-image-demo',
    template: `
        <app-docsectiontext>
            <p>Use the <i>image</i> property to display an image as an Avatar.</p>
        </app-docsectiontext>
        <div class="card">
            <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" styleClass="mr-2" size="xlarge" shape="circle"></p-avatar>
            <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png" styleClass="mr-2" size="large" shape="circle"></p-avatar>
            <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png" styleClass="mr-2" shape="circle"></p-avatar>
        </div>
        <app-code [code]="code" selector="avatar-image-demo"></app-code>
    `
})
export class ImageDoc {
    code: Code = {
        basic: `<p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" styleClass="mr-2" size="xlarge" shape="circle"></p-avatar>`,
        html: `
<div class="card">
    <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" styleClass="mr-2" size="xlarge" shape="circle"></p-avatar>
    <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png" styleClass="mr-2" size="large" shape="circle"></p-avatar>
    <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png" styleClass="mr-2" shape="circle"></p-avatar>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'avatar-image-demo',
    templateUrl: './avatar-image-demo.html'
})
export class AvatarImageDemo {}`
    };
}
