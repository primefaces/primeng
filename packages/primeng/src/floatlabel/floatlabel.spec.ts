import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FloatLabel } from './floatlabel';
import { providePrimeNG } from 'primeng/config';

@Component({
    standalone: true,
    imports: [FloatLabel, FormsModule],
    template: `
        <p-floatlabel>
            <input id="username" [(ngModel)]="value" />
            <label for="username">Username</label>
        </p-floatlabel>
    `
})
class TestBasicFloatLabelComponent {
    value: string = '';
}

@Component({
    standalone: true,
    imports: [FloatLabel, FormsModule],
    template: `
        <p-floatlabel [variant]="variant">
            <input id="test-input" [(ngModel)]="value" />
            <label for="test-input">Test Label</label>
        </p-floatlabel>
    `
})
class TestVariantFloatLabelComponent {
    value: string = '';
    variant: 'in' | 'over' | 'on' = 'over';
}

describe('FloatLabel', () => {
    describe('Basic Functionality', () => {
        let component: TestBasicFloatLabelComponent;
        let fixture: ComponentFixture<TestBasicFloatLabelComponent>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestBasicFloatLabelComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicFloatLabelComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should render input and label content', () => {
            const inputElement = fixture.debugElement.query(By.css('input'));
            const labelElement = fixture.debugElement.query(By.css('label'));

            expect(inputElement).toBeTruthy();
            expect(labelElement).toBeTruthy();
            expect(labelElement.nativeElement.textContent.trim()).toBe('Username');
            expect(inputElement.nativeElement.id).toBe('username');
        });

        it('should have correct CSS class', () => {
            const floatLabelElement = fixture.debugElement.query(By.directive(FloatLabel));
            expect(floatLabelElement.nativeElement.classList.contains('p-floatlabel')).toBe(true);
        });
    });

    describe('Variant Tests', () => {
        let component: TestVariantFloatLabelComponent;
        let fixture: ComponentFixture<TestVariantFloatLabelComponent>;
        let floatLabelInstance: FloatLabel;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestVariantFloatLabelComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestVariantFloatLabelComponent);
            component = fixture.componentInstance;
            floatLabelInstance = fixture.debugElement.query(By.directive(FloatLabel)).componentInstance;
            fixture.detectChanges();
        });

        it('should have default variant "over"', () => {
            expect(floatLabelInstance.variant).toBe('over');
        });

        it('should apply variant "in"', () => {
            component.variant = 'in';
            fixture.detectChanges();

            expect(floatLabelInstance.variant).toBe('in');
        });

        it('should apply variant "on"', () => {
            component.variant = 'on';
            fixture.detectChanges();

            expect(floatLabelInstance.variant).toBe('on');
        });

        it('should have correct variant classes', () => {
            const floatLabelElement = fixture.debugElement.query(By.directive(FloatLabel));

            // Test 'in' variant
            component.variant = 'in';
            fixture.detectChanges();
            expect(floatLabelElement.nativeElement.classList.contains('p-floatlabel-in')).toBe(true);

            // Test 'on' variant
            component.variant = 'on';
            fixture.detectChanges();
            expect(floatLabelElement.nativeElement.classList.contains('p-floatlabel-on')).toBe(true);

            // Test 'over' variant (default)
            component.variant = 'over';
            fixture.detectChanges();
            expect(floatLabelElement.nativeElement.classList.contains('p-floatlabel-over')).toBe(true);
        });
    });

    describe('Edge Cases', () => {
        let component: TestBasicFloatLabelComponent;
        let fixture: ComponentFixture<TestBasicFloatLabelComponent>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestBasicFloatLabelComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicFloatLabelComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should work without input value', () => {
            const inputElement = fixture.debugElement.query(By.css('input'));
            expect(inputElement.nativeElement.value).toBe('' as any);
        });

        it('should update input value when model changes', fakeAsync(() => {
            component.value = 'test value';
            fixture.detectChanges();
            tick();

            const inputElement = fixture.debugElement.query(By.css('input'));
            expect(inputElement.nativeElement.value).toBe('test value');
        }));
    });
});

describe('FloatLabel PassThrough Tests', () => {
    let fixture: ComponentFixture<FloatLabel>;
    let component: FloatLabel;
    let hostElement: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FloatLabel, FormsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(FloatLabel);
        component = fixture.componentInstance;
        hostElement = fixture.nativeElement;
    });

    describe('PT Case 1: Simple string classes', () => {
        it('should apply simple string class to host', () => {
            fixture.componentRef.setInput('pt', { host: 'HOST_CLASS' });
            fixture.detectChanges();

            expect(hostElement.classList.contains('HOST_CLASS')).toBe(true);
        });

        it('should apply simple string class to root', () => {
            fixture.componentRef.setInput('pt', { root: 'ROOT_CLASS' });
            fixture.detectChanges();

            expect(hostElement.classList.contains('ROOT_CLASS')).toBe(true);
        });

        it('should apply simple string classes to both host and root', () => {
            fixture.componentRef.setInput('pt', {
                host: 'HOST_CLASS',
                root: 'ROOT_CLASS'
            });
            fixture.detectChanges();

            expect(hostElement.classList.contains('HOST_CLASS')).toBe(true);
            expect(hostElement.classList.contains('ROOT_CLASS')).toBe(true);
        });
    });

    describe('PT Case 2: Objects with class, style, and attributes', () => {
        it('should apply object with class to root', () => {
            fixture.componentRef.setInput('pt', {
                root: {
                    class: 'PT_ROOT_OBJECT_CLASS'
                }
            });
            fixture.detectChanges();

            expect(hostElement.classList.contains('PT_ROOT_OBJECT_CLASS')).toBe(true);
        });

        it('should apply object with style to root', () => {
            fixture.componentRef.setInput('pt', {
                root: {
                    style: { 'background-color': 'red' }
                }
            });
            fixture.detectChanges();

            expect(hostElement.style.backgroundColor).toBe('red');
        });

        it('should apply object with data attributes to root', () => {
            fixture.componentRef.setInput('pt', {
                root: {
                    'data-p-test': 'true'
                }
            });
            fixture.detectChanges();

            expect(hostElement.getAttribute('data-p-test')).toBe('true');
        });

        it('should apply object with aria attributes to root', () => {
            fixture.componentRef.setInput('pt', {
                root: {
                    'aria-label': 'TEST_ARIA_LABEL'
                }
            });
            fixture.detectChanges();

            expect(hostElement.getAttribute('aria-label')).toBe('TEST_ARIA_LABEL');
        });

        it('should apply multiple properties at once', () => {
            fixture.componentRef.setInput('pt', {
                root: {
                    class: 'MULTI_CLASS',
                    style: { color: 'blue' },
                    'data-test': 'value',
                    'aria-label': 'MULTI_ARIA'
                }
            });
            fixture.detectChanges();

            expect(hostElement.classList.contains('MULTI_CLASS')).toBe(true);
            expect(hostElement.style.color).toBe('blue');
            expect(hostElement.getAttribute('data-test')).toBe('value');
            expect(hostElement.getAttribute('aria-label')).toBe('MULTI_ARIA');
        });
    });

    describe('PT Case 3: Mixed object and string values', () => {
        it('should apply mixed string and object PT options', () => {
            fixture.componentRef.setInput('pt', {
                host: 'HOST_STRING',
                root: {
                    class: 'ROOT_OBJECT_CLASS',
                    style: { 'border-color': 'green' }
                }
            });
            fixture.detectChanges();

            expect(hostElement.classList.contains('HOST_STRING')).toBe(true);
            expect(hostElement.classList.contains('ROOT_OBJECT_CLASS')).toBe(true);
            expect(hostElement.style.borderColor).toBe('green');
        });
    });

    describe('PT Case 4: Use variables from instance', () => {
        it('should access instance variables in PT function', () => {
            component.variant = 'in';
            fixture.componentRef.setInput('pt', {
                root: ({ instance }: any) => ({
                    class: instance?.variant === 'in' ? 'VARIANT_IN' : ''
                })
            });
            fixture.detectChanges();

            expect(hostElement.classList.contains('VARIANT_IN')).toBe(true);
        });

        it('should conditionally apply styles based on instance state', () => {
            component.variant = 'over';
            fixture.componentRef.setInput('pt', {
                root: ({ instance }: any) => ({
                    style: {
                        'background-color': instance?.variant === 'over' ? 'yellow' : 'red'
                    }
                })
            });
            fixture.detectChanges();

            expect(hostElement.style.backgroundColor).toBe('yellow');
        });
    });

    describe('PT Case 5: Event binding', () => {
        it('should handle onclick event through PT', (done) => {
            let clicked = false;
            fixture.componentRef.setInput('pt', {
                root: {
                    onclick: () => {
                        clicked = true;
                        done();
                    }
                }
            });
            fixture.detectChanges();

            hostElement.click();
            expect(clicked).toBe(true);
        });

        it('should modify instance through PT event', () => {
            fixture.componentRef.setInput('pt', {
                root: ({ instance }: any) => ({
                    onclick: () => {
                        instance.variant = 'on';
                    }
                })
            });
            fixture.detectChanges();

            hostElement.click();
            expect(component.variant).toBe('on');
        });
    });

    describe('PT Case 6: Inline PT', () => {
        it('should work with inline string PT', () => {
            const inlineFixture = TestBed.createComponent(TestInlineStringPTComponent);
            inlineFixture.detectChanges();

            const inlineHostElement = inlineFixture.nativeElement.querySelector('p-floatlabel');
            expect(inlineHostElement.classList.contains('INLINE_STRING')).toBe(true);
        });

        it('should work with inline object PT', () => {
            const inlineFixture = TestBed.createComponent(TestInlineObjectPTComponent);
            inlineFixture.detectChanges();

            const inlineHostElement = inlineFixture.nativeElement.querySelector('p-floatlabel');
            expect(inlineHostElement.classList.contains('INLINE_OBJECT_CLASS')).toBe(true);
            expect(inlineHostElement.getAttribute('data-inline')).toBe('true');
        });
    });

    describe('PT Case 7: Global PT from PrimeNGConfig', () => {
        it('should apply global PT configuration to all instances', async () => {
            TestBed.resetTestingModule();
            await TestBed.configureTestingModule({
                imports: [FloatLabel, FormsModule],
                providers: [
                    providePrimeNG({
                        pt: {
                            floatLabel: {
                                host: { 'aria-label': 'GLOBAL_ARIA_LABEL' },
                                root: 'GLOBAL_CLASS'
                            }
                        }
                    })
                ]
            }).compileComponents();

            const globalFixture = TestBed.createComponent(FloatLabel);
            globalFixture.detectChanges();

            const globalHostElement = globalFixture.nativeElement;
            expect(globalHostElement.classList.contains('GLOBAL_CLASS')).toBe(true);
            expect(globalHostElement.getAttribute('aria-label')).toBe('GLOBAL_ARIA_LABEL');
        });

        it('should apply global PT to multiple component instances', async () => {
            TestBed.resetTestingModule();
            await TestBed.configureTestingModule({
                imports: [FloatLabel, FormsModule, TestMultipleInstancesComponent],
                providers: [
                    providePrimeNG({
                        pt: {
                            floatLabel: {
                                root: {
                                    class: 'MULTI_GLOBAL_CLASS',
                                    'data-global': 'true'
                                }
                            }
                        }
                    })
                ]
            }).compileComponents();

            const multiFixture = TestBed.createComponent(TestMultipleInstancesComponent);
            multiFixture.detectChanges();

            const floatLabels = multiFixture.nativeElement.querySelectorAll('p-floatlabel');
            expect(floatLabels.length).toBe(2);

            floatLabels.forEach((fl: HTMLElement) => {
                expect(fl.classList.contains('MULTI_GLOBAL_CLASS')).toBe(true);
                expect(fl.getAttribute('data-global')).toBe('true');
            });
        });
    });

    describe('PT Case 8: Lifecycle hooks', () => {
        it('should support onInit hook', async () => {
            const hooksCalled: string[] = [];
            TestBed.resetTestingModule();
            await TestBed.configureTestingModule({
                imports: [FloatLabel, FormsModule],
                providers: [
                    providePrimeNG({
                        pt: {
                            floatLabel: {
                                hooks: {
                                    onInit: () => {
                                        hooksCalled.push('onInit');
                                    }
                                }
                            }
                        }
                    })
                ]
            }).compileComponents();

            const hookFixture = TestBed.createComponent(FloatLabel);
            hookFixture.detectChanges();

            expect(hooksCalled).toContain('onInit');
        });

        it('should support onAfterViewInit hook', async () => {
            const hooksCalled: string[] = [];
            TestBed.resetTestingModule();
            await TestBed.configureTestingModule({
                imports: [FloatLabel, FormsModule],
                providers: [
                    providePrimeNG({
                        pt: {
                            floatLabel: {
                                hooks: {
                                    onAfterViewInit: () => {
                                        hooksCalled.push('onAfterViewInit');
                                    }
                                }
                            }
                        }
                    })
                ]
            }).compileComponents();

            const hookFixture = TestBed.createComponent(FloatLabel);
            hookFixture.detectChanges();

            expect(hooksCalled).toContain('onAfterViewInit');
        });

        it('should support onAfterViewChecked hook', async () => {
            const hooksCalled: string[] = [];
            TestBed.resetTestingModule();
            await TestBed.configureTestingModule({
                imports: [FloatLabel, FormsModule],
                providers: [
                    providePrimeNG({
                        pt: {
                            floatLabel: {
                                hooks: {
                                    onAfterViewChecked: () => {
                                        if (!hooksCalled.includes('onAfterViewChecked')) {
                                            hooksCalled.push('onAfterViewChecked');
                                        }
                                    }
                                }
                            }
                        }
                    })
                ]
            }).compileComponents();

            const hookFixture = TestBed.createComponent(FloatLabel);
            hookFixture.detectChanges();

            expect(hooksCalled).toContain('onAfterViewChecked');
        });

        it('should support onDestroy hook', async () => {
            const hooksCalled: string[] = [];
            TestBed.resetTestingModule();
            await TestBed.configureTestingModule({
                imports: [FloatLabel, FormsModule],
                providers: [
                    providePrimeNG({
                        pt: {
                            floatLabel: {
                                hooks: {
                                    onDestroy: () => {
                                        hooksCalled.push('onDestroy');
                                    }
                                }
                            }
                        }
                    })
                ]
            }).compileComponents();

            const hookFixture = TestBed.createComponent(FloatLabel);
            hookFixture.detectChanges();

            hookFixture.destroy();

            expect(hooksCalled).toContain('onDestroy');
        });

        it('should support multiple lifecycle hooks', async () => {
            const hooksCalled: string[] = [];
            TestBed.resetTestingModule();
            await TestBed.configureTestingModule({
                imports: [FloatLabel, FormsModule],
                providers: [
                    providePrimeNG({
                        pt: {
                            floatLabel: {
                                hooks: {
                                    onInit: () => {
                                        hooksCalled.push('onInit');
                                    },
                                    onAfterViewInit: () => {
                                        hooksCalled.push('onAfterViewInit');
                                    },
                                    onAfterViewChecked: () => {
                                        if (!hooksCalled.includes('onAfterViewChecked')) {
                                            hooksCalled.push('onAfterViewChecked');
                                        }
                                    },
                                    onDestroy: () => {
                                        hooksCalled.push('onDestroy');
                                    }
                                }
                            }
                        }
                    })
                ]
            }).compileComponents();

            const hookFixture = TestBed.createComponent(FloatLabel);
            hookFixture.detectChanges();

            expect(hooksCalled).toContain('onInit');
            expect(hooksCalled).toContain('onAfterViewInit');
            expect(hooksCalled).toContain('onAfterViewChecked');

            hookFixture.destroy();

            expect(hooksCalled).toContain('onDestroy');
        });
    });
});

// Test components for inline PT tests
@Component({
    standalone: true,
    imports: [FloatLabel, FormsModule],
    template: `<p-floatlabel [pt]="{ root: 'INLINE_STRING' }"><input /></p-floatlabel>`
})
class TestInlineStringPTComponent {}

@Component({
    standalone: true,
    imports: [FloatLabel, FormsModule],
    template: `<p-floatlabel [pt]="{ root: { class: 'INLINE_OBJECT_CLASS', 'data-inline': 'true' } }"><input /></p-floatlabel>`
})
class TestInlineObjectPTComponent {}

@Component({
    standalone: true,
    imports: [FloatLabel, FormsModule],
    template: `
        <p-floatlabel><input /></p-floatlabel>
        <p-floatlabel><input /></p-floatlabel>
    `
})
class TestMultipleInstancesComponent {}
