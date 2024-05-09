import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'avatar-size-demo',
    template: `
        <app-docsectiontext>
            <p><i>size</i> property defines the size of the Avatar with <i>large</i> and <i>xlarge</i> as possible values.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center gap-2">
            <p-avatar label="P" size="large" />
            <p-avatar label="T" size="xlarge" />
        </div>
        <app-code [code]="code" selector="avatar-size-demo"></app-code>
    `
})
export class SizeDoc {
    code: Code = {
        basic: `<p-avatar label="P" size="large" />
<p-avatar label="T" size="xlarge" />`,
        html: `<div class="card flex justify-content-center gap-2">
    <p-avatar label="P" size="large" />
    <p-avatar label="T" size="xlarge" />
</div>`,
        typescript: `import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';

@Component({
    selector: 'avatar-size-demo',
    templateUrl: './avatar-size-demo.html',
    standalone: true,
    imports: [AvatarModule]
})
export class AvatarSizeDemo {}`
    };
}
