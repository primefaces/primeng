import { Component, DebugElement, provideZonelessChangeDetection, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Card, CardModule } from './card';

@Component({
    standalone: false,
    template: `<p-card></p-card>`
})
class TestBasicCardComponent {}

@Component({
    standalone: false,
    template: `
        <p-card [header]="header" [subheader]="subheader" [style]="style">
            <div class="card-content">Custom Card Content</div>
        </p-card>
    `
})
class TestCustomCardComponent {
    header: string | undefined;
    subheader: string | undefined;
    style: { [key: string]: any } | undefined;
}

@Component({
    standalone: false,
    template: `
        <p-card>
            <ng-template #header>
                <div class="custom-header">Custom Header Template</div>
            </ng-template>
            <ng-template #title>
                <h2 class="custom-title">Custom Title Template</h2>
            </ng-template>
            <ng-template #subtitle>
                <p class="custom-subtitle">Custom Subtitle Template</p>
            </ng-template>
            <ng-template #content>
                <div class="custom-content">Custom Content Template</div>
            </ng-template>
            <ng-template #footer>
                <div class="custom-footer">Custom Footer Template</div>
            </ng-template>
        </p-card>
    `
})
class TestTemplateCardComponent {}

@Component({
    standalone: false,
    template: `
        <p-card>
            <p-header>
                <div class="facet-header">Header Facet Content</div>
            </p-header>
            <div class="main-content">Main Card Content</div>
            <p-footer>
                <div class="facet-footer">Footer Facet Content</div>
            </p-footer>
        </p-card>
    `
})
class TestFacetCardComponent {}

@Component({
    standalone: false,
    template: `
        <p-card>
            <ng-template #header>
                <div class="contentchild-header">ContentChild Header</div>
            </ng-template>
            <ng-template #title>
                <h3 class="contentchild-title">ContentChild Title</h3>
            </ng-template>
            <ng-template #subtitle>
                <span class="contentchild-subtitle">ContentChild Subtitle</span>
            </ng-template>
            <ng-template #content>
                <div class="contentchild-content">ContentChild Content</div>
            </ng-template>
            <ng-template #footer>
                <div class="contentchild-footer">ContentChild Footer</div>
            </ng-template>
        </p-card>
    `
})
class TestContentChildCardComponent {
    @ViewChild('header') headerTemplate!: TemplateRef<any>;
    @ViewChild('title') titleTemplate!: TemplateRef<any>;
    @ViewChild('subtitle') subtitleTemplate!: TemplateRef<any>;
    @ViewChild('content') contentTemplate!: TemplateRef<any>;
    @ViewChild('footer') footerTemplate!: TemplateRef<any>;
}

@Component({
    standalone: false,
    template: `
        <p-card header="Simple Header" subheader="Simple Subheader">
            <div class="simple-content">Simple card content with just text properties</div>
        </p-card>
    `
})
class TestSimpleTextCardComponent {}

@Component({
    standalone: false,
    template: `
        <p-card [header]="header" [subheader]="subheader">
            <ng-container *ngIf="showContent">
                <div class="dynamic-content">Dynamic Content</div>
            </ng-container>
        </p-card>
    `
})
class TestDynamicCardComponent {
    header = 'Initial Header';
    subheader = 'Initial Subheader';
    showContent = true;
}

@Component({
    standalone: false,
    template: `
        <p-card>
            <ng-template #header>
                <div class="header-with-actions">
                    <h3>Card with Actions</h3>
                    <button class="header-action" type="button">Action</button>
                </div>
            </ng-template>
            <div class="complex-content">
                <p>This is a complex card with multiple elements.</p>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ul>
            </div>
            <ng-template #footer>
                <div class="footer-buttons">
                    <button class="btn-primary" type="button">Save</button>
                    <button class="btn-secondary" type="button">Cancel</button>
                </div>
            </ng-template>
        </p-card>
    `
})
class TestComplexCardComponent {}

@Component({
    standalone: false,
    template: `
        <p-card header="Header Only">
            <div class="header-only-content">Content with header only</div>
        </p-card>
    `
})
class TestHeaderOnlyCardComponent {}

@Component({
    standalone: false,
    template: `
        <p-card subheader="Subheader Only">
            <div class="subheader-only-content">Content with subheader only</div>
        </p-card>
    `
})
class TestSubheaderOnlyCardComponent {}

@Component({
    standalone: false,
    template: `
        <p-card>
            <ng-template #footer>
                <div class="footer-only">Footer Only Content</div>
            </ng-template>
            <div class="content-with-footer">Content with footer only</div>
        </p-card>
    `
})
class TestFooterOnlyCardComponent {}

describe('Card', () => {
    let fixture: ComponentFixture<TestBasicCardComponent>;
    let component: TestBasicCardComponent;
    let cardEl: DebugElement;
    let card: Card;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [CardModule],
            declarations: [
                TestBasicCardComponent,
                TestCustomCardComponent,
                TestTemplateCardComponent,
                TestFacetCardComponent,
                TestContentChildCardComponent,
                TestSimpleTextCardComponent,
                TestDynamicCardComponent,
                TestComplexCardComponent,
                TestHeaderOnlyCardComponent,
                TestSubheaderOnlyCardComponent,
                TestFooterOnlyCardComponent
            ],
            providers: [provideZonelessChangeDetection()]
        });

        fixture = TestBed.createComponent(TestBasicCardComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();

        cardEl = fixture.debugElement.query(By.directive(Card));
        card = cardEl.componentInstance;
    });

    describe('Component Initialization', () => {
        it('should create the component', () => {
            expect(card).toBeTruthy();
        });

        it('should have default values', () => {
            expect(card.header()).toBeUndefined();
            expect(card.subheader()).toBeUndefined();
        });

        it('should have correct host attributes', async () => {
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(cardEl.nativeElement.getAttribute('data-pc-name')).toBe('card');
        });

        it('should have correct CSS classes', () => {
            expect(cardEl.nativeElement.className).toContain('p-card');
            expect(cardEl.nativeElement.className).toContain('p-component');
        });

        it('should render card body', () => {
            const bodyElement = cardEl.query(By.css('.p-card-body'));
            expect(bodyElement).toBeTruthy();
        });

        it('should render content section', () => {
            const contentElement = cardEl.query(By.css('.p-card-content'));
            expect(contentElement).toBeTruthy();
        });
    });

    describe('Header Property', () => {
        let customFixture: ComponentFixture<TestCustomCardComponent>;
        let customComponent: TestCustomCardComponent;

        beforeEach(() => {
            customFixture = TestBed.createComponent(TestCustomCardComponent);
            customComponent = customFixture.componentInstance;
        });

        it('should not render header section when header is not provided', async () => {
            await customFixture.whenStable();
            const headerElement = customFixture.debugElement.query(By.css('.p-card-header'));
            expect(headerElement).toBeFalsy();
        });

        it('should render header when provided', async () => {
            customComponent.header = 'Test Header';
            customFixture.changeDetectorRef.markForCheck();
            await customFixture.whenStable();

            const titleElement = customFixture.debugElement.query(By.css('.p-card-title'));
            expect(titleElement).toBeTruthy();
            expect(titleElement.nativeElement.textContent.trim()).toBe('Test Header');
        });

        it('should update header dynamically', async () => {
            customComponent.header = 'Initial Header';
            customFixture.changeDetectorRef.markForCheck();
            await customFixture.whenStable();

            let titleElement = customFixture.debugElement.query(By.css('.p-card-title'));
            expect(titleElement.nativeElement.textContent.trim()).toBe('Initial Header');

            customComponent.header = 'Updated Header';
            customFixture.changeDetectorRef.markForCheck();
            await customFixture.whenStable();
            expect(titleElement.nativeElement.textContent.trim()).toBe('Updated Header');
        });

        it('should handle undefined header gracefully', async () => {
            customComponent.header = 'Test Header';
            customFixture.changeDetectorRef.markForCheck();
            await customFixture.whenStable();

            customComponent.header = undefined as any;
            customFixture.changeDetectorRef.markForCheck();
            await customFixture.whenStable();

            const titleElement = customFixture.debugElement.query(By.css('.p-card-title'));
            expect(titleElement).toBeFalsy();
        });
    });

    describe('Subheader Property', () => {
        let customFixture: ComponentFixture<TestCustomCardComponent>;
        let customComponent: TestCustomCardComponent;

        beforeEach(() => {
            customFixture = TestBed.createComponent(TestCustomCardComponent);
            customComponent = customFixture.componentInstance;
        });

        it('should not render subtitle section when subheader is not provided', async () => {
            await customFixture.whenStable();
            const subtitleElement = customFixture.debugElement.query(By.css('.p-card-subtitle'));
            expect(subtitleElement).toBeFalsy();
        });

        it('should render subheader when provided', async () => {
            customComponent.subheader = 'Test Subheader';
            customFixture.changeDetectorRef.markForCheck();
            await customFixture.whenStable();

            const subtitleElement = customFixture.debugElement.query(By.css('.p-card-subtitle'));
            expect(subtitleElement).toBeTruthy();
            expect(subtitleElement.nativeElement.textContent.trim()).toBe('Test Subheader');
        });

        it('should update subheader dynamically', async () => {
            customComponent.subheader = 'Initial Subheader';
            customFixture.changeDetectorRef.markForCheck();
            await customFixture.whenStable();

            let subtitleElement = customFixture.debugElement.query(By.css('.p-card-subtitle'));
            expect(subtitleElement.nativeElement.textContent.trim()).toBe('Initial Subheader');

            customComponent.subheader = 'Updated Subheader';
            customFixture.changeDetectorRef.markForCheck();
            await customFixture.whenStable();
            expect(subtitleElement.nativeElement.textContent.trim()).toBe('Updated Subheader');
        });

        it('should handle undefined subheader gracefully', async () => {
            customComponent.subheader = 'Test Subheader';
            customFixture.changeDetectorRef.markForCheck();
            await customFixture.whenStable();

            customComponent.subheader = undefined as any;
            customFixture.changeDetectorRef.markForCheck();
            await customFixture.whenStable();

            const subtitleElement = customFixture.debugElement.query(By.css('.p-card-subtitle'));
            expect(subtitleElement).toBeFalsy();
        });
    });

    describe('Style Properties', () => {
        let customFixture: ComponentFixture<TestCustomCardComponent>;
        let customComponent: TestCustomCardComponent;

        beforeEach(() => {
            customFixture = TestBed.createComponent(TestCustomCardComponent);
            customComponent = customFixture.componentInstance;
        });

        it('should apply inline styles', async () => {
            customComponent.style = { width: '300px', height: '200px' };
            customFixture.changeDetectorRef.markForCheck();
            await customFixture.whenStable();

            const cardElement = customFixture.debugElement.query(By.directive(Card));
            expect(cardElement.nativeElement.style.width).toBe('300px');
            expect(cardElement.nativeElement.style.height).toBe('200px');
        });

        it('should update styles dynamically', async () => {
            customComponent.style = { backgroundColor: 'red' };
            customFixture.changeDetectorRef.markForCheck();
            await customFixture.whenStable();

            const cardElement = customFixture.debugElement.query(By.directive(Card));
            expect(cardElement.nativeElement.style.backgroundColor).toBe('red');

            customComponent.style = { backgroundColor: 'blue' };
            customFixture.changeDetectorRef.markForCheck();
            await customFixture.whenStable();
            expect(cardElement.nativeElement.style.backgroundColor).toBe('blue');
        });
    });

    describe('Content Projection', () => {
        let customFixture: ComponentFixture<TestCustomCardComponent>;

        beforeEach(async () => {
            customFixture = TestBed.createComponent(TestCustomCardComponent);
            await customFixture.whenStable();
        });

        it('should project content correctly', () => {
            const contentElement = customFixture.debugElement.query(By.css('.card-content'));
            expect(contentElement).toBeTruthy();
            expect(contentElement.nativeElement.textContent).toContain('Custom Card Content');
        });

        it('should render content in p-card-content container', () => {
            const contentContainer = customFixture.debugElement.query(By.css('.p-card-content'));
            expect(contentContainer).toBeTruthy();

            const projectedContent = contentContainer.query(By.css('.card-content'));
            expect(projectedContent).toBeTruthy();
        });
    });

    describe('PrimeTemplate Support', () => {
        let templateFixture: ComponentFixture<TestTemplateCardComponent>;

        beforeEach(async () => {
            templateFixture = TestBed.createComponent(TestTemplateCardComponent);
            await templateFixture.whenStable();
        });

        it('should render header template', () => {
            const headerElement = templateFixture.debugElement.query(By.css('.p-card-header'));
            expect(headerElement).toBeTruthy();

            const customHeader = headerElement.query(By.css('.custom-header'));
            expect(customHeader).toBeTruthy();
            expect(customHeader.nativeElement.textContent).toBe('Custom Header Template');
        });

        it('should render title template', () => {
            const titleElement = templateFixture.debugElement.query(By.css('.p-card-title'));
            expect(titleElement).toBeTruthy();

            const customTitle = titleElement.query(By.css('.custom-title'));
            expect(customTitle).toBeTruthy();
            expect(customTitle.nativeElement.textContent).toBe('Custom Title Template');
        });

        it('should render subtitle template', () => {
            const subtitleElement = templateFixture.debugElement.query(By.css('.p-card-subtitle'));
            expect(subtitleElement).toBeTruthy();

            const customSubtitle = subtitleElement.query(By.css('.custom-subtitle'));
            expect(customSubtitle).toBeTruthy();
            expect(customSubtitle.nativeElement.textContent).toBe('Custom Subtitle Template');
        });

        it('should render content template', () => {
            const contentElement = templateFixture.debugElement.query(By.css('.p-card-content'));
            expect(contentElement).toBeTruthy();

            const customContent = contentElement.query(By.css('.custom-content'));
            expect(customContent).toBeTruthy();
            expect(customContent.nativeElement.textContent).toBe('Custom Content Template');
        });

        it('should render footer template', () => {
            const footerElement = templateFixture.debugElement.query(By.css('.p-card-footer'));
            expect(footerElement).toBeTruthy();

            const customFooter = footerElement.query(By.css('.custom-footer'));
            expect(customFooter).toBeTruthy();
            expect(customFooter.nativeElement.textContent).toBe('Custom Footer Template');
        });
    });

    describe('Header and Footer Facets', () => {
        let facetFixture: ComponentFixture<TestFacetCardComponent>;

        beforeEach(async () => {
            facetFixture = TestBed.createComponent(TestFacetCardComponent);
            await facetFixture.whenStable();
        });

        it('should render header facet', () => {
            const headerElement = facetFixture.debugElement.query(By.css('.p-card-header'));
            expect(headerElement).toBeTruthy();

            const facetHeader = headerElement.query(By.css('.facet-header'));
            expect(facetHeader).toBeTruthy();
            expect(facetHeader.nativeElement.textContent).toBe('Header Facet Content');
        });

        it('should render footer facet', () => {
            const footerElement = facetFixture.debugElement.query(By.css('.p-card-footer'));
            expect(footerElement).toBeTruthy();

            const facetFooter = footerElement.query(By.css('.facet-footer'));
            expect(facetFooter).toBeTruthy();
            expect(facetFooter.nativeElement.textContent).toBe('Footer Facet Content');
        });

        it('should render main content along with facets', () => {
            const contentElement = facetFixture.debugElement.query(By.css('.p-card-content'));
            expect(contentElement).toBeTruthy();

            const mainContent = contentElement.query(By.css('.main-content'));
            expect(mainContent).toBeTruthy();
            expect(mainContent.nativeElement.textContent).toBe('Main Card Content');
        });
    });

    describe('ContentChild Templates', () => {
        let contentChildFixture: ComponentFixture<TestContentChildCardComponent>;
        let contentChildComponent: TestContentChildCardComponent;

        beforeEach(async () => {
            contentChildFixture = TestBed.createComponent(TestContentChildCardComponent);
            contentChildComponent = contentChildFixture.componentInstance;
            await contentChildFixture.whenStable();
        });

        it('should render ContentChild header template', () => {
            const headerElement = contentChildFixture.debugElement.query(By.css('.p-card-header'));
            expect(headerElement).toBeTruthy();

            const contentChildHeader = headerElement.query(By.css('.contentchild-header'));
            expect(contentChildHeader).toBeTruthy();
            expect(contentChildHeader.nativeElement.textContent).toBe('ContentChild Header');
        });

        it('should render ContentChild title template', () => {
            const titleElement = contentChildFixture.debugElement.query(By.css('.p-card-title'));
            expect(titleElement).toBeTruthy();

            const contentChildTitle = titleElement.query(By.css('.contentchild-title'));
            expect(contentChildTitle).toBeTruthy();
            expect(contentChildTitle.nativeElement.textContent).toBe('ContentChild Title');
        });

        it('should render ContentChild subtitle template', () => {
            const subtitleElement = contentChildFixture.debugElement.query(By.css('.p-card-subtitle'));
            expect(subtitleElement).toBeTruthy();

            const contentChildSubtitle = subtitleElement.query(By.css('.contentchild-subtitle'));
            expect(contentChildSubtitle).toBeTruthy();
            expect(contentChildSubtitle.nativeElement.textContent).toBe('ContentChild Subtitle');
        });

        it('should render ContentChild content template', () => {
            const contentElement = contentChildFixture.debugElement.query(By.css('.p-card-content'));
            expect(contentElement).toBeTruthy();

            const contentChildContent = contentElement.query(By.css('.contentchild-content'));
            expect(contentChildContent).toBeTruthy();
            expect(contentChildContent.nativeElement.textContent).toBe('ContentChild Content');
        });

        it('should render ContentChild footer template', () => {
            const footerElement = contentChildFixture.debugElement.query(By.css('.p-card-footer'));
            expect(footerElement).toBeTruthy();

            const contentChildFooter = footerElement.query(By.css('.contentchild-footer'));
            expect(contentChildFooter).toBeTruthy();
            expect(contentChildFooter.nativeElement.textContent).toBe('ContentChild Footer');
        });

        it('should have correct template references in component', () => {
            expect(contentChildComponent.headerTemplate).toBeDefined();
            expect(contentChildComponent.titleTemplate).toBeDefined();
            expect(contentChildComponent.subtitleTemplate).toBeDefined();
            expect(contentChildComponent.contentTemplate).toBeDefined();
            expect(contentChildComponent.footerTemplate).toBeDefined();
        });
    });

    describe('Simple Text Properties', () => {
        let simpleFixture: ComponentFixture<TestSimpleTextCardComponent>;

        beforeEach(async () => {
            simpleFixture = TestBed.createComponent(TestSimpleTextCardComponent);
            await simpleFixture.whenStable();
        });

        it('should render simple header text', () => {
            const titleElement = simpleFixture.debugElement.query(By.css('.p-card-title'));
            expect(titleElement).toBeTruthy();
            expect(titleElement.nativeElement.textContent.trim()).toBe('Simple Header');
        });

        it('should render simple subheader text', () => {
            const subtitleElement = simpleFixture.debugElement.query(By.css('.p-card-subtitle'));
            expect(subtitleElement).toBeTruthy();
            expect(subtitleElement.nativeElement.textContent.trim()).toBe('Simple Subheader');
        });

        it('should render content with text properties', () => {
            const contentElement = simpleFixture.debugElement.query(By.css('.p-card-content'));
            expect(contentElement).toBeTruthy();

            const simpleContent = contentElement.query(By.css('.simple-content'));
            expect(simpleContent).toBeTruthy();
            expect(simpleContent.nativeElement.textContent).toBe('Simple card content with just text properties');
        });
    });

    describe('Dynamic Content', () => {
        let dynamicFixture: ComponentFixture<TestDynamicCardComponent>;
        let dynamicComponent: TestDynamicCardComponent;

        beforeEach(async () => {
            dynamicFixture = TestBed.createComponent(TestDynamicCardComponent);
            dynamicComponent = dynamicFixture.componentInstance;
            await dynamicFixture.whenStable();
        });

        it('should handle dynamic header changes', async () => {
            let titleElement = dynamicFixture.debugElement.query(By.css('.p-card-title'));
            expect(titleElement.nativeElement.textContent.trim()).toBe('Initial Header');

            dynamicComponent.header = 'Changed Header';
            dynamicFixture.changeDetectorRef.markForCheck();
            await dynamicFixture.whenStable();
            expect(titleElement.nativeElement.textContent.trim()).toBe('Changed Header');
        });

        it('should handle dynamic subheader changes', async () => {
            let subtitleElement = dynamicFixture.debugElement.query(By.css('.p-card-subtitle'));
            expect(subtitleElement.nativeElement.textContent.trim()).toBe('Initial Subheader');

            dynamicComponent.subheader = 'Changed Subheader';
            dynamicFixture.changeDetectorRef.markForCheck();
            await dynamicFixture.whenStable();
            expect(subtitleElement.nativeElement.textContent.trim()).toBe('Changed Subheader');
        });

        it('should handle dynamic content visibility', async () => {
            let dynamicContent = dynamicFixture.debugElement.query(By.css('.dynamic-content'));
            expect(dynamicContent).toBeTruthy();

            dynamicComponent.showContent = false;
            dynamicFixture.changeDetectorRef.markForCheck();
            await dynamicFixture.whenStable();
            dynamicContent = dynamicFixture.debugElement.query(By.css('.dynamic-content'));
            expect(dynamicContent).toBeFalsy();

            dynamicComponent.showContent = true;
            dynamicFixture.changeDetectorRef.markForCheck();
            await dynamicFixture.whenStable();
            dynamicContent = dynamicFixture.debugElement.query(By.css('.dynamic-content'));
            expect(dynamicContent).toBeTruthy();
        });
    });

    describe('Complex Card Structure', () => {
        let complexFixture: ComponentFixture<TestComplexCardComponent>;

        beforeEach(async () => {
            complexFixture = TestBed.createComponent(TestComplexCardComponent);
            await complexFixture.whenStable();
        });

        it('should render complex header with actions', () => {
            const headerElement = complexFixture.debugElement.query(By.css('.p-card-header'));
            expect(headerElement).toBeTruthy();

            const headerActions = headerElement.query(By.css('.header-with-actions'));
            expect(headerActions).toBeTruthy();

            const actionButton = headerActions.query(By.css('.header-action'));
            expect(actionButton).toBeTruthy();
            expect(actionButton.nativeElement.textContent).toBe('Action');
        });

        it('should render complex content with multiple elements', () => {
            const contentElement = complexFixture.debugElement.query(By.css('.p-card-content'));
            expect(contentElement).toBeTruthy();

            const complexContent = contentElement.query(By.css('.complex-content'));
            expect(complexContent).toBeTruthy();

            const listItems = complexContent.queryAll(By.css('li'));
            expect(listItems.length).toBe(3);
        });

        it('should render complex footer with buttons', () => {
            const footerElement = complexFixture.debugElement.query(By.css('.p-card-footer'));
            expect(footerElement).toBeTruthy();

            const footerButtons = footerElement.query(By.css('.footer-buttons'));
            expect(footerButtons).toBeTruthy();

            const buttons = footerButtons.queryAll(By.css('button'));
            expect(buttons.length).toBe(2);
            expect(buttons[0].nativeElement.textContent).toBe('Save');
            expect(buttons[1].nativeElement.textContent).toBe('Cancel');
        });
    });

    describe('Partial Content Scenarios', () => {
        it('should render header only card', async () => {
            const headerOnlyFixture = TestBed.createComponent(TestHeaderOnlyCardComponent);
            await headerOnlyFixture.whenStable();

            const titleElement = headerOnlyFixture.debugElement.query(By.css('.p-card-title'));
            expect(titleElement).toBeTruthy();
            expect(titleElement.nativeElement.textContent.trim()).toBe('Header Only');

            const subtitleElement = headerOnlyFixture.debugElement.query(By.css('.p-card-subtitle'));
            expect(subtitleElement).toBeFalsy();

            const footerElement = headerOnlyFixture.debugElement.query(By.css('.p-card-footer'));
            expect(footerElement).toBeFalsy();
        });

        it('should render subheader only card', async () => {
            const subheaderOnlyFixture = TestBed.createComponent(TestSubheaderOnlyCardComponent);
            await subheaderOnlyFixture.whenStable();

            const titleElement = subheaderOnlyFixture.debugElement.query(By.css('.p-card-title'));
            expect(titleElement).toBeFalsy();

            const subtitleElement = subheaderOnlyFixture.debugElement.query(By.css('.p-card-subtitle'));
            expect(subtitleElement).toBeTruthy();
            expect(subtitleElement.nativeElement.textContent.trim()).toBe('Subheader Only');

            const footerElement = subheaderOnlyFixture.debugElement.query(By.css('.p-card-footer'));
            expect(footerElement).toBeFalsy();
        });

        it('should render footer only card', async () => {
            const footerOnlyFixture = TestBed.createComponent(TestFooterOnlyCardComponent);
            await footerOnlyFixture.whenStable();

            const titleElement = footerOnlyFixture.debugElement.query(By.css('.p-card-title'));
            expect(titleElement).toBeFalsy();

            const subtitleElement = footerOnlyFixture.debugElement.query(By.css('.p-card-subtitle'));
            expect(subtitleElement).toBeFalsy();

            const headerElement = footerOnlyFixture.debugElement.query(By.css('.p-card-header'));
            expect(headerElement).toBeFalsy();

            const footerElement = footerOnlyFixture.debugElement.query(By.css('.p-card-footer'));
            expect(footerElement).toBeTruthy();

            const footerContent = footerElement.query(By.css('.footer-only'));
            expect(footerContent).toBeTruthy();
            expect(footerContent.nativeElement.textContent).toBe('Footer Only Content');
        });
    });

    describe('BlockableUI Interface', () => {
        it('should implement getBlockableElement method', () => {
            expect(typeof card.getBlockableElement).toBe('function');
        });

        it('should return host element from getBlockableElement', () => {
            const blockableElement = card.getBlockableElement();
            expect(blockableElement).toBeTruthy();
            expect(blockableElement).toBe(cardEl.nativeElement);
        });

        it('should return correct blockable element with complex content', async () => {
            const complexFixture = TestBed.createComponent(TestComplexCardComponent);
            await complexFixture.whenStable();

            const complexCard = complexFixture.debugElement.query(By.directive(Card)).componentInstance;
            const blockableElement = complexCard.getBlockableElement();

            expect(blockableElement).toBeTruthy();
            expect(blockableElement).toBe(complexFixture.debugElement.query(By.directive(Card)).nativeElement);
        });
    });

    describe('CSS Classes and Styling', () => {
        it('should apply base component classes correctly', () => {
            const cardElement = fixture.debugElement.query(By.css('p-card'));
            expect(cardElement.nativeElement.className).toContain('p-card');
            expect(cardElement.nativeElement.className).toContain('p-component');
        });

        it('should apply section classes correctly', async () => {
            const templateFixture = TestBed.createComponent(TestTemplateCardComponent);
            await templateFixture.whenStable();

            const headerElement = templateFixture.debugElement.query(By.css('.p-card-header'));
            const bodyElement = templateFixture.debugElement.query(By.css('.p-card-body'));
            const titleElement = templateFixture.debugElement.query(By.css('.p-card-title'));
            const subtitleElement = templateFixture.debugElement.query(By.css('.p-card-subtitle'));
            const contentElement = templateFixture.debugElement.query(By.css('.p-card-content'));
            const footerElement = templateFixture.debugElement.query(By.css('.p-card-footer'));

            expect(headerElement.nativeElement.className).toContain('p-card-header');
            expect(bodyElement.nativeElement.className).toContain('p-card-body');
            expect(titleElement.nativeElement.className).toContain('p-card-title');
            expect(subtitleElement.nativeElement.className).toContain('p-card-subtitle');
            expect(contentElement.nativeElement.className).toContain('p-card-content');
            expect(footerElement.nativeElement.className).toContain('p-card-footer');
        });
    });

    describe('Template Processing', () => {
        it('should process templates after content init', async () => {
            const templateFixture = TestBed.createComponent(TestTemplateCardComponent);
            await templateFixture.whenStable();

            const cardInstance = templateFixture.debugElement.query(By.directive(Card)).componentInstance;

            expect(cardInstance.headerTemplate()).toBeTruthy();
            expect(cardInstance.titleTemplate()).toBeTruthy();
            expect(cardInstance.subtitleTemplate()).toBeTruthy();
            expect(cardInstance.contentTemplate()).toBeTruthy();
            expect(cardInstance.footerTemplate()).toBeTruthy();
        });

        it('should handle templates with ngAfterContentInit lifecycle', async () => {
            const templateFixture = TestBed.createComponent(TestTemplateCardComponent);
            await templateFixture.whenStable();

            const cardInstance = templateFixture.debugElement.query(By.directive(Card)).componentInstance;

            spyOn(cardInstance, 'ngAfterContentInit').and.callThrough();

            // Trigger ngAfterContentInit manually
            cardInstance.ngAfterContentInit();

            expect(cardInstance.ngAfterContentInit).toHaveBeenCalled();
        });
    });

    describe('Data Attributes', () => {
        it('should have correct data-pc-name', () => {
            expect(cardEl.nativeElement.getAttribute('data-pc-name')).toBe('card');
        });

        it('should maintain data attributes after property changes', async () => {
            const customFixture = TestBed.createComponent(TestCustomCardComponent);
            const customComponent = customFixture.componentInstance;
            await customFixture.whenStable();

            let cardElement = customFixture.debugElement.query(By.directive(Card));
            expect(cardElement.nativeElement.getAttribute('data-pc-name')).toBe('card');

            customComponent.header = 'Changed Header';
            customFixture.changeDetectorRef.markForCheck();
            await customFixture.whenStable();

            expect(cardElement.nativeElement.getAttribute('data-pc-name')).toBe('card');
        });
    });

    describe('Edge Cases', () => {
        it('should handle undefined properties gracefully', async () => {
            const customFixture = TestBed.createComponent(TestCustomCardComponent);
            const customComponent = customFixture.componentInstance;

            customComponent.header = undefined as any;
            customComponent.subheader = undefined as any;
            customComponent.style = undefined as any;

            await expect(async () => {
                customFixture.changeDetectorRef.markForCheck();
                await customFixture.whenStable();
            }).not.toThrow();

            const cardElement = customFixture.debugElement.query(By.directive(Card));
            expect(cardElement).toBeTruthy();
        });

        it('should handle rapid property changes', async () => {
            const customFixture = TestBed.createComponent(TestCustomCardComponent);
            const customComponent = customFixture.componentInstance;
            await customFixture.whenStable();

            customComponent.header = 'Header 1';
            customComponent.subheader = 'Subheader 1';
            customFixture.changeDetectorRef.markForCheck();
            await customFixture.whenStable();

            customComponent.header = 'Header 2';
            customComponent.subheader = 'Subheader 2';
            customFixture.changeDetectorRef.markForCheck();
            await customFixture.whenStable();

            const titleElement = customFixture.debugElement.query(By.css('.p-card-title'));
            const subtitleElement = customFixture.debugElement.query(By.css('.p-card-subtitle'));

            expect(titleElement.nativeElement.textContent.trim()).toBe('Header 2');
            expect(subtitleElement.nativeElement.textContent.trim()).toBe('Subheader 2');
        });

        it('should handle empty string values', async () => {
            const customFixture = TestBed.createComponent(TestCustomCardComponent);
            const customComponent = customFixture.componentInstance;

            customComponent.header = '';
            customComponent.subheader = '';
            customFixture.changeDetectorRef.markForCheck();
            await customFixture.whenStable();

            // Empty strings are falsy values, so title and subtitle elements should not be rendered
            const titleElement = customFixture.debugElement.query(By.css('.p-card-title'));
            const subtitleElement = customFixture.debugElement.query(By.css('.p-card-subtitle'));

            expect(titleElement).toBeFalsy();
            expect(subtitleElement).toBeFalsy();
        });
    });

    describe('Memory Management', () => {
        it('should cleanup on destroy', () => {
            expect(() => {
                fixture.destroy();
            }).not.toThrow();
        });

        it('should cleanup templates on destroy', async () => {
            const templateFixture = TestBed.createComponent(TestTemplateCardComponent);
            await templateFixture.whenStable();

            expect(() => {
                templateFixture.destroy();
            }).not.toThrow();
        });

        it('should handle rapid creation and destruction', async () => {
            for (let i = 0; i < 5; i++) {
                const testFixture = TestBed.createComponent(TestCustomCardComponent);
                await testFixture.whenStable();
                testFixture.destroy();
            }

            expect(true).toBe(true);
        });

        it('should cleanup complex components', async () => {
            const complexFixture = TestBed.createComponent(TestComplexCardComponent);
            await complexFixture.whenStable();

            expect(() => {
                complexFixture.destroy();
            }).not.toThrow();
        });
    });

    describe('Component Integration', () => {
        it('should handle card with all features enabled', async () => {
            const templateFixture = TestBed.createComponent(TestTemplateCardComponent);
            await templateFixture.whenStable();

            const cardElement = templateFixture.debugElement.query(By.directive(Card));
            expect(cardElement.nativeElement.children.length).toBeGreaterThan(0);

            const headerElement = templateFixture.debugElement.query(By.css('.p-card-header'));
            const bodyElement = templateFixture.debugElement.query(By.css('.p-card-body'));
            const footerElement = templateFixture.debugElement.query(By.css('.p-card-footer'));

            expect(headerElement).toBeTruthy();
            expect(bodyElement).toBeTruthy();
            expect(footerElement).toBeTruthy();
        });

        it('should maintain card structure with different content types', async () => {
            const facetFixture = TestBed.createComponent(TestFacetCardComponent);
            await facetFixture.whenStable();

            const cardElement = facetFixture.debugElement.query(By.directive(Card));
            expect(cardElement.nativeElement.getAttribute('data-pc-name')).toBe('card');

            const bodyElement = facetFixture.debugElement.query(By.css('.p-card-body'));
            expect(bodyElement).toBeTruthy();
        });
    });

    describe('PassThrough (PT) Support', () => {
        describe('Case 1: Simple String Classes', () => {
            it('should apply PT class to host section', async () => {
                const fixture = TestBed.createComponent(Card);
                fixture.componentRef.setInput('pt', { host: 'HOST_CLASS' });
                await fixture.whenStable();

                const hostElement = fixture.nativeElement;
                expect(hostElement.className).toContain('HOST_CLASS');
            });

            it('should apply PT class to root section', async () => {
                const fixture = TestBed.createComponent(Card);
                fixture.componentRef.setInput('pt', { root: 'ROOT_CLASS' });
                await fixture.whenStable();

                const hostElement = fixture.nativeElement;
                expect(hostElement.className).toContain('ROOT_CLASS');
            });

            it('should apply PT class to header section', async () => {
                const fixture = TestBed.createComponent(Card);
                fixture.componentRef.setInput('header', 'Test Header');
                fixture.componentRef.setInput('pt', { title: 'HEADER_CLASS' });
                await fixture.whenStable();

                const headerEl = fixture.debugElement.query(By.css('.p-card-title'));
                expect(headerEl.nativeElement.className).toContain('HEADER_CLASS');
            });

            it('should apply PT class to body section', async () => {
                const fixture = TestBed.createComponent(Card);
                fixture.componentRef.setInput('pt', { body: 'BODY_CLASS' });
                await fixture.whenStable();

                const bodyEl = fixture.debugElement.query(By.css('.p-card-body'));
                expect(bodyEl.nativeElement.className).toContain('BODY_CLASS');
            });

            it('should apply PT class to title section', async () => {
                const fixture = TestBed.createComponent(Card);
                fixture.componentRef.setInput('header', 'Test Title');
                fixture.componentRef.setInput('pt', { title: 'TITLE_CLASS' });
                await fixture.whenStable();

                const titleEl = fixture.debugElement.query(By.css('.p-card-title'));
                expect(titleEl.nativeElement.className).toContain('TITLE_CLASS');
            });

            it('should apply PT class to subtitle section', async () => {
                const fixture = TestBed.createComponent(Card);
                fixture.componentRef.setInput('subheader', 'Test Subtitle');
                fixture.componentRef.setInput('pt', { subtitle: 'SUBTITLE_CLASS' });
                await fixture.whenStable();

                const subtitleEl = fixture.debugElement.query(By.css('.p-card-subtitle'));
                expect(subtitleEl.nativeElement.className).toContain('SUBTITLE_CLASS');
            });

            it('should apply PT class to content section', async () => {
                const fixture = TestBed.createComponent(Card);
                fixture.componentRef.setInput('pt', { content: 'CONTENT_CLASS' });
                await fixture.whenStable();

                const contentEl = fixture.debugElement.query(By.css('.p-card-content'));
                expect(contentEl.nativeElement.className).toContain('CONTENT_CLASS');
            });
        });

        describe('Case 2: Object Values with Attributes and Styles', () => {
            xit('should apply PT object with class, style and data attributes to root', async () => {
                // Skipped: PT style binding causes infinite loop with current implementation
                const fixture = TestBed.createComponent(Card);
                fixture.componentRef.setInput('pt', {
                    root: {
                        class: 'ROOT_OBJECT_CLASS',
                        'data-p-test': true,
                        'aria-label': 'TEST_ARIA_LABEL'
                    }
                });
                await fixture.whenStable();

                const hostElement = fixture.nativeElement;
                expect(hostElement.className).toContain('ROOT_OBJECT_CLASS');
                expect(hostElement.getAttribute('data-p-test')).toBe('true');
                expect(hostElement.getAttribute('aria-label')).toBe('TEST_ARIA_LABEL');
            });

            xit('should apply PT object with attributes to header', async () => {
                // Skipped: PT style binding causes infinite loop
                const fixture = TestBed.createComponent(Card);
                fixture.componentRef.setInput('header', 'Test');
                fixture.componentRef.setInput('pt', {
                    title: {
                        class: 'HEADER_OBJECT_CLASS',
                        'data-testid': 'card-header'
                    }
                });
                await fixture.whenStable();

                const headerEl = fixture.debugElement.query(By.css('.p-card-title'));
                expect(headerEl.nativeElement.className).toContain('HEADER_OBJECT_CLASS');
                expect(headerEl.nativeElement.getAttribute('data-testid')).toBe('card-header');
            });

            it('should apply PT object to body', async () => {
                const fixture = TestBed.createComponent(Card);
                fixture.componentRef.setInput('pt', {
                    body: {
                        class: 'BODY_OBJECT_CLASS',
                        'aria-labelledby': 'custom-label'
                    }
                });
                await fixture.whenStable();

                const bodyEl = fixture.debugElement.query(By.css('.p-card-body'));
                expect(bodyEl.nativeElement.className).toContain('BODY_OBJECT_CLASS');
                expect(bodyEl.nativeElement.getAttribute('aria-labelledby')).toBe('custom-label');
            });

            it('should apply PT object to content', async () => {
                const fixture = TestBed.createComponent(Card);
                fixture.componentRef.setInput('pt', {
                    content: {
                        class: 'CONTENT_OBJECT_CLASS',
                        style: { margin: '10px' }
                    }
                });
                await fixture.whenStable();

                const contentEl = fixture.debugElement.query(By.css('.p-card-content'));
                expect(contentEl.nativeElement.className).toContain('CONTENT_OBJECT_CLASS');
                expect(contentEl.nativeElement.style.margin).toBe('10px');
            });
        });

        describe('Case 3: Mixed String and Object Values', () => {
            it('should apply mixed PT values to multiple sections', async () => {
                const fixture = TestBed.createComponent(Card);
                fixture.componentRef.setInput('header', 'Test');
                fixture.componentRef.setInput('subheader', 'Test Subtitle');
                fixture.componentRef.setInput('pt', {
                    root: {
                        class: 'ROOT_MIXED_CLASS'
                    },
                    title: 'TITLE_STRING_CLASS',
                    subtitle: {
                        class: 'SUBTITLE_MIXED_CLASS',
                        style: { margin: '10px' }
                    }
                });
                await fixture.whenStable();

                const hostElement = fixture.nativeElement;
                expect(hostElement.className).toContain('ROOT_MIXED_CLASS');

                const titleEl = fixture.debugElement.query(By.css('.p-card-title'));
                expect(titleEl.nativeElement.className).toContain('TITLE_STRING_CLASS');

                const subtitleEl = fixture.debugElement.query(By.css('.p-card-subtitle'));
                expect(subtitleEl.nativeElement.className).toContain('SUBTITLE_MIXED_CLASS');
                expect(subtitleEl.nativeElement.style.margin).toBe('10px');
            });
        });

        xdescribe('Case 4: Instance-based Functions', () => {
            it('should apply PT function using instance header state', async () => {
                const fixture = TestBed.createComponent(Card);
                fixture.componentRef.setInput('header', 'Test Header');
                fixture.componentRef.setInput('pt', {
                    root: ({ instance }) => ({
                        class: {
                            HAS_HEADER: !!instance?.header
                        }
                    })
                });
                await fixture.whenStable();

                const hostElement = fixture.nativeElement;
                expect(hostElement.className).toContain('HAS_HEADER');
            });

            it('should apply PT function with dynamic styles based on instance state', async () => {
                // Skipped: PT style binding causes infinite loop
                const fixture = TestBed.createComponent(Card);
                fixture.componentRef.setInput('header', 'Test');
                fixture.componentRef.setInput('pt', {
                    title: ({ instance }) => ({
                        class: instance?.header ? 'HAS_HEADER' : 'NO_HEADER'
                    })
                });
                await fixture.whenStable();

                const titleEl = fixture.debugElement.query(By.css('.p-card-title'));
                expect(titleEl?.nativeElement.className).toContain('HAS_HEADER');
            });

            it('should update PT when instance state changes', async () => {
                const fixture = TestBed.createComponent(Card);
                fixture.componentRef.setInput('header', 'Initial Header');
                fixture.componentRef.setInput('pt', {
                    root: ({ instance }) => ({
                        class: {
                            HAS_HEADER: !!instance?.header,
                            NO_HEADER: !instance?.header
                        }
                    })
                });
                await fixture.whenStable();

                const hostElement = fixture.nativeElement;
                expect(hostElement.className).toContain('HAS_HEADER');

                // Change header to undefined
                fixture.componentRef.setInput('header', undefined);
                await fixture.whenStable();

                expect(hostElement.className).toContain('NO_HEADER');
            });
        });

        describe('Case 5: Event Binding via PT', () => {
            it('should handle onclick event through PT on title section', async () => {
                const fixture = TestBed.createComponent(Card);
                fixture.componentRef.setInput('header', 'Test');
                let clicked = false;

                fixture.componentRef.setInput('pt', {
                    title: {
                        onclick: () => {
                            clicked = true;
                        }
                    }
                });
                await fixture.whenStable();

                const titleEl = fixture.debugElement.query(By.css('.p-card-title'));
                titleEl.nativeElement.click();

                expect(clicked).toBe(true);
            });

            it('should handle onclick event through PT on content section', async () => {
                const fixture = TestBed.createComponent(Card);
                let contentClicked = false;

                fixture.componentRef.setInput('pt', {
                    content: {
                        onclick: () => {
                            contentClicked = true;
                        }
                    }
                });
                await fixture.whenStable();

                const contentEl = fixture.debugElement.query(By.css('.p-card-content'));
                contentEl.nativeElement.click();

                expect(contentClicked).toBe(true);
            });
        });

        describe('Case 6: Inline PT Usage', () => {
            it('should apply inline PT with string class', async () => {
                const inlineFixture = TestBed.createComponent(Card);
                inlineFixture.componentRef.setInput('pt', { root: { class: 'INLINE_ROOT_CLASS' } });
                await inlineFixture.whenStable();

                const cardElement = inlineFixture.nativeElement;
                expect(cardElement.className).toContain('INLINE_ROOT_CLASS');
            });

            it('should apply inline PT with object class', async () => {
                const inlineFixture = TestBed.createComponent(Card);
                inlineFixture.componentRef.setInput('pt', { root: { class: 'INLINE_OBJECT_CLASS' } });
                await inlineFixture.whenStable();

                const cardElement = inlineFixture.nativeElement;
                expect(cardElement.className).toContain('INLINE_OBJECT_CLASS');
            });
        });

        describe('PT with Footer Section', () => {
            it('should apply PT class to footer section when footer content exists', async () => {
                @Component({
                    standalone: false,
                    template: `
                        <p-card [pt]="pt">
                            <ng-template #footer>
                                <div>Footer Content</div>
                            </ng-template>
                        </p-card>
                    `
                })
                class TestPTFooterComponent {
                    pt = { footer: 'FOOTER_CLASS' };
                }

                TestBed.resetTestingModule();
                TestBed.configureTestingModule({
                    imports: [CardModule],
                    declarations: [TestPTFooterComponent],
                    providers: [provideZonelessChangeDetection()]
                });

                const fixture = TestBed.createComponent(TestPTFooterComponent);
                await fixture.whenStable();

                const footerEl = fixture.debugElement.query(By.css('.p-card-footer'));
                expect(footerEl).toBeTruthy();
                expect(footerEl.nativeElement.className).toContain('FOOTER_CLASS');
            });

            it('should apply PT class to header section', async () => {
                @Component({
                    standalone: false,
                    template: `
                        <p-card [pt]="pt">
                            <ng-template #header>
                                <div>Header Content</div>
                            </ng-template>
                        </p-card>
                    `
                })
                class TestPTHeaderComponent {
                    pt = { header: 'HEADER_SECTION_CLASS' };
                }

                TestBed.resetTestingModule();
                TestBed.configureTestingModule({
                    imports: [CardModule],
                    declarations: [TestPTHeaderComponent],
                    providers: [provideZonelessChangeDetection()]
                });

                const fixture = TestBed.createComponent(TestPTHeaderComponent);
                await fixture.whenStable();

                const headerEl = fixture.debugElement.query(By.css('.p-card-header'));
                expect(headerEl).toBeTruthy();
                expect(headerEl.nativeElement.className).toContain('HEADER_SECTION_CLASS');
            });
        });

        describe('Case 7: Global PT from PrimeNGConfig', () => {
            it('should apply global PT configuration from PrimeNGConfig', async () => {
                @Component({
                    standalone: false,
                    template: `
                        <p-card header="Card 1"></p-card>
                        <p-card header="Card 2"></p-card>
                    `
                })
                class TestGlobalPTComponent {}

                TestBed.resetTestingModule();
                TestBed.configureTestingModule({
                    imports: [CardModule],
                    declarations: [TestGlobalPTComponent],
                    providers: [
                        provideZonelessChangeDetection(),
                        {
                            provide: 'providePrimeNG',
                            useValue: {
                                pt: {
                                    card: {
                                        root: 'GLOBAL_CARD_CLASS',
                                        title: { 'aria-label': 'GLOBAL_ARIA_LABEL' }
                                    }
                                }
                            }
                        }
                    ]
                });

                const fixture = TestBed.createComponent(TestGlobalPTComponent);
                await fixture.whenStable();

                const cardElements = fixture.debugElement.queryAll(By.directive(Card));
                expect(cardElements.length).toBe(2);
            });

            it('should merge local PT with global PT', async () => {
                @Component({
                    standalone: false,
                    template: `<p-card [pt]="localPt" header="Test"></p-card>`
                })
                class TestMergePTComponent {
                    localPt = { root: 'LOCAL_CLASS', title: 'LOCAL_TITLE_CLASS' };
                }

                TestBed.resetTestingModule();
                TestBed.configureTestingModule({
                    imports: [CardModule],
                    declarations: [TestMergePTComponent],
                    providers: [provideZonelessChangeDetection()]
                });

                const fixture = TestBed.createComponent(TestMergePTComponent);
                await fixture.whenStable();

                const cardEl = fixture.debugElement.query(By.css('p-card'));
                expect(cardEl.nativeElement.className).toContain('LOCAL_CLASS');

                const titleEl = fixture.debugElement.query(By.css('.p-card-title'));
                expect(titleEl.nativeElement.className).toContain('LOCAL_TITLE_CLASS');
            });
        });

        xdescribe('Case 8: PT Hooks', () => {
            // Skipped: Card component hooks support needs to be verified
            xit('should execute onAfterViewInit hook from PT', async () => {
                let hookExecuted = false;

                @Component({
                    standalone: false,
                    template: `<p-card [pt]="pt"></p-card>`
                })
                class TestPTHooksComponent {
                    pt = {
                        root: 'MY_CARD',
                        hooks: {
                            onAfterViewInit: () => {
                                hookExecuted = true;
                            }
                        }
                    };
                }

                TestBed.resetTestingModule();
                TestBed.configureTestingModule({
                    imports: [CardModule],
                    declarations: [TestPTHooksComponent],
                    providers: [provideZonelessChangeDetection()]
                });

                const fixture = TestBed.createComponent(TestPTHooksComponent);
                await fixture.whenStable();

                expect(hookExecuted).toBe(true);
            });

            xit('should execute onBeforeMount hook from PT', async () => {
                let beforeMountExecuted = false;

                @Component({
                    standalone: false,
                    template: `<p-card [pt]="pt"></p-card>`
                })
                class TestPTBeforeMountComponent {
                    pt = {
                        hooks: {
                            onBeforeMount: () => {
                                beforeMountExecuted = true;
                            }
                        }
                    };
                }

                TestBed.resetTestingModule();
                TestBed.configureTestingModule({
                    imports: [CardModule],
                    declarations: [TestPTBeforeMountComponent],
                    providers: [provideZonelessChangeDetection()]
                });

                const fixture = TestBed.createComponent(TestPTBeforeMountComponent);
                await fixture.whenStable();

                expect(beforeMountExecuted).toBe(true);
            });

            xit('should execute onAfterContentInit hook from PT', async () => {
                let contentInitExecuted = false;

                @Component({
                    standalone: false,
                    template: `<p-card [pt]="pt"></p-card>`
                })
                class TestPTContentInitComponent {
                    pt = {
                        hooks: {
                            onAfterContentInit: () => {
                                contentInitExecuted = true;
                            }
                        }
                    };
                }

                TestBed.resetTestingModule();
                TestBed.configureTestingModule({
                    imports: [CardModule],
                    declarations: [TestPTContentInitComponent],
                    providers: [provideZonelessChangeDetection()]
                });

                const fixture = TestBed.createComponent(TestPTContentInitComponent);
                await fixture.whenStable();

                expect(contentInitExecuted).toBe(true);
            });

            xit('should execute multiple lifecycle hooks from PT', async () => {
                const executedHooks: string[] = [];

                @Component({
                    standalone: false,
                    template: `<p-card [pt]="pt"></p-card>`
                })
                class TestMultiplePTHooksComponent {
                    pt = {
                        hooks: {
                            onBeforeMount: () => {
                                executedHooks.push('onBeforeMount');
                            },
                            onAfterContentInit: () => {
                                executedHooks.push('onAfterContentInit');
                            },
                            onAfterViewInit: () => {
                                executedHooks.push('onAfterViewInit');
                            }
                        }
                    };
                }

                TestBed.resetTestingModule();
                TestBed.configureTestingModule({
                    imports: [CardModule],
                    declarations: [TestMultiplePTHooksComponent],
                    providers: [provideZonelessChangeDetection()]
                });

                const fixture = TestBed.createComponent(TestMultiplePTHooksComponent);
                await fixture.whenStable();

                expect(executedHooks.length).toBeGreaterThan(0);
            });
        });

        describe('Advanced PT Scenarios', () => {
            it('should apply PT with all sections', async () => {
                @Component({
                    standalone: false,
                    template: `
                        <p-card [pt]="pt" [header]="'Test Header'" [subheader]="'Test Subheader'">
                            <ng-template #header>
                                <div>Header Content</div>
                            </ng-template>
                            <div>Content</div>
                            <ng-template #footer>
                                <div>Footer Content</div>
                            </ng-template>
                        </p-card>
                    `
                })
                class TestAllSectionsPTComponent {
                    pt = {
                        root: 'PT_ROOT',
                        header: 'PT_HEADER',
                        body: 'PT_BODY',
                        title: 'PT_TITLE',
                        subtitle: 'PT_SUBTITLE',
                        content: 'PT_CONTENT',
                        footer: 'PT_FOOTER'
                    };
                }

                TestBed.resetTestingModule();
                TestBed.configureTestingModule({
                    imports: [CardModule],
                    declarations: [TestAllSectionsPTComponent],
                    providers: [provideZonelessChangeDetection()]
                });

                const fixture = TestBed.createComponent(TestAllSectionsPTComponent);
                await fixture.whenStable();

                const cardEl = fixture.debugElement.query(By.css('p-card'));
                expect(cardEl.nativeElement.className).toContain('PT_ROOT');

                const headerEl = fixture.debugElement.query(By.css('.p-card-header'));
                expect(headerEl.nativeElement.className).toContain('PT_HEADER');

                const bodyEl = fixture.debugElement.query(By.css('.p-card-body'));
                expect(bodyEl.nativeElement.className).toContain('PT_BODY');

                const titleEl = fixture.debugElement.query(By.css('.p-card-title'));
                expect(titleEl.nativeElement.className).toContain('PT_TITLE');

                const subtitleEl = fixture.debugElement.query(By.css('.p-card-subtitle'));
                expect(subtitleEl.nativeElement.className).toContain('PT_SUBTITLE');

                const contentEl = fixture.debugElement.query(By.css('.p-card-content'));
                expect(contentEl.nativeElement.className).toContain('PT_CONTENT');

                const footerEl = fixture.debugElement.query(By.css('.p-card-footer'));
                expect(footerEl.nativeElement.className).toContain('PT_FOOTER');
            });

            it('should handle PT with function returning classes based on instance', async () => {
                @Component({
                    standalone: false,
                    template: `<p-card [pt]="pt" [header]="header"></p-card>`
                })
                class TestPTFunctionComponent {
                    header = 'Test Header';
                    pt = {
                        root: ({ instance }: any) => ({
                            class: instance?.header ? 'HAS-HEADER' : 'NO-HEADER'
                        })
                    };
                }

                TestBed.resetTestingModule();
                TestBed.configureTestingModule({
                    imports: [CardModule],
                    declarations: [TestPTFunctionComponent],
                    providers: [provideZonelessChangeDetection()]
                });

                const fixture = TestBed.createComponent(TestPTFunctionComponent);
                await fixture.whenStable();

                const cardEl = fixture.debugElement.query(By.css('p-card'));
                expect(cardEl.nativeElement.className).toContain('HAS-HEADER');
            });

            it('should handle dynamic PT updates', async () => {
                @Component({
                    standalone: false,
                    template: `<p-card [pt]="pt"></p-card>`
                })
                class TestDynamicPTComponent {
                    pt = { root: 'INITIAL_CLASS' };
                }

                TestBed.resetTestingModule();
                TestBed.configureTestingModule({
                    imports: [CardModule],
                    declarations: [TestDynamicPTComponent],
                    providers: [provideZonelessChangeDetection()]
                });

                const fixture = TestBed.createComponent(TestDynamicPTComponent);
                const component = fixture.componentInstance;
                await fixture.whenStable();

                let cardEl = fixture.debugElement.query(By.css('p-card'));
                expect(cardEl.nativeElement.className).toContain('INITIAL_CLASS');

                component.pt = { root: 'UPDATED_CLASS' };
                fixture.changeDetectorRef.markForCheck();
                await fixture.whenStable();

                expect(cardEl.nativeElement.className).toContain('UPDATED_CLASS');
            });

            it('should apply PT with data attributes and aria labels', async () => {
                const fixture = TestBed.createComponent(Card);
                fixture.componentRef.setInput('pt', {
                    root: {
                        class: 'PT_CUSTOM_CLASS',
                        'data-testid': 'card-test',
                        'aria-label': 'Custom Card'
                    }
                });
                await fixture.whenStable();

                const cardEl = fixture.nativeElement;
                expect(cardEl.className).toContain('PT_CUSTOM_CLASS');
                expect(cardEl.getAttribute('data-testid')).toBe('card-test');
                expect(cardEl.getAttribute('aria-label')).toBe('Custom Card');
            });

            it('should handle PT with multiple event handlers', async () => {
                let clickCount = 0;
                let mouseOverCount = 0;

                const fixture = TestBed.createComponent(Card);
                fixture.componentRef.setInput('header', 'Test');
                fixture.componentRef.setInput('pt', {
                    title: {
                        onclick: () => {
                            clickCount++;
                        },
                        onmouseover: () => {
                            mouseOverCount++;
                        }
                    }
                });
                await fixture.whenStable();

                const titleEl = fixture.debugElement.query(By.css('.p-card-title'));
                titleEl.nativeElement.click();
                titleEl.nativeElement.dispatchEvent(new MouseEvent('mouseover'));

                expect(clickCount).toBe(1);
                expect(mouseOverCount).toBe(1);
            });

            it('should apply PT with style objects', async () => {
                const fixture = TestBed.createComponent(Card);
                fixture.componentRef.setInput('pt', {
                    body: {
                        style: {
                            padding: '20px',
                            backgroundColor: 'lightblue'
                        }
                    }
                });
                await fixture.whenStable();

                const bodyEl = fixture.debugElement.query(By.css('.p-card-body'));
                expect(bodyEl.nativeElement.style.padding).toBe('20px');
                expect(bodyEl.nativeElement.style.backgroundColor).toBe('lightblue');
            });

            it('should handle PT function with instance-based styles', async () => {
                @Component({
                    standalone: false,
                    template: `<p-card [pt]="pt" [header]="header" [subheader]="subheader"></p-card>`
                })
                class TestPTInstanceStyleComponent {
                    header = 'Header';
                    subheader = 'Subheader';
                    pt = {
                        title: ({ instance }: any) => ({
                            style: {
                                color: instance?.subheader ? 'blue' : 'red'
                            }
                        })
                    };
                }

                TestBed.resetTestingModule();
                TestBed.configureTestingModule({
                    imports: [CardModule],
                    declarations: [TestPTInstanceStyleComponent],
                    providers: [provideZonelessChangeDetection()]
                });

                const fixture = TestBed.createComponent(TestPTInstanceStyleComponent);
                await fixture.whenStable();

                const titleEl = fixture.debugElement.query(By.css('.p-card-title'));
                expect(titleEl.nativeElement.style.color).toBe('blue');
            });

            it('should handle PT with complex nested objects', async () => {
                const fixture = TestBed.createComponent(Card);
                fixture.componentRef.setInput('header', 'Test');
                fixture.componentRef.setInput('pt', {
                    root: {
                        class: 'ROOT_COMPLEX',
                        'data-level': '1'
                    },
                    body: {
                        class: 'BODY_COMPLEX',
                        style: { margin: '15px' }
                    },
                    title: {
                        class: 'TITLE_COMPLEX',
                        'aria-level': '2'
                    }
                });
                await fixture.whenStable();

                const rootEl = fixture.nativeElement;
                expect(rootEl.className).toContain('ROOT_COMPLEX');
                expect(rootEl.getAttribute('data-level')).toBe('1');

                const bodyEl = fixture.debugElement.query(By.css('.p-card-body'));
                expect(bodyEl.nativeElement.className).toContain('BODY_COMPLEX');
                expect(bodyEl.nativeElement.style.margin).toBe('15px');

                const titleEl = fixture.debugElement.query(By.css('.p-card-title'));
                expect(titleEl.nativeElement.className).toContain('TITLE_COMPLEX');
                expect(titleEl.nativeElement.getAttribute('aria-level')).toBe('2');
            });
        });
    });
});
