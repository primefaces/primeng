import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MegaMenu } from './megamenu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('MegaMenu', () => {
  
  let megamenu: MegaMenu;
  let fixture: ComponentFixture<MegaMenu>;
  
  beforeEach(() => {
        TestBed.configureTestingModule({
        imports: [
            RouterTestingModule.withRoutes([
            { path: 'test', component: MegaMenu }
            ]),
            NoopAnimationsModule
        ],
        declarations: [
            MegaMenu
        ]
        });
        
        fixture = TestBed.createComponent(MegaMenu);
        megamenu = fixture.componentInstance;
    });

    it('should display by default', () => {
        fixture.detectChanges();
        
        const megaMenuEl = fixture.debugElement.query(By.css('div')).nativeElement;
        expect(megaMenuEl).toBeTruthy();
    });

    it('should change style and styleClass', () => {
        megamenu.style = {'primeng' : 'rocks!'};
        megamenu.styleClass = "Primeng ROCKS!";
        fixture.detectChanges();
        
        const megaMenuEl = fixture.debugElement.query(By.css('div')).nativeElement;
        expect(megaMenuEl.className).toContain("Primeng ROCKS!");
        expect(megaMenuEl.style.primeng).toContain("rocks!");
    });

    it('should horizontal by default', () => {
        megamenu.model  = [
        {
            label: 'TV', icon: 'fa fa-fw fa-check',
            items: [
                [
                    {
                        label: 'TV 1',
                        items: [{label: 'TV 1.1'},{label: 'TV 1.2'}]
                    },
                    {
                        label: 'TV 2',
                        items: [{label: 'TV 2.1'},{label: 'TV 2.2'}]
                    }
                ],
                [
                    {
                        label: 'TV 3',
                        items: [{label: 'TV 3.1'},{label: 'TV 3.2'}]
                    },
                    {
                        label: 'TV 4',
                        items: [{label: 'TV 4.1'},{label: 'TV 4.2'}]
                    }    
                ]
            ]
        }
        ];
        fixture.detectChanges();
        
        const megaMenuEl = fixture.debugElement.query(By.css('div')).nativeElement;
        const spanIconEl = fixture.debugElement.query(By.css('a')).children[2].nativeElement;
        const menuItemCustomEl = fixture.debugElement.query(By.css('.ui-menuitem.ui-menuitem-custom'));
        expect(megaMenuEl.className).toContain("ui-megamenu-horizontal");
        expect(spanIconEl.className).toContain("pi-caret-down");
        expect(menuItemCustomEl).toBeTruthy();
    });

    it('should change orientation', () => {
        megamenu.orientation = "vertical"
        megamenu.model  = [
        {
            label: 'TV', icon: 'fa fa-fw fa-check',
            items: [
                [
                    {
                        label: 'TV 1',
                        items: [{label: 'TV 1.1'},{label: 'TV 1.2'}]
                    },
                    {
                        label: 'TV 2',
                        items: [{label: 'TV 2.1'},{label: 'TV 2.2'}]
                    }
                ],
                [
                    {
                        label: 'TV 3',
                        items: [{label: 'TV 3.1'},{label: 'TV 3.2'}]
                    },
                    {
                        label: 'TV 4',
                        items: [{label: 'TV 4.1'},{label: 'TV 4.2'}]
                    }    
                ]
            ]
        }
        ];
        fixture.detectChanges();
        
        const megaMenuEl = fixture.debugElement.query(By.css('div')).nativeElement;
        const spanIconEl = fixture.debugElement.query(By.css('a')).children[2].nativeElement;
        const menuItemCustomEl = fixture.debugElement.query(By.css('.ui-menuitem.ui-menuitem-custom'));
        expect(megaMenuEl.className).toContain("ui-megamenu-vertical");
        expect(spanIconEl.className).toContain("pi-caret-right");
        expect(menuItemCustomEl).toBeFalsy();
    });

    it('should call onItemMouseEnter', fakeAsync(() => {
        megamenu.model  = [
        {
            label: 'TV', icon: 'fa fa-fw fa-check',
            items: [
                [
                    {
                        label: 'TV 1',
                        items: [{label: 'TV 1.1'},{label: 'TV 1.2'}]
                    },
                    {
                        label: 'TV 2',
                        items: [{label: 'TV 2.1'},{label: 'TV 2.2'}]
                    }
                ]
            ]
        },
        {
            label: 'Sports', icon: 'fa fa-fw fa-soccer-ball-o',
            items: [
                [
                    {
                        label: 'Sports 1',
                        items: [{label: 'Sports 1.1'},{label: 'Sports 1.2'}]
                    },
                    {
                        label: 'Sports 2',
                        items: [{label: 'Sports 2.1'},{label: 'Sports 2.2'}]
                    },

                ]
            ]
        },
        ];
        fixture.detectChanges();
        
        const tvEl = fixture.debugElement.query(By.css('ul')).children[0].nativeElement;
        const sportsEl = fixture.debugElement.query(By.css('ul')).children[1].nativeElement;
        const submenuEl = fixture.debugElement.query(By.css('.ui-g')).queryAll(By.css('ul'));
        const event = new Event('mouseenter');
        const mouseLeaveEvent = new Event('mouseleave');
        tvEl.dispatchEvent(event);
        fixture.detectChanges();

        expect(megamenu.hideTimeout).toBeUndefined();
        tvEl.dispatchEvent(mouseLeaveEvent);
        fixture.detectChanges();
        tick(200);

        sportsEl.dispatchEvent(event);
        fixture.detectChanges();

        expect(megamenu.hideTimeout).toBeNull();
    }));

    it('should call onItemMouseEnter twice and call', () => {
        megamenu.model  = [
        {
            label: 'TV', icon: 'fa fa-fw fa-check',
            items: [
                [
                    {
                        label: 'TV 1',
                        items: [{label: 'TV 1.1'},{label: 'TV 1.2'}]
                    },
                    {
                        label: 'TV 2',
                        items: [{label: 'TV 2.1'},{label: 'TV 2.2'}]
                    }
                ]
            ]
        },
        {
            label: 'Sports', icon: 'fa fa-fw fa-soccer-ball-o',
            items: [
                [
                    {
                        label: 'Sports 1',
                        items: [{label: 'Sports 1.1'},{label: 'Sports 1.2'}]
                    },
                    {
                        label: 'Sports 2',
                        items: [{label: 'Sports 2.1'},{label: 'Sports 2.2'}]
                    },

                ]
            ]
        },
        ];
        const mouseenterSpy = spyOn(megamenu, 'onItemMouseEnter').and.callThrough();
        fixture.detectChanges();
        
        const tvEl = fixture.debugElement.query(By.css('ul')).children[0].nativeElement;
        const submenuEl = fixture.debugElement.query(By.css('.ui-g')).queryAll(By.css('ul'));
        const event = new Event('mouseenter');
        tvEl.dispatchEvent(event);
        fixture.detectChanges();

        const tv1HeaderEl = submenuEl[0].query(By.css('.ui-widget-header')).nativeElement;
        const tv1FirstItemLabelEl = submenuEl[0].query(By.css('.ui-menuitem-text')).nativeElement;
        expect(mouseenterSpy).toHaveBeenCalled();
        expect(submenuEl.length).toEqual(2);
        expect(tv1HeaderEl.textContent).toContain("TV 1");
        expect(tv1FirstItemLabelEl.textContent).toContain("TV 1.1");
        expect(megamenu.activeItem).toBeTruthy();
    });

    it('should call onItemMouseLeave', fakeAsync(() => {
        megamenu.model  = [
        {
            label: 'TV', icon: 'fa fa-fw fa-check',
            items: [
                [
                    {
                        label: 'TV 1',
                        items: [{label: 'TV 1.1'},{label: 'TV 1.2'}]
                    },
                    {
                        label: 'TV 2',
                        items: [{label: 'TV 2.1'},{label: 'TV 2.2'}]
                    }
                ]
            ]
        },
        {
            label: 'Sports', icon: 'fa fa-fw fa-soccer-ball-o',
            items: [
                [
                    {
                        label: 'Sports 1',
                        items: [{label: 'Sports 1.1'},{label: 'Sports 1.2'}]
                    },
                    {
                        label: 'Sports 2',
                        items: [{label: 'Sports 2.1'},{label: 'Sports 2.2'}]
                    },

                ]
            ]
        },
        ];
        const mouseLeaveSpy = spyOn(megamenu, 'onItemMouseLeave').and.callThrough();
        fixture.detectChanges();
        
        const tvEl = fixture.debugElement.query(By.css('ul')).children[0].nativeElement;
        const mouseenterEvent = new Event('mouseenter');
        const mouseLeaveEvent = new Event('mouseleave');
        tvEl.dispatchEvent(mouseenterEvent);
        fixture.detectChanges();

        tvEl.dispatchEvent(mouseLeaveEvent);
        tick(1000)
        fixture.detectChanges();

        expect(mouseLeaveSpy).toHaveBeenCalled();
        expect(megamenu.activeItem).toEqual(null);
    }));

    it('should  call itemClick ', () => {
        megamenu.model  = [
        {
            label: 'TV', icon: 'fa fa-fw fa-check',
            items: [
                [
                    {
                        label: 'TV 1',
                        items: [{label: 'TV 1.1'},{label: 'TV 1.2'}]
                    },
                    {
                        label: 'TV 2',
                        items: [{label: 'TV 2.1'},{label: 'TV 2.2'}]
                    }
                ]
            ]
        },
        {
            label: 'Sports', icon: 'fa fa-fw fa-soccer-ball-o',
            items: [
                [
                    {
                        label: 'Sports 1',
                        items: [{label: 'Sports 1.1'},{label: 'Sports 1.2'}]
                    },
                    {
                        label: 'Sports 2',
                        items: [{label: 'Sports 2.1'},{label: 'Sports 2.2'}]
                    },

                ]
            ]
        },
        ];
        const itemClickSpy = spyOn(megamenu, 'itemClick').and.callThrough();
        fixture.detectChanges();
        
        const tvEl = fixture.debugElement.query(By.css('ul')).children[0].nativeElement;
        const submenuEl = fixture.debugElement.query(By.css('.ui-g')).queryAll(By.css('ul'));
        const event = new Event('mouseenter');
        tvEl.dispatchEvent(event);
        fixture.detectChanges();

        const tv1FirstItemEl = submenuEl[0].query(By.css('a')).nativeElement;
        tv1FirstItemEl.click();
        fixture.detectChanges();

        expect(itemClickSpy).toHaveBeenCalled();
        expect(megamenu.activeItem).toEqual(null);
    });

    it('should  call onItemMouseEnter and not show submenu ', () => {
        megamenu.model  = [
        {
            label: 'TV', icon: 'fa fa-fw fa-check',
            items: [
                [
                    {
                        label: 'TV 1',
                        items: [{label: 'TV 1.1'},{label: 'TV 1.2'}]
                    },
                    {
                        label: 'TV 2',
                        items: [{label: 'TV 2.1'},{label: 'TV 2.2'}]
                    }
                ]
            ],
            disabled:true
        },
        {
            label: 'Sports', icon: 'fa fa-fw fa-soccer-ball-o',
            items: [
                [
                    {
                        label: 'Sports 1',
                        items: [{label: 'Sports 1.1', disabled: true},{label: 'Sports 1.2'}],
                    },
                    {
                        label: 'Sports 2',
                        items: [{label: 'Sports 2.1'},{label: 'Sports 2.2'}]
                    },

                ]
            ]
        },
        ];
        fixture.detectChanges();
        
        const tvEl = fixture.debugElement.query(By.css('ul')).children[0].nativeElement;
        const mouseenterSpy = spyOn(megamenu, 'onItemMouseEnter').and.callThrough();
        const event = new Event('mouseenter');
        tvEl.dispatchEvent(event);
        fixture.detectChanges();

        const disabledItems = fixture.debugElement.queryAll(By.css('.ui-state-disabled'));
        expect(megamenu.activeItem).toEqual(undefined);
        expect(disabledItems.length).toEqual(2);
        expect(mouseenterSpy).toHaveBeenCalled();
        expect(megamenu.activeItem).toBeUndefined();
    });

    it('should  call onItemMouseEnter and not show submenu ', () => {
        megamenu.model  = [
        {
            label: 'TV', icon: 'fa fa-fw fa-check',
            items: [
                [
                    {
                        label: 'TV 1',
                        items: [{label: 'TV 1.1'},{label: 'TV 1.2'}],
                    },
                    {
                        label: 'TV 2',
                        items: [{label: 'TV 2.1',visible:false},{label: 'TV 2.2'}],
                    }
                ]
            ],
        },
        {
            label: 'Sports', icon: 'fa fa-fw fa-soccer-ball-o',
            items: [
                [
                    {
                        label: 'Sports 1',
                        items: [{label: 'Sports 1.1'},{label: 'Sports 1.2'}]
                    },
                    {
                        label: 'Sports 2',
                        items: [{label: 'Sports 2.1'},{label: 'Sports 2.2'}]
                    },

                ]
            ],
            visible:false
        },
        ];
        fixture.detectChanges();

        const tvEl = fixture.debugElement.query(By.css('ul')).children[0].nativeElement;
        const event = new Event('mouseenter');
        tvEl.dispatchEvent(event);
        fixture.detectChanges();
        
        const unVisibleItems = fixture.debugElement.queryAll(By.css('.ui-helper-hidden'));
        expect(unVisibleItems.length).toEqual(2);
    });
});
