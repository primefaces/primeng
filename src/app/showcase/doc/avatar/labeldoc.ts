import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'avatar-label-demo',
    template: `
        <app-docsectiontext>
            <p>A letter Avatar is defined with the <i>label</i> property.</p>
        </app-docsectiontext>
        <div class="card grid grid-nogutter">
            <div class="col-12 md:col-4">
                <h5>Label</h5>
                <p-avatar label="P" styleClass="mr-2" size="xlarge"></p-avatar>
                <p-avatar label="V" styleClass="mr-2" size="large" [style]="{ 'background-color': '#2196F3', color: '#ffffff' }"></p-avatar>
                <p-avatar label="U" styleClass="mr-2" [style]="{ 'background-color': '#9c27b0', color: '#ffffff' }"></p-avatar>
            </div>
            <div class="col-12 md:col-4">
                <h5>Label - Circle</h5>
                <p-avatar label="P" styleClass="mr-2" size="xlarge" shape="circle"></p-avatar>
                <p-avatar label="V" styleClass="mr-2" size="large" [style]="{ 'background-color': '#2196F3', color: '#ffffff' }" shape="circle"></p-avatar>
                <p-avatar label="U" styleClass="mr-2" [style]="{ 'background-color': '#9c27b0', color: '#ffffff' }" shape="circle"></p-avatar>
            </div>
            <div class="col-12 md:col-4">
                <h5>Label - Badge</h5>
                <p-avatar label="U" pBadge styleClass="mr-5" value="4" size="large" [style]="{ 'background-color': '#4caf4f', color: '#ffffff' }"></p-avatar>
            </div>
        </div>
        <app-code [code]="code" selector="avatar-label-demo"></app-code>
    `
})
export class LabelDoc {
    code: Code = {
        basic: `<div class="col-12 md:col-4">
    <h5>Label</h5>
    <p-avatar label="P" styleClass="mr-2" size="xlarge"></p-avatar>
    <p-avatar label="V" styleClass="mr-2" size="large" [style]="{ 'background-color': '#2196F3', color: '#ffffff' }"></p-avatar>
    <p-avatar label="U" styleClass="mr-2" [style]="{ 'background-color': '#9c27b0', color: '#ffffff' }"></p-avatar>
</div>
<div class="col-12 md:col-4">
    <h5>Label - Circle</h5>
    <p-avatar label="P" styleClass="mr-2" size="xlarge" shape="circle"></p-avatar>
    <p-avatar label="V" styleClass="mr-2" size="large" [style]="{ 'background-color': '#2196F3', color: '#ffffff' }" shape="circle"></p-avatar>
    <p-avatar label="U" styleClass="mr-2" [style]="{ 'background-color': '#9c27b0', color: '#ffffff' }" shape="circle"></p-avatar>
</div>
<div class="col-12 md:col-4">
    <h5>Label - Badge</h5>
    <p-avatar label="U" pBadge styleClass="mr-5" value="4" size="large" [style]="{ 'background-color': '#4caf4f', color: '#ffffff' }"></p-avatar>
</div>`,
        html: `
<div class="card grid grid-nogutter">
    <div class="col-12 md:col-4">
        <h5>Label</h5>
        <p-avatar label="P" styleClass="mr-2" size="xlarge"></p-avatar>
        <p-avatar label="V" styleClass="mr-2" size="large" [style]="{ 'background-color': '#2196F3', color: '#ffffff' }"></p-avatar>
        <p-avatar label="U" styleClass="mr-2" [style]="{ 'background-color': '#9c27b0', color: '#ffffff' }"></p-avatar>
    </div>
    <div class="col-12 md:col-4">
        <h5>Label - Circle</h5>
        <p-avatar label="P" styleClass="mr-2" size="xlarge" shape="circle"></p-avatar>
        <p-avatar label="V" styleClass="mr-2" size="large" [style]="{ 'background-color': '#2196F3', color: '#ffffff' }" shape="circle"></p-avatar>
        <p-avatar label="U" styleClass="mr-2" [style]="{ 'background-color': '#9c27b0', color: '#ffffff' }" shape="circle"></p-avatar>
    </div>
    <div class="col-12 md:col-4">
        <h5>Label - Badge</h5>
        <p-avatar label="U" pBadge styleClass="mr-5" value="4" size="large" [style]="{ 'background-color': '#4caf4f', color: '#ffffff' }"></p-avatar>
    </div>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'avatar-label-demo',
    templateUrl: './avatar-label-demo.html'
})
export class AvatarLabelDemo {}`
    };
}
