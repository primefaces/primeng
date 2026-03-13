export type ColorSpace = 'hsba' | 'hsla' | 'rgba' | 'hexa' | 'oklch';

export type ColorOutputFormat = ColorSpace | 'hex' | 'rgb' | 'hsl' | 'hsb' | 'oklcha' | 'css';

export type ColorChannel = 'hue' | 'saturation' | 'brightness' | 'lightness' | 'red' | 'green' | 'blue' | 'alpha' | 'hex' | 'oklchLightness' | 'oklchChroma' | 'oklchHue';

export type ColorSliderChannel = 'hue' | 'saturation' | 'brightness' | 'lightness' | 'red' | 'green' | 'blue' | 'alpha' | 'oklchLightness' | 'oklchChroma' | 'oklchHue';

export type ColorInputChannel = ColorChannel | 'css';

export interface ColorChannelRange {
    minValue: number;
    maxValue: number;
    step: number;
    pageStep: number;
}

export interface Color2DAxes {
    xChannel: ColorSliderChannel;
    yChannel: ColorSliderChannel;
}

export interface Color3DAxes extends Color2DAxes {
    zChannel: ColorSliderChannel;
}

export interface ColorOutput {
    toString(format?: ColorOutputFormat): string;
    toHex(): string;
    toHexa(): string;
    toHexInt(): number;
    toRgbString(): string;
    toHslString(): string;
    toHsbString(): string;
}

export type ColorInstance = HSBColor | HSLColor | RGBColor | OKLCHColor;

function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

function round(value: number, decimals: number = 0): number {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
}

function multiplyMatrices(matrix: number[], vector: number[]): number[] {
    return [matrix[0] * vector[0] + matrix[1] * vector[1] + matrix[2] * vector[2], matrix[3] * vector[0] + matrix[4] * vector[1] + matrix[5] * vector[2], matrix[6] * vector[0] + matrix[7] * vector[1] + matrix[8] * vector[2]];
}

function mod(n: number, m: number): number {
    return ((n % m) + m) % m;
}

/**
 * Snaps a value to the nearest step increment within min/max bounds.
 * @example snap(23.7, 0, 100, 5) => 25
 * @example snap(0.234, 0, 1, 0.01) => 0.23
 */
export function snapValue(value: number, min: number, max: number, step: number): number {
    const clamped = clamp(value, min, max);
    const offset = clamped - min;
    const steps = Math.round(offset / step);
    const snapped = min + steps * step;
    const precision = (step.toString().split('.')[1] || '').length;
    return parseFloat(snapped.toFixed(precision));
}

export abstract class Color implements ColorOutput {
    abstract readonly colorSpace: ColorSpace;

    abstract getChannelValue(channel: ColorChannel): number;
    abstract setChannelValue(channel: ColorChannel, value: number): ColorInstance;
    abstract toHSB(): HSBColor;
    abstract toHSL(): HSLColor;
    abstract toRGB(): RGBColor;
    abstract toOKLCH(): OKLCHColor;
    abstract clone(): ColorInstance;

    get alpha(): number {
        return this.getChannelValue('alpha');
    }

    toHex(): string {
        const rgb = this.toRGB();
        const r = Math.round(rgb.red).toString(16).padStart(2, '0');
        const g = Math.round(rgb.green).toString(16).padStart(2, '0');
        const b = Math.round(rgb.blue).toString(16).padStart(2, '0');
        return `#${r}${g}${b}`;
    }

    toHexa(): string {
        const hex = this.toHex();
        if (this.alpha < 1) {
            const a = Math.round(this.alpha * 255)
                .toString(16)
                .padStart(2, '0');
            return `${hex}${a}`;
        }
        return hex;
    }

    toHexInt(): number {
        const rgb = this.toRGB();
        return (Math.round(rgb.red) << 16) | (Math.round(rgb.green) << 8) | Math.round(rgb.blue);
    }

    toRgbString(): string {
        const rgb = this.toRGB();
        const r = Math.round(rgb.red);
        const g = Math.round(rgb.green);
        const b = Math.round(rgb.blue);
        if (this.alpha < 1) {
            return `rgba(${r}, ${g}, ${b}, ${round(this.alpha, 2)})`;
        }
        return `rgb(${r}, ${g}, ${b})`;
    }

    toHslString(): string {
        const hsl = this.toHSL();
        const h = Math.round(hsl.hue) % 360;
        const s = Math.round(hsl.saturation);
        const l = Math.round(hsl.lightness);
        if (this.alpha < 1) {
            return `hsla(${h}, ${s}%, ${l}%, ${round(this.alpha, 2)})`;
        }
        return `hsl(${h}, ${s}%, ${l}%)`;
    }

    toHsbString(): string {
        const hsb = this.toHSB();
        const h = Math.round(hsb.hue) % 360;
        const s = Math.round(hsb.saturation);
        const b = Math.round(hsb.brightness);
        if (this.alpha < 1) {
            return `hsba(${h}, ${s}%, ${b}%, ${round(this.alpha, 2)})`;
        }
        return `hsb(${h}, ${s}%, ${b}%)`;
    }

    toString(format?: ColorOutputFormat): string {
        const f = format || this.colorSpace;
        switch (f) {
            case 'hex':
                return this.toHex();
            case 'hexa':
                return this.toHexa();
            case 'rgb':
            case 'rgba':
                return this.toRgbString();
            case 'hsl':
            case 'hsla':
                return this.toHslString();
            case 'hsb':
            case 'hsba':
                return this.toHsbString();
            case 'oklch':
                return this.toOKLCH().toString('oklch');
            case 'css':
                return this.toHex();
            default:
                return this.toHex();
        }
    }

    toFormat(format: ColorSpace): ColorInstance {
        switch (format) {
            case 'hsba':
                return this.toHSB();
            case 'hsla':
                return this.toHSL();
            case 'rgba':
                return this.toRGB();
            case 'hexa':
                return this.toRGB();
            case 'oklch':
                return this.toOKLCH();
            default:
                return this.toHSB();
        }
    }
}

export class HSBColor extends Color {
    readonly colorSpace: ColorSpace = 'hsba';

    constructor(
        public hue: number,
        public saturation: number,
        public brightness: number,
        private _alpha: number = 1
    ) {
        super();
        this.hue = hue >= 0 && hue <= 360 ? hue : mod(hue, 360);
        this.saturation = clamp(saturation, 0, 100);
        this.brightness = clamp(brightness, 0, 100);
        this._alpha = clamp(_alpha, 0, 1);
    }

    getChannelValue(channel: ColorChannel): number {
        switch (channel) {
            case 'hue':
                return this.hue;
            case 'saturation':
                return this.saturation;
            case 'brightness':
                return this.brightness;
            case 'alpha':
                return this._alpha;
            case 'lightness':
                return this.toHSL().getChannelValue(channel);
            case 'oklchLightness':
            case 'oklchChroma':
            case 'oklchHue':
                return this.toOKLCH().getChannelValue(channel);
            default:
                return this.toRGB().getChannelValue(channel);
        }
    }

    setChannelValue(channel: ColorChannel, value: number): ColorInstance {
        switch (channel) {
            case 'hue':
                return new HSBColor(value, this.saturation, this.brightness, this._alpha);
            case 'saturation':
                return new HSBColor(this.hue, value, this.brightness, this._alpha);
            case 'brightness':
                return new HSBColor(this.hue, this.saturation, value, this._alpha);
            case 'alpha':
                return new HSBColor(this.hue, this.saturation, this.brightness, value);
            case 'lightness': {
                const hsl = this.toHSL().setChannelValue(channel, value);
                return hsl.toHSB();
            }
            case 'oklchLightness':
            case 'oklchChroma':
            case 'oklchHue': {
                const oklch = this.toOKLCH().setChannelValue(channel, value);
                return oklch.toHSB();
            }
            default: {
                const rgb = this.toRGB().setChannelValue(channel, value);
                return rgb.toHSB();
            }
        }
    }

    toHSB(): HSBColor {
        return this.clone();
    }

    toHSL(): HSLColor {
        const h = this.hue;
        const s = this.saturation / 100;
        const b = this.brightness / 100;

        const l = b * (1 - s / 2);
        const sl = l === 0 || l === 1 ? 0 : ((b - l) / Math.min(l, 1 - l)) * 100;

        return new HSLColor(h, sl, l * 100, this._alpha);
    }

    toRGB(): RGBColor {
        const h = this.hue / 360;
        const s = this.saturation / 100;
        const b = this.brightness / 100;

        let r: number, g: number, bl: number;

        const i = Math.floor(h * 6);
        const f = h * 6 - i;
        const p = b * (1 - s);
        const q = b * (1 - f * s);
        const t = b * (1 - (1 - f) * s);

        switch (i % 6) {
            case 0:
                r = b;
                g = t;
                bl = p;
                break;
            case 1:
                r = q;
                g = b;
                bl = p;
                break;
            case 2:
                r = p;
                g = b;
                bl = t;
                break;
            case 3:
                r = p;
                g = q;
                bl = b;
                break;
            case 4:
                r = t;
                g = p;
                bl = b;
                break;
            case 5:
                r = b;
                g = p;
                bl = q;
                break;
            default:
                r = 0;
                g = 0;
                bl = 0;
        }

        return new RGBColor(r * 255, g * 255, bl * 255, this._alpha);
    }

    toOKLCH(): OKLCHColor {
        return this.toRGB().toOKLCH();
    }

    clone(): HSBColor {
        return new HSBColor(this.hue, this.saturation, this.brightness, this._alpha);
    }
}

export class HSLColor extends Color {
    readonly colorSpace: ColorSpace = 'hsla';

    constructor(
        public hue: number,
        public saturation: number,
        public lightness: number,
        private _alpha: number = 1
    ) {
        super();
        this.hue = hue >= 0 && hue <= 360 ? hue : mod(hue, 360);
        this.saturation = clamp(saturation, 0, 100);
        this.lightness = clamp(lightness, 0, 100);
        this._alpha = clamp(_alpha, 0, 1);
    }

    getChannelValue(channel: ColorChannel): number {
        switch (channel) {
            case 'hue':
                return this.hue;
            case 'saturation':
                return this.saturation;
            case 'lightness':
                return this.lightness;
            case 'alpha':
                return this._alpha;
            case 'brightness':
                return this.toHSB().getChannelValue(channel);
            case 'oklchLightness':
            case 'oklchChroma':
            case 'oklchHue':
                return this.toOKLCH().getChannelValue(channel);
            default:
                return this.toRGB().getChannelValue(channel);
        }
    }

    setChannelValue(channel: ColorChannel, value: number): ColorInstance {
        switch (channel) {
            case 'hue':
                return new HSLColor(value, this.saturation, this.lightness, this._alpha);
            case 'saturation':
                return new HSLColor(this.hue, value, this.lightness, this._alpha);
            case 'lightness':
                return new HSLColor(this.hue, this.saturation, value, this._alpha);
            case 'alpha':
                return new HSLColor(this.hue, this.saturation, this.lightness, value);
            case 'brightness': {
                const hsb = this.toHSB().setChannelValue(channel, value);
                return hsb.toHSL();
            }
            case 'oklchLightness':
            case 'oklchChroma':
            case 'oklchHue': {
                const oklch = this.toOKLCH().setChannelValue(channel, value);
                return oklch.toHSL();
            }
            default: {
                const rgb = this.toRGB().setChannelValue(channel, value);
                return rgb.toHSL();
            }
        }
    }

    toHSB(): HSBColor {
        const h = this.hue;
        const s = this.saturation / 100;
        const l = this.lightness / 100;

        const b = l + s * Math.min(l, 1 - l);
        const sb = b === 0 ? 0 : 2 * (1 - l / b);

        return new HSBColor(h, sb * 100, b * 100, this._alpha);
    }

    toHSL(): HSLColor {
        return this.clone();
    }

    toRGB(): RGBColor {
        const h = this.hue;
        const s = this.saturation / 100;
        const l = this.lightness / 100;

        const a = s * Math.min(l, 1 - l);
        const f = (n: number) => {
            const k = (n + h / 30) % 12;
            return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        };

        return new RGBColor(f(0) * 255, f(8) * 255, f(4) * 255, this._alpha);
    }

    toOKLCH(): OKLCHColor {
        return this.toRGB().toOKLCH();
    }

    clone(): HSLColor {
        return new HSLColor(this.hue, this.saturation, this.lightness, this._alpha);
    }
}

export class RGBColor extends Color {
    readonly colorSpace: ColorSpace = 'rgba';

    constructor(
        public red: number,
        public green: number,
        public blue: number,
        private _alpha: number = 1
    ) {
        super();
        this.red = clamp(red, 0, 255);
        this.green = clamp(green, 0, 255);
        this.blue = clamp(blue, 0, 255);
        this._alpha = clamp(_alpha, 0, 1);
    }

    getChannelValue(channel: ColorChannel): number {
        switch (channel) {
            case 'red':
                return this.red;
            case 'green':
                return this.green;
            case 'blue':
                return this.blue;
            case 'alpha':
                return this._alpha;
            case 'hue':
            case 'saturation':
            case 'brightness':
                return this.toHSB().getChannelValue(channel);
            case 'lightness':
                return this.toHSL().getChannelValue(channel);
            case 'oklchLightness':
            case 'oklchChroma':
            case 'oklchHue':
                return this.toOKLCH().getChannelValue(channel);
            default:
                return this.toHSB().getChannelValue(channel);
        }
    }

    setChannelValue(channel: ColorChannel, value: number): ColorInstance {
        switch (channel) {
            case 'red':
                return new RGBColor(value, this.green, this.blue, this._alpha);
            case 'green':
                return new RGBColor(this.red, value, this.blue, this._alpha);
            case 'blue':
                return new RGBColor(this.red, this.green, value, this._alpha);
            case 'alpha':
                return new RGBColor(this.red, this.green, this.blue, value);
            case 'hue':
            case 'saturation':
            case 'brightness': {
                const hsb = this.toHSB().setChannelValue(channel, value);
                return hsb.toRGB();
            }
            case 'lightness': {
                const hsl = this.toHSL().setChannelValue(channel, value);
                return hsl.toRGB();
            }
            case 'oklchLightness':
            case 'oklchChroma':
            case 'oklchHue': {
                const oklch = this.toOKLCH().setChannelValue(channel, value);
                return oklch.toRGB();
            }
            default: {
                const hsb = this.toHSB().setChannelValue(channel, value);
                return hsb.toRGB();
            }
        }
    }

    toHSB(): HSBColor {
        const r = this.red / 255;
        const g = this.green / 255;
        const b = this.blue / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const d = max - min;

        let h = 0;
        const s = max === 0 ? 0 : d / max;
        const v = max;

        if (d !== 0) {
            switch (max) {
                case r:
                    h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                    break;
                case g:
                    h = ((b - r) / d + 2) / 6;
                    break;
                case b:
                    h = ((r - g) / d + 4) / 6;
                    break;
            }
        }

        return new HSBColor(h * 360, s * 100, v * 100, this._alpha);
    }

    toHSL(): HSLColor {
        const r = this.red / 255;
        const g = this.green / 255;
        const b = this.blue / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const d = max - min;
        const l = (max + min) / 2;

        let h = 0;
        let s = 0;

        if (d !== 0) {
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                    break;
                case g:
                    h = ((b - r) / d + 2) / 6;
                    break;
                case b:
                    h = ((r - g) / d + 4) / 6;
                    break;
            }
        }

        return new HSLColor(h * 360, s * 100, l * 100, this._alpha);
    }

    toRGB(): RGBColor {
        return this.clone();
    }

    toOKLCH(): OKLCHColor {
        const rgb = [this.red / 255, this.green / 255, this.blue / 255];
        const rgbLinear = rgb.map((c) => (Math.abs(c) <= 0.04045 ? c / 12.92 : (c < 0 ? -1 : 1) * ((Math.abs(c) + 0.055) / 1.055) ** 2.4));

        const xyz = multiplyMatrices([0.41239079926595934, 0.357584339383878, 0.1804807884018343, 0.21263900587151027, 0.715168678767756, 0.07219231536073371, 0.01933081871559182, 0.11919477979462598, 0.9505321522496607], rgbLinear);
        const LMS = multiplyMatrices([0.819022437996703, 0.3619062600528904, -0.1288737815209879, 0.0329836539323885, 0.9292868615863434, 0.0361446663506424, 0.0481771893596242, 0.2642395317527308, 0.6335478284694309], xyz);
        const LMSg = LMS.map((val) => Math.cbrt(val));

        const [L, a, b] = multiplyMatrices([0.210454268309314, 0.7936177747023054, -0.0040720430116193, 1.9779985324311684, -2.4285922420485799, 0.450593709617411, 0.0259040424655478, 0.7827717124575296, -0.8086757549230774], LMSg);

        const C = Math.sqrt(a ** 2 + b ** 2);
        const H = Math.abs(a) < 0.0002 && Math.abs(b) < 0.0002 ? NaN : ((((Math.atan2(b, a) * 180) / Math.PI) % 360) + 360) % 360;

        const outL = Number(Math.min(1, Math.max(0, L)).toFixed(4));
        const outC = Number(C.toFixed(4));
        const outH = Number.isNaN(H) ? NaN : Number(H.toFixed(2));

        return new OKLCHColor(outL, outC, outH, Number(this._alpha.toFixed(2)));
    }

    clone(): RGBColor {
        return new RGBColor(this.red, this.green, this.blue, this._alpha);
    }
}

export class OKLCHColor extends Color {
    readonly colorSpace: ColorSpace = 'oklch';

    constructor(
        public oklchLightness: number,
        public oklchChroma: number,
        public oklchHue: number,
        private _alpha: number = 1
    ) {
        super();
        this.oklchLightness = clamp(oklchLightness, 0, 1);
        this.oklchChroma = clamp(oklchChroma, 0, 0.4);
        this.oklchHue = Number.isNaN(oklchHue) ? NaN : oklchHue >= 0 && oklchHue <= 360 ? oklchHue : mod(oklchHue, 360);
        this._alpha = clamp(_alpha, 0, 1);
    }

    getChannelValue(channel: ColorChannel): number {
        switch (channel) {
            case 'oklchLightness':
                return this.oklchLightness;
            case 'oklchChroma':
                return this.oklchChroma;
            case 'oklchHue':
                return this.oklchHue;
            case 'alpha':
                return this._alpha;
            default:
                return this.toRGB().getChannelValue(channel);
        }
    }

    setChannelValue(channel: ColorChannel, value: number): ColorInstance {
        switch (channel) {
            case 'oklchLightness':
                return new OKLCHColor(value, this.oklchChroma, this.oklchHue, this._alpha);
            case 'oklchChroma':
                return new OKLCHColor(this.oklchLightness, value, this.oklchHue, this._alpha);
            case 'oklchHue':
                return new OKLCHColor(this.oklchLightness, this.oklchChroma, value, this._alpha);
            case 'alpha':
                return new OKLCHColor(this.oklchLightness, this.oklchChroma, this.oklchHue, value);
            default: {
                const rgb = this.toRGB().setChannelValue(channel, value);
                return rgb.toOKLCH();
            }
        }
    }

    toHSB(): HSBColor {
        return this.toRGB().toHSB();
    }

    toHSL(): HSLColor {
        return this.toRGB().toHSL();
    }

    toRGB(): RGBColor {
        const hRad = (this.oklchHue * Math.PI) / 180;
        const a = Number.isNaN(this.oklchHue) ? 0 : this.oklchChroma * Math.cos(hRad);
        const b = Number.isNaN(this.oklchHue) ? 0 : this.oklchChroma * Math.sin(hRad);

        const l_ = this.oklchLightness + 0.3963377774 * a + 0.2158037573 * b;
        const m_ = this.oklchLightness - 0.1055613458 * a - 0.0638541728 * b;
        const s_ = this.oklchLightness - 0.0894841775 * a - 1.291485548 * b;

        const l = l_ * l_ * l_;
        const m = m_ * m_ * m_;
        const s = s_ * s_ * s_;

        const lr = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
        const lg = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
        const lb = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

        const toSrgb = (c: number) => {
            if (c <= 0.0031308) return c * 12.92;
            return 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
        };

        return new RGBColor(clamp(toSrgb(lr) * 255, 0, 255), clamp(toSrgb(lg) * 255, 0, 255), clamp(toSrgb(lb) * 255, 0, 255), this._alpha);
    }

    toOKLCH(): OKLCHColor {
        return this.clone();
    }

    override toString(format?: ColorOutputFormat): string {
        const f = format || this.colorSpace;
        switch (f) {
            case 'oklch': {
                const l = Number.isNaN(this.oklchLightness) ? 0 : Number((this.oklchLightness * 100).toFixed(2));
                const c = Number.isNaN(this.oklchChroma) ? 0 : Number(this.oklchChroma.toFixed(4));
                const h = Number.isNaN(this.oklchHue) ? 0 : Number(this.oklchHue.toFixed(2));
                return `oklch(${l}% ${c} ${h})`;
            }
            case 'oklcha':
            case 'css': {
                const l = Number.isNaN(this.oklchLightness) ? 0 : Number((this.oklchLightness * 100).toFixed(2));
                const c = Number.isNaN(this.oklchChroma) ? 0 : Number(this.oklchChroma.toFixed(4));
                const h = Number.isNaN(this.oklchHue) ? 0 : Number(this.oklchHue.toFixed(2));
                const a = Number.isNaN(this._alpha) ? 1 : Number(this._alpha.toFixed(2));
                return `oklch(${l}% ${c} ${h} / ${a})`;
            }
            default:
                return super.toString(f);
        }
    }

    clone(): OKLCHColor {
        return new OKLCHColor(this.oklchLightness, this.oklchChroma, this.oklchHue, this._alpha);
    }
}

export function parseColor(value: string | ColorInstance | null | undefined): ColorInstance | null {
    if (!value) return null;

    if (value instanceof Color) {
        return value as ColorInstance;
    }

    if (typeof value !== 'string') return null;

    const str = value.trim();

    const hexMatch = str.match(/^#?([0-9a-f]{3,8})$/i);
    if (hexMatch) {
        let hex = hexMatch[1];
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        } else if (hex.length === 4) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
        }

        if (hex.length === 6) {
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            return new RGBColor(r, g, b, 1);
        }

        if (hex.length === 8) {
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            const a = parseInt(hex.substring(6, 8), 16) / 255;
            return new RGBColor(r, g, b, a);
        }
    }

    const rgbMatch = str.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)$/i);
    if (rgbMatch) {
        return new RGBColor(parseInt(rgbMatch[1]), parseInt(rgbMatch[2]), parseInt(rgbMatch[3]), rgbMatch[4] !== undefined ? parseFloat(rgbMatch[4]) : 1);
    }

    const hslMatch = str.match(/^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?\s*(?:,\s*([\d.]+))?\s*\)$/i);
    if (hslMatch) {
        return new HSLColor(parseFloat(hslMatch[1]), parseFloat(hslMatch[2]), parseFloat(hslMatch[3]), hslMatch[4] !== undefined ? parseFloat(hslMatch[4]) : 1);
    }

    const hsbMatch = str.match(/^hsba?\(\s*([\d.]+)\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?\s*(?:,\s*([\d.]+))?\s*\)$/i);
    if (hsbMatch) {
        return new HSBColor(parseFloat(hsbMatch[1]), parseFloat(hsbMatch[2]), parseFloat(hsbMatch[3]), hsbMatch[4] !== undefined ? parseFloat(hsbMatch[4]) : 1);
    }

    const oklchMatch = str.match(/^oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)\s*(?:\/\s*([\d.]+))?\s*\)$/i);
    if (oklchMatch) {
        const lVal = parseFloat(oklchMatch[1]);
        const l = oklchMatch[2] === '%' ? lVal / 100 : lVal;
        return new OKLCHColor(l, parseFloat(oklchMatch[3]), parseFloat(oklchMatch[4]), oklchMatch[5] !== undefined ? parseFloat(oklchMatch[5]) : 1);
    }

    return null;
}

export function getChannelRange(channel: ColorSliderChannel): ColorChannelRange {
    switch (channel) {
        case 'hue':
            return { minValue: 0, maxValue: 360, step: 1, pageStep: 15 };
        case 'oklchHue':
            return { minValue: 0, maxValue: 360, step: 1, pageStep: 15 };
        case 'saturation':
        case 'brightness':
        case 'lightness':
            return { minValue: 0, maxValue: 100, step: 1, pageStep: 10 };
        case 'red':
        case 'green':
        case 'blue':
            return { minValue: 0, maxValue: 255, step: 1, pageStep: 17 };
        case 'alpha':
            return { minValue: 0, maxValue: 1, step: 0.01, pageStep: 0.1 };
        case 'oklchLightness':
            return { minValue: 0, maxValue: 1, step: 0.01, pageStep: 0.1 };
        case 'oklchChroma':
            return { minValue: 0, maxValue: 0.4, step: 0.01, pageStep: 0.05 };
        default:
            return { minValue: 0, maxValue: 100, step: 1, pageStep: 10 };
    }
}

export function getInputChannelRange(channel: ColorInputChannel): ColorChannelRange {
    if (channel === 'hex') {
        return { minValue: 0, maxValue: 0xffffff, step: 1, pageStep: 1 };
    }
    return getChannelRange(channel as ColorSliderChannel);
}

export function getChannelGradient(color: ColorInstance, channel: ColorSliderChannel, orientation: 'horizontal' | 'vertical' = 'horizontal'): string {
    const range = getChannelRange(channel);
    const direction = orientation === 'horizontal' ? 'right' : 'top';

    switch (channel) {
        case 'hue':
        case 'oklchHue':
            return `linear-gradient(to ${direction}, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 17%, rgb(0, 255, 0) 33%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 67%, rgb(255, 0, 255) 83%, rgb(255, 0, 0) 100%)`;

        case 'lightness':
        case 'oklchLightness': {
            const start = color.setChannelValue(channel as ColorChannel, range.minValue).toRgbString();
            const middle = color.setChannelValue(channel as ColorChannel, (range.maxValue - range.minValue) / 2).toRgbString();
            const end = color.setChannelValue(channel as ColorChannel, range.maxValue).toRgbString();
            return `linear-gradient(to ${direction}, ${start}, ${middle}, ${end})`;
        }

        case 'alpha': {
            const start = color.setChannelValue('alpha', range.minValue).toRgbString();
            const end = color.setChannelValue('alpha', range.maxValue).toRgbString();
            return `linear-gradient(to ${direction}, ${start}, ${end})`;
        }

        default: {
            const start = color.setChannelValue(channel as ColorChannel, range.minValue).toRgbString();
            const end = color.setChannelValue(channel as ColorChannel, range.maxValue).toRgbString();
            return `linear-gradient(to ${direction}, ${start}, ${end})`;
        }
    }
}

const channelGenerators: Record<string, (color: ColorInstance) => string> = {
    hue: (color) => [0, 60, 120, 180, 240, 300, 360].map((h) => color.setChannelValue('hue', h).toRgbString()).join(', '),
    saturation: (color) => `${color.setChannelValue('saturation', 0).toRgbString()}, transparent`,
    lightness: () => 'black, transparent, white',
    brightness: () => 'black, transparent',
    oklchHue: (color) => [0, 60, 120, 180, 240, 300, 360].map((h) => color.setChannelValue('oklchHue', h).toRgbString()).join(', '),
    oklchChroma: (color) => `${color.setChannelValue('oklchChroma', 0).toRgbString()}, transparent`,
    oklchLightness: () => 'black, transparent, white'
};

export function getAreaGradient(color: ColorInstance, xChannel: ColorSliderChannel, yChannel: ColorSliderChannel, format: ColorSpace): string {
    const axes3d = getDefault3DAxes(format);
    const zChannel = axes3d.zChannel;
    const zValue = color.getChannelValue(zChannel as ColorChannel);

    const isHSL = format === 'hsla';

    let base: ColorInstance;
    if (isHSL) {
        base = (parseColor('hsl(0, 100%, 50%)') as ColorInstance).setChannelValue(zChannel as ColorChannel, zValue);
    } else {
        base = (parseColor('hsb(0, 100%, 100%)') as ColorInstance).setChannelValue(zChannel as ColorChannel, zValue);
    }

    const channels = [xChannel, yChannel];
    const direction = (c: string) => (c === xChannel ? 'right' : 'top');

    const layers = channels
        .map((c) => {
            const gen = channelGenerators[c];
            if (!gen) return null;
            return `linear-gradient(to ${direction(c)}, ${gen(base)})`;
        })
        .filter(Boolean)
        .reverse() as string[];

    const isHueZ = zChannel === 'hue' || zChannel === 'oklchHue';
    if (isHueZ) {
        layers.push(base.toRgbString());
    }

    return layers.join(', ');
}

export function getChannelColor(color: ColorInstance, channel: ColorChannel): ColorInstance {
    switch (channel) {
        case 'hue':
            return parseColor(`hsl(${color.getChannelValue('hue')}, 100%, 50%)`)!;
        case 'red':
        case 'green':
        case 'blue':
        case 'lightness':
        case 'brightness':
        case 'saturation':
            return color.setChannelValue('alpha', 1);
        case 'alpha':
            return color;
        default:
            return color.setChannelValue('alpha', 1);
    }
}

function toCssString(color: ColorInstance, format: ColorSpace): string {
    const a = round(color.alpha, 2);
    switch (format) {
        case 'rgba':
        case 'hexa': {
            const rgb = color.toRGB();
            return `rgba(${Math.round(rgb.red)}, ${Math.round(rgb.green)}, ${Math.round(rgb.blue)}, ${a})`;
        }
        case 'hsla': {
            const hsl = color.toHSL();
            return `hsla(${Math.round(hsl.hue) % 360}, ${hsl.saturation.toFixed(2)}%, ${hsl.lightness.toFixed(2)}%, ${a})`;
        }
        case 'hsba': {
            // CSS doesn't support hsb, convert to hsl
            const hsl = color.toHSL();
            return `hsla(${Math.round(hsl.hue) % 360}, ${hsl.saturation.toFixed(2)}%, ${hsl.lightness.toFixed(2)}%, ${a})`;
        }
        case 'oklch': {
            return color.toOKLCH().toString('css');
        }
        default:
            return color.toOKLCH().toString('css');
    }
}

export function getInputChannelValue(color: ColorInstance, channel: ColorInputChannel, format: ColorSpace = 'hsba'): string {
    if (channel === 'hex') {
        return color.toHex();
    }
    if (channel === 'css') {
        return toCssString(color, format);
    }
    const value = color.getChannelValue(channel);
    if (Number.isNaN(value)) return 'NaN';
    const range = getChannelRange(channel as ColorSliderChannel);
    if (channel === 'oklchHue') {
        const rounded = round(value, 2);
        return (rounded === 360 ? 0 : rounded).toString();
    }
    if (channel === 'hue') {
        const rounded = Math.round(value);
        return (rounded === 360 ? 0 : rounded).toString();
    }
    if (range.step >= 1) {
        return Math.round(value).toString();
    }
    return round(value, 4).toString();
}

export function getDefault2DAxes(format: ColorSpace): Color2DAxes {
    switch (format) {
        case 'hsla':
            return { xChannel: 'saturation', yChannel: 'lightness' };
        case 'hsba':
        case 'rgba':
        case 'oklch':
        default:
            return { xChannel: 'saturation', yChannel: 'brightness' };
    }
}

export function getDefault3DAxes(format: ColorSpace): Color3DAxes {
    switch (format) {
        case 'hsla':
            return { xChannel: 'saturation', yChannel: 'lightness', zChannel: 'hue' };
        case 'hsba':
        case 'rgba':
        case 'oklch':
        default:
            return { xChannel: 'saturation', yChannel: 'brightness', zChannel: 'hue' };
    }
}
