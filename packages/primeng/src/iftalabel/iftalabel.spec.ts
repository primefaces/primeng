import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IftaLabel } from './iftalabel';
import { providePrimeNG } from 'primeng/config';

@Component({
    standalone: true,
    imports: [IftaLabel, FormsModule],
    template: `
        <p-iftalabel>
            <input id="username" [(ngModel)]="value" />
            <label for="username">Username</label>
        </p-iftalabel>
    `
})
class TestBasicIftaLabelComponent {
    value: string = '';
}

@Component({
    standalone: true,
    imports: [IftaLabel, FormsModule],
    template: `
        <p-iftalabel>
            <input id="email" type="email" [(ngModel)]="email" />
            <label for="email">Email Address</label>
        </p-iftalabel>
    `
})
class TestEmailIftaLabelComponent {
    email: string = '';
}

describe('IftaLabel', () => {
    describe('Basic Functionality', () => {
        let component: TestBasicIftaLabelComponent;
        let fixture: ComponentFixture<TestBasicIftaLabelComponent>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestBasicIftaLabelComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicIftaLabelComponent);
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
            const iftaLabelElement = fixture.debugElement.query(By.directive(IftaLabel));
            expect(iftaLabelElement.nativeElement.classList.contains('p-iftalabel')).toBe(true);
        });
    });

    describe('Form Integration', () => {
        let component: TestEmailIftaLabelComponent;
        let fixture: ComponentFixture<TestEmailIftaLabelComponent>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestEmailIftaLabelComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestEmailIftaLabelComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should work with email input type', () => {
            const inputElement = fixture.debugElement.query(By.css('input'));
            const labelElement = fixture.debugElement.query(By.css('label'));

            expect(inputElement.nativeElement.type).toBe('email');
            expect(labelElement.nativeElement.textContent.trim()).toBe('Email Address');
        });

        it('should update input value when model changes', fakeAsync(() => {
            component.email = 'test@example.com';
            fixture.detectChanges();
            tick();

            const inputElement = fixture.debugElement.query(By.css('input'));
            expect(inputElement.nativeElement.value).toBe('test@example.com');
        }));
    });

    describe('Edge Cases', () => {
        let component: TestBasicIftaLabelComponent;
        let fixture: ComponentFixture<TestBasicIftaLabelComponent>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestBasicIftaLabelComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestBasicIftaLabelComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should work without input value', () => {
            const inputElement = fixture.debugElement.query(By.css('input'));
            expect(inputElement.nativeElement.value).toBe('' as any);
        });

        it('should handle empty string model', fakeAsync(() => {
            component.value = '';
            fixture.detectChanges();
            tick();

            const inputElement = fixture.debugElement.query(By.css('input'));
            expect(inputElement.nativeElement.value).toBe('' as any);
        }));
    });
});

describe('IftaLabel PassThrough Tests', () => {
    let fixture: ComponentFixture<IftaLabel>;
    let component: IftaLabel;
    let hostElement: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [IftaLabel, FormsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(IftaLabel);
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
    });

    describe('PT Case 2: Objects with properties', () => {
        it('should apply object with class to root', () => {
            fixture.componentRef.setInput('pt', {
                root: {
                    class: 'PT_ROOT_CLASS',
                    style: { color: 'blue' },
                    'data-testid': 'iftalabel'
                }
            });
            fixture.detectChanges();

            expect(hostElement.classList.contains('PT_ROOT_CLASS')).toBe(true);
            expect(hostElement.style.color).toBe('blue');
            expect(hostElement.getAttribute('data-testid')).toBe('iftalabel');
        });
    });

    describe('PT Case 3: Instance variables', () => {
        it('should access instance variables in PT function', () => {
            fixture.componentRef.setInput('pt', {
                root: ({ instance }: any) => ({
                    class: instance ? 'HAS_INSTANCE' : ''
                })
            });
            fixture.detectChanges();

            expect(hostElement.classList.contains('HAS_INSTANCE')).toBe(true);
        });
    });

    describe('PT Case 4: Event binding', () => {
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
    });

    describe('PT Case 5: Global PT from PrimeNGConfig', () => {
        it('should apply global PT configuration', async () => {
            TestBed.resetTestingModule();
            await TestBed.configureTestingModule({
                imports: [IftaLabel, FormsModule],
                providers: [
                    providePrimeNG({
                        pt: {
                            iftaLabel: {
                                host: { 'aria-label': 'GLOBAL_LABEL' },
                                root: 'GLOBAL_CLASS'
                            }
                        }
                    })
                ]
            }).compileComponents();

            const globalFixture = TestBed.createComponent(IftaLabel);
            globalFixture.detectChanges();

            const globalHostElement = globalFixture.nativeElement;
            expect(globalHostElement.classList.contains('GLOBAL_CLASS')).toBe(true);
            expect(globalHostElement.getAttribute('aria-label')).toBe('GLOBAL_LABEL');
        });
    });

    describe('PT Case 6: Lifecycle hooks', () => {
        it('should support lifecycle hooks', async () => {
            const hooksCalled: string[] = [];
            TestBed.resetTestingModule();
            await TestBed.configureTestingModule({
                imports: [IftaLabel, FormsModule],
                providers: [
                    providePrimeNG({
                        pt: {
                            iftaLabel: {
                                hooks: {
                                    onInit: () => {
                                        hooksCalled.push('onInit');
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

            const hookFixture = TestBed.createComponent(IftaLabel);
            hookFixture.detectChanges();

            expect(hooksCalled).toContain('onInit');
            expect(hooksCalled).toContain('onAfterViewChecked');

            hookFixture.destroy();

            expect(hooksCalled).toContain('onDestroy');
        });
    });
});
