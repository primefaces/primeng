import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'icon-doc',
    template: `
        <app-docsectiontext>
        <p>Icons can be displayed next to the labels instead of the default marker.</p>
        </app-docsectiontext>
        <div class="card">
            <p-meterGroup [value]="value"></p-meterGroup>
        </div>
        <app-code [code]="code" selector="metergroup-icon-demo"></app-code>
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
        basic: `<p-meterGroup [value]="value"></p-meterGroup>`,

        html: `<div class="card">
<p-meterGroup [value]="value"></p-meterGroup>
</div>`,

        typescript: `
import { Component } from '@angular/core';


@Component({
    selector: 'meter-group-icon-demo',
    templateUrl: './meter-group-icon-demo.html'
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
