import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ContextMenu, ContextMenuSub } from './contextmenu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ContextMenuService } from 'primeng/api';

@Component({
    template: `
    <p-contextMenu [global]="true" [model]="items1"></p-contextMenu>
    <p-contextMenu [target]="p" [model]="items1" [appendTo]="p"></p-contextMenu>
    <p #p>PrimeNG ROCKS!</p>
    `
})
class TestContextMenuTest {
    items1 = [
        {
            label: 'File',
            icon: 'pi pi-fw pi-file',
            items: [{
                    label: 'New', 
                    icon: 'pi pi-fw pi-plus',
                    items: [
                        {label: 'Project'},
                        {label: 'Other'},
                    ]
                },
                {label: 'Open'},
                {separator:true},
                {label: 'Quit'}
            ]
        },
        {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
                {label: 'Delete', icon: 'pi pi-fw pi-trash'},
                {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
            ]
        },
        {
            label: 'Help',
            icon: 'pi pi-fw pi-question',
            items: [
                {
                    label: 'Contents'
                },
                {
                    label: 'Search', 
                    icon: 'pi pi-fw pi-search', 
                    items: [
                        {
                            label: 'Text', 
                            items: [
                                {
                                    label: 'Workspace'
                                }
                            ]
                        },
                        {
                            label: 'File'
                        }
                ]}
            ]
        },
        {
            label: 'Actions',
            icon: 'pi pi-fw pi-cog',
            items: [
                {
                    label: 'Edit',
                    icon: 'pi pi-fw pi-pencil',
                    items: [
                        {label: 'Save', icon: 'pi pi-fw pi-save'},
                        {label: 'Update', icon: 'pi pi-fw pi-save'},
                    ]
                },
                {
                    label: 'Other',
                    icon: 'pi pi-fw pi-tags',
                    items: [
                        {label: 'Delete', icon: 'pi pi-fw pi-minus'}
                    ]
                }
            ]
        },
        {separator:true},
        {
            label: 'Quit', icon: 'pi pi-fw pi-times'
        }
    ];
}

describe('ConextMenu', () => {
  
  let contextMenu: ContextMenu;
  let contextMenuP: ContextMenu;
  let fixture: ComponentFixture<TestContextMenuTest>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            NoopAnimationsModule,
            RouterTestingModule.withRoutes([
                { path: 'test', component: ContextMenu }
            ]),
            ],
            declarations: [
            ContextMenu,
            ContextMenuSub,
            TestContextMenuTest
            ],
            providers: [
                ContextMenuService
            ]
        });

        fixture = TestBed.createComponent(TestContextMenuTest);
        contextMenu = fixture.debugElement.children[0].componentInstance;
        contextMenuP = fixture.debugElement.children[1].componentInstance;
    });

    it('should create container by default', () => {
        fixture.detectChanges();

        const containerEls = fixture.debugElement.queryAll(By.css('.p-contextmenu'));
        expect(containerEls.length).toEqual(2);
    });

    it('should open contextmenu (global)', () => {
        fixture.detectChanges();

        const showSpy = spyOn(contextMenu,"show").and.callThrough();
        const contextMenuEvent: any = document.createEvent('CustomEvent');
        contextMenuEvent.pageX = 20
        contextMenuEvent.pageY = 20;
        contextMenuEvent.initEvent('contextmenu', true, true);
        document.dispatchEvent(contextMenuEvent);
        fixture.detectChanges();

        expect(showSpy).toHaveBeenCalled();
    });

    it('should close contextmenu when outside click (global)', () => {
        fixture.detectChanges();

        const contextMenuEvent: any = document.createEvent('CustomEvent');
        contextMenuEvent.pageX = 20
        contextMenuEvent.pageY = 20;
        contextMenuEvent.initEvent('contextmenu', true, true);
        document.dispatchEvent(contextMenuEvent);
        fixture.detectChanges();

        const closeSpy = spyOn(contextMenu,"hide").and.callThrough();
        document.dispatchEvent(new Event("click"));
        fixture.detectChanges();

        expect(closeSpy).toHaveBeenCalled();
    });

    it('should close contextmenu when outside window resize (global)', () => {
        contextMenu.appendTo = "body";
        fixture.detectChanges();

        const contextMenuEvent: any = document.createEvent('CustomEvent');
        contextMenuEvent.pageX = 20
        contextMenuEvent.pageY = 20;
        contextMenuEvent.initEvent('contextmenu', true, true);
        document.dispatchEvent(contextMenuEvent);
        fixture.detectChanges();
        
        const hideSpy = spyOn(contextMenu,"hide").and.callThrough();
        window.dispatchEvent(new Event("resize"));
        fixture.detectChanges();

        expect(hideSpy).toHaveBeenCalled();
    });

    it('should open and close programmaticlaly', () => {
        fixture.detectChanges();

        const showSpy = spyOn(contextMenu,"show").and.callThrough();
        contextMenu.toggle();
        fixture.detectChanges();
        
        expect(showSpy).toHaveBeenCalled();
        const hideSpy = spyOn(contextMenu,"hide").and.callThrough();
        contextMenu.toggle();
        fixture.detectChanges();

        expect(hideSpy).toHaveBeenCalled();
    });

    it('should open contextmenu (target)', () => {
        fixture.detectChanges();

        const showSpy = spyOn(contextMenuP,"show").and.callThrough();
        const target = fixture.debugElement.query(By.css('p'));
        const contextMenuEvent: any = document.createEvent('CustomEvent');
        contextMenuEvent.pageX = 20
        contextMenuEvent.pageY = 20;
        contextMenuEvent.initEvent('contextmenu', true, true);
        target.nativeElement.dispatchEvent(contextMenuEvent);
        fixture.detectChanges();

        expect(showSpy).toHaveBeenCalled();
    });

    it('should close contextmenu when outside click (target)', () => {
        fixture.detectChanges();

        const target = fixture.debugElement.query(By.css('p'));
        const contextMenuEvent: any = document.createEvent('CustomEvent');
        contextMenuEvent.pageX = 20
        contextMenuEvent.pageY = 20;
        contextMenuEvent.initEvent('contextmenu', true, true);
        target.nativeElement.dispatchEvent(contextMenuEvent);
        fixture.detectChanges();

        const closeSpy = spyOn(contextMenuP,"hide").and.callThrough();
        document.dispatchEvent(new Event("click"));
        fixture.detectChanges();

        expect(closeSpy).toHaveBeenCalled();
    });

    it('should close contextmenu when outside window resize (target)', () => {
        contextMenu.appendTo = "body";
        fixture.detectChanges();

        const target = fixture.debugElement.query(By.css('p'));
        const contextMenuEvent: any = document.createEvent('CustomEvent');
        contextMenuEvent.pageX = 20
        contextMenuEvent.pageY = 20;
        contextMenuEvent.initEvent('contextmenu', true, true);
        target.nativeElement.dispatchEvent(contextMenuEvent);
        fixture.detectChanges();
        
        const hideSpy = spyOn(contextMenuP,"hide").and.callThrough();
        window.dispatchEvent(new Event("resize"));
        fixture.detectChanges();

        expect(hideSpy).toHaveBeenCalled();
    });
});
