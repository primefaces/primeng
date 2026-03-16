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
        typescript: `import { InputColorModule } from 'primeng/inputcolor';`
    };

    usageCode: Code = {
        html: `<p-inputcolor>
    <p-inputcolor-area>
        <p-inputcolor-area-background />
        <p-inputcolor-area-thumb />
    </p-inputcolor-area>
    <p-inputcolor-slider>
        <p-inputcolor-transparency-grid />
        <p-inputcolor-slider-track />
        <p-inputcolor-slider-thumb />
    </p-inputcolor-slider>
    <p-inputcolor-swatch>
        <p-inputcolor-transparency-grid />
        <p-inputcolor-swatch-background />
    </p-inputcolor-swatch>
    <p-inputcolor-eyedropper>
        <svg data-p-icon="eye-dropper" />
    </p-inputcolor-eyedropper>
    <input pInputText pInputColorInput channel="hex" />
</p-inputcolor>`
    };
}
