import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'avatar-image-demo',
    template: `
        <app-docsectiontext>
            <p>Use the <i>image</i> property to display an image as an Avatar.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex flex-wrap gap-8">
                <div class="flex-auto">
                    <h5>Image</h5>
                    <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" class="mr-2" size="xlarge" shape="circle" />
                    <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png" class="mr-2" size="large" shape="circle" />
                    <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png" shape="circle" />
                </div>

                <div class="flex-auto">
                    <h5>Badge</h5>
                    <p-overlay-badge value="4" severity="danger" class="inline-flex">
                        <p-avatar class="p-overlay-badge" image="https://primefaces.org/cdn/primeng/images/demo/avatar/walter.jpg" size="xlarge" />
                    </p-overlay-badge>
                </div>

                <div class="flex-auto">
                    <h5>Gravatar</h5>
                    <p-avatar image="https://www.gravatar.com/avatar/05dfd4b41340d09cae045235eb0893c3?d=mp" class="flex items-center justify-center mr-2" size="xlarge" />
                </div>
            </div>
        </div>
        <app-code [code]="code" selector="avatar-image-demo"></app-code>
    `
})
export class ImageDoc {
    code: Code = {
        basic: `<p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" class="mr-2" size="xlarge" shape="circle" />
<p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png" class="mr-2" size="large" shape="circle" />
<p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png" shape="circle" />

<p-overlay-badge value="4" severity="danger" class="inline-flex">
    <p-avatar class="p-overlay-badge" image="https://primefaces.org/cdn/primeng/images/demo/avatar/walter.jpg" size="xlarge" />
</p-overlay-badge>

<p-avatar image="https://www.gravatar.com/avatar/05dfd4b41340d09cae045235eb0893c3?d=mp" class="flex items-center justify-center mr-2" size="xlarge" />`,

        html: `<div class="card">
    <div class="flex flex-wrap gap-8">
        <div class="flex-auto">
            <h5>Image</h5>
            <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" class="mr-2" size="xlarge" shape="circle" />
            <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png" class="mr-2" size="large" shape="circle" />
            <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png" shape="circle" />
        </div>

        <div class="flex-auto">
            <h5>Badge</h5>
            <p-overlay-badge value="4" severity="danger" class="inline-flex">
                <p-avatar class="p-overlay-badge" image="https://primefaces.org/cdn/primeng/images/demo/avatar/walter.jpg" size="xlarge" />
            </p-overlay-badge>
        </div>

        <div class="flex-auto">
            <h5>Gravatar</h5>
            <p-avatar image="https://www.gravatar.com/avatar/05dfd4b41340d09cae045235eb0893c3?d=mp" class="flex items-center justify-center mr-2" size="xlarge" />
        </div>
    </div>
</div>`,
        typescript: `import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

@Component({
    selector: 'avatar-image-demo',
    templateUrl: './avatar-image-demo.html',
    standalone: true,
    imports: [AvatarModule, OverlayBadgeModule]
})
export class AvatarImageDemo {}`
    };
}
