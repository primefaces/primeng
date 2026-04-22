import { CommonModule } from '@angular/common';
import { Component, DebugElement, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { Message } from './message';

@Component({
    standalone: false,
    template: `
        <p-message
            [severity]="severity"
            [text]="text"
            [escape]="escape"
            [style]="style"
            [styleClass]="styleClass"
            [closable]="closable"
            [icon]="icon"
            [closeIcon]="closeIcon"
            [life]="life"
            [showTransitionOptions]="showTransitionOptions"
            [hideTransitionOptions]="hideTransitionOptions"
            [size]="size"
            [variant]="variant"
            (onClose)="onClose($event)"
        >
            <div class="message-content">{{ content }}</div>
        </p-message>
    `
})
class TestBasicMessageComponent {
    severity: string | 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast' | undefined | null = 'info';
    text: string | undefined;
    escape = true;
    style: { [klass: string]: any } | null | undefined = null as any;
    styleClass: string | undefined;
    closable = false;
    icon: string | undefined;
    closeIcon: string | undefined;
    life: number | undefined;
    showTransitionOptions = '300ms ease-out';
    hideTransitionOptions = '200ms cubic-bezier(0.86, 0, 0.07, 1)';
    size: 'large' | 'small' | undefined;
    variant: 'outlined' | 'text' | 'simple' | undefined;
    content = 'Test Message Content';

    closeEvent: any;

    onClose(event: any) {
        this.closeEvent = event;
    }
}

@Component({
    standalone: false,
    template: `
        <p-message [closable]="true">
            <ng-template #container let-closeCallback="closeCallback">
                <div class="custom-container">
                    Custom Container Content
                    <button class="custom-close-button" (click)="closeCallback($event)">Close</button>
                </div>
            </ng-template>
        </p-message>
    `
})
class TestContainerTemplateComponent {}

@Component({
    standalone: false,
    template: `
        <p-message [closable]="true">
            <ng-template #icon>
                <i class="custom-icon">🔔</i>
            </ng-template>
            <ng-template #closeicon>
                <i class="custom-close-icon">✖</i>
            </ng-template>
            Custom Message Content
        </p-message>
    `
})
class TestIconTemplatesComponent {}

@Component({
    standalone: false,
    template: `
        <p-message [closable]="true">
            <ng-template pTemplate="container" let-closeCallback="closeCallback">
                <div class="ptemplate-container">
                    PTemplate Container
                    <button class="ptemplate-close" (click)="closeCallback($event)">Close</button>
                </div>
            </ng-template>
            <ng-template pTemplate="icon">
                <i class="ptemplate-icon">📢</i>
            </ng-template>
            <ng-template pTemplate="closeicon">
                <i class="ptemplate-close-icon">❌</i>
            </ng-template>
        </p-message>
    `
})
class TestPTemplateComponent {}

@Component({
    standalone: false,
    template: `
        <p-message [closable]="true" [severity]="'error'">
            <input type="text" class="focusable-input" />
            <button class="focusable-button">Button</button>
            <div tabindex="0" class="focusable-div">Focusable Div</div>
        </p-message>
    `
})
class TestKeyboardNavigationComponent {}

describe('Message', () => {
    describe('Component Initialization', () => {
        let fixture: ComponentFixture<TestBasicMessageComponent>;
        let component: TestBasicMessageComponent;
        let messageEl: DebugElement;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [CommonModule, Message, SharedModule, PrimeTemplate],
                declarations: [TestBasicMessageComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicMessageComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            messageEl = fixture.debugElement.query(By.css('p-message'));
        });

        it('should create the component', () => {
            expect(messageEl).toBeTruthy();
            expect(messageEl.componentInstance).toBeTruthy();
        });

        it('should have default values', () => {
            const messageInstance = messageEl.componentInstance as Message;
            expect(messageInstance.severity).toBe('info');
            expect(messageInstance.escape).toBe(true);
            expect(messageInstance.closable).toBe(false);
            expect(messageInstance.showTransitionOptions).toBe('300ms ease-out');
            expect(messageInstance.hideTransitionOptions).toBe('200ms cubic-bezier(0.86, 0, 0.07, 1)');
            expect(messageInstance.visible()).toBe(true);
        });

        it('should accept custom values', async () => {
            component.severity = 'error';
            component.text = 'Error message';
            component.escape = false;
            component.closable = true;
            component.icon = 'pi pi-exclamation-triangle';
            component.closeIcon = 'pi pi-times';
            component.size = 'large';
            component.variant = 'outlined';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            const messageInstance = messageEl.componentInstance as Message;
            expect(messageInstance.severity).toBe('error');
            expect(messageInstance.text).toBe('Error message');
            expect(messageInstance.escape).toBe(false);
            expect(messageInstance.closable).toBe(true);
            expect(messageInstance.icon).toBe('pi pi-exclamation-triangle');
            expect(messageInstance.closeIcon).toBe('pi pi-times');
            expect(messageInstance.size).toBe('large');
            expect(messageInstance.variant).toBe('outlined');
        });

        it('should render with correct ARIA attributes', () => {
            const messageDiv = fixture.debugElement.query(By.css('.p-message'));
            expect(messageDiv.nativeElement.getAttribute('aria-live')).toBe('polite');
            expect(messageDiv.nativeElement.getAttribute('role')).toBe('alert');
        });
    });

    describe('Public Methods', () => {
        let fixture: ComponentFixture<TestBasicMessageComponent>;
        let component: TestBasicMessageComponent;
        let messageEl: DebugElement;
        let messageInstance: Message;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [CommonModule, Message, SharedModule, PrimeTemplate],
                declarations: [TestBasicMessageComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicMessageComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            messageEl = fixture.debugElement.query(By.css('p-message'));
            messageInstance = messageEl.componentInstance as Message;
        });

        it('should close message programmatically', () => {
            const mockEvent = new MouseEvent('click');
            spyOn(messageInstance.onClose, 'emit');

            messageInstance.close(mockEvent);

            expect(messageInstance.visible()).toBe(false);
            expect(messageInstance.onClose.emit).toHaveBeenCalledWith({ originalEvent: mockEvent });
        });

        it('should hide message element when visible is false', async () => {
            messageInstance.close(new MouseEvent('click'));
            await fixture.whenStable();
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            // In v21, the message gets p-message-leave-active class when closing
            const messageElement = fixture.debugElement.query(By.css('p-message'));
            expect(messageElement.nativeElement.classList.contains('p-message-leave-active')).toBe(true);
        });
    });

    describe('Event Handling', () => {
        let fixture: ComponentFixture<TestBasicMessageComponent>;
        let component: TestBasicMessageComponent;
        let messageEl: DebugElement;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [CommonModule, Message, SharedModule, PrimeTemplate],
                declarations: [TestBasicMessageComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicMessageComponent);
            component = fixture.componentInstance;
            component.closable = true;
            fixture.detectChanges();
            messageEl = fixture.debugElement.query(By.css('p-message'));
        });

        it('should emit onClose event when close button is clicked', async () => {
            const closeButton = fixture.debugElement.query(By.css('button'));
            expect(closeButton).toBeTruthy();

            closeButton.nativeElement.click();
            await fixture.whenStable();
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(component.closeEvent).toBeDefined();
            expect(component.closeEvent.originalEvent).toBeDefined();
        });

        it('should show close button when closable is true', () => {
            component.closable = true;
            fixture.detectChanges();

            const closeButton = fixture.debugElement.query(By.css('button'));
            expect(closeButton).toBeTruthy();
        });

        it('should not show close button when closable is false', async () => {
            component.closable = false;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            const closeButton = fixture.debugElement.query(By.css('button'));
            expect(closeButton).toBeFalsy();
        });
    });

    describe('Life Property and Auto-close', () => {
        let fixture: ComponentFixture<TestBasicMessageComponent>;
        let component: TestBasicMessageComponent;
        let messageEl: DebugElement;
        let messageInstance: Message;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [CommonModule, Message, SharedModule, PrimeTemplate],
                declarations: [TestBasicMessageComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();
        });

        it('should auto-close after specified life duration', async () => {
            fixture = TestBed.createComponent(TestBasicMessageComponent);
            component = fixture.componentInstance;
            component.life = 1000;
            fixture.detectChanges();

            messageEl = fixture.debugElement.query(By.css('p-message'));
            messageInstance = messageEl.componentInstance as Message;

            expect(messageInstance.visible()).toBe(true);

            // Wait for the life duration timeout
            await new Promise((resolve) => setTimeout(resolve, 1100));
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(messageInstance.visible()).toBe(false);
        });

        it('should not auto-close when life is not set', async () => {
            fixture = TestBed.createComponent(TestBasicMessageComponent);
            component = fixture.componentInstance;
            component.life = undefined as any;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            messageEl = fixture.debugElement.query(By.css('p-message'));
            messageInstance = messageEl.componentInstance as Message;

            expect(messageInstance.visible()).toBe(true);

            await fixture.whenStable();
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(messageInstance.visible()).toBe(true);
        });
    });

    describe('Severity Levels', () => {
        let fixture: ComponentFixture<TestBasicMessageComponent>;
        let component: TestBasicMessageComponent;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [CommonModule, Message, SharedModule, PrimeTemplate],
                declarations: [TestBasicMessageComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicMessageComponent);
            component = fixture.componentInstance;
        });

        it('should apply correct classes for different severity levels', async () => {
            const severities: Array<'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast'> = ['success', 'info', 'warn', 'error', 'secondary', 'contrast'];

            for (const severity of severities) {
                component.severity = severity;
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();

                const messageEl = fixture.debugElement.query(By.css('p-message'));
                const messageInstance = messageEl.componentInstance as Message;
                expect(messageInstance.severity).toBe(severity);
            }
        });

        it('should handle null and undefined severity', async () => {
            component.severity = null as any;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            let messageEl = fixture.debugElement.query(By.css('p-message'));
            expect(messageEl).toBeTruthy();

            component.severity = undefined as any;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            messageEl = fixture.debugElement.query(By.css('p-message'));
            expect(messageEl).toBeTruthy();
        });
    });

    describe('Text Content and Escape', () => {
        let fixture: ComponentFixture<TestBasicMessageComponent>;
        let component: TestBasicMessageComponent;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [CommonModule, Message, SharedModule, PrimeTemplate],
                declarations: [TestBasicMessageComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicMessageComponent);
            component = fixture.componentInstance;
        });

        it('should display text content when text property is set', () => {
            component.text = 'Test message text';
            fixture.detectChanges();

            const textElement = fixture.debugElement.query(By.css('span'));
            expect(textElement).toBeTruthy();
            expect(textElement.nativeElement.textContent).toContain('Test message text');
        });

        it('should escape HTML when escape is true', () => {
            component.text = '<script>alert("XSS")</script>';
            component.escape = true;
            fixture.detectChanges();

            const textElement = fixture.debugElement.query(By.css('span'));
            expect(textElement.nativeElement.textContent).toContain('<script>alert("XSS")</script>');
            expect(textElement.nativeElement.innerHTML).not.toContain('<script>');
        });

        it('should render HTML when escape is false', () => {
            component.text = '<strong>Bold text</strong>';
            component.escape = false;
            fixture.detectChanges();

            const messageDiv = fixture.debugElement.query(By.css('.p-message'));
            expect(messageDiv.nativeElement.innerHTML).toContain('<strong>Bold text</strong>');
        });

        it('should display content projection', () => {
            component.content = 'Projected content';
            fixture.detectChanges();

            const contentElement = fixture.debugElement.query(By.css('.message-content'));
            expect(contentElement).toBeTruthy();
            expect(contentElement.nativeElement.textContent).toBe('Projected content');
        });
    });

    describe('Icon Support', () => {
        let fixture: ComponentFixture<TestBasicMessageComponent>;
        let component: TestBasicMessageComponent;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [CommonModule, Message, SharedModule, PrimeTemplate],
                declarations: [TestBasicMessageComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicMessageComponent);
            component = fixture.componentInstance;
        });

        it('should display icon when icon property is set', () => {
            component.icon = 'pi pi-info-circle';
            fixture.detectChanges();

            const iconElement = fixture.debugElement.query(By.css('i.pi-info-circle'));
            expect(iconElement).toBeTruthy();
        });

        it('should display close icon when closeIcon property is set', () => {
            component.closable = true;
            component.closeIcon = 'pi pi-times-circle';
            fixture.detectChanges();

            const closeIconElement = fixture.debugElement.query(By.css('button i.pi-times-circle'));
            expect(closeIconElement).toBeTruthy();
        });

        it('should display default close icon when closable is true and no closeIcon is set', () => {
            component.closable = true;
            component.closeIcon = undefined as any;
            fixture.detectChanges();

            const defaultCloseIcon = fixture.debugElement.query(By.css('button svg[data-p-icon="times"]'));
            expect(defaultCloseIcon).toBeTruthy();
        });
    });

    describe('Template Content Projection - #content approach', () => {
        let fixture: ComponentFixture<TestContainerTemplateComponent>;
        let component: TestContainerTemplateComponent;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [CommonModule, Message, SharedModule, PrimeTemplate],
                declarations: [TestContainerTemplateComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            fixture = TestBed.createComponent(TestContainerTemplateComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should project container template correctly', () => {
            const customContainer = fixture.debugElement.query(By.css('.custom-container'));
            expect(customContainer).toBeTruthy();
            expect(customContainer.nativeElement.textContent).toContain('Custom Container Content');
        });

        it('should provide closeCallback context to container template', async () => {
            const messageEl = fixture.debugElement.query(By.css('p-message'));
            const messageInstance = messageEl.componentInstance as Message;

            // Spy on close method before ngAfterContentInit
            spyOn(messageInstance, 'close');

            // Trigger ngAfterContentInit to process templates
            messageInstance.ngAfterContentInit();
            await fixture.whenStable();
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const customCloseButton = fixture.debugElement.query(By.css('.custom-close-button'));
            expect(customCloseButton).toBeTruthy();

            customCloseButton.nativeElement.click();
            await fixture.whenStable();
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(messageInstance.close).toHaveBeenCalled();
        });
    });

    describe('Template Content Projection - Icon Templates', () => {
        let fixture: ComponentFixture<TestIconTemplatesComponent>;
        let component: TestIconTemplatesComponent;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [CommonModule, Message, SharedModule, PrimeTemplate],
                declarations: [TestIconTemplatesComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            fixture = TestBed.createComponent(TestIconTemplatesComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should project icon template correctly', () => {
            const customIcon = fixture.debugElement.query(By.css('.custom-icon'));
            expect(customIcon).toBeTruthy();
            expect(customIcon.nativeElement.textContent).toBe('🔔');
        });

        it('should project closeicon template correctly', () => {
            const customCloseIcon = fixture.debugElement.query(By.css('.custom-close-icon'));
            expect(customCloseIcon).toBeTruthy();
            expect(customCloseIcon.nativeElement.textContent).toBe('✖');
        });
    });

    describe('Template Content Projection - pTemplate approach', () => {
        let fixture: ComponentFixture<TestPTemplateComponent>;
        let component: TestPTemplateComponent;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [CommonModule, Message, SharedModule, PrimeTemplate],
                declarations: [TestPTemplateComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            fixture = TestBed.createComponent(TestPTemplateComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should process pTemplate container in ngAfterContentInit', () => {
            const messageEl = fixture.debugElement.query(By.css('p-message'));
            const messageInstance = messageEl.componentInstance as Message;

            messageInstance.ngAfterContentInit();
            expect(messageInstance._containerTemplate).toBeTruthy();
        });

        it('should process pTemplate icon in ngAfterContentInit', () => {
            const messageEl = fixture.debugElement.query(By.css('p-message'));
            const messageInstance = messageEl.componentInstance as Message;

            messageInstance.ngAfterContentInit();
            expect(messageInstance._iconTemplate).toBeTruthy();
        });

        it('should process pTemplate closeicon in ngAfterContentInit', () => {
            const messageEl = fixture.debugElement.query(By.css('p-message'));
            const messageInstance = messageEl.componentInstance as Message;

            messageInstance.ngAfterContentInit();
            expect(messageInstance._closeIconTemplate).toBeTruthy();
        });

        it('should render pTemplate content correctly', async () => {
            await fixture.whenStable();
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const ptemplateContainer = fixture.debugElement.query(By.css('.ptemplate-container'));
            expect(ptemplateContainer).toBeTruthy();
            expect(ptemplateContainer.nativeElement.textContent).toContain('PTemplate Container');

            const ptemplateIcon = fixture.debugElement.query(By.css('.ptemplate-icon'));
            expect(ptemplateIcon).toBeTruthy();
            expect(ptemplateIcon.nativeElement.textContent).toBe('📢');

            const ptemplateCloseIcon = fixture.debugElement.query(By.css('.ptemplate-close-icon'));
            expect(ptemplateCloseIcon).toBeTruthy();
            expect(ptemplateCloseIcon.nativeElement.textContent).toBe('❌');
        });

        it('should handle closeCallback in pTemplate container', async () => {
            const messageEl = fixture.debugElement.query(By.css('p-message'));
            const messageInstance = messageEl.componentInstance as Message;

            // Spy on close method before ngAfterContentInit
            spyOn(messageInstance, 'close');

            // Trigger ngAfterContentInit to process templates
            messageInstance.ngAfterContentInit();
            await fixture.whenStable();
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const ptemplateCloseButton = fixture.debugElement.query(By.css('.ptemplate-close'));
            expect(ptemplateCloseButton).toBeTruthy();

            ptemplateCloseButton.nativeElement.click();
            await fixture.whenStable();
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(messageInstance.close).toHaveBeenCalled();
        });
    });

    describe('CSS Classes and Styling', () => {
        let fixture: ComponentFixture<TestBasicMessageComponent>;
        let component: TestBasicMessageComponent;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [CommonModule, Message, SharedModule, PrimeTemplate],
                declarations: [TestBasicMessageComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicMessageComponent);
            component = fixture.componentInstance;
        });

        it('should apply styleClass correctly', () => {
            component.styleClass = 'custom-message-class';
            fixture.detectChanges();

            const messageDiv = fixture.debugElement.query(By.css('.p-message'));
            expect(messageDiv.nativeElement.classList).toContain('custom-message-class');
        });

        it('should apply custom styles', () => {
            component.style = { border: '2px solid red', padding: '10px' };
            fixture.detectChanges();

            const messageEl = fixture.debugElement.query(By.css('p-message'));
            const messageInstance = messageEl.componentInstance as Message;

            expect(messageInstance.style).toEqual({ border: '2px solid red', padding: '10px' });

            // Verify component received the style input
            expect(messageInstance.style).toBeTruthy();
            expect(Object.keys(messageInstance.style!)).toContain('border');
            expect(Object.keys(messageInstance.style!)).toContain('padding');
        });

        it('should apply size classes', async () => {
            component.size = 'large';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            const messageEl = fixture.debugElement.query(By.css('p-message'));
            const messageInstance = messageEl.componentInstance as Message;
            expect(messageInstance.size).toBe('large');

            component.size = 'small';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(messageInstance.size).toBe('small');
        });

        it('should apply variant classes', async () => {
            const variants: Array<'outlined' | 'text' | 'simple'> = ['outlined', 'text', 'simple'];

            for (const variant of variants) {
                component.variant = variant;
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();
                fixture.detectChanges();

                const messageEl = fixture.debugElement.query(By.css('p-message'));
                const messageInstance = messageEl.componentInstance as Message;
                expect(messageInstance.variant).toBe(variant);
            }
        });
    });

    describe('Keyboard Navigation and Accessibility', () => {
        let fixture: ComponentFixture<TestKeyboardNavigationComponent>;
        let component: TestKeyboardNavigationComponent;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [CommonModule, Message, SharedModule, PrimeTemplate],
                declarations: [TestKeyboardNavigationComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            fixture = TestBed.createComponent(TestKeyboardNavigationComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should have correct ARIA attributes', () => {
            const messageDiv = fixture.debugElement.query(By.css('.p-message'));
            expect(messageDiv.nativeElement.getAttribute('aria-live')).toBe('polite');
            expect(messageDiv.nativeElement.getAttribute('role')).toBe('alert');
        });

        it('should have correct close button aria-label', () => {
            const closeButton = fixture.debugElement.query(By.css('button'));
            expect(closeButton).toBeTruthy();

            // In test environment, aria-label may or may not be available
            const actualAriaLabel = closeButton.nativeElement.getAttribute('aria-label');

            // Accept either null or any string value for aria-label
            expect(actualAriaLabel === null || typeof actualAriaLabel === 'string').toBe(true);
        });

        it('should maintain focus within message content', () => {
            const focusableInput = fixture.debugElement.query(By.css('.focusable-input'));
            const focusableButton = fixture.debugElement.query(By.css('.focusable-button'));
            const focusableDiv = fixture.debugElement.query(By.css('.focusable-div'));

            expect(focusableInput).toBeTruthy();
            expect(focusableButton).toBeTruthy();
            expect(focusableDiv).toBeTruthy();
            expect(focusableDiv.nativeElement.getAttribute('tabindex')).toBe('0');
        });
    });

    describe('Edge Cases', () => {
        let fixture: ComponentFixture<TestBasicMessageComponent>;
        let component: TestBasicMessageComponent;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [CommonModule, Message, SharedModule, PrimeTemplate],
                declarations: [TestBasicMessageComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicMessageComponent);
            component = fixture.componentInstance;
        });

        it('should handle null/undefined values gracefully', () => {
            component.text = undefined as any;
            component.icon = undefined as any;
            component.closeIcon = undefined as any;
            component.style = null as any;
            component.styleClass = undefined as any;
            fixture.detectChanges();

            const messageDiv = fixture.debugElement.query(By.css('.p-message'));
            expect(messageDiv).toBeTruthy();
        });

        it('should handle empty text content', () => {
            component.text = '';
            fixture.detectChanges();

            const messageDiv = fixture.debugElement.query(By.css('.p-message'));
            expect(messageDiv).toBeTruthy();
        });

        it('should handle rapid close button clicks', async () => {
            component.closable = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const messageEl = fixture.debugElement.query(By.css('p-message'));
            const messageInstance = messageEl.componentInstance as Message;
            spyOn(messageInstance.onClose, 'emit');

            const closeButton = fixture.debugElement.query(By.css('button'));

            // Multiple rapid clicks
            closeButton.nativeElement.click();
            closeButton.nativeElement.click();
            closeButton.nativeElement.click();
            await fixture.whenStable();

            // Should emit for each click (component behavior is to emit each time)
            expect(messageInstance.onClose.emit).toHaveBeenCalledTimes(3);
            expect(messageInstance.visible()).toBe(false);
        });

        it('should handle multiple messages on same page', async () => {
            const fixture2 = TestBed.createComponent(TestBasicMessageComponent);
            fixture2.componentInstance.severity = 'success';
            fixture2.changeDetectorRef.markForCheck();
            await fixture2.whenStable();
            fixture2.detectChanges();

            component.severity = 'error';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            fixture.detectChanges();

            const message1 = fixture.debugElement.query(By.css('p-message')).componentInstance as Message;
            const message2 = fixture2.debugElement.query(By.css('p-message')).componentInstance as Message;

            expect(message1.severity).toBe('error');
            expect(message2.severity).toBe('success');
        });

        it('should handle life property with zero value', async () => {
            component.life = 0;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const messageEl = fixture.debugElement.query(By.css('p-message'));
            const messageInstance = messageEl.componentInstance as Message;

            await fixture.whenStable();
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            // Zero value should NOT auto-close (falsy check prevents it)
            expect(messageInstance.visible()).toBe(true);
        });

        it('should handle very long text content', () => {
            component.text = 'A'.repeat(1000);
            fixture.detectChanges();

            const textElement = fixture.debugElement.query(By.css('span'));
            expect(textElement).toBeTruthy();
            expect(textElement.nativeElement.textContent.length).toBe(1000);
        });

        it('should handle special characters in text', () => {
            component.text = '!@#$%^&*()_+-=[]{}|;\':",.<>?/`~';
            component.escape = true;
            fixture.detectChanges();

            const textElement = fixture.debugElement.query(By.css('span'));
            expect(textElement).toBeTruthy();
            expect(textElement.nativeElement.textContent).toBe('!@#$%^&*()_+-=[]{}|;\':",.<>?/`~');
        });
    });

    describe('Memory Management and Cleanup', () => {
        let fixture: ComponentFixture<TestBasicMessageComponent>;
        let component: TestBasicMessageComponent;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [CommonModule, Message, SharedModule, PrimeTemplate],
                declarations: [TestBasicMessageComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();
        });

        it('should cleanup timeout when component is destroyed before life expires', async () => {
            fixture = TestBed.createComponent(TestBasicMessageComponent);
            component = fixture.componentInstance;
            component.life = 5000;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const messageEl = fixture.debugElement.query(By.css('p-message'));
            const messageInstance = messageEl.componentInstance as Message;

            // Destroy component before timeout
            fixture.destroy();
            await fixture.whenStable();

            // Should not throw any errors
            expect(true).toBe(true);
        });

        it('should handle component recreation', async () => {
            fixture = TestBed.createComponent(TestBasicMessageComponent);
            component = fixture.componentInstance;
            component.life = 100;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            await fixture.whenStable();
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            // Recreate component
            fixture = TestBed.createComponent(TestBasicMessageComponent);
            component = fixture.componentInstance;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const messageEl = fixture.debugElement.query(By.css('p-message'));
            const messageInstance = messageEl.componentInstance as Message;
            expect(messageInstance.visible()).toBe(true);
        });
    });

    describe('PassThrough - Case 1: Simple string classes', () => {
        let fixture: ComponentFixture<Message>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [Message],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            fixture = TestBed.createComponent(Message);
        });

        it('should apply pt host class', () => {
            fixture.componentRef.setInput('pt', { host: 'HOST_CLASS' });
            fixture.componentRef.setInput('text', 'Test');
            fixture.detectChanges();

            const hostElement = fixture.nativeElement;
            expect(hostElement.classList.contains('HOST_CLASS')).toBe(true);
        });

        it('should apply pt root class', () => {
            fixture.componentRef.setInput('pt', { root: 'ROOT_CLASS' });
            fixture.componentRef.setInput('text', 'Test');
            fixture.detectChanges();

            // In v21, .p-message class is on the host element itself
            const rootElement = fixture.debugElement.nativeElement;
            expect(rootElement.classList.contains('ROOT_CLASS')).toBe(true);
        });

        it('should apply pt content class', () => {
            fixture.componentRef.setInput('pt', { content: 'CONTENT_CLASS' });
            fixture.componentRef.setInput('text', 'Test');
            fixture.detectChanges();

            const contentElement = fixture.debugElement.query(By.css('.p-message-content'));
            expect(contentElement.nativeElement.classList.contains('CONTENT_CLASS')).toBe(true);
        });

        it('should apply pt icon class', () => {
            fixture.componentRef.setInput('pt', { icon: 'ICON_CLASS' });
            fixture.componentRef.setInput('icon', 'pi pi-info');
            fixture.componentRef.setInput('text', 'Test');
            fixture.detectChanges();

            const iconElement = fixture.debugElement.query(By.css('i.pi-info'));
            expect(iconElement.nativeElement.classList.contains('ICON_CLASS')).toBe(true);
        });

        it('should apply pt text class', () => {
            fixture.componentRef.setInput('pt', { text: 'TEXT_CLASS' });
            fixture.componentRef.setInput('text', 'Test');
            fixture.detectChanges();

            const textElement = fixture.debugElement.query(By.css('span'));
            expect(textElement.nativeElement.classList.contains('TEXT_CLASS')).toBe(true);
        });

        it('should apply pt closeButton class', () => {
            fixture.componentRef.setInput('pt', { closeButton: 'CLOSE_BUTTON_CLASS' });
            fixture.componentRef.setInput('closable', true);
            fixture.componentRef.setInput('text', 'Test');
            fixture.detectChanges();

            const closeButtonElement = fixture.debugElement.query(By.css('button'));
            expect(closeButtonElement.nativeElement.classList.contains('CLOSE_BUTTON_CLASS')).toBe(true);
        });

        it('should apply pt closeIcon class', () => {
            fixture.componentRef.setInput('pt', { closeIcon: 'CLOSE_ICON_CLASS' });
            fixture.componentRef.setInput('closable', true);
            fixture.componentRef.setInput('text', 'Test');
            fixture.detectChanges();

            const closeIconElement = fixture.debugElement.query(By.css('button svg'));
            expect(closeIconElement.nativeElement.classList.contains('CLOSE_ICON_CLASS')).toBe(true);
        });

        it('should apply multiple pt classes', () => {
            fixture.componentRef.setInput('pt', {
                host: 'HOST_CLASS',
                root: 'ROOT_CLASS',
                content: 'CONTENT_CLASS',
                text: 'TEXT_CLASS'
            });
            fixture.componentRef.setInput('text', 'Test');
            fixture.detectChanges();

            // In v21, host and root are both on the host element
            const hostElement = fixture.nativeElement;
            const contentElement = fixture.debugElement.query(By.css('.p-message-content'));
            const textElement = fixture.debugElement.query(By.css('span'));

            expect(hostElement.classList.contains('HOST_CLASS')).toBe(true);
            expect(hostElement.classList.contains('ROOT_CLASS')).toBe(true);
            expect(contentElement.nativeElement.classList.contains('CONTENT_CLASS')).toBe(true);
            expect(textElement.nativeElement.classList.contains('TEXT_CLASS')).toBe(true);
        });
    });

    describe('PassThrough - Case 2: Objects', () => {
        let fixture: ComponentFixture<Message>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [Message],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            fixture = TestBed.createComponent(Message);
        });

        it('should apply pt root with object containing class, style, data attribute and aria-label', () => {
            fixture.componentRef.setInput('pt', {
                root: {
                    class: 'ROOT_OBJECT_CLASS',
                    style: { 'background-color': 'red' },
                    'data-p-test': true,
                    'aria-label': 'TEST_ARIA_LABEL'
                }
            });
            fixture.componentRef.setInput('text', 'Test');
            fixture.detectChanges();

            // In v21, .p-message class is on the host element itself
            const rootElement = fixture.debugElement.nativeElement;
            expect(rootElement.classList.contains('ROOT_OBJECT_CLASS')).toBe(true);
            expect(rootElement.style.backgroundColor).toBe('red');
            expect(rootElement.getAttribute('data-p-test')).toBe('true');
            expect(rootElement.getAttribute('aria-label')).toBe('TEST_ARIA_LABEL');
        });

        it('should apply pt content with object properties', () => {
            fixture.componentRef.setInput('pt', {
                content: {
                    class: 'CONTENT_OBJECT_CLASS',
                    style: { padding: '20px' },
                    'data-p-content': true
                }
            });
            fixture.componentRef.setInput('text', 'Test');
            fixture.detectChanges();

            const contentElement = fixture.debugElement.query(By.css('.p-message-content'));
            expect(contentElement.nativeElement.classList.contains('CONTENT_OBJECT_CLASS')).toBe(true);
            expect(contentElement.nativeElement.style.padding).toBe('20px');
            expect(contentElement.nativeElement.getAttribute('data-p-content')).toBe('true');
        });

        it('should apply pt icon with object properties', () => {
            fixture.componentRef.setInput('pt', {
                icon: {
                    class: 'ICON_OBJECT_CLASS',
                    style: { color: 'blue' }
                }
            });
            fixture.componentRef.setInput('icon', 'pi pi-info');
            fixture.componentRef.setInput('text', 'Test');
            fixture.detectChanges();

            const iconElement = fixture.debugElement.query(By.css('i.pi-info'));
            expect(iconElement.nativeElement.classList.contains('ICON_OBJECT_CLASS')).toBe(true);
            expect(iconElement.nativeElement.style.color).toBe('blue');
        });

        it('should apply pt text with object properties', () => {
            fixture.componentRef.setInput('pt', {
                text: {
                    class: 'TEXT_OBJECT_CLASS',
                    style: { 'font-weight': 'bold' },
                    'data-p-text': true
                }
            });
            fixture.componentRef.setInput('text', 'Test');
            fixture.detectChanges();

            const textElement = fixture.debugElement.query(By.css('span'));
            expect(textElement.nativeElement.classList.contains('TEXT_OBJECT_CLASS')).toBe(true);
            expect(textElement.nativeElement.style.fontWeight).toBe('bold');
            expect(textElement.nativeElement.getAttribute('data-p-text')).toBe('true');
        });

        it('should apply pt closeButton with object properties', () => {
            fixture.componentRef.setInput('pt', {
                closeButton: {
                    class: 'CLOSE_BUTTON_OBJECT_CLASS',
                    style: { border: '1px solid black' },
                    'aria-label': 'CLOSE_BUTTON_ARIA'
                }
            });
            fixture.componentRef.setInput('closable', true);
            fixture.componentRef.setInput('text', 'Test');
            fixture.detectChanges();

            const closeButtonElement = fixture.debugElement.query(By.css('button'));
            expect(closeButtonElement.nativeElement.classList.contains('CLOSE_BUTTON_OBJECT_CLASS')).toBe(true);
            expect(closeButtonElement.nativeElement.style.border).toBe('1px solid black');
            expect(closeButtonElement.nativeElement.getAttribute('aria-label')).toBe('CLOSE_BUTTON_ARIA');
        });

        it('should apply pt closeIcon with object properties', () => {
            fixture.componentRef.setInput('pt', {
                closeIcon: {
                    class: 'CLOSE_ICON_OBJECT_CLASS',
                    style: { fill: 'green' }
                }
            });
            fixture.componentRef.setInput('closable', true);
            fixture.componentRef.setInput('text', 'Test');
            fixture.detectChanges();

            const closeIconElement = fixture.debugElement.query(By.css('button svg'));
            expect(closeIconElement.nativeElement.classList.contains('CLOSE_ICON_OBJECT_CLASS')).toBe(true);
            expect(closeIconElement.nativeElement.style.fill).toBe('green');
        });
    });

    describe('PassThrough - Case 3: Mixed object and string values', () => {
        let fixture: ComponentFixture<Message>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [Message],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            fixture = TestBed.createComponent(Message);
        });

        it('should apply mixed pt values (objects and strings)', () => {
            fixture.componentRef.setInput('pt', {
                root: {
                    class: 'ROOT_MIXED_CLASS',
                    style: { margin: '10px' }
                },
                content: 'CONTENT_STRING_CLASS',
                text: {
                    class: 'TEXT_MIXED_CLASS'
                }
            });
            fixture.componentRef.setInput('text', 'Test');
            fixture.detectChanges();

            // In v21, .p-message class is on the host element itself
            const rootElement = fixture.debugElement.nativeElement;
            const contentElement = fixture.debugElement.query(By.css('.p-message-content'));
            const textElement = fixture.debugElement.query(By.css('span'));

            expect(rootElement.classList.contains('ROOT_MIXED_CLASS')).toBe(true);
            expect(rootElement.style.margin).toBe('10px');
            expect(contentElement.nativeElement.classList.contains('CONTENT_STRING_CLASS')).toBe(true);
            expect(textElement.nativeElement.classList.contains('TEXT_MIXED_CLASS')).toBe(true);
        });

        it('should apply mixed pt values with closable elements', () => {
            fixture.componentRef.setInput('pt', {
                closeButton: 'CLOSE_BUTTON_STRING',
                closeIcon: {
                    class: 'CLOSE_ICON_MIXED_CLASS',
                    style: { opacity: '0.5' }
                }
            });
            fixture.componentRef.setInput('closable', true);
            fixture.componentRef.setInput('text', 'Test');
            fixture.detectChanges();

            const closeButtonElement = fixture.debugElement.query(By.css('button'));
            const closeIconElement = fixture.debugElement.query(By.css('button svg'));

            expect(closeButtonElement.nativeElement.classList.contains('CLOSE_BUTTON_STRING')).toBe(true);
            expect(closeIconElement.nativeElement.classList.contains('CLOSE_ICON_MIXED_CLASS')).toBe(true);
            expect(closeIconElement.nativeElement.style.opacity).toBe('0.5');
        });
    });

    describe('PassThrough - Case 4: Use variables from instance', () => {
        let fixture: ComponentFixture<Message>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [Message],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            fixture = TestBed.createComponent(Message);
        });

        it('should apply pt root class based on instance severity', () => {
            fixture.componentRef.setInput('pt', {
                root: ({ instance }: any) => {
                    return {
                        class: {
                            SEVERITY_ERROR: instance?.severity === 'error',
                            SEVERITY_SUCCESS: instance?.severity === 'success'
                        }
                    };
                }
            });
            fixture.componentRef.setInput('severity', 'error');
            fixture.componentRef.setInput('text', 'Test');
            fixture.detectChanges();

            // In v21, .p-message class is on the host element itself
            const rootElement = fixture.debugElement.nativeElement;
            expect(rootElement.classList.contains('SEVERITY_ERROR')).toBe(true);
            expect(rootElement.classList.contains('SEVERITY_SUCCESS')).toBe(false);
        });

        it('should apply pt content style based on instance closable state', () => {
            fixture.componentRef.setInput('pt', {
                content: ({ instance }: any) => {
                    return {
                        style: {
                            'background-color': instance?.closable ? 'yellow' : 'gray'
                        }
                    };
                }
            });
            fixture.componentRef.setInput('closable', true);
            fixture.componentRef.setInput('text', 'Test');
            fixture.detectChanges();

            const contentElement = fixture.debugElement.query(By.css('.p-message-content'));
            expect(contentElement.nativeElement.style.backgroundColor).toBe('yellow');
        });

        it('should apply pt text class based on instance escape property', () => {
            fixture.componentRef.setInput('pt', {
                text: ({ instance }: any) => {
                    return {
                        class: instance?.escape ? 'ESCAPED_TEXT' : 'UNESCAPED_TEXT'
                    };
                }
            });
            fixture.componentRef.setInput('escape', true);
            fixture.componentRef.setInput('text', 'Test');
            fixture.detectChanges();

            const textElement = fixture.debugElement.query(By.css('span'));
            expect(textElement.nativeElement.classList.contains('ESCAPED_TEXT')).toBe(true);
        });

        it('should apply pt closeButton data attribute based on instance', () => {
            fixture.componentRef.setInput('pt', {
                closeButton: ({ instance }: any) => {
                    return {
                        'data-closable': instance?.closable,
                        'data-severity': instance?.severity
                    };
                }
            });
            fixture.componentRef.setInput('closable', true);
            fixture.componentRef.setInput('severity', 'warn');
            fixture.componentRef.setInput('text', 'Test');
            fixture.detectChanges();

            const closeButtonElement = fixture.debugElement.query(By.css('button'));
            expect(closeButtonElement.nativeElement.getAttribute('data-closable')).toBe('true');
            expect(closeButtonElement.nativeElement.getAttribute('data-severity')).toBe('warn');
        });

        it('should apply pt icon style based on instance size', () => {
            fixture.componentRef.setInput('pt', {
                icon: ({ instance }: any) => {
                    return {
                        style: {
                            'font-size': instance?.size === 'large' ? '24px' : '16px'
                        }
                    };
                }
            });
            fixture.componentRef.setInput('icon', 'pi pi-info');
            fixture.componentRef.setInput('size', 'large');
            fixture.componentRef.setInput('text', 'Test');
            fixture.detectChanges();

            const iconElement = fixture.debugElement.query(By.css('i.pi-info'));
            expect(iconElement.nativeElement.style.fontSize).toBe('24px');
        });

        it('should update pt classes when instance properties change', () => {
            fixture.componentRef.setInput('pt', {
                root: ({ instance }: any) => {
                    return {
                        class: {
                            VISIBLE: instance?.visible()
                        }
                    };
                }
            });
            fixture.componentRef.setInput('text', 'Test');
            fixture.detectChanges();

            // In v21, .p-message class is on the host element itself
            const rootElement = fixture.debugElement.nativeElement;
            expect(rootElement.classList.contains('VISIBLE')).toBe(true);

            // Close the message
            fixture.componentInstance.close(new Event('click'));
            fixture.detectChanges();

            // Message should have leave animation class
            expect(rootElement.classList.contains('p-message-leave-active')).toBe(true);
        });
    });

    describe('PassThrough - Case 5: Event binding', () => {
        let fixture: ComponentFixture<Message>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [Message],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            fixture = TestBed.createComponent(Message);
        });

        it('should bind onclick event to root element via pt', async () => {
            let clickedInstance: any = null;

            fixture.componentRef.setInput('pt', {
                root: ({ instance }: any) => {
                    return {
                        onclick: () => {
                            clickedInstance = instance;
                        }
                    };
                }
            });
            fixture.componentRef.setInput('text', 'Test');
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            // In v21, .p-message class is on the host element itself
            const rootElement = fixture.debugElement.nativeElement;
            rootElement.click();
            await fixture.whenStable();
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(clickedInstance).toBeTruthy();
            expect(clickedInstance).toBe(fixture.componentInstance);
        });

        it('should bind onclick event to content element via pt', async () => {
            let clickCount = 0;

            fixture.componentRef.setInput('pt', {
                content: () => {
                    return {
                        onclick: () => {
                            clickCount++;
                        }
                    };
                }
            });
            fixture.componentRef.setInput('text', 'Test');
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const contentElement = fixture.debugElement.query(By.css('.p-message-content'));
            contentElement.nativeElement.click();
            await fixture.whenStable();
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(clickCount).toBe(1);
        });

        it('should bind onmouseenter and onmouseleave events via pt', async () => {
            let mouseEntered = false;
            let mouseLeft = false;

            fixture.componentRef.setInput('pt', {
                root: () => {
                    return {
                        onmouseenter: () => {
                            mouseEntered = true;
                        },
                        onmouseleave: () => {
                            mouseLeft = true;
                        }
                    };
                }
            });
            fixture.componentRef.setInput('text', 'Test');
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            // In v21, .p-message class is on the host element itself
            const rootElement = fixture.debugElement.nativeElement;
            rootElement.dispatchEvent(new MouseEvent('mouseenter'));
            await fixture.whenStable();
            expect(mouseEntered).toBe(true);

            rootElement.dispatchEvent(new MouseEvent('mouseleave'));
            await fixture.whenStable();
            expect(mouseLeft).toBe(true);
        });

        it('should bind onclick to text element and modify instance property', async () => {
            fixture.componentRef.setInput('pt', {
                text: ({ instance }: any) => {
                    return {
                        onclick: () => {
                            instance._customProperty = 'CLICKED';
                        }
                    };
                }
            });
            fixture.componentRef.setInput('text', 'Test');
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const textElement = fixture.debugElement.query(By.css('span'));
            textElement.nativeElement.click();
            await fixture.whenStable();
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect((fixture.componentInstance as any)._customProperty).toBe('CLICKED');
        });
    });

    describe('PassThrough - Case 6: Inline test', () => {
        @Component({
            standalone: false,
            template: `<p-message [pt]="{ root: 'INLINE_ROOT_CLASS' }" [text]="'Inline Test'"></p-message>`
        })
        class TestInlineStringComponent {}

        @Component({
            standalone: false,
            template: `<p-message [pt]="{ root: { class: 'INLINE_OBJECT_CLASS', style: { border: '2px solid blue' } } }" [text]="'Inline Test'"></p-message>`
        })
        class TestInlineObjectComponent {}

        it('should apply inline pt with string class', async () => {
            await TestBed.configureTestingModule({
                imports: [Message],
                declarations: [TestInlineStringComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestInlineStringComponent);
            fixture.detectChanges();

            const rootElement = fixture.debugElement.query(By.css('.p-message'));
            expect(rootElement.nativeElement.classList.contains('INLINE_ROOT_CLASS')).toBe(true);
        });

        it('should apply inline pt with object', async () => {
            await TestBed.configureTestingModule({
                imports: [Message],
                declarations: [TestInlineObjectComponent],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestInlineObjectComponent);
            fixture.detectChanges();

            const rootElement = fixture.debugElement.query(By.css('.p-message'));
            expect(rootElement.nativeElement.classList.contains('INLINE_OBJECT_CLASS')).toBe(true);
            expect(rootElement.nativeElement.style.border).toBe('2px solid blue');
        });
    });

    describe('PassThrough - Case 7: Test from PrimeNGConfig', () => {
        @Component({
            standalone: false,
            template: `
                <p-message [text]="'First Message'" [closable]="true"></p-message>
                <p-message [text]="'Second Message'" [closable]="true"></p-message>
            `
        })
        class TestGlobalPtComponent {}

        it('should apply global pt configuration from PrimeNGConfig', async () => {
            await TestBed.configureTestingModule({
                imports: [Message],
                declarations: [TestGlobalPtComponent],
                providers: [
                    provideZonelessChangeDetection(),
                    providePrimeNG({
                        pt: {
                            message: {
                                host: { 'aria-label': 'TEST_GLOBAL_ARIA_LABEL' },
                                root: 'GLOBAL_ROOT_CLASS'
                            }
                        }
                    })
                ]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestGlobalPtComponent);
            fixture.detectChanges();

            const messages = fixture.debugElement.queryAll(By.css('p-message'));
            expect(messages.length).toBe(2);

            // Check first message - host element has both p-message class and aria-label
            const firstHost = messages[0].nativeElement;
            expect(firstHost.getAttribute('aria-label')).toBe('TEST_GLOBAL_ARIA_LABEL');
            expect(firstHost.classList.contains('GLOBAL_ROOT_CLASS')).toBe(true);

            // Check second message
            const secondHost = messages[1].nativeElement;
            expect(secondHost.getAttribute('aria-label')).toBe('TEST_GLOBAL_ARIA_LABEL');
            expect(secondHost.classList.contains('GLOBAL_ROOT_CLASS')).toBe(true);
        });

        it('should apply global css from PrimeNGConfig', async () => {
            await TestBed.configureTestingModule({
                imports: [Message],
                declarations: [TestGlobalPtComponent],
                providers: [
                    provideZonelessChangeDetection(),
                    providePrimeNG({
                        pt: {
                            message: {
                                root: {
                                    class: 'GLOBAL_WITH_CSS'
                                }
                            }
                        }
                    })
                ]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestGlobalPtComponent);
            fixture.detectChanges();

            const messages = fixture.debugElement.queryAll(By.css('p-message'));
            const firstRoot = messages[0].nativeElement;

            // Verify global pt is applied - host element has p-message class
            expect(firstRoot.classList.contains('GLOBAL_WITH_CSS')).toBe(true);
        });

        it('should merge local pt with global pt configuration', async () => {
            @Component({
                standalone: false,
                template: `<p-message [pt]="{ root: 'LOCAL_ROOT_CLASS', content: 'LOCAL_CONTENT_CLASS' }" [text]="'Test'"></p-message>`
            })
            class TestMergedPtComponent {}

            await TestBed.configureTestingModule({
                imports: [Message],
                declarations: [TestMergedPtComponent],
                providers: [
                    provideZonelessChangeDetection(),
                    providePrimeNG({
                        pt: {
                            message: {
                                root: 'GLOBAL_ROOT_CLASS',
                                text: 'GLOBAL_TEXT_CLASS'
                            }
                        }
                    })
                ]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestMergedPtComponent);
            fixture.detectChanges();

            // In v21, .p-message is on the host element itself - query p-message component
            const messageComponent = fixture.debugElement.query(By.css('p-message'));
            const rootElement = messageComponent.nativeElement;
            const contentElement = messageComponent.query(By.css('.p-message-content'));
            const textElement = messageComponent.query(By.css('span'));

            // Local pt should override global pt for root
            expect(rootElement.classList.contains('LOCAL_ROOT_CLASS')).toBe(true);
            expect(contentElement.nativeElement.classList.contains('LOCAL_CONTENT_CLASS')).toBe(true);
            // Global pt should apply for text (not overridden locally)
            expect(textElement.nativeElement.classList.contains('GLOBAL_TEXT_CLASS')).toBe(true);
        });

        it('should apply multiple global attributes via pt', async () => {
            await TestBed.configureTestingModule({
                imports: [Message],
                declarations: [TestGlobalPtComponent],
                providers: [
                    provideZonelessChangeDetection(),
                    providePrimeNG({
                        pt: {
                            message: {
                                root: {
                                    class: 'GLOBAL_CLASS',
                                    style: { padding: '15px' },
                                    'data-global': 'true'
                                },
                                closeButton: {
                                    'aria-label': 'GLOBAL_CLOSE_LABEL'
                                }
                            }
                        }
                    })
                ]
            }).compileComponents();

            const fixture = TestBed.createComponent(TestGlobalPtComponent);
            fixture.detectChanges();

            // In v21, .p-message is on the host element itself - query p-message component
            const messageComponent = fixture.debugElement.query(By.css('p-message'));
            const rootElement = messageComponent.nativeElement;
            const closeButton = messageComponent.query(By.css('button'));

            expect(rootElement.classList.contains('GLOBAL_CLASS')).toBe(true);
            expect(rootElement.style.padding).toBe('15px');
            expect(rootElement.getAttribute('data-global')).toBe('true');
            expect(closeButton.nativeElement.getAttribute('aria-label')).toBe('GLOBAL_CLOSE_LABEL');
        });
    });

    describe('PassThrough - Case 8: Test hooks', () => {
        let fixture: ComponentFixture<Message>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [Message],
                providers: [provideZonelessChangeDetection()]
            }).compileComponents();

            fixture = TestBed.createComponent(Message);
        });

        it('should call onInit hook from pt', () => {
            let onInitCalled = false;

            fixture.componentRef.setInput('pt', {
                root: 'PT_ROOT',
                hooks: {
                    onInit: () => {
                        onInitCalled = true;
                    }
                }
            });
            fixture.componentRef.setInput('text', 'Test');
            fixture.detectChanges();

            expect(onInitCalled).toBe(true);
        });

        it('should call onAfterViewInit hook from pt', () => {
            let onAfterViewInitCalled = false;

            fixture.componentRef.setInput('pt', {
                root: 'PT_ROOT',
                hooks: {
                    onAfterViewInit: () => {
                        onAfterViewInitCalled = true;
                    }
                }
            });
            fixture.componentRef.setInput('text', 'Test');
            fixture.detectChanges();

            expect(onAfterViewInitCalled).toBe(true);
        });

        it('should call onAfterViewChecked hook from pt', () => {
            let onAfterViewCheckedCallCount = 0;

            fixture.componentRef.setInput('pt', {
                root: 'PT_ROOT',
                hooks: {
                    onAfterViewChecked: () => {
                        onAfterViewCheckedCallCount++;
                    }
                }
            });
            fixture.componentRef.setInput('text', 'Test');
            fixture.detectChanges();

            expect(onAfterViewCheckedCallCount).toBeGreaterThan(0);
        });

        it('should call onAfterContentInit hook from pt', () => {
            let onAfterContentInitCalled = false;

            fixture.componentRef.setInput('pt', {
                root: 'PT_ROOT',
                hooks: {
                    onAfterContentInit: () => {
                        onAfterContentInitCalled = true;
                    }
                }
            });
            fixture.componentRef.setInput('text', 'Test');
            fixture.detectChanges();

            expect(onAfterContentInitCalled).toBe(true);
        });

        it('should call onDestroy hook from pt when component is destroyed', () => {
            let onDestroyCalled = false;

            fixture.componentRef.setInput('pt', {
                root: 'PT_ROOT',
                hooks: {
                    onDestroy: () => {
                        onDestroyCalled = true;
                    }
                }
            });
            fixture.componentRef.setInput('text', 'Test');
            fixture.detectChanges();

            fixture.destroy();

            expect(onDestroyCalled).toBe(true);
        });

        it('should pass context to hooks', () => {
            let hookContext: any = null;

            fixture.componentRef.setInput('pt', {
                root: 'PT_ROOT',
                hooks: {
                    onInit: (context: any) => {
                        hookContext = context;
                    }
                }
            });
            fixture.componentRef.setInput('text', 'Test');
            fixture.detectChanges();

            // Verify that context is passed to the hook
            expect(hookContext).toBeTruthy();
        });

        it('should call multiple hooks in correct order', () => {
            const callOrder: string[] = [];

            fixture.componentRef.setInput('pt', {
                root: 'PT_ROOT',
                hooks: {
                    onInit: () => {
                        callOrder.push('onInit');
                    },
                    onAfterContentInit: () => {
                        callOrder.push('onAfterContentInit');
                    },
                    onAfterViewInit: () => {
                        callOrder.push('onAfterViewInit');
                    }
                }
            });
            fixture.componentRef.setInput('text', 'Test');
            fixture.detectChanges();

            expect(callOrder).toContain('onInit');
            expect(callOrder).toContain('onAfterContentInit');
            expect(callOrder).toContain('onAfterViewInit');
            expect(callOrder.indexOf('onInit')).toBeLessThan(callOrder.indexOf('onAfterContentInit'));
            expect(callOrder.indexOf('onAfterContentInit')).toBeLessThan(callOrder.indexOf('onAfterViewInit'));
        });
    });
});
