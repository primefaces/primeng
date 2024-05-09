import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'icon-doc',
    template: `
        <app-docsectiontext>
            <p>Icons can be displayed next to the labels instead of the default marker.</p>
        </app-docsectiontext>
        <div class="card">
            <p-meterGroup [value]="value" />
        </div>
        <app-code [code]="code" selector="meter-group-icon-demo"></app-code>
    `
})
export class IconDoc {
    value = [
        { label: 'Apps', color: '#34d399', value: 16, icon: 'pi pi-table' },
        { label: 'Messages', color: '#fbbf24', value: 8, icon: 'pi pi-inbox' },
        { label: 'Media', color: '#60a5fa', value: 24, icon: 'pi pi-image' },
        { label: 'System', color: '#c084fc', value: 10, icon: 'pi pi-cog' }
    ];
    code: Code = {
        basic: `<p-meterGroup [value]="value" />`,

        html: `<div class="card">
    <p-meterGroup [value]="value" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { MeterGroupModule } from 'primeng/metergroup';

@Component({
    selector: 'meter-group-icon-demo',
    templateUrl: './meter-group-icon-demo.html',
    standalone: true,
    imports: [MeterGroupModule]
})
export class MeterGroupIconDemo {
    value = [
        { label: 'Apps', color: '#34d399', value: 16, icon: 'pi pi-table' },
        { label: 'Messages', color: '#fbbf24', value: 8, icon: 'pi pi-inbox' },
        { label: 'Media', color: '#60a5fa', value: 24, icon: 'pi pi-image' },
        { label: 'System', color: '#c084fc', value: 10, icon: 'pi pi-cog' }
    ];
}`
    };
}
