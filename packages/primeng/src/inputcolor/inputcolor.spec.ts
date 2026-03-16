import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { providePrimeNG } from 'primeng/config';
import {
    HSBColor,
    HSLColor,
    RGBColor,
    OKLCHColor,
    parseColor,
    getChannelRange,
    getInputChannelRange,
    getInputChannelValue,
    getChannelGradient,
    getAreaGradient,
    getDefault2DAxes,
    getDefault3DAxes,
    snapValue,
    ColorInstance,
    ColorSpace,
    ColorInputChannel,
    ColorSliderChannel
} from './color-manager';
import { InputColor, InputColorModule } from './inputcolor';
import { InputColorInput } from './inputcolor-input';
import { InputColorSlider } from './inputcolor-slider';
import { InputColorSliderThumb } from './inputcolor-slider-thumb';
import { InputColorSliderTrack } from './inputcolor-slider-track';
import { InputColorArea } from './inputcolor-area';
import { InputColorAreaThumb } from './inputcolor-area-thumb';
import { InputColorSwatch } from './inputcolor-swatch';
import { InputColorSwatchBackground } from './inputcolor-swatch-background';
import { InputColorTransparencyGrid } from './inputcolor-transparency-grid';
import { InputColorEyeDropper } from './inputcolor-eyedropper';

// ─── Test Wrapper Components ───────────────────────────────────────────

@Component({
    standalone: false,
    template: `
        <p-inputcolor [(ngModel)]="color" [format]="format" [defaultValue]="defaultValue" (onValueChange)="onValueChange($event)" (onValueChangeEnd)="onValueChangeEnd($event)">
            <p-inputcolor-slider [channel]="sliderChannel" [orientation]="sliderOrientation">
                <p-inputcolor-slider-track />
                <p-inputcolor-slider-thumb />
            </p-inputcolor-slider>
            <p-inputcolor-area>
                <p-inputcolor-area-thumb />
            </p-inputcolor-area>
            <p-inputcolor-swatch>
                <p-inputcolor-swatch-background />
                <p-inputcolor-transparency-grid />
            </p-inputcolor-swatch>
        </p-inputcolor>
    `
})
class TestBasicComponent {
    color: string | null = null;
    format: ColorSpace = 'hsba';
    defaultValue: string | ColorInstance | null = null;
    sliderChannel: ColorSliderChannel = 'hue';
    sliderOrientation: 'horizontal' | 'vertical' = 'horizontal';

    valueChangeEvent: any;
    valueChangeEndEvent: any;

    onValueChange(event: any) {
        this.valueChangeEvent = event;
    }
    onValueChangeEnd(event: any) {
        this.valueChangeEndEvent = event;
    }
}

@Component({
    standalone: false,
    template: `
        <p-inputcolor [(ngModel)]="color" [format]="format">
            <input pInputColorInput [channel]="channel" />
        </p-inputcolor>
    `
})
class TestInputChannelsComponent {
    color: string | null = '#ff0000';
    format: ColorSpace = 'hsba';
    channel: ColorInputChannel = 'hex';
}

@Component({
    standalone: false,
    template: `
        <p-inputcolor [(ngModel)]="color">
            <input pInputColorInput [channel]="'hue'" [type]="'text'" />
        </p-inputcolor>
    `
})
class TestCustomTypeInputComponent {
    color: string = '#ff0000';
}

@Component({
    standalone: false,
    template: `
        <form [formGroup]="form">
            <p-inputcolor formControlName="selectedColor" [format]="format">
                <input pInputColorInput [channel]="'hex'" />
            </p-inputcolor>
        </form>
    `
})
class TestReactiveFormComponent {
    form = new FormGroup({
        selectedColor: new FormControl<string | null>(null, [Validators.required])
    });
    format: ColorSpace = 'hsba';
}

@Component({
    standalone: false,
    template: `
        <p-inputcolor [(ngModel)]="color" [format]="format">
            <input pInputColorInput [channel]="'hex'" />
            <input pInputColorInput [channel]="'css'" />
        </p-inputcolor>
    `
})
class TestFormatComponent {
    color: string = '#ff0000';
    format: ColorSpace = 'hsba';
}

@Component({
    standalone: false,
    template: `
        <p-inputcolor [(ngModel)]="color">
            <p-inputcolor-eyedropper [iconOnly]="iconOnly" [outlined]="outlined" [severity]="severity" [text]="text" [rounded]="rounded" [size]="size"> Pick </p-inputcolor-eyedropper>
        </p-inputcolor>
    `
})
class TestEyeDropperComponent {
    color: string = '#ff0000';
    iconOnly = false;
    outlined = false;
    severity: string | undefined = undefined;
    text = false;
    rounded = false;
    size: string | undefined = undefined;
}

// ─── Color Manager Pure Function Tests ─────────────────────────────────

describe('Color Manager', () => {
    // ── HSBColor ──────────────────────────────────────────────────────

    describe('HSBColor', () => {
        describe('construction & clamping', () => {
            it('should create with valid values', () => {
                const c = new HSBColor(120, 50, 75, 0.8);
                expect(c.hue).toBe(120);
                expect(c.saturation).toBe(50);
                expect(c.brightness).toBe(75);
                expect(c.alpha).toBe(0.8);
            });

            it('should keep hue 360 as-is', () => {
                expect(new HSBColor(360, 100, 100).hue).toBe(360);
            });

            it('should normalize hue > 360', () => {
                expect(new HSBColor(400, 50, 50).hue).toBe(40);
            });

            it('should normalize negative hue via mod', () => {
                expect(new HSBColor(-30, 50, 50).hue).toBe(330);
            });

            it('should clamp saturation to 0-100', () => {
                expect(new HSBColor(0, -10, 50).saturation).toBe(0);
                expect(new HSBColor(0, 150, 50).saturation).toBe(100);
            });

            it('should clamp brightness to 0-100', () => {
                expect(new HSBColor(0, 50, -5).brightness).toBe(0);
                expect(new HSBColor(0, 50, 200).brightness).toBe(100);
            });

            it('should clamp alpha to 0-1', () => {
                expect(new HSBColor(0, 50, 50, -0.5).alpha).toBe(0);
                expect(new HSBColor(0, 50, 50, 2).alpha).toBe(1);
            });

            it('should default alpha to 1', () => {
                expect(new HSBColor(0, 50, 50).alpha).toBe(1);
            });

            it('should have colorSpace hsba', () => {
                expect(new HSBColor(0, 0, 0).colorSpace).toBe('hsba');
            });
        });

        describe('getChannelValue', () => {
            const c = new HSBColor(120, 60, 80, 0.5);

            it('should return native channels', () => {
                expect(c.getChannelValue('hue')).toBe(120);
                expect(c.getChannelValue('saturation')).toBe(60);
                expect(c.getChannelValue('brightness')).toBe(80);
                expect(c.getChannelValue('alpha')).toBe(0.5);
            });

            it('should delegate lightness to HSL', () => {
                const l = c.getChannelValue('lightness');
                expect(typeof l).toBe('number');
                expect(l).toBeGreaterThan(0);
                expect(l).toBeLessThan(100);
            });

            it('should delegate red/green/blue to RGB', () => {
                expect(c.getChannelValue('red')).toBeGreaterThanOrEqual(0);
                expect(c.getChannelValue('green')).toBeGreaterThanOrEqual(0);
                expect(c.getChannelValue('blue')).toBeGreaterThanOrEqual(0);
            });

            it('should delegate oklch channels to OKLCH', () => {
                expect(typeof c.getChannelValue('L')).toBe('number');
                expect(typeof c.getChannelValue('C')).toBe('number');
            });
        });

        describe('setChannelValue', () => {
            const c = new HSBColor(120, 60, 80, 1);

            it('should return a new instance (immutability)', () => {
                const newC = c.setChannelValue('hue', 200);
                expect(newC).not.toBe(c);
                expect(c.hue).toBe(120);
            });

            it('should set native channels', () => {
                expect((c.setChannelValue('hue', 200) as HSBColor).hue).toBe(200);
                expect((c.setChannelValue('saturation', 30) as HSBColor).saturation).toBe(30);
                expect((c.setChannelValue('brightness', 90) as HSBColor).brightness).toBe(90);
                expect(c.setChannelValue('alpha', 0.3).alpha).toBe(0.3);
            });

            it('should set lightness through HSL conversion', () => {
                const newC = c.setChannelValue('lightness', 50);
                expect(newC).toBeDefined();
                expect(newC instanceof HSBColor).toBeTrue();
            });

            it('should set red through RGB conversion', () => {
                const newC = c.setChannelValue('red', 128);
                expect(newC).toBeDefined();
            });

            it('should set oklch channels through OKLCH conversion', () => {
                const newC = c.setChannelValue('L', 0.5);
                expect(newC instanceof HSBColor).toBeTrue();
            });
        });

        describe('conversions', () => {
            it('should convert pure red to RGB(255,0,0)', () => {
                const rgb = new HSBColor(0, 100, 100).toRGB();
                expect(Math.round(rgb.red)).toBe(255);
                expect(Math.round(rgb.green)).toBe(0);
                expect(Math.round(rgb.blue)).toBe(0);
            });

            it('should convert pure green to RGB(0,255,0)', () => {
                const rgb = new HSBColor(120, 100, 100).toRGB();
                expect(Math.round(rgb.red)).toBe(0);
                expect(Math.round(rgb.green)).toBe(255);
                expect(Math.round(rgb.blue)).toBe(0);
            });

            it('should convert pure blue to RGB(0,0,255)', () => {
                const rgb = new HSBColor(240, 100, 100).toRGB();
                expect(Math.round(rgb.red)).toBe(0);
                expect(Math.round(rgb.green)).toBe(0);
                expect(Math.round(rgb.blue)).toBe(255);
            });

            it('should convert black', () => {
                const rgb = new HSBColor(0, 0, 0).toRGB();
                expect(Math.round(rgb.red)).toBe(0);
                expect(Math.round(rgb.green)).toBe(0);
                expect(Math.round(rgb.blue)).toBe(0);
            });

            it('should convert white', () => {
                const rgb = new HSBColor(0, 0, 100).toRGB();
                expect(Math.round(rgb.red)).toBe(255);
                expect(Math.round(rgb.green)).toBe(255);
                expect(Math.round(rgb.blue)).toBe(255);
            });

            it('should preserve alpha in toRGB', () => {
                const rgb = new HSBColor(0, 100, 100, 0.5).toRGB();
                expect(rgb.alpha).toBe(0.5);
            });

            it('should roundtrip HSB→HSL→HSB', () => {
                const original = new HSBColor(200, 75, 60);
                const roundtripped = original.toHSL().toHSB();
                expect(Math.abs(roundtripped.hue - original.hue)).toBeLessThan(1);
                expect(Math.abs(roundtripped.saturation - original.saturation)).toBeLessThan(1);
                expect(Math.abs(roundtripped.brightness - original.brightness)).toBeLessThan(1);
            });

            it('should convert to OKLCH', () => {
                const oklch = new HSBColor(0, 100, 100).toOKLCH();
                expect(oklch).toBeInstanceOf(OKLCHColor);
                expect(oklch.L).toBeGreaterThan(0);
            });

            it('toHSB should return a clone', () => {
                const c = new HSBColor(120, 50, 50);
                const hsb = c.toHSB();
                expect(hsb).not.toBe(c);
                expect(hsb.hue).toBe(c.hue);
            });
        });

        describe('clone', () => {
            it('should create a new instance with same values', () => {
                const c = new HSBColor(120, 60, 80, 0.7);
                const cl = c.clone();
                expect(cl).not.toBe(c);
                expect(cl.hue).toBe(120);
                expect(cl.saturation).toBe(60);
                expect(cl.brightness).toBe(80);
                expect(cl.alpha).toBe(0.7);
            });
        });

        describe('toString variants', () => {
            it('toHex should return lowercase hex', () => {
                const hex = new HSBColor(0, 100, 100).toHex();
                expect(hex).toBe('#ff0000');
            });

            it('toHexa should omit alpha when 1', () => {
                expect(new HSBColor(0, 100, 100, 1).toHexa()).toBe('#ff0000');
            });

            it('toHexa should include alpha when < 1', () => {
                const hexa = new HSBColor(0, 100, 100, 0.5).toHexa();
                expect(hexa).toMatch(/^#ff0000[0-9a-f]{2}$/);
            });

            it('toHexInt should return integer', () => {
                expect(new HSBColor(0, 100, 100).toHexInt()).toBe(0xff0000);
            });

            it('toRgbString without alpha', () => {
                expect(new HSBColor(0, 100, 100).toRgbString()).toBe('rgb(255, 0, 0)');
            });

            it('toRgbString with alpha', () => {
                expect(new HSBColor(0, 100, 100, 0.5).toRgbString()).toBe('rgba(255, 0, 0, 0.5)');
            });

            it('toHslString without alpha', () => {
                const hsl = new HSBColor(0, 100, 100).toHslString();
                expect(hsl).toMatch(/^hsl\(\d+, \d+%, \d+%\)$/);
            });

            it('toHslString with alpha', () => {
                const hsl = new HSBColor(0, 100, 100, 0.5).toHslString();
                expect(hsl).toMatch(/^hsla\(/);
            });

            it('toHsbString without alpha', () => {
                expect(new HSBColor(120, 50, 75).toHsbString()).toBe('hsb(120, 50%, 75%)');
            });

            it('toHsbString with alpha', () => {
                expect(new HSBColor(120, 50, 75, 0.5).toHsbString()).toBe('hsba(120, 50%, 75%, 0.5)');
            });

            it('toString with format routing', () => {
                const c = new HSBColor(0, 100, 100);
                expect(c.toString('hex')).toBe('#ff0000');
                expect(c.toString('rgb')).toContain('rgb');
                expect(c.toString('hsl')).toContain('hsl');
                expect(c.toString('hsb')).toContain('hsb');
                expect(c.toString('oklch')).toContain('oklch');
            });

            it('toHsbString should mod hue 360 to 0', () => {
                expect(new HSBColor(360, 50, 75).toHsbString()).toBe('hsb(0, 50%, 75%)');
            });
        });
    });

    // ── HSLColor ──────────────────────────────────────────────────────

    describe('HSLColor', () => {
        describe('construction & clamping', () => {
            it('should create with valid values', () => {
                const c = new HSLColor(200, 60, 50, 0.9);
                expect(c.hue).toBe(200);
                expect(c.saturation).toBe(60);
                expect(c.lightness).toBe(50);
                expect(c.alpha).toBe(0.9);
            });

            it('should normalize hue 360 as-is', () => {
                expect(new HSLColor(360, 50, 50).hue).toBe(360);
            });

            it('should normalize hue > 360', () => {
                expect(new HSLColor(720, 50, 50).hue).toBe(0);
            });

            it('should normalize negative hue', () => {
                expect(new HSLColor(-90, 50, 50).hue).toBe(270);
            });

            it('should clamp saturation', () => {
                expect(new HSLColor(0, -10, 50).saturation).toBe(0);
                expect(new HSLColor(0, 200, 50).saturation).toBe(100);
            });

            it('should clamp lightness', () => {
                expect(new HSLColor(0, 50, -10).lightness).toBe(0);
                expect(new HSLColor(0, 50, 200).lightness).toBe(100);
            });

            it('should have colorSpace hsla', () => {
                expect(new HSLColor(0, 0, 0).colorSpace).toBe('hsla');
            });
        });

        describe('getChannelValue', () => {
            const c = new HSLColor(200, 60, 50, 0.8);

            it('should return native channels', () => {
                expect(c.getChannelValue('hue')).toBe(200);
                expect(c.getChannelValue('saturation')).toBe(60);
                expect(c.getChannelValue('lightness')).toBe(50);
                expect(c.getChannelValue('alpha')).toBe(0.8);
            });

            it('should delegate brightness to HSB', () => {
                expect(typeof c.getChannelValue('brightness')).toBe('number');
            });

            it('should delegate red to RGB', () => {
                expect(typeof c.getChannelValue('red')).toBe('number');
            });

            it('should delegate oklch to OKLCH', () => {
                expect(typeof c.getChannelValue('L')).toBe('number');
            });
        });

        describe('setChannelValue', () => {
            const c = new HSLColor(200, 60, 50);

            it('should set native channels immutably', () => {
                const n = c.setChannelValue('hue', 100) as HSLColor;
                expect(n.hue).toBe(100);
                expect(c.hue).toBe(200);
            });

            it('should set saturation', () => {
                expect((c.setChannelValue('saturation', 80) as HSLColor).saturation).toBe(80);
            });

            it('should set lightness', () => {
                expect((c.setChannelValue('lightness', 70) as HSLColor).lightness).toBe(70);
            });

            it('should set brightness through HSB', () => {
                const n = c.setChannelValue('brightness', 90);
                expect(n).toBeInstanceOf(HSLColor);
            });

            it('should set red through RGB', () => {
                const n = c.setChannelValue('red', 128);
                expect(n).toBeInstanceOf(HSLColor);
            });

            it('should set oklch through OKLCH', () => {
                const n = c.setChannelValue('L', 0.5);
                expect(n).toBeInstanceOf(HSLColor);
            });
        });

        describe('conversions', () => {
            it('should convert to HSB and roundtrip', () => {
                const c = new HSLColor(200, 60, 50);
                const rt = c.toHSB().toHSL();
                expect(Math.abs(rt.hue - c.hue)).toBeLessThan(1);
                expect(Math.abs(rt.saturation - c.saturation)).toBeLessThan(1);
                expect(Math.abs(rt.lightness - c.lightness)).toBeLessThan(1);
            });

            it('should convert to RGB', () => {
                const rgb = new HSLColor(0, 100, 50).toRGB();
                expect(Math.round(rgb.red)).toBe(255);
                expect(Math.round(rgb.green)).toBe(0);
                expect(Math.round(rgb.blue)).toBe(0);
            });

            it('should convert black', () => {
                const rgb = new HSLColor(0, 0, 0).toRGB();
                expect(Math.round(rgb.red)).toBe(0);
            });

            it('should convert white', () => {
                const rgb = new HSLColor(0, 0, 100).toRGB();
                expect(Math.round(rgb.red)).toBe(255);
                expect(Math.round(rgb.green)).toBe(255);
                expect(Math.round(rgb.blue)).toBe(255);
            });

            it('should convert grey (saturation=0)', () => {
                const rgb = new HSLColor(0, 0, 50).toRGB();
                expect(Math.round(rgb.red)).toBe(128);
                expect(Math.round(rgb.green)).toBe(128);
                expect(Math.round(rgb.blue)).toBe(128);
            });

            it('should preserve alpha', () => {
                expect(new HSLColor(0, 100, 50, 0.3).toRGB().alpha).toBe(0.3);
            });

            it('toHSL should return clone', () => {
                const c = new HSLColor(100, 50, 50);
                const cl = c.toHSL();
                expect(cl).not.toBe(c);
                expect(cl.hue).toBe(c.hue);
            });
        });
    });

    // ── RGBColor ──────────────────────────────────────────────────────

    describe('RGBColor', () => {
        describe('construction & clamping', () => {
            it('should create with valid values', () => {
                const c = new RGBColor(100, 150, 200, 0.7);
                expect(c.red).toBe(100);
                expect(c.green).toBe(150);
                expect(c.blue).toBe(200);
                expect(c.alpha).toBe(0.7);
            });

            it('should clamp channels to 0-255', () => {
                const c = new RGBColor(-10, 300, 128);
                expect(c.red).toBe(0);
                expect(c.green).toBe(255);
                expect(c.blue).toBe(128);
            });

            it('should clamp alpha to 0-1', () => {
                expect(new RGBColor(0, 0, 0, -1).alpha).toBe(0);
                expect(new RGBColor(0, 0, 0, 5).alpha).toBe(1);
            });

            it('should have colorSpace rgba', () => {
                expect(new RGBColor(0, 0, 0).colorSpace).toBe('rgba');
            });
        });

        describe('getChannelValue', () => {
            const c = new RGBColor(100, 150, 200, 0.8);

            it('should return native channels', () => {
                expect(c.getChannelValue('red')).toBe(100);
                expect(c.getChannelValue('green')).toBe(150);
                expect(c.getChannelValue('blue')).toBe(200);
                expect(c.getChannelValue('alpha')).toBe(0.8);
            });

            it('should delegate hue/saturation/brightness to HSB', () => {
                expect(typeof c.getChannelValue('hue')).toBe('number');
                expect(typeof c.getChannelValue('saturation')).toBe('number');
                expect(typeof c.getChannelValue('brightness')).toBe('number');
            });

            it('should delegate lightness to HSL', () => {
                expect(typeof c.getChannelValue('lightness')).toBe('number');
            });

            it('should delegate oklch channels', () => {
                expect(typeof c.getChannelValue('L')).toBe('number');
                expect(typeof c.getChannelValue('C')).toBe('number');
            });
        });

        describe('setChannelValue', () => {
            const c = new RGBColor(100, 150, 200);

            it('should set red immutably', () => {
                const n = c.setChannelValue('red', 50) as RGBColor;
                expect(n.red).toBe(50);
                expect(c.red).toBe(100);
            });

            it('should set green', () => {
                expect((c.setChannelValue('green', 200) as RGBColor).green).toBe(200);
            });

            it('should set blue', () => {
                expect((c.setChannelValue('blue', 50) as RGBColor).blue).toBe(50);
            });

            it('should set hue through HSB', () => {
                const n = c.setChannelValue('hue', 180);
                expect(n).toBeInstanceOf(RGBColor);
            });

            it('should set lightness through HSL', () => {
                const n = c.setChannelValue('lightness', 50);
                expect(n).toBeInstanceOf(RGBColor);
            });

            it('should set oklch through OKLCH', () => {
                const n = c.setChannelValue('C', 0.1);
                expect(n).toBeInstanceOf(RGBColor);
            });
        });

        describe('conversions', () => {
            it('should convert to HSB', () => {
                const hsb = new RGBColor(255, 0, 0).toHSB();
                expect(Math.round(hsb.hue)).toBe(0);
                expect(Math.round(hsb.saturation)).toBe(100);
                expect(Math.round(hsb.brightness)).toBe(100);
            });

            it('should convert to HSL', () => {
                const hsl = new RGBColor(255, 0, 0).toHSL();
                expect(Math.round(hsl.hue)).toBe(0);
                expect(Math.round(hsl.lightness)).toBe(50);
            });

            it('should convert to OKLCH', () => {
                const oklch = new RGBColor(255, 0, 0).toOKLCH();
                expect(oklch).toBeInstanceOf(OKLCHColor);
                expect(oklch.L).toBeGreaterThan(0);
            });

            it('should convert black to OKLCH with NaN hue', () => {
                const oklch = new RGBColor(0, 0, 0).toOKLCH();
                expect(oklch.L).toBe(0);
                expect(Number.isNaN(oklch.H)).toBeTrue();
            });

            it('toRGB should return clone', () => {
                const c = new RGBColor(100, 150, 200);
                const cl = c.toRGB();
                expect(cl).not.toBe(c);
                expect(cl.red).toBe(c.red);
            });

            it('toHex should be lowercase with padding', () => {
                expect(new RGBColor(0, 0, 0).toHex()).toBe('#000000');
                expect(new RGBColor(15, 15, 15).toHex()).toBe('#0f0f0f');
            });

            it('toHexInt should work', () => {
                expect(new RGBColor(255, 0, 0).toHexInt()).toBe(0xff0000);
                expect(new RGBColor(0, 255, 0).toHexInt()).toBe(0x00ff00);
            });
        });
    });

    // ── OKLCHColor ────────────────────────────────────────────────────

    describe('OKLCHColor', () => {
        describe('construction & clamping', () => {
            it('should create with valid values', () => {
                const c = new OKLCHColor(0.5, 0.2, 180, 0.9);
                expect(c.L).toBe(0.5);
                expect(c.C).toBe(0.2);
                expect(c.H).toBe(180);
                expect(c.alpha).toBe(0.9);
            });

            it('should clamp lightness to 0-1', () => {
                expect(new OKLCHColor(-0.5, 0, 0).L).toBe(0);
                expect(new OKLCHColor(2, 0, 0).L).toBe(1);
            });

            it('should clamp chroma to 0-0.4', () => {
                expect(new OKLCHColor(0.5, -0.1, 0).C).toBe(0);
                expect(new OKLCHColor(0.5, 0.8, 0).C).toBe(0.4);
            });

            it('should normalize hue via mod', () => {
                expect(new OKLCHColor(0.5, 0.1, 400).H).toBe(40);
                expect(new OKLCHColor(0.5, 0.1, -30).H).toBe(330);
            });

            it('should keep hue 360 as-is', () => {
                expect(new OKLCHColor(0.5, 0.1, 360).H).toBe(360);
            });

            it('should preserve NaN hue', () => {
                expect(Number.isNaN(new OKLCHColor(0.5, 0, NaN).H)).toBeTrue();
            });

            it('should have colorSpace oklch', () => {
                expect(new OKLCHColor(0, 0, 0).colorSpace).toBe('oklch');
            });
        });

        describe('getChannelValue', () => {
            it('should return native channels', () => {
                const c = new OKLCHColor(0.5, 0.2, 180, 0.8);
                expect(c.getChannelValue('L')).toBe(0.5);
                expect(c.getChannelValue('C')).toBe(0.2);
                expect(c.getChannelValue('H')).toBe(180);
                expect(c.getChannelValue('alpha')).toBe(0.8);
            });

            it('should return NaN hue for achromatic', () => {
                const c = new OKLCHColor(0.5, 0, NaN);
                expect(Number.isNaN(c.getChannelValue('H'))).toBeTrue();
            });

            it('should delegate red to RGB', () => {
                const c = new OKLCHColor(0.5, 0.2, 180);
                expect(typeof c.getChannelValue('red')).toBe('number');
            });
        });

        describe('setChannelValue', () => {
            const c = new OKLCHColor(0.5, 0.2, 180);

            it('should set L', () => {
                const n = c.setChannelValue('L', 0.8) as OKLCHColor;
                expect(n.L).toBe(0.8);
            });

            it('should set C', () => {
                const n = c.setChannelValue('C', 0.1) as OKLCHColor;
                expect(n.C).toBe(0.1);
            });

            it('should set H', () => {
                const n = c.setChannelValue('H', 90) as OKLCHColor;
                expect(n.H).toBe(90);
            });

            it('should set alpha', () => {
                expect(c.setChannelValue('alpha', 0.3).alpha).toBe(0.3);
            });

            it('should set non-native through RGB roundtrip', () => {
                const n = c.setChannelValue('red', 128);
                expect(n).toBeInstanceOf(OKLCHColor);
            });
        });

        describe('conversions', () => {
            it('should convert to RGB', () => {
                const rgb = new OKLCHColor(0.5, 0.2, 180).toRGB();
                expect(rgb).toBeInstanceOf(RGBColor);
                expect(rgb.red).toBeGreaterThanOrEqual(0);
                expect(rgb.red).toBeLessThanOrEqual(255);
            });

            it('should handle NaN hue as a=b=0 in toRGB', () => {
                const c = new OKLCHColor(0.5, 0.1, NaN);
                const rgb = c.toRGB();
                expect(rgb).toBeInstanceOf(RGBColor);
            });

            it('should roundtrip OKLCH→RGB→OKLCH approximately', () => {
                const c = new OKLCHColor(0.6, 0.15, 120);
                const rt = c.toRGB().toOKLCH();
                expect(Math.abs(rt.L - c.L)).toBeLessThan(0.01);
                expect(Math.abs(rt.C - c.C)).toBeLessThan(0.01);
            });

            it('toOKLCH should return clone', () => {
                const c = new OKLCHColor(0.5, 0.2, 180);
                const cl = c.toOKLCH();
                expect(cl).not.toBe(c);
                expect(cl.L).toBe(c.L);
            });

            it('toHSB delegates through RGB', () => {
                expect(new OKLCHColor(0.5, 0.2, 180).toHSB()).toBeInstanceOf(HSBColor);
            });

            it('toHSL delegates through RGB', () => {
                expect(new OKLCHColor(0.5, 0.2, 180).toHSL()).toBeInstanceOf(HSLColor);
            });
        });

        describe('toString', () => {
            it('should format oklch CSS string', () => {
                const str = new OKLCHColor(0.5, 0.15, 120).toString('oklch');
                expect(str).toMatch(/^oklch\([\d.]+% [\d.]+ [\d.]+\)$/);
            });

            it('should output NaN hue as 0', () => {
                const str = new OKLCHColor(0.5, 0, NaN).toString('oklch');
                expect(str).toContain(' 0)');
            });

            it('should format oklcha with alpha', () => {
                const str = new OKLCHColor(0.5, 0.15, 120, 0.8).toString('oklcha');
                expect(str).toMatch(/^oklch\([\d.]+% [\d.]+ [\d.]+ \/ [\d.]+\)$/);
            });

            it('should format css with alpha', () => {
                const str = new OKLCHColor(0.5, 0.15, 120, 0.8).toString('css');
                expect(str).toContain('/');
            });

            it('should delegate non-oklch formats to super', () => {
                const c = new OKLCHColor(0.5, 0.15, 120);
                expect(c.toString('hex')).toMatch(/^#[0-9a-f]{6}$/);
                expect(c.toString('rgb')).toContain('rgb');
            });
        });
    });

    // ── parseColor ────────────────────────────────────────────────────

    describe('parseColor', () => {
        describe('hex parsing', () => {
            it('should parse #RRGGBB', () => {
                const c = parseColor('#ff0000') as RGBColor;
                expect(c).toBeInstanceOf(RGBColor);
                expect(c.red).toBe(255);
                expect(c.green).toBe(0);
                expect(c.blue).toBe(0);
            });

            it('should parse RRGGBB without #', () => {
                const c = parseColor('ff0000') as RGBColor;
                expect(c).toBeInstanceOf(RGBColor);
                expect(c.red).toBe(255);
            });

            it('should parse #RGB shorthand', () => {
                const c = parseColor('#f00') as RGBColor;
                expect(c!.red).toBe(255);
                expect(c!.green).toBe(0);
                expect(c!.blue).toBe(0);
            });

            it('should parse RGB without #', () => {
                const c = parseColor('f00') as RGBColor;
                expect(c!.red).toBe(255);
            });

            it('should parse #RRGGBBAA', () => {
                const c = parseColor('#ff000080') as RGBColor;
                expect(c!.red).toBe(255);
                expect(c!.alpha).toBeCloseTo(0.502, 1);
            });

            it('should parse #RGBA shorthand', () => {
                const c = parseColor('#f008') as RGBColor;
                expect(c!.red).toBe(255);
                expect(c!.alpha).toBeCloseTo(0.533, 1);
            });

            it('should be case insensitive', () => {
                const c = parseColor('#FF0000') as RGBColor;
                expect(c!.red).toBe(255);
            });

            it('should parse #000000', () => {
                const c = parseColor('#000000') as RGBColor;
                expect(c!.red).toBe(0);
                expect(c!.green).toBe(0);
                expect(c!.blue).toBe(0);
            });
        });

        describe('rgb/rgba parsing', () => {
            it('should parse rgb(r,g,b)', () => {
                const c = parseColor('rgb(100, 150, 200)') as RGBColor;
                expect(c!.red).toBe(100);
                expect(c!.green).toBe(150);
                expect(c!.blue).toBe(200);
                expect(c!.alpha).toBe(1);
            });

            it('should parse rgba(r,g,b,a)', () => {
                const c = parseColor('rgba(100, 150, 200, 0.5)') as RGBColor;
                expect(c!.alpha).toBe(0.5);
            });
        });

        describe('hsl/hsla parsing', () => {
            it('should parse hsl(h,s%,l%)', () => {
                const c = parseColor('hsl(120, 50%, 50%)') as HSLColor;
                expect(c).toBeInstanceOf(HSLColor);
                expect(c.hue).toBe(120);
            });

            it('should parse hsla with alpha', () => {
                const c = parseColor('hsla(120, 50%, 50%, 0.7)') as HSLColor;
                expect(c!.alpha).toBe(0.7);
            });

            it('should parse without % sign', () => {
                const c = parseColor('hsl(120, 50, 50)') as HSLColor;
                expect(c).toBeInstanceOf(HSLColor);
            });
        });

        describe('hsb/hsba parsing', () => {
            it('should parse hsb(h,s%,b%)', () => {
                const c = parseColor('hsb(120, 50%, 75%)') as HSBColor;
                expect(c).toBeInstanceOf(HSBColor);
                expect(c.hue).toBe(120);
                expect(c.saturation).toBe(50);
                expect(c.brightness).toBe(75);
            });

            it('should parse hsba with alpha', () => {
                const c = parseColor('hsba(120, 50%, 75%, 0.5)') as HSBColor;
                expect(c!.alpha).toBe(0.5);
            });
        });

        describe('oklch parsing', () => {
            it('should parse oklch(L% C H)', () => {
                const c = parseColor('oklch(50% 0.2 180)') as OKLCHColor;
                expect(c).toBeInstanceOf(OKLCHColor);
                expect(c.L).toBe(0.5);
                expect(c.C).toBe(0.2);
                expect(c.H).toBe(180);
            });

            it('should parse oklch with alpha', () => {
                const c = parseColor('oklch(50% 0.2 180 / 0.8)') as OKLCHColor;
                expect(c!.alpha).toBe(0.8);
            });

            it('should parse raw lightness (no %)', () => {
                const c = parseColor('oklch(0.5 0.2 180)') as OKLCHColor;
                expect(c!.L).toBe(0.5);
            });
        });

        describe('edge cases', () => {
            it('should return null for null', () => {
                expect(parseColor(null)).toBeNull();
            });

            it('should return null for undefined', () => {
                expect(parseColor(undefined)).toBeNull();
            });

            it('should return null for empty string', () => {
                expect(parseColor('')).toBeNull();
            });

            it('should return null for invalid string', () => {
                expect(parseColor('not-a-color')).toBeNull();
            });

            it('should passthrough ColorInstance', () => {
                const c = new HSBColor(120, 50, 75);
                expect(parseColor(c)).toBe(c);
            });

            it('should trim whitespace', () => {
                const c = parseColor('  #ff0000  ');
                expect(c).not.toBeNull();
            });
        });
    });

    // ── getChannelRange ───────────────────────────────────────────────

    describe('getChannelRange', () => {
        it('should return hue range 0-360', () => {
            const r = getChannelRange('hue');
            expect(r.minValue).toBe(0);
            expect(r.maxValue).toBe(360);
            expect(r.step).toBe(1);
            expect(r.pageStep).toBe(15);
        });

        it('should return saturation range 0-100', () => {
            const r = getChannelRange('saturation');
            expect(r.minValue).toBe(0);
            expect(r.maxValue).toBe(100);
        });

        it('should return brightness range 0-100', () => {
            expect(getChannelRange('brightness').maxValue).toBe(100);
        });

        it('should return lightness range 0-100', () => {
            expect(getChannelRange('lightness').maxValue).toBe(100);
        });

        it('should return red/green/blue range 0-255', () => {
            expect(getChannelRange('red').maxValue).toBe(255);
            expect(getChannelRange('green').maxValue).toBe(255);
            expect(getChannelRange('blue').maxValue).toBe(255);
        });

        it('should return alpha range 0-1 with step 0.01', () => {
            const r = getChannelRange('alpha');
            expect(r.minValue).toBe(0);
            expect(r.maxValue).toBe(1);
            expect(r.step).toBe(0.01);
            expect(r.pageStep).toBe(0.1);
        });

        it('should return L range 0-1', () => {
            const r = getChannelRange('L');
            expect(r.minValue).toBe(0);
            expect(r.maxValue).toBe(1);
            expect(r.step).toBe(0.01);
        });

        it('should return C range 0-0.4', () => {
            const r = getChannelRange('C');
            expect(r.maxValue).toBe(0.4);
        });

        it('should return H range 0-360', () => {
            expect(getChannelRange('H').maxValue).toBe(360);
        });
    });

    // ── getInputChannelRange ──────────────────────────────────────────

    describe('getInputChannelRange', () => {
        it('should return hex range 0-0xffffff', () => {
            const r = getInputChannelRange('hex');
            expect(r.minValue).toBe(0);
            expect(r.maxValue).toBe(0xffffff);
        });

        it('should delegate non-hex to getChannelRange', () => {
            expect(getInputChannelRange('hue')).toEqual(getChannelRange('hue'));
            expect(getInputChannelRange('red')).toEqual(getChannelRange('red'));
        });
    });

    // ── getInputChannelValue ──────────────────────────────────────────

    describe('getInputChannelValue', () => {
        it('should return hex string for hex channel', () => {
            const c = new RGBColor(255, 0, 0);
            expect(getInputChannelValue(c, 'hex')).toBe('#ff0000');
        });

        it('should return css string for css channel (rgba format)', () => {
            const c = new RGBColor(255, 0, 0);
            const css = getInputChannelValue(c, 'css', 'rgba');
            expect(css).toContain('rgba');
        });

        it('should return css string for css channel (hsla format)', () => {
            const c = new HSBColor(0, 100, 100);
            const css = getInputChannelValue(c, 'css', 'hsla');
            expect(css).toContain('hsla');
        });

        it('should return css string for css channel (oklch format)', () => {
            const c = new OKLCHColor(0.5, 0.2, 180);
            const css = getInputChannelValue(c, 'css', 'oklch');
            expect(css).toContain('oklch');
        });

        it('should normalize hue 360 to 0', () => {
            const c = new HSBColor(360, 100, 100);
            expect(getInputChannelValue(c, 'hue')).toBe('0');
        });

        it('should normalize H 360 to 0', () => {
            const c = new OKLCHColor(0.5, 0.2, 360);
            expect(getInputChannelValue(c, 'H')).toBe('0');
        });

        it('should round integer channels', () => {
            const c = new RGBColor(100.7, 150.3, 200.9);
            expect(getInputChannelValue(c, 'red')).toBe('101');
        });

        it('should return NaN string for NaN H', () => {
            const c = new OKLCHColor(0.5, 0, NaN);
            expect(getInputChannelValue(c, 'H')).toBe('NaN');
        });

        it('should return decimal for sub-1 step channels', () => {
            const c = new OKLCHColor(0.5678, 0.2, 180);
            const val = getInputChannelValue(c, 'L');
            expect(val).toContain('.');
        });
    });

    // ── snapValue ─────────────────────────────────────────────────────

    describe('snapValue', () => {
        it('should snap to nearest step', () => {
            expect(snapValue(23.7, 0, 100, 5)).toBe(25);
        });

        it('should clamp to bounds', () => {
            expect(snapValue(110, 0, 100, 5)).toBe(100);
            expect(snapValue(-5, 0, 100, 5)).toBe(0);
        });

        it('should handle floating point precision', () => {
            expect(snapValue(0.234, 0, 1, 0.01)).toBe(0.23);
        });

        it('should snap at step boundary', () => {
            expect(snapValue(50, 0, 100, 10)).toBe(50);
        });
    });

    // ── getChannelGradient ────────────────────────────────────────────

    describe('getChannelGradient', () => {
        const color = new HSBColor(120, 100, 100);

        it('should return hue rainbow gradient', () => {
            const g = getChannelGradient(color, 'hue');
            expect(g).toContain('linear-gradient');
            expect(g).toContain('to right');
            expect(g).toContain('rgb(255, 0, 0)');
        });

        it('should return vertical gradient', () => {
            const g = getChannelGradient(color, 'hue', 'vertical');
            expect(g).toContain('to top');
        });

        it('should return alpha gradient', () => {
            const g = getChannelGradient(color, 'alpha');
            expect(g).toContain('linear-gradient');
        });

        it('should return lightness gradient with 3 stops', () => {
            const g = getChannelGradient(color, 'lightness');
            expect(g).toContain('linear-gradient');
        });

        it('should return default 2-stop gradient for saturation', () => {
            const g = getChannelGradient(color, 'saturation');
            expect(g).toContain('linear-gradient');
        });
    });

    // ── getAreaGradient ───────────────────────────────────────────────

    describe('getAreaGradient', () => {
        it('should return gradient layers for hsba', () => {
            const color = new HSBColor(120, 100, 100);
            const g = getAreaGradient(color, 'saturation', 'brightness', 'hsba');
            expect(g).toContain('linear-gradient');
        });

        it('should return gradient layers for hsla', () => {
            const color = new HSLColor(120, 100, 50);
            const g = getAreaGradient(color, 'saturation', 'lightness', 'hsla');
            expect(g).toContain('linear-gradient');
        });
    });

    // ── getDefault2DAxes / getDefault3DAxes ───────────────────────────

    describe('getDefault2DAxes', () => {
        it('should return saturation/brightness for hsba', () => {
            const axes = getDefault2DAxes('hsba');
            expect(axes.xChannel).toBe('saturation');
            expect(axes.yChannel).toBe('brightness');
        });

        it('should return saturation/lightness for hsla', () => {
            const axes = getDefault2DAxes('hsla');
            expect(axes.xChannel).toBe('saturation');
            expect(axes.yChannel).toBe('lightness');
        });

        it('should return saturation/brightness for rgba', () => {
            expect(getDefault2DAxes('rgba').yChannel).toBe('brightness');
        });

        it('should return saturation/brightness for oklch', () => {
            expect(getDefault2DAxes('oklch').yChannel).toBe('brightness');
        });
    });

    describe('getDefault3DAxes', () => {
        it('should return hue as zChannel for hsba', () => {
            expect(getDefault3DAxes('hsba').zChannel).toBe('hue');
        });

        it('should return hue as zChannel for hsla', () => {
            expect(getDefault3DAxes('hsla').zChannel).toBe('hue');
        });
    });

    // ── Color.toFormat ────────────────────────────────────────────────

    describe('Color.toFormat', () => {
        const c = new HSBColor(120, 50, 75);

        it('should convert to HSB for hsba', () => {
            expect(c.toFormat('hsba')).toBeInstanceOf(HSBColor);
        });

        it('should convert to HSL for hsla', () => {
            expect(c.toFormat('hsla')).toBeInstanceOf(HSLColor);
        });

        it('should convert to RGB for rgba', () => {
            expect(c.toFormat('rgba')).toBeInstanceOf(RGBColor);
        });

        it('should convert to RGB for hexa', () => {
            expect(c.toFormat('hexa')).toBeInstanceOf(RGBColor);
        });

        it('should convert to OKLCH for oklch', () => {
            expect(c.toFormat('oklch')).toBeInstanceOf(OKLCHColor);
        });
    });
});

// ─── Component Tests ───────────────────────────────────────────────────

describe('InputColor Component Tests', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, InputColorModule],
            declarations: [TestBasicComponent, TestInputChannelsComponent, TestCustomTypeInputComponent, TestReactiveFormComponent, TestFormatComponent, TestEyeDropperComponent],
            providers: [provideZonelessChangeDetection(), providePrimeNG()]
        }).compileComponents();
    });

    // ── InputColor ────────────────────────────────────────────────────

    describe('InputColor', () => {
        let fixture: ComponentFixture<TestBasicComponent>;
        let component: TestBasicComponent;
        let inputColor: InputColor;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestBasicComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();
            inputColor = fixture.debugElement.query(By.directive(InputColor)).componentInstance;
        });

        describe('initialization', () => {
            it('should create the component', () => {
                expect(inputColor).toBeTruthy();
            });

            it('should default format to hsba', () => {
                expect(inputColor.format()).toBe('hsba');
            });

            it('should default defaultValue to null', () => {
                expect(inputColor.defaultValue()).toBeNull();
            });

            it('should fallback to red when no value or defaultValue', () => {
                const color = inputColor.$color();
                expect(color).toBeTruthy();
                const hex = color.toHex();
                expect(hex).toBe('#ff0000');
            });
        });

        describe('defaultValue', () => {
            it('should use defaultValue string when ngModel is null', async () => {
                component.defaultValue = '#00ff00';
                component.color = null;
                fixture.detectChanges();
                await fixture.whenStable();
                const hex = inputColor.$color().toHex();
                expect(hex).toBe('#00ff00');
            });

            it('should use defaultValue ColorInstance', async () => {
                component.defaultValue = new HSBColor(240, 100, 100);
                component.color = null;
                fixture.detectChanges();
                await fixture.whenStable();
                const hex = inputColor.$color().toHex();
                expect(hex).toBe('#0000ff');
            });
        });

        describe('format', () => {
            it('should update axes when format changes', async () => {
                component.format = 'hsla';
                fixture.detectChanges();
                await fixture.whenStable();
                expect(inputColor.$axes().yChannel).toBe('lightness');
            });

            it('should update axes for hsba', async () => {
                component.format = 'hsba';
                fixture.detectChanges();
                await fixture.whenStable();
                expect(inputColor.$axes().yChannel).toBe('brightness');
            });
        });

        describe('ngModel', () => {
            it('should set color from ngModel', async () => {
                component.color = '#00ff00';
                fixture.detectChanges();
                await fixture.whenStable();
                const hex = inputColor.$color().toHex();
                expect(hex).toBe('#00ff00');
            });

            it('should handle null ngModel', async () => {
                component.color = null;
                fixture.detectChanges();
                await fixture.whenStable();
                expect(inputColor.$color()).toBeTruthy();
            });
        });

        describe('updateColor', () => {
            it('should emit onValueChange', () => {
                const newColor = new HSBColor(200, 80, 60);
                inputColor.updateColor(newColor);
                expect(component.valueChangeEvent).toBeTruthy();
                expect(component.valueChangeEvent.color).toBe(newColor);
            });

            it('should emit onValueChangeEnd when isEnd=true', () => {
                const newColor = new HSBColor(200, 80, 60);
                inputColor.updateColor(newColor, undefined, true);
                expect(component.valueChangeEndEvent).toBeTruthy();
                expect(component.valueChangeEndEvent.color).toBe(newColor);
            });

            it('should not emit onValueChangeEnd when isEnd=false', () => {
                const newColor = new HSBColor(200, 80, 60);
                inputColor.updateColor(newColor, undefined, false);
                expect(component.valueChangeEndEvent).toBeUndefined();
            });

            it('should update internal _color', () => {
                const newColor = new HSBColor(200, 80, 60);
                inputColor.updateColor(newColor);
                expect(inputColor._color()).toBe(newColor);
            });
        });

        describe('setChannelValue', () => {
            it('should set hue channel', () => {
                inputColor.updateColor(new HSBColor(0, 100, 100));
                inputColor.setChannelValue('hue', 120);
                const color = inputColor._color()!;
                expect(color.getChannelValue('hue')).toBeCloseTo(120, 0);
            });

            it('should set red channel', () => {
                inputColor.updateColor(new RGBColor(0, 0, 0));
                inputColor.setChannelValue('red', 128);
                const color = inputColor._color()!;
                expect(Math.round(color.toRGB().red)).toBeCloseTo(128, 0);
            });

            it('should set alpha channel', () => {
                inputColor.updateColor(new HSBColor(0, 100, 100));
                inputColor.setChannelValue('alpha', 0.5);
                expect(inputColor._color()!.alpha).toBeCloseTo(0.5, 2);
            });
        });

        describe('toChannelNativeFormat', () => {
            it('should not convert HSB for native HSB channels', () => {
                const c = new HSBColor(120, 50, 75);
                expect(inputColor.toChannelNativeFormat(c, 'hue')).toBe(c);
                expect(inputColor.toChannelNativeFormat(c, 'saturation')).toBe(c);
                expect(inputColor.toChannelNativeFormat(c, 'brightness')).toBe(c);
            });

            it('should not convert HSL for native HSL channels', () => {
                const c = new HSLColor(120, 50, 50);
                expect(inputColor.toChannelNativeFormat(c, 'hue')).toBe(c);
                expect(inputColor.toChannelNativeFormat(c, 'lightness')).toBe(c);
            });

            it('should not convert RGB for native RGB channels', () => {
                const c = new RGBColor(100, 150, 200);
                expect(inputColor.toChannelNativeFormat(c, 'red')).toBe(c);
                expect(inputColor.toChannelNativeFormat(c, 'green')).toBe(c);
                expect(inputColor.toChannelNativeFormat(c, 'blue')).toBe(c);
            });

            it('should not convert OKLCH for native OKLCH channels', () => {
                const c = new OKLCHColor(0.5, 0.2, 180);
                expect(inputColor.toChannelNativeFormat(c, 'L')).toBe(c);
                expect(inputColor.toChannelNativeFormat(c, 'C')).toBe(c);
                expect(inputColor.toChannelNativeFormat(c, 'H')).toBe(c);
            });

            it('should convert RGB to HSB for hue', () => {
                const c = new RGBColor(255, 0, 0);
                const result = inputColor.toChannelNativeFormat(c, 'hue');
                expect(result).toBeInstanceOf(HSBColor);
            });

            it('should convert HSB to HSL for lightness', () => {
                const c = new HSBColor(120, 50, 75);
                const result = inputColor.toChannelNativeFormat(c, 'lightness');
                expect(result).toBeInstanceOf(HSLColor);
            });

            it('should convert HSB to RGB for red', () => {
                const c = new HSBColor(120, 50, 75);
                const result = inputColor.toChannelNativeFormat(c, 'red');
                expect(result).toBeInstanceOf(RGBColor);
            });

            it('should convert RGB to OKLCH for L', () => {
                const c = new RGBColor(255, 0, 0);
                const result = inputColor.toChannelNativeFormat(c, 'L');
                expect(result).toBeInstanceOf(OKLCHColor);
            });

            it('should passthrough for alpha', () => {
                const c = new HSBColor(120, 50, 75);
                expect(inputColor.toChannelNativeFormat(c, 'alpha')).toBe(c);
            });
        });

        describe('writeControlValue', () => {
            it('should parse hex string', () => {
                inputColor.writeControlValue('#00ff00');
                expect(inputColor._color()).toBeTruthy();
                expect(inputColor._color()!.toHex()).toBe('#00ff00');
            });

            it('should convert to current format', () => {
                inputColor.writeControlValue('#ff0000');
                expect(inputColor._color()).toBeInstanceOf(HSBColor);
            });

            it('should set null for falsy value', () => {
                inputColor.writeControlValue('#ff0000');
                inputColor.writeControlValue(null);
                expect(inputColor._color()).toBeNull();
            });

            it('should skip duplicate value', () => {
                inputColor.updateColor(new HSBColor(0, 100, 100));
                const current = inputColor._color();
                const currentStr = current!.toString(inputColor.format());
                inputColor.writeControlValue(currentStr);
                expect(inputColor._color()).toBe(current);
            });
        });
    });

    // ── Reactive Form ─────────────────────────────────────────────────

    describe('Reactive Form', () => {
        let fixture: ComponentFixture<TestReactiveFormComponent>;
        let component: TestReactiveFormComponent;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestReactiveFormComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();
        });

        it('should bind FormControl', () => {
            const inputColor = fixture.debugElement.query(By.directive(InputColor)).componentInstance as InputColor;
            expect(inputColor).toBeTruthy();
        });

        it('should update FormControl value', async () => {
            const inputColor = fixture.debugElement.query(By.directive(InputColor)).componentInstance as InputColor;
            inputColor.updateColor(new HSBColor(120, 100, 100), undefined, true);
            fixture.detectChanges();
            await fixture.whenStable();
            expect(component.form.get('selectedColor')!.value).toBeTruthy();
        });

        it('should be invalid when required and null', () => {
            expect(component.form.get('selectedColor')!.valid).toBeFalse();
        });

        it('should be valid after setting value', () => {
            component.form.get('selectedColor')!.setValue('#ff0000');
            expect(component.form.get('selectedColor')!.valid).toBeTrue();
        });
    });

    // ── InputColorInput ───────────────────────────────────────────────

    describe('InputColorInput', () => {
        describe('type attribute', () => {
            let fixture: ComponentFixture<TestInputChannelsComponent>;
            let component: TestInputChannelsComponent;

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestInputChannelsComponent);
                component = fixture.componentInstance;
                await fixture.whenStable();
            });

            it('should set type=text for hex channel', async () => {
                component.channel = 'hex';
                fixture.detectChanges();
                await fixture.whenStable();
                const input = fixture.debugElement.query(By.directive(InputColorInput)).nativeElement;
                expect(input.type).toBe('text');
            });

            it('should set type=text for css channel', async () => {
                component.channel = 'css';
                fixture.detectChanges();
                await fixture.whenStable();
                const input = fixture.debugElement.query(By.directive(InputColorInput)).nativeElement;
                expect(input.type).toBe('text');
            });

            it('should set type=number for hue channel', async () => {
                component.channel = 'hue';
                fixture.detectChanges();
                await fixture.whenStable();
                const input = fixture.debugElement.query(By.directive(InputColorInput)).nativeElement;
                expect(input.type).toBe('number');
            });

            it('should set type=number for saturation channel', async () => {
                component.channel = 'saturation';
                fixture.detectChanges();
                await fixture.whenStable();
                const input = fixture.debugElement.query(By.directive(InputColorInput)).nativeElement;
                expect(input.type).toBe('number');
            });

            it('should set type=number for red channel', async () => {
                component.channel = 'red';
                fixture.detectChanges();
                await fixture.whenStable();
                const input = fixture.debugElement.query(By.directive(InputColorInput)).nativeElement;
                expect(input.type).toBe('number');
            });

            it('should set type=number for alpha channel', async () => {
                component.channel = 'alpha';
                fixture.detectChanges();
                await fixture.whenStable();
                const input = fixture.debugElement.query(By.directive(InputColorInput)).nativeElement;
                expect(input.type).toBe('number');
            });

            it('should set type=number for L', async () => {
                component.channel = 'L';
                fixture.detectChanges();
                await fixture.whenStable();
                const input = fixture.debugElement.query(By.directive(InputColorInput)).nativeElement;
                expect(input.type).toBe('number');
            });
        });

        describe('custom type override', () => {
            it('should use custom type when provided', async () => {
                const fixture = TestBed.createComponent(TestCustomTypeInputComponent);
                await fixture.whenStable();
                const input = fixture.debugElement.query(By.directive(InputColorInput)).nativeElement;
                expect(input.type).toBe('text');
            });
        });

        describe('min/max/step attributes', () => {
            let fixture: ComponentFixture<TestInputChannelsComponent>;
            let component: TestInputChannelsComponent;

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestInputChannelsComponent);
                component = fixture.componentInstance;
                await fixture.whenStable();
            });

            it('should set min/max/step for hue', async () => {
                component.channel = 'hue';
                fixture.detectChanges();
                await fixture.whenStable();
                const input = fixture.debugElement.query(By.directive(InputColorInput)).nativeElement;
                expect(input.min).toBe('0');
                expect(input.max).toBe('360');
                expect(input.step).toBe('1');
            });

            it('should set min/max/step for red', async () => {
                component.channel = 'red';
                fixture.detectChanges();
                await fixture.whenStable();
                const input = fixture.debugElement.query(By.directive(InputColorInput)).nativeElement;
                expect(input.min).toBe('0');
                expect(input.max).toBe('255');
                expect(input.step).toBe('1');
            });

            it('should set min/max/step for alpha', async () => {
                component.channel = 'alpha';
                fixture.detectChanges();
                await fixture.whenStable();
                const input = fixture.debugElement.query(By.directive(InputColorInput)).nativeElement;
                expect(input.min).toBe('0');
                expect(input.max).toBe('1');
                expect(input.step).toBe('0.01');
            });

            it('should set min/max/step for C', async () => {
                component.channel = 'C';
                fixture.detectChanges();
                await fixture.whenStable();
                const input = fixture.debugElement.query(By.directive(InputColorInput)).nativeElement;
                expect(input.min).toBe('0');
                expect(input.max).toBe('0.4');
                expect(input.step).toBe('0.01');
            });

            it('should not set min/max/step for hex', async () => {
                component.channel = 'hex';
                fixture.detectChanges();
                await fixture.whenStable();
                const input = fixture.debugElement.query(By.directive(InputColorInput)).nativeElement;
                expect(input.min).toBe('');
                expect(input.max).toBe('');
            });

            it('should not set min/max/step for css', async () => {
                component.channel = 'css';
                fixture.detectChanges();
                await fixture.whenStable();
                const input = fixture.debugElement.query(By.directive(InputColorInput)).nativeElement;
                expect(input.min).toBe('');
                expect(input.max).toBe('');
            });
        });

        describe('display value', () => {
            let fixture: ComponentFixture<TestInputChannelsComponent>;
            let component: TestInputChannelsComponent;

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestInputChannelsComponent);
                component = fixture.componentInstance;
                await fixture.whenStable();
            });

            it('should display hex value', async () => {
                component.channel = 'hex';
                component.color = '#ff0000';
                fixture.detectChanges();
                await fixture.whenStable();
                const input = fixture.debugElement.query(By.directive(InputColorInput)).nativeElement as HTMLInputElement;
                expect(input.value).toBe('#ff0000');
            });

            it('should display rounded integer for hue', async () => {
                component.channel = 'hue';
                component.color = '#ff0000';
                fixture.detectChanges();
                await fixture.whenStable();
                const input = fixture.debugElement.query(By.directive(InputColorInput)).nativeElement as HTMLInputElement;
                expect(input.value).toBe('0');
            });
        });

        describe('input and commit', () => {
            let fixture: ComponentFixture<TestInputChannelsComponent>;
            let component: TestInputChannelsComponent;

            beforeEach(async () => {
                fixture = TestBed.createComponent(TestInputChannelsComponent);
                component = fixture.componentInstance;
                await fixture.whenStable();
            });

            it('should store pending value on input event', async () => {
                component.channel = 'hex';
                fixture.detectChanges();
                await fixture.whenStable();
                const inputEl = fixture.debugElement.query(By.directive(InputColorInput)).nativeElement as HTMLInputElement;
                inputEl.value = '00ff00';
                inputEl.dispatchEvent(new Event('input'));
                // pendingValue is private, but we can verify through commit
            });

            it('should commit on blur', async () => {
                component.channel = 'hex';
                fixture.detectChanges();
                await fixture.whenStable();
                const inputEl = fixture.debugElement.query(By.directive(InputColorInput)).nativeElement as HTMLInputElement;
                const inputColor = fixture.debugElement.query(By.directive(InputColor)).componentInstance as InputColor;

                inputEl.value = '00ff00';
                inputEl.dispatchEvent(new Event('input'));
                inputEl.dispatchEvent(new Event('blur'));
                fixture.detectChanges();
                await fixture.whenStable();

                expect(inputColor._color()!.toHex()).toBe('#00ff00');
            });

            it('should commit on enter key', async () => {
                component.channel = 'hex';
                fixture.detectChanges();
                await fixture.whenStable();
                const inputEl = fixture.debugElement.query(By.directive(InputColorInput)).nativeElement as HTMLInputElement;
                const inputColor = fixture.debugElement.query(By.directive(InputColor)).componentInstance as InputColor;

                inputEl.value = '0000ff';
                inputEl.dispatchEvent(new Event('input'));
                inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
                fixture.detectChanges();
                await fixture.whenStable();

                expect(inputColor._color()!.toHex()).toBe('#0000ff');
            });

            it('should not commit without pending value', async () => {
                component.channel = 'hex';
                fixture.detectChanges();
                await fixture.whenStable();
                const inputEl = fixture.debugElement.query(By.directive(InputColorInput)).nativeElement as HTMLInputElement;
                const inputColor = fixture.debugElement.query(By.directive(InputColor)).componentInstance as InputColor;
                const before = inputColor._color();

                inputEl.dispatchEvent(new Event('blur'));
                expect(inputColor._color()).toBe(before);
            });

            it('should auto-prepend # for hex input', async () => {
                component.channel = 'hex';
                fixture.detectChanges();
                await fixture.whenStable();
                const inputEl = fixture.debugElement.query(By.directive(InputColorInput)).nativeElement as HTMLInputElement;
                const inputColor = fixture.debugElement.query(By.directive(InputColor)).componentInstance as InputColor;

                inputEl.value = 'ff0000';
                inputEl.dispatchEvent(new Event('input'));
                inputEl.dispatchEvent(new Event('blur'));
                fixture.detectChanges();
                await fixture.whenStable();
                expect(inputColor._color()!.toHex()).toBe('#ff0000');
            });

            it('should accept # prefixed hex input', async () => {
                component.channel = 'hex';
                fixture.detectChanges();
                await fixture.whenStable();
                const inputEl = fixture.debugElement.query(By.directive(InputColorInput)).nativeElement as HTMLInputElement;
                const inputColor = fixture.debugElement.query(By.directive(InputColor)).componentInstance as InputColor;

                inputEl.value = '#00ff00';
                inputEl.dispatchEvent(new Event('input'));
                inputEl.dispatchEvent(new Event('blur'));
                fixture.detectChanges();
                await fixture.whenStable();
                expect(inputColor._color()!.toHex()).toBe('#00ff00');
            });

            it('should handle 3-char hex shorthand', async () => {
                component.channel = 'hex';
                fixture.detectChanges();
                await fixture.whenStable();
                const inputEl = fixture.debugElement.query(By.directive(InputColorInput)).nativeElement as HTMLInputElement;
                const inputColor = fixture.debugElement.query(By.directive(InputColor)).componentInstance as InputColor;

                inputEl.value = 'f00';
                inputEl.dispatchEvent(new Event('input'));
                inputEl.dispatchEvent(new Event('blur'));
                fixture.detectChanges();
                await fixture.whenStable();
                expect(inputColor._color()!.toHex()).toBe('#ff0000');
            });

            it('should ignore invalid hex', async () => {
                component.channel = 'hex';
                fixture.detectChanges();
                await fixture.whenStable();
                const inputEl = fixture.debugElement.query(By.directive(InputColorInput)).nativeElement as HTMLInputElement;
                const inputColor = fixture.debugElement.query(By.directive(InputColor)).componentInstance as InputColor;
                const beforeHex = inputColor._color()?.toHex();

                inputEl.value = 'zzz';
                inputEl.dispatchEvent(new Event('input'));
                inputEl.dispatchEvent(new Event('blur'));
                // color should not change for invalid hex
                expect(inputColor._color()?.toHex()).toBe(beforeHex);
            });

            it('should commit css value', async () => {
                component.channel = 'css';
                fixture.detectChanges();
                await fixture.whenStable();
                const inputEl = fixture.debugElement.query(By.directive(InputColorInput)).nativeElement as HTMLInputElement;
                const inputColor = fixture.debugElement.query(By.directive(InputColor)).componentInstance as InputColor;

                inputEl.value = 'rgb(0, 255, 0)';
                inputEl.dispatchEvent(new Event('input'));
                inputEl.dispatchEvent(new Event('blur'));
                fixture.detectChanges();
                await fixture.whenStable();
                expect(inputColor._color()!.toHex()).toBe('#00ff00');
            });

            it('should commit numeric value for hue', async () => {
                component.channel = 'hue';
                fixture.detectChanges();
                await fixture.whenStable();
                const inputEl = fixture.debugElement.query(By.directive(InputColorInput)).nativeElement as HTMLInputElement;
                const inputColor = fixture.debugElement.query(By.directive(InputColor)).componentInstance as InputColor;

                inputEl.value = '120';
                inputEl.dispatchEvent(new Event('input'));
                inputEl.dispatchEvent(new Event('blur'));
                fixture.detectChanges();
                await fixture.whenStable();
                expect(inputColor._color()!.getChannelValue('hue')).toBeCloseTo(120, 0);
            });

            it('should clamp numeric value below min', async () => {
                component.channel = 'red';
                fixture.detectChanges();
                await fixture.whenStable();
                const inputEl = fixture.debugElement.query(By.directive(InputColorInput)).nativeElement as HTMLInputElement;
                const inputColor = fixture.debugElement.query(By.directive(InputColor)).componentInstance as InputColor;

                inputEl.value = '-50';
                inputEl.dispatchEvent(new Event('input'));
                inputEl.dispatchEvent(new Event('blur'));
                fixture.detectChanges();
                await fixture.whenStable();
                expect(Math.round(inputColor._color()!.toRGB().red)).toBe(0);
            });

            it('should clamp numeric value above max', async () => {
                component.channel = 'red';
                fixture.detectChanges();
                await fixture.whenStable();
                const inputEl = fixture.debugElement.query(By.directive(InputColorInput)).nativeElement as HTMLInputElement;
                const inputColor = fixture.debugElement.query(By.directive(InputColor)).componentInstance as InputColor;

                inputEl.value = '300';
                inputEl.dispatchEvent(new Event('input'));
                inputEl.dispatchEvent(new Event('blur'));
                fixture.detectChanges();
                await fixture.whenStable();
                expect(Math.round(inputColor._color()!.toRGB().red)).toBe(255);
            });

            it('should ignore NaN numeric input', async () => {
                component.channel = 'red';
                fixture.detectChanges();
                await fixture.whenStable();
                const inputEl = fixture.debugElement.query(By.directive(InputColorInput)).nativeElement as HTMLInputElement;
                const inputColor = fixture.debugElement.query(By.directive(InputColor)).componentInstance as InputColor;
                const beforeHex = inputColor._color()?.toHex();

                inputEl.value = 'abc';
                inputEl.dispatchEvent(new Event('input'));
                inputEl.dispatchEvent(new Event('blur'));
                // color should not change for NaN input
                expect(inputColor._color()?.toHex()).toBe(beforeHex);
            });

            it('should handle decimal alpha input', async () => {
                component.channel = 'alpha';
                fixture.detectChanges();
                await fixture.whenStable();
                const inputEl = fixture.debugElement.query(By.directive(InputColorInput)).nativeElement as HTMLInputElement;
                const inputColor = fixture.debugElement.query(By.directive(InputColor)).componentInstance as InputColor;

                inputEl.value = '0.5';
                inputEl.dispatchEvent(new Event('input'));
                inputEl.dispatchEvent(new Event('blur'));
                fixture.detectChanges();
                await fixture.whenStable();
                expect(inputColor._color()!.alpha).toBeCloseTo(0.5, 2);
            });
        });
    });

    // ── InputColorSlider ──────────────────────────────────────────────

    describe('InputColorSlider', () => {
        let fixture: ComponentFixture<TestBasicComponent>;
        let component: TestBasicComponent;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestBasicComponent);
            component = fixture.componentInstance;
            await fixture.whenStable();
        });

        it('should default to hue channel', () => {
            const slider = fixture.debugElement.query(By.directive(InputColorSlider)).componentInstance as InputColorSlider;
            expect(slider.channel()).toBe('hue');
        });

        it('should default to horizontal orientation', () => {
            const slider = fixture.debugElement.query(By.directive(InputColorSlider)).componentInstance as InputColorSlider;
            expect(slider.orientation()).toBe('horizontal');
        });

        it('should apply horizontal CSS class', () => {
            const sliderEl = fixture.debugElement.query(By.directive(InputColorSlider)).nativeElement;
            expect(sliderEl.classList.contains('p-inputcolor-slider-horizontal')).toBeTrue();
        });

        it('should apply vertical CSS class', async () => {
            component.sliderOrientation = 'vertical';
            fixture.detectChanges();
            await fixture.whenStable();
            const sliderEl = fixture.debugElement.query(By.directive(InputColorSlider)).nativeElement;
            expect(sliderEl.classList.contains('p-inputcolor-slider-vertical')).toBeTrue();
        });

        it('should set data-orientation attribute', () => {
            const sliderEl = fixture.debugElement.query(By.directive(InputColorSlider)).nativeElement;
            expect(sliderEl.getAttribute('data-orientation')).toBe('horizontal');
        });
    });

    // ── InputColorSliderThumb ─────────────────────────────────────────

    describe('InputColorSliderThumb', () => {
        let fixture: ComponentFixture<TestBasicComponent>;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestBasicComponent);
            await fixture.whenStable();
        });

        it('should have role=slider', () => {
            const thumbEl = fixture.debugElement.query(By.directive(InputColorSliderThumb)).nativeElement;
            expect(thumbEl.getAttribute('role')).toBe('slider');
        });

        it('should have tabindex=0', () => {
            const thumbEl = fixture.debugElement.query(By.directive(InputColorSliderThumb)).nativeElement;
            expect(thumbEl.getAttribute('tabindex')).toBe('0');
        });

        it('should have aria-valuemin', () => {
            const thumbEl = fixture.debugElement.query(By.directive(InputColorSliderThumb)).nativeElement;
            expect(thumbEl.getAttribute('aria-valuemin')).toBe('0');
        });

        it('should have aria-valuemax', () => {
            const thumbEl = fixture.debugElement.query(By.directive(InputColorSliderThumb)).nativeElement;
            expect(thumbEl.getAttribute('aria-valuemax')).toBe('360');
        });

        it('should have aria-valuenow', () => {
            const thumbEl = fixture.debugElement.query(By.directive(InputColorSliderThumb)).nativeElement;
            expect(thumbEl.getAttribute('aria-valuenow')).toBeTruthy();
        });

        describe('keyboard interaction', () => {
            it('should increase value on ArrowRight', async () => {
                const inputColor = fixture.debugElement.query(By.directive(InputColor)).componentInstance as InputColor;
                inputColor.updateColor(new HSBColor(180, 100, 100));
                fixture.detectChanges();
                await fixture.whenStable();

                const thumbEl = fixture.debugElement.query(By.directive(InputColorSliderThumb)).nativeElement;
                thumbEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
                fixture.detectChanges();
                await fixture.whenStable();

                expect(inputColor._color()!.getChannelValue('hue')).toBe(181);
            });

            it('should decrease value on ArrowLeft', async () => {
                const inputColor = fixture.debugElement.query(By.directive(InputColor)).componentInstance as InputColor;
                inputColor.updateColor(new HSBColor(180, 100, 100));
                fixture.detectChanges();
                await fixture.whenStable();

                const thumbEl = fixture.debugElement.query(By.directive(InputColorSliderThumb)).nativeElement;
                thumbEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
                fixture.detectChanges();
                await fixture.whenStable();

                expect(inputColor._color()!.getChannelValue('hue')).toBe(179);
            });

            it('should increase by pageStep on PageUp', async () => {
                const inputColor = fixture.debugElement.query(By.directive(InputColor)).componentInstance as InputColor;
                inputColor.updateColor(new HSBColor(180, 100, 100));
                fixture.detectChanges();
                await fixture.whenStable();

                const thumbEl = fixture.debugElement.query(By.directive(InputColorSliderThumb)).nativeElement;
                thumbEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageUp', bubbles: true }));
                fixture.detectChanges();
                await fixture.whenStable();

                expect(inputColor._color()!.getChannelValue('hue')).toBe(195);
            });

            it('should decrease by pageStep on PageDown', async () => {
                const inputColor = fixture.debugElement.query(By.directive(InputColor)).componentInstance as InputColor;
                inputColor.updateColor(new HSBColor(180, 100, 100));
                fixture.detectChanges();
                await fixture.whenStable();

                const thumbEl = fixture.debugElement.query(By.directive(InputColorSliderThumb)).nativeElement;
                thumbEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageDown', bubbles: true }));
                fixture.detectChanges();
                await fixture.whenStable();

                expect(inputColor._color()!.getChannelValue('hue')).toBe(165);
            });

            it('should go to min on Home', async () => {
                const inputColor = fixture.debugElement.query(By.directive(InputColor)).componentInstance as InputColor;
                inputColor.updateColor(new HSBColor(180, 100, 100));
                fixture.detectChanges();
                await fixture.whenStable();

                const thumbEl = fixture.debugElement.query(By.directive(InputColorSliderThumb)).nativeElement;
                thumbEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
                fixture.detectChanges();
                await fixture.whenStable();

                expect(inputColor._color()!.getChannelValue('hue')).toBe(0);
            });

            it('should go to max on End', async () => {
                const inputColor = fixture.debugElement.query(By.directive(InputColor)).componentInstance as InputColor;
                inputColor.updateColor(new HSBColor(180, 100, 100));
                fixture.detectChanges();
                await fixture.whenStable();

                const thumbEl = fixture.debugElement.query(By.directive(InputColorSliderThumb)).nativeElement;
                thumbEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
                fixture.detectChanges();
                await fixture.whenStable();

                expect(inputColor._color()!.getChannelValue('hue')).toBe(360);
            });

            it('should clamp at max boundary', async () => {
                const inputColor = fixture.debugElement.query(By.directive(InputColor)).componentInstance as InputColor;
                inputColor.updateColor(new HSBColor(360, 100, 100));
                fixture.detectChanges();
                await fixture.whenStable();

                const thumbEl = fixture.debugElement.query(By.directive(InputColorSliderThumb)).nativeElement;
                thumbEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
                fixture.detectChanges();
                await fixture.whenStable();

                expect(inputColor._color()!.getChannelValue('hue')).toBeLessThanOrEqual(360);
            });

            it('should clamp at min boundary', async () => {
                const inputColor = fixture.debugElement.query(By.directive(InputColor)).componentInstance as InputColor;
                inputColor.updateColor(new HSBColor(0, 100, 100));
                fixture.detectChanges();
                await fixture.whenStable();

                const thumbEl = fixture.debugElement.query(By.directive(InputColorSliderThumb)).nativeElement;
                thumbEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
                fixture.detectChanges();
                await fixture.whenStable();

                expect(inputColor._color()!.getChannelValue('hue')).toBeGreaterThanOrEqual(0);
            });
        });
    });

    // ── InputColorSliderTrack ─────────────────────────────────────────

    describe('InputColorSliderTrack', () => {
        it('should compute gradient', async () => {
            const fixture = TestBed.createComponent(TestBasicComponent);
            await fixture.whenStable();
            const track = fixture.debugElement.query(By.directive(InputColorSliderTrack)).componentInstance as InputColorSliderTrack;
            expect(track.$gradient()).toBeTruthy();
            expect(track.$gradient()).toContain('linear-gradient');
        });
    });

    // ── InputColorArea ────────────────────────────────────────────────

    describe('InputColorArea', () => {
        let fixture: ComponentFixture<TestBasicComponent>;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestBasicComponent);
            await fixture.whenStable();
        });

        it('should compute area gradient', () => {
            const area = fixture.debugElement.query(By.directive(InputColorArea)).componentInstance as InputColorArea;
            expect(area.$areaGradient()).toContain('linear-gradient');
        });

        it('should compute thumb background (opaque)', () => {
            const area = fixture.debugElement.query(By.directive(InputColorArea)).componentInstance as InputColorArea;
            expect(area.$thumbBackground()).toContain('rgb');
        });

        it('should compute thumb left %', () => {
            const area = fixture.debugElement.query(By.directive(InputColorArea)).componentInstance as InputColorArea;
            expect(area.$thumbLeft()).toContain('%');
        });

        it('should compute thumb top %', () => {
            const area = fixture.debugElement.query(By.directive(InputColorArea)).componentInstance as InputColorArea;
            expect(area.$thumbTop()).toContain('%');
        });

        it('should use saturation/brightness for hsba format', () => {
            const area = fixture.debugElement.query(By.directive(InputColorArea)).componentInstance as InputColorArea;
            expect(area.$xChannel()).toBe('saturation');
            expect(area.$yChannel()).toBe('brightness');
        });

        it('should use saturation/lightness for hsla format', async () => {
            fixture.componentInstance.format = 'hsla';
            fixture.detectChanges();
            await fixture.whenStable();
            const area = fixture.debugElement.query(By.directive(InputColorArea)).componentInstance as InputColorArea;
            expect(area.$xChannel()).toBe('saturation');
            expect(area.$yChannel()).toBe('lightness');
        });
    });

    // ── InputColorAreaThumb ───────────────────────────────────────────

    describe('InputColorAreaThumb', () => {
        let fixture: ComponentFixture<TestBasicComponent>;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestBasicComponent);
            await fixture.whenStable();
        });

        it('should have role=slider', () => {
            const thumbEl = fixture.debugElement.query(By.directive(InputColorAreaThumb)).nativeElement;
            expect(thumbEl.getAttribute('role')).toBe('slider');
        });

        it('should have aria-roledescription="2d slider"', () => {
            const thumbEl = fixture.debugElement.query(By.directive(InputColorAreaThumb)).nativeElement;
            expect(thumbEl.getAttribute('aria-roledescription')).toBe('2d slider');
        });

        it('should have tabindex=0', () => {
            const thumbEl = fixture.debugElement.query(By.directive(InputColorAreaThumb)).nativeElement;
            expect(thumbEl.getAttribute('tabindex')).toBe('0');
        });

        it('should have aria-valuemin', () => {
            const thumbEl = fixture.debugElement.query(By.directive(InputColorAreaThumb)).nativeElement;
            expect(thumbEl.getAttribute('aria-valuemin')).toBe('0');
        });

        it('should have aria-valuemax', () => {
            const thumbEl = fixture.debugElement.query(By.directive(InputColorAreaThumb)).nativeElement;
            expect(thumbEl.getAttribute('aria-valuemax')).toBe('100');
        });

        describe('keyboard interaction', () => {
            it('should increase x on ArrowRight', async () => {
                const inputColor = fixture.debugElement.query(By.directive(InputColor)).componentInstance as InputColor;
                inputColor.updateColor(new HSBColor(0, 50, 50));
                fixture.detectChanges();
                await fixture.whenStable();

                const thumbEl = fixture.debugElement.query(By.directive(InputColorAreaThumb)).nativeElement;
                thumbEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
                fixture.detectChanges();
                await fixture.whenStable();

                expect(inputColor._color()!.getChannelValue('saturation')).toBe(51);
            });

            it('should decrease x on ArrowLeft', async () => {
                const inputColor = fixture.debugElement.query(By.directive(InputColor)).componentInstance as InputColor;
                inputColor.updateColor(new HSBColor(0, 50, 50));
                fixture.detectChanges();
                await fixture.whenStable();

                const thumbEl = fixture.debugElement.query(By.directive(InputColorAreaThumb)).nativeElement;
                thumbEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
                fixture.detectChanges();
                await fixture.whenStable();

                expect(inputColor._color()!.getChannelValue('saturation')).toBe(49);
            });

            it('should increase y on ArrowUp', async () => {
                const inputColor = fixture.debugElement.query(By.directive(InputColor)).componentInstance as InputColor;
                inputColor.updateColor(new HSBColor(0, 50, 50));
                fixture.detectChanges();
                await fixture.whenStable();

                const thumbEl = fixture.debugElement.query(By.directive(InputColorAreaThumb)).nativeElement;
                thumbEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
                fixture.detectChanges();
                await fixture.whenStable();

                expect(inputColor._color()!.getChannelValue('brightness')).toBe(51);
            });

            it('should decrease y on ArrowDown', async () => {
                const inputColor = fixture.debugElement.query(By.directive(InputColor)).componentInstance as InputColor;
                inputColor.updateColor(new HSBColor(0, 50, 50));
                fixture.detectChanges();
                await fixture.whenStable();

                const thumbEl = fixture.debugElement.query(By.directive(InputColorAreaThumb)).nativeElement;
                thumbEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
                fixture.detectChanges();
                await fixture.whenStable();

                expect(inputColor._color()!.getChannelValue('brightness')).toBe(49);
            });

            it('should increase y by pageStep on PageUp', async () => {
                const inputColor = fixture.debugElement.query(By.directive(InputColor)).componentInstance as InputColor;
                inputColor.updateColor(new HSBColor(0, 50, 50));
                fixture.detectChanges();
                await fixture.whenStable();

                const thumbEl = fixture.debugElement.query(By.directive(InputColorAreaThumb)).nativeElement;
                thumbEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageUp', bubbles: true }));
                fixture.detectChanges();
                await fixture.whenStable();

                expect(inputColor._color()!.getChannelValue('brightness')).toBe(60);
            });

            it('should go to x min on Home', async () => {
                const inputColor = fixture.debugElement.query(By.directive(InputColor)).componentInstance as InputColor;
                inputColor.updateColor(new HSBColor(0, 50, 50));
                fixture.detectChanges();
                await fixture.whenStable();

                const thumbEl = fixture.debugElement.query(By.directive(InputColorAreaThumb)).nativeElement;
                thumbEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
                fixture.detectChanges();
                await fixture.whenStable();

                expect(inputColor._color()!.getChannelValue('saturation')).toBe(0);
            });

            it('should go to x max on End', async () => {
                const inputColor = fixture.debugElement.query(By.directive(InputColor)).componentInstance as InputColor;
                inputColor.updateColor(new HSBColor(0, 50, 50));
                fixture.detectChanges();
                await fixture.whenStable();

                const thumbEl = fixture.debugElement.query(By.directive(InputColorAreaThumb)).nativeElement;
                thumbEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
                fixture.detectChanges();
                await fixture.whenStable();

                expect(inputColor._color()!.getChannelValue('saturation')).toBe(100);
            });
        });
    });

    // ── Swatch & TransparencyGrid ─────────────────────────────────────

    describe('InputColorSwatch', () => {
        it('should render swatch', async () => {
            const fixture = TestBed.createComponent(TestBasicComponent);
            await fixture.whenStable();
            const swatch = fixture.debugElement.query(By.directive(InputColorSwatch));
            expect(swatch).toBeTruthy();
        });
    });

    describe('InputColorSwatchBackground', () => {
        it('should compute swatch color', async () => {
            const fixture = TestBed.createComponent(TestBasicComponent);
            await fixture.whenStable();
            const bg = fixture.debugElement.query(By.directive(InputColorSwatchBackground)).componentInstance as InputColorSwatchBackground;
            expect(bg.$swatchColor()).toContain('rgb');
        });

        it('should update on color change', async () => {
            const fixture = TestBed.createComponent(TestBasicComponent);
            await fixture.whenStable();
            const inputColor = fixture.debugElement.query(By.directive(InputColor)).componentInstance as InputColor;
            const bg = fixture.debugElement.query(By.directive(InputColorSwatchBackground)).componentInstance as InputColorSwatchBackground;

            inputColor.updateColor(new HSBColor(120, 100, 100));
            fixture.detectChanges();
            await fixture.whenStable();

            expect(bg.$swatchColor()).toContain('rgb(0');
        });
    });

    describe('InputColorTransparencyGrid', () => {
        it('should render', async () => {
            const fixture = TestBed.createComponent(TestBasicComponent);
            await fixture.whenStable();
            const grid = fixture.debugElement.query(By.directive(InputColorTransparencyGrid));
            expect(grid).toBeTruthy();
        });
    });

    // ── EyeDropper ────────────────────────────────────────────────────

    describe('InputColorEyeDropper', () => {
        let fixture: ComponentFixture<TestEyeDropperComponent>;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestEyeDropperComponent);
            await fixture.whenStable();
        });

        it('should render button', () => {
            const button = fixture.debugElement.query(By.css('button'));
            expect(button).toBeTruthy();
        });

        it('should have aria-label', () => {
            const button = fixture.debugElement.query(By.css('button'));
            expect(button.nativeElement.getAttribute('aria-label')).toBe('Pick a color');
        });

        it('should pass props to component', () => {
            const eyeDropper = fixture.debugElement.query(By.directive(InputColorEyeDropper)).componentInstance as InputColorEyeDropper;
            expect(eyeDropper.iconOnly()).toBeFalse();
            expect(eyeDropper.outlined()).toBeFalse();
            expect(eyeDropper.text()).toBeFalse();
            expect(eyeDropper.rounded()).toBeFalse();
        });
    });

    // ── Edge Cases ────────────────────────────────────────────────────

    describe('Edge Cases', () => {
        describe('hue 360 normalization', () => {
            it('should normalize hue 360 in display', () => {
                const c = new HSBColor(360, 100, 100);
                expect(getInputChannelValue(c, 'hue')).toBe('0');
            });

            it('should keep hue 360 in constructor', () => {
                expect(new HSBColor(360, 100, 100).hue).toBe(360);
            });

            it('should mod 360 in toHsbString', () => {
                expect(new HSBColor(360, 100, 100).toHsbString()).toContain('hsb(0,');
            });
        });

        describe('special colors across formats', () => {
            it('black: HSB(0,0,0) → RGB(0,0,0)', () => {
                const rgb = new HSBColor(0, 0, 0).toRGB();
                expect(Math.round(rgb.red)).toBe(0);
                expect(Math.round(rgb.green)).toBe(0);
                expect(Math.round(rgb.blue)).toBe(0);
            });

            it('white: HSB(0,0,100) → RGB(255,255,255)', () => {
                const rgb = new HSBColor(0, 0, 100).toRGB();
                expect(Math.round(rgb.red)).toBe(255);
                expect(Math.round(rgb.green)).toBe(255);
                expect(Math.round(rgb.blue)).toBe(255);
            });

            it('pure red across HSB → HSL → RGB', () => {
                const hsb = new HSBColor(0, 100, 100);
                const hsl = hsb.toHSL();
                const rgb = hsl.toRGB();
                expect(Math.round(rgb.red)).toBe(255);
                expect(Math.round(rgb.green)).toBe(0);
                expect(Math.round(rgb.blue)).toBe(0);
            });
        });

        describe('alpha edge cases', () => {
            it('alpha 0', () => {
                const c = new HSBColor(0, 100, 100, 0);
                expect(c.alpha).toBe(0);
                expect(c.toRgbString()).toContain('rgba');
            });

            it('alpha 1 should not show in rgba string', () => {
                expect(new HSBColor(0, 100, 100, 1).toRgbString()).not.toContain('rgba');
            });

            it('alpha 0.5', () => {
                const c = new HSBColor(0, 100, 100, 0.5);
                expect(c.toHexa()).toContain('80');
            });

            it('hexa with alpha 1 should not have alpha hex', () => {
                expect(new HSBColor(0, 100, 100, 1).toHexa()).toBe('#ff0000');
            });
        });

        describe('OKLCH achromatic', () => {
            it('black should have NaN hue', () => {
                const oklch = new RGBColor(0, 0, 0).toOKLCH();
                expect(Number.isNaN(oklch.H)).toBeTrue();
            });

            it('white should have NaN hue', () => {
                const oklch = new RGBColor(255, 255, 255).toOKLCH();
                expect(Number.isNaN(oklch.H)).toBeTrue();
            });

            it('grey should have NaN hue', () => {
                const oklch = new RGBColor(128, 128, 128).toOKLCH();
                expect(Number.isNaN(oklch.H)).toBeTrue();
            });

            it('NaN hue should output as 0 in toString', () => {
                const str = new OKLCHColor(0.5, 0, NaN).toString('oklch');
                expect(str).toContain(' 0)');
            });
        });

        describe('hex parsing edge cases', () => {
            it('should parse without #', () => {
                expect(parseColor('ff0000')).not.toBeNull();
            });

            it('should be case insensitive', () => {
                const c1 = parseColor('#FF0000')!;
                const c2 = parseColor('#ff0000')!;
                expect(c1.toHex()).toBe(c2.toHex());
            });

            it('should return null for 5-char hex', () => {
                expect(parseColor('#12345')).toBeNull();
            });

            it('should return null for 7-char hex', () => {
                expect(parseColor('#1234567')).toBeNull();
            });

            it('should parse 8-char hex with alpha', () => {
                const c = parseColor('#ff000080') as RGBColor;
                expect(c).not.toBeNull();
                expect(c.alpha).toBeLessThan(1);
            });
        });

        describe('null/undefined/empty values', () => {
            it('parseColor(null) → null', () => {
                expect(parseColor(null)).toBeNull();
            });

            it('parseColor(undefined) → null', () => {
                expect(parseColor(undefined)).toBeNull();
            });

            it('parseColor("") → null', () => {
                expect(parseColor('')).toBeNull();
            });
        });
    });
});
