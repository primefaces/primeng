import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from '@alamote/primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
            <p>Custom content can be placed between p-megaMenu tags. Megamenu should be <i>horizontal</i> for custom content.</p>
        </app-docsectiontext>
        <div class="card">
            <p-megaMenu [model]="items" styleClass="flex">
                <ng-template pTemplate="start">
                    <img src="https://primefaces.org/cdn/primeng/images/primeng.svg" height="40" class="mr-2" />
                </ng-template>
                <ng-template pTemplate="end">
                    <input type="text" pInputText placeholder="Search" />
                </ng-template>
            </p-megaMenu>
        </div>
        <app-code [code]="code" selector="mega-menu-template-demo"></app-code>
    `
})
export class TemplateDoc implements OnInit {
    items: MegaMenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Videos',
                icon: 'pi pi-fw pi-video',
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
            },
            {
                label: 'Users',
                icon: 'pi pi-fw pi-users',
                items: [
                    [
                        {
                            label: 'User 1',
                            items: [{ label: 'User 1.1' }, { label: 'User 1.2' }]
                        },
                        {
                            label: 'User 2',
                            items: [{ label: 'User 2.1' }, { label: 'User 2.2' }]
                        }
                    ],
                    [
                        {
                            label: 'User 3',
                            items: [{ label: 'User 3.1' }, { label: 'User 3.2' }]
                        },
                        {
                            label: 'User 4',
                            items: [{ label: 'User 4.1' }, { label: 'User 4.2' }]
                        }
                    ],
                    [
                        {
                            label: 'User 5',
                            items: [{ label: 'User 5.1' }, { label: 'User 5.2' }]
                        },
                        {
                            label: 'User 6',
                            items: [{ label: 'User 6.1' }, { label: 'User 6.2' }]
                        }
                    ]
                ]
            },
            {
                label: 'Events',
                icon: 'pi pi-fw pi-calendar',
                items: [
                    [
                        {
                            label: 'Event 1',
                            items: [{ label: 'Event 1.1' }, { label: 'Event 1.2' }]
                        },
                        {
                            label: 'Event 2',
                            items: [{ label: 'Event 2.1' }, { label: 'Event 2.2' }]
                        }
                    ],
                    [
                        {
                            label: 'Event 3',
                            items: [{ label: 'Event 3.1' }, { label: 'Event 3.2' }]
                        },
                        {
                            label: 'Event 4',
                            items: [{ label: 'Event 4.1' }, { label: 'Event 4.2' }]
                        }
                    ]
                ]
            },
            {
                label: 'Settings',
                icon: 'pi pi-fw pi-cog',
                items: [
                    [
                        {
                            label: 'Setting 1',
                            items: [{ label: 'Setting 1.1' }, { label: 'Setting 1.2' }]
                        },
                        {
                            label: 'Setting 2',
                            items: [{ label: 'Setting 2.1' }, { label: 'Setting 2.2' }]
                        },
                        {
                            label: 'Setting 3',
                            items: [{ label: 'Setting 3.1' }, { label: 'Setting 3.2' }]
                        }
                    ],
                    [
                        {
                            label: 'Technology 4',
                            items: [{ label: 'Setting 4.1' }, { label: 'Setting 4.2' }]
                        }
                    ]
                ]
            }
        ];
    }

    code: Code = {
        basic: `<p-megaMenu [model]="items" styleClass="flex">
    <ng-template pTemplate="start">
        <img src="https://primefaces.org/cdn/primeng/images/primeng.svg" height="40" class="mr-2" />
    </ng-template>
    <ng-template pTemplate="end">
        <input type="text" pInputText placeholder="Search" />
    </ng-template>
</p-megaMenu>`,

        html: `
<div class="card">
    <p-megaMenu [model]="items" styleClass="flex">
        <ng-template pTemplate="start">
            <img src="https://primefaces.org/cdn/primeng/images/primeng.svg" height="40" class="mr-2" />
        </ng-template>
        <ng-template pTemplate="end">
            <input type="text" pInputText placeholder="Search" />
        </ng-template>
    </p-megaMenu>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from '@alamote/primeng/api';

@Component({
    selector: 'mega-menu-template-demo',
    templateUrl: './mega-menu-template-demo.html'
})
export class MegaMenuTemplateDemo implements OnInit {
    items: MegaMenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Videos',
                icon: 'pi pi-fw pi-video',
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
            },
            {
                label: 'Users',
                icon: 'pi pi-fw pi-users',
                items: [
                    [
                        {
                            label: 'User 1',
                            items: [{ label: 'User 1.1' }, { label: 'User 1.2' }]
                        },
                        {
                            label: 'User 2',
                            items: [{ label: 'User 2.1' }, { label: 'User 2.2' }]
                        }
                    ],
                    [
                        {
                            label: 'User 3',
                            items: [{ label: 'User 3.1' }, { label: 'User 3.2' }]
                        },
                        {
                            label: 'User 4',
                            items: [{ label: 'User 4.1' }, { label: 'User 4.2' }]
                        }
                    ],
                    [
                        {
                            label: 'User 5',
                            items: [{ label: 'User 5.1' }, { label: 'User 5.2' }]
                        },
                        {
                            label: 'User 6',
                            items: [{ label: 'User 6.1' }, { label: 'User 6.2' }]
                        }
                    ]
                ]
            },
            {
                label: 'Events',
                icon: 'pi pi-fw pi-calendar',
                items: [
                    [
                        {
                            label: 'Event 1',
                            items: [{ label: 'Event 1.1' }, { label: 'Event 1.2' }]
                        },
                        {
                            label: 'Event 2',
                            items: [{ label: 'Event 2.1' }, { label: 'Event 2.2' }]
                        }
                    ],
                    [
                        {
                            label: 'Event 3',
                            items: [{ label: 'Event 3.1' }, { label: 'Event 3.2' }]
                        },
                        {
                            label: 'Event 4',
                            items: [{ label: 'Event 4.1' }, { label: 'Event 4.2' }]
                        }
                    ]
                ]
            },
            {
                label: 'Settings',
                icon: 'pi pi-fw pi-cog',
                items: [
                    [
                        {
                            label: 'Setting 1',
                            items: [{ label: 'Setting 1.1' }, { label: 'Setting 1.2' }]
                        },
                        {
                            label: 'Setting 2',
                            items: [{ label: 'Setting 2.1' }, { label: 'Setting 2.2' }]
                        },
                        {
                            label: 'Setting 3',
                            items: [{ label: 'Setting 3.1' }, { label: 'Setting 3.2' }]
                        }
                    ],
                    [
                        {
                            label: 'Technology 4',
                            items: [{ label: 'Setting 4.1' }, { label: 'Setting 4.2' }]
                        }
                    ]
                ]
            }
        ];
    }
}`
    };
}
