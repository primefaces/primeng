import { CommonModule, DOCUMENT } from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Inject,
    Injector,
    Input,
    NgModule,
    OnChanges,
    OnInit,
    Output,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    forwardRef
} from '@angular/core';

import { PrimeTemplate, SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DomHandler } from 'primeng/dom';
import { AngleDownIcon } from 'primeng/icons/angledown';
import { AngleUpIcon } from 'primeng/icons/angleup';
import { TimesIcon } from 'primeng/icons/times';
import { InputTextModule } from 'primeng/inputtext';

/**
 * IconField wraps an input and an icon.
 * @group Components
 */
@Component({
    selector: 'p-iconField',
    template: ` <span class="p-input-icon-left"><ng-content></ng-content> </span>`,

    host: {
        class: 'p-element'
    }
})
export class IconField {
    /**
     * Whether to display the component on fullscreen.
     * @group Props
     */
    @Input() iconPosition: string | undefined;
}

@NgModule({
    imports: [CommonModule, InputTextModule, ButtonModule, TimesIcon, AngleUpIcon, AngleDownIcon],
    exports: [IconField, SharedModule],
    declarations: [IconField]
})
export class IconFieldModule {}
