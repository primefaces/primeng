import { NgModule, Component, ElementRef, Input, Output, OnDestroy, EventEmitter, forwardRef, Renderer2, ViewChild, ChangeDetectorRef } from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DomHandler } from '../dom/domhandler';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const COLORPICKER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ColorPicker),
  multi: true
};

@Component({
    selector: 'p-colorPicker',
    template: `
        <div [ngStyle]="style" [class]="styleClass" [ngClass]="{'ui-colorpicker ui-widget':true,'ui-colorpicker-overlay':!inline,'ui-colorpicker-dragging':colorDragging||hueDragging}">
            <input #input type="text" *ngIf="!inline" class="ui-colorpicker-preview ui-inputtext ui-state-default ui-corner-all" readonly="readonly" [ngClass]="{'ui-state-disabled': disabled}"
                (focus)="onInputFocus()" (click)="onInputClick()" (keydown)="onInputKeydown($event)" [attr.id]="inputId" [attr.tabindex]="tabindex" [disabled]="disabled"
                [style.backgroundColor]="inputBgColor">
            <div *ngIf="inline || overlayVisible" [ngClass]="{'ui-colorpicker-panel ui-corner-all': true, 'ui-colorpicker-overlay-panel ui-shadow':!inline, 'ui-state-disabled': disabled}" (click)="onPanelClick()"
                [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" [@.disabled]="inline === true" (@overlayAnimation.start)="onOverlayAnimationStart($event)">
                <div class="ui-colorpicker-content">
                    <div #colorSelector class="ui-colorpicker-color-selector" (mousedown)="onColorMousedown($event)">
                        <div class="ui-colorpicker-color">
                            <div #colorHandle class="ui-colorpicker-color-handle"></div>
                        </div>
                    </div>
                    <div #hue class="ui-colorpicker-hue" (mousedown)="onHueMousedown($event)">
                        <div #hueHandle class="ui-colorpicker-hue-handle"></div>
                    </div>
                </div>
            </div>
        </div>
    `,
    animations: [
        trigger('overlayAnimation', [
            state('void', style({
                transform: 'translateY(5%)',
                opacity: 0
            })),
            state('visible', style({
                transform: 'translateY(0)',
                opacity: 1
            })),
            transition('void => visible', animate('{{showTransitionParams}}')),
            transition('visible => void', animate('{{hideTransitionParams}}'))
        ])
    ],
    providers: [DomHandler,COLORPICKER_VALUE_ACCESSOR]
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

    @Input() showTransitionOptions: string = '225ms ease-out';

    @Input() hideTransitionOptions: string = '195ms ease-in';
    
    @Output() onChange: EventEmitter<any> = new EventEmitter();
    
    @ViewChild('input') inputViewChild: ElementRef;
    
    value: any;
    
    inputBgColor: string;
    
    shown: boolean;
    
    overlayVisible: boolean;
    
    defaultColor: string = 'ff0000';
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};
    
    documentClickListener: Function;
    
    documentMousemoveListener: Function;
    
    documentMouseupListener: Function;
    
    documentHueMoveListener: Function;
                
    selfClick: boolean;
    
    colorDragging: boolean;
    
    hueDragging: boolean;

    overlay: HTMLDivElement;

    colorSelectorViewChild: ElementRef;
    
    colorHandleViewChild: ElementRef;
    
    hueViewChild: ElementRef;
    
    hueHandleViewChild: ElementRef;
                
    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer2, public cd: ChangeDetectorRef) {}
        
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
        if(this.disabled) {
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
        if(this.disabled) {
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
        if(value) {
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
            if(this.appendTo === 'body')
                document.body.appendChild(this.overlay);
            else
                this.domHandler.appendChild(this.overlay, this.appendTo);
        }
    }

    restoreOverlayAppend() {
        if (this.overlay && this.appendTo) {
            this.el.nativeElement.appendChild(this.overlay);
        }
    }
    
    alignOverlay() {
        if(this.appendTo)
            this.domHandler.absolutePosition(this.overlay, this.inputViewChild.nativeElement);
        else
            this.domHandler.relativePosition(this.overlay, this.inputViewChild.nativeElement);
    }
    
    hide() {
        this.overlayVisible = false;
    }
         
    onInputClick() {
        this.selfClick = true;
        this.togglePanel();
    }
    
    togglePanel() {
        if(!this.overlayVisible)
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
    }
    
    bindDocumentClickListener() {
        if(!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', () => {
                if(!this.selfClick) {
                    this.overlayVisible = false;
                    this.unbindDocumentClickListener();
                }
                
                this.selfClick = false;
                this.cd.markForCheck();
            });
        }    
    }
    
    unbindDocumentClickListener() {
        if(this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }
    
    bindDocumentMousemoveListener() {
        if(!this.documentMousemoveListener) {
            this.documentMousemoveListener = this.renderer.listen('document', 'mousemove', (event: MouseEvent) => {
                if(this.colorDragging) {
                    this.pickColor(event);
                }
                
                if(this.hueDragging) {
                    this.pickHue(event);
                }
            });
        }
    }
    
    unbindDocumentMousemoveListener() {
        if(this.documentMousemoveListener) {
            this.documentMousemoveListener();
            this.documentMousemoveListener = null;
        }
    }
    
    bindDocumentMouseupListener() {
        if(!this.documentMouseupListener) {
            this.documentMouseupListener = this.renderer.listen('document', 'mouseup', () => {
                this.colorDragging = false;
                this.hueDragging = false;
                this.unbindDocumentMousemoveListener();
                this.unbindDocumentMouseupListener();
            });
        }
    }
    
    unbindDocumentMouseupListener() {
        if(this.documentMouseupListener) {
            this.documentMouseupListener();
            this.documentMouseupListener = null;
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
        if (max != 0) {
            
        }
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
        var h = Math.round(hsb.h);
        var s = Math.round(hsb.s*255/100);
        var v = Math.round(hsb.b*255/100);
        if(s == 0) {
            rgb = {
                r: v,
                g: v,
                b: v
            }
        } 
        else {
            var t1 = v;
            var t2 = (255-s)*v/255;
            var t3 = (t1-t2)*(h%60)/60;
            if(h==360) h = 0;
            if(h<60) {rgb.r=t1;	rgb.b=t2; rgb.g=t2+t3}
            else if(h<120) {rgb.g=t1; rgb.b=t2;	rgb.r=t1-t3}
            else if(h<180) {rgb.g=t1; rgb.r=t2;	rgb.b=t2+t3}
            else if(h<240) {rgb.b=t1; rgb.r=t2;	rgb.g=t1-t3}
            else if(h<300) {rgb.b=t1; rgb.g=t2;	rgb.r=t2+t3}
            else if(h<360) {rgb.r=t1; rgb.g=t2;	rgb.b=t1-t3}
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
            if(hex[key].length == 1) {
                hex[key] = '0' + hex[key];
            }
        }        

        return hex.join('');
    }
    
    HSBtoHEX(hsb) {
        return this.RGBtoHEX(this.HSBtoRGB(hsb));
    }

    onOverlayHide() {
        this.unbindDocumentClickListener();
        this.overlay = null;
    }
    
    ngOnDestroy() {
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
