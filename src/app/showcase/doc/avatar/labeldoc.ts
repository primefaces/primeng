import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'avatar-label-demo',
    template: `
        <app-docsectiontext>
            <p>A letter Avatar is defined with the <i>label</i> property.</p>
        </app-docsectiontext>
        <div class="card grid grid-nogutter">
            <div class="col-12 md:col-4">
                <h5>Label</h5>
                <p-avatar label="P" styleClass="mr-2" size="xlarge" />
                <p-avatar label="V" styleClass="mr-2" size="large" [style]="{ 'background-color': '#ece9fc', color: '#2a1261' }" />
                <p-avatar label="U" styleClass="mr-2" [style]="{ 'background-color': '#dee9fc', color: '#1a2551' }" />
            </div>
            <div class="col-12 md:col-4">
                <h5>Label - Circle</h5>
                <p-avatar label="P" styleClass="mr-2" size="xlarge" shape="circle" />
                <p-avatar label="V" styleClass="mr-2" size="large" [style]="{ 'background-color': '#ece9fc', color: '#2a1261' }" shape="circle" />
                <p-avatar label="U" styleClass="mr-2" [style]="{ 'background-color': '#dee9fc', color: '#1a2551' }" shape="circle" />
            </div>
            <div class="col-12 md:col-4">
                <h5>Badge</h5>
                <p-avatar label="U" pBadge styleClass="mr-2" value="4" size="xlarge" />
            </div>
        </div>
        <app-code [code]="code" selector="avatar-label-demo"></app-code>
    `
})
export class LabelDoc {
    code: Code = {
        basic: `<p-avatar 
    label="P" 
    styleClass="mr-2" 
    size="xlarge" />
<p-avatar 
    label="V" 
    styleClass="mr-2" 
    size="large" 
    [style]="{ 'background-color': '#ece9fc', color: '#2a1261' }" />
<p-avatar 
    label="U"
    styleClass="mr-2" 
    [style]="{ 'background-color': '#dee9fc', color: '#1a2551' }" />

<p-avatar 
    label="P" 
    styleClass="mr-2" 
    size="xlarge" 
    shape="circle" />
<p-avatar 
    label="V" 
    styleClass="mr-2" 
    size="large" 
    [style]="{ 'background-color': '#ece9fc', color: '#2a1261' }" 
    shape="circle" />
<p-avatar 
    label="U" 
    styleClass="mr-2" 
    [style]="{ 'background-color': '#dee9fc', color: '#1a2551' }" 
    shape="circle" />

<p-avatar 
    label="U" 
    pBadge 
    styleClass="mr-2" 
    value="4" 
    size="xlarge" />`,
        html: `<div class="card grid grid-nogutter">
    <div class="col-12 md:col-4">
        <h5>Label</h5>
        <p-avatar 
            label="P" 
            styleClass="mr-2" 
            size="xlarge" />
        <p-avatar 
            label="V"
            styleClass="mr-2" 
            size="large" 
            [style]="{ 'background-color': '#ece9fc', color: '#2a1261' }" />
        <p-avatar 
            label="U" 
            styleClass="mr-2" 
            [style]="{ 'background-color': '#dee9fc', color: '#1a2551' }" />
    </div>
    <div class="col-12 md:col-4">
        <h5>Label - Circle</h5>
        <p-avatar 
            label="P" 
            styleClass="mr-2" 
            size="xlarge" 
            shape="circle" />
        <p-avatar 
            label="V" 
            styleClass="mr-2" 
            size="large" 
            [style]="{ 'background-color': '#ece9fc', color: '#2a1261' }" 
            shape="circle" />
        <p-avatar 
            label="U" 
            styleClass="mr-2" 
            [style]="{ 'background-color': '#dee9fc', color: '#1a2551' }" 
            shape="circle" />
    </div>
    <div class="col-12 md:col-4">
        <h5>Badge</h5>
        <p-avatar 
            label="U" 
            pBadge 
            styleClass="mr-2" 
            value="4" 
            size="xlarge" />
    </div>
</div>`,
        typescript: `import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';

@Component({
    selector: 'avatar-label-demo',
    templateUrl: './avatar-label-demo.html',
    standalone: true,
    imports: [AvatarModule, BadgeModule]
})
export class AvatarLabelDemo {}`
    };
}
