import { animate, AnimationEvent, style, transition, trigger } from '@angular/animations';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    Directive,
    DoCheck,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostListener,
    inject,
    Input,
    NgModule,
    NgZone,
    numberAttribute,
    OnDestroy,
    OnInit,
    Output,
    Pipe,
    PipeTransform,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { absolutePosition, addClass, getOuterWidth, hasClass, isTouchDevice, relativePosition, removeClass } from '@primeuix/utils';
import { OverlayService, SharedModule, TranslationKeys } from 'primeng/api';
import { AutoFocus } from 'primeng/autofocus';
import { BaseComponent } from 'primeng/basecomponent';
import { ConnectedOverlayScrollHandler, DomHandler } from 'primeng/dom';
import { EyeIcon, EyeSlashIcon, TimesIcon } from 'primeng/icons';
import { InputText } from 'primeng/inputtext';
import { Nullable, VoidListener } from 'primeng/ts-helpers';
import { ZIndexUtils } from 'primeng/utils';
import { Subscription } from 'rxjs';
import { PasswordStyle } from './style/passwordstyle';

type Meter = {
    strength: string;
    width: string;
};
/**
 * Password directive.
 * @group Components
 */
@Directive({
    selector: '[pPassword]',
    standalone: true,
    host: {
        class: 'p-password p-inputtext p-component p-inputwrapper',
        '[class.p-inputwrapper-filled]': 'filled',
        '[class.p-variant-filled]': 'variant === "filled" || config.inputStyle() === "filled" || config.inputVariant() === "filled"',
        '[class.p-password-fluid-directive]': 'hasFluid'
    },
    providers: [PasswordStyle]
})
export class PasswordDirective extends BaseComponent implements OnDestroy, DoCheck {
    /**
     * Text to prompt password entry. Defaults to PrimeNG I18N API configuration.
     * @group Props
     */
    @Input() promptLabel: string = 'Enter a password';
    /**
     * Text for a weak password. Defaults to PrimeNG I18N API configuration.
     * @group Props
     */
    @Input() weakLabel: string = 'Weak';
    /**
     * Text for a medium password. Defaults to PrimeNG I18N API configuration.
     * @group Props
     */
    @Input() mediumLabel: string = 'Medium';
    /**
     * Text for a strong password. Defaults to PrimeNG I18N API configuration.
     * @group Props
     */
    @Input() strongLabel: string = 'Strong';
    /**
     * Whether to show the strength indicator or not.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) feedback: boolean = true;
    /**
     * Sets the visibility of the password field.
     * @group Props
     */
    @Input() set showPassword(show: boolean) {
        this.el.nativeElement.type = show ? 'text' : 'password';
    }
    /**
     * Specifies the input variant of the component.
     * @group Props
     */
    @Input() variant: 'filled' | 'outlined' = 'outlined';
    /**
     * Spans 100% width of the container when enabled.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) fluid: boolean = false;

    panel: Nullable<HTMLDivElement>;

    meter: Nullable<Meter>;

    info: Nullable<HTMLDivElement>;

    filled: Nullable<boolean>;

    content: Nullable<HTMLDivElement>;

    label: Nullable<HTMLLabelElement>;

    scrollHandler: Nullable<ConnectedOverlayScrollHandler>;

    documentResizeListener: VoidListener;

    _componentStyle = inject(PasswordStyle);

    get hasFluid() {
        const nativeElement = this.el.nativeElement;
        const fluidComponent = nativeElement.closest('p-fluid');
        return this.fluid || !!fluidComponent;
    }

    constructor(public zone: NgZone) {
        super();
    }

    ngDoCheck() {
        this.updateFilledState();
    }

    @HostListener('input', ['$event'])
    onInput(e: Event) {
        this.updateFilledState();
    }

    updateFilledState() {
        this.filled = this.el.nativeElement.value && this.el.nativeElement.value.length;
    }

    createPanel() {
        if (isPlatformBrowser(this.platformId)) {
            this.panel = this.renderer.createElement('div');
            this.renderer.addClass(this.panel, 'p-password-overlay');
            this.renderer.addClass(this.panel, 'p-component');

            this.content = this.renderer.createElement('div');
            this.renderer.addClass(this.content, 'p-password-content');
            this.renderer.appendChild(this.panel, this.content);

            this.meter = this.renderer.createElement('div');
            this.renderer.addClass(this.meter, 'p-password-meter');
            this.renderer.appendChild(this.content, this.meter);

            this.label = this.renderer.createElement('div');
            this.renderer.addClass(this.label, 'p-password-meter-label');
            this.renderer.appendChild(this.meter, this.label);

            this.info = this.renderer.createElement('div');
            this.renderer.addClass(this.info, 'p-password-meter-text');
            this.renderer.setProperty(this.info, 'textContent', this.promptLabel);
            this.renderer.appendChild(this.content, this.info);

            this.renderer.setStyle(this.panel, 'minWidth', `${this.el.nativeElement.offsetWidth}px`);
            this.renderer.appendChild(document.body, this.panel);
        }
    }

    showOverlay() {
        if (this.feedback) {
            if (!this.panel) {
                this.createPanel();
            }

            this.renderer.setStyle(this.panel, 'zIndex', String(++DomHandler.zindex));
            this.renderer.setStyle(this.panel, 'display', 'block');
            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    addClass(this.panel, 'p-connected-overlay-visible');
                    this.bindScrollListener();
                    this.bindDocumentResizeListener();
                }, 1);
            });
            absolutePosition(this.panel, this.el.nativeElement);
        }
    }

    hideOverlay() {
        if (this.feedback && this.panel) {
            addClass(this.panel, 'p-connected-overlay-hidden');
            removeClass(this.panel, 'p-connected-overlay-visible');
            this.unbindScrollListener();
            this.unbindDocumentResizeListener();

            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    this.ngOnDestroy();
                }, 150);
            });
        }
    }

    @HostListener('focus')
    onFocus() {
        this.showOverlay();
    }

    @HostListener('blur')
    onBlur() {
        this.hideOverlay();
    }

    @HostListener('keyup', ['$event'])
    onKeyup(e: Event) {
        if (this.feedback) {
            let value = (e.target as HTMLInputElement).value,
                label = null,
                meterPos = null;

            if (value.length === 0) {
                label = this.promptLabel;
                meterPos = '0px 0px';
            } else {
                var score = this.testStrength(value);

                if (score < 30) {
                    label = this.weakLabel;
                    meterPos = '0px -10px';
                } else if (score >= 30 && score < 80) {
                    label = this.mediumLabel;
                    meterPos = '0px -20px';
                } else if (score >= 80) {
                    label = this.strongLabel;
                    meterPos = '0px -30px';
                }
            }

            if (!this.panel || !hasClass(this.panel, 'p-connected-overlay-visible')) {
                this.showOverlay();
            }

            this.renderer.setStyle(this.meter, 'backgroundPosition', meterPos);
            (this.info as HTMLDivElement).textContent = label;
        }
    }

    testStrength(str: string) {
        let grade: number = 0;
        let val: Nullable<RegExpMatchArray>;

        val = str.match('[0-9]');
        grade += this.normalize(val ? val.length : 1 / 4, 1) * 25;

        val = str.match('[a-zA-Z]');
        grade += this.normalize(val ? val.length : 1 / 2, 3) * 10;

        val = str.match('[!@#$%^&*?_~.,;=]');
        grade += this.normalize(val ? val.length : 1 / 6, 1) * 35;

        val = str.match('[A-Z]');
        grade += this.normalize(val ? val.length : 1 / 6, 1) * 30;

        grade *= str.length / 8;

        return grade > 100 ? 100 : grade;
    }

    normalize(x: number, y: number) {
        let diff = x - y;

        if (diff <= 0) return x / y;
        else return 1 + 0.5 * (x / (x + y / 4));
    }

    get disabled(): boolean {
        return this.el.nativeElement.disabled;
    }

    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.el.nativeElement, () => {
                if (hasClass(this.panel, 'p-connected-overlay-visible')) {
                    this.hideOverlay();
                }
            });
        }

        this.scrollHandler.bindScrollListener();
    }

    unbindScrollListener() {
        if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
        }
    }

    bindDocumentResizeListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.documentResizeListener) {
                const window = this.document.defaultView as Window;
                this.documentResizeListener = this.renderer.listen(window, 'resize', this.onWindowResize.bind(this));
            }
        }
    }

    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            this.documentResizeListener();
            this.documentResizeListener = null;
        }
    }

    onWindowResize() {
        if (!isTouchDevice()) {
            this.hideOverlay();
        }
    }

    ngOnDestroy() {
        if (this.panel) {
            if (this.scrollHandler) {
                this.scrollHandler.destroy();
                this.scrollHandler = null;
            }

            this.unbindDocumentResizeListener();

            this.renderer.removeChild(this.document.body, this.panel);
            this.panel = null;
            this.meter = null;
            this.info = null;
        }

        super.ngOnDestroy();
    }
}

type Mapper<T, G> = (item: T, ...args: any[]) => G;

@Pipe({
    name: 'mapper',
    pure: true,
    standalone: true
})
export class MapperPipe implements PipeTransform {
    public transform<T, G>(value: T, mapper: Mapper<T, G>, ...args: unknown[]): G {
        return mapper(value, ...args);
    }
}

export const Password_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Password),
    multi: true
};
/**
 * Password displays strength indicator for password fields.
 * @group Components
 */
@Component({
    selector: 'p-password',
    standalone: true,
    imports: [CommonModule, InputText, AutoFocus, TimesIcon, EyeSlashIcon, EyeIcon, MapperPipe, SharedModule],
    template: `
        <div [ngClass]="rootClass" [ngStyle]="style" [class]="styleClass" [attr.data-pc-name]="'password'" [attr.data-pc-section]="'root'">
            <input
                #input
                [attr.label]="label"
                [attr.aria-label]="ariaLabel"
                [attr.aria-labelledBy]="ariaLabelledBy"
                [attr.id]="inputId"
                pInputText
                [disabled]="disabled"
                [size]="size"
                [ngClass]="disabled | mapper: inputFieldClass"
                [ngStyle]="inputStyle"
                [class]="inputStyleClass"
                [attr.type]="unmasked | mapper: inputType"
                [attr.placeholder]="placeholder"
                [attr.autocomplete]="autocomplete"
                [value]="value"
                [variant]="variant"
                (input)="onInput($event)"
                (focus)="onInputFocus($event)"
                (blur)="onInputBlur($event)"
                (keyup)="onKeyUp($event)"
                [attr.maxlength]="maxLength"
                [attr.data-pc-section]="'input'"
                [pAutoFocus]="autofocus"
            />
            <ng-container *ngIf="showClear && value != null">
                <TimesIcon *ngIf="!clearIconTemplate" class="p-password-clear-icon" (click)="clear()" [attr.data-pc-section]="'clearIcon'" />
                <span (click)="clear()" class="p-password-clear-icon" [attr.data-pc-section]="'clearIcon'">
                    <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
                </span>
            </ng-container>

            <ng-container *ngIf="toggleMask">
                <ng-container *ngIf="unmasked">
                    <EyeSlashIcon class="p-password-toggle-mask-icon p-password-mask-icon" *ngIf="!hideIconTemplate" (click)="onMaskToggle()" [attr.data-pc-section]="'hideIcon'" />
                    <span *ngIf="hideIconTemplate" (click)="onMaskToggle()">
                        <ng-template *ngTemplateOutlet="hideIconTemplate; context: { class: 'p-password-toggle-mask-icon p-password-mask-icon' }"></ng-template>
                    </span>
                </ng-container>
                <ng-container *ngIf="!unmasked">
                    <EyeIcon *ngIf="!showIconTemplate" class="p-password-toggle-mask-icon p-password-mask-icon" (click)="onMaskToggle()" [attr.data-pc-section]="'showIcon'" />
                    <span *ngIf="showIconTemplate" (click)="onMaskToggle()">
                        <ng-template *ngTemplateOutlet="showIconTemplate"></ng-template>
                    </span>
                </ng-container>
            </ng-container>

            <div
                #overlay
                *ngIf="overlayVisible"
                class="p-password-overlay p-component"
                (click)="onOverlayClick($event)"
                [@overlayAnimation]="{
                    value: 'visible',
                    params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions }
                }"
                (@overlayAnimation.start)="onAnimationStart($event)"
                (@overlayAnimation.done)="onAnimationEnd($event)"
                [attr.data-pc-section]="'panel'"
            >
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                <ng-container *ngIf="contentTemplate; else content">
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </ng-container>
                <ng-template #content>
                    <div class="p-password-content">
                        <div class="p-password-meter" [attr.data-pc-section]="'meter'">
                            <div [ngClass]="meter | mapper: strengthClass" [ngStyle]="{ width: meter ? meter.width : '' }" [attr.data-pc-section]="'meterLabel'"></div>
                        </div>
                        <div class="p-password-meter-text" [attr.data-pc-section]="'info'">{{ infoText }}</div>
                    </div>
                </ng-template>
                <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
            </div>
        </div>
    `,
    animations: [trigger('overlayAnimation', [transition(':enter', [style({ opacity: 0, transform: 'scaleY(0.8)' }), animate('{{showTransitionParams}}')]), transition(':leave', [animate('{{hideTransitionParams}}', style({ opacity: 0 }))])])],
    providers: [Password_VALUE_ACCESSOR, PasswordStyle],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class Password extends BaseComponent implements OnInit {
    /**
     * Defines a string that labels the input for accessibility.
     * @group Props
     */
    @Input() ariaLabel: string | undefined;
    /**
     * Whether the component should span the full width of its parent.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) fluid: boolean | undefined;
    /**
     * Specifies one or more IDs in the DOM that labels the input field.
     * @group Props
     */
    @Input() ariaLabelledBy: string | undefined;
    /**
     * Label of the input for accessibility.
     * @group Props
     */
    @Input() label: string | undefined;
    /**
     * Indicates whether the component is disabled or not.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) disabled: boolean | undefined;
    /**
     * Text to prompt password entry. Defaults to PrimeNG I18N API configuration.
     * @group Props
     */
    @Input() promptLabel: string | undefined;
    /**
     * Regex value for medium regex.
     * @group Props
     */
    @Input() mediumRegex: string = '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})';
    /**
     * Regex value for strong regex.
     * @group Props
     */
    @Input() strongRegex: string = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})';
    /**
     * Text for a weak password. Defaults to PrimeNG I18N API configuration.
     * @group Props
     */
    @Input() weakLabel: string | undefined;
    /**
     * Text for a medium password. Defaults to PrimeNG I18N API configuration.
     * @group Props
     */
    @Input() mediumLabel: string | undefined;
    /**
     * specifies the maximum number of characters allowed in the input element.
     * @group Props
     */
    @Input({ transform: numberAttribute }) maxLength: number | undefined;
    /**
     * Text for a strong password. Defaults to PrimeNG I18N API configuration.
     * @group Props
     */
    @Input() strongLabel: string | undefined;
    /**
     * Identifier of the accessible input element.
     * @group Props
     */
    @Input() inputId: string | undefined;
    /**
     * Whether to show the strength indicator or not.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) feedback: boolean = true;
    /**
     * Id of the element or "body" for document where the overlay should be appended to.
     * @group Props
     */
    @Input() appendTo: HTMLElement | ElementRef | TemplateRef<any> | string | null | undefined | any;
    /**
     * Whether to show an icon to display the password as plain text.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) toggleMask: boolean | undefined;
    /**
     * Defines the size of the component.
     * @group Props
     */
    @Input() size: 'large' | 'small';
    /**
     * Style class of the input field.
     * @group Props
     */
    @Input() inputStyleClass: string | undefined;
    /**
     * Style class of the element.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Inline style of the component.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Inline style of the input field.
     * @group Props
     */
    @Input() inputStyle: { [klass: string]: any } | null | undefined;
    /**
     * Transition options of the show animation.
     * @group Props
     */
    @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';
    /**
     * Transition options of the hide animation.
     * @group Props
     */
    @Input() hideTransitionOptions: string = '.1s linear';
    /**
     * Specify automated assistance in filling out password by browser.
     * @group Props
     */
    @Input() autocomplete: string | undefined;
    /**
     * Advisory information to display on input.
     * @group Props
     */
    @Input() placeholder: string | undefined;
    /**
     * When enabled, a clear icon is displayed to clear the value.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showClear: boolean = false;
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autofocus: boolean | undefined;
    /**
     * Specifies the input variant of the component.
     * @group Props
     */
    @Input() variant: 'filled' | 'outlined' = 'outlined';
    /**
     * Callback to invoke when the component receives focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onFocus: EventEmitter<Event> = new EventEmitter<Event>();
    /**
     * Callback to invoke when the component loses focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onBlur: EventEmitter<Event> = new EventEmitter<Event>();
    /**
     * Callback to invoke when clear button is clicked.
     * @group Emits
     */
    @Output() onClear: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('input') input!: ElementRef;

    @ContentChild('content') contentTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('footerT') footerTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('header') headerTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('clearicon') clearIconTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('headericon') hideIconTemplate: Nullable<TemplateRef<any>>;

    @ContentChild('showicon') showIconTemplate: Nullable<TemplateRef<any>>;

    overlayVisible: boolean = false;

    meter: Nullable<Meter>;

    infoText: Nullable<string>;

    focused: boolean = false;

    unmasked: boolean = false;

    mediumCheckRegExp!: RegExp;

    strongCheckRegExp!: RegExp;

    resizeListener: VoidListener;

    scrollHandler: Nullable<ConnectedOverlayScrollHandler>;

    overlay: HTMLElement | ElementRef | null | undefined;

    value: Nullable<string> = null;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    translationSubscription: Nullable<Subscription>;

    _componentStyle = inject(PasswordStyle);

    get hasFluid() {
        const nativeElement = this.el.nativeElement;
        const fluidComponent = nativeElement.closest('p-fluid');
        return this.fluid || !!fluidComponent;
    }

    overlayService = inject(OverlayService);

    ngOnInit() {
        super.ngOnInit();
        this.infoText = this.promptText();
        this.mediumCheckRegExp = new RegExp(this.mediumRegex);
        this.strongCheckRegExp = new RegExp(this.strongRegex);
        this.translationSubscription = this.config.translationObserver.subscribe(() => {
            this.updateUI(this.value || '');
        });
    }

    onAnimationStart(event: AnimationEvent) {
        switch (event.toState) {
            case 'visible':
                this.overlay = event.element;
                ZIndexUtils.set('overlay', this.overlay, this.config.zIndex.overlay);
                this.appendContainer();
                this.alignOverlay();
                this.bindScrollListener();
                this.bindResizeListener();
                break;

            case 'void':
                this.unbindScrollListener();
                this.unbindResizeListener();
                this.overlay = null;
                break;
        }
    }

    onAnimationEnd(event: AnimationEvent) {
        switch (event.toState) {
            case 'void':
                ZIndexUtils.clear(event.element);
                break;
        }
    }

    appendContainer() {
        if (this.appendTo) {
            if (this.appendTo === 'body') this.renderer.appendChild(this.document.body, this.overlay);
            else (this.document as any).getElementById(this.appendTo).appendChild(this.overlay as HTMLElement);
        }
    }

    alignOverlay() {
        if (this.appendTo) {
            (this.overlay as HTMLElement).style.minWidth = getOuterWidth(this.input.nativeElement) + 'px';
            absolutePosition(this.overlay as any, this.input.nativeElement);
        } else {
            relativePosition(this.overlay as any, this.input.nativeElement);
        }
    }

    onInput(event: Event) {
        this.value = (event.target as HTMLInputElement).value;
        this.onModelChange(this.value);
    }

    onInputFocus(event: Event) {
        this.focused = true;
        if (this.feedback) {
            this.overlayVisible = true;
        }

        this.onFocus.emit(event);
    }

    onInputBlur(event: Event) {
        this.focused = false;
        if (this.feedback) {
            this.overlayVisible = false;
        }

        this.onModelTouched();
        this.onBlur.emit(event);
    }

    onKeyUp(event: KeyboardEvent) {
        if (this.feedback) {
            let value = (event.target as HTMLInputElement).value;
            this.updateUI(value);

            if (event.code === 'Escape') {
                this.overlayVisible && (this.overlayVisible = false);

                return;
            }

            if (!this.overlayVisible) {
                this.overlayVisible = true;
            }
        }
    }

    updateUI(value: string) {
        let label = null;
        let meter = null;

        switch (this.testStrength(value)) {
            case 1:
                label = this.weakText();
                meter = {
                    strength: 'weak',
                    width: '33.33%'
                };
                break;

            case 2:
                label = this.mediumText();
                meter = {
                    strength: 'medium',
                    width: '66.66%'
                };
                break;

            case 3:
                label = this.strongText();
                meter = {
                    strength: 'strong',
                    width: '100%'
                };
                break;

            default:
                label = this.promptText();
                meter = null;
                break;
        }

        this.meter = meter;
        this.infoText = label;
    }

    onMaskToggle() {
        this.unmasked = !this.unmasked;
    }

    onOverlayClick(event: Event) {
        this.overlayService.add({
            originalEvent: event,
            target: this.el.nativeElement
        });
    }

    testStrength(str: string) {
        let level = 0;

        if (this.strongCheckRegExp.test(str)) level = 3;
        else if (this.mediumCheckRegExp.test(str)) level = 2;
        else if (str.length) level = 1;

        return level;
    }

    writeValue(value: any): void {
        if (value === undefined) this.value = null;
        else this.value = value;

        if (this.feedback) this.updateUI(this.value || '');

        this.cd.markForCheck();
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    setDisabledState(val: boolean): void {
        this.disabled = val;
        this.cd.markForCheck();
    }

    bindScrollListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.scrollHandler) {
                this.scrollHandler = new ConnectedOverlayScrollHandler(this.input.nativeElement, () => {
                    if (this.overlayVisible) {
                        this.overlayVisible = false;
                    }
                });
            }

            this.scrollHandler.bindScrollListener();
        }
    }

    bindResizeListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.resizeListener) {
                const window = this.document.defaultView as Window;
                this.resizeListener = this.renderer.listen(window, 'resize', () => {
                    if (this.overlayVisible && !isTouchDevice()) {
                        this.overlayVisible = false;
                    }
                });
            }
        }
    }

    unbindScrollListener() {
        if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
        }
    }

    unbindResizeListener() {
        if (this.resizeListener) {
            this.resizeListener();
            this.resizeListener = null;
        }
    }

    containerClass(toggleMask: boolean) {
        return { 'p-password p-component p-inputwrapper': true, 'p-input-icon-right': toggleMask };
    }

    get rootClass() {
        return this._componentStyle.classes.root({ instance: this });
    }

    inputFieldClass(disabled: boolean) {
        return { 'p-password-input': true, 'p-disabled': disabled };
    }

    strengthClass(meter: any) {
        return `p-password-meter-label p-password-meter${meter?.strength ? `-${meter.strength}` : ''}`;
    }

    filled() {
        return this.value != null && this.value.toString().length > 0;
    }

    promptText() {
        return this.promptLabel || this.getTranslation(TranslationKeys.PASSWORD_PROMPT);
    }

    weakText() {
        return this.weakLabel || this.getTranslation(TranslationKeys.WEAK);
    }

    mediumText() {
        return this.mediumLabel || this.getTranslation(TranslationKeys.MEDIUM);
    }

    strongText() {
        return this.strongLabel || this.getTranslation(TranslationKeys.STRONG);
    }

    restoreAppend() {
        if (this.overlay && this.appendTo) {
            if (this.appendTo === 'body') this.renderer.removeChild(this.document.body, this.overlay);
            else (this.document as any).getElementById(this.appendTo).removeChild(this.overlay);
        }
    }

    inputType(unmasked: boolean) {
        return unmasked ? 'text' : 'password';
    }

    getTranslation(option: string) {
        return this.config.getTranslation(option);
    }

    clear() {
        this.value = null;
        this.onModelChange(this.value);
        this.writeValue(this.value);
        this.onClear.emit();
    }

    ngOnDestroy() {
        if (this.overlay) {
            ZIndexUtils.clear(this.overlay);
            this.overlay = null;
        }

        this.restoreAppend();
        this.unbindResizeListener();

        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }

        if (this.translationSubscription) {
            this.translationSubscription.unsubscribe();
        }

        super.ngOnDestroy();
    }
}

@NgModule({
    imports: [Password, PasswordDirective, SharedModule],
    exports: [PasswordDirective, Password, SharedModule]
})
export class PasswordModule {}
