import { NgModule, Component, ElementRef, Input, Output, OnDestroy, EventEmitter, forwardRef, Renderer2, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DomHandler, ConnectedOverlayScrollHandler } from 'primeng/dom';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const COLORPICKER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ColorPicker),
    multi: true
};

@Component({
    selector: 'p-colorPicker',
    template: `
        <div #container [ngStyle]="style" [class]="styleClass" [ngClass]="{'p-colorpicker p-component':true,'p-colorpicker-overlay':!inline,'p-colorpicker-dragging':colorDragging||hueDragging}">
            <input #input type="text" *ngIf="!inline" class="p-colorpicker-preview p-inputtext" readonly="readonly" [ngClass]="{'p-disabled': disabled}"
                (focus)="onInputFocus()" (click)="onInputClick()" (keydown)="onInputKeydown($event)" [attr.id]="inputId" [attr.tabindex]="tabindex" [disabled]="disabled"
                [style.backgroundColor]="inputBgColor">
            <div *ngIf="inline || overlayVisible" [ngClass]="{'p-colorpicker-panel': true, 'p-colorpicker-overlay-panel':!inline, 'p-disabled': disabled}" (click)="onPanelClick()"
                [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" [@.disabled]="inline === true" (@overlayAnimation.start)="onOverlayAnimationStart($event)">
                <div class="p-colorpicker-content">
                    <div #colorSelector class="p-colorpicker-color-selector" (mousedown)="onColorMousedown($event)">
                        <div class="p-colorpicker-color">
                            <div #colorHandle class="p-colorpicker-color-handle"></div>
                        </div>
                    </div>
                    <div #hue class="p-colorpicker-hue" (mousedown)="onHueMousedown($event)">
                        <div #hueHandle class="p-colorpicker-hue-handle"></div>
                    </div>
                </div>
            </div>
        </div>
    `,
    animations: [
        trigger('overlayAnimation', [
            transition(':enter', [
                style({opacity: 0, transform: 'scaleY(0.8)'}),
                animate('{{showTransitionParams}}')
              ]),
              transition(':leave', [
                animate('{{hideTransitionParams}}', style({ opacity: 0 }))
              ])
        ])
    ],
    providers: [COLORPICKER_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./colorpicker.css']
})
export class ColorPicker implements ControlValueAccessor, OnDestroy {

    @Input() style: any;

    @Input() styleClass: string;

    @Input() inline: boolean;

    @Input() format: string = 'hex';

    @Input() appendTo: string;

    @Input() disabled: boolean;

    @Input() tabindex: string;

    @Input() inputId: string;

    @Input() autoZIndex: boolean = true;

    @Input() baseZIndex: number = 0;

    @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';

    @Input() hideTransitionOptions: string = '.1s linear';

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @ViewChild('container') containerViewChild: ElementRef;

    @ViewChild('input') inputViewChild: ElementRef;

    value: any;

    inputBgColor: string;

    shown: boolean;

    overlayVisible: boolean;

    defaultColor: string = 'ff0000';

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

    overlay: HTMLDivElement;

    colorSelectorViewChild: ElementRef;

    colorHandleViewChild: ElementRef;

    hueViewChild: ElementRef;

    hueHandleViewChild: ElementRef;

    constructor(public el: ElementRef, public renderer: Renderer2, public cd: ChangeDetectorRef) {}

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

    onHueMousedown(event: MouseEvent) {
        if (this.disabled) {
            return;
        }

        this.bindDocumentMousemoveListener();
        this.bindDocumentMouseupListener();

        this.hueDragging = true;
        this.pickHue(event);
    }

    pickHue(event: MouseEvent) {
        let top: number = this.hueViewChild.nativeElement.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
        this.value = this.validateHSB({
            h: Math.floor(360 * (150 - Math.max(0, Math.min(150, (event.pageY - top)))) / 150),
            s: this.value.s,
            b: this.value.b
        });

        this.updateColorSelector();
        this.updateUI();
        this.updateModel();
        this.onChange.emit({originalEvent: event, value: this.getValueToUpdate()});
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

    pickColor(event: MouseEvent) {
        let rect = this.colorSelectorViewChild.nativeElement.getBoundingClientRect();
        let top = rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
        let left = rect.left + document.body.scrollLeft;
        let saturation = Math.floor(100 * (Math.max(0, Math.min(150, (event.pageX - left)))) / 150);
        let brightness = Math.floor(100 * (150 - Math.max(0, Math.min(150, (event.pageY - top)))) / 150);
        this.value = this.validateHSB({
            h: this.value.h,
            s: saturation,
            b: brightness
        });

        this.updateUI();
        this.updateModel();
        this.onChange.emit({originalEvent: event, value: this.getValueToUpdate()});
    }

    getValueToUpdate() {
        let val: any;
        switch(this.format) {
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
    }

    writeValue(value: any): void {
        if (value) {
            switch(this.format) {
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
        }
        else {
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
        if (this.colorHandleViewChild && this.hueHandleViewChild.nativeElement) {
            this.colorHandleViewChild.nativeElement.style.left =  Math.floor(150 * this.value.s / 100) + 'px';
            this.colorHandleViewChild.nativeElement.style.top =  Math.floor(150 * (100 - this.value.b) / 100) + 'px';
            this.hueHandleViewChild.nativeElement.style.top = Math.floor(150 - (150 * this.value.h / 360)) + 'px';

        }

        this.inputBgColor = '#' + this.HSBtoHEX(this.value);
    }

    onInputFocus() {
        this.onModelTouched();
    }

    show() {
        this.overlayVisible = true;
    }

    onOverlayAnimationStart(event: AnimationEvent) {
        switch(event.toState) {
            case 'visible':
                if (!this.inline) {
                    this.overlay = event.element;
                    this.appendOverlay();
                    if (this.autoZIndex) {
                        this.overlay.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
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

    appendOverlay() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.overlay);
            else
                DomHandler.appendChild(this.overlay, this.appendTo);
        }
    }

    restoreOverlayAppend() {
        if (this.overlay && this.appendTo) {
            this.el.nativeElement.appendChild(this.overlay);
        }
    }

    alignOverlay() {
        if (this.appendTo)
            DomHandler.absolutePosition(this.overlay, this.inputViewChild.nativeElement);
        else
            DomHandler.relativePosition(this.overlay, this.inputViewChild.nativeElement);
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
        if (!this.overlayVisible)
            this.show();
        else
            this.hide();
    }

    onInputKeydown(event: KeyboardEvent) {
        switch(event.which) {
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

    onPanelClick() {
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
        this.documentResizeListener = this.onWindowResize.bind(this);
        window.addEventListener('resize', this.documentResizeListener);
    }

    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    }

    onWindowResize() {
        this.hide();
    }

    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.containerViewChild.nativeElement, () => {
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

    validateHSB(hsb) {
        return {
            h: Math.min(360, Math.max(0, hsb.h)),
            s: Math.min(100, Math.max(0, hsb.s)),
            b: Math.min(100, Math.max(0, hsb.b))
        };
    }

    validateRGB(rgb) {
        return {
            r: Math.min(255, Math.max(0, rgb.r)),
            g: Math.min(255, Math.max(0, rgb.g)),
            b: Math.min(255, Math.max(0, rgb.b))
        };
    }

    validateHEX(hex) {
        var len = 6 - hex.length;
        if (len > 0) {
            var o = [];
            for (var i=0; i<len; i++) {
                o.push('0');
            }
            o.push(hex);
            hex = o.join('');
        }
        return hex;
    }

    HEXtoRGB(hex) {
        let hexValue = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
        return {r: hexValue >> 16, g: (hexValue & 0x00FF00) >> 8, b: (hexValue & 0x0000FF)};
    }

    HEXtoHSB(hex) {
        return this.RGBtoHSB(this.HEXtoRGB(hex));
    }

    RGBtoHSB(rgb) {
        var hsb = {
            h: 0,
            s: 0,
            b: 0
        };
        var min = Math.min(rgb.r, rgb.g, rgb.b);
        var max = Math.max(rgb.r, rgb.g, rgb.b);
        var delta = max - min;
        hsb.b = max;
        hsb.s = max != 0 ? 255 * delta / max : 0;
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
        hsb.s *= 100/255;
        hsb.b *= 100/255;
        return hsb;
    }

    HSBtoRGB(hsb) {
        var rgb = {
            r: null, g: null, b: null
        };
        let h: number = hsb.h;
        let s: number = hsb.s*255/100;
        let v: number = hsb.b*255/100;
        if (s == 0) {
            rgb = {
                r: v,
                g: v,
                b: v
            }
        }
        else {
            let t1: number = v;
            let t2: number = (255-s)*v/255;
            let t3: number = (t1-t2)*(h%60)/60;
            if (h==360) h = 0;
            if (h<60) {rgb.r=t1;	rgb.b=t2; rgb.g=t2+t3}
            else if (h<120) {rgb.g=t1; rgb.b=t2;	rgb.r=t1-t3}
            else if (h<180) {rgb.g=t1; rgb.r=t2;	rgb.b=t2+t3}
            else if (h<240) {rgb.b=t1; rgb.r=t2;	rgb.g=t1-t3}
            else if (h<300) {rgb.b=t1; rgb.g=t2;	rgb.r=t2+t3}
            else if (h<360) {rgb.r=t1; rgb.g=t2;	rgb.b=t1-t3}
            else {rgb.r=0; rgb.g=0;	rgb.b=0}
        }
        return {r:Math.round(rgb.r), g:Math.round(rgb.g), b:Math.round(rgb.b)};
    }

    RGBtoHEX(rgb) {
        var hex = [
            rgb.r.toString(16),
            rgb.g.toString(16),
            rgb.b.toString(16)
        ];

        for(var key in hex) {
            if (hex[key].length == 1) {
                hex[key] = '0' + hex[key];
            }
        }

        return hex.join('');
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

        this.restoreOverlayAppend();
        this.onOverlayHide();
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [ColorPicker],
    declarations: [ColorPicker]
})
export class ColorPickerModule { }
