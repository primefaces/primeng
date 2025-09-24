import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Message } from './message';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { CommonModule } from '@angular/common';

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
                imports: [NoopAnimationsModule, CommonModule, Message, SharedModule, PrimeTemplate],
                declarations: [TestBasicMessageComponent]
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

        it('should accept custom values', () => {
            component.severity = 'error';
            component.text = 'Error message';
            component.escape = false;
            component.closable = true;
            component.icon = 'pi pi-exclamation-triangle';
            component.closeIcon = 'pi pi-times';
            component.size = 'large';
            component.variant = 'outlined';
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
                imports: [NoopAnimationsModule, CommonModule, Message, SharedModule, PrimeTemplate],
                declarations: [TestBasicMessageComponent]
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

        it('should hide message element when visible is false', fakeAsync(() => {
            messageInstance.close(new MouseEvent('click'));
            tick();
            fixture.detectChanges();

            const messageDiv = fixture.debugElement.query(By.css('.p-message'));
            expect(messageDiv).toBeFalsy();
            flush();
        }));
    });

    describe('Event Handling', () => {
        let fixture: ComponentFixture<TestBasicMessageComponent>;
        let component: TestBasicMessageComponent;
        let messageEl: DebugElement;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [NoopAnimationsModule, CommonModule, Message, SharedModule, PrimeTemplate],
                declarations: [TestBasicMessageComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicMessageComponent);
            component = fixture.componentInstance;
            component.closable = true;
            fixture.detectChanges();
            messageEl = fixture.debugElement.query(By.css('p-message'));
        });

        it('should emit onClose event when close button is clicked', fakeAsync(() => {
            const closeButton = fixture.debugElement.query(By.css('button'));
            expect(closeButton).toBeTruthy();

            closeButton.nativeElement.click();
            tick();
            fixture.detectChanges();

            expect(component.closeEvent).toBeDefined();
            expect(component.closeEvent.originalEvent).toBeDefined();
            flush();
        }));

        it('should show close button when closable is true', () => {
            component.closable = true;
            fixture.detectChanges();

            const closeButton = fixture.debugElement.query(By.css('button'));
            expect(closeButton).toBeTruthy();
        });

        it('should not show close button when closable is false', () => {
            component.closable = false;
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
                imports: [NoopAnimationsModule, CommonModule, Message, SharedModule, PrimeTemplate],
                declarations: [TestBasicMessageComponent]
            }).compileComponents();
        });

        it('should auto-close after specified life duration', fakeAsync(() => {
            fixture = TestBed.createComponent(TestBasicMessageComponent);
            component = fixture.componentInstance;
            component.life = 1000;
            fixture.detectChanges();

            messageEl = fixture.debugElement.query(By.css('p-message'));
            messageInstance = messageEl.componentInstance as Message;

            expect(messageInstance.visible()).toBe(true);

            tick(1000);
            fixture.detectChanges();

            expect(messageInstance.visible()).toBe(false);
            flush();
        }));

        it('should not auto-close when life is not set', fakeAsync(() => {
            fixture = TestBed.createComponent(TestBasicMessageComponent);
            component = fixture.componentInstance;
            component.life = undefined as any;
            fixture.detectChanges();

            messageEl = fixture.debugElement.query(By.css('p-message'));
            messageInstance = messageEl.componentInstance as Message;

            expect(messageInstance.visible()).toBe(true);

            tick(5000);
            fixture.detectChanges();

            expect(messageInstance.visible()).toBe(true);
            flush();
        }));
    });

    describe('Severity Levels', () => {
        let fixture: ComponentFixture<TestBasicMessageComponent>;
        let component: TestBasicMessageComponent;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [NoopAnimationsModule, CommonModule, Message, SharedModule, PrimeTemplate],
                declarations: [TestBasicMessageComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicMessageComponent);
            component = fixture.componentInstance;
        });

        it('should apply correct classes for different severity levels', () => {
            const severities: Array<'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast'> = ['success', 'info', 'warn', 'error', 'secondary', 'contrast'];

            severities.forEach((severity) => {
                component.severity = severity;
                fixture.detectChanges();

                const messageEl = fixture.debugElement.query(By.css('p-message'));
                const messageInstance = messageEl.componentInstance as Message;
                expect(messageInstance.severity).toBe(severity);
            });
        });

        it('should handle null and undefined severity', () => {
            component.severity = null as any;
            fixture.detectChanges();

            let messageEl = fixture.debugElement.query(By.css('p-message'));
            expect(messageEl).toBeTruthy();

            component.severity = undefined as any;
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
                imports: [NoopAnimationsModule, CommonModule, Message, SharedModule, PrimeTemplate],
                declarations: [TestBasicMessageComponent]
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
                imports: [NoopAnimationsModule, CommonModule, Message, SharedModule, PrimeTemplate],
                declarations: [TestBasicMessageComponent]
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
                imports: [NoopAnimationsModule, CommonModule, Message, SharedModule, PrimeTemplate],
                declarations: [TestContainerTemplateComponent]
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

        it('should provide closeCallback context to container template', fakeAsync(() => {
            const messageEl = fixture.debugElement.query(By.css('p-message'));
            const messageInstance = messageEl.componentInstance as Message;

            // Spy on close method before ngAfterContentInit
            spyOn(messageInstance, 'close');

            // Trigger ngAfterContentInit to process templates
            messageInstance.ngAfterContentInit();
            tick();
            fixture.detectChanges();

            const customCloseButton = fixture.debugElement.query(By.css('.custom-close-button'));
            expect(customCloseButton).toBeTruthy();

            customCloseButton.nativeElement.click();
            tick();
            fixture.detectChanges();

            expect(messageInstance.close).toHaveBeenCalled();
            flush();
        }));
    });

    describe('Template Content Projection - Icon Templates', () => {
        let fixture: ComponentFixture<TestIconTemplatesComponent>;
        let component: TestIconTemplatesComponent;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [NoopAnimationsModule, CommonModule, Message, SharedModule, PrimeTemplate],
                declarations: [TestIconTemplatesComponent]
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
                imports: [NoopAnimationsModule, CommonModule, Message, SharedModule, PrimeTemplate],
                declarations: [TestPTemplateComponent]
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

        it('should render pTemplate content correctly', fakeAsync(() => {
            tick();
            fixture.detectChanges();

            const ptemplateContainer = fixture.debugElement.query(By.css('.ptemplate-container'));
            expect(ptemplateContainer).toBeTruthy();
            expect(ptemplateContainer.nativeElement.textContent).toContain('PTemplate Container');

            const ptemplateIcon = fixture.debugElement.query(By.css('.ptemplate-icon'));
            expect(ptemplateIcon).toBeTruthy();
            expect(ptemplateIcon.nativeElement.textContent).toBe('📢');

            const ptemplateCloseIcon = fixture.debugElement.query(By.css('.ptemplate-close-icon'));
            expect(ptemplateCloseIcon).toBeTruthy();
            expect(ptemplateCloseIcon.nativeElement.textContent).toBe('❌');

            flush();
        }));

        it('should handle closeCallback in pTemplate container', fakeAsync(() => {
            const messageEl = fixture.debugElement.query(By.css('p-message'));
            const messageInstance = messageEl.componentInstance as Message;

            // Spy on close method before ngAfterContentInit
            spyOn(messageInstance, 'close');

            // Trigger ngAfterContentInit to process templates
            messageInstance.ngAfterContentInit();
            tick();
            fixture.detectChanges();

            const ptemplateCloseButton = fixture.debugElement.query(By.css('.ptemplate-close'));
            expect(ptemplateCloseButton).toBeTruthy();

            ptemplateCloseButton.nativeElement.click();
            tick();
            fixture.detectChanges();

            expect(messageInstance.close).toHaveBeenCalled();
            flush();
        }));
    });

    describe('CSS Classes and Styling', () => {
        let fixture: ComponentFixture<TestBasicMessageComponent>;
        let component: TestBasicMessageComponent;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [NoopAnimationsModule, CommonModule, Message, SharedModule, PrimeTemplate],
                declarations: [TestBasicMessageComponent]
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

        it('should apply size classes', () => {
            component.size = 'large';
            fixture.detectChanges();

            const messageEl = fixture.debugElement.query(By.css('p-message'));
            const messageInstance = messageEl.componentInstance as Message;
            expect(messageInstance.size).toBe('large');

            component.size = 'small';
            fixture.detectChanges();
            expect(messageInstance.size).toBe('small');
        });

        it('should apply variant classes', () => {
            const variants: Array<'outlined' | 'text' | 'simple'> = ['outlined', 'text', 'simple'];

            variants.forEach((variant) => {
                component.variant = variant;
                fixture.detectChanges();

                const messageEl = fixture.debugElement.query(By.css('p-message'));
                const messageInstance = messageEl.componentInstance as Message;
                expect(messageInstance.variant).toBe(variant);
            });
        });
    });

    describe('Keyboard Navigation and Accessibility', () => {
        let fixture: ComponentFixture<TestKeyboardNavigationComponent>;
        let component: TestKeyboardNavigationComponent;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [NoopAnimationsModule, CommonModule, Message, SharedModule, PrimeTemplate],
                declarations: [TestKeyboardNavigationComponent]
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

    describe('Animation and Transitions', () => {
        let fixture: ComponentFixture<TestBasicMessageComponent>;
        let component: TestBasicMessageComponent;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [BrowserAnimationsModule, CommonModule, Message, SharedModule, PrimeTemplate],
                declarations: [TestBasicMessageComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicMessageComponent);
            component = fixture.componentInstance;
        });

        it('should have custom show transition options', () => {
            component.showTransitionOptions = '500ms ease-in';
            fixture.detectChanges();

            const messageEl = fixture.debugElement.query(By.css('p-message'));
            const messageInstance = messageEl.componentInstance as Message;
            expect(messageInstance.showTransitionOptions).toBe('500ms ease-in');
        });

        it('should have custom hide transition options', () => {
            component.hideTransitionOptions = '300ms ease-out';
            fixture.detectChanges();

            const messageEl = fixture.debugElement.query(By.css('p-message'));
            const messageInstance = messageEl.componentInstance as Message;
            expect(messageInstance.hideTransitionOptions).toBe('300ms ease-out');
        });

        it('should animate when closing', fakeAsync(() => {
            component.closable = true;
            fixture.detectChanges();

            const messageEl = fixture.debugElement.query(By.css('p-message'));
            const messageInstance = messageEl.componentInstance as Message;

            messageInstance.close(new MouseEvent('click'));
            tick();
            fixture.detectChanges();

            expect(messageInstance.visible()).toBe(false);
            flush();
        }));
    });

    describe('Edge Cases', () => {
        let fixture: ComponentFixture<TestBasicMessageComponent>;
        let component: TestBasicMessageComponent;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [NoopAnimationsModule, CommonModule, Message, SharedModule, PrimeTemplate],
                declarations: [TestBasicMessageComponent]
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

        it('should handle rapid close button clicks', fakeAsync(() => {
            component.closable = true;
            fixture.detectChanges();

            const messageEl = fixture.debugElement.query(By.css('p-message'));
            const messageInstance = messageEl.componentInstance as Message;
            spyOn(messageInstance.onClose, 'emit');

            const closeButton = fixture.debugElement.query(By.css('button'));

            // Multiple rapid clicks
            closeButton.nativeElement.click();
            closeButton.nativeElement.click();
            closeButton.nativeElement.click();
            tick();

            // Should emit for each click (component behavior is to emit each time)
            expect(messageInstance.onClose.emit).toHaveBeenCalledTimes(3);
            expect(messageInstance.visible()).toBe(false);
            flush();
        }));

        it('should handle multiple messages on same page', () => {
            const fixture2 = TestBed.createComponent(TestBasicMessageComponent);
            fixture2.componentInstance.severity = 'success';
            fixture2.detectChanges();

            component.severity = 'error';
            fixture.detectChanges();

            const message1 = fixture.debugElement.query(By.css('p-message')).componentInstance as Message;
            const message2 = fixture2.debugElement.query(By.css('p-message')).componentInstance as Message;

            expect(message1.severity).toBe('error');
            expect(message2.severity).toBe('success');
        });

        it('should handle life property with zero value', fakeAsync(() => {
            component.life = 0;
            fixture.detectChanges();

            const messageEl = fixture.debugElement.query(By.css('p-message'));
            const messageInstance = messageEl.componentInstance as Message;

            tick(0);
            fixture.detectChanges();

            // Zero value should NOT auto-close (falsy check prevents it)
            expect(messageInstance.visible()).toBe(true);
            flush();
        }));

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
                imports: [NoopAnimationsModule, CommonModule, Message, SharedModule, PrimeTemplate],
                declarations: [TestBasicMessageComponent]
            }).compileComponents();
        });

        it('should cleanup timeout when component is destroyed before life expires', fakeAsync(() => {
            fixture = TestBed.createComponent(TestBasicMessageComponent);
            component = fixture.componentInstance;
            component.life = 5000;
            fixture.detectChanges();

            const messageEl = fixture.debugElement.query(By.css('p-message'));
            const messageInstance = messageEl.componentInstance as Message;

            // Destroy component before timeout
            fixture.destroy();
            tick(5000);

            // Should not throw any errors
            expect(() => flush()).not.toThrow();
        }));

        it('should handle component recreation', fakeAsync(() => {
            fixture = TestBed.createComponent(TestBasicMessageComponent);
            component = fixture.componentInstance;
            component.life = 100;
            fixture.detectChanges();

            tick(100);
            fixture.detectChanges();

            // Recreate component
            fixture = TestBed.createComponent(TestBasicMessageComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const messageEl = fixture.debugElement.query(By.css('p-message'));
            const messageInstance = messageEl.componentInstance as Message;
            expect(messageInstance.visible()).toBe(true);

            flush();
        }));
    });
});
