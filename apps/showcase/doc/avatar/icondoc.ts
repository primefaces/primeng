import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'avatar-icon-demo',
    template: `
        <app-docsectiontext>
            <p>A font icon is displayed as an Avatar with the <i>icon</i> property.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex flex-wrap gap-8">
                <div class="flex-auto">
                    <h5>Icon</h5>
                    <p-avatar icon="pi pi-user" class="mr-2" size="xlarge" />
                    <p-avatar icon="pi pi-user" class="mr-2" size="large" style="background-color: #ece9fc; color: #2a1261" />
                    <p-avatar icon="pi pi-user" style="background-color: #dee9fc; color: #1a2551" />
                </div>

                <div class="flex-auto">
                    <h5>Circle</h5>
                    <p-avatar icon="pi pi-user" class="mr-2" size="xlarge" shape="circle" />
                    <p-avatar icon="pi pi-user" class="mr-2" size="large" style="background-color: #ece9fc; color: #2a1261" shape="circle" />
                    <p-avatar icon="pi pi-user" style="background-color: #dee9fc; color: #1a2551" shape="circle" />
                </div>

                <div class="flex-auto">
                    <h5>Badge</h5>
                    <p-overlay-badge value="4" severity="danger" class="inline-flex">
                        <p-avatar icon="pi pi-user" size="xlarge" />
                    </p-overlay-badge>
                </div>
            </div>
        </div>
        <app-code [code]="code" selector="avatar-icon-demo"></app-code>
    `
})
export class IconDoc {
    code: Code = {
        basic: `<p-avatar icon="pi pi-user" class="mr-2" size="xlarge" />
<p-avatar icon="pi pi-user" class="mr-2" size="large" style="background-color: #ece9fc; color: #2a1261" />
<p-avatar icon="pi pi-user" style="background-color: #dee9fc; color: #1a2551" />
<p-avatar icon="pi pi-user" class="mr-2" size="xlarge" shape="circle" />
<p-avatar icon="pi pi-user" class="mr-2" size="large" style="background-color: #ece9fc; color: #2a1261" shape="circle" />
<p-avatar icon="pi pi-user" style="background-color: #dee9fc; color: #1a2551" shape="circle" />

<p-overlay-badge value="4" severity="danger" class="inline-flex">
    <p-avatar icon="pi pi-user" size="xlarge" />
</p-overlay-badge>`,

        html: `<div class="card">
    <div class="flex flex-wrap gap-8">
        <div class="flex-auto">
            <h5>Icon</h5>
            <p-avatar icon="pi pi-user" class="mr-2" size="xlarge" />
            <p-avatar icon="pi pi-user" class="mr-2" size="large" style="background-color: #ece9fc; color: #2a1261" />
            <p-avatar icon="pi pi-user" style="background-color: #dee9fc; color: #1a2551" />
        </div>

        <div class="flex-auto">
            <h5>Circle</h5>
            <p-avatar icon="pi pi-user" class="mr-2" size="xlarge" shape="circle" />
            <p-avatar
                icon="pi pi-user"
                class="mr-2"
                size="large"
                style="background-color: #ece9fc; color: #2a1261"
                shape="circle"
            />
            <p-avatar icon="pi pi-user" style="background-color: #dee9fc; color: #1a2551" shape="circle" />
        </div>

        <div class="flex-auto">
            <h5>Badge</h5>
            <p-overlay-badge value="4" severity="danger" class="inline-flex">
                <p-avatar icon="pi pi-user" size="xlarge" />
            </p-overlay-badge>
        </div>
    </div>
</div>`,
        typescript: `import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

@Component({
    selector: 'avatar-icon-demo',
    templateUrl: './avatar-icon-demo.html',
    standalone: true,
    imports: [AvatarModule, OverlayBadgeModule]
})
export class AvatarIconDemo {}`
    };
}
