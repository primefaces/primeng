import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'avatar-size-demo',
    template: `
        <app-docsectiontext>
            <p><i>size</i> property defines the size of the Avatar with <i>large</i> and <i>xlarge</i> as possible values.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center gap-2">
            <p-avatar label="P" size="large"></p-avatar>
            <p-avatar label="T" size="xlarge"></p-avatar>
        </div>
        <app-code [code]="code" selector="avatar-size-demo"></app-code>
    `
})
export class SizeDoc {
    code: Code = {
        basic: `<p-avatar label="P" size="large"></p-avatar>
<p-avatar label="T" size="xlarge"></p-avatar>`,
        html: `
<div class="card flex justify-content-center gap-2">
    <p-avatar label="P" size="large"></p-avatar>
    <p-avatar label="T" size="xlarge"></p-avatar>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'avatar-size-demo',
    templateUrl: './avatar-size-demo.html'
})
export class AvatarSizeDemo {}`
    };
}
