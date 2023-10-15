import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { TerminalService } from 'primeng/terminal';
import { Subscription } from 'rxjs';
import { Code } from '../../domain/code';
import { NodeService } from '../../service/nodeservice';
import { PhotoService } from '../../service/photoservice';

@Component({
    selector: 'dock-advanced-demo',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                Dock requires a collection of menuitems as its <i>model</i>. Default location is <i>bottom</i> and other sides are also available when defined with the <i>position</i> property. Content of the dock component is defined by
                <i>item</i> template.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-menubar [model]="menubarItems">
                <ng-template pTemplate="start">
                    <i class="pi pi-apple"></i>
                </ng-template>
                <ng-template pTemplate="end">
                    <i class="pi pi-video"></i>
                    <i class="pi pi-wifi"></i>
                    <i class="pi pi-volume-up"></i>
                    <span>Fri 13:07</span>
                    <i class="pi pi-search"></i>
                    <i class="pi pi-bars"></i>
                </ng-template>
            </p-menubar>
            <div class="dock-window dock-advanced">
                <p-dock [model]="dockItems" position="bottom">
                    <ng-template pTemplate="item" let-item>
                        <img [src]="item.icon" [alt]="item.label" width="100%" />
                    </ng-template>
                </p-dock>

                <p-toast></p-toast>

                <p-dialog [(visible)]="displayFinder" [breakpoints]="{ '960px': '50vw' }" [style]="{ width: '30vw', height: '18rem' }" [draggable]="false" [resizable]="false">
                    <p-tree [value]="nodes"></p-tree>
                </p-dialog>

                <p-dialog [maximizable]="true" [(visible)]="displayTerminal" [breakpoints]="{ '960px': '50vw' }" [style]="{ width: '30vw' }" [draggable]="false" [resizable]="false">
                    <p-terminal welcomeMessage="Welcome to PrimeNG (cmd: 'date', 'greet {0}', 'random')" prompt="primeng $"></p-terminal>
                </p-dialog>

                <p-galleria
                    [(value)]="images"
                    [showThumbnails]="false"
                    [showThumbnailNavigators]="false"
                    [showItemNavigators]="true"
                    [(visible)]="displayGalleria"
                    [circular]="true"
                    [responsiveOptions]="responsiveOptions"
                    [containerStyle]="{ 'max-width': '850px' }"
                    [circular]="true"
                    [fullScreen]="true"
                >
                    <ng-template pTemplate="item" let-item>
                        <img [src]="item.previewImageSrc" style="width: 100%; display: block;" />
                    </ng-template>
                </p-galleria>
            </div>
        </div>
        <app-code [code]="code" selector="dock-advanced-demo"></app-code>
    </section>`,
    providers: [MessageService, TerminalService, PhotoService, NodeService]
})
export class AdvancedDoc implements OnInit, OnDestroy {
    @Input() id: string;

    @Input() title: string;

    displayTerminal: boolean | undefined;

    displayFinder: boolean | undefined;

    displayGalleria: boolean | undefined;

    dockItems: MenuItem[] | undefined;

    menubarItems: any[] | undefined;

    responsiveOptions: any[] | undefined;

    images: any[] | undefined;

    nodes: any[] | undefined;

    subscription: Subscription | undefined;

    constructor(private galleriaService: PhotoService, private nodeService: NodeService, private messageService: MessageService, private terminalService: TerminalService) {}

    ngOnInit() {
        this.dockItems = [
            {
                label: 'Finder',
                tooltipOptions: {
                    tooltipLabel: 'Finder',
                    tooltipPosition: 'top',
                    positionTop: -15,
                    positionLeft: 15,
                    showDelay: 1000
                },
                icon: 'https://primefaces.org/cdn/primeng/images/dock/finder.svg',
                command: () => {
                    this.displayFinder = true;
                }
            },
            {
                label: 'Terminal',
                tooltipOptions: {
                    tooltipLabel: 'Terminal',
                    tooltipPosition: 'top',
                    positionTop: -15,
                    positionLeft: 15,
                    showDelay: 1000
                },
                icon: 'https://primefaces.org/cdn/primeng/images/dock/terminal.svg',
                command: () => {
                    this.displayTerminal = true;
                }
            },
            {
                label: 'App Store',
                tooltipOptions: {
                    tooltipLabel: 'App Store',
                    tooltipPosition: 'top',
                    positionTop: -15,
                    positionLeft: 15,
                    showDelay: 1000
                },
                icon: 'https://primefaces.org/cdn/primeng/images/dock/appstore.svg',
                command: () => {
                    this.messageService.add({ severity: 'error', summary: 'An unexpected error occurred while signing in.', detail: 'UNTRUSTED_CERT_TITLE' });
                }
            },
            {
                label: 'Safari',
                tooltipOptions: {
                    tooltipLabel: 'Safari',
                    tooltipPosition: 'top',
                    positionTop: -15,
                    positionLeft: 15,
                    showDelay: 1000
                },
                icon: 'https://primefaces.org/cdn/primeng/images/dock/safari.svg',
                command: () => {
                    this.messageService.add({ severity: 'warn', summary: 'Safari has stopped working' });
                }
            },
            {
                label: 'Photos',
                tooltipOptions: {
                    tooltipLabel: 'Photos',
                    tooltipPosition: 'top',
                    positionTop: -15,
                    positionLeft: 15,
                    showDelay: 1000
                },
                icon: 'https://primefaces.org/cdn/primeng/images/dock/photos.svg',
                command: () => {
                    this.displayGalleria = true;
                }
            },
            {
                label: 'GitHub',
                tooltipOptions: {
                    tooltipLabel: 'GitHub',
                    tooltipPosition: 'top',
                    positionTop: -15,
                    positionLeft: 15,
                    showDelay: 1000
                },
                icon: 'https://primefaces.org/cdn/primeng/images/dock/github.svg'
            },
            {
                label: 'Trash',
                tooltipOptions: {
                    tooltipLabel: 'Trash',
                    tooltipPosition: 'top',
                    positionTop: -15,
                    positionLeft: 15,
                    showDelay: 1000
                },
                icon: 'https://primefaces.org/cdn/primeng/images/dock/trash.png',
                command: () => {
                    this.messageService.add({ severity: 'info', summary: 'Empty Trash' });
                }
            }
        ];

        this.menubarItems = [
            {
                label: 'Finder',
                styleClass: 'menubar-root'
            },
            {
                label: 'File',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            {
                                label: 'Bookmark',
                                icon: 'pi pi-fw pi-bookmark'
                            },
                            {
                                label: 'Video',
                                icon: 'pi pi-fw pi-video'
                            }
                        ]
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-fw pi-trash'
                    },
                    {
                        separator: true
                    },
                    {
                        label: 'Export',
                        icon: 'pi pi-fw pi-external-link'
                    }
                ]
            },
            {
                label: 'Edit',
                items: [
                    {
                        label: 'Left',
                        icon: 'pi pi-fw pi-align-left'
                    },
                    {
                        label: 'Right',
                        icon: 'pi pi-fw pi-align-right'
                    },
                    {
                        label: 'Center',
                        icon: 'pi pi-fw pi-align-center'
                    },
                    {
                        label: 'Justify',
                        icon: 'pi pi-fw pi-align-justify'
                    }
                ]
            },
            {
                label: 'Users',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-user-plus'
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-fw pi-user-minus'
                    },
                    {
                        label: 'Search',
                        icon: 'pi pi-fw pi-users',
                        items: [
                            {
                                label: 'Filter',
                                icon: 'pi pi-fw pi-filter',
                                items: [
                                    {
                                        label: 'Print',
                                        icon: 'pi pi-fw pi-print'
                                    }
                                ]
                            },
                            {
                                icon: 'pi pi-fw pi-bars',
                                label: 'List'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Events',
                items: [
                    {
                        label: 'Edit',
                        icon: 'pi pi-fw pi-pencil',
                        items: [
                            {
                                label: 'Save',
                                icon: 'pi pi-fw pi-calendar-plus'
                            },
                            {
                                label: 'Delete',
                                icon: 'pi pi-fw pi-calendar-minus'
                            }
                        ]
                    },
                    {
                        label: 'Archieve',
                        icon: 'pi pi-fw pi-calendar-times',
                        items: [
                            {
                                label: 'Remove',
                                icon: 'pi pi-fw pi-calendar-minus'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Quit'
            }
        ];

        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 3
            },
            {
                breakpoint: '768px',
                numVisible: 2
            },
            {
                breakpoint: '560px',
                numVisible: 1
            }
        ];

        this.subscription = this.terminalService.commandHandler.subscribe((command) => this.commandHandler(command));

        this.galleriaService.getImages().then((data) => (this.images = data));
        this.nodeService.getFiles().then((data) => (this.nodes = data));
    }

    commandHandler(text: any) {
        let response;
        let argsIndex = text.indexOf(' ');
        let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

        switch (command) {
            case 'date':
                response = 'Today is ' + new Date().toDateString();
                break;

            case 'greet':
                response = 'Hola ' + text.substring(argsIndex + 1) + '!';
                break;

            case 'random':
                response = Math.floor(Math.random() * 100);
                break;

            default:
                response = 'Unknown command: ' + command;
                break;
        }

        if (response) {
            this.terminalService.sendResponse(response as string);
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    code: Code = {
        basic: `
<p-menubar [model]="menubarItems">
    <ng-template pTemplate="start">
        <i class="pi pi-apple"></i>
    </ng-template>
    <ng-template pTemplate="end">
        <i class="pi pi-video"></i>
        <i class="pi pi-wifi"></i>
        <i class="pi pi-volume-up"></i>
        <span>Fri 13:07</span>
        <i class="pi pi-search"></i>
        <i class="pi pi-bars"></i>
    </ng-template>
</p-menubar>
<div class="dock-window dock-advanced">
    <p-dock [model]="dockItems" position="bottom">
        <ng-template pTemplate="item" let-item>
            <img [src]="item.icon" [alt]="item.label" width="100%" />
        </ng-template>
    </p-dock>

    <p-toast></p-toast>

    <p-dialog [(visible)]="displayFinder" [breakpoints]="{ '960px': '50vw' }" [style]="{ width: '30vw', height: '18rem' }" [draggable]="false" [resizable]="false">
        <p-tree [value]="nodes"></p-tree>
    </p-dialog>

    <p-dialog [maximizable]="true" [(visible)]="displayTerminal" [breakpoints]="{ '960px': '50vw' }" [style]="{ width: '30vw' }" [draggable]="false" [resizable]="false">
        <p-terminal welcomeMessage="Welcome to PrimeNG (cmd: 'date', 'greet {0}', 'random')" prompt="primeng $"></p-terminal>
    </p-dialog>

    <p-galleria
        [(value)]="images"
        [showThumbnails]="false"
        [showThumbnailNavigators]="false"
        [showItemNavigators]="true"
        [(visible)]="displayGalleria"
        [circular]="true"
        [responsiveOptions]="responsiveOptions"
        [containerStyle]="{ 'max-width': '850px' }"
        [circular]="true"
        [fullScreen]="true"
    >
        <ng-template pTemplate="item" let-item>
            <img [src]="item.previewImageSrc" style="width: 100%; display: block;" />
        </ng-template>
    </p-galleria>
</div>`,

        html: `
<div class="card">
    <p-menubar [model]="menubarItems">
        <ng-template pTemplate="start">
            <i class="pi pi-apple"></i>
        </ng-template>
        <ng-template pTemplate="end">
            <i class="pi pi-video"></i>
            <i class="pi pi-wifi"></i>
            <i class="pi pi-volume-up"></i>
            <span>Fri 13:07</span>
            <i class="pi pi-search"></i>
            <i class="pi pi-bars"></i>
        </ng-template>
    </p-menubar>
    <div class="dock-window dock-advanced">
        <p-dock [model]="dockItems" position="bottom">
            <ng-template pTemplate="item" let-item>
                <img [src]="item.icon" [alt]="item.label" width="100%" />
            </ng-template>
        </p-dock>

        <p-toast></p-toast>

        <p-dialog [(visible)]="displayFinder" [breakpoints]="{ '960px': '50vw' }" [style]="{ width: '30vw', height: '18rem' }" [draggable]="false" [resizable]="false">
            <p-tree [value]="nodes"></p-tree>
        </p-dialog>

        <p-dialog [maximizable]="true" [(visible)]="displayTerminal" [breakpoints]="{ '960px': '50vw' }" [style]="{ width: '30vw' }" [draggable]="false" [resizable]="false">
            <p-terminal welcomeMessage="Welcome to PrimeNG (cmd: 'date', 'greet {0}', 'random')" prompt="primeng $"></p-terminal>
        </p-dialog>

        <p-galleria
            [(value)]="images"
            [showThumbnails]="false"
            [showThumbnailNavigators]="false"
            [showItemNavigators]="true"
            [(visible)]="displayGalleria"
            [circular]="true"
            [responsiveOptions]="responsiveOptions"
            [containerStyle]="{ 'max-width': '850px' }"
            [circular]="true"
            [fullScreen]="true"
        >
            <ng-template pTemplate="item" let-item>
                <img [src]="item.previewImageSrc" style="width: 100%; display: block;" />
            </ng-template>
        </p-galleria>
    </div>
</div>`,

        typescript: `
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { TerminalService } from 'primeng/terminal';
import { Subscription } from 'rxjs';
import { NodeService } from '../../service/nodeservice';
import { PhotoService } from '../../service/photoservice';

@Component({
    selector: 'dock-advanced-demo',
    templateUrl: './dock-advanced-demo.html',
    styleUrls: ['./dock-advanced-demo.scss'],
    providers: [MessageService, TerminalService]
})
export class DockAdvancedDemo implements OnInit {
    displayTerminal: boolean | undefined;

    displayFinder: boolean | undefined;

    displayGalleria: boolean | undefined;

    dockItems: MenuItem[] | undefined;

    menubarItems: any[] | undefined;

    responsiveOptions: any[] | undefined;

    images: any[] | undefined;

    nodes: any[] | undefined;

    subscription: Subscription | undefined;

    constructor(private galleriaService: PhotoService, private nodeService: NodeService, private messageService: MessageService, private terminalService: TerminalService) {}

    ngOnInit() {
        this.dockItems = [
            {
                label: 'Finder',
                tooltipOptions: {
                    tooltipLabel: 'Finder',
                    tooltipPosition: 'top',
                    positionTop: -15,
                    positionLeft: 15,
                    showDelay: 1000
                },
                icon: 'https://primefaces.org/cdn/primeng/images/dock/finder.svg',
                command: () => {
                    this.displayFinder = true;
                }
            },
            {
                label: 'Terminal',
                tooltipOptions: {
                    tooltipLabel: 'Terminal',
                    tooltipPosition: 'top',
                    positionTop: -15,
                    positionLeft: 15,
                    showDelay: 1000
                },
                icon: 'https://primefaces.org/cdn/primeng/images/dock/terminal.svg',
                command: () => {
                    this.displayTerminal = true;
                }
            },
            {
                label: 'App Store',
                tooltipOptions: {
                    tooltipLabel: 'App Store',
                    tooltipPosition: 'top',
                    positionTop: -15,
                    positionLeft: 15,
                    showDelay: 1000
                },
                icon: 'https://primefaces.org/cdn/primeng/images/dock/appstore.svg',
                command: () => {
                    this.messageService.add({ severity: 'error', summary: 'An unexpected error occurred while signing in.', detail: 'UNTRUSTED_CERT_TITLE' });
                }
            },
            {
                label: 'Safari',
                tooltipOptions: {
                    tooltipLabel: 'Safari',
                    tooltipPosition: 'top',
                    positionTop: -15,
                    positionLeft: 15,
                    showDelay: 1000
                },
                icon: 'https://primefaces.org/cdn/primeng/images/dock/safari.svg',
                command: () => {
                    this.messageService.add({ severity: 'warn', summary: 'Safari has stopped working' });
                }
            },
            {
                label: 'Photos',
                tooltipOptions: {
                    tooltipLabel: 'Photos',
                    tooltipPosition: 'top',
                    positionTop: -15,
                    positionLeft: 15,
                    showDelay: 1000
                },
                icon: 'https://primefaces.org/cdn/primeng/images/dock/photos.svg',
                command: () => {
                    this.displayGalleria = true;
                }
            },
            {
                label: 'GitHub',
                tooltipOptions: {
                    tooltipLabel: 'GitHub',
                    tooltipPosition: 'top',
                    positionTop: -15,
                    positionLeft: 15,
                    showDelay: 1000
                },
                icon: 'https://primefaces.org/cdn/primeng/images/dock/github.svg'
            },
            {
                label: 'Trash',
                tooltipOptions: {
                    tooltipLabel: 'Trash',
                    tooltipPosition: 'top',
                    positionTop: -15,
                    positionLeft: 15,
                    showDelay: 1000
                },
                icon: 'https://primefaces.org/cdn/primeng/images/dock/trash.png',
                command: () => {
                    this.messageService.add({ severity: 'info', summary: 'Empty Trash' });
                }
            }
        ];

        this.menubarItems = [
            {
                label: 'Finder',
                styleClass: 'menubar-root'
            },
            {
                label: 'File',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            {
                                label: 'Bookmark',
                                icon: 'pi pi-fw pi-bookmark'
                            },
                            {
                                label: 'Video',
                                icon: 'pi pi-fw pi-video'
                            }
                        ]
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-fw pi-trash'
                    },
                    {
                        separator: true
                    },
                    {
                        label: 'Export',
                        icon: 'pi pi-fw pi-external-link'
                    }
                ]
            },
            {
                label: 'Edit',
                items: [
                    {
                        label: 'Left',
                        icon: 'pi pi-fw pi-align-left'
                    },
                    {
                        label: 'Right',
                        icon: 'pi pi-fw pi-align-right'
                    },
                    {
                        label: 'Center',
                        icon: 'pi pi-fw pi-align-center'
                    },
                    {
                        label: 'Justify',
                        icon: 'pi pi-fw pi-align-justify'
                    }
                ]
            },
            {
                label: 'Users',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-user-plus'
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-fw pi-user-minus'
                    },
                    {
                        label: 'Search',
                        icon: 'pi pi-fw pi-users',
                        items: [
                            {
                                label: 'Filter',
                                icon: 'pi pi-fw pi-filter',
                                items: [
                                    {
                                        label: 'Print',
                                        icon: 'pi pi-fw pi-print'
                                    }
                                ]
                            },
                            {
                                icon: 'pi pi-fw pi-bars',
                                label: 'List'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Events',
                items: [
                    {
                        label: 'Edit',
                        icon: 'pi pi-fw pi-pencil',
                        items: [
                            {
                                label: 'Save',
                                icon: 'pi pi-fw pi-calendar-plus'
                            },
                            {
                                label: 'Delete',
                                icon: 'pi pi-fw pi-calendar-minus'
                            }
                        ]
                    },
                    {
                        label: 'Archieve',
                        icon: 'pi pi-fw pi-calendar-times',
                        items: [
                            {
                                label: 'Remove',
                                icon: 'pi pi-fw pi-calendar-minus'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Quit'
            }
        ];

        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 3
            },
            {
                breakpoint: '768px',
                numVisible: 2
            },
            {
                breakpoint: '560px',
                numVisible: 1
            }
        ];

        this.subscription = this.terminalService.commandHandler.subscribe((command) => this.commandHandler(command));

        this.galleriaService.getImages().then((data) => (this.images = data));
        this.nodeService.getFiles().then((data) => (this.nodes = data));
    }

    commandHandler(text: any) {
        let response;
        let argsIndex = text.indexOf(' ');
        let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

        switch (command) {
            case 'date':
                response = 'Today is ' + new Date().toDateString();
                break;

            case 'greet':
                response = 'Hola ' + text.substring(argsIndex + 1) + '!';
                break;

            case 'random':
                response = Math.floor(Math.random() * 100);
                break;

            default:
                response = 'Unknown command: ' + command;
                break;
        }

        if (response) {
            this.terminalService.sendResponse(response as string);
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}`,
        scss: `
:host ::ng-deep {
    .dock-window {
        width: 100%;
        height: 450px;
        position: relative;
        background-image: url('https://primefaces.org/cdn/primeng/images/dock/window.jpg');
        background-repeat: no-repeat;
        background-size: cover;
    }

    .p-dock {
        z-index: 1000;
    }

    .dock-advanced {
        .p-dialog-mask,
        .p-toast {
            position: absolute;
        }

        .p-dialog {
            .p-dialog-header {
                padding: .2rem;
            }

            .p-dialog-content {
                padding: 0;
            }

            p {
                margin-top: 0;
            }

            .p-terminal {
                background-color: #212121;
                color: #ffffff;
                border: 0 none;
                min-height: 18rem;
                height: 100%;

                .p-terminal-command {
                    color: #80CBC4;
                }

                .p-terminal-prompt {
                    color: #FFD54F;
                }

                .p-terminal-response {
                    color: #9FA8DA;
                }
            }

            .p-tree {
                height: 100%;
                border-radius: 0;
                border-left-width: 0;
                border-right-width: 0;
                border-bottom-width: 0;
            }
        }

        .p-toast {
            top: 20px;
        }
    }

    .p-menubar {
        padding-top: 0;
        padding-bottom: 0;
        border-radius: 0;

        .p-menuitem:first-child {
            font-weight: bold;
            padding: 0 1rem;
        }

        .p-menuitem-link {
            padding: 0.5rem .75rem;
        }

        .p-menubar-root-list > .p-menuitem > .p-menuitem-link {
            padding: 0.5rem .75rem;

            > .p-submenu-icon {
                display: none;
            }
        }

        .p-menubar-end {
            span, i {
                padding: 0 .75rem;
            }
        }
    }
}

.dark-tooltip {
    .p-tooltip {
        .p-tooltip-arrow {
            border-top-color: var(--surface-900);
        }

        .p-tooltip-text {
            background-color: var(--surface-900);
        }
    }
}`,
        service: ['PhotoService', 'NodeService']
    };
}
