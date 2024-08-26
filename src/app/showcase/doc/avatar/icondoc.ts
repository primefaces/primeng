import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'avatar-icon-demo',
    template: `
        <app-docsectiontext>
            <p>A font icon is displayed as an Avatar with the <i>icon</i> property.</p>
        </app-docsectiontext>
        <div class="grid grid-cols-12 gap-4 card grid-nogutter">
            <div class="col-span-12 md:col-span-4">
                <h5>Icon</h5>
                <p-avatar icon="pi pi-user" styleClass="mr-2" size="xlarge" />
                <p-avatar icon="pi pi-user" styleClass="mr-2" size="large" [style]="{ 'background-color': '#ece9fc', color: '#2a1261' }" />
                <p-avatar icon="pi pi-user" styleClass="mr-2" [style]="{ 'background-color': '#dee9fc', color: '#1a2551' }" />
            </div>
            <div class="col-span-12 md:col-span-4">
                <h5>Icon - Circle</h5>
                <p-avatar icon="pi pi-user" styleClass="mr-2" size="xlarge" shape="circle" />
                <p-avatar icon="pi pi-user" styleClass="mr-2" size="large" [style]="{ 'background-color': '#ece9fc', color: '#2a1261' }" shape="circle" />
                <p-avatar icon="pi pi-user" styleClass="mr-2" [style]="{ 'background-color': '#dee9fc', color: '#1a2551' }" shape="circle" />
            </div>
            <div class="col-span-12 md:col-span-4">
                <h5>Badge</h5>
                <p-avatar icon="pi pi-user" pBadge value="4" size="xlarge" badgeSize="large" />
            </div>
        </div>
        <app-code [code]="code" selector="avatar-icon-demo"></app-code>
    `
})
export class IconDoc {
    code: Code = {
        basic: `<p-avatar 
    icon="pi pi-user" 
    styleClass="mr-2" size="xlarge" />
<p-avatar 
    icon="pi pi-user" 
    styleClass="mr-2"
    size="large" 
    [style]="{ 'background-color': '#ece9fc', color: '#2a1261' }" />
<p-avatar 
    icon="pi pi-user" 
    styleClass="mr-2" 
    [style]="{ 'background-color': '#dee9fc', color: '#1a2551' }" />

<p-avatar 
    icon="pi pi-user" 
    styleClass="mr-2" 
    size="xlarge" 
    shape="circle" />
<p-avatar 
    icon="pi pi-user" 
    styleClass="mr-2" 
    size="large" 
    [style]="{ 'background-color': '#ece9fc', color: '#2a1261' }" 
    shape="circle" />
<p-avatar 
    icon="pi pi-user" 
    styleClass="mr-2" 
    [style]="{ 'background-color': '#dee9fc', color: '#1a2551' }" 
    shape="circle" />
        
<p-avatar 
    icon="pi pi-user" 
    pBadge 
    value="4" 
    size="xlarge"
    badgeSize="large" />`,
        html: `<div class="col-span-12 md:col-span-4">
        <h5>Icon</h5>
        <p-avatar 
            icon="pi pi-user" 
            styleClass="mr-2" 
            size="xlarge" />
        <p-avatar 
            icon="pi pi-user" 
            styleClass="mr-2" 
            size="large" 
            [style]="{ 'background-color': '#ece9fc', color: '#2a1261' }" />
        <p-avatar 
            icon="pi pi-user" 
            styleClass="mr-2" 
            [style]="{ 'background-color': '#dee9fc', color: '#1a2551' }" />
    </div>
    <div class="col-span-12 md:col-span-4">
        <h5>Icon - Circle</h5>
        <p-avatar 
            icon="pi pi-user" 
            styleClass="mr-2" 
            size="xlarge" 
            shape="circle" />
        <p-avatar 
            icon="pi pi-user" 
            styleClass="mr-2"
            size="large" 
            [style]="{ 'background-color': '#ece9fc', color: '#2a1261' }"
            shape="circle" />
        <p-avatar 
            icon="pi pi-user" 
            styleClass="mr-2" 
            [style]="{ 'background-color': '#dee9fc', color: '#1a2551' }" 
            shape="circle" />
    </div>
    <div class="col-span-12 md:col-span-4">
        <h5>Badge</h5>
        <p-avatar 
            icon="pi pi-user" 
            pBadge 
            value="4" 
            size="xlarge"
            badgeSize="large" />
    </div>`,
        typescript: `import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
        
@Component({
    selector: 'avatar-icon-demo',
    templateUrl: './avatar-icon-demo.html',
    standalone: true,
    imports: [AvatarModule, BadgeModule]
})
export class AvatarIconDemo {}`
    };
}
