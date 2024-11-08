import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'avatar-import-doc',
    template: ` <app-code [code]="code" [hideToggleCode]="true"></app-code> `
})
export class ImportDoc {
    code: Code = {
        html: `import { Avatar } from 'primeng/avatar';
import { AvatarGroup } from 'primeng/avatargroup';`
    };
}
