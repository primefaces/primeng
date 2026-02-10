import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, contentChild, inject, InjectionToken, input, NgModule, output, signal, TemplateRef, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import type { InplaceContentTemplateContext, InplacePassThrough } from 'primeng/types/inplace';
import { InplaceStyle } from './style/inplacestyle';

const INPLACE_INSTANCE = new InjectionToken<Inplace>('INPLACE_INSTANCE');

@Component({
    selector: 'p-inplacedisplay, p-inplace-display',
    standalone: true,
    template: '<ng-content></ng-content>'
})
export class InplaceDisplay extends BaseComponent {}

@Component({
    selector: 'p-inplacecontent, p-inplace-content',
    standalone: true,
    template: '<ng-content></ng-content>'
})
export class InplaceContent extends BaseComponent {}

/**
 * Inplace provides an easy to do editing and display at the same time where clicking the output displays the actual content.
 * @group Components
 */
@Component({
    selector: 'p-inplace',
    standalone: true,
    imports: [NgTemplateOutlet, ButtonModule, SharedModule, Bind],
    template: `
        @if (!active()) {
            <div [class]="cx('display')" [pBind]="ptm('display')" (click)="onActivateClick($event)" tabindex="0" role="button" (keydown)="onKeydown($event)" [attr.data-p-disabled]="disabled()">
                <ng-content select="[pInplaceDisplay]"></ng-content>
                @if (displayTemplate()) {
                    <ng-container [ngTemplateOutlet]="displayTemplate()!"></ng-container>
                }
            </div>
        }
        @if (active()) {
            <div [class]="cx('content')" [pBind]="ptm('content')">
                <ng-content select="[pInplaceContent]"></ng-content>
                @if (contentTemplate()) {
                    <ng-container [ngTemplateOutlet]="contentTemplate()!" [ngTemplateOutletContext]="{ closeCallback: onDeactivateClick.bind(this) }"></ng-container>
                }
                @if (closable()) {
                    <p-button [icon]="closeIcon()" [ariaLabel]="closeAriaLabel()" (onClick)="onDeactivateClick($event)" [pt]="ptm('pcButton')">
                        @if (closeiconTemplate()) {
                            <ng-template #icon>
                                <ng-container [ngTemplateOutlet]="closeiconTemplate()!"></ng-container>
                            </ng-template>
                        }
                    </p-button>
                }
            </div>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [InplaceStyle, { provide: INPLACE_INSTANCE, useExisting: Inplace }, { provide: PARENT_INSTANCE, useExisting: Inplace }],
    host: {
        '[attr.aria-live]': "'polite'",
        '[class]': "cx('root')"
    },
    hostDirectives: [Bind]
})
export class Inplace extends BaseComponent<InplacePassThrough> {
    componentName = 'Inplace';

    $pcInplace: Inplace | undefined = inject(INPLACE_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    /**
     * Whether the content is displayed or not.
     * @group Props
     */
    active = signal(false);

    /**
     * When present, it specifies that the element should be disabled.
     * @group Props
     */
    disabled = input(false, { transform: booleanAttribute });

    /**
     * Allows to prevent clicking.
     * @group Props
     */
    preventClick = input(false, { transform: booleanAttribute });

    /**
     * Displays a button to switch back to display mode.
     * @group Props
     */
    closable = input(false, { transform: booleanAttribute });

    /**
     * Icon to display in the close button.
     * @group Props
     */
    closeIcon = input<string>();

    /**
     * Establishes a string value that labels the close button.
     * @group Props
     */
    closeAriaLabel = input<string>();

    /**
     * Callback to invoke when inplace is opened.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onActivate = output<Event>();

    /**
     * Callback to invoke when inplace is closed.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onDeactivate = output<Event>();

    /**
     * Custom display template.
     * @group Templates
     */
    displayTemplate = contentChild<TemplateRef<void>>('display', { descendants: false });

    /**
     * Custom content template.
     * @group Templates
     */
    contentTemplate = contentChild<TemplateRef<InplaceContentTemplateContext>>('content', { descendants: false });

    /**
     * Custom close icon template.
     * @group Templates
     */
    closeiconTemplate = contentChild<TemplateRef<void>>('closeicon', { descendants: false });

    _componentStyle = inject(InplaceStyle);

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    onActivateClick(event: MouseEvent) {
        if (!this.preventClick()) this.activate(event);
    }

    onDeactivateClick(event: MouseEvent) {
        if (!this.preventClick()) this.deactivate(event);
    }

    /**
     * Activates the content.
     * @param {Event} event - Browser event.
     * @group Method
     */
    activate(event?: Event) {
        if (!this.disabled()) {
            this.active.set(true);
            if (event) this.onActivate.emit(event);
        }
    }

    /**
     * Deactivates the content.
     * @param {Event} event - Browser event.
     * @group Method
     */
    deactivate(event?: Event) {
        if (!this.disabled()) {
            this.active.set(false);
            if (event) this.onDeactivate.emit(event);
        }
    }

    onKeydown(event: KeyboardEvent) {
        if (event.code === 'Enter') {
            this.activate(event);
            event.preventDefault();
        }
    }
}

@NgModule({
    imports: [Inplace, InplaceContent, InplaceDisplay, SharedModule],
    exports: [Inplace, InplaceContent, InplaceDisplay, SharedModule]
})
export class InplaceModule {}
