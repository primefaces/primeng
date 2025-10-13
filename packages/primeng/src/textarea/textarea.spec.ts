import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { providePrimeNG } from 'primeng/config';
import { Textarea } from './textarea';
import { TextareaPassThrough } from 'primeng/types/textarea';

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

@Component({
    standalone: true,
    imports: [Textarea, FormsModule],
    template: ` <textarea pTextarea [(ngModel)]="value" [pt]="pt" [autoResize]="autoResize" [invalid]="invalid"></textarea> `
})
class TestPTTextareaComponent {
    value: string = '';
    pt: TextareaPassThrough | undefined = undefined as any;
    autoResize: boolean = false;
    invalid: boolean = false;
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

    describe('PassThrough (PT) Tests', () => {
        let component: TestPTTextareaComponent;
        let fixture: ComponentFixture<TestPTTextareaComponent>;
        let textareaEl: HTMLTextAreaElement;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestPTTextareaComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestPTTextareaComponent);
            component = fixture.componentInstance;
            const debugEl = fixture.debugElement.query(By.directive(Textarea));
            textareaEl = debugEl.nativeElement;
            fixture.detectChanges();
        });

        describe('Case 1: Simple string classes', () => {
            it('should apply root class from pt', fakeAsync(() => {
                component.pt = { root: 'ROOT_CLASS' };
                fixture.detectChanges();
                tick();

                expect(textareaEl.classList.contains('ROOT_CLASS')).toBe(true);
            }));

            it('should apply host class from pt', fakeAsync(() => {
                component.pt = { host: 'HOST_CLASS' };
                fixture.detectChanges();
                tick();

                expect(textareaEl.classList.contains('HOST_CLASS')).toBe(true);
            }));
        });

        describe('Case 2: Objects', () => {
            it('should apply root object with class, style, data attributes, and aria-label', fakeAsync(() => {
                component.pt = {
                    root: {
                        class: 'ROOT_OBJECT_CLASS',
                        style: { borderColor: 'red' } as any,
                        'data-p-test': true,
                        'aria-label': 'TEST_ARIA_LABEL'
                    }
                };
                fixture.detectChanges();
                tick();

                expect(textareaEl.classList.contains('ROOT_OBJECT_CLASS')).toBe(true);
                expect(textareaEl.style.borderColor).toBe('red');
                expect(textareaEl.getAttribute('data-p-test')).toBe('true');
                expect(textareaEl.getAttribute('aria-label')).toBe('TEST_ARIA_LABEL');
            }));

            it('should apply host object with multiple attributes', fakeAsync(() => {
                component.pt = {
                    host: {
                        class: 'HOST_OBJECT_CLASS',
                        style: { padding: '10px' } as any,
                        'data-custom': 'custom-value'
                    }
                };
                fixture.detectChanges();
                tick();

                expect(textareaEl.classList.contains('HOST_OBJECT_CLASS')).toBe(true);
                expect(textareaEl.style.padding).toBe('10px');
                expect(textareaEl.getAttribute('data-custom')).toBe('custom-value');
            }));
        });

        describe('Case 3: Mixed object and string values', () => {
            it('should apply mixed pt with root object and host string', fakeAsync(() => {
                component.pt = {
                    root: {
                        class: 'ROOT_MIXED_CLASS'
                    },
                    host: 'HOST_MIXED_CLASS'
                };
                fixture.detectChanges();
                tick();

                expect(textareaEl.classList.contains('ROOT_MIXED_CLASS')).toBe(true);
                expect(textareaEl.classList.contains('HOST_MIXED_CLASS')).toBe(true);
            }));
        });

        describe('Case 4: Use variables from instance', () => {
            it('should access instance.invalid property in PT callback', fakeAsync(() => {
                component.invalid = true;
                let instanceAccessed = false;
                component.pt = {
                    root: ({ instance }) => {
                        if ((instance as any)?.invalid()) {
                            instanceAccessed = true;
                        }
                        return {
                            class: {
                                INVALID_CLASS: (instance as any)?.invalid()
                            }
                        };
                    }
                };
                fixture.detectChanges();
                tick();

                expect(instanceAccessed).toBe(true);
            }));

            it('should access instance.autoResize property in PT callback', fakeAsync(() => {
                component.autoResize = true;
                let instanceAccessed = false;
                component.pt = {
                    root: ({ instance }) => {
                        if ((instance as any)?.autoResize) {
                            instanceAccessed = true;
                        }
                        return {
                            class: {
                                AUTO_RESIZE_ENABLED: (instance as any)?.autoResize
                            }
                        };
                    }
                };
                fixture.detectChanges();
                tick();

                expect(instanceAccessed).toBe(true);
            }));

            it('should use instance properties for conditional styling', fakeAsync(() => {
                component.invalid = true;
                component.pt = {
                    root: ({ instance }) => ({
                        style: {
                            borderColor: (instance as any)?.invalid() ? 'red' : 'green'
                        } as any
                    })
                };
                fixture.detectChanges();
                tick();

                expect(textareaEl.style.borderColor).toBe('red');
            }));
        });

        describe('Case 5: Event binding', () => {
            it('should bind onclick event via PT', fakeAsync(() => {
                let clicked = false;
                component.pt = {
                    root: () => ({
                        onclick: () => {
                            clicked = true;
                        }
                    })
                };
                fixture.detectChanges();
                tick();

                textareaEl.click();
                expect(clicked).toBe(true);
            }));

            it('should bind onfocus event via PT', fakeAsync(() => {
                let focused = false;
                component.pt = {
                    root: () => ({
                        onfocus: () => {
                            focused = true;
                        }
                    })
                };
                fixture.detectChanges();
                tick();

                textareaEl.dispatchEvent(new Event('focus'));
                expect(focused).toBe(true);
            }));
        });

        describe('Case 6: Inline PT', () => {
            it('should apply inline pt with string class', fakeAsync(() => {
                const inlineFixture = TestBed.createComponent(TestPTTextareaComponent);
                inlineFixture.componentInstance.pt = { root: 'INLINE_CLASS' };
                inlineFixture.detectChanges();
                tick();

                const el = inlineFixture.debugElement.query(By.directive(Textarea)).nativeElement;
                expect(el.classList.contains('INLINE_CLASS')).toBe(true);
            }));

            it('should apply inline pt with object', fakeAsync(() => {
                const inlineFixture = TestBed.createComponent(TestPTTextareaComponent);
                inlineFixture.componentInstance.pt = {
                    root: {
                        class: 'INLINE_OBJECT_CLASS'
                    }
                };
                inlineFixture.detectChanges();
                tick();

                const el = inlineFixture.debugElement.query(By.directive(Textarea)).nativeElement;
                expect(el.classList.contains('INLINE_OBJECT_CLASS')).toBe(true);
            }));
        });

        describe('Case 7: Global PT from PrimeNGConfig', () => {
            it('should apply global pt configuration', fakeAsync(async () => {
                await TestBed.resetTestingModule();
                await TestBed.configureTestingModule({
                    imports: [TestPTTextareaComponent],
                    providers: [
                        providePrimeNG({
                            pt: {
                                textarea: {
                                    host: { 'aria-label': 'GLOBAL_ARIA_LABEL' }
                                }
                            }
                        })
                    ]
                }).compileComponents();

                const globalFixture = TestBed.createComponent(TestPTTextareaComponent);
                globalFixture.detectChanges();
                tick();

                const el = globalFixture.debugElement.query(By.directive(Textarea)).nativeElement;
                expect(el.getAttribute('aria-label')).toBe('GLOBAL_ARIA_LABEL');
            }));

            it('should apply global css from PrimeNGConfig', fakeAsync(async () => {
                await TestBed.resetTestingModule();
                await TestBed.configureTestingModule({
                    imports: [TestPTTextareaComponent],
                    providers: [
                        providePrimeNG({
                            pt: {
                                textarea: {
                                    root: 'GLOBAL_CLASS',
                                    global: {
                                        css: `textarea { border: 2px solid blue !important; }`
                                    }
                                }
                            }
                        })
                    ]
                }).compileComponents();

                const globalFixture = TestBed.createComponent(TestPTTextareaComponent);
                globalFixture.detectChanges();
                tick();

                const el = globalFixture.debugElement.query(By.directive(Textarea)).nativeElement;
                expect(el.classList.contains('GLOBAL_CLASS')).toBe(true);
            }));
        });

        describe('Case 8: Hooks', () => {
            it('should execute onAfterViewInit hook', fakeAsync(() => {
                let hookCalled = false;
                component.pt = {
                    root: 'HOOK_CLASS',
                    hooks: {
                        onAfterViewInit: () => {
                            hookCalled = true;
                        }
                    }
                };

                // Recreate component to trigger lifecycle hooks
                const newFixture = TestBed.createComponent(TestPTTextareaComponent);
                newFixture.componentInstance.pt = component.pt;
                newFixture.detectChanges();
                tick();

                expect(hookCalled).toBe(true);
            }));

            it('should execute onAfterViewChecked hook', fakeAsync(() => {
                let hookCallCount = 0;
                component.pt = {
                    root: 'HOOK_CLASS',
                    hooks: {
                        onAfterViewChecked: () => {
                            hookCallCount++;
                        }
                    }
                };
                fixture.detectChanges();
                tick();

                expect(hookCallCount).toBeGreaterThan(0);
            }));

            it('should execute onDestroy hook', fakeAsync(() => {
                let hookCalled = false;
                component.pt = {
                    root: 'HOOK_CLASS',
                    hooks: {
                        onDestroy: () => {
                            hookCalled = true;
                        }
                    }
                };
                fixture.detectChanges();
                tick();

                fixture.destroy();
                expect(hookCalled).toBe(true);
            }));
        });
    });
});
