import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'download-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>PrimeNG is available for download on the <a href="https://www.npmjs.com/package/primeng">npm registry</a>.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class DownloadDoc {
    code: Code = {
        command: `# Using npm
npm install primeng @primeng/themes

# Using yarn
yarn add primeng @primeng/themes

# Using pnpm
pnpm add primeng @primeng/themes`
    };
}
