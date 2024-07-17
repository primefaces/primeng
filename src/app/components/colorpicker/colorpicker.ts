import { AnimationEvent, animate, style, transition, trigger } from '@angular/animations';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    NgModule,
    OnDestroy,
    Output,
    PLATFORM_ID,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    booleanAttribute,
    forwardRef,
    inject,
    numberAttribute
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OverlayService, PrimeNGConfig, TranslationKeys } from 'primeng/api';
import { ConnectedOverlayScrollHandler, DomHandler } from 'primeng/dom';
import { AutoFocusModule } from 'primeng/autofocus';
import { Nullable, VoidListener } from 'primeng/ts-helpers';
import { ZIndexUtils } from 'primeng/utils';
import { ColorPickerChangeEvent } from './colorpicker.interface';
import { BaseComponent } from 'primeng/basecomponent';
import { ColorPickerStyle } from './style/colorpickerstyle';

export const COLORPICKER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ColorPicker),
    multi: true
};
/**
 * ColorPicker groups a collection of contents in tabs.
 * @group Components
 */
@Component({
    selector: 'p-colorPicker',
    template: `
        <div
            #container
            [ngStyle]="style"
            [class]="styleClass"
            [ngClass]="{ 'p-colorpicker p-component': true, 'p-colorpicker-overlay': !inline, 'p-colorpicker-dragging': colorDragging || hueDragging }"
            [attr.data-pc-name]="'colorpicker'"
            [attr.data-pc-section]="'root'"
        >
            <input
                *ngIf="!inline"
                #input
                type="text"
                class="p-colorpicker-preview"
                [ngClass]="{ 'p-disabled': disabled }"
                readonly="readonly"
                [attr.tabindex]="tabindex"
                [disabled]="disabled"
                (click)="onInputClick()"
                (keydown)="onInputKeydown($event)"
                (focus)="onInputFocus()"
                [attr.id]="inputId"
                [style.backgroundColor]="inputBgColor"
                [attr.data-pc-section]="'input'"
                [attr.aria-label]="ariaLabel"
                pAutoFocus
                [autofocus]="autofocus"
            />
            <div
                *ngIf="inline || overlayVisible"
                [ngClass]="{ 'p-colorpicker-panel': true, 'p-colorpicker-panel-inline': inline, 'p-disabled': disabled }"
                (click)="onOverlayClick($event)"
                [@overlayAnimation]="{ value: 'visible', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }"
                [@.disabled]="inline === true"
                (@overlayAnimation.start)="onOverlayAnimationStart($event)"
                (@overlayAnimation.done)="onOverlayAnimationEnd($event)"
                [attr.data-pc-section]="'panel'"
            >
                <div class="p-colorpicker-content" [attr.data-pc-section]="'content'">
                    <div #colorSelector class="p-colorpicker-color-selector" (touchstart)="onColorDragStart($event)" (touchmove)="onDrag($event)" (touchend)="onDragEnd()" (mousedown)="onColorMousedown($event)" [attr.data-pc-section]="'selector'">
                        <div class="p-colorpicker-color-background" [attr.data-pc-section]="'color'">
                            <div #colorHandle class="p-colorpicker-color-handle" [attr.data-pc-section]="'colorHandle'"></div>
                        </div>
                    </div>
                    <div #hue class="p-colorpicker-hue" (mousedown)="onHueMousedown($event)" (touchstart)="onHueDragStart($event)" (touchmove)="onDrag($event)" (touchend)="onDragEnd()" [attr.data-pc-section]="'hue'">
                        <div #hueHandle class="p-colorpicker-hue-handle" [attr.data-pc-section]="'hueHandle'"></div>
                    </div>
                </div>
            </div>
        </div>
    `,
    animations: [trigger('overlayAnimation', [transition(':enter', [style({ opacity: 0, transform: 'scaleY(0.8)' }), animate('{{showTransitionParams}}')]), transition(':leave', [animate('{{hideTransitionParams}}', style({ opacity: 0 }))])])],
    providers: [COLORPICKER_VALUE_ACCESSOR, ColorPickerStyle],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ColorPicker extends BaseComponent implements ControlValueAccessor, OnDestroy {
    /**
     * Inline style of the component.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the component.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Whether to display as an overlay or not.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) inline: boolean | undefined;
    /**
     * Format to use in value binding.
     * @group Props
     */
    @Input() format: 'hex' | 'rgb' | 'hsb' = 'hex';
    /**
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    @Input() appendTo: HTMLElement | ElementRef | TemplateRef<any> | string | null | undefined | any;
    /**
     * When present, it specifies that the component should be disabled.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) disabled: boolean | undefined;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    @Input() tabindex: string | undefined;
    /**
     * Identifier of the focus input to match a label defined for the dropdown.
     * @group Props
     */
    @Input() inputId: string | undefined;
    /**
     * Whether to automatically manage layering.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autoZIndex: boolean = true;
    /**
     * Base zIndex value to use in layering.
     * @group Props
     */
    @Input({ transform: numberAttribute }) baseZIndex: number = 0;
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
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autofocus: boolean | undefined;
    /**
     * Callback to invoke on value change.
     * @param {ColorPickerChangeEvent} event - Custom value change event.
     * @group Emits
     */
    @Output() onChange: EventEmitter<ColorPickerChangeEvent> = new EventEmitter<ColorPickerChangeEvent>();
    /**
     * Callback to invoke on panel is shown.
     * @group Emits
     */
    @Output() onShow: EventEmitter<any> = new EventEmitter<any>();
    /**
     * Callback to invoke on panel is hidden.
     * @group Emits
     */
    @Output() onHide: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('container') containerViewChild: Nullable<ElementRef>;

    @ViewChild('input') inputViewChild: Nullable<ElementRef>;

    value: any = { h: 0, s: 100, b: 100 };

    inputBgColor: string | undefined;

    shown: Nullable<boolean>;

    overlayVisible: Nullable<boolean>;

    defaultColor: string = 'ff0000';

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    documentClickListener: VoidListener;

    documentResizeListener: VoidListener;

    documentMousemoveListener: VoidListener;

    documentMouseupListener: VoidListener;

    documentHueMoveListener: VoidListener;

    scrollHandler: Nullable<ConnectedOverlayScrollHandler>;

    selfClick: Nullable<boolean>;

    colorDragging: Nullable<boolean>;

    hueDragging: Nullable<boolean>;

    overlay: Nullable<HTMLDivElement>;

    colorSelectorViewChild: Nullable<ElementRef>;

    colorHandleViewChild: Nullable<ElementRef>;

    hueViewChild: Nullable<ElementRef>;

    hueHandleViewChild: Nullable<ElementRef>;

    _componentStyle = inject(ColorPickerStyle);

    constructor(public overlayService: OverlayService) {
        super();
    }

    @ViewChild('colorSelector') set colorSelector(element: ElementRef) {
        this.colorSelectorViewChild = element;
    }

    @ViewChild('colorHandle') set colorHandle(element: ElementRef) {
        this.colorHandleViewChild = element;
    }

    @ViewChild('hue') set hue(element: ElementRef) {
        this.hueViewChild = element;
    }

    @ViewChild('hueHandle') set hueHandle(element: ElementRef) {
        this.hueHandleViewChild = element;
    }

    get ariaLabel() {
        return this.config?.getTranslation(TranslationKeys.ARIA)[TranslationKeys.SELECT_COLOR];
    }

    onHueMousedown(event: MouseEvent) {
        if (this.disabled) {
            return;
        }

        this.bindDocumentMousemoveListener();
        this.bindDocumentMouseupListener();

        this.hueDragging = true;
        this.pickHue(event);
    }

    onHueDragStart(event: TouchEvent) {
        if (this.disabled) {
            return;
        }

        this.hueDragging = true;
        this.pickHue(event, (event as TouchEvent).changedTouches[0]);
    }

    onColorDragStart(event: TouchEvent) {
        if (this.disabled) {
            return;
        }

        this.colorDragging = true;
        this.pickColor(event, (event as TouchEvent).changedTouches[0]);
    }

    pickHue(event: MouseEvent | TouchEvent, position?: any) {
        let pageY = position ? position.pageY : (event as MouseEvent).pageY;
        let top: number = this.hueViewChild?.nativeElement.getBoundingClientRect().top + ((this.document as any).defaultView.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0);
        this.value = this.validateHSB({
            h: Math.floor((360 * (150 - Math.max(0, Math.min(150, pageY - top)))) / 150),
            s: this.value.s,
            b: this.value.b
        });

        this.updateColorSelector();
        this.updateUI();
        this.updateModel();
        this.onChange.emit({ originalEvent: event, value: this.getValueToUpdate() });
    }

    onColorMousedown(event: MouseEvent) {
        if (this.disabled) {
            return;
        }

        this.bindDocumentMousemoveListener();
        this.bindDocumentMouseupListener();

        this.colorDragging = true;
        this.pickColor(event);
    }

    onDrag(event: TouchEvent) {
        if (this.colorDragging) {
            this.pickColor(event, event.changedTouches[0]);
            event.preventDefault();
        }

        if (this.hueDragging) {
            this.pickHue(event, event.changedTouches[0]);
            event.preventDefault();
        }
    }

    onDragEnd() {
        this.colorDragging = false;
        this.hueDragging = false;

        this.unbindDocumentMousemoveListener();
        this.unbindDocumentMouseupListener();
    }

    pickColor(event: MouseEvent | TouchEvent, position?: any) {
        let pageX = position ? position.pageX : (event as MouseEvent).pageX;
        let pageY = position ? position.pageY : (event as MouseEvent).pageY;
        let rect = this.colorSelectorViewChild?.nativeElement.getBoundingClientRect();
        let top = rect.top + ((this.document as any).defaultView.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0);
        let left = rect.left + this.document.body.scrollLeft;
        let saturation = Math.floor((100 * Math.max(0, Math.min(150, pageX - left))) / 150);
        let brightness = Math.floor((100 * (150 - Math.max(0, Math.min(150, pageY - top)))) / 150);
        this.value = this.validateHSB({
            h: this.value.h,
            s: saturation,
            b: brightness
        });

        this.updateUI();
        this.updateModel();
        this.onChange.emit({ originalEvent: event, value: this.getValueToUpdate() });
    }

    getValueToUpdate() {
        let val: any;
        switch (this.format) {
            case 'hex':
                val = '#' + this.HSBtoHEX(this.value);
                break;

            case 'rgb':
                val = this.HSBtoRGB(this.value);
                break;

            case 'hsb':
                val = this.value;
                break;
        }

        return val;
    }

    updateModel(): void {
        this.onModelChange(this.getValueToUpdate());
        this.cd.markForCheck();
    }

    writeValue(value: any): void {
        if (value) {
            switch (this.format) {
                case 'hex':
                    this.value = this.HEXtoHSB(value);
                    break;

                case 'rgb':
                    this.value = this.RGBtoHSB(value);
                    break;

                case 'hsb':
                    this.value = value;
                    break;
            }
        } else {
            this.value = this.HEXtoHSB(this.defaultColor);
        }

        this.updateColorSelector();
        this.updateUI();
        this.cd.markForCheck();
    }

    updateColorSelector() {
        if (this.colorSelectorViewChild) {
            const hsb: any = {};
            hsb.s = 100;
            hsb.b = 100;
            hsb.h = this.value.h;

            this.colorSelectorViewChild.nativeElement.style.backgroundColor = '#' + this.HSBtoHEX(hsb);
        }
    }

    updateUI() {
        if (this.colorHandleViewChild && this.hueHandleViewChild?.nativeElement) {
            this.colorHandleViewChild.nativeElement.style.left = Math.floor((150 * this.value.s) / 100) + 'px';
            this.colorHandleViewChild.nativeElement.style.top = Math.floor((150 * (100 - this.value.b)) / 100) + 'px';
            this.hueHandleViewChild.nativeElement.style.top = Math.floor(150 - (150 * this.value.h) / 360) + 'px';
        }

        this.inputBgColor = '#' + this.HSBtoHEX(this.value);
    }

    onInputFocus() {
        this.onModelTouched();
    }

    show() {
        this.overlayVisible = true;
        this.cd.markForCheck();
    }

    onOverlayAnimationStart(event: AnimationEvent) {
        switch (event.toState) {
            case 'visible':
                if (!this.inline) {
                    this.overlay = event.element;
                    this.appendOverlay();

                    if (this.autoZIndex) {
                        ZIndexUtils.set('overlay', this.overlay, this.config.zIndex.overlay);
                    }

                    this.alignOverlay();
                    this.bindDocumentClickListener();
                    this.bindDocumentResizeListener();
                    this.bindScrollListener();

                    this.updateColorSelector();
                    this.updateUI();
                }
                break;

            case 'void':
                this.onOverlayHide();
                break;
        }
    }

    onOverlayAnimationEnd(event: AnimationEvent) {
        switch (event.toState) {
            case 'visible':
                if (!this.inline) {
                    this.onShow.emit({});
                }
                break;

            case 'void':
                if (this.autoZIndex) {
                    ZIndexUtils.clear(event.element);
                }

                this.onHide.emit({});
                break;
        }
    }

    appendOverlay() {
        if (this.appendTo) {
            if (this.appendTo === 'body') this.renderer.appendChild(this.document.body, this.overlay);
            else DomHandler.appendChild(this.overlay, this.appendTo);
        }
    }

    restoreOverlayAppend() {
        if (this.overlay && this.appendTo) {
            this.renderer.appendChild(this.el.nativeElement, this.overlay);
        }
    }

    alignOverlay() {
        if (this.appendTo) DomHandler.absolutePosition(this.overlay, this.inputViewChild?.nativeElement);
        else DomHandler.relativePosition(this.overlay, this.inputViewChild?.nativeElement);
    }

    hide() {
        this.overlayVisible = false;
        this.cd.markForCheck();
    }

    onInputClick() {
        this.selfClick = true;
        this.togglePanel();
    }

    togglePanel() {
        if (!this.overlayVisible) this.show();
        else this.hide();
    }

    onInputKeydown(event: KeyboardEvent) {
        switch (event.code) {
            case 'Space':
                this.togglePanel();
                event.preventDefault();
                break;

            case 'Escape':
            case 'Tab':
                this.hide();
                break;

            default:
                //NoOp
                break;
        }
    }

    onOverlayClick(event: MouseEvent) {
        this.overlayService.add({
            originalEvent: event,
            target: this.el.nativeElement
        });

        this.selfClick = true;
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

    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : 'document';

            this.documentClickListener = this.renderer.listen(documentTarget, 'click', () => {
                if (!this.selfClick) {
                    this.overlayVisible = false;
                    this.unbindDocumentClickListener();
                }

                this.selfClick = false;
                this.cd.markForCheck();
            });
        }
    }

    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }

    bindDocumentMousemoveListener() {
        if (!this.documentMousemoveListener) {
            const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : 'document';

            this.documentMousemoveListener = this.renderer.listen(documentTarget, 'mousemove', (event: MouseEvent) => {
                if (this.colorDragging) {
                    this.pickColor(event);
                }

                if (this.hueDragging) {
                    this.pickHue(event);
                }
            });
        }
    }

    unbindDocumentMousemoveListener() {
        if (this.documentMousemoveListener) {
            this.documentMousemoveListener();
            this.documentMousemoveListener = null;
        }
    }

    bindDocumentMouseupListener() {
        if (!this.documentMouseupListener) {
            const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : 'document';

            this.documentMouseupListener = this.renderer.listen(documentTarget, 'mouseup', () => {
                this.colorDragging = false;
                this.hueDragging = false;
                this.unbindDocumentMousemoveListener();
                this.unbindDocumentMouseupListener();
            });
        }
    }

    unbindDocumentMouseupListener() {
        if (this.documentMouseupListener) {
            this.documentMouseupListener();
            this.documentMouseupListener = null;
        }
    }

    bindDocumentResizeListener() {
        if (isPlatformBrowser(this.platformId)) {
            this.documentResizeListener = this.renderer.listen(this.document.defaultView, 'resize', this.onWindowResize.bind(this));
        }
    }

    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            this.documentResizeListener();
            this.documentResizeListener = null;
        }
    }

    onWindowResize() {
        if (this.overlayVisible && !DomHandler.isTouchDevice()) {
            this.hide();
        }
    }

    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.containerViewChild?.nativeElement, () => {
                if (this.overlayVisible) {
                    this.hide();
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

    validateHSB(hsb: { h: number; s: number; b: number }) {
        return {
            h: Math.min(360, Math.max(0, hsb.h)),
            s: Math.min(100, Math.max(0, hsb.s)),
            b: Math.min(100, Math.max(0, hsb.b))
        };
    }

    validateRGB(rgb: { r: number; g: number; b: number }) {
        return {
            r: Math.min(255, Math.max(0, rgb.r)),
            g: Math.min(255, Math.max(0, rgb.g)),
            b: Math.min(255, Math.max(0, rgb.b))
        };
    }

    validateHEX(hex: string) {
        var len = 6 - hex.length;
        if (len > 0) {
            var o = [];
            for (var i = 0; i < len; i++) {
                o.push('0');
            }
            o.push(hex);
            hex = o.join('');
        }
        return hex;
    }

    HEXtoRGB(hex: string) {
        let hexValue = parseInt(hex.indexOf('#') > -1 ? hex.substring(1) : hex, 16);
        return { r: hexValue >> 16, g: (hexValue & 0x00ff00) >> 8, b: hexValue & 0x0000ff };
    }

    HEXtoHSB(hex: string) {
        return this.RGBtoHSB(this.HEXtoRGB(hex));
    }

    RGBtoHSB(rgb: { r: number; g: number; b: number }) {
        var hsb = {
            h: 0,
            s: 0,
            b: 0
        };
        var min = Math.min(rgb.r, rgb.g, rgb.b);
        var max = Math.max(rgb.r, rgb.g, rgb.b);
        var delta = max - min;
        hsb.b = max;
        hsb.s = max != 0 ? (255 * delta) / max : 0;
        if (hsb.s != 0) {
            if (rgb.r == max) {
                hsb.h = (rgb.g - rgb.b) / delta;
            } else if (rgb.g == max) {
                hsb.h = 2 + (rgb.b - rgb.r) / delta;
            } else {
                hsb.h = 4 + (rgb.r - rgb.g) / delta;
            }
        } else {
            hsb.h = -1;
        }
        hsb.h *= 60;
        if (hsb.h < 0) {
            hsb.h += 360;
        }
        hsb.s *= 100 / 255;
        hsb.b *= 100 / 255;
        return hsb;
    }

    HSBtoRGB(hsb: { h: number; s: number; b: number }) {
        var rgb = {
            r: 0,
            g: 0,
            b: 0
        };
        let h: number = hsb.h;
        let s: number = (hsb.s * 255) / 100;
        let v: number = (hsb.b * 255) / 100;
        if (s == 0) {
            rgb = {
                r: v,
                g: v,
                b: v
            };
        } else {
            let t1: number = v;
            let t2: number = ((255 - s) * v) / 255;
            let t3: number = ((t1 - t2) * (h % 60)) / 60;
            if (h == 360) h = 0;
            if (h < 60) {
                rgb.r = t1;
                rgb.b = t2;
                rgb.g = t2 + t3;
            } else if (h < 120) {
                rgb.g = t1;
                rgb.b = t2;
                rgb.r = t1 - t3;
            } else if (h < 180) {
                rgb.g = t1;
                rgb.r = t2;
                rgb.b = t2 + t3;
            } else if (h < 240) {
                rgb.b = t1;
                rgb.r = t2;
                rgb.g = t1 - t3;
            } else if (h < 300) {
                rgb.b = t1;
                rgb.g = t2;
                rgb.r = t2 + t3;
            } else if (h < 360) {
                rgb.r = t1;
                rgb.g = t2;
                rgb.b = t1 - t3;
            } else {
                rgb.r = 0;
                rgb.g = 0;
                rgb.b = 0;
            }
        }
        return { r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b) };
    }

    RGBtoHEX(rgb: { r: number; g: number; b: number }) {
        var hex = [rgb.r.toString(16), rgb.g.toString(16), rgb.b.toString(16)];

        for (var key in hex) {
            if (hex[key].length == 1) {
                hex[key] = '0' + hex[key];
            }
        }

        return hex.join('');
    }

    HSBtoHEX(hsb: { h: number; s: number; b: number }) {
        return this.RGBtoHEX(this.HSBtoRGB(hsb));
    }

    onOverlayHide() {
        this.unbindScrollListener();
        this.unbindDocumentResizeListener();
        this.unbindDocumentClickListener();
        this.overlay = null;
    }

    ngOnDestroy() {
        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }

        if (this.overlay && this.autoZIndex) {
            ZIndexUtils.clear(this.overlay);
        }

        this.restoreOverlayAppend();
        this.onOverlayHide();
    }
}

@NgModule({
    imports: [CommonModule, AutoFocusModule],
    exports: [ColorPicker],
    declarations: [ColorPicker]
})
export class ColorPickerModule {}
