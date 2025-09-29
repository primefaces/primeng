import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TabsModule } from 'primeng/tabs';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [PanelModule, AppDocSectionText, ButtonModule, TabsModule],
    template: `
        <app-docsectiontext>
            <p>A simple Panel is created with a <i>header</i> property along with the content as children.</p>
        </app-docsectiontext>
        <div class="card flex flex-col gap-4">
            <!-- 
            <p-button label="button Label" [pt]="{root: 'ROOTPT'}"/>
        -->

            <p-panel header="PARENT-Header" [pt]="{ root: rootPT, header: headerPT, pcToggleButton: buttonPT }" toggleable>
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p-tabs value="0">
                    <p-tablist>
                        <p-tab value="0">Header I</p-tab>
                        <p-tab value="1">Header II</p-tab>
                        <p-tab value="2">Header III</p-tab>
                    </p-tablist>
                    <p-tabpanels>
                        <p-tabpanel value="0">
                            <p-panel header="SUB-Header" toggleable [pt]="{ root: subPanelPT }">
                                <p>this is a sub panel component</p>
                            </p-panel>
                        </p-tabpanel>
                        <p-tabpanel value="1">
                            <p class="m-0">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                            </p>
                        </p-tabpanel>
                        <p-tabpanel value="2">
                            <p class="m-0">
                                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt
                                in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo
                                minus.
                            </p>
                        </p-tabpanel>
                    </p-tabpanels>
                </p-tabs>
            </p-panel>
        </div>
    `
})
export class PTPlayground {
    subPanelPT(params) {
        console.log('subpanel', params);

        return {
            root: 'YO'
        };
    }

    buttonPT({ instance, props, state, parent }) {
        const panelInstance = parent?.instance;
        const panelProps = parent?.props;
        const panelState = parent?.state;

        const isCollapsed = panelState?.collapsed ?? panelInstance?.collapsed?.() ?? false;

        return {
            root: {
                class: {
                    'button-collapsed': isCollapsed,
                    'button-expanded': !isCollapsed,
                    'PANEL-BUTTON-PT': true
                },
                style: {
                    background: isCollapsed ? 'lightblue' : 'lightgreen',
                    color: isCollapsed ? 'darkblue' : 'darkgreen'
                }
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
