import { Component } from '@angular/core';

@Component({
    selector: 'renamed-doc',
    template: `
        <app-docsectiontext>
            <h4>Renamed Components</h4>
            <p>Old names are deprecated but still functional, migrate to new import paths instead e.g. <i>primeng/datepicker</i> becomes <i>primeng/datepicker</i>.</p>
            <ul class="flex flex-col gap-2 leading-normal">
                <li><i class="mark">Calendar</i> -&gt; <i class="mark">DatePicker</i>.</li>
                <li><i class="mark">Dropdown</i> -&gt; <i class="mark">Select</i>.</li>
                <li><i class="mark">InputSwitch</i> -&gt; <i class="mark">ToggleSwitch</i>.</li>
                <li><i class="mark">OverlayPanel</i> -&gt; <i class="mark">Popover</i>.</li>
                <li><i class="mark">Sidebar</i> -&gt; <i class="mark">Drawer</i>.</li>
            </ul>
        </app-docsectiontext>
    `
})
export class RenamedComponentsDoc {}
