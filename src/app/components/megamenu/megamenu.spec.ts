import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MegaMenu, MegaMenuModule } from './megamenu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('MegaMenu', () => {
    let megamenu: MegaMenu;
    let fixture: ComponentFixture<MegaMenu>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([{ path: 'test', component: MegaMenu }]), NoopAnimationsModule, MegaMenuModule]
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
        megamenu.style = { height: '300px' };
        megamenu.styleClass = 'Primeng ROCKS!';
        fixture.detectChanges();

        const megaMenuEl = fixture.debugElement.query(By.css('div')).nativeElement;
        expect(megaMenuEl.className).toContain('Primeng ROCKS!');
        expect(megaMenuEl.style.height).toContain('300px');
    });

    it('should horizontal by default', () => {
        megamenu.model = [
            {
                label: 'TV',
                icon: 'pi pi-fw pi-check',
                items: [
                    [
                        {
                            label: 'TV 1',
                            items: [{ label: 'TV 1.1' }, { label: 'TV 1.2' }]
                        },
                        {
                            label: 'TV 2',
                            items: [{ label: 'TV 2.1' }, { label: 'TV 2.2' }]
                        }
                    ],
                    [
                        {
                            label: 'TV 3',
                            items: [{ label: 'TV 3.1' }, { label: 'TV 3.2' }]
                        },
                        {
                            label: 'TV 4',
                            items: [{ label: 'TV 4.1' }, { label: 'TV 4.2' }]
                        }
                    ]
                ]
            }
        ];
        fixture.detectChanges();

        const megaMenuEl = fixture.debugElement.query(By.css('div')).nativeElement;
        const iconEl = fixture.debugElement.query(By.css('a')).children[2].nativeElement;
        expect(megaMenuEl.className).toContain('p-megamenu-horizontal');
        expect(iconEl.tagName.toLowerCase()).toEqual('angledownicon');
    });

    it('should change orientation', () => {
        megamenu.orientation = 'vertical';
        megamenu.model = [
            {
                label: 'TV',
                icon: 'pi pi-fw pi-check',
                items: [
                    [
                        {
                            label: 'TV 1',
                            items: [{ label: 'TV 1.1' }, { label: 'TV 1.2' }]
                        },
                        {
                            label: 'TV 2',
                            items: [{ label: 'TV 2.1' }, { label: 'TV 2.2' }]
                        }
                    ],
                    [
                        {
                            label: 'TV 3',
                            items: [{ label: 'TV 3.1' }, { label: 'TV 3.2' }]
                        },
                        {
                            label: 'TV 4',
                            items: [{ label: 'TV 4.1' }, { label: 'TV 4.2' }]
                        }
                    ]
                ]
            }
        ];
        fixture.detectChanges();

        const megaMenuEl = fixture.debugElement.query(By.css('div')).nativeElement;
        const iconEl = fixture.debugElement.query(By.css('a')).children[2].nativeElement;
        const menuItemCustomEl = fixture.debugElement.query(By.css('.p-menuitem.p-menuitem-custom'));
        expect(megaMenuEl.className).toContain('p-megamenu-vertical');
        expect(iconEl.tagName.toLowerCase()).toEqual('anglerighticon');
        expect(menuItemCustomEl).toBeFalsy();
    });

    it('should call onItemMouseEnter twice and call', () => {
        megamenu.model = [
            {
                label: 'TV',
                icon: 'pi pi-fw pi-check',
                items: [
                    [
                        {
                            label: 'TV 1',
                            items: [{ label: 'TV 1.1' }, { label: 'TV 1.2' }]
                        },
                        {
                            label: 'TV 2',
                            items: [{ label: 'TV 2.1' }, { label: 'TV 2.2' }]
                        }
                    ]
                ]
            },
            {
                label: 'Sports',
                icon: 'pi pi-fw pi-soccer-ball-o',
                items: [
                    [
                        {
                            label: 'Sports 1',
                            items: [{ label: 'Sports 1.1' }, { label: 'Sports 1.2' }]
                        },
                        {
                            label: 'Sports 2',
                            items: [{ label: 'Sports 2.1' }, { label: 'Sports 2.2' }]
                        }
                    ]
                ]
            }
        ];
        fixture.detectChanges();

        const tvEl = fixture.debugElement.query(By.css('ul')).children[0].nativeElement;
        const submenuEl = fixture.debugElement.query(By.css('.p-megamenu-grid')).queryAll(By.css('ul'));
        const event = new Event('mouseenter');
        tvEl.dispatchEvent(event);
        fixture.detectChanges();

        megamenu.cd.detectChanges();
        const tv1HeaderEl = submenuEl[0].query(By.css('.p-megamenu-submenu-header')).nativeElement;
        const tv1FirstItemLabelEl = submenuEl[0].query(By.css('.p-menuitem-text')).nativeElement;
        expect(submenuEl.length).toEqual(2);
        expect(tv1HeaderEl.textContent).toContain('TV 1');
        expect(tv1FirstItemLabelEl.textContent).toContain('TV 1.1');
    });

    it('should  call itemClick ', () => {
        megamenu.model = [
            {
                label: 'TV',
                icon: 'pi pi-fw pi-check',
                items: [
                    [
                        {
                            label: 'TV 1',
                            items: [{ label: 'TV 1.1' }, { label: 'TV 1.2' }]
                        },
                        {
                            label: 'TV 2',
                            items: [{ label: 'TV 2.1' }, { label: 'TV 2.2' }]
                        }
                    ]
                ]
            },
            {
                label: 'Sports',
                icon: 'pi pi-fw pi-soccer-ball-o',
                items: [
                    [
                        {
                            label: 'Sports 1',
                            items: [{ label: 'Sports 1.1' }, { label: 'Sports 1.2' }]
                        },
                        {
                            label: 'Sports 2',
                            items: [{ label: 'Sports 2.1' }, { label: 'Sports 2.2' }]
                        }
                    ]
                ]
            }
        ];
        const itemClickSpy = spyOn(megamenu, 'onItemClick').and.callThrough();
        fixture.detectChanges();

        const tvEl = fixture.debugElement.query(By.css('ul')).children[0].nativeElement;
        const submenuEl = fixture.debugElement.query(By.css('.p-megamenu-grid')).queryAll(By.css('ul'));
        const event = new Event('mouseenter');
        tvEl.dispatchEvent(event);
        fixture.detectChanges();

        const tv1FirstItemEl = submenuEl[0].query(By.css('a')).nativeElement;
        tv1FirstItemEl.click();
        fixture.detectChanges();

        expect(itemClickSpy).toHaveBeenCalled();
        expect(megamenu.activeItem()).toEqual(null);
    });

    it("shouldn't  call itemClick ", () => {
        megamenu.orientation = 'vertical';
        megamenu.model = [
            {
                label: 'TV',
                icon: 'pi pi-fw pi-check',
                items: [
                    [
                        {
                            label: 'TV 1',
                            items: [{ label: 'TV 1.1', disabled: true }, { label: 'TV 1.2' }]
                        },
                        {
                            label: 'TV 2',
                            items: [{ label: 'TV 2.1' }, { label: 'TV 2.2' }]
                        }
                    ]
                ]
            },
            {
                label: 'Sports',
                icon: 'pi pi-fw pi-soccer-ball-o',
                items: [
                    [
                        {
                            label: 'Sports 1',
                            items: [{ label: 'Sports 1.1' }, { label: 'Sports 1.2' }]
                        },
                        {
                            label: 'Sports 2',
                            items: [{ label: 'Sports 2.1' }, { label: 'Sports 2.2' }]
                        }
                    ]
                ]
            }
        ];
        const itemClickSpy = spyOn(megamenu, 'onItemClick').and.callThrough();
        fixture.detectChanges();

        const tvEl = fixture.debugElement.query(By.css('ul')).children[0].nativeElement;
        const submenuEl = fixture.debugElement.query(By.css('.p-megamenu-grid')).queryAll(By.css('ul'));
        const event = new Event('mouseenter');
        tvEl.dispatchEvent(event);
        fixture.detectChanges();

        const tv1FirstItemEl = submenuEl[0].query(By.css('a')).nativeElement;
        tv1FirstItemEl.click();
        fixture.detectChanges();

        expect(itemClickSpy).toHaveBeenCalled();
        expect(megamenu.activeItem).not.toEqual(null);
    });

    it("shouldn't  call itemClick ", () => {
        let item;
        megamenu.model = [
            {
                label: 'TV',
                icon: 'pi pi-fw pi-check',
                items: [
                    [
                        {
                            label: 'TV 1',
                            items: [
                                {
                                    label: 'TV 1.1',
                                    command: (event) => {
                                        item = event.item;
                                    }
                                },
                                { label: 'TV 1.2' }
                            ]
                        },
                        {
                            label: 'TV 2',
                            items: [{ label: 'TV 2.1' }, { label: 'TV 2.2' }]
                        }
                    ]
                ]
            },
            {
                label: 'Sports',
                icon: 'pi pi-fw pi-soccer-ball-o',
                items: [
                    [
                        {
                            label: 'Sports 1',
                            items: [{ label: 'Sports 1.1' }, { label: 'Sports 1.2' }]
                        },
                        {
                            label: 'Sports 2',
                            items: [{ label: 'Sports 2.1' }, { label: 'Sports 2.2' }]
                        }
                    ]
                ]
            }
        ];
        fixture.detectChanges();

        const tvEl = fixture.debugElement.query(By.css('ul')).children[0].nativeElement;
        const submenuEl = fixture.debugElement.query(By.css('.p-megamenu-grid')).queryAll(By.css('ul'));
        const event = new Event('mouseenter');
        tvEl.dispatchEvent(event);
        fixture.detectChanges();

        const tv1FirstItemEl = submenuEl[0].query(By.css('a')).nativeElement;
        tv1FirstItemEl.click();
        fixture.detectChanges();

        expect(item.label).toEqual('TV 1.1');
    });

    it('should item get p-megamenu-col-4', () => {
        megamenu.model = [
            {
                label: 'TVV',
                icon: 'pi pi-fw pi-check',
                items: [
                    [
                        {
                            label: 'TV 1',
                            items: [{ label: 'TV 1.1' }, { label: 'TV 1.2' }]
                        }
                    ],
                    [
                        {
                            label: 'TV 2',
                            items: [{ label: 'TV 2.1' }, { label: 'TV 2.2' }]
                        }
                    ],
                    [
                        {
                            label: 'TV 3',
                            items: [{ label: 'TV 3.1' }, { label: 'TV 3.2' }]
                        }
                    ]
                ]
            }
        ];
        fixture.detectChanges();

        let tvEl = fixture.debugElement.query(By.css('ul')).children[0].nativeElement;
        let event = new Event('mouseenter');
        tvEl.dispatchEvent(event);
        fixture.detectChanges();

        let tv1Div = fixture.debugElement.query(By.css('.p-megamenu-grid')).query(By.css('div')).nativeElement;
        fixture.detectChanges();

        expect(tv1Div.className).toContain('p-megamenu-col-4');
    });

    it('should item get p-megamenu-col-6', () => {
        megamenu.model = [
            {
                label: 'TVV',
                icon: 'pi pi-fw pi-check',
                items: [
                    [
                        {
                            label: 'Video 1',
                            items: [{ label: 'Video 1.1' }, { label: 'Video 1.2' }]
                        },
                        {
                            label: 'Video 2',
                            items: [{ label: 'Video 2.1' }, { label: 'Video 2.2' }]
                        }
                    ],
                    [
                        {
                            label: 'Video 3',
                            items: [{ label: 'Video 3.1' }, { label: 'Video 3.2' }]
                        },
                        {
                            label: 'Video 4',
                            items: [{ label: 'Video 4.1' }, { label: 'Video 4.2' }]
                        }
                    ]
                ]
            }
        ];
        fixture.detectChanges();

        let tvEl = fixture.debugElement.query(By.css('ul')).children[0].nativeElement;
        let event = new Event('mouseenter');
        tvEl.dispatchEvent(event);
        fixture.detectChanges();

        let tv1Div = fixture.debugElement.query(By.css('.p-megamenu-grid')).query(By.css('div')).nativeElement;
        fixture.detectChanges();

        expect(tv1Div.className).toContain('p-megamenu-col-6');
    });

    it('should item get p-megamenu-col-2', () => {
        megamenu.model = [
            {
                label: 'TVV',
                icon: 'pi pi-fw pi-check',
                items: [
                    [
                        {
                            label: 'TV 1',
                            items: [{ label: 'TV 1.1' }, { label: 'TV 1.2' }]
                        }
                    ],
                    [
                        {
                            label: 'TV 2',
                            items: [{ label: 'TV 2.1' }, { label: 'TV 2.2' }]
                        }
                    ],
                    [
                        {
                            label: 'TV 3',
                            items: [{ label: 'TV 3.1' }, { label: 'TV 3.2' }]
                        }
                    ],
                    [
                        {
                            label: 'TV 4',
                            items: [{ label: 'TV 4.1' }, { label: 'TV 4.2' }]
                        }
                    ],
                    [
                        {
                            label: 'TV 5',
                            items: [{ label: 'TV 5.1' }, { label: 'TV 5.2' }]
                        }
                    ],
                    [
                        {
                            label: 'TV 6',
                            items: [{ label: 'TV 6.1' }, { label: 'TV 6.2' }]
                        }
                    ]
                ]
            }
        ];
        fixture.detectChanges();

        let tvEl = fixture.debugElement.query(By.css('ul')).children[0].nativeElement;
        let event = new Event('mouseenter');
        tvEl.dispatchEvent(event);
        fixture.detectChanges();

        let tv1Div = fixture.debugElement.query(By.css('.p-megamenu-grid')).query(By.css('div')).nativeElement;
        fixture.detectChanges();

        expect(tv1Div.className).toContain('p-megamenu-col-2');
    });

    it('should move to the next item onKeyboardArrowKeyDown', () => {
        megamenu.model = [
            {
                label: 'TV',
                icon: 'pi pi-fw pi-check',
                items: [
                    [
                        {
                            label: 'TV 1',
                            items: [{ label: 'TV 1.1' }, { label: 'TV 1.2' }]
                        },
                        {
                            label: 'TV 2',
                            items: [{ label: 'TV 2.1' }, { label: 'TV 2.2' }]
                        }
                    ]
                ]
            },
            {
                label: 'Sports',
                icon: 'pi pi-fw pi-soccer-ball-o',
                items: [
                    [
                        {
                            label: 'Sports 1',
                            items: [{ label: 'Sports 1.1' }, { label: 'Sports 1.2' }]
                        },
                        {
                            label: 'Sports 2',
                            items: [{ label: 'Sports 2.1' }, { label: 'Sports 2.2' }]
                        }
                    ]
                ]
            }
        ];

        const onArrowDownKeySpy = spyOn(megamenu, 'onArrowDownKey').and.callThrough();

        //focus on menu
        megamenu.onMenuFocus(new Event(''));
        fixture.detectChanges();

        const parentMenuEl = fixture.debugElement.query(By.css('.p-megamenu-root-list'));
        const tvEl = parentMenuEl.children[0];

        expect(megamenu.focusedItemInfo().index).toBe(0);
        expect(megamenu.focusedItemInfo().parentKey).toBe('');
        expect(megamenu.focusedItemInfo().item.label).toBe('TV');
        expect(tvEl.attributes['aria-expanded']).toBe('false');

        //simulate keyboard arrow down key press
        const event = new KeyboardEvent('keydown', { key: 'ArrowDown', code: 'ArrowDown' });
        parentMenuEl.nativeElement.dispatchEvent(event);
        fixture.detectChanges();

        expect(onArrowDownKeySpy).toHaveBeenCalled();
        expect(megamenu.focusedItemInfo().index).toBe(0);
        expect(megamenu.focusedItemInfo().parentKey).toBe('0_0_0');
        expect(megamenu.focusedItemInfo().item.label).toBe('TV 1.1');
        expect(tvEl.attributes['aria-expanded']).toBe('true');

        //keyboard arrow down key press again
        parentMenuEl.nativeElement.dispatchEvent(event);
        fixture.detectChanges();
        expect(megamenu.focusedItemInfo().index).toBe(1);
        expect(megamenu.focusedItemInfo().parentKey).toBe('0_0_0');
        expect(megamenu.focusedItemInfo().item.label).toBe('TV 1.2');

        //keyboard arrow down key press again
        parentMenuEl.nativeElement.dispatchEvent(event);
        fixture.detectChanges();
        expect(megamenu.focusedItemInfo().index).toBe(2);
        expect(megamenu.focusedItemInfo().parentKey).toBe('0_0_1');
        expect(megamenu.focusedItemInfo().item.label).toBe('TV 2.1');
    });
});
