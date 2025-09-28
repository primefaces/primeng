import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [PanelModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>A simple Panel is created with a <i>header</i> property along with the content as children.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-panel header="Header" [pt]="{ root: rootPT, header: headerPT, pcToggleButton: buttonPT }" toggleable>
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </p-panel>
        </div>
    `
})
export class PTPlayground {
    buttonPT({ instance }) {
        return {
            class: {
                'pcToggleButton-collapsed-true': instance.collapsed(),
                'pcToggleButton-collapsed-false': instance.collapsed()
            },
            style: {
                background: instance.collapsed() ? 'white !important;' : 'yellow !important;'
            }
        };
    }

    headerPT({ instance }) {
        const handleMouseEnter = (instance) => {};

        const handleClick = (instance) => {};

        return {
            class: [
                {
                    'header-collapsed-true': instance.collapsed(),
                    'header-collapsed-false': !instance.collapsed()
                },
                'STRING-CLASS',
                { OBJECT: instance.collapsed() },
                [{ object: true }],
                ['array-string-1', 'array-string-2']
            ],
            style: {
                background: !instance.collapsed() ? 'red;' : 'blue;'
            },
            // TODO: onmouseenter => onMouseEnter
            mouseenter: () => handleMouseEnter(instance),
            click: () => handleClick(instance),
            // mouseleave: () => this.handleMouseLeave(instance),
            'data-p-prime': true,
            'data-p-animating': instance.animating(),
            'aria-label': 'test aria label',
            id: 'RANDOM ID'
        };
    }

    rootPT({ instance }) {
        return {
            // class: [
            //     {
            //         '!border-2 !border-green-500': instance.collapsed()
            //     },
            //     'p-16'
            // ]

            class: {
                '!border-2 !border-green-500': instance.collapsed(),
                'p-4': true
            }
        };
    }
}
