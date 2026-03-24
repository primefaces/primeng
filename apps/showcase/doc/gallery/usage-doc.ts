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
        typescript: `import { GalleryModule } from 'primeng/gallery';`
    };

    usageCode: Code = {
        html: `<p-gallery-root>
    <p-gallery-content>
        <p-gallery-item>
            <img src="image.jpg" alt="image" />
        </p-gallery-item>
    </p-gallery-content>
</p-gallery-root>`
    };
}
