import { Component, DebugElement, input } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Overlay } from './overlay';

describe('Overlay', () => {
    describe('PassThrough API', () => {
        @Component({
            standalone: true,
            imports: [Overlay],
            template: `<p-overlay [visible]="visible()" [mode]="mode()" [pt]="pt()">
                <div class="test-content">Test Content</div>
            </p-overlay>`
        })
        class TestPTOverlayComponent {
            visible = input<boolean>(false);
            mode = input<'overlay' | 'modal'>('overlay');
            pt = input<any>();
        }

        let fixture: ComponentFixture<TestPTOverlayComponent>;
        let overlayElement: DebugElement;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestPTOverlayComponent, BrowserAnimationsModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestPTOverlayComponent);
            fixture.componentRef.setInput('visible', true);
            fixture.detectChanges();
            overlayElement = fixture.debugElement.query(By.css('p-overlay'));
        });

        describe('Case 1: Simple string classes', () => {
            it('should apply string class to host section', fakeAsync(() => {
                fixture.componentRef.setInput('pt', { host: 'HOST_CLASS' });
                fixture.detectChanges();
                tick();

                expect(overlayElement.nativeElement.classList.contains('HOST_CLASS')).toBe(true);
                flush();
            }));

            it('should apply string class to root section', fakeAsync(() => {
                fixture.componentRef.setInput('pt', { root: 'ROOT_CLASS' });
                fixture.detectChanges();
                tick();

                const rootElement = overlayElement.nativeElement.querySelector('[data-pc-section="root"]');
                expect(rootElement?.classList.contains('ROOT_CLASS')).toBe(true);
                flush();
            }));

            it('should apply string class to content section', fakeAsync(() => {
                fixture.componentRef.setInput('pt', { content: 'CONTENT_CLASS' });
                fixture.detectChanges();
                tick();

                const contentElement = overlayElement.nativeElement.querySelector('[data-pc-section="content"]');
                expect(contentElement?.classList.contains('CONTENT_CLASS')).toBe(true);
                flush();
            }));
        });

        describe('Case 2: Objects (class, style, data, aria)', () => {
            it('should apply object with class to host section', fakeAsync(() => {
                fixture.componentRef.setInput('pt', { host: { class: 'HOST_OBJ_CLASS' } });
                fixture.detectChanges();
                tick();

                expect(overlayElement.nativeElement.classList.contains('HOST_OBJ_CLASS')).toBe(true);
                flush();
            }));

            it('should apply object with class to root section', fakeAsync(() => {
                fixture.componentRef.setInput('pt', { root: { class: 'ROOT_OBJ_CLASS' } });
                fixture.detectChanges();
                tick();

                const rootElement = overlayElement.nativeElement.querySelector('[data-pc-section="root"]');
                expect(rootElement?.classList.contains('ROOT_OBJ_CLASS')).toBe(true);
                flush();
            }));

            it('should apply object with style to root section', fakeAsync(() => {
                fixture.componentRef.setInput('pt', { root: { style: { color: 'red', fontSize: '20px' } } });
                fixture.detectChanges();
                tick();

                const rootElement = overlayElement.nativeElement.querySelector('[data-pc-section="root"]');
                expect(rootElement?.style.color).toBe('red');
                expect(rootElement?.style.fontSize).toBe('20px');
                flush();
            }));

            it('should apply object with data attributes to root section', fakeAsync(() => {
                fixture.componentRef.setInput('pt', { root: { 'data-test-id': 'root-test' } });
                fixture.detectChanges();
                tick();

                const rootElement = overlayElement.nativeElement.querySelector('[data-pc-section="root"]');
                expect(rootElement?.getAttribute('data-test-id')).toBe('root-test');
                flush();
            }));

            it('should apply object with aria attributes to root section', fakeAsync(() => {
                fixture.componentRef.setInput('pt', { root: { 'aria-label': 'Overlay Test' } });
                fixture.detectChanges();
                tick();

                const rootElement = overlayElement.nativeElement.querySelector('[data-pc-section="root"]');
                expect(rootElement?.getAttribute('aria-label')).toBe('Overlay Test');
                flush();
            }));

            it('should apply object with multiple properties to content section', fakeAsync(() => {
                fixture.componentRef.setInput('pt', {
                    content: {
                        class: 'CONTENT_OBJ_CLASS',
                        style: { backgroundColor: 'blue' },
                        'data-section': 'content'
                    }
                });
                fixture.detectChanges();
                tick();

                const contentElement = overlayElement.nativeElement.querySelector('[data-pc-section="content"]');
                expect(contentElement?.classList.contains('CONTENT_OBJ_CLASS')).toBe(true);
                expect(contentElement?.style.backgroundColor).toBe('blue');
                expect(contentElement?.getAttribute('data-section')).toBe('content');
                flush();
            }));
        });

        describe('Case 3: Mixed object and string values', () => {
            it('should apply mixed values to root section', fakeAsync(() => {
                fixture.componentRef.setInput('pt', {
                    root: {
                        class: 'ROOT_MIXED_CLASS',
                        style: { margin: '5px' }
                    }
                });
                fixture.detectChanges();
                tick();

                const rootElement = overlayElement.nativeElement.querySelector('[data-pc-section="root"]');
                expect(rootElement?.classList.contains('ROOT_MIXED_CLASS')).toBe(true);
                expect(rootElement?.style.margin).toBe('5px');
                flush();
            }));

            it('should apply mixed values to content section', fakeAsync(() => {
                fixture.componentRef.setInput('pt', {
                    content: {
                        class: 'CONTENT_MIXED_CLASS',
                        style: { padding: '10px' }
                    }
                });
                fixture.detectChanges();
                tick();

                const contentElement = overlayElement.nativeElement.querySelector('[data-pc-section="content"]');
                expect(contentElement?.classList.contains('CONTENT_MIXED_CLASS')).toBe(true);
                expect(contentElement?.style.padding).toBe('10px');
                flush();
            }));
        });

        describe('Case 4: Use variables from instance', () => {
            it('should access visible property from instance in pt', fakeAsync(() => {
                fixture.componentRef.setInput('visible', true);
                fixture.detectChanges();
                tick();

                fixture.componentRef.setInput('pt', {
                    root: ({ instance }: any) => ({
                        class: instance?.visible ? 'VISIBLE_CLASS' : 'HIDDEN_CLASS'
                    })
                });
                fixture.detectChanges();
                tick();

                const rootElement = overlayElement.nativeElement.querySelector('[data-pc-section="root"]');
                expect(rootElement?.classList.contains('VISIBLE_CLASS')).toBe(true);
                flush();
            }));

            it('should access modal property from instance in pt', fakeAsync(() => {
                fixture.componentRef.setInput('mode', 'modal');
                fixture.componentRef.setInput('visible', true);
                fixture.detectChanges();
                tick();

                fixture.componentRef.setInput('pt', {
                    content: ({ instance }: any) => ({
                        class: instance?.modal ? 'MODAL_CLASS' : 'OVERLAY_CLASS'
                    })
                });
                fixture.detectChanges();
                tick();

                const contentElement = overlayElement.nativeElement.querySelector('[data-pc-section="content"]');
                expect(contentElement?.classList.contains('MODAL_CLASS')).toBe(true);
                flush();
            }));
        });

        describe('Case 5: Event binding', () => {
            it('should bind onclick event to root section', fakeAsync(() => {
                let clicked = false;
                fixture.componentRef.setInput('pt', {
                    root: {
                        onclick: () => {
                            clicked = true;
                        }
                    }
                });
                fixture.detectChanges();
                tick();

                const rootElement = overlayElement.nativeElement.querySelector('[data-pc-section="root"]');
                rootElement?.click();
                expect(clicked).toBe(true);
                flush();
            }));

            it('should bind onclick event to content section', fakeAsync(() => {
                let clicked = false;
                fixture.componentRef.setInput('pt', {
                    content: {
                        onclick: () => {
                            clicked = true;
                        }
                    }
                });
                fixture.detectChanges();
                tick();

                const contentElement = overlayElement.nativeElement.querySelector('[data-pc-section="content"]');
                contentElement?.click();
                expect(clicked).toBe(true);
                flush();
            }));
        });

        describe('Case 6: Test emitters', () => {
            it('should access onShow emitter through instance in pt', fakeAsync(() => {
                let emitterAccessed = false;
                fixture.componentRef.setInput('pt', {
                    root: ({ instance }: any) => {
                        if (instance.onShow) {
                            emitterAccessed = true;
                        }
                        return {};
                    }
                });
                fixture.detectChanges();
                tick();

                expect(emitterAccessed).toBe(true);
                flush();
            }));

            it('should access onHide emitter through instance in pt', fakeAsync(() => {
                let emitterAccessed = false;
                fixture.componentRef.setInput('pt', {
                    root: ({ instance }: any) => {
                        if (instance.onHide) {
                            emitterAccessed = true;
                        }
                        return {};
                    }
                });
                fixture.detectChanges();
                tick();

                expect(emitterAccessed).toBe(true);
                flush();
            }));

            it('should access visibleChange emitter through instance in pt', fakeAsync(() => {
                let emitterAccessed = false;
                fixture.componentRef.setInput('pt', {
                    root: ({ instance }: any) => {
                        if (instance.visibleChange) {
                            emitterAccessed = true;
                        }
                        return {};
                    }
                });
                fixture.detectChanges();
                tick();

                expect(emitterAccessed).toBe(true);
                flush();
            }));
        });

        describe('Case 7: Inline test', () => {
            it('should apply inline styles and classes for root section', fakeAsync(() => {
                fixture.componentRef.setInput('pt', {
                    root: {
                        class: 'inline-test-root',
                        style: { display: 'block', padding: '15px' }
                    }
                });
                fixture.detectChanges();
                tick();

                const rootElement = overlayElement.nativeElement.querySelector('[data-pc-section="root"]');
                expect(rootElement?.classList.contains('inline-test-root')).toBe(true);
                expect(rootElement?.style.display).toBe('block');
                expect(rootElement?.style.padding).toBe('15px');
                flush();
            }));

            it('should apply inline styles and classes for content section', fakeAsync(() => {
                fixture.componentRef.setInput('pt', {
                    content: {
                        class: 'inline-test-content',
                        style: { width: '100%' }
                    }
                });
                fixture.detectChanges();
                tick();

                const contentElement = overlayElement.nativeElement.querySelector('[data-pc-section="content"]');
                expect(contentElement?.classList.contains('inline-test-content')).toBe(true);
                expect(contentElement?.style.width).toBe('100%');
                flush();
            }));
        });

        describe('Case 8: Test hooks', () => {
            it('should call onAfterViewInit hook in pt', fakeAsync(() => {
                let hookCalled = false;
                const hookFixture = TestBed.createComponent(TestPTOverlayComponent);
                hookFixture.componentRef.setInput('visible', true);
                hookFixture.componentRef.setInput('pt', {
                    hooks: {
                        onAfterViewInit: () => {
                            hookCalled = true;
                        }
                    }
                });
                hookFixture.detectChanges();
                tick();

                expect(hookCalled).toBe(true);
                hookFixture.destroy();
                flush();
            }));

            it('should call onAfterContentInit hook in pt', fakeAsync(() => {
                let hookCalled = false;
                const hookFixture = TestBed.createComponent(TestPTOverlayComponent);
                hookFixture.componentRef.setInput('visible', true);
                hookFixture.componentRef.setInput('pt', {
                    hooks: {
                        onAfterContentInit: () => {
                            hookCalled = true;
                        }
                    }
                });
                hookFixture.detectChanges();
                tick();

                expect(hookCalled).toBe(true);
                hookFixture.destroy();
                flush();
            }));

            it('should call onAfterViewChecked hook in pt', fakeAsync(() => {
                let hookCalled = false;
                const hookFixture = TestBed.createComponent(TestPTOverlayComponent);
                hookFixture.componentRef.setInput('visible', true);
                hookFixture.componentRef.setInput('pt', {
                    hooks: {
                        onAfterViewChecked: () => {
                            hookCalled = true;
                        }
                    }
                });
                hookFixture.detectChanges();
                tick();

                expect(hookCalled).toBe(true);
                hookFixture.destroy();
                flush();
            }));

            it('should call onDestroy hook in pt', fakeAsync(() => {
                let hookCalled = false;
                const hookFixture = TestBed.createComponent(TestPTOverlayComponent);
                hookFixture.componentRef.setInput('visible', true);
                hookFixture.componentRef.setInput('pt', {
                    hooks: {
                        onDestroy: () => {
                            hookCalled = true;
                        }
                    }
                });
                hookFixture.detectChanges();
                tick();

                hookFixture.destroy();
                expect(hookCalled).toBe(true);
                flush();
            }));
        });
    });
});
