import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignCSCommon } from './designcscommon';
import { DesignCSOverlay } from './designcsoverlay';
import { DesignCSList } from './designcslist';
import { DesignCSFormField } from './designcsformfield';
import { DesignCSNavigation } from './designcsnavigation';

@Component({
    selector: 'design-cs',
    standalone: true,
    imports: [CommonModule, DesignCSCommon, DesignCSOverlay, DesignCSList, DesignCSFormField, DesignCSNavigation],
    template: `<div class="flex flex-col gap-3">
        <design-cs-common [colorScheme]="value" />
        <design-cs-form-field [colorScheme]="value" />
        <design-cs-overlay [colorScheme]="value" />
        <design-cs-list [colorScheme]="value" />
        <design-cs-navigation [colorScheme]="value" />
    </div>`
})
export class DesignCS {
    @Input() value: any;
}
