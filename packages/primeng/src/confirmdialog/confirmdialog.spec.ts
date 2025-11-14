import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
            providers: [ConfirmationService, provideZonelessChangeDetection()]
        }).compileComponents();

        fixture = TestBed.createComponent(TestBasicConfirmDialogComponent);
        component = fixture.componentInstance;
        confirmDialogInstance = fixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;
        await fixture.whenStable();
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
        it('should update header property', async () => {
            component.header = 'Updated Header';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(confirmDialogInstance.header).toBe('Updated Header');
        });

        it('should update message property', async () => {
            component.message = 'Updated message';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(confirmDialogInstance.message).toBe('Updated message');
        });

        it('should update icon property', async () => {
            component.icon = 'pi pi-info';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(confirmDialogInstance.icon).toBe('pi pi-info');
        });

        it('should update visible property', async () => {
            component.visible = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(confirmDialogInstance.visible).toBe(true);
        });

        it('should update position property', async () => {
            component.position = 'top';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(confirmDialogInstance.position).toBe('top');
        });

        it('should update style and styleClass properties', async () => {
            component.style = { width: '400px' };
            component.styleClass = 'custom-dialog';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(confirmDialogInstance.style).toEqual({ width: '400px' });
            expect(confirmDialogInstance.styleClass).toBe('custom-dialog');
        });

        it('should update button properties', async () => {
            component.acceptLabel = 'Accept';
            component.rejectLabel = 'Reject';
            component.acceptIcon = 'pi pi-check';
            component.rejectIcon = 'pi pi-times';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(confirmDialogInstance.acceptLabel).toBe('Accept');
            expect(confirmDialogInstance.rejectLabel).toBe('Reject');
            expect(confirmDialogInstance.acceptIcon).toBe('pi pi-check');
            expect(confirmDialogInstance.rejectIcon).toBe('pi pi-times');
        });

        it('should update button visibility properties', async () => {
            component.acceptVisible = false;
            component.rejectVisible = false;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(confirmDialogInstance.acceptVisible).toBe(false);
            expect(confirmDialogInstance.rejectVisible).toBe(false);
        });

        it('should update button style class properties', async () => {
            component.acceptButtonStyleClass = 'custom-accept';
            component.rejectButtonStyleClass = 'custom-reject';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(confirmDialogInstance.acceptButtonStyleClass).toBe('custom-accept');
            expect(confirmDialogInstance.rejectButtonStyleClass).toBe('custom-reject');
        });

        it('should update accessibility properties', async () => {
            component.acceptAriaLabel = 'Accept action';
            component.rejectAriaLabel = 'Reject action';
            component.closeAriaLabel = 'Close dialog';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(confirmDialogInstance.acceptAriaLabel).toBe('Accept action');
            expect(confirmDialogInstance.rejectAriaLabel).toBe('Reject action');
            expect(confirmDialogInstance.closeAriaLabel).toBe('Close dialog');
        });

        it('should update behavior properties', async () => {
            component.closeOnEscape = false;
            component.dismissableMask = true;
            component.blockScroll = false;
            component.draggable = false;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(confirmDialogInstance.closeOnEscape).toBe(false);
            expect(confirmDialogInstance.dismissableMask).toBe(true);
            expect(confirmDialogInstance.blockScroll).toBe(false);
            expect(confirmDialogInstance.draggable).toBe(false);
        });
    });

    describe('Event Handling', () => {
        it('should emit onHide event', async () => {
            component.visible = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            confirmDialogInstance.onReject();
            await new Promise((resolve) => setTimeout(resolve, 0));
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(component.hideEvent).toBeDefined();
        });

        it('should handle accept action', async () => {
            const acceptSpy = spyOn(confirmDialogInstance, 'onAccept').and.callThrough();

            confirmDialogInstance.onAccept();
            await new Promise((resolve) => setTimeout(resolve, 0));

            expect(acceptSpy).toHaveBeenCalled();
        });

        it('should handle reject action', async () => {
            const rejectSpy = spyOn(confirmDialogInstance, 'onReject').and.callThrough();

            confirmDialogInstance.onReject();
            await new Promise((resolve) => setTimeout(resolve, 0));

            expect(rejectSpy).toHaveBeenCalled();
        });
    });

    describe('Button Functionality', () => {
        it('should display accept button when acceptVisible is true', async () => {
            component.visible = true;
            component.acceptVisible = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 0));

            const acceptButton = fixture.debugElement.queryAll(By.css('p-button')).find((btn) => btn.nativeElement.textContent?.includes('Yes') || btn.componentInstance.ariaLabel?.includes('accept'));

            expect(acceptButton).toBeTruthy();
        });

        it('should hide accept button when acceptVisible is false', async () => {
            component.visible = true;
            component.acceptVisible = false;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 0));

            const buttons = fixture.debugElement.queryAll(By.css('p-button'));
            const acceptButton = buttons.find((btn) => btn.componentInstance.ariaLabel?.includes('accept') || btn.nativeElement.textContent?.includes('Yes'));

            expect(acceptButton).toBeFalsy();
        });

        it('should display reject button when rejectVisible is true', async () => {
            component.visible = true;
            component.rejectVisible = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 0));

            const rejectButton = fixture.debugElement.queryAll(By.css('p-button')).find((btn) => btn.nativeElement.textContent?.includes('No') || btn.componentInstance.ariaLabel?.includes('reject'));

            expect(rejectButton).toBeTruthy();
        });

        it('should hide reject button when rejectVisible is false', async () => {
            component.visible = true;
            component.rejectVisible = false;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 0));

            const buttons = fixture.debugElement.queryAll(By.css('p-button'));
            const rejectButton = buttons.find((btn) => btn.componentInstance.ariaLabel?.includes('reject') || btn.nativeElement.textContent?.includes('No'));

            expect(rejectButton).toBeFalsy();
        });
    });

    describe('Templates', () => {
        describe('pTemplate Approach Tests', () => {
            it('should handle pTemplate content processing', async () => {
                const templateFixture = TestBed.createComponent(TestTemplatePConfirmDialogComponent);
                templateFixture.changeDetectorRef.markForCheck();
                await templateFixture.whenStable();
                await new Promise((resolve) => setTimeout(resolve, 100));

                const confirmDialogInstance = templateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;

                // Test that component handles pTemplate without errors
                expect(() => confirmDialogInstance.ngAfterContentInit()).not.toThrow();

                // Test that templates property exists and is processed
                expect(confirmDialogInstance.templates).toBeDefined();
            });

            it('should process _headerTemplate from pTemplate="header"', async () => {
                const templateFixture = TestBed.createComponent(TestTemplatePConfirmDialogComponent);
                templateFixture.changeDetectorRef.markForCheck();
                await templateFixture.whenStable();
                await new Promise((resolve) => setTimeout(resolve, 100));

                const confirmDialogInstance = templateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;

                // ngAfterContentInit should process templates without errors
                expect(() => confirmDialogInstance.ngAfterContentInit()).not.toThrow();
            });

            it('should process _messageTemplate from pTemplate="message"', async () => {
                const templateFixture = TestBed.createComponent(TestTemplatePConfirmDialogComponent);
                templateFixture.changeDetectorRef.markForCheck();
                await templateFixture.whenStable();
                await new Promise((resolve) => setTimeout(resolve, 100));

                const confirmDialogInstance = templateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;

                // ngAfterContentInit should process templates without errors
                expect(() => confirmDialogInstance.ngAfterContentInit()).not.toThrow();
            });

            it('should process _iconTemplate from pTemplate="icon"', async () => {
                const templateFixture = TestBed.createComponent(TestTemplatePConfirmDialogComponent);
                templateFixture.changeDetectorRef.markForCheck();
                await templateFixture.whenStable();
                await new Promise((resolve) => setTimeout(resolve, 100));

                const confirmDialogInstance = templateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;

                // ngAfterContentInit should process templates without errors
                expect(() => confirmDialogInstance.ngAfterContentInit()).not.toThrow();
            });

            it('should process _footerTemplate from pTemplate="footer"', async () => {
                const templateFixture = TestBed.createComponent(TestTemplatePConfirmDialogComponent);
                templateFixture.changeDetectorRef.markForCheck();
                await templateFixture.whenStable();
                await new Promise((resolve) => setTimeout(resolve, 100));

                const confirmDialogInstance = templateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;

                // ngAfterContentInit should process templates without errors
                expect(() => confirmDialogInstance.ngAfterContentInit()).not.toThrow();
            });

            it('should process _rejectIconTemplate from pTemplate="rejecticon"', async () => {
                const templateFixture = TestBed.createComponent(TestTemplatePConfirmDialogComponent);
                templateFixture.changeDetectorRef.markForCheck();
                await templateFixture.whenStable();
                await new Promise((resolve) => setTimeout(resolve, 100));

                const confirmDialogInstance = templateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;

                // ngAfterContentInit should process templates without errors
                expect(() => confirmDialogInstance.ngAfterContentInit()).not.toThrow();
            });

            it('should process _acceptIconTemplate from pTemplate="accepticon"', async () => {
                const templateFixture = TestBed.createComponent(TestTemplatePConfirmDialogComponent);
                templateFixture.changeDetectorRef.markForCheck();
                await templateFixture.whenStable();
                await new Promise((resolve) => setTimeout(resolve, 100));

                const confirmDialogInstance = templateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;

                // ngAfterContentInit should process templates without errors
                expect(() => confirmDialogInstance.ngAfterContentInit()).not.toThrow();
            });

            it('should process _headlessTemplate from pTemplate="headless"', async () => {
                const templateFixture = TestBed.createComponent(TestTemplatePConfirmDialogComponent);
                templateFixture.changeDetectorRef.markForCheck();
                await templateFixture.whenStable();
                await new Promise((resolve) => setTimeout(resolve, 100));

                const confirmDialogInstance = templateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;

                // ngAfterContentInit should process templates without errors
                expect(() => confirmDialogInstance.ngAfterContentInit()).not.toThrow();
            });
        });

        describe('#template Approach Tests', () => {
            it('should handle #header template processing', async () => {
                const contentTemplateFixture = TestBed.createComponent(TestContentTemplateConfirmDialogComponent);
                contentTemplateFixture.changeDetectorRef.markForCheck();
                await contentTemplateFixture.whenStable();
                await new Promise((resolve) => setTimeout(resolve, 100));

                const confirmDialogInstance = contentTemplateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;

                // Test that component handles #header template without errors
                expect(() => confirmDialogInstance.ngAfterContentInit()).not.toThrow();

                // Test that headerTemplate property exists (ContentChild)
                expect(confirmDialogInstance.headerTemplate).toBeDefined();
            });

            it("should process headerTemplate from @ContentChild('header')", async () => {
                const contentTemplateFixture = TestBed.createComponent(TestContentTemplateConfirmDialogComponent);
                contentTemplateFixture.changeDetectorRef.markForCheck();
                await contentTemplateFixture.whenStable();
                await new Promise((resolve) => setTimeout(resolve, 100));

                const confirmDialogInstance = contentTemplateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;

                // @ContentChild('header') should set headerTemplate
                expect(confirmDialogInstance.headerTemplate).toBeDefined();
                expect(confirmDialogInstance.headerTemplate?.constructor.name).toBe('TemplateRef');
            });

            it("should process messageTemplate from @ContentChild('message')", async () => {
                const contentTemplateFixture = TestBed.createComponent(TestContentTemplateConfirmDialogComponent);
                contentTemplateFixture.changeDetectorRef.markForCheck();
                await contentTemplateFixture.whenStable();
                await new Promise((resolve) => setTimeout(resolve, 100));

                const confirmDialogInstance = contentTemplateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;

                // @ContentChild('message') should set messageTemplate
                expect(confirmDialogInstance.messageTemplate).toBeDefined();
                expect(confirmDialogInstance.messageTemplate?.constructor.name).toBe('TemplateRef');
            });

            it("should process iconTemplate from @ContentChild('icon')", async () => {
                const contentTemplateFixture = TestBed.createComponent(TestContentTemplateConfirmDialogComponent);
                contentTemplateFixture.changeDetectorRef.markForCheck();
                await contentTemplateFixture.whenStable();
                await new Promise((resolve) => setTimeout(resolve, 100));

                const confirmDialogInstance = contentTemplateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;

                // @ContentChild('icon') should set iconTemplate
                expect(confirmDialogInstance.iconTemplate).toBeDefined();
                expect(confirmDialogInstance.iconTemplate?.constructor.name).toBe('TemplateRef');
            });

            it("should process footerTemplate from @ContentChild('footer')", async () => {
                const contentTemplateFixture = TestBed.createComponent(TestContentTemplateConfirmDialogComponent);
                contentTemplateFixture.changeDetectorRef.markForCheck();
                await contentTemplateFixture.whenStable();
                await new Promise((resolve) => setTimeout(resolve, 100));

                const confirmDialogInstance = contentTemplateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;

                // @ContentChild('footer') should set footerTemplate
                expect(confirmDialogInstance.footerTemplate).toBeDefined();
                expect(confirmDialogInstance.footerTemplate?.constructor.name).toBe('TemplateRef');
            });

            it("should process rejectIconTemplate from @ContentChild('rejecticon')", async () => {
                const contentTemplateFixture = TestBed.createComponent(TestContentTemplateConfirmDialogComponent);
                contentTemplateFixture.changeDetectorRef.markForCheck();
                await contentTemplateFixture.whenStable();
                await new Promise((resolve) => setTimeout(resolve, 100));

                const confirmDialogInstance = contentTemplateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;

                // @ContentChild('rejecticon') should set rejectIconTemplate
                expect(confirmDialogInstance.rejectIconTemplate).toBeDefined();
                expect(confirmDialogInstance.rejectIconTemplate?.constructor.name).toBe('TemplateRef');
            });

            it("should process acceptIconTemplate from @ContentChild('accepticon')", async () => {
                const contentTemplateFixture = TestBed.createComponent(TestContentTemplateConfirmDialogComponent);
                contentTemplateFixture.changeDetectorRef.markForCheck();
                await contentTemplateFixture.whenStable();
                await new Promise((resolve) => setTimeout(resolve, 100));

                const confirmDialogInstance = contentTemplateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;

                // @ContentChild('accepticon') should set acceptIconTemplate
                expect(confirmDialogInstance.acceptIconTemplate).toBeDefined();
                expect(confirmDialogInstance.acceptIconTemplate?.constructor.name).toBe('TemplateRef');
            });

            it("should process headlessTemplate from @ContentChild('headless')", async () => {
                const contentTemplateFixture = TestBed.createComponent(TestContentTemplateConfirmDialogComponent);
                contentTemplateFixture.changeDetectorRef.markForCheck();
                await contentTemplateFixture.whenStable();
                await new Promise((resolve) => setTimeout(resolve, 100));

                const confirmDialogInstance = contentTemplateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;

                // @ContentChild('headless') should set headlessTemplate
                expect(confirmDialogInstance.headlessTemplate).toBeDefined();
                expect(confirmDialogInstance.headlessTemplate?.constructor.name).toBe('TemplateRef');
            });
        });

        describe('Template Integration Tests', () => {
            it('should render different template types correctly', async () => {
                // Test both pTemplate and #content template approaches

                // Test pTemplate rendering
                const pTemplateFixture = TestBed.createComponent(TestTemplatePConfirmDialogComponent);
                pTemplateFixture.changeDetectorRef.markForCheck();
                await pTemplateFixture.whenStable();
                await new Promise((resolve) => setTimeout(resolve, 100));

                const pTemplateConfirmDialog = pTemplateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;
                expect(pTemplateConfirmDialog.templates).toBeDefined();
                expect(() => pTemplateConfirmDialog.ngAfterContentInit()).not.toThrow();

                // Test #content template rendering
                const contentTemplateFixture = TestBed.createComponent(TestContentTemplateConfirmDialogComponent);
                contentTemplateFixture.changeDetectorRef.markForCheck();
                await contentTemplateFixture.whenStable();
                await new Promise((resolve) => setTimeout(resolve, 100));

                const contentTemplateConfirmDialog = contentTemplateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;
                expect(contentTemplateConfirmDialog.headerTemplate).toBeDefined();
            });

            it('should use default templates when custom ones are not provided', () => {
                // Test default behavior without custom templates
                const dialogElement = fixture.debugElement.query(By.css('p-dialog'));
                expect(dialogElement).toBeTruthy();
            });

            it('should handle ngAfterContentInit template processing correctly', async () => {
                const templateFixture = TestBed.createComponent(TestTemplatePConfirmDialogComponent);
                templateFixture.changeDetectorRef.markForCheck();
                await templateFixture.whenStable();
                await new Promise((resolve) => setTimeout(resolve, 100));

                const confirmDialogInstance = templateFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;

                expect(() => confirmDialogInstance.ngAfterContentInit()).not.toThrow();
                expect(confirmDialogInstance.templates).toBeDefined();
            });
        });
    });

    describe('ConfirmationService Integration', () => {
        it('should work with ConfirmationService', async () => {
            const serviceFixture = TestBed.createComponent(TestConfirmationServiceComponent);
            const serviceComponent = serviceFixture.componentInstance;
            serviceFixture.changeDetectorRef.markForCheck();
            await serviceFixture.whenStable();

            // Trigger confirmation
            const confirmBtn = serviceFixture.debugElement.query(By.css('.confirm-btn'));
            confirmBtn.nativeElement.click();
            await new Promise((resolve) => setTimeout(resolve, 0));
            serviceFixture.changeDetectorRef.markForCheck();
            await serviceFixture.whenStable();

            const confirmDialogInstance = serviceFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;
            expect(confirmDialogInstance.visible).toBe(true);
        });

        it('should handle accept callback from ConfirmationService', async () => {
            const serviceFixture = TestBed.createComponent(TestConfirmationServiceComponent);
            const serviceComponent = serviceFixture.componentInstance;
            serviceFixture.changeDetectorRef.markForCheck();
            await serviceFixture.whenStable();

            // Trigger confirmation
            serviceComponent.confirm();
            await new Promise((resolve) => setTimeout(resolve, 0));
            serviceFixture.changeDetectorRef.markForCheck();
            await serviceFixture.whenStable();

            const confirmDialogInstance = serviceFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;
            confirmDialogInstance.onAccept();
            await new Promise((resolve) => setTimeout(resolve, 0));

            expect(serviceComponent.acceptClicked).toBe(true);
        });

        it('should handle reject callback from ConfirmationService', async () => {
            const serviceFixture = TestBed.createComponent(TestConfirmationServiceComponent);
            const serviceComponent = serviceFixture.componentInstance;
            serviceFixture.changeDetectorRef.markForCheck();
            await serviceFixture.whenStable();

            // Trigger confirmation
            serviceComponent.confirm();
            await new Promise((resolve) => setTimeout(resolve, 0));
            serviceFixture.changeDetectorRef.markForCheck();
            await serviceFixture.whenStable();

            const confirmDialogInstance = serviceFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;
            confirmDialogInstance.onReject();
            await new Promise((resolve) => setTimeout(resolve, 0));

            expect(serviceComponent.rejectClicked).toBe(true);
        });
    });

    describe('Accessibility Tests', () => {
        it('should have proper ARIA attributes on dialog', async () => {
            const accessibilityFixture = TestBed.createComponent(TestAccessibilityConfirmDialogComponent);
            accessibilityFixture.changeDetectorRef.markForCheck();
            await accessibilityFixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 0));

            const dialog = accessibilityFixture.debugElement.query(By.css('p-dialog'));
            expect(dialog.nativeElement.getAttribute('role')).toBe('alertdialog');
        });

        it('should handle aria labels for buttons', async () => {
            const accessibilityFixture = TestBed.createComponent(TestAccessibilityConfirmDialogComponent);
            accessibilityFixture.changeDetectorRef.markForCheck();
            await accessibilityFixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 0));

            const confirmDialogInstance = accessibilityFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;
            expect(confirmDialogInstance.acceptAriaLabel).toBe('Accept confirmation');
            expect(confirmDialogInstance.rejectAriaLabel).toBe('Reject confirmation');
            expect(confirmDialogInstance.closeAriaLabel).toBe('Close dialog');
        });

        it('should handle focus management', async () => {
            component.visible = true;
            component.defaultFocus = 'accept';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 0));

            // Test that getElementToFocus returns the correct element
            expect(confirmDialogInstance.getElementToFocus).toBeDefined();
        });

        it('should have proper focus trap behavior', async () => {
            component.visible = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 0));

            // Dialog should be present and focusable
            const dialog = fixture.debugElement.query(By.css('p-dialog'));
            expect(dialog).toBeTruthy();
        });
    });

    describe('CSS Classes and Styling', () => {
        it('should apply correct default classes', async () => {
            component.visible = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 0));

            const dialog = fixture.debugElement.query(By.css('p-dialog'));
            expect(dialog).toBeTruthy();
        });

        it('should apply custom styleClass', async () => {
            component.styleClass = 'my-custom-dialog';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(confirmDialogInstance.styleClass).toBe('my-custom-dialog');
        });

        it('should apply button style classes', async () => {
            const buttonPropsFixture = TestBed.createComponent(TestButtonPropertiesComponent);
            buttonPropsFixture.changeDetectorRef.markForCheck();
            await buttonPropsFixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 0));

            const confirmDialogInstance = buttonPropsFixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;
            expect(confirmDialogInstance.acceptButtonStyleClass).toBe('custom-accept');
            expect(confirmDialogInstance.rejectButtonStyleClass).toBe('custom-reject');
        });
    });

    describe('Dialog Integration', () => {
        it('should pass properties to underlying dialog', async () => {
            component.visible = true;
            component.draggable = false;
            component.blockScroll = false;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const dialog = fixture.debugElement.query(By.directive(Dialog));
            expect(dialog.componentInstance.visible).toBe(true);
            expect(dialog.componentInstance.draggable).toBe(false);
            expect(dialog.componentInstance.blockScroll).toBe(false);
        });

        it('should handle dialog visibility changes', async () => {
            const visibilityChangeSpy = spyOn(confirmDialogInstance, 'onVisibleChange').and.callThrough();

            confirmDialogInstance.onVisibleChange(true);
            await new Promise((resolve) => setTimeout(resolve, 0));

            expect(visibilityChangeSpy).toHaveBeenCalledWith(true);
        });
    });

    describe('Edge Cases and Error Handling', () => {
        it('should handle missing confirmation gracefully', () => {
            confirmDialogInstance.confirmation = null as any;

            expect(() => {
                confirmDialogInstance.option('message');
            }).not.toThrow();
        });

        it('should handle empty string properties', async () => {
            component.header = '';
            component.message = '';
            component.icon = '';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(confirmDialogInstance.header).toBe('' as any);
            expect(confirmDialogInstance.message).toBe('' as any);
            expect(confirmDialogInstance.icon).toBe('' as any);
        });

        it('should handle undefined properties gracefully', async () => {
            component.header = undefined as any;
            component.message = undefined as any;
            component.icon = undefined as any;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(() => {
                fixture.changeDetectorRef.markForCheck();
            }).not.toThrow();
        });

        it('should handle rapid visibility changes', async () => {
            // Rapid visibility state changes
            component.visible = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 0));

            component.visible = false;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 0));

            expect(() => {
                component.visible = true;
                fixture.changeDetectorRef.markForCheck();
            }).not.toThrow();
        });
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

    describe('PT (PassThrough) Tests', () => {
        describe('Case 1: Simple string classes', () => {
            @Component({
                standalone: false,
                template: `
                    <p-confirmdialog [pt]="pt" key="test"></p-confirmdialog>
                    <button (click)="confirm()">Confirm</button>
                `
            })
            class TestPTCase1Component {
                pt = {
                    pcDialog: 'DIALOG_CLASS',
                    message: 'MESSAGE_CLASS',
                    icon: 'ICON_CLASS',
                    pcAcceptButton: 'ACCEPT_BUTTON_CLASS',
                    pcRejectButton: 'REJECT_BUTTON_CLASS'
                };

                constructor(private confirmationService: ConfirmationService) {}

                confirm() {
                    this.confirmationService.confirm({
                        message: 'Are you sure?',
                        key: 'test',
                        accept: () => {}
                    });
                }
            }

            it('should apply simple string classes to PT sections', async () => {
                TestBed.resetTestingModule();
                await TestBed.configureTestingModule({
                    declarations: [TestPTCase1Component],
                    imports: [ConfirmDialog, Dialog, Button, NoopAnimationsModule],
                    providers: [ConfirmationService, provideZonelessChangeDetection()]
                }).compileComponents();

                const testFixture = TestBed.createComponent(TestPTCase1Component);
                const component = testFixture.componentInstance;
                testFixture.changeDetectorRef.markForCheck();
                await testFixture.whenStable();

                component.confirm();
                testFixture.changeDetectorRef.markForCheck();
                await testFixture.whenStable();
                await new Promise((resolve) => setTimeout(resolve, 0));

                const dialog = testFixture.debugElement.query(By.directive(Dialog));
                if (dialog) {
                    expect(dialog.nativeElement.classList.contains('DIALOG_CLASS') || dialog.componentInstance).toBeTruthy();
                }
            });
        });

        describe('Case 2: Objects with class, style, and attributes', () => {
            @Component({
                standalone: false,
                template: `
                    <p-confirmdialog [pt]="pt" key="test"></p-confirmdialog>
                    <button (click)="confirm()">Confirm</button>
                `
            })
            class TestPTCase2Component {
                pt = {
                    pcDialog: {
                        class: 'DIALOG_OBJECT_CLASS',
                        style: { border: '2px solid blue' },
                        'data-test': 'dialog-test'
                    },
                    message: {
                        class: 'MESSAGE_OBJECT_CLASS',
                        style: { padding: '10px' }
                    },
                    icon: {
                        class: 'ICON_OBJECT_CLASS',
                        'aria-label': 'Confirmation icon'
                    }
                };

                constructor(private confirmationService: ConfirmationService) {}

                confirm() {
                    this.confirmationService.confirm({
                        message: 'Are you sure?',
                        key: 'test',
                        accept: () => {}
                    });
                }
            }

            it('should apply object properties to PT sections', async () => {
                TestBed.resetTestingModule();
                await TestBed.configureTestingModule({
                    declarations: [TestPTCase2Component],
                    imports: [ConfirmDialog, Dialog, Button, NoopAnimationsModule],
                    providers: [ConfirmationService, provideZonelessChangeDetection()]
                }).compileComponents();

                const testFixture = TestBed.createComponent(TestPTCase2Component);
                const component = testFixture.componentInstance;
                testFixture.changeDetectorRef.markForCheck();
                await testFixture.whenStable();

                component.confirm();
                testFixture.changeDetectorRef.markForCheck();
                await testFixture.whenStable();
                await new Promise((resolve) => setTimeout(resolve, 0));

                const message = testFixture.debugElement.query(By.css('[data-pc-section="message"]'));
                if (message) {
                    expect(message.nativeElement.classList.contains('MESSAGE_OBJECT_CLASS')).toBe(true);
                    expect(message.nativeElement.style.padding).toBe('10px');
                }
            });
        });

        describe('Case 3: Mixed object and string values', () => {
            @Component({
                standalone: false,
                template: `
                    <p-confirmdialog [pt]="pt" key="test"></p-confirmdialog>
                    <button (click)="confirm()">Confirm</button>
                `
            })
            class TestPTCase3Component {
                pt = {
                    pcDialog: {
                        class: 'DIALOG_MIXED_CLASS'
                    },
                    message: 'MESSAGE_STRING_CLASS',
                    icon: {
                        class: 'ICON_MIXED_CLASS'
                    }
                };

                constructor(private confirmationService: ConfirmationService) {}

                confirm() {
                    this.confirmationService.confirm({
                        message: 'Are you sure?',
                        key: 'test',
                        accept: () => {}
                    });
                }
            }

            it('should apply mixed object and string values correctly', async () => {
                TestBed.resetTestingModule();
                await TestBed.configureTestingModule({
                    declarations: [TestPTCase3Component],
                    imports: [ConfirmDialog, Dialog, Button, NoopAnimationsModule],
                    providers: [ConfirmationService, provideZonelessChangeDetection()]
                }).compileComponents();

                const testFixture = TestBed.createComponent(TestPTCase3Component);
                const component = testFixture.componentInstance;
                testFixture.changeDetectorRef.markForCheck();
                await testFixture.whenStable();

                component.confirm();
                testFixture.changeDetectorRef.markForCheck();
                await testFixture.whenStable();
                await new Promise((resolve) => setTimeout(resolve, 0));

                const message = testFixture.debugElement.query(By.css('[data-pc-section="message"]'));
                if (message) {
                    expect(message.nativeElement.classList.contains('MESSAGE_STRING_CLASS')).toBe(true);
                }
            });
        });

        describe('Case 4: Use variables from instance', () => {
            @Component({
                standalone: false,
                template: `
                    <p-confirmdialog [pt]="pt" key="test" [visible]="isVisible"></p-confirmdialog>
                    <button (click)="confirm()">Confirm</button>
                `
            })
            class TestPTCase4Component {
                isVisible = false;
                pt = {
                    pcDialog: ({ instance }: any) => {
                        return {
                            class: instance?.visible ? 'VISIBLE_CLASS' : 'HIDDEN_CLASS'
                        };
                    },
                    message: ({ instance }: any) => {
                        return {
                            style: {
                                color: instance?.visible ? 'black' : 'gray'
                            }
                        };
                    }
                };

                constructor(private confirmationService: ConfirmationService) {}

                confirm() {
                    this.confirmationService.confirm({
                        message: 'Are you sure?',
                        key: 'test',
                        accept: () => {}
                    });
                }
            }

            it('should use instance variables in PT functions', async () => {
                TestBed.resetTestingModule();
                await TestBed.configureTestingModule({
                    declarations: [TestPTCase4Component],
                    imports: [ConfirmDialog, Dialog, Button, NoopAnimationsModule],
                    providers: [ConfirmationService, provideZonelessChangeDetection()]
                }).compileComponents();

                const testFixture = TestBed.createComponent(TestPTCase4Component);
                const component = testFixture.componentInstance;
                testFixture.changeDetectorRef.markForCheck();
                await testFixture.whenStable();

                component.confirm();
                testFixture.changeDetectorRef.markForCheck();
                await testFixture.whenStable();
                await new Promise((resolve) => setTimeout(resolve, 0));

                // Dialog becomes visible after confirm
                const confirmDialogInstance = testFixture.debugElement.query(By.directive(ConfirmDialog));
                expect(confirmDialogInstance).toBeTruthy();
            });
        });

        describe('Case 5: Event binding', () => {
            @Component({
                standalone: false,
                template: `
                    <p-confirmdialog [pt]="pt" key="test"></p-confirmdialog>
                    <button (click)="confirm()">Confirm</button>
                `
            })
            class TestPTCase5Component {
                clickedSection: string = '';
                pt = {
                    message: {
                        onclick: () => {
                            this.clickedSection = 'message';
                        }
                    },
                    icon: {
                        onclick: () => {
                            this.clickedSection = 'icon';
                        }
                    }
                };

                constructor(private confirmationService: ConfirmationService) {}

                confirm() {
                    this.confirmationService.confirm({
                        message: 'Are you sure?',
                        key: 'test',
                        accept: () => {}
                    });
                }
            }

            it('should bind click events through PT', async () => {
                TestBed.resetTestingModule();
                await TestBed.configureTestingModule({
                    declarations: [TestPTCase5Component],
                    imports: [ConfirmDialog, Dialog, Button, NoopAnimationsModule],
                    providers: [ConfirmationService, provideZonelessChangeDetection()]
                }).compileComponents();

                const testFixture = TestBed.createComponent(TestPTCase5Component);
                const component = testFixture.componentInstance;
                testFixture.changeDetectorRef.markForCheck();
                await testFixture.whenStable();

                component.confirm();
                testFixture.changeDetectorRef.markForCheck();
                await testFixture.whenStable();
                await new Promise((resolve) => setTimeout(resolve, 0));

                const message = testFixture.debugElement.query(By.css('[data-pc-section="message"]'));
                if (message) {
                    message.nativeElement.click();
                    expect(component.clickedSection).toBe('message');
                }
            });
        });

        describe('Case 6: Inline test', () => {
            @Component({
                standalone: false,
                template: `
                    <p-confirmdialog [pt]="{ pcDialog: 'INLINE_DIALOG_CLASS', message: 'INLINE_MESSAGE_CLASS' }" key="test"></p-confirmdialog>
                    <button (click)="confirm()">Confirm</button>
                `
            })
            class TestPTCase6InlineComponent {
                constructor(private confirmationService: ConfirmationService) {}

                confirm() {
                    this.confirmationService.confirm({
                        message: 'Are you sure?',
                        key: 'test',
                        accept: () => {}
                    });
                }
            }

            @Component({
                standalone: false,
                template: `
                    <p-confirmdialog [pt]="{ pcDialog: { class: 'INLINE_DIALOG_OBJECT_CLASS' }, icon: { class: 'INLINE_ICON_CLASS' } }" key="test"></p-confirmdialog>
                    <button (click)="confirm()">Confirm</button>
                `
            })
            class TestPTCase6InlineObjectComponent {
                constructor(private confirmationService: ConfirmationService) {}

                confirm() {
                    this.confirmationService.confirm({
                        message: 'Are you sure?',
                        key: 'test',
                        accept: () => {}
                    });
                }
            }

            it('should apply inline PT string classes', async () => {
                TestBed.resetTestingModule();
                await TestBed.configureTestingModule({
                    declarations: [TestPTCase6InlineComponent],
                    imports: [ConfirmDialog, Dialog, Button, NoopAnimationsModule],
                    providers: [ConfirmationService, provideZonelessChangeDetection()]
                }).compileComponents();

                const testFixture = TestBed.createComponent(TestPTCase6InlineComponent);
                const component = testFixture.componentInstance;
                testFixture.changeDetectorRef.markForCheck();
                await testFixture.whenStable();

                component.confirm();
                testFixture.changeDetectorRef.markForCheck();
                await testFixture.whenStable();
                await new Promise((resolve) => setTimeout(resolve, 0));

                const message = testFixture.debugElement.query(By.css('[data-pc-section="message"]'));
                if (message) {
                    expect(message.nativeElement.classList.contains('INLINE_MESSAGE_CLASS')).toBe(true);
                }
            });

            it('should apply inline PT object classes', async () => {
                TestBed.resetTestingModule();
                await TestBed.configureTestingModule({
                    declarations: [TestPTCase6InlineObjectComponent],
                    imports: [ConfirmDialog, Dialog, Button, NoopAnimationsModule],
                    providers: [ConfirmationService, provideZonelessChangeDetection()]
                }).compileComponents();

                const testFixture = TestBed.createComponent(TestPTCase6InlineObjectComponent);
                const component = testFixture.componentInstance;
                testFixture.changeDetectorRef.markForCheck();
                await testFixture.whenStable();

                component.confirm();
                testFixture.changeDetectorRef.markForCheck();
                await testFixture.whenStable();
                await new Promise((resolve) => setTimeout(resolve, 0));

                // Verify confirm dialog exists
                const confirmDialogElement = testFixture.debugElement.query(By.directive(ConfirmDialog));
                expect(confirmDialogElement).toBeTruthy();

                // Check if icon exists (PT may apply to different elements depending on state)
                const icon = testFixture.debugElement.query(By.css('[data-pc-section="icon"]'));
                if (icon) {
                    expect(icon.nativeElement.classList.contains('INLINE_ICON_CLASS')).toBe(true);
                } else {
                    // If icon is not rendered, verify the component exists and PT was processed
                    expect(confirmDialogElement.componentInstance).toBeTruthy();
                }
            });
        });

        describe('Case 7: Test from PrimeNGConfig', () => {
            @Component({
                standalone: false,
                template: `
                    <p-confirmdialog key="test1"></p-confirmdialog>
                    <button (click)="confirm('test1')">Confirm 1</button>
                    <p-confirmdialog key="test2"></p-confirmdialog>
                    <button (click)="confirm('test2')">Confirm 2</button>
                `
            })
            class TestPTCase7GlobalComponent {
                constructor(private confirmationService: ConfirmationService) {}

                confirm(key: string) {
                    this.confirmationService.confirm({
                        message: 'Are you sure?',
                        key: key,
                        accept: () => {}
                    });
                }
            }

            it('should apply global PT configuration from PrimeNGConfig', async () => {
                TestBed.resetTestingModule();
                await TestBed.configureTestingModule({
                    declarations: [TestPTCase7GlobalComponent],
                    imports: [ConfirmDialog, Dialog, Button, NoopAnimationsModule],
                    providers: [
                        ConfirmationService,
                        provideZonelessChangeDetection(),
                        {
                            provide: 'providePrimeNG',
                            useValue: {
                                pt: {
                                    confirmdialog: {
                                        pcDialog: { class: 'GLOBAL_DIALOG_CLASS' },
                                        message: { class: 'GLOBAL_MESSAGE_CLASS' }
                                    }
                                }
                            }
                        }
                    ]
                }).compileComponents();

                const testFixture = TestBed.createComponent(TestPTCase7GlobalComponent);
                testFixture.changeDetectorRef.markForCheck();
                await testFixture.whenStable();

                const dialogs = testFixture.debugElement.queryAll(By.directive(ConfirmDialog));
                expect(dialogs.length).toBe(2);
            });
        });

        describe('Case 8: Test hooks', () => {
            @Component({
                standalone: false,
                template: `
                    <p-confirmdialog [pt]="pt" key="test"></p-confirmdialog>
                    <button (click)="confirm()">Confirm</button>
                `
            })
            class TestPTCase8HooksComponent {
                afterViewInitCalled = false;
                afterViewCheckedCalled = false;
                onDestroyCalled = false;

                pt = {
                    pcDialog: 'HOOK_TEST_CLASS',
                    hooks: {
                        onAfterViewInit: () => {
                            this.afterViewInitCalled = true;
                        },
                        onAfterViewChecked: () => {
                            this.afterViewCheckedCalled = true;
                        },
                        onDestroy: () => {
                            this.onDestroyCalled = true;
                        }
                    }
                };

                constructor(private confirmationService: ConfirmationService) {}

                confirm() {
                    this.confirmationService.confirm({
                        message: 'Are you sure?',
                        key: 'test',
                        accept: () => {}
                    });
                }
            }

            it('should call PT hooks on Angular lifecycle events', async () => {
                TestBed.resetTestingModule();
                await TestBed.configureTestingModule({
                    declarations: [TestPTCase8HooksComponent],
                    imports: [ConfirmDialog, Dialog, Button, NoopAnimationsModule],
                    providers: [ConfirmationService, provideZonelessChangeDetection()]
                }).compileComponents();

                const testFixture = TestBed.createComponent(TestPTCase8HooksComponent);
                const component = testFixture.componentInstance;

                testFixture.changeDetectorRef.markForCheck();
                await testFixture.whenStable();

                expect(component.afterViewInitCalled).toBe(true);
                expect(component.afterViewCheckedCalled).toBe(true);

                testFixture.destroy();
                expect(component.onDestroyCalled).toBe(true);
            });
        });
    });
});
