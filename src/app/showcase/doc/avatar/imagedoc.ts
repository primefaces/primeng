import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'avatar-image-demo',
    template: `
        <app-docsectiontext>
            <p>Use the <i>image</i> property to display an image as an Avatar.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex flex-wrap gap-5">
                <div class="flex-auto">
                    <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" styleClass="mr-2" size="xlarge" shape="circle" />
                    <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png" styleClass="mr-2" size="large" shape="circle" />
                    <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png" styleClass="mr-2" shape="circle" />
                </div>
                <div class="flex-auto">
                    <h5>Badge</h5>
                    <p-avatar pBadge value="4" image="https://primefaces.org/cdn/primeng/images/demo/avatar/walter.jpg" size="xlarge" badgeSize="large" />
                </div>
                <div class="flex-auto">
                    <h5>Gravatar</h5>
                    <p-avatar image="https://www.gravatar.com/avatar/05dfd4b41340d09cae045235eb0893c3?d=mp" styleClass="flex align-items-center justify-content-center mr-2" size="xlarge" />
                </div>
            </div>
        </div>
        <app-code [code]="code" selector="avatar-image-demo"></app-code>
    `
})
export class ImageDoc {
    code: Code = {
        basic: `<p-avatar 
    image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" 
    styleClass="mr-2" 
    size="xlarge" 
    shape="circle" />
<p-avatar 
    image="https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png" 
    styleClass="mr-2" 
    size="large" 
    shape="circle" />
<p-avatar 
    image="https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png" 
    styleClass="mr-2" 
    shape="circle" />

<p-avatar 
    pBadge 
    value="4" 
    image="https://primefaces.org/cdn/primeng/images/demo/avatar/walter.jpg" 
    size="xlarge"
    badgeSize="large" />

<p-avatar 
    image="https://www.gravatar.com/avatar/05dfd4b41340d09cae045235eb0893c3?d=mp" 
    styleClass="flex align-items-center justify-content-center mr-2" 
    size="xlarge" />`,
        html: `<div class="card">
    <div class="flex flex-wrap gap-5">
        <div class="flex-auto">
            <p-avatar 
                image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" 
                styleClass="mr-2" 
                size="xlarge" 
                shape="circle" />
            <p-avatar 
                image="https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png" 
                styleClass="mr-2" 
                size="large" 
                shape="circle" />
            <p-avatar 
                image="https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png" 
                styleClass="mr-2" 
                shape="circle" />
        </div>
        <div class="flex-auto">
            <h5>Badge</h5>
            <p-avatar 
                pBadge 
                value="4" 
                image="https://primefaces.org/cdn/primeng/demo/avatar/walter.jpg" 
                size="xlarge"
                badgeSize="large" />
        </div>
        <div class="flex-auto">
            <h5>Gravatar</h5>
            <p-avatar 
                image="https://www.gravatar.com/avatar/05dfd4b41340d09cae045235eb0893c3?d=mp" 
                styleClass="flex align-items-center justify-content-center mr-2" 
                size="xlarge" />
        </div>
    </div>
</div>`,
        typescript: `import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';

@Component({
    selector: 'avatar-image-demo',
    templateUrl: './avatar-image-demo.html',
    standalone: true,
    imports: [AvatarModule, BadgeModule]
})
export class AvatarImageDemo {}`
    };
}
