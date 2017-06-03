import {NgModule,Component,ElementRef,Input,Output,OnDestroy,EventEmitter,forwardRef,Renderer2,ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

export const COLORPICKER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ColorPicker),
  multi: true
};

@Component({
    selector: 'p-colorPicker',
    template: `
        <div [ngStyle]="style" [class]="styleClass" [ngClass]="'ui-colorpicker ui-widget'">
            <button type="button" class="ui-colorpicker-button ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" *ngIf="!inline">
                <span class="ui-button-text ui-c">
                    <span #preview class="ui-colorpicker-preview">Live Preview</span>
                </span>
            </button>
            <div #panel [ngClass]="{'ui-colorpicker-panel ui-widget-content ui-corner-all': true, 'ui-colorpicker-overlay ui-shadow':!inline}">
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
    providers: [DomHandler,COLORPICKER_VALUE_ACCESSOR]
})
export class ColorPicker implements ControlValueAccessor, OnDestroy{

    @Input() style: any;

    @Input() styleClass: string;
    
    @Input() inline: boolean;
    
    @ViewChild('panel') panelViewChild: ElementRef;
    
    @ViewChild('colorSelector') colorSelectorViewChild: ElementRef;
    
    @ViewChild('colorHandle') colorHandleViewChild: ElementRef;
    
    @ViewChild('hue') hueViewChild: ElementRef;
    
    @ViewChild('hueHandle') hueHandleViewChild: ElementRef;
    
    @ViewChild('preview') previewViewChild: ElementRef;
    
    value: any;
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};
            
    disabled: boolean;
                
    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer2) {}
    
    onHueMousedown(event: MouseEvent) {
        let top: number = (<HTMLElement> event.currentTarget).getBoundingClientRect().top + document.body.scrollTop;
        this.value = this.validateHSB({
            h: Math.floor(360 * (150 - Math.max(0, Math.min(150, (event.pageY - top)))) / 150),
            s: 100,
            b: 100
        });
        
        this.hueHandleViewChild.nativeElement.style.top = Math.floor(150 - (150 * this.value.h / 360)) + 'px';
        this.colorSelectorViewChild.nativeElement.style.backgroundColor = '#' + this.HSBtoHEX(this.value);
        this.previewViewChild.nativeElement.style.backgroundColor = '#' + this.HSBtoHEX(this.value);
        this.onModelChange(this.value);
    }
    
    onColorMousedown(event: MouseEvent) {
        let rect = (<HTMLElement> event.currentTarget).getBoundingClientRect();
        let top = rect.top + document.body.scrollTop;
        let left = rect.left + document.body.scrollLeft;
        let saturation = Math.floor(100 * (Math.max(0, Math.min(150, (event.pageX - left)))) / 150);
        let brightness = Math.floor(100 * (150 - Math.max(0, Math.min(150, (event.pageY - top)))) / 150);
        this.value = this.validateHSB({
            h: this.value.h,
            s: saturation,
            b: brightness
        });
        
        this.colorHandleViewChild.nativeElement.style.left =  Math.floor(150 * this.value.s / 100) + 'px';
        this.colorHandleViewChild.nativeElement.style.top =  Math.floor(150 * (100 - this.value.b) / 100) + 'px'
            
        this.onModelChange(this.value);
    }

    writeValue(value: any) : void {
        this.value = value;
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
    
    ngOnDestroy() {
        
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [ColorPicker],
    declarations: [ColorPicker]
})
export class ColorPickerModule { }