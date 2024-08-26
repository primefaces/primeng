import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'dock-basic-demo',
    template: `
        <app-docsectiontext>
            <p>
                Dock requires a collection of menuitems as its <i>model</i>. Default location is <i>bottom</i> and other sides are also available when defined with the <i>position</i> property. Content of the dock component is defined by
                <i>item</i> template.
            </p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex flex-wrap gap-4 mb-8">
                <p-radioButton *ngFor="let option of positionOptions" [name]="option.label" [value]="option.value" [label]="option.label" [(ngModel)]="position" [inputId]="label" />
            </div>
            <div class="dock-window">
                <p-dock [model]="items" [position]="position">
                    <ng-template pTemplate="item" let-item>
                        <img [src]="item.icon" [alt]="item.label" width="100%" />
                    </ng-template>
                </p-dock>
            </div>
        </div>
        <app-code [code]="code" selector="dock-basic-demo"></app-code>
    `
})
export class BasicDoc implements OnInit {
    items: MenuItem[] | undefined;

    position: string = 'bottom';

    positionOptions = [
        {
            label: 'Bottom',
            value: 'bottom'
        },
        {
            label: 'Top',
            value: 'top'
        },
        {
            label: 'Left',
            value: 'left'
        },
        {
            label: 'Right',
            value: 'right'
        }
    ];

    ngOnInit() {
        this.items = [
            {
                label: 'Finder',
                icon: 'https://primefaces.org/cdn/primeng/images/dock/finder.svg'
            },
            {
                label: 'App Store',
                icon: 'https://primefaces.org/cdn/primeng/images/dock/appstore.svg'
            },
            {
                label: 'Photos',
                icon: 'https://primefaces.org/cdn/primeng/images/dock/photos.svg'
            },
            {
                label: 'Trash',
                icon: 'https://primefaces.org/cdn/primeng/images/dock/trash.png'
            }
        ];
    }

    code: Code = {
        basic: `<p-dock [model]="items" [position]="position">
    <ng-template pTemplate="item" let-item>
        <img [src]="item.icon" [alt]="item.label" width="100%" />
    </ng-template>
</p-dock>`,

        html: `<div class="card">
    <div class="flex flex-wrap gap-4 mb-8">
        <p-radioButton 
            *ngFor="let option of positionOptions" 
            [name]="option.label" 
            [value]="option.value" 
            [label]="option.label" 
            [(ngModel)]="position" 
            [inputId]="label" />
    </div>
    <div class="dock-window">
        <p-dock [model]="items" [position]="position">
            <ng-template pTemplate="item" let-item>
                <img [src]="item.icon" [alt]="item.label" width="100%" />
            </ng-template>
        </p-dock>
    </div>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DockModule } from 'primeng/dock';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'dock-basic-demo',
    templateUrl: './dock-basic-demo.html',
    styles: [
        \` .dock-window {
            width: 100%;
            height: 450px;
            position: relative;
            background-image: url('https://primefaces.org/cdn/primeng/images/dock/window.jpg');
            background-repeat: no-repeat;
            background-size: cover;
        }
    
        .p-dock {
            z-index: 1000;
        }\`
    ],
    standalone: true,
    imports: [DockModule, RadioButtonModule, CommonModule, FormsModule]
})
export class DockBasicDemo implements OnInit {
    items: MenuItem[] | undefined;

    position: string = 'bottom';

    positionOptions = [
        {
            label: 'Bottom',
            value: 'bottom'
        },
        {
            label: 'Top',
            value: 'top'
        },
        {
            label: 'Left',
            value: 'left'
        },
        {
            label: 'Right',
            value: 'right'
        }
    ];

    ngOnInit() {
        this.items = [
            {
                label: 'Finder',
                icon: 'https://primefaces.org/cdn/primeng/images/dock/finder.svg'
            },
            {
                label: 'App Store',
                icon: 'https://primefaces.org/cdn/primeng/images/dock/appstore.svg'
            },
            {
                label: 'Photos',
                icon: 'https://primefaces.org/cdn/primeng/images/dock/photos.svg'
            },
            {
                label: 'Trash',
                icon: 'https://primefaces.org/cdn/primeng/images/dock/trash.png'
            }
        ];
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
}`
    };
}
