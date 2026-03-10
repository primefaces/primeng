import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';

@Component({
    selector: 'usage-doc',
    standalone: true,
    imports: [AppCode],
    template: `
        <app-code [code]="importCode" [hideToggleCode]="true"></app-code>
        <app-code [code]="usageCode" [hideToggleCode]="true"></app-code>
    `
})
export class UsageDoc {
    importCode: Code = {
        typescript: `import { AnimateOnScrollModule } from 'primeng/animateonscroll';`
    };

    usageCode: Code = {
        html: `<div pAnimateOnScroll enterClass="animate-enter fade-in-10 animate-duration-1000"></div>`
    };
}
