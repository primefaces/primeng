import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, ViewEncapsulation } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { ButtonDirective, ButtonIcon } from 'primeng/button';
import { parseColor } from './color-manager';
import { INPUT_COLOR_INSTANCE } from './inputcolor.token';

/**
 * InputColorEyeDropper is a helper component for InputColor component.
 * @group Components
 */
@Component({
    selector: 'p-inputcolor-eyedropper',
    standalone: true,
    imports: [ButtonDirective, ButtonIcon, NgTemplateOutlet],
    template: `
        <ng-template #contentTpl><ng-content /></ng-template>
        <button pButton type="button" [text]="text()" [rounded]="rounded()" [outlined]="outlined()" [severity]="severity()" [size]="size()" [disabled]="$pc.$disabled()" (click)="onPickColor($event)" [attr.aria-label]="'Pick a color'">
            @if (iconOnly()) {
                <span pButtonIcon>
                    <ng-container *ngTemplateOutlet="contentTpl" />
                </span>
            } @else {
                <ng-container *ngTemplateOutlet="contentTpl" />
            }
        </button>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': '$pc.cx("eyeDropper")'
    },
    providers: [{ provide: PARENT_INSTANCE, useExisting: InputColorEyeDropper }],
    hostDirectives: [Bind]
})
export class InputColorEyeDropper extends BaseComponent {
    componentName = 'InputColorEyeDropper';

    bindDirectiveInstance = inject(Bind, { self: true });

    $pc = inject(INPUT_COLOR_INSTANCE);

    /**
     * Whether to display button as text.
     * @group Props
     */
    text = input<boolean>(false);

    /**
     * Whether to display a rounded button.
     * @group Props
     */
    rounded = input<boolean>(false);

    /**
     * Whether to display button as outlined.
     * @group Props
     */
    outlined = input<boolean>(false);

    /**
     * Whether to display an icon-only button.
     * @group Props
     */
    iconOnly = input<boolean>(false);

    /**
     * Defines the color severity of the button.
     * @group Props
     */
    severity = input<string | undefined>(undefined);

    /**
     * Defines the size of the button.
     * @group Props
     */
    size = input<string | undefined>(undefined);

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    async onPickColor(event: MouseEvent) {
        if (this.$pc.$disabled()) return;
        if (!isPlatformBrowser(this.platformId)) return;

        try {
            const eyeDropper = new (window as any).EyeDropper();
            const result = await eyeDropper.open();
            if (result?.sRGBHex) {
                const parsed = parseColor(result.sRGBHex);
                if (parsed) {
                    this.$pc.updateColor(parsed, event, true);
                }
            }
        } catch {
            // User cancelled or API not available
        }
    }
}
