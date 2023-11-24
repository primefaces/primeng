import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'avatar-icon-demo',
    template: `
        <app-docsectiontext>
            <p>A font icon is displayed as an Avatar with the <i>icon</i> property.</p>
        </app-docsectiontext>
        <div class="grid card grid-nogutter">
            <div class="col-12 md:col-4">
                <h5>Icon</h5>
                <p-avatar icon="pi pi-user" styleClass="mr-2" size="xlarge"></p-avatar>
                <p-avatar icon="pi pi-user" styleClass="mr-2" size="large" [style]="{ 'background-color': '#2196F3', color: '#ffffff' }"></p-avatar>
                <p-avatar icon="pi pi-user" styleClass="mr-2" [style]="{ 'background-color': '#9c27b0', color: '#ffffff' }"></p-avatar>
            </div>
            <div class="col-12 md:col-4">
                <h5>Icon - Circle</h5>
                <p-avatar icon="pi pi-user" styleClass="mr-2" size="xlarge" shape="circle"></p-avatar>
                <p-avatar icon="pi pi-user" styleClass="mr-2" size="large" [style]="{ 'background-color': '#2196F3', color: '#ffffff' }" shape="circle"></p-avatar>
                <p-avatar icon="pi pi-user" styleClass="mr-2" [style]="{ 'background-color': '#9c27b0', color: '#ffffff' }" shape="circle"></p-avatar>
            </div>
            <div class="col-12 md:col-4">
                <h5>Icon - Badge</h5>
                <p-avatar icon="pi pi-user" pBadge value="4" severity="success" styleClass="mr-2" size="large"></p-avatar>
            </div>
        </div>
        <app-code [code]="code" selector="avatar-icon-demo"></app-code>
    `
})
export class IconDoc {

    code: Code = {
        basic: `
<p-avatar icon="pi pi-user" styleClass="mr-2" size="xlarge"></p-avatar>`,
        html: `
<div class="grid card grid-nogutter">
    <div class="col-12 md:col-4">
    <h5>Icon</h5>
        <p-avatar icon="pi pi-user" styleClass="mr-2"></p-avatar>
        <p-avatar icon="pi pi-user" styleClass="mr-2" size="large" [style]="{'background-color':'#2196F3', 'color': '#ffffff'}"></p-avatar>
        <p-avatar icon="pi pi-user" styleClass="mr-2" [style]="{'background-color': '#9c27b0', 'color': '#ffffff'}"></p-avatar>
    </div>
    <div class="col-12 md:col-4">
    <h5>Icon - Circle</h5>
        <p-avatar icon="pi pi-user" styleClass="mr-2" shape="circle"></p-avatar>
        <p-avatar icon="pi pi-user" styleClass="mr-2" size="large" [style]="{'background-color':'#2196F3', 'color': '#ffffff'}" shape="circle"></p-avatar>
        <p-avatar icon="pi pi-user" styleClass="mr-2" [style]="{'background-color': '#9c27b0', 'color': '#ffffff'}" shape="circle"></p-avatar>
    </div>
    <div class="col-12 md:col-4">
        <h5>Icon - Badge</h5>
        <p-avatar icon="pi pi-user" pBadge value="4" severity="success" styleClass="mr-2" size="large"></p-avatar>
    </div>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'avatar-icon-demo',
    templateUrl: './avatar-icon-demo.html'
})
export class AvatarIconDemo {}`
    };
}
