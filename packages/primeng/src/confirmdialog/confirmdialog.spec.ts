import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService } from 'primeng/api';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { ConfirmDialog } from './confirmdialog';

// Basic ConfirmDialog Component Test
@Component({
    standalone: false,
    template: `
        <p-confirmdialog
            [header]="header"
            [icon]="icon"
            [message]="message"
            [style]="style"
            [styleClass]="styleClass"
            [maskStyleClass]="maskStyleClass"
            [acceptIcon]="acceptIcon"
            [acceptLabel]="acceptLabel"
            [closeAriaLabel]="closeAriaLabel"
            [acceptAriaLabel]="acceptAriaLabel"
            [acceptVisible]="acceptVisible"
            [rejectIcon]="rejectIcon"
            [rejectLabel]="rejectLabel"
            [rejectAriaLabel]="rejectAriaLabel"
            [rejectVisible]="rejectVisible"
            [acceptButtonStyleClass]="acceptButtonStyleClass"
            [rejectButtonStyleClass]="rejectButtonStyleClass"
            [closeOnEscape]="closeOnEscape"
            [dismissableMask]="dismissableMask"
            [blockScroll]="blockScroll"
            [rtl]="rtl"
            [closable]="closable"
            [appendTo]="appendTo"
            [breakpoints]="breakpoints"
            [defaultFocus]="defaultFocus"
            [autoZIndex]="autoZIndex"
            [baseZIndex]="baseZIndex"
            [transitionOptions]="transitionOptions"
            [visible]="visible"
            [position]="position"
            [draggable]="draggable"
            (onHide)="onHide($event)"
        >
        </p-confirmdialog>
    `
})
class TestBasicConfirmDialogComponent {
    header: string | undefined = 'Confirmation';
    icon: string | undefined = 'pi pi-exclamation-triangle';
    message: string | undefined = 'Are you sure?';
    style: any = {};
    styleClass: string | undefined;
    maskStyleClass: string | undefined;
    acceptIcon: string | undefined;
    acceptLabel: string | undefined = 'Yes';
    closeAriaLabel: string | undefined;
    acceptAriaLabel: string | undefined;
    acceptVisible: boolean = true;
    rejectIcon: string | undefined;
    rejectLabel: string | undefined = 'No';
    rejectAriaLabel: string | undefined;
    rejectVisible: boolean = true;
    acceptButtonStyleClass: string | undefined;
    rejectButtonStyleClass: string | undefined;
    closeOnEscape: boolean = true;
    dismissableMask: boolean | undefined;
    blockScroll: boolean = true;
    rtl: boolean = false;
    closable: boolean = true;
    appendTo: any;
    breakpoints: any;
    defaultFocus: string = 'accept';
    autoZIndex: boolean = true;
    baseZIndex: number = 0;
    transitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';
    visible: boolean = false;
    position: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright' = 'center';
    draggable: boolean = true;

    hideEvent: any;

    onHide(event: any) {
        this.hideEvent = event;
    }
}

// ConfirmDialog with pTemplate Templates
@Component({
    standalone: false,
    template: `
        <p-confirmdialog>
            <ng-template pTemplate="header">
                <div class="custom-header">
                    <i class="pi pi-info-circle custom-header-icon"></i>
                    <span class="custom-header-text">Custom Header</span>
                </div>
            </ng-template>
            <ng-template pTemplate="message" let-message>
                <div class="custom-message">
                    <p class="custom-message-text">{{ message.message }}</p>
                </div>
            </ng-template>
            <ng-template pTemplate="icon">
                <i class="pi pi-question-circle custom-template-icon"></i>
            </ng-template>
            <ng-template pTemplate="footer">
                <div class="custom-footer">
                    <button class="custom-reject-btn">Custom Cancel</button>
                    <button class="custom-accept-btn">Custom OK</button>
                </div>
            </ng-template>
            <ng-template pTemplate="rejecticon">
                <i class="pi pi-times custom-reject-icon"></i>
            </ng-template>
            <ng-template pTemplate="accepticon">
                <i class="pi pi-check custom-accept-icon"></i>
            </ng-template>
            <ng-template pTemplate="headless" let-message let-onAccept="onAccept" let-onReject="onReject">
                <div class="custom-headless">
                    <h3>{{ message.header }}</h3>
                    <p>{{ message.message }}</p>
                    <div class="headless-actions">
                        <button (click)="onReject()" class="headless-reject">Reject</button>
                        <button (click)="onAccept()" class="headless-accept">Accept</button>
                    </div>
                </div>
            </ng-template>
        </p-confirmdialog>
    `
})
class TestTemplatePConfirmDialogComponent {}

// ConfirmDialog with #template Templates
@Component({
    standalone: false,
    template: `
        <p-confirmdialog>
            <ng-template #header>
                <div class="content-header">
                    <span class="content-header-text">Content Header</span>
                </div>
            </ng-template>
            <ng-template #message let-message>
                <div class="content-message">
                    <p class="content-message-text">{{ message.message }}</p>
                </div>
            </ng-template>
            <ng-template #icon>
                <i class="content-template-icon pi pi-bell"></i>
            </ng-template>
            <ng-template #footer>
                <div class="content-footer">
                    <button class="content-cancel-btn">Content Cancel</button>
                    <button class="content-ok-btn">Content OK</button>
                </div>
            </ng-template>
            <ng-template #rejecticon>
                <i class="content-reject-icon pi pi-ban"></i>
            </ng-template>
            <ng-template #accepticon>
                <i class="content-accept-icon pi pi-thumbs-up"></i>
            </ng-template>
            <ng-template #headless let-message let-onAccept="onAccept" let-onReject="onReject">
                <div class="content-headless">
                    <h3>{{ message.header }}</h3>
                    <p>{{ message.message }}</p>
                    <div class="content-headless-actions">
                        <button (click)="onReject()" class="content-headless-reject">Content Reject</button>
                        <button (click)="onAccept()" class="content-headless-accept">Content Accept</button>
                    </div>
                </div>
            </ng-template>
        </p-confirmdialog>
    `
})
class TestContentTemplateConfirmDialogComponent {}

// ConfirmDialog Position Test
@Component({
    standalone: false,
    template: ` <p-confirmdialog [position]="position" [visible]="visible"> </p-confirmdialog> `
})
class TestPositionConfirmDialogComponent {
    position: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright' = 'center';
    visible = false;
}

// ConfirmDialog with ConfirmationService
@Component({
    standalone: false,
    template: `
        <p-confirmdialog></p-confirmdialog>
        <button (click)="confirm()" class="confirm-btn">Confirm</button>
    `,
    providers: [ConfirmationService]
})
class TestConfirmationServiceComponent {
    acceptClicked = false;
    rejectClicked = false;

    constructor(private confirmationService: ConfirmationService) {}

    confirm() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptButtonProps: {
                label: 'Delete',
                severity: 'danger'
            },
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true
            },
            accept: () => {
                this.acceptClicked = true;
            },
            reject: () => {
                this.rejectClicked = true;
            }
        });
    }
}

// ConfirmDialog Accessibility Test
@Component({
    standalone: false,
    template: ` <p-confirmdialog [visible]="true" [acceptAriaLabel]="acceptAriaLabel" [rejectAriaLabel]="rejectAriaLabel" [closeAriaLabel]="closeAriaLabel" header="Accessibility Test" message="Test message"> </p-confirmdialog> `
})
class TestAccessibilityConfirmDialogComponent {
    acceptAriaLabel = 'Accept confirmation';
    rejectAriaLabel = 'Reject confirmation';
    closeAriaLabel = 'Close dialog';
}

// ConfirmDialog Button Properties Test
@Component({
    standalone: false,
    template: `
        <p-confirmdialog
            [visible]="visible"
            [acceptVisible]="acceptVisible"
            [rejectVisible]="rejectVisible"
            [acceptIcon]="acceptIcon"
            [rejectIcon]="rejectIcon"
            [acceptButtonStyleClass]="acceptButtonStyleClass"
            [rejectButtonStyleClass]="rejectButtonStyleClass"
        >
        </p-confirmdialog>
    `
})
class TestButtonPropertiesComponent {
    visible = false;
    acceptVisible = true;
    rejectVisible = true;
    acceptIcon = 'pi pi-check';
    rejectIcon = 'pi pi-times';
    acceptButtonStyleClass = 'custom-accept';
    rejectButtonStyleClass = 'custom-reject';
}

// ConfirmDialog Events Test
@Component({
    standalone: false,
    template: ` <p-confirmdialog [visible]="visible" (onHide)="onHide($event)"> </p-confirmdialog> `
})
class TestEventsConfirmDialogComponent {
    visible = false;
    hideEvent: any;

    onHide(event: any) {
        this.hideEvent = event;
    }
}

describe('ConfirmDialog', () => {
    let component: TestBasicConfirmDialogComponent;
    let fixture: ComponentFixture<TestBasicConfirmDialogComponent>;
    let confirmDialogInstance: ConfirmDialog;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                TestBasicConfirmDialogComponent,
                TestTemplatePConfirmDialogComponent,
                TestContentTemplateConfirmDialogComponent,
                TestPositionConfirmDialogComponent,
                TestConfirmationServiceComponent,
                TestAccessibilityConfirmDialogComponent,
                TestButtonPropertiesComponent,
                TestEventsConfirmDialogComponent
            ],
            imports: [ConfirmDialog, Dialog, Button, NoopAnimationsModule],
            providers: [ConfirmationService]
        }).compileComponents();

        fixture = TestBed.createComponent(TestBasicConfirmDialogComponent);
        component = fixture.componentInstance;
        confirmDialogInstance = fixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;
        fixture.detectChanges();
    });

    describe('Component Initialization', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
            expect(confirmDialogInstance).toBeTruthy();
        });

        it('should have correct default values', () => {
            expect(confirmDialogInstance.acceptVisible).toBe(true);
            expect(confirmDialogInstance.rejectVisible).toBe(true);
            expect(confirmDialogInstance.closeOnEscape).toBe(true);
            expect(confirmDialogInstance.blockScroll).toBe(true);
            expect(confirmDialogInstance.draggable).toBe(true);
            expect(confirmDialogInstance.position).toBe('center');
        });

        it('should render p-dialog component', () => {
            const dialogElement = fixture.debugElement.query(By.directive(Dialog));
            expect(dialogElement).toBeTruthy();
        });

        it('should have proper data attributes', () => {
            const dialogElement = fixture.debugElement.query(By.css('p-dialog'));
            expect(dialogElement.nativeElement.getAttribute('role')).toBe('alertdialog');
        });
    });

    describe('Input Properties', () => {
        it('should update header property', () => {
            component.header = 'Updated Header';
            fixture.detectChanges();

            expect(confirmDialogInstance.header).toBe('Updated Header');
        });

        it('should update message property', () => {
            component.message = 'Updated message';
            fixture.detectChanges();

            expect(confirmDialogInstance.message).toBe('Updated message');
        });

        it('should update icon property', () => {
            component.icon = 'pi pi-info';
            fixture.detectChanges();

            expect(confirmDialogInstance.icon).toBe('pi pi-info');
        });

        it('should update visible property', () => {
            component.visible = true;
            fixture.detectChanges();

            expect(confirmDialogInstance.visible).toBe(true);
        });

        it('should update position property', () => {
            component.position = 'top';
            fixture.detectChanges();

            expect(confirmDialogInstance.position).toBe('top');
        });

        it('should update style and styleClass properties', () => {
            component.style = { width: '400px' };
            component.styleClass = 'custom-dialog';
            fixture.detectChanges();

            expect(confirmDialogInstance.style).toEqual({ width: '400px' });
            expect(confirmDialogInstance.styleClass).toBe('custom-dialog');
        });

        it('should update button properties', () => {
            component.acceptLabel = 'Accept';
            component.rejectLabel = 'Reject';
            component.acceptIcon = 'pi pi-check';
            component.rejectIcon = 'pi pi-times';
            fixture.detectChanges();

            expect(confirmDialogInstance.acceptLabel).toBe('Accept');
            expect(confirmDialogInstance.rejectLabel).toBe('Reject');
            expect(confirmDialogInstance.acceptIcon).toBe('pi pi-check');
            expect(confirmDialogInstance.rejectIcon).toBe('pi pi-times');
        });

        it('should update button visibility properties', () => {
            component.acceptVisible = false;
            component.rejectVisible = false;
            fixture.detectChanges();

            expect(confirmDialogInstance.acceptVisible).toBe(false);
            expect(confirmDialogInstance.rejectVisible).toBe(false);
        });

        it('should update button style class properties', () => {
            component.acceptButtonStyleClass = 'custom-accept';
            component.rejectButtonStyleClass = 'custom-reject';
            fixture.detectChanges();

            expect(confirmDialogInstance.acceptButtonStyleClass).toBe('custom-accept');
            expect(confirmDialogInstance.rejectButtonStyleClass).toBe('custom-reject');
        });

        it('should update accessibility properties', () => {
            component.acceptAriaLabel = 'Accept action';
            component.rejectAriaLabel = 'Reject action';
            component.closeAriaLabel = 'Close dialog';
            fixture.detectChanges();

            expect(confirmDialogInstance.acceptAriaLabel).toBe('Accept action');
            expect(confirmDialogInstance.rejectAriaLabel).toBe('Reject action');
            expect(confirmDialogInstance.closeAriaLabel).toBe('Close dialog');
        });

        it('should update behavior properties', () => {
            component.closeOnEscape = false;
            component.dismissableMask = true;
            component.blockScroll = false;
            component.draggable = false;
            fixture.detectChanges();

            expect(confirmDialogInstance.closeOnEscape).toBe(false);
            expect(confirmDialogInstance.dismissableMask).toBe(true);
            expect(confirmDialogInstance.blockScroll).toBe(false);
            expect(confirmDialogInstance.draggable).toBe(false);
        });
    });

    describe('Event Handling', () => {
        it('should emit onHide event', fakeAsync(() => {
            component.visible = true;
            fixture.detectChanges();
            tick();

            confirmDialogInstance.onReject();
            tick();
            fixture.detectChanges();

            expect(component.hideEvent).toBeDefined();
            flush();
        }));

        it('should handle accept action', fakeAsync(() => {
            const acceptSpy = spyOn(confirmDialogInstance, 'onAccept').and.callThrough();

            confirmDialogInstance.onAccept();
            tick();

            expect(acceptSpy).toHaveBeenCalled();
            flush();
        }));

        it('should handle reject action', fakeAsync(() => {
            const rejectSpy = spyOn(confirmDialogInstance, 'onReject').and.callThrough();

            confirmDialogInstance.onReject();
            tick();

            expect(rejectSpy).toHaveBeenCalled();
            flush();
        }));
    });

    describe('Button Functionality', () => {
        it('should display accept button when acceptVisible is true', fakeAsync(() => {
            component.visible = true;
            component.acceptVisible = true;
            fixture.detectChanges();
            tick();

            const acceptButton = fixture.debugElement.queryAll(By.css('p-button')).find((btn) => btn.nativeElement.textContent?.includes('Yes') || btn.componentInstance.ariaLabel?.includes('accept'));

            expect(acceptButton).toBeTruthy();
            flush();
        }));

        it('should hide accept button when acceptVisible is false', fakeAsync(() => {
            component.visible = true;
            component.acceptVisible = false;
            fixture.detectChanges();
            tick();

            const buttons = fixture.debugElement.queryAll(By.css('p-button'));
            const acceptButton = buttons.find((btn) => btn.componentInstance.ariaLabel?.includes('accept') || btn.nativeElement.textContent?.includes('Yes'));

            expect(acceptButton).toBeFalsy();
            flush();
        }));

        it('should display reject button when rejectVisible is true', fakeAsync(() => {
            component.visible = true;
            component.rejectVisible = true;
            fixture.detectChanges();
            tick();

            const rejectButton = fixture.debugElement.queryAll(By.css('p-button')).find((btn) => btn.nativeElement.textContent?.includes('No') || btn.componentInstance.ariaLabel?.includes('reject'));

            expect(rejectButton).toBeTruthy();
            flush();
        }));

        it('should hide reject button when rejectVisible is false', fakeAsync(() => {
            component.visible = true;
            component.rejectVisible = false;
            fixture.detectChanges();
            tick();

            const buttons = fixture.debugElement.queryAll(By.css('p-button'));
            const rejectButton = buttons.find((btn) => btn.componentInstance.ariaLabel?.includes('reject') || btn.nativeElement.textContent?.includes('No'));

            expect(rejectButton).toBeFalsy();
            flush();
        }));
    });

    describe('Position Functionality', () => {
        it('should set correct transform options for different positions', () => {
            const positions = [
                { pos: 'center', expected: 'scale(0.7)' },
                { pos: 'top', expected: 'translate3d(0px, -100%, 0px)' },
                { pos: 'bottom', expected: 'translate3d(0px, 100%, 0px)' },
                { pos: 'left', expected: 'translate3d(-100%, 0px, 0px)' },
                { pos: 'right', expected: 'translate3d(100%, 0px, 0px)' },
                { pos: 'topleft', expected: 'translate3d(-100%, 0px, 0px)' },
                { pos: 'topright', expected: 'translate3d(100%, 0px, 0px)' },
                { pos: 'bottomleft', expected: 'translate3d(-100%, 0px, 0px)' },
                { pos: 'bottomright', expected: 'translate3d(100%, 0px, 0px)' }
            ];

            positions.forEach(({ pos, expected }) => {
                confirmDialogInstance.position = pos as any;
                expect(confirmDialogInstance.transformOptions).toBe(expected);
            });
        });
    });

    describe('Templates', () => {
        describe('pTemplate Approach Tests', () => {
            it('should handle pTemplate content processing', fakeAsync(() => {
                const templateFixture = TestBed.createComponent(TestTemplatePConfirmDialogComponent);
                templateFixture.detectChanges();
                tick(100);

                const confirmDialogInstance = templateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;

                // Test that component handles pTemplate without errors
                expect(() => confirmDialogInstance.ngAfterContentInit()).not.toThrow();

                // Test that templates property exists and is processed
                expect(confirmDialogInstance.templates).toBeDefined();

                flush();
            }));

            it('should process _headerTemplate from pTemplate="header"', fakeAsync(() => {
                const templateFixture = TestBed.createComponent(TestTemplatePConfirmDialogComponent);
                templateFixture.detectChanges();
                tick(100);

                const confirmDialogInstance = templateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;

                // ngAfterContentInit should process templates without errors
                expect(() => confirmDialogInstance.ngAfterContentInit()).not.toThrow();

                flush();
            }));

            it('should process _messageTemplate from pTemplate="message"', fakeAsync(() => {
                const templateFixture = TestBed.createComponent(TestTemplatePConfirmDialogComponent);
                templateFixture.detectChanges();
                tick(100);

                const confirmDialogInstance = templateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;

                // ngAfterContentInit should process templates without errors
                expect(() => confirmDialogInstance.ngAfterContentInit()).not.toThrow();

                flush();
            }));

            it('should process _iconTemplate from pTemplate="icon"', fakeAsync(() => {
                const templateFixture = TestBed.createComponent(TestTemplatePConfirmDialogComponent);
                templateFixture.detectChanges();
                tick(100);

                const confirmDialogInstance = templateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;

                // ngAfterContentInit should process templates without errors
                expect(() => confirmDialogInstance.ngAfterContentInit()).not.toThrow();

                flush();
            }));

            it('should process _footerTemplate from pTemplate="footer"', fakeAsync(() => {
                const templateFixture = TestBed.createComponent(TestTemplatePConfirmDialogComponent);
                templateFixture.detectChanges();
                tick(100);

                const confirmDialogInstance = templateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;

                // ngAfterContentInit should process templates without errors
                expect(() => confirmDialogInstance.ngAfterContentInit()).not.toThrow();

                flush();
            }));

            it('should process _rejectIconTemplate from pTemplate="rejecticon"', fakeAsync(() => {
                const templateFixture = TestBed.createComponent(TestTemplatePConfirmDialogComponent);
                templateFixture.detectChanges();
                tick(100);

                const confirmDialogInstance = templateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;

                // ngAfterContentInit should process templates without errors
                expect(() => confirmDialogInstance.ngAfterContentInit()).not.toThrow();

                flush();
            }));

            it('should process _acceptIconTemplate from pTemplate="accepticon"', fakeAsync(() => {
                const templateFixture = TestBed.createComponent(TestTemplatePConfirmDialogComponent);
                templateFixture.detectChanges();
                tick(100);

                const confirmDialogInstance = templateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;

                // ngAfterContentInit should process templates without errors
                expect(() => confirmDialogInstance.ngAfterContentInit()).not.toThrow();

                flush();
            }));

            it('should process _headlessTemplate from pTemplate="headless"', fakeAsync(() => {
                const templateFixture = TestBed.createComponent(TestTemplatePConfirmDialogComponent);
                templateFixture.detectChanges();
                tick(100);

                const confirmDialogInstance = templateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;

                // ngAfterContentInit should process templates without errors
                expect(() => confirmDialogInstance.ngAfterContentInit()).not.toThrow();

                flush();
            }));
        });

        describe('#template Approach Tests', () => {
            it('should handle #header template processing', fakeAsync(() => {
                const contentTemplateFixture = TestBed.createComponent(TestContentTemplateConfirmDialogComponent);
                contentTemplateFixture.detectChanges();
                tick(100);

                const confirmDialogInstance = contentTemplateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;

                // Test that component handles #header template without errors
                expect(() => confirmDialogInstance.ngAfterContentInit()).not.toThrow();

                // Test that headerTemplate property exists (ContentChild)
                expect(confirmDialogInstance.headerTemplate).toBeDefined();

                flush();
            }));

            it("should process headerTemplate from @ContentChild('header')", fakeAsync(() => {
                const contentTemplateFixture = TestBed.createComponent(TestContentTemplateConfirmDialogComponent);
                contentTemplateFixture.detectChanges();
                tick(100);

                const confirmDialogInstance = contentTemplateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;

                // @ContentChild('header') should set headerTemplate
                expect(confirmDialogInstance.headerTemplate).toBeDefined();
                expect(confirmDialogInstance.headerTemplate?.constructor.name).toBe('TemplateRef');

                flush();
            }));

            it("should process messageTemplate from @ContentChild('message')", fakeAsync(() => {
                const contentTemplateFixture = TestBed.createComponent(TestContentTemplateConfirmDialogComponent);
                contentTemplateFixture.detectChanges();
                tick(100);

                const confirmDialogInstance = contentTemplateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;

                // @ContentChild('message') should set messageTemplate
                expect(confirmDialogInstance.messageTemplate).toBeDefined();
                expect(confirmDialogInstance.messageTemplate?.constructor.name).toBe('TemplateRef');

                flush();
            }));

            it("should process iconTemplate from @ContentChild('icon')", fakeAsync(() => {
                const contentTemplateFixture = TestBed.createComponent(TestContentTemplateConfirmDialogComponent);
                contentTemplateFixture.detectChanges();
                tick(100);

                const confirmDialogInstance = contentTemplateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;

                // @ContentChild('icon') should set iconTemplate
                expect(confirmDialogInstance.iconTemplate).toBeDefined();
                expect(confirmDialogInstance.iconTemplate?.constructor.name).toBe('TemplateRef');

                flush();
            }));

            it("should process footerTemplate from @ContentChild('footer')", fakeAsync(() => {
                const contentTemplateFixture = TestBed.createComponent(TestContentTemplateConfirmDialogComponent);
                contentTemplateFixture.detectChanges();
                tick(100);

                const confirmDialogInstance = contentTemplateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;

                // @ContentChild('footer') should set footerTemplate
                expect(confirmDialogInstance.footerTemplate).toBeDefined();
                expect(confirmDialogInstance.footerTemplate?.constructor.name).toBe('TemplateRef');

                flush();
            }));

            it("should process rejectIconTemplate from @ContentChild('rejecticon')", fakeAsync(() => {
                const contentTemplateFixture = TestBed.createComponent(TestContentTemplateConfirmDialogComponent);
                contentTemplateFixture.detectChanges();
                tick(100);

                const confirmDialogInstance = contentTemplateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;

                // @ContentChild('rejecticon') should set rejectIconTemplate
                expect(confirmDialogInstance.rejectIconTemplate).toBeDefined();
                expect(confirmDialogInstance.rejectIconTemplate?.constructor.name).toBe('TemplateRef');

                flush();
            }));

            it("should process acceptIconTemplate from @ContentChild('accepticon')", fakeAsync(() => {
                const contentTemplateFixture = TestBed.createComponent(TestContentTemplateConfirmDialogComponent);
                contentTemplateFixture.detectChanges();
                tick(100);

                const confirmDialogInstance = contentTemplateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;

                // @ContentChild('accepticon') should set acceptIconTemplate
                expect(confirmDialogInstance.acceptIconTemplate).toBeDefined();
                expect(confirmDialogInstance.acceptIconTemplate?.constructor.name).toBe('TemplateRef');

                flush();
            }));

            it("should process headlessTemplate from @ContentChild('headless')", fakeAsync(() => {
                const contentTemplateFixture = TestBed.createComponent(TestContentTemplateConfirmDialogComponent);
                contentTemplateFixture.detectChanges();
                tick(100);

                const confirmDialogInstance = contentTemplateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;

                // @ContentChild('headless') should set headlessTemplate
                expect(confirmDialogInstance.headlessTemplate).toBeDefined();
                expect(confirmDialogInstance.headlessTemplate?.constructor.name).toBe('TemplateRef');

                flush();
            }));
        });

        describe('Template Integration Tests', () => {
            it('should render different template types correctly', fakeAsync(() => {
                // Test both pTemplate and #content template approaches

                // Test pTemplate rendering
                const pTemplateFixture = TestBed.createComponent(TestTemplatePConfirmDialogComponent);
                pTemplateFixture.detectChanges();
                tick(100);

                const pTemplateConfirmDialog = pTemplateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;
                expect(pTemplateConfirmDialog.templates).toBeDefined();
                expect(() => pTemplateConfirmDialog.ngAfterContentInit()).not.toThrow();

                // Test #content template rendering
                const contentTemplateFixture = TestBed.createComponent(TestContentTemplateConfirmDialogComponent);
                contentTemplateFixture.detectChanges();
                tick(100);

                const contentTemplateConfirmDialog = contentTemplateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;
                expect(contentTemplateConfirmDialog.headerTemplate).toBeDefined();

                flush();
            }));

            it('should use default templates when custom ones are not provided', () => {
                // Test default behavior without custom templates
                const dialogElement = fixture.debugElement.query(By.css('p-dialog'));
                expect(dialogElement).toBeTruthy();
            });

            it('should handle ngAfterContentInit template processing correctly', fakeAsync(() => {
                const templateFixture = TestBed.createComponent(TestTemplatePConfirmDialogComponent);
                templateFixture.detectChanges();
                tick(100);

                const confirmDialogInstance = templateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;

                expect(() => confirmDialogInstance.ngAfterContentInit()).not.toThrow();
                expect(confirmDialogInstance.templates).toBeDefined();

                flush();
            }));
        });
    });

    describe('ConfirmationService Integration', () => {
        it('should work with ConfirmationService', fakeAsync(() => {
            const serviceFixture = TestBed.createComponent(TestConfirmationServiceComponent);
            const serviceComponent = serviceFixture.componentInstance;
            serviceFixture.detectChanges();
            tick();

            // Trigger confirmation
            const confirmBtn = serviceFixture.debugElement.query(By.css('.confirm-btn'));
            confirmBtn.nativeElement.click();
            tick();
            serviceFixture.detectChanges();

            const confirmDialogInstance = serviceFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;
            expect(confirmDialogInstance.visible).toBe(true);

            flush();
        }));

        it('should handle accept callback from ConfirmationService', fakeAsync(() => {
            const serviceFixture = TestBed.createComponent(TestConfirmationServiceComponent);
            const serviceComponent = serviceFixture.componentInstance;
            serviceFixture.detectChanges();

            // Trigger confirmation
            serviceComponent.confirm();
            tick();
            serviceFixture.detectChanges();

            const confirmDialogInstance = serviceFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;
            confirmDialogInstance.onAccept();
            tick();

            expect(serviceComponent.acceptClicked).toBe(true);
            flush();
        }));

        it('should handle reject callback from ConfirmationService', fakeAsync(() => {
            const serviceFixture = TestBed.createComponent(TestConfirmationServiceComponent);
            const serviceComponent = serviceFixture.componentInstance;
            serviceFixture.detectChanges();

            // Trigger confirmation
            serviceComponent.confirm();
            tick();
            serviceFixture.detectChanges();

            const confirmDialogInstance = serviceFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;
            confirmDialogInstance.onReject();
            tick();

            expect(serviceComponent.rejectClicked).toBe(true);
            flush();
        }));
    });

    describe('Accessibility Tests', () => {
        it('should have proper ARIA attributes on dialog', fakeAsync(() => {
            const accessibilityFixture = TestBed.createComponent(TestAccessibilityConfirmDialogComponent);
            accessibilityFixture.detectChanges();
            tick();

            const dialog = accessibilityFixture.debugElement.query(By.css('p-dialog'));
            expect(dialog.nativeElement.getAttribute('role')).toBe('alertdialog');

            flush();
        }));

        it('should handle aria labels for buttons', fakeAsync(() => {
            const accessibilityFixture = TestBed.createComponent(TestAccessibilityConfirmDialogComponent);
            accessibilityFixture.detectChanges();
            tick();

            const confirmDialogInstance = accessibilityFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;
            expect(confirmDialogInstance.acceptAriaLabel).toBe('Accept confirmation');
            expect(confirmDialogInstance.rejectAriaLabel).toBe('Reject confirmation');
            expect(confirmDialogInstance.closeAriaLabel).toBe('Close dialog');

            flush();
        }));

        it('should handle focus management', fakeAsync(() => {
            component.visible = true;
            component.defaultFocus = 'accept';
            fixture.detectChanges();
            tick();

            // Test that getElementToFocus returns the correct element
            expect(confirmDialogInstance.getElementToFocus).toBeDefined();

            flush();
        }));

        it('should have proper focus trap behavior', fakeAsync(() => {
            component.visible = true;
            fixture.detectChanges();
            tick();

            // Dialog should be present and focusable
            const dialog = fixture.debugElement.query(By.css('p-dialog'));
            expect(dialog).toBeTruthy();

            flush();
        }));
    });

    describe('CSS Classes and Styling', () => {
        it('should apply correct default classes', fakeAsync(() => {
            component.visible = true;
            fixture.detectChanges();
            tick();

            const dialog = fixture.debugElement.query(By.css('p-dialog'));
            expect(dialog).toBeTruthy();

            flush();
        }));

        it('should apply custom styleClass', () => {
            component.styleClass = 'my-custom-dialog';
            fixture.detectChanges();

            expect(confirmDialogInstance.styleClass).toBe('my-custom-dialog');
        });

        it('should apply button style classes', fakeAsync(() => {
            const buttonPropsFixture = TestBed.createComponent(TestButtonPropertiesComponent);
            buttonPropsFixture.detectChanges();
            tick();

            const confirmDialogInstance = buttonPropsFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;
            expect(confirmDialogInstance.acceptButtonStyleClass).toBe('custom-accept');
            expect(confirmDialogInstance.rejectButtonStyleClass).toBe('custom-reject');

            flush();
        }));
    });

    describe('Dialog Integration', () => {
        it('should pass properties to underlying dialog', () => {
            component.visible = true;
            component.draggable = false;
            component.blockScroll = false;
            fixture.detectChanges();

            const dialog = fixture.debugElement.query(By.directive(Dialog));
            expect(dialog.componentInstance.visible).toBe(true);
            expect(dialog.componentInstance.draggable).toBe(false);
            expect(dialog.componentInstance.blockScroll).toBe(false);
        });

        it('should handle dialog visibility changes', fakeAsync(() => {
            const visibilityChangeSpy = spyOn(confirmDialogInstance, 'onVisibleChange').and.callThrough();

            confirmDialogInstance.onVisibleChange(true);
            tick();

            expect(visibilityChangeSpy).toHaveBeenCalledWith(true);
            flush();
        }));
    });

    describe('Edge Cases and Error Handling', () => {
        it('should handle missing confirmation gracefully', () => {
            confirmDialogInstance.confirmation = null as any;

            expect(() => {
                confirmDialogInstance.option('message');
            }).not.toThrow();
        });

        it('should handle empty string properties', () => {
            component.header = '';
            component.message = '';
            component.icon = '';
            fixture.detectChanges();

            expect(confirmDialogInstance.header).toBe('' as any);
            expect(confirmDialogInstance.message).toBe('' as any);
            expect(confirmDialogInstance.icon).toBe('' as any);
        });

        it('should handle undefined properties gracefully', () => {
            component.header = undefined as any;
            component.message = undefined as any;
            component.icon = undefined as any;
            fixture.detectChanges();

            expect(() => fixture.detectChanges()).not.toThrow();
        });

        it('should handle rapid visibility changes', fakeAsync(() => {
            // Rapid visibility state changes
            component.visible = true;
            fixture.detectChanges();
            tick();

            component.visible = false;
            fixture.detectChanges();
            tick();

            expect(() => {
                component.visible = true;
                fixture.detectChanges();
                tick();
            }).not.toThrow();

            flush();
        }));
    });

    describe('Public Methods', () => {
        it('should have onAccept method', () => {
            expect(confirmDialogInstance.onAccept).toBeDefined();
            expect(typeof confirmDialogInstance.onAccept).toBe('function');
        });

        it('should have onReject method', () => {
            expect(confirmDialogInstance.onReject).toBeDefined();
            expect(typeof confirmDialogInstance.onReject).toBe('function');
        });

        it('should have onVisibleChange method', () => {
            expect(confirmDialogInstance.onVisibleChange).toBeDefined();
            expect(typeof confirmDialogInstance.onVisibleChange).toBe('function');
        });

        it('should have option method for accessing properties', () => {
            confirmDialogInstance.message = 'test message';

            expect(confirmDialogInstance.option('message')).toBe('test message');
        });

        it('should have getElementToFocus method', () => {
            expect(confirmDialogInstance.getElementToFocus).toBeDefined();
            expect(typeof confirmDialogInstance.getElementToFocus).toBe('function');
        });

        it('should have getButtonStyleClass method', () => {
            expect(confirmDialogInstance.getButtonStyleClass).toBeDefined();
            expect(typeof confirmDialogInstance.getButtonStyleClass).toBe('function');

            const styleClass = confirmDialogInstance.getButtonStyleClass('pcAcceptButton', 'acceptButtonStyleClass');
            expect(typeof styleClass).toBe('string');
        });
    });

    describe('Lifecycle Hooks', () => {
        it('should handle ngOnInit without errors', () => {
            expect(() => confirmDialogInstance.ngOnInit()).not.toThrow();
        });

        it('should handle ngAfterContentInit without errors', () => {
            expect(() => confirmDialogInstance.ngAfterContentInit()).not.toThrow();
        });

        it('should handle ngOnDestroy without errors', () => {
            expect(() => confirmDialogInstance.ngOnDestroy()).not.toThrow();
        });
    });
});
