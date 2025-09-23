import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Textarea } from './textarea';

@Component({
    standalone: true,
    imports: [Textarea, FormsModule],
    template: ` <textarea pTextarea [(ngModel)]="value" placeholder="Enter text"></textarea> `
})
class TestBasicTextareaComponent {
    value: string = '';
}

@Component({
    standalone: true,
    imports: [Textarea, FormsModule],
    template: ` <textarea pTextarea [(ngModel)]="content" [autoResize]="enableAutoResize" [pSize]="size" [variant]="variant" [fluid]="fluid" [invalid]="invalid" (onResize)="onResizeHandler($event)" rows="3" cols="30"> </textarea> `
})
class TestAdvancedTextareaComponent {
    content: string = '';
    enableAutoResize: boolean = false;
    size: 'large' | 'small' | undefined = undefined as any;
    variant: 'filled' | 'outlined' | undefined = undefined as any;
    fluid: boolean | undefined = undefined as any;
    invalid: boolean | undefined = undefined as any;
    resizeEventCount: number = 0;

    onResizeHandler(event: any) {
        this.resizeEventCount++;
    }
}

@Component({
    standalone: true,
    imports: [Textarea, ReactiveFormsModule],
    template: ` <textarea pTextarea [formControl]="textControl"></textarea> `
})
class TestReactiveFormTextareaComponent {
    textControl = new FormControl('');
}

describe('Textarea', () => {
    describe('Basic Functionality', () => {
        let component: TestBasicTextareaComponent;
        let fixture: ComponentFixture<TestBasicTextareaComponent>;
        let textareaEl: DebugElement;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestBasicTextareaComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicTextareaComponent);
            component = fixture.componentInstance;
            textareaEl = fixture.debugElement.query(By.directive(Textarea));
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should apply pTextarea directive', () => {
            expect(textareaEl).toBeTruthy();
            expect(textareaEl.nativeElement.tagName.toLowerCase()).toBe('textarea');
        });

        it('should have textarea element with directive applied', () => {
            expect(textareaEl.nativeElement.hasAttribute('pTextarea')).toBe(true);
        });

        it('should handle placeholder', () => {
            expect(textareaEl.nativeElement.placeholder).toBe('Enter text');
        });

        it('should update model value when text changes', fakeAsync(() => {
            const textarea = textareaEl.nativeElement;
            textarea.value = 'test content';
            textarea.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            tick();

            expect(component.value).toBe('test content');
        }));

        it('should update textarea value when model changes', fakeAsync(() => {
            component.value = 'new content';
            fixture.detectChanges();
            tick();

            expect(textareaEl.nativeElement.value).toBe('new content');
        }));
    });

    describe('Advanced Features', () => {
        let component: TestAdvancedTextareaComponent;
        let fixture: ComponentFixture<TestAdvancedTextareaComponent>;
        let textareaEl: DebugElement;
        let textareaDirective: Textarea;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestAdvancedTextareaComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestAdvancedTextareaComponent);
            component = fixture.componentInstance;
            textareaEl = fixture.debugElement.query(By.directive(Textarea));
            textareaDirective = textareaEl.injector.get(Textarea);
            fixture.detectChanges();
        });

        it('should apply autoResize functionality', fakeAsync(() => {
            component.enableAutoResize = true;
            fixture.detectChanges();

            expect(textareaDirective.autoResize).toBe(true);

            // Simulate text input that would require resize
            component.content = 'Line 1\nLine 2\nLine 3\nLine 4\nLine 5';
            fixture.detectChanges();
            tick();

            expect(component.resizeEventCount).toBeGreaterThan(0);
        }));

        it('should apply size variants', () => {
            component.size = 'large';
            fixture.detectChanges();

            expect(textareaDirective.pSize).toBe('large');

            component.size = 'small';
            fixture.detectChanges();

            expect(textareaDirective.pSize).toBe('small');
        });

        it('should apply variant styles', () => {
            component.variant = 'filled';
            fixture.detectChanges();

            expect(textareaDirective.variant()).toBe('filled');

            component.variant = 'outlined';
            fixture.detectChanges();

            expect(textareaDirective.variant()).toBe('outlined');
        });

        it('should apply fluid styling', () => {
            component.fluid = true;
            fixture.detectChanges();

            expect(textareaDirective.fluid()).toBe(true);
        });

        it('should apply invalid state', () => {
            component.invalid = true;
            fixture.detectChanges();

            expect(textareaDirective.invalid()).toBe(true);
        });

        it('should emit resize events', fakeAsync(() => {
            component.enableAutoResize = true;
            fixture.detectChanges();

            const initialCount = component.resizeEventCount;

            // Trigger resize by changing content
            component.content = 'This is a very long text that should trigger resize functionality';
            fixture.detectChanges();
            tick();

            expect(component.resizeEventCount).toBeGreaterThan(initialCount);
        }));
    });

    describe('Reactive Forms', () => {
        let component: TestReactiveFormTextareaComponent;
        let fixture: ComponentFixture<TestReactiveFormTextareaComponent>;
        let textareaEl: DebugElement;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestReactiveFormTextareaComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestReactiveFormTextareaComponent);
            component = fixture.componentInstance;
            textareaEl = fixture.debugElement.query(By.directive(Textarea));
            fixture.detectChanges();
        });

        it('should work with reactive forms', fakeAsync(() => {
            component.textControl.setValue('reactive form content');
            fixture.detectChanges();
            tick();

            expect(textareaEl.nativeElement.value).toBe('reactive form content');
        }));

        it('should update form control when textarea changes', fakeAsync(() => {
            const textarea = textareaEl.nativeElement;
            textarea.value = 'user input';
            textarea.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            tick();

            expect(component.textControl.value).toBe('user input');
        }));

        it('should reflect form control validity', fakeAsync(() => {
            component.textControl.setErrors({ required: true });
            fixture.detectChanges();
            tick();

            expect(textareaEl.nativeElement.classList.contains('ng-invalid')).toBe(true);
        }));
    });

    describe('Edge Cases', () => {
        let component: TestBasicTextareaComponent;
        let fixture: ComponentFixture<TestBasicTextareaComponent>;
        let textareaEl: DebugElement;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestBasicTextareaComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicTextareaComponent);
            component = fixture.componentInstance;
            textareaEl = fixture.debugElement.query(By.directive(Textarea));
            fixture.detectChanges();
        });

        it('should handle empty string values', fakeAsync(() => {
            component.value = '';
            fixture.detectChanges();
            tick();

            expect(textareaEl.nativeElement.value).toBe('' as any);
        }));

        it('should handle null/undefined values', fakeAsync(() => {
            component.value = null as any;
            fixture.detectChanges();
            tick();

            expect(textareaEl.nativeElement.value).toBe('' as any);
        }));

        it('should handle multiline content', fakeAsync(() => {
            const multilineContent = 'Line 1\nLine 2\nLine 3';
            component.value = multilineContent;
            fixture.detectChanges();
            tick();

            expect(textareaEl.nativeElement.value).toBe(multilineContent);
        }));
    });
});
