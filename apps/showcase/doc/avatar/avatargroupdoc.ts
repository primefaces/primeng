import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'avatar-group-demo',
    template: `
        <app-docsectiontext>
            <p>Grouping is available by wrapping multiple Avatar components inside an <i>AvatarGroup</i>.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-avatar-group>
                <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" size="large" shape="circle" />
                <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png" size="large" shape="circle" />
                <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png" size="large" shape="circle" />
                <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/ionibowcher.png" size="large" shape="circle" />
                <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/xuxuefeng.png" size="large" shape="circle" />
                <p-avatar label="+2" shape="circle" size="large" />
            </p-avatar-group>
        </div>
        <app-code [code]="code" selector="avatar-group-demo"></app-code>
    `
})
export class GroupDoc {
    code: Code = {
        basic: `<p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" size="large" shape="circle" />
<p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png" size="large" shape="circle" />
<p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png" size="large" shape="circle" />
<p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/ionibowcher.png" size="large" shape="circle" />
<p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/xuxuefeng.png" size="large" shape="circle" />
<p-avatar label="+2" shape="circle" size="large" />`,
        html: `<div class="card flex justify-center">
    <p-avatar-group>
        <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" size="large" shape="circle" />
        <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png" size="large" shape="circle" />
        <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png" size="large" shape="circle" />
        <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/ionibowcher.png" size="large" shape="circle" />
        <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/xuxuefeng.png" size="large" shape="circle" />
        <p-avatar label="+2" shape="circle" size="large" />
    </p-avatar-group>
</div>`,
        typescript: `import { Component } from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { AvatarGroup } from 'primeng/avatargroup';

@Component({
    selector: 'avatar-group-demo',
    templateUrl: './avatar-group-demo.html',
    standalone: true,
    imports: [Avatar, AvatarGroup]
})
export class AvatarGroupDemo {}`
    };
}
