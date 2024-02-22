import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';

import { SharedModule } from 'primeng/api';

@Component({
    selector: 'p-inputIcon',
    template: `<ng-content></ng-content> `,

    host: {
        class: 'p-element'
    }
})
export class InputIcon {}

@NgModule({
    imports: [CommonModule],
    exports: [InputIcon, SharedModule],
    declarations: [InputIcon]
})
export class InputIconModule {}
