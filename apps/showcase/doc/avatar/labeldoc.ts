import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'avatar-label-demo',
    template: `
        <app-docsectiontext>
            <p>A letter Avatar is defined with the <i>label</i> property.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex flex-wrap gap-8">
                <div class="flex-auto">
                    <h5>Label</h5>
                    <p-avatar label="P" styleClass="mr-2" size="xlarge" />
                    <p-avatar label="V" styleClass="mr-2" size="large" [style]="{ 'background-color': '#ece9fc', color: '#2a1261' }" />
                    <p-avatar label="U" styleClass="mr-2" [style]="{ 'background-color': '#dee9fc', color: '#1a2551' }" />
                </div>
                <div class="flex-auto">
                    <h5>Circle</h5>
                    <p-avatar label="P" styleClass="mr-2" size="xlarge" shape="circle" />
                    <p-avatar label="V" styleClass="mr-2" size="large" [style]="{ 'background-color': '#ece9fc', color: '#2a1261' }" shape="circle" />
                    <p-avatar label="U" styleClass="mr-2" [style]="{ 'background-color': '#dee9fc', color: '#1a2551' }" shape="circle" />
                </div>
                <div class="flex-auto">
                    <h5>Badge</h5>
                    <p-overlay-badge value="4" severity="danger" class="inline-flex">
                        <p-avatar label="U" size="xlarge" />
                    </p-overlay-badge>
                </div>
            </div>
        </div>
        <app-code [code]="code" selector="avatar-label-demo"></app-code>
    `
})
export class LabelDoc {
    code: Code = {
        basic: `<p-avatar label="P" styleClass="mr-2" size="xlarge" />
<p-avatar label="V" styleClass="mr-2" size="large" [style]="{ 'background-color': '#ece9fc', color: '#2a1261' }" />
<p-avatar label="U" styleClass="mr-2" [style]="{ 'background-color': '#dee9fc', color: '#1a2551' }" />
<p-avatar label="P" styleClass="mr-2" size="xlarge" shape="circle" />
<p-avatar label="V" styleClass="mr-2" size="large" [style]="{ 'background-color': '#ece9fc', color: '#2a1261' }" shape="circle" />
<p-avatar label="U" styleClass="mr-2" [style]="{ 'background-color': '#dee9fc', color: '#1a2551' }" shape="circle" />

<p-overlay-badge value="4" severity="danger" class="inline-flex">
    <p-avatar label="U" size="xlarge" />
</p-overlay-badge>`,

        html: `<div class="card">
    <div class="flex flex-wrap gap-8">
        <div class="flex-auto">
            <h5>Label</h5>
            <p-avatar label="P" styleClass="mr-2" size="xlarge" />
            <p-avatar label="V" styleClass="mr-2" size="large" [style]="{ 'background-color': '#ece9fc', color: '#2a1261' }" />
            <p-avatar label="U" styleClass="mr-2" [style]="{ 'background-color': '#dee9fc', color: '#1a2551' }" />
        </div>
        <div class="flex-auto">
            <h5>Circle</h5>
            <p-avatar label="P" styleClass="mr-2" size="xlarge" shape="circle" />
            <p-avatar
                label="V"
                styleClass="mr-2"
                size="large"
                [style]="{ 'background-color': '#ece9fc', color: '#2a1261' }"
                shape="circle"
            />
            <p-avatar label="U" styleClass="mr-2" [style]="{ 'background-color': '#dee9fc', color: '#1a2551' }" shape="circle" />
        </div>
        <div class="flex-auto">
            <h5>Badge</h5>
            <p-overlay-badge value="4" severity="danger" class="inline-flex">
                <p-avatar label="U" size="xlarge" />
            </p-overlay-badge>
        </div>
    </div>
</div>`,
        typescript: `import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

@Component({
    selector: 'avatar-label-demo',
    templateUrl: './avatar-label-demo.html',
    standalone: true,
    imports: [AvatarModule, OverlayBadgeModule]
})
export class AvatarLabelDemo {}`
    };
}
