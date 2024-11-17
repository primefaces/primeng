import { Code } from '@/domain/code';
import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>MegaMenu requires a collection of menuitems as its <i>model</i>.</p>
        </app-docsectiontext>
        <div class="card">
            <p-megamenu [model]="items" />
        </div>
        <app-code [code]="code" selector="mega-menu-basic-demo"></app-code>
    `
})
export class BasicDoc implements OnInit {
    items: MegaMenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Furniture',
                icon: 'pi pi-box',
                items: [
                    [
                        {
                            label: 'Living Room',
                            items: [{ label: 'Accessories' }, { label: 'Armchair' }, { label: 'Coffee Table' }, { label: 'Couch' }, { label: 'TV Stand' }]
                        }
                    ],
                    [
                        {
                            label: 'Kitchen',
                            items: [{ label: 'Bar stool' }, { label: 'Chair' }, { label: 'Table' }]
                        },
                        {
                            label: 'Bathroom',
                            items: [{ label: 'Accessories' }]
                        }
                    ],
                    [
                        {
                            label: 'Bedroom',
                            items: [{ label: 'Bed' }, { label: 'Chaise lounge' }, { label: 'Cupboard' }, { label: 'Dresser' }, { label: 'Wardrobe' }]
                        }
                    ],
                    [
                        {
                            label: 'Office',
                            items: [{ label: 'Bookcase' }, { label: 'Cabinet' }, { label: 'Chair' }, { label: 'Desk' }, { label: 'Executive Chair' }]
                        }
                    ]
                ]
            },
            {
                label: 'Electronics',
                icon: 'pi pi-mobile',
                items: [
                    [
                        {
                            label: 'Computer',
                            items: [{ label: 'Monitor' }, { label: 'Mouse' }, { label: 'Notebook' }, { label: 'Keyboard' }, { label: 'Printer' }, { label: 'Storage' }]
                        }
                    ],
                    [
                        {
                            label: 'Home Theater',
                            items: [{ label: 'Projector' }, { label: 'Speakers' }, { label: 'TVs' }]
                        }
                    ],
                    [
                        {
                            label: 'Gaming',
                            items: [{ label: 'Accessories' }, { label: 'Console' }, { label: 'PC' }, { label: 'Video Games' }]
                        }
                    ],
                    [
                        {
                            label: 'Appliances',
                            items: [{ label: 'Coffee Machine' }, { label: 'Fridge' }, { label: 'Oven' }, { label: 'Vaccum Cleaner' }, { label: 'Washing Machine' }]
                        }
                    ]
                ]
            },
            {
                label: 'Sports',
                icon: 'pi pi-clock',
                items: [
                    [
                        {
                            label: 'Football',
                            items: [{ label: 'Kits' }, { label: 'Shoes' }, { label: 'Shorts' }, { label: 'Training' }]
                        }
                    ],
                    [
                        {
                            label: 'Running',
                            items: [{ label: 'Accessories' }, { label: 'Shoes' }, { label: 'T-Shirts' }, { label: 'Shorts' }]
                        }
                    ],
                    [
                        {
                            label: 'Swimming',
                            items: [{ label: 'Kickboard' }, { label: 'Nose Clip' }, { label: 'Swimsuits' }, { label: 'Paddles' }]
                        }
                    ],
                    [
                        {
                            label: 'Tennis',
                            items: [{ label: 'Balls' }, { label: 'Rackets' }, { label: 'Shoes' }, { label: 'Training' }]
                        }
                    ]
                ]
            }
        ];
    }

    code: Code = {
        basic: `<p-megamenu [model]="items" />`,

        html: `<div class="card">
    <p-megamenu [model]="items" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { MegaMenu } from 'primeng/megamenu';

@Component({
    selector: 'mega-menu-basic-demo',
    templateUrl: './mega-menu-basic-demo.html',
    standalone: true,
    imports: [MegaMenu]
})
export class MegaMenuBasicDemo implements OnInit {
    items: MegaMenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Furniture',
                icon: 'pi pi-box',
                items: [
                    [
                        {
                            label: 'Living Room',
                            items: [
                                { label: 'Accessories' },
                                { label: 'Armchair' },
                                { label: 'Coffee Table' },
                                { label: 'Couch' },
                                { label: 'TV Stand' },
                            ],
                        },
                    ],
                    [
                        {
                            label: 'Kitchen',
                            items: [{ label: 'Bar stool' }, { label: 'Chair' }, { label: 'Table' }],
                        },
                        {
                            label: 'Bathroom',
                            items: [{ label: 'Accessories' }],
                        },
                    ],
                    [
                        {
                            label: 'Bedroom',
                            items: [
                                { label: 'Bed' },
                                { label: 'Chaise lounge' },
                                { label: 'Cupboard' },
                                { label: 'Dresser' },
                                { label: 'Wardrobe' },
                            ],
                        },
                    ],
                    [
                        {
                            label: 'Office',
                            items: [
                                { label: 'Bookcase' },
                                { label: 'Cabinet' },
                                { label: 'Chair' },
                                { label: 'Desk' },
                                { label: 'Executive Chair' },
                            ],
                        },
                    ],
                ],
            },
            {
                label: 'Electronics',
                icon: 'pi pi-mobile',
                items: [
                    [
                        {
                            label: 'Computer',
                            items: [
                                { label: 'Monitor' },
                                { label: 'Mouse' },
                                { label: 'Notebook' },
                                { label: 'Keyboard' },
                                { label: 'Printer' },
                                { label: 'Storage' },
                            ],
                        },
                    ],
                    [
                        {
                            label: 'Home Theater',
                            items: [{ label: 'Projector' }, { label: 'Speakers' }, { label: 'TVs' }],
                        },
                    ],
                    [
                        {
                            label: 'Gaming',
                            items: [{ label: 'Accessories' }, { label: 'Console' }, { label: 'PC' }, { label: 'Video Games' }],
                        },
                    ],
                    [
                        {
                            label: 'Appliances',
                            items: [
                                { label: 'Coffee Machine' },
                                { label: 'Fridge' },
                                { label: 'Oven' },
                                { label: 'Vaccum Cleaner' },
                                { label: 'Washing Machine' },
                            ],
                        },
                    ],
                ],
            },
            {
                label: 'Sports',
                icon: 'pi pi-clock',
                items: [
                    [
                        {
                            label: 'Football',
                            items: [{ label: 'Kits' }, { label: 'Shoes' }, { label: 'Shorts' }, { label: 'Training' }],
                        },
                    ],
                    [
                        {
                            label: 'Running',
                            items: [{ label: 'Accessories' }, { label: 'Shoes' }, { label: 'T-Shirts' }, { label: 'Shorts' }],
                        },
                    ],
                    [
                        {
                            label: 'Swimming',
                            items: [{ label: 'Kickboard' }, { label: 'Nose Clip' }, { label: 'Swimsuits' }, { label: 'Paddles' }],
                        },
                    ],
                    [
                        {
                            label: 'Tennis',
                            items: [{ label: 'Balls' }, { label: 'Rackets' }, { label: 'Shoes' }, { label: 'Training' }],
                        },
                    ],
                ],
            },
        ];
    }
}`
    };
}
