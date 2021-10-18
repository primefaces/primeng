import {NgModule,Directive,ElementRef,HostListener,Input,OnDestroy,DoCheck,NgZone, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ContentChildren, QueryList, TemplateRef, Component, AfterContentInit, ViewChild, ChangeDetectorRef, forwardRef, Output, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {animate, style, transition, trigger} from '@angular/animations';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {DomHandler, ConnectedOverlayScrollHandler} from 'primeng/dom';
import {OverlayService, PrimeNGConfig, PrimeTemplate, TranslationKeys, SharedModule} from 'primeng/api';
import {ZIndexUtils} from 'primeng/utils';
import {InputTextModule} from 'primeng/inputtext';
import { Subscription } from 'rxjs';

@Directive({
    selector: '[pPassword]',
    host: {
        'class': 'p-inputtext p-component p-element',
        '[class.p-filled]': 'filled'
    }
})
export class PasswordDirective implements OnDestroy,DoCheck {

    @Input() promptLabel: string = 'Enter a password';

    @Input() weakLabel: string = 'Weak';

    @Input() mediumLabel: string = 'Medium';

    @Input() strongLabel: string = 'Strong';

    @Input() feedback: boolean = true;

    @Input() set showPassword(show: boolean) {
        this.el.nativeElement.type = show ? 'text' : 'password';
    }

    panel: HTMLDivElement;

    meter: any;

    info: any;

    filled: boolean;

    scrollHandler: any;

    documentResizeListener: any;

    constructor(public el: ElementRef, public zone: NgZone) {}

    ngDoCheck() {
        this.updateFilledState();
    }

    @HostListener('input', ['$event'])
    onInput(e) {
        this.updateFilledState();
    }

    updateFilledState() {
        this.filled = this.el.nativeElement.value && this.el.nativeElement.value.length;
    }

    createPanel() {
        this.panel = document.createElement('div');
        this.panel.className = 'p-password-panel p-component p-password-panel-overlay p-connected-overlay';
        this.meter = document.createElement('div');
        this.meter.className = 'p-password-meter';
        this.info = document.createElement('div');
        this.info.className = 'p-password-info';
        this.info.textContent = this.promptLabel;
        this.panel.appendChild(this.meter);
        this.panel.appendChild(this.info);
        this.panel.style.minWidth = DomHandler.getOuterWidth(this.el.nativeElement) + 'px';
        document.body.appendChild(this.panel);
    }

    showOverlay() {
        if (this.feedback) {
            if (!this.panel) {
                this.createPanel();
            }

            this.panel.style.zIndex = String(++DomHandler.zindex);
            this.panel.style.display = 'block';
            this.zone.runOutsideAngular(() => {

                setTimeout(() => {
                    DomHandler.addClass(this.panel, 'p-connected-overlay-visible');
                    this.bindScrollListener();
                    this.bindDocumentResizeListener();
                }, 1);
            });
            DomHandler.absolutePosition(this.panel, this.el.nativeElement);
        }
    }

    hideOverlay() {
        if (this.feedback && this.panel) {
            DomHandler.addClass(this.panel, 'p-connected-overlay-hidden');
            DomHandler.removeClass(this.panel, 'p-connected-overlay-visible');
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
    onKeyup(e) {
        if (this.feedback) {
            let value = e.target.value,
            label = null,
            meterPos = null;

            if (value.length === 0) {
                label = this.promptLabel;
                meterPos = '0px 0px';
            }
            else {
                var score = this.testStrength(value);

                if (score < 30) {
                    label = this.weakLabel;
                    meterPos = '0px -10px';
                }
                else if (score >= 30 && score < 80) {
                    label = this.mediumLabel;
                    meterPos = '0px -20px';
                }
                else if (score >= 80) {
                    label = this.strongLabel;
                    meterPos = '0px -30px';
                }
            }

            if (!this.panel || !DomHandler.hasClass(this.panel, 'p-connected-overlay-visible')) {
                this.showOverlay();
            }

            this.meter.style.backgroundPosition = meterPos;
            this.info.textContent = label;
        }
    }

    testStrength(str: string) {
        let grade: number = 0;
        let val: RegExpMatchArray;

        val = str.match('[0-9]');
        grade += this.normalize(val ? val.length : 1/4, 1) * 25;

        val = str.match('[a-zA-Z]');
        grade += this.normalize(val ? val.length : 1/2, 3) * 10;

        val = str.match('[!@#$%^&*?_~.,;=]');
        grade += this.normalize(val ? val.length : 1/6, 1) * 35;

        val = str.match('[A-Z]');
        grade += this.normalize(val ? val.length : 1/6, 1) * 30;

        grade *= str.length / 8;

        return grade > 100 ? 100 : grade;
    }

    normalize(x, y) {
        let diff = x - y;

        if (diff <= 0)
            return x / y;
        else
            return 1 + 0.5 * (x / (x + y/4));
    }

    get disabled(): boolean {
        return this.el.nativeElement.disabled;
    }

    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.el.nativeElement, () => {
                if (DomHandler.hasClass(this.panel, 'p-connected-overlay-visible')) {
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
        this.hideOverlay();
    }

    ngOnDestroy() {
        if (this.panel) {
            if (this.scrollHandler) {
                this.scrollHandler.destroy();
                this.scrollHandler = null;
            }

            this.unbindDocumentResizeListener();

            document.body.removeChild(this.panel);
            this.panel = null;
            this.meter = null;
            this.info = null;
        }
    }
}


export const Password_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Password),
    multi: true
};
@Component({
    selector: 'p-password',
    template: `
        <div [ngClass]="containerClass()" [ngStyle]="style" [class]="styleClass">
            <input #input [attr.id]="inputId" pInputText [ngClass]="inputFieldClass()" [ngStyle]="inputStyle" [class]="inputStyleClass" [attr.type]="inputType()" [attr.placeholder]="placeholder" [value]="value" (input)="onInput($event)" (focus)="onInputFocus($event)"
                (blur)="onInputBlur($event)" (keyup)="onKeyUp($event)" />
            <i *ngIf="toggleMask" [ngClass]="toggleIconClass()" (click)="onMaskToggle()"></i>
            <div #overlay *ngIf="overlayVisible" [ngClass]="'p-password-panel p-component'" (click)="onOverlayClick($event)"
                [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" (@overlayAnimation.start)="onAnimationStart($event)" (@overlayAnimation.done)="onAnimationEnd($event)">
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                <ng-container *ngIf="contentTemplate; else content">
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </ng-container>
                <ng-template #content>
                    <div class="p-password-meter">
                        <div [ngClass]="strengthClass()" [ngStyle]="{'width': meter ? meter.width : ''}"></div>
                    </div>
                    <div className="p-password-info">{{infoText}}</div>
                </ng-template>
                <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
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
    host: {
        'class': 'p-element p-inputwrapper',
        '[class.p-inputwrapper-filled]': 'filled()',
        '[class.p-inputwrapper-focus]': 'focused'
    },
    providers: [Password_VALUE_ACCESSOR],
    styleUrls: ['./password.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class Password implements AfterContentInit,OnInit {

    @Input() disabled: boolean;

    @Input() promptLabel: string;

    @Input() mediumRegex: string = '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})';

    @Input() strongRegex: string = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})';

    @Input() weakLabel: string;

    @Input() mediumLabel: string;

    @Input() strongLabel: string;

    @Input() inputId: string;

    @Input() feedback: boolean = true;

    @Input() appendTo: any;

    @Input() toggleMask: boolean;

    @Input() inputStyleClass: string;

    @Input() styleClass: string;

    @Input() style: any;

    @Input() inputStyle: any;

    @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';

    @Input() hideTransitionOptions: string = '.1s linear';

    @Input() placeholder: string;

    @ViewChild('input') input: ElementRef;

    @Output() onFocus: EventEmitter<any> = new EventEmitter();

    @Output() onBlur: EventEmitter<any> = new EventEmitter();

    contentTemplate: TemplateRef<any>;

    footerTemplate: TemplateRef<any>;

    headerTemplate: TemplateRef<any>;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    overlayVisible: boolean = false;

    meter: any;

    infoText: string;

    focused: boolean = false;

    unmasked: boolean = false;

    mediumCheckRegExp: any;

    strongCheckRegExp: any;

    resizeListener: any;

    outsideClickListener: any;

    scrollHandler: any;

    overlay: any;

    value: string = null;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    translationSubscription: Subscription;

    constructor(private cd: ChangeDetectorRef, private config: PrimeNGConfig, public el: ElementRef, public overlayService: OverlayService) {}

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                break;

                case 'header':
                    this.headerTemplate = item.template;
                break;

                case 'footer':
                    this.footerTemplate = item.template;
                break;

                default:
                    this.contentTemplate = item.template;
                break;
            }
        });
    }

    ngOnInit() {
        this.infoText = this.promptText();
        this.mediumCheckRegExp = new RegExp(this.mediumRegex);
        this.strongCheckRegExp = new RegExp(this.strongRegex);
        this.translationSubscription = this.config.translationObserver.subscribe(() => {
            this.updateUI(this.value || "");
        });
    }

    onAnimationStart(event) {
        switch(event.toState) {
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

    onAnimationEnd(event) {
        switch(event.toState) {
            case 'void':
                ZIndexUtils.clear(event.element);
            break;
        }
    }

    appendContainer() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.overlay);
            else
                document.getElementById(this.appendTo).appendChild(this.overlay);
        }
    }

    alignOverlay() {
        if (this.appendTo) {
            this.overlay.style.minWidth = DomHandler.getOuterWidth(this.input.nativeElement) + 'px';
            DomHandler.absolutePosition(this.overlay, this.input.nativeElement);
        }
        else {
            DomHandler.relativePosition(this.overlay, this.input.nativeElement);
        }
    }

    onInput(event)  {
        this.value = event.target.value;
        this.onModelChange(this.value);
        this.onModelTouched();
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

        this.onBlur.emit(event);
    }

    onKeyUp(event) {
        if (this.feedback) {
            let value = event.target.value;
            this.updateUI(value);

            if (!this.overlayVisible) {
                this.overlayVisible = true;
            }
        }
    }

    updateUI(value) {
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

    onOverlayClick(event) {
        this.overlayService.add({
            originalEvent: event,
            target: this.el.nativeElement
        });
    }

    testStrength(str) {
        let level = 0;

        if (this.strongCheckRegExp.test(str))
            level = 3;
        else if (this.mediumCheckRegExp.test(str))
            level = 2;
        else if (str.length)
            level = 1;

        return level;
    }

    writeValue(value: any) : void {
        if (value === undefined)
            this.value = null;
        else
            this.value = value;

        if (this.feedback)
            this.updateUI(this.value || "");

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
    }

    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.input.nativeElement, () => {
                if (this.overlayVisible) {
                    this.overlayVisible = false;
                }
            });
        }

        this.scrollHandler.bindScrollListener();
    }

    bindResizeListener() {
        if (!this.resizeListener) {
            this.resizeListener = () => {
                if (this.overlayVisible) {
                    this.overlayVisible = false;
                }
            };
            window.addEventListener('resize', this.resizeListener);
        }
    }

    unbindScrollListener() {
        if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
        }
    }

    unbindResizeListener() {
        if (this.resizeListener) {
            window.removeEventListener('resize', this.resizeListener);
            this.resizeListener = null;
        }
    }

    unbindOutsideClickListener() {
        if (this.outsideClickListener) {
            document.removeEventListener('click', this.outsideClickListener);
            this.outsideClickListener = null;
        }
    }

    containerClass() {
        return {'p-password p-component p-inputwrapper': true,
            'p-input-icon-right': this.toggleMask
        };
    }

    inputFieldClass() {
        return {'p-password-input' : true,
                'p-disabled': this.disabled
        };
    }

    toggleIconClass() {
        return this.unmasked ? 'pi pi-eye-slash' : 'pi pi-eye';
    }

    strengthClass() {
        return `p-password-strength ${this.meter ? this.meter.strength : ''}`;
    }

    filled() {
        return (this.value != null && this.value.toString().length > 0)
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
            if (this.appendTo === 'body')
                document.body.removeChild(this.overlay);
            else
                document.getElementById(this.appendTo).removeChild(this.overlay);
        }
    }

    inputType() {
        return this.unmasked ? 'text' : 'password';
    }

    getTranslation(option: string) {
        return this.config.getTranslation(option);
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
    }
}

@NgModule({
    imports: [CommonModule, InputTextModule],
    exports: [PasswordDirective, Password, SharedModule],
    declarations: [PasswordDirective, Password]
})
export class PasswordModule { }
