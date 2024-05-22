import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, Output, TemplateRef, ViewEncapsulation, booleanAttribute } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { FocusTrapModule } from 'primeng/focustrap';
import { TimesIcon } from 'primeng/icons/times';
import { WindowMaximizeIcon } from 'primeng/icons/windowmaximize';
import { WindowMinimizeIcon } from 'primeng/icons/windowminimize';
import { RippleModule } from 'primeng/ripple';
import { Nullable } from 'primeng/ts-helpers';
import { ButtonModule } from 'primeng/button';
import { ButtonWrapperProps } from './closebuttonwrapper.interface';

@Component({
    selector: 'p-closeButtonWrapper',
    template: `
        <p-button
            *ngIf="closable"
            type="button"
            [styleClass]="getCombinedClasses()"
            [attr.aria-label]="closeAriaLabel"
            (click)="close($event)"
            (keydown.enter)="close($event)"
            pRipple
            [attr.tabindex]="closeTabindex"
            [text]="closeButtonProps.text"
            [severity]="closeButtonProps.severity"
            [rounded]="closeButtonProps.rounded"
            [type]="closeButtonProps.type"
            [iconPos]="closeButtonProps.iconPos"
            [icon]="closeButtonProps.icon"
            [badge]="closeButtonProps.badge"
            [label]="closeButtonProps.label"
            [disabled]="closeButtonProps.disabled"
            [loading]="closeButtonProps.loading"
            [loadingIcon]="closeButtonProps.loadingIcon"
            [raised]="closeButtonProps.raised"
            [plain]="closeButtonProps.plain"
            [outlined]="closeButtonProps.outlined"
            [link]="closeButtonProps.link"
            [tabindex]="closeButtonProps.tabindex"
            [size]="closeButtonProps.size"
            [style]="closeButtonProps.style"
            [badgeClass]="closeButtonProps.badgeClass"
            [ariaLabel]="closeButtonProps.ariaLabel"
            [autofocus]="closeButtonProps.autofocus"
        >
            <ng-container *ngIf="!closeIconTemplate">
                <span *ngIf="closeIcon" class="p-dialog-header-close-icon" [ngClass]="closeIcon"></span>
                <TimesIcon *ngIf="!closeIcon" [styleClass]="'p-dialog-header-close-icon'" />
            </ng-container>
            <span *ngIf="closeIconTemplate">
                <ng-template *ngTemplateOutlet="closeIconTemplate"></ng-template>
            </span>
        </p-button>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CloseButtonWrapper {
    /**
     * Adds a close icon to the header to hide the dialog.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) closable: boolean = true;
    /**
     * Name of the close icon.
     * @group Props
     */
    @Input() closeIcon: string | undefined;
    /**
     * Defines a string that labels the close button for accessibility.
     * @group Props
     */
    @Input() closeAriaLabel: string | undefined;
    /**
     * Index of the close button in tabbing order.
     * @group Props
     */
    @Input() closeTabindex: string = '0';
    /**
     * Used to pass all properties of the ButtonProps to the Button component.
     * @group Props
     */
    @Input() closeButtonProps: ButtonWrapperProps;
    /**
     * This EventEmitter is used to notify changes in the visibility state of a component.
     * @param {boolean} value - New value.
     * @group Emits
     */
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    closeIconTemplate: Nullable<TemplateRef<any>>;

    getCombinedClasses(): string {
        const fixedClasses = 'p-dialog-header-icon p-dialog-header-close p-link';
        const buttonPropsClasses = this.closeButtonProps?.styleClass || '';
        return `${fixedClasses} ${buttonPropsClasses}`.trim();
    }

    close(event: Event) {
        this.visibleChange.emit(false);
        event.preventDefault();
    }
 
}

@NgModule({
    imports: [CommonModule, FocusTrapModule, ButtonModule, RippleModule, TimesIcon, WindowMaximizeIcon, WindowMinimizeIcon],
    exports: [CloseButtonWrapper, SharedModule],
    declarations: [CloseButtonWrapper]
})
export class CloseButtonWrapperModule {}
