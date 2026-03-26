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
        typescript: `import { CarouselModule } from 'primeng/carousel';`
    };

    usageCode: Code = {
        html: `<p-carousel align="center">
    <p-carousel-content>
        <p-carousel-item>Item 1</p-carousel-item>
        <p-carousel-item>Item 2</p-carousel-item>
    </p-carousel-content>
    <p-carousel-indicators></p-carousel-indicators>
</p-carousel>`
    };
}
