import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'avatar-group-demo',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Grouping is available by wrapping multiple Avatar components inside an <i>AvatarGroup</i>.</p>
        </app-docsectiontext>
        <div class="card justify-content-center">
            <p-avatarGroup styleClass="mb-3">
                <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" size="large" shape="circle"></p-avatar>
                <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png" size="large" shape="circle"></p-avatar>
                <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png" size="large" shape="circle"></p-avatar>
                <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/ionibowcher.png" size="large" shape="circle"></p-avatar>
                <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/xuxuefeng.png" size="large" shape="circle"></p-avatar>
                <p-avatar label="+2" shape="circle" size="large" [style]="{ 'background-color': '#9c27b0', color: '#ffffff' }"></p-avatar>
            </p-avatarGroup>
        </div>
        <app-code [code]="code" selector="avatar-group-demo"></app-code>
    </section>`
})
export class GroupDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<p-avatarGroup styleClass="mb-3">
    <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" size="large" shape="circle"></p-avatar>
    <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png" size="large" shape="circle"></p-avatar>
</p-avatarGroup>`,
        html: `
<div class="card justify-content-center">
    <p-avatarGroup styleClass="mb-3">
        <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" size="large" shape="circle"></p-avatar>
        <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png" size="large" shape="circle"></p-avatar>
        <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png" size="large" shape="circle"></p-avatar>
        <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/ionibowcher.png" size="large" shape="circle"></p-avatar>
        <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/xuxuefeng.png" size="large" shape="circle"></p-avatar>
        <p-avatar label="+2" shape="circle" size="large" [style]="{ 'background-color': '#9c27b0', color: '#ffffff' }"></p-avatar>
    </p-avatarGroup>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'avatar-group-demo',
    templateUrl: './avatar-group-demo.html'
})
export class AvatarGroupDemo {}`
    };
}
