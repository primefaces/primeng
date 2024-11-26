import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    imports: [CommonModule],
    template: `
        <div>
            <div class="doc-intro">
                <h1>Roadmap</h1>
                <p>
                    At <a href="https://www.primetek.com.tr/" class="text-primary font-medium hover:underline">PrimeTek</a>, we are passionate about improving PrimeNG and would like to share our ideas for 2024 with the community. These are planned to
                    be implemented in parallel to the regular maintenance work of the library involving review of issue tickets, PRs and PrimeNG PRO support.
                </p>
            </div>

            <div class="overflow-auto">
                <div style="min-width: 1200px">
                    <div class="flex gap-4 mb-4">
                        <div class="shrink-0 w-56"></div>
                        <div class="flex-1 bg-slate-500 text-white font-bold text-center p-4 text-xl rounded-border">Q1</div>
                        <div class="flex-1 bg-slate-500 text-white font-bold text-center p-4 text-xl rounded-border">Q2</div>
                        <div class="flex-1 bg-slate-500 text-white font-bold text-center p-4 text-xl rounded-border">Q3</div>
                        <div class="flex-1 bg-slate-500 text-white font-bold text-center p-4 text-xl rounded-border">Q4</div>
                    </div>
                    <div class="flex flex-col gap-4">
                        <div class="flex gap-4 border-b border-surface pb-4">
                            <div class="shrink-0 p-4 bg-blue-500 text-white rounded-border font-bold text-lg flex items-center justify-center w-56">COMPONENTS</div>
                            <div class="flex-1 flex gap-4 flex-col">
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded-border border-blue-500" style="border-left: 6px solid">
                                    <h2 class="text-lg font-bold mt-0 mb-2">Unstyled Mode</h2>
                                    <p class="mt-0 mb-4 leading-normal">Initiate unstyled mode for a set of components.</p>
                                    <div class="bg-surface-200 dark:bg-surface-600 rounded-border">
                                        <div class="bg-blue-500 rounded-border" style="width: 10%; height: 4px"></div>
                                    </div>
                                </div>
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded-border border-blue-500" style="border-left: 6px solid">
                                    <h2 class="text-lg font-bold mt-0 mb-2">Pass Through Props</h2>
                                    <p class="mt-0 mb-4 leading-normal">Implement pass through properties for a set of components.</p>
                                    <div class="bg-surface-200 dark:bg-surface-600 rounded-border">
                                        <div class="bg-blue-500 rounded-border" style="width: 10%; height: 4px"></div>
                                    </div>
                                </div>
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded-border border-blue-500" style="border-left: 6px solid">
                                    <h2 class="text-lg font-bold mt-0 mb-2">New Components</h2>
                                    <p class="mt-0 mb-4 leading-normal">Layout, Typography, MeterGroup, Drawer, Stepper...</p>
                                    <div class="bg-surface-200 dark:bg-surface-600 rounded-border">
                                        <div class="bg-blue-500 rounded-border" style="width: 0%; height: 4px"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-1 flex gap-4 flex-col">
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded-border border-blue-500" style="border-left: 6px solid">
                                    <h2 class="text-lg font-bold mt-0 mb-2">New Styled Mode</h2>
                                    <p class="mt-0 mb-4 leading-normal">Move theming into core to replace sass repo..</p>
                                    <div class="bg-surface-200 dark:bg-surface-600 rounded-border">
                                        <div class="bg-blue-500 rounded-border" style="width: 0%; height: 4px"></div>
                                    </div>
                                </div>
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded-border border-blue-500" style="border-left: 6px solid">
                                    <h2 class="text-lg font-bold mt-0 mb-2">CSS Variables</h2>
                                    <p class="mt-0 mb-4 leading-normal">Implement figma design tokens as CSS variables instead of SCSS.</p>
                                    <div class="bg-surface-200 dark:bg-surface-600 rounded-border">
                                        <div class="bg-blue-500 rounded-border" style="width: 0%; height: 4px"></div>
                                    </div>
                                </div>
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded-border border-blue-500" style="border-left: 6px solid">
                                    <h2 class="text-lg font-bold mt-0 mb-2">RTL Mode</h2>
                                    <p class="mt-0 mb-4 leading-normal">RTL support for the UI components.</p>
                                    <div class="bg-surface-200 dark:bg-surface-600 rounded-border">
                                        <div class="bg-blue-500 rounded-border" style="width: 0%; height: 4px"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-1 flex gap-4 flex-col">
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded-border border-blue-500" style="border-left: 6px solid">
                                    <h2 class="text-lg font-bold mt-0 mb-2">Advanced Components</h2>
                                    <p class="mt-0 mb-4 leading-normal">Sheet, Event Calendar.</p>
                                    <div class="bg-surface-200 dark:bg-surface-600 rounded-border">
                                        <div class="bg-blue-500 rounded-border" style="width: 0%; height: 4px"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-1 flex gap-4 flex-col">
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded-border border-blue-500" style="border-left: 6px solid">
                                    <h2 class="text-lg font-bold mt-0 mb-2">Advanced Components</h2>
                                    <p class="mt-0 mb-4 leading-normal">Gantt Chart, Flow Chart.</p>
                                    <div class="bg-surface-200 dark:bg-surface-600 rounded-border">
                                        <div class="bg-blue-500 rounded-border" style="width: 0%; height: 4px"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex gap-4 border-b border-surface pb-4">
                            <div class="shrink-0 p-4 bg-indigo-500 text-white rounded-border font-bold text-lg flex items-center justify-center w-56">FIGMA UI Kit</div>
                            <div class="flex-1 flex gap-4 flex-col">
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded-border border-indigo-500" style="border-left: 6px solid">
                                    <h2 class="text-lg font-bold mt-0 mb-2">New Figma Tokens</h2>
                                    <p class="mt-0 mb-4 leading-normal">Design tokens to sync with the new styled mode.</p>
                                    <div class="bg-surface-200 dark:bg-surface-600 rounded-border">
                                        <div class="bg-indigo-500 rounded-border" style="width: 20%; height: 4px"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-1 flex gap-4 flex-col">
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded-border border-indigo-500" style="border-left: 6px solid">
                                    <h2 class="text-lg font-bold mt-0 mb-2">Figma to Theme API</h2>
                                    <p class="mt-0 mb-4 leading-normal">Build the infrastructure to generate themes from Figma.</p>
                                    <div class="bg-surface-200 dark:bg-surface-600 rounded-border">
                                        <div class="bg-indigo-500 rounded-border" style="width: 0%; height: 4px"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-1 flex gap-4 flex-col"></div>
                            <div class="flex-1 flex gap-4 flex-col"></div>
                        </div>
                        <div class="flex gap-4 border-b border-surface pb-4">
                            <div class="shrink-0 p-4 bg-teal-500 text-white rounded-border font-bold text-lg flex items-center justify-center w-56">SHOWCASE</div>
                            <div class="flex-1 flex gap-4 flex-col">
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded-border border-teal-500" style="border-left: 6px solid">
                                    <h2 class="text-lg font-bold mt-0 mb-2">Documentation</h2>
                                    <p class="mt-0 mb-4 leading-normal">Add new demos and documentation.</p>
                                    <div class="bg-surface-200 dark:bg-surface-600 rounded-border">
                                        <div class="bg-teal-500 rounded-border" style="width: 10%; height: 4px"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-1 flex gap-4 flex-col"></div>
                            <div class="flex-1 flex gap-4 flex-col"></div>
                            <div class="flex-1 flex gap-4 flex-col"></div>
                        </div>
                        <div class="flex gap-4 border-b border-surface pb-4">
                            <div class="shrink-0 p-4 bg-orange-500 text-white rounded-border font-bold text-lg flex items-center justify-center w-56">PRIMEBLOCKS</div>
                            <div class="flex-1 flex gap-4 flex-col">
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded-border border-orange-500" style="border-left: 6px solid">
                                    <h2 class="text-lg font-bold mt-0 mb-2">Blocks Update</h2>
                                    <p class="mt-0 mb-4 leading-normal">Create new blocks.</p>
                                    <div class="bg-surface-200 dark:bg-surface-600 rounded-border">
                                        <div class="bg-orange-500 rounded-border" style="width: 50%; height: 4px"></div>
                                    </div>
                                </div>
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded-border border-orange-500" style="border-left: 6px solid">
                                    <h2 class="text-lg font-bold mt-0 mb-2">Blocks Website</h2>
                                    <p class="mt-0 mb-4 leading-normal">New design for blocks application</p>
                                    <div class="bg-surface-200 dark:bg-surface-600 rounded-border">
                                        <div class="bg-orange-500 rounded-border" style="width: 50%; height: 4px"></div>
                                    </div>
                                </div>
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded-border border-orange-500" style="border-left: 6px solid">
                                    <h2 class="text-lg font-bold mt-0 mb-2">Tailwind Blocks</h2>
                                    <p class="mt-0 mb-4 leading-normal">Port the entire Blocks to Tailwind.</p>
                                    <div class="bg-surface-200 dark:bg-surface-600 rounded-border">
                                        <div class="bg-orange-500 rounded-border" style="width: 0%; height: 4px"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-1 flex gap-4 flex-col">
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded-border border-orange-500" style="border-left: 6px solid">
                                    <h2 class="text-lg font-bold mt-0 mb-2">Online App</h2>
                                    <p class="mt-0 mb-4 leading-normal">Implement a SaaS app to access the blocks instead of an offline download.</p>
                                    <div class="bg-surface-200 dark:bg-surface-600 rounded-border">
                                        <div class="bg-orange-500 rounded-border" style="width: 0%; height: 4px"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-1 flex gap-4 flex-col"></div>
                            <div class="flex-1 flex gap-4 flex-col"></div>
                        </div>
                        <div class="flex gap-4 border-b border-surface pb-4">
                            <div class="shrink-0 p-4 bg-pink-500 text-white rounded-border font-bold text-lg flex items-center justify-center w-56">DESIGN</div>
                            <div class="flex-1 flex gap-4 flex-col">
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded-border border-pink-500" style="border-left: 6px solid">
                                    <h2 class="text-lg font-bold mt-0 mb-2">Aura UI Theme</h2>
                                    <p class="mt-0 mb-4 leading-normal">Brand new default theme with a modern and attractive design.</p>
                                    <div class="bg-surface-200 dark:bg-surface-600 rounded-border">
                                        <div class="bg-pink-500 rounded-border" style="width: 80%; height: 4px"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-1 flex gap-4 flex-col">
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded-border border-pink-500" style="border-left: 6px solid">
                                    <h2 class="text-lg font-bold mt-0 mb-2">Theme Editor</h2>
                                    <p class="mt-0 mb-4 leading-normal">Advanced Theme Editor App with full control over the new Styled Theming API.</p>
                                    <div class="bg-surface-200 dark:bg-surface-600 rounded-border">
                                        <div class="bg-pink-500 rounded-border" style="width: 0%; height: 4px"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-1 flex gap-4 flex-col"></div>
                            <div class="flex-1 flex gap-4 flex-col"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class RoadmapDemo {
    constructor(
        private titleService: Title,
        private metaService: Meta
    ) {
        this.titleService.setTitle('Roadmap - PrimeNG');
        this.metaService.updateTag({ name: 'description', content: 'PrimeNG Roadmap' });
    }
}
