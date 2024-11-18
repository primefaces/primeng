import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'download-doc',
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
npm install primeng@18.0.0-rc.1 @primeng/themes@18.0.0-rc.1

# Using yarn
yarn add primeng@18.0.0-rc.1 @primeng/themes@18.0.0-rc.1

# Using pnpm
pnpm add primeng@18.0.0-rc.1 @primeng/themes@18.0.0-rc.1`
    };
}
