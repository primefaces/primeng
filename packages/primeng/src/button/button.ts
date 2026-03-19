import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, Directive, effect, inject, InjectionToken, input, NgModule, numberAttribute, output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { addClass } from '@primeuix/utils';
import { AutoFocus } from 'primeng/autofocus';
import { BadgeModule } from 'primeng/badge';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { Fluid } from 'primeng/fluid';
import { Spinner as SpinnerIcon } from '@primeicons/angular/spinner';
import { Ripple } from 'primeng/ripple';
import type { ButtonIconPosition, ButtonIconTemplateContext, ButtonLoadingIconTemplateContext, ButtonPassThrough, ButtonProps, ButtonSeverity, ButtonSize, ButtonVariant } from 'primeng/types/button';
import type { CSSProperties } from 'primeng/types/shared';
import { ButtonStyle } from './style/buttonstyle';
import { BadgeSeverity } from 'primeng/types/badge';

const BUTTON_INSTANCE = new InjectionToken<Button>('BUTTON_INSTANCE');

const BUTTON_DIRECTIVE_INSTANCE = new InjectionToken<ButtonDirective>('BUTTON_DIRECTIVE_INSTANCE');

const BUTTON_LABEL_INSTANCE = new InjectionToken<ButtonLabel>('BUTTON_LABEL_INSTANCE');

const BUTTON_ICON_INSTANCE = new InjectionToken<ButtonIcon>('BUTTON_ICON_INSTANCE');

const INTERNAL_BUTTON_CLASSES = {
    button: 'p-button',
    component: 'p-component',
    iconOnly: 'p-button-icon-only',
    disabled: 'p-disabled',
    loading: 'p-button-loading',
    labelOnly: 'p-button-loading-label-only'
} as const;

@Directive({
    selector: '[pButtonLabel]',
    providers: [ButtonStyle, { provide: BUTTON_LABEL_INSTANCE, useExisting: ButtonLabel }, { provide: PARENT_INSTANCE, useExisting: ButtonLabel }],
    standalone: true,
    host: {
        '[class.p-button-label]': '!$unstyled() && true'
    },
    hostDirectives: [Bind]
})
export class ButtonLabel extends BaseComponent {
    componentName = 'ButtonLabel';

    /**
     * Used to pass attributes to DOM elements inside the pButtonLabel.
     * @defaultValue undefined
     * @group Props
     */
    pButtonLabelPT = input<any>();
    /**
     * Indicates whether the component should be rendered without styles.
     * @defaultValue undefined
     * @group Props
     */
    pButtonLabelUnstyled = input<boolean | undefined>();

    $pcButtonLabel: ButtonLabel | undefined = inject(BUTTON_LABEL_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    constructor() {
        super();
        effect(() => {
            const pt = this.pButtonLabelPT();
            pt && this.directivePT.set(pt);
        });

        effect(() => {
            this.pButtonLabelUnstyled() && this.directiveUnstyled.set(this.pButtonLabelUnstyled());
        });
    }

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}

@Directive({
    selector: '[pButtonIcon]',
    providers: [ButtonStyle, { provide: BUTTON_ICON_INSTANCE, useExisting: ButtonIcon }, { provide: PARENT_INSTANCE, useExisting: ButtonIcon }],
    standalone: true,
    host: {
        '[class.p-button-icon]': '!$unstyled() && true'
    },
    hostDirectives: [Bind]
})
export class ButtonIcon extends BaseComponent {
    componentName = 'ButtonIcon';

    /**
     * Used to pass attributes to DOM elements inside the pButtonIcon.
     * @defaultValue undefined
     * @group Props
     */
    pButtonIconPT = input<any>();
    /**
     * Indicates whether the component should be rendered without styles.
     * @defaultValue undefined
     * @group Props
     */
    pButtonUnstyled = input<boolean | undefined>();

    $pcButtonIcon: ButtonIcon | undefined = inject(BUTTON_ICON_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    constructor() {
        super();
        effect(() => {
            const pt = this.pButtonIconPT();
            pt && this.directivePT.set(pt);
        });

        effect(() => {
            this.pButtonUnstyled() && this.directiveUnstyled.set(this.pButtonUnstyled());
        });
    }

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}
/**
 * Button directive is an extension to button component.
 * @group Components
 */
@Directive({
    selector: '[pButton]',
    standalone: true,
    providers: [ButtonStyle, { provide: BUTTON_DIRECTIVE_INSTANCE, useExisting: ButtonDirective }, { provide: PARENT_INSTANCE, useExisting: ButtonDirective }],
    host: {
        '[class.p-button-icon-only]': '!$unstyled() && isIconOnly()',
        '[class.p-button-text]': ' !$unstyled() && isTextButton()'
    },
    hostDirectives: [Bind]
})
export class ButtonDirective extends BaseComponent {
    componentName = 'Button';

    $pcButtonDirective: ButtonDirective | undefined = inject(BUTTON_DIRECTIVE_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    _componentStyle = inject(ButtonStyle);

    /**
     * Used to pass attributes to DOM elements inside the Button component.
     * @defaultValue undefined
     * @group Props
     */
    pButtonPT = input<ButtonPassThrough>();
    /**
     * Indicates whether the component should be rendered without styles.
     * @defaultValue undefined
     * @group Props
     */
    pButtonUnstyled = input<boolean | undefined>();

    hostName = input<any>('');

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptm('root'));
    }

    constructor() {
        super();
        effect(() => {
            const pt = this.pButtonPT();
            pt && this.directivePT.set(pt);
        });

        effect(() => {
            this.pButtonUnstyled() && this.directiveUnstyled.set(this.pButtonUnstyled());
        });

        effect(() => {
            const unstyled = this.$unstyled();

            if (this.initialized && unstyled) {
                this.setStyleClass();
            }
        });

        effect(() => {
            this.loading();
            this.severity();
            if (this.initialized) {
                this.setStyleClass();
            }
        });
    }

    /**
     * Add a textual class to the button without a background initially.
     * @group Props
     */
    text = input(false, { transform: booleanAttribute });

    /**
     * Add a plain textual class to the button without a background initially.
     * @group Props
     */
    plain = input(false, { transform: booleanAttribute });

    /**
     * Add a shadow to indicate elevation.
     * @group Props
     */
    raised = input(false, { transform: booleanAttribute });

    /**
     * Defines the size of the button.
     * @group Props
     */
    size = input<ButtonSize>();

    /**
     * Add a border class without a background initially.
     * @group Props
     */
    outlined = input(false, { transform: booleanAttribute });

    /**
     * Add a circular border radius to the button.
     * @group Props
     */
    rounded = input(false, { transform: booleanAttribute });

    /**
     * Spans 100% width of the container when enabled.
     * @defaultValue undefined
     * @group Props
     */
    fluid = input(undefined, { transform: booleanAttribute });

    private iconSignal = contentChild(ButtonIcon, { descendants: false });

    private labelSignal = contentChild(ButtonLabel, { descendants: false });

    isIconOnly = computed(() => !!(!this.labelSignal() && this.iconSignal()));

    public initialized: boolean | undefined;

    private get htmlElement(): HTMLElement {
        return this.el.nativeElement as HTMLElement;
    }

    private _internalClasses: string[] = Object.values(INTERNAL_BUTTON_CLASSES);

    pcFluid: Fluid | null = inject(Fluid, { optional: true, host: true, skipSelf: true });

    isTextButton = computed(() => !!(!this.iconSignal() && this.labelSignal() && this.text()));

    /**
     * Whether the button is in loading state.
     * @group Props
     */
    loading = input(false, { transform: booleanAttribute });

    /**
     * Defines the style of the button.
     * @group Props
     */
    severity = input<ButtonSeverity>();

    hasFluid = computed(() => this.fluid() ?? !!this.pcFluid);

    onAfterViewInit() {
        !this.$unstyled() && addClass(this.htmlElement, this.getStyleClass().join(' '));

        if (isPlatformBrowser(this.platformId)) {
            this.initialized = true;
        }
    }

    getStyleClass(): string[] {
        const styleClass: string[] = [INTERNAL_BUTTON_CLASSES.button, INTERNAL_BUTTON_CLASSES.component];
        const loading = this.loading();
        const text = this.text();
        const severity = this.severity();
        const plain = this.plain();
        const raised = this.raised();
        const size = this.size();
        const outlined = this.outlined();
        const rounded = this.rounded();

        if (loading) {
            styleClass.push(INTERNAL_BUTTON_CLASSES.disabled, INTERNAL_BUTTON_CLASSES.loading);
        }

        if (text) {
            styleClass.push('p-button-text');
        }

        if (severity) {
            styleClass.push(`p-button-${severity}`);
        }

        if (plain) {
            styleClass.push('p-button-plain');
        }

        if (raised) {
            styleClass.push('p-button-raised');
        }

        if (size) {
            styleClass.push(`p-button-${size}`);
        }

        if (outlined) {
            styleClass.push('p-button-outlined');
        }

        if (rounded) {
            styleClass.push('p-button-rounded');
        }

        if (size === 'small') {
            styleClass.push('p-button-sm');
        }

        if (size === 'large') {
            styleClass.push('p-button-lg');
        }

        if (this.hasFluid()) {
            styleClass.push('p-button-fluid');
        }

        return this.$unstyled() ? [] : styleClass;
    }

    setStyleClass() {
        const styleClass = this.getStyleClass();
        this.removeExistingSeverityClass();

        this.htmlElement.classList.remove(...this._internalClasses);
        this.htmlElement.classList.add(...styleClass);
    }

    removeExistingSeverityClass() {
        const severityArray = ['success', 'info', 'warn', 'danger', 'help', 'primary', 'secondary', 'contrast'];
        const existingSeverityClass = this.htmlElement.classList.value.split(' ').find((cls) => severityArray.some((severity) => cls === `p-button-${severity}`));

        if (existingSeverityClass) {
            this.htmlElement.classList.remove(existingSeverityClass);
        }
    }

    onDestroy() {
        this.initialized = false;
    }
}
/**
 * Button is an extension to standard button element with icons and theming.
 * @group Components
 */
@Component({
    selector: 'p-button',
    standalone: true,
    imports: [NgTemplateOutlet, Ripple, AutoFocus, SpinnerIcon, BadgeModule, Bind],
    template: `
        <button
            [attr.type]="$type()"
            [attr.aria-label]="$ariaLabel()"
            [style]="mergedStyle()"
            [disabled]="$disabled()"
            [class]="cn(cx('root'), styleClass(), buttonProps()?.styleClass)"
            (click)="onClick.emit($event)"
            (focus)="onFocus.emit($event)"
            (blur)="onBlur.emit($event)"
            pRipple
            [attr.tabindex]="$tabindex()"
            [pAutoFocus]="$autofocus()"
            [pBind]="ptm('root')"
            [attr.data-p]="dataP()"
            [attr.data-p-disabled]="$disabled()"
            [attr.data-p-severity]="$severity()"
        >
            <ng-content />
            <ng-container *ngTemplateOutlet="contentTemplate()" />
            @if ($loading()) {
                @if (!loadingIconTemplate()) {
                    @if ($loadingIcon()) {
                        <span [class]="cn(cx('loadingIcon'), 'pi-spin', $loadingIcon())" [pBind]="ptm('loadingIcon')" [attr.aria-hidden]="true"></span>
                    } @else {
                        <svg data-p-icon="spinner" [class]="cn(cx('loadingIcon'), cx('spinnerIcon'))" [pBind]="ptm('loadingIcon')" [spin]="true" [attr.aria-hidden]="true" />
                    }
                } @else {
                    <ng-container *ngTemplateOutlet="loadingIconTemplate(); context: getLoadingIconTemplateContext()" />
                }
            }
            @if (!$loading()) {
                @if ($icon() && !iconTemplate()) {
                    <span [class]="cn(cx('icon'), $icon())" [pBind]="ptm('icon')" [attr.data-p]="dataIconP()"></span>
                }
                @if (!icon() && iconTemplate()) {
                    <ng-container *ngTemplateOutlet="iconTemplate(); context: getIconTemplateContext()" />
                }
            }
            @if (showLabel()) {
                <span [class]="cx('label')" [attr.aria-hidden]="$icon() && !$label()" [pBind]="ptm('label')" [attr.data-p]="dataLabelP()">{{ $label() }}</span>
            }
            @if (showBadge()) {
                <p-badge [value]="$badge()" [severity]="$badgeSeverity()" [pt]="ptm('pcBadge')" [unstyled]="unstyled()" />
            }
        </button>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [ButtonStyle, { provide: BUTTON_INSTANCE, useExisting: Button }, { provide: PARENT_INSTANCE, useExisting: Button }],
    hostDirectives: [Bind]
})
export class Button extends BaseComponent<ButtonPassThrough> {
    componentName = 'Button';

    hostName = input<any>('');

    $pcButton: Button | undefined = inject(BUTTON_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    _componentStyle = inject(ButtonStyle);

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptm('host'));
    }

    /**
     * Type of the button.
     * @group Props
     */
    type = input('button');

    /**
     * Value of the badge.
     * @group Props
     */
    badge = input<string>();

    /**
     * When present, it specifies that the component should be disabled.
     * @group Props
     */
    disabled = input(false, { transform: booleanAttribute });

    /**
     * Add a shadow to indicate elevation.
     * @group Props
     */
    raised = input(false, { transform: booleanAttribute });

    /**
     * Add a circular border radius to the button.
     * @group Props
     */
    rounded = input(false, { transform: booleanAttribute });

    /**
     * Add a textual class to the button without a background initially.
     * @group Props
     */
    text = input(false, { transform: booleanAttribute });

    /**
     * Add a plain textual class to the button without a background initially.
     * @group Props
     */
    plain = input(false, { transform: booleanAttribute });

    /**
     * Add a border class without a background initially.
     * @group Props
     */
    outlined = input(false, { transform: booleanAttribute });

    /**
     * Add a link style to the button.
     * @group Props
     */
    link = input(false, { transform: booleanAttribute });

    /**
     * Add a tabindex to the button.
     * @group Props
     */
    tabindex = input(0, { transform: numberAttribute });

    /**
     * Defines the size of the button.
     * @group Props
     */
    size = input<ButtonSize>();

    /**
     * Specifies the variant of the component.
     * @group Props
     */
    variant = input<ButtonVariant>();

    /**
     * Inline style of the element.
     * @group Props
     */
    style = input<CSSProperties>();

    /**
     * Class of the element.
     * @group Props
     */
    styleClass = input<string>();

    /**
     * Severity type of the badge.
     * @group Props
     * @defaultValue secondary
     */
    badgeSeverity = input<BadgeSeverity>('secondary');

    /**
     * Used to define a string that autocomplete attribute the current element.
     * @group Props
     */
    ariaLabel = input<string>();

    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    autofocus = input(false, { transform: booleanAttribute });

    /**
     * Position of the icon.
     * @group Props
     */
    iconPos = input<ButtonIconPosition>('left');

    /**
     * Name of the icon.
     * @group Props
     */
    icon = input<string>();

    /**
     * Text of the button.
     * @group Props
     */
    label = input<string>();

    /**
     * Whether the button is in loading state.
     * @group Props
     */
    loading = input(false, { transform: booleanAttribute });

    /**
     * Icon to display in loading state.
     * @group Props
     */
    loadingIcon = input<string>();

    /**
     * Defines the style of the button.
     * @group Props
     */
    severity = input<ButtonSeverity>();

    /**
     * Used to pass all properties of the ButtonProps to the Button component.
     * @group Props
     */
    buttonProps = input<ButtonProps>();

    /**
     * Spans 100% width of the container when enabled.
     * @defaultValue undefined
     * @group Props
     */
    fluid = input(undefined, { transform: booleanAttribute });

    /**
     * Callback to execute when button is clicked.
     * This event is intended to be used with the <p-button> component. Using a regular <button> element, use (click).
     * @param {MouseEvent} event - Mouse event.
     * @group Emits
     */
    onClick = output<MouseEvent>();

    /**
     * Callback to execute when button is focused.
     * This event is intended to be used with the <p-button> component. Using a regular <button> element, use (focus).
     * @param {FocusEvent} event - Focus event.
     * @group Emits
     */
    onFocus = output<FocusEvent>();

    /**
     * Callback to execute when button loses focus.
     * This event is intended to be used with the <p-button> component. Using a regular <button> element, use (blur).
     * @param {FocusEvent} event - Focus event.
     * @group Emits
     */
    onBlur = output<FocusEvent>();

    /**
     * Custom content template.
     * @group Templates
     **/
    contentTemplate = contentChild<TemplateRef<void>>('content', { descendants: false });

    /**
     * Custom loading icon template.
     * @group Templates
     **/
    loadingIconTemplate = contentChild<TemplateRef<ButtonLoadingIconTemplateContext>>('loadingicon', { descendants: false });

    /**
     * Custom icon template.
     * @group Templates
     **/
    iconTemplate = contentChild<TemplateRef<ButtonIconTemplateContext>>('icon', { descendants: false });

    pcFluid: Fluid | null = inject(Fluid, { optional: true, host: true, skipSelf: true });

    hasFluid = computed(() => this.fluid() ?? !!this.pcFluid);

    $type = computed(() => this.type() || this.buttonProps()?.type);

    $ariaLabel = computed(() => this.ariaLabel() || this.buttonProps()?.ariaLabel);

    mergedStyle = computed(() => this.style() || this.buttonProps()?.style);

    $disabled = computed(() => this.disabled() || this.loading() || this.buttonProps()?.disabled);

    $severity = computed(() => this.severity() || this.buttonProps()?.severity);

    $tabindex = computed(() => this.tabindex() || this.buttonProps()?.tabindex);

    $autofocus = computed(() => this.autofocus() || this.buttonProps()?.autofocus);

    $loading = computed(() => this.loading() || this.buttonProps()?.loading);

    $icon = computed(() => this.icon() || this.buttonProps()?.icon);

    $label = computed(() => this.label() || this.buttonProps()?.label);

    $badge = computed(() => this.badge() || this.buttonProps()?.badge);

    $loadingIcon = computed(() => this.loadingIcon() || this.buttonProps()?.loadingIcon);

    $badgeSeverity = computed(() => this.badgeSeverity() || this.buttonProps()?.badgeSeverity);

    showLabel = computed(() => !this.contentTemplate() && this.$label());

    showBadge = computed(() => !this.contentTemplate() && this.$badge());

    getLoadingIconTemplateContext() {
        return { class: this.cx('loadingIcon'), pt: this.ptm('loadingIcon') };
    }

    getIconTemplateContext() {
        return { class: this.cx('icon'), pt: this.ptm('icon') };
    }

    hasIcon = computed(() => this.$icon() || this.iconTemplate() || this.loadingIcon() || this.loadingIconTemplate());

    dataP = computed(() =>
        this.cn({
            [this.size() as string]: this.size(),
            'icon-only': this.hasIcon() && !this.$label() && !this.$badge(),
            loading: this.$loading(),
            fluid: this.hasFluid(),
            rounded: this.rounded(),
            raised: this.raised(),
            outlined: this.outlined() || this.variant() === 'outlined',
            text: this.text() || this.variant() === 'text',
            link: this.link(),
            vertical: (this.iconPos() === 'top' || this.iconPos() === 'bottom') && this.$label()
        })
    );

    dataIconP = computed(() =>
        this.cn({
            [this.iconPos()]: this.iconPos(),
            [this.size() as string]: this.size()
        })
    );

    dataLabelP = computed(() =>
        this.cn({
            [this.size() as string]: this.size(),
            'icon-only': this.hasIcon() && !this.$label() && !this.$badge()
        })
    );
}

@NgModule({
    imports: [ButtonDirective, Button, ButtonLabel, ButtonIcon],
    exports: [ButtonDirective, Button, ButtonLabel, ButtonIcon]
})
export class ButtonModule {}
