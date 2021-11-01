import {
    NgModule,
    Component,
    ElementRef,
    Input,
    Output,
    OnDestroy,
    EventEmitter,
    forwardRef,
    Renderer2,
    ViewChild,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    ViewEncapsulation,
} from "@angular/core";
import {
    trigger,
    state,
    style,
    transition,
    animate,
    AnimationEvent,
} from "@angular/animations";
import { CommonModule } from "@angular/common";
import { DomHandler, ConnectedOverlayScrollHandler } from "primeng/dom";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { OverlayService, PrimeNGConfig } from "primeng/api";
import { ZIndexUtils } from "primeng/utils";

export const COLORPICKER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ColorPicker),
    multi: true,
};

@Component({
    selector: "p-colorPicker",
    template: `
        <div
            #container
            [ngStyle]="style"
            [class]="styleClass"
            [ngClass]="{
                'p-colorpicker p-component': true,
                'p-colorpicker-overlay': !inline,
                'p-colorpicker-dragging':
                    colorDragging || hueDragging || alphaDragging
            }"
        >
            <input
                #input
                type="text"
                *ngIf="!inline"
                class="p-colorpicker-preview p-inputtext"
                readonly="readonly"
                [ngClass]="{ 'p-disabled': disabled }"
                (focus)="onInputFocus()"
                (click)="onInputClick()"
                (keydown)="onInputKeydown($event)"
                [attr.id]="inputId"
                [attr.tabindex]="tabindex"
                [disabled]="disabled"
                [style.backgroundColor]="inputBgColor"
            />
            <div
                *ngIf="inline || overlayVisible"
                [ngClass]="{
                    'p-colorpicker-panel': true,
                    'p-colorpicker-alpha': useAlpha,
                    'p-colorpicker-overlay-panel': !inline,
                    'p-disabled': disabled
                }"
                (click)="onOverlayClick($event)"
                [@overlayAnimation]="{
                    value: 'visible',
                    params: {
                        showTransitionParams: showTransitionOptions,
                        hideTransitionParams: hideTransitionOptions
                    }
                }"
                [@.disabled]="inline === true"
                (@overlayAnimation.start)="onOverlayAnimationStart($event)"
                (@overlayAnimation.done)="onOverlayAnimationEnd($event)"
            >
                <div class="p-colorpicker-content">
                    <div
                        #colorSelector
                        class="p-colorpicker-color-selector"
                        (touchstart)="onColorTouchStart($event)"
                        (touchmove)="onMove($event)"
                        (touchend)="onDragEnd()"
                        (mousedown)="onColorMousedown($event)"
                    >
                        <div class="p-colorpicker-color">
                            <div
                                #colorHandle
                                class="p-colorpicker-color-handle"
                            ></div>
                        </div>
                    </div>
                    <div
                        #hue
                        class="p-colorpicker-hue"
                        (mousedown)="onHueMousedown($event)"
                        (touchstart)="onHueTouchStart($event)"
                        (touchmove)="onMove($event)"
                        (touchend)="onDragEnd()"
                    >
                        <div #hueHandle class="p-colorpicker-hue-handle"></div>
                    </div>
                    <div
                        *ngIf="useAlpha"
                        #alpha
                        class="p-colorpicker-alpha"
                        (mousedown)="onAlphaMousedown($event)"
                        (touchstart)="onAlphaTouchStart($event)"
                        (touchmove)="onMove($event)"
                        (touchend)="onDragEnd()"
                    >
                        <div
                            #alphaHandle
                            class="p-colorpicker-alpha-handle"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    `,
    animations: [
        trigger("overlayAnimation", [
            transition(":enter", [
                style({ opacity: 0, transform: "scaleY(0.8)" }),
                animate("{{showTransitionParams}}"),
            ]),
            transition(":leave", [
                animate("{{hideTransitionParams}}", style({ opacity: 0 })),
            ]),
        ]),
    ],
    providers: [COLORPICKER_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./colorpicker.css"],
    host: {
        class: "p-element",
    },
})
export class ColorPicker implements ControlValueAccessor, OnDestroy {
    @Input() style: any;

    @Input() styleClass: string;

    @Input() inline: boolean;

    @Input() format: string = "hex";

    @Input() useAlpha: boolean = false;

    @Input() appendTo: any;

    @Input() disabled: boolean;

    @Input() tabindex: string;

    @Input() inputId: string;

    @Input() autoZIndex: boolean = true;

    @Input() baseZIndex: number = 0;

    @Input() showTransitionOptions: string = ".12s cubic-bezier(0, 0, 0.2, 1)";

    @Input() hideTransitionOptions: string = ".1s linear";

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @Output() onShow: EventEmitter<any> = new EventEmitter();

    @Output() onHide: EventEmitter<any> = new EventEmitter();

    @ViewChild("container") containerViewChild: ElementRef;

    @ViewChild("input") inputViewChild: ElementRef;

    value: any = { h: 0, s: 100, b: 100, a: 1 };

    inputBgColor: string;

    shown: boolean;

    overlayVisible: boolean;

    defaultColor: string = "ff0000";

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    documentClickListener: Function;

    documentResizeListener: any;

    documentMousemoveListener: Function;

    documentMouseupListener: Function;

    documentHueMoveListener: Function;

    scrollHandler: any;

    selfClick: boolean;

    colorDragging: boolean;

    hueDragging: boolean;

    alphaDragging: boolean;

    overlay: HTMLDivElement;

    colorSelectorViewChild: ElementRef;

    colorHandleViewChild: ElementRef;

    hueViewChild: ElementRef;

    hueHandleViewChild: ElementRef;

    alphaViewChild: ElementRef;

    alphaHandleViewChild: ElementRef;

    constructor(
        public el: ElementRef,
        public renderer: Renderer2,
        public cd: ChangeDetectorRef,
        public config: PrimeNGConfig,
        public overlayService: OverlayService
    ) {}

    @ViewChild("colorSelector") set colorSelector(element: ElementRef) {
        this.colorSelectorViewChild = element;
    }

    @ViewChild("colorHandle") set colorHandle(element: ElementRef) {
        this.colorHandleViewChild = element;
    }

    @ViewChild("hue") set hue(element: ElementRef) {
        this.hueViewChild = element;
    }

    @ViewChild("hueHandle") set hueHandle(element: ElementRef) {
        this.hueHandleViewChild = element;
    }

    @ViewChild("alpha") set alpha(element: ElementRef) {
        this.alphaViewChild = element;
    }

    @ViewChild("alphaHandle") set alphaHandle(element: ElementRef) {
        this.alphaHandleViewChild = element;
    }

    onAlphaMousedown(event: MouseEvent) {
        if (this.disabled || !this.useAlpha) {
            return;
        }

        this.selfClick = true;

        this.bindDocumentMousemoveListener();
        this.bindDocumentMouseupListener();

        this.alphaDragging = true;
        this.pickAlpha(event);
    }

    onAlphaTouchStart(event: Touch) {
        if (this.disabled || !this.useAlpha) {
            return;
        }

        this.alphaDragging = true;
        this.pickAlpha(event);
    }

    pickAlpha(event: MouseEvent | Touch) {
        if (!this.useAlpha) {
            return;
        }

        const alphaContainer: HTMLElement = this.alphaViewChild.nativeElement;

        const clientLeft = alphaContainer.getBoundingClientRect().left;
        const alphaValue = Math.max(
            Math.min(
                Number(
                    (
                        (event.clientX - clientLeft) /
                        alphaContainer.clientWidth
                    ).toFixed(2)
                ),
                1
            ),
            0
        );

        this.value = this.validateHSB({
            h: this.value.h,
            s: this.value.s,
            b: this.value.b,
            a: alphaValue,
        });

        this.updateColorSelector();
        this.updateUI();
        this.updateModel();
        this.onChange.emit({
            originalEvent: event,
            value: this.getValueToUpdate(),
        });
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

    onHueTouchStart(event) {
        if (this.disabled) {
            return;
        }

        this.hueDragging = true;
        this.pickHue(event, event.changedTouches[0]);
    }

    onColorTouchStart(event) {
        if (this.disabled) {
            return;
        }

        this.colorDragging = true;
        this.pickColor(event, event.changedTouches[0]);
    }

    pickHue(event, position?) {
        let pageY = position ? position.pageY : event.pageY;
        let top: number =
            this.hueViewChild.nativeElement.getBoundingClientRect().top +
            (window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop ||
                0);
        this.value = this.validateHSB({
            h: Math.floor(
                (360 * (150 - Math.max(0, Math.min(150, pageY - top)))) / 150
            ),
            s: this.value.s,
            b: this.value.b,
            a: this.value.a,
        });

        this.updateColorSelector();
        this.updateUI();
        this.updateModel();
        this.onChange.emit({
            originalEvent: event,
            value: this.getValueToUpdate(),
        });
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

    onMove(event) {
        if (this.colorDragging) {
            this.pickColor(event, event.changedTouches[0]);
            event.preventDefault();
        }

        if (this.hueDragging) {
            this.pickHue(event, event.changedTouches[0]);
            event.preventDefault();
        }

        if (this.alphaDragging) {
            this.pickAlpha(event);
            event.preventDefault();
        }
    }

    onDragEnd() {
        this.colorDragging = false;
        this.hueDragging = false;
        this.alphaDragging = false;

        this.unbindDocumentMousemoveListener();
        this.unbindDocumentMouseupListener();
    }

    pickColor(event, position?) {
        let pageX = position ? position.pageX : event.pageX;
        let pageY = position ? position.pageY : event.pageY;
        let rect =
            this.colorSelectorViewChild.nativeElement.getBoundingClientRect();
        let top =
            rect.top +
            (window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop ||
                0);
        let left = rect.left + document.body.scrollLeft;
        let saturation = Math.floor(
            (100 * Math.max(0, Math.min(150, pageX - left))) / 150
        );
        let brightness = Math.floor(
            (100 * (150 - Math.max(0, Math.min(150, pageY - top)))) / 150
        );
        this.value = this.validateHSB({
            h: this.value.h,
            s: saturation,
            b: brightness,
            a: this.value.a,
        });

        this.updateUI();
        this.updateModel();
        this.onChange.emit({
            originalEvent: event,
            value: this.getValueToUpdate(),
        });
    }

    getValueToUpdate() {
        let val: any;
        switch (this.format) {
            case "hex":
                val = "#" + this.HSBtoHEX(this.value);
                break;

            case "rgb":
                val = this.HSBtoRGB(this.value);
                break;

            case "hsb":
                val = this.value;
                break;
        }

        return val;
    }

    updateModel(): void {
        this.onModelChange(this.getValueToUpdate());
    }

    writeValue(value: any): void {
        if (value) {
            switch (this.format) {
                case "hex":
                    this.value = this.HEXtoHSB(value);
                    break;

                case "rgb":
                    this.value = this.RGBtoHSB(value);
                    break;

                case "hsb":
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
            hsb.a = 1;

            const hex = this.HSBtoHEX(hsb);

            this.colorSelectorViewChild.nativeElement.style.backgroundColor =
                "#" + hex;

            if (this.useAlpha && this.alphaViewChild) {
                this.alphaViewChild.nativeElement.style.backgroundColor =
                    "#" + hex;
            }
        }
    }

    updateUI() {
        if (
            this.colorHandleViewChild &&
            this.hueHandleViewChild.nativeElement
        ) {
            this.colorHandleViewChild.nativeElement.style.left =
                Math.floor((150 * this.value.s) / 100) + "px";
            this.colorHandleViewChild.nativeElement.style.top =
                Math.floor((150 * (100 - this.value.b)) / 100) + "px";
            this.hueHandleViewChild.nativeElement.style.top =
                Math.floor(150 - (150 * this.value.h) / 360) + "px";

            if (
                this.useAlpha &&
                this.alphaViewChild.nativeElement &&
                this.alphaHandleViewChild.nativeElement
            ) {
                const alphaWidth =
                    this.alphaViewChild.nativeElement.clientWidth;
                const maxLeft = alphaWidth - (4 + 2);

                this.alphaHandleViewChild.nativeElement.style.left =
                    Math.max(
                        Math.min(
                            Math.floor(alphaWidth * this.value.a),
                            maxLeft
                        ),
                        4
                    ) + "px";
            }
        }

        this.inputBgColor = "#" + this.HSBtoHEX(this.value);
    }

    onInputFocus() {
        this.onModelTouched();
    }

    show() {
        this.overlayVisible = true;
    }

    onOverlayAnimationStart(event: AnimationEvent) {
        switch (event.toState) {
            case "visible":
                if (!this.inline) {
                    this.overlay = event.element;
                    this.appendOverlay();

                    if (this.autoZIndex) {
                        ZIndexUtils.set(
                            "overlay",
                            this.overlay,
                            this.config.zIndex.overlay
                        );
                    }

                    this.alignOverlay();
                    this.bindDocumentClickListener();
                    this.bindDocumentResizeListener();
                    this.bindScrollListener();

                    this.updateColorSelector();
                    this.updateUI();
                }
                break;

            case "void":
                this.onOverlayHide();
                break;
        }
    }

    onOverlayAnimationEnd(event: AnimationEvent) {
        switch (event.toState) {
            case "visible":
                if (!this.inline) {
                    this.onShow.emit({});
                }
                break;

            case "void":
                if (this.autoZIndex) {
                    ZIndexUtils.clear(event.element);
                }

                this.onHide.emit({});
                break;
        }
    }

    appendOverlay() {
        if (this.appendTo) {
            if (this.appendTo === "body")
                document.body.appendChild(this.overlay);
            else DomHandler.appendChild(this.overlay, this.appendTo);
        }
    }

    restoreOverlayAppend() {
        if (this.overlay && this.appendTo) {
            this.el.nativeElement.appendChild(this.overlay);
        }
    }

    alignOverlay() {
        if (this.appendTo)
            DomHandler.absolutePosition(
                this.overlay,
                this.inputViewChild.nativeElement
            );
        else
            DomHandler.relativePosition(
                this.overlay,
                this.inputViewChild.nativeElement
            );
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
        switch (event.which) {
            //space
            case 32:
                this.togglePanel();
                event.preventDefault();
                break;

            //escape and tab
            case 27:
            case 9:
                this.hide();
                break;
        }
    }

    onOverlayClick(event) {
        this.overlayService.add({
            originalEvent: event,
            target: this.el.nativeElement,
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
            const documentTarget: any = this.el
                ? this.el.nativeElement.ownerDocument
                : "document";

            this.documentClickListener = this.renderer.listen(
                documentTarget,
                "click",
                () => {
                    if (!this.selfClick) {
                        this.overlayVisible = false;
                        this.unbindDocumentClickListener();
                    }

                    this.selfClick = false;
                    this.cd.markForCheck();
                }
            );
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
            const documentTarget: any = this.el
                ? this.el.nativeElement.ownerDocument
                : "document";

            this.documentMousemoveListener = this.renderer.listen(
                documentTarget,
                "mousemove",
                (event: MouseEvent) => {
                    if (this.colorDragging) {
                        this.pickColor(event);
                    }

                    if (this.hueDragging) {
                        this.pickHue(event);
                    }

                    if (this.alphaDragging) {
                        this.pickAlpha(event);
                    }
                }
            );
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
            const documentTarget: any = this.el
                ? this.el.nativeElement.ownerDocument
                : "document";

            this.documentMouseupListener = this.renderer.listen(
                documentTarget,
                "mouseup",
                () => {
                    this.colorDragging = false;
                    this.hueDragging = false;
                    this.alphaDragging = false;
                    this.unbindDocumentMousemoveListener();
                    this.unbindDocumentMouseupListener();
                }
            );
        }
    }

    unbindDocumentMouseupListener() {
        if (this.documentMouseupListener) {
            this.documentMouseupListener();
            this.documentMouseupListener = null;
        }
    }

    bindDocumentResizeListener() {
        this.documentResizeListener = this.onWindowResize.bind(this);
        window.addEventListener("resize", this.documentResizeListener);
    }

    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            window.removeEventListener("resize", this.documentResizeListener);
            this.documentResizeListener = null;
        }
    }

    onWindowResize() {
        this.hide();
    }

    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(
                this.containerViewChild.nativeElement,
                () => {
                    if (this.overlayVisible) {
                        this.hide();
                    }
                }
            );
        }

        this.scrollHandler.bindScrollListener();
    }

    unbindScrollListener() {
        if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
        }
    }

    validateHSB(hsba) {
        return {
            h: Math.min(360, Math.max(0, hsba.h)),
            s: Math.min(100, Math.max(0, hsba.s)),
            b: Math.min(100, Math.max(0, hsba.b)),
            a: Math.min(1, Math.max(0, hsba.a)),
        };
    }

    validateRGB(rgba) {
        return {
            r: Math.min(255, Math.max(0, rgba.r)),
            g: Math.min(255, Math.max(0, rgba.g)),
            b: Math.min(255, Math.max(0, rgba.b)),
            a: Math.min(1, Math.max(0, rgba.a)),
        };
    }

    validateHEX(hex) {
        var len = 6 - hex.length;
        if (len > 0) {
            var o = [];
            for (var i = 0; i < len; i++) {
                o.push("0");
            }
            o.push(hex);
            hex = o.join("");
        }
        return hex;
    }

    HEXtoRGB(hex) {
        const cleanHexStr = hex.indexOf("#") > -1 ? hex.substring(1) : hex;

        const rgba = {
            r: parseInt(cleanHexStr.slice(0, 2), 16),
            g: parseInt(cleanHexStr.slice(2, 4), 16),
            b: parseInt(cleanHexStr.slice(4, 6), 16),
            a: 1,
        };

        if (cleanHexStr.length === 8) {
            rgba.a = parseInt(cleanHexStr.slice(6, 8), 16) / 255;
        }

        return rgba;
    }

    HEXtoHSB(hex) {
        return this.RGBtoHSB(this.HEXtoRGB(hex));
    }

    RGBtoHSB(rgba) {
        var hsba = {
            h: 0,
            s: 0,
            b: 0,
            a: rgba.a,
        };
        var min = Math.min(rgba.r, rgba.g, rgba.b);
        var max = Math.max(rgba.r, rgba.g, rgba.b);
        var delta = max - min;
        hsba.b = max;
        hsba.s = max != 0 ? (255 * delta) / max : 0;
        if (hsba.s != 0) {
            if (rgba.r == max) {
                hsba.h = (rgba.g - rgba.b) / delta;
            } else if (rgba.g == max) {
                hsba.h = 2 + (rgba.b - rgba.r) / delta;
            } else {
                hsba.h = 4 + (rgba.r - rgba.g) / delta;
            }
        } else {
            hsba.h = -1;
        }
        hsba.h *= 60;
        if (hsba.h < 0) {
            hsba.h += 360;
        }
        hsba.s *= 100 / 255;
        hsba.b *= 100 / 255;
        return hsba;
    }

    HSBtoRGB(hsba) {
        var rgba = {
            r: null,
            g: null,
            b: null,
            a: hsba.a,
        };
        let h: number = hsba.h;
        let s: number = (hsba.s * 255) / 100;
        let v: number = (hsba.b * 255) / 100;
        if (s == 0) {
            rgba = {
                r: v,
                g: v,
                b: v,
                a: hsba.a,
            };
        } else {
            let t1: number = v;
            let t2: number = ((255 - s) * v) / 255;
            let t3: number = ((t1 - t2) * (h % 60)) / 60;
            if (h == 360) h = 0;
            if (h < 60) {
                rgba.r = t1;
                rgba.b = t2;
                rgba.g = t2 + t3;
            } else if (h < 120) {
                rgba.g = t1;
                rgba.b = t2;
                rgba.r = t1 - t3;
            } else if (h < 180) {
                rgba.g = t1;
                rgba.r = t2;
                rgba.b = t2 + t3;
            } else if (h < 240) {
                rgba.b = t1;
                rgba.r = t2;
                rgba.g = t1 - t3;
            } else if (h < 300) {
                rgba.b = t1;
                rgba.g = t2;
                rgba.r = t2 + t3;
            } else if (h < 360) {
                rgba.r = t1;
                rgba.g = t2;
                rgba.b = t1 - t3;
            } else {
                rgba.r = 0;
                rgba.g = 0;
                rgba.b = 0;
            }
        }
        return {
            r: Math.round(rgba.r),
            g: Math.round(rgba.g),
            b: Math.round(rgba.b),
            a: rgba.a,
        };
    }

    RGBtoHEX(rgba) {
        var hex = [
            rgba.r.toString(16),
            rgba.g.toString(16),
            rgba.b.toString(16),
        ];

        if (this.useAlpha && rgba.a != null) {
            const alphaHex = Math.floor(rgba.a * 256).toString(16);
            if (alphaHex !== "100") {
                hex.push(alphaHex);
            }
        }

        for (var key in hex) {
            if (hex[key].length == 1) {
                hex[key] = "0" + hex[key];
            }
        }

        return hex.join("");
    }

    HSBtoHEX(hsb) {
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
    imports: [CommonModule],
    exports: [ColorPicker],
    declarations: [ColorPicker],
})
export class ColorPickerModule {}
