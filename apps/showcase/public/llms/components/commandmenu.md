# Angular CommandMenu Component

CommandMenu is a search-driven command palette component.

## Accessibility

Screen Reader The search input has a combobox role with aria-expanded , aria-controls and aria-activedescendant attributes. The list element uses the listbox role and each item has an option role. Value to describe the component can be provided via ariaLabel prop.

## Basic

CommandMenu requires a collection of options via the options property. Use group to display grouped commands with optionGroupLabel and optionGroupChildren .

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
    template: `
        <p-commandmenu [options]="commands" optionLabel="label" optionValue="value" [group]="true" optionGroupLabel="group" optionGroupChildren="items" optionKeywords="keywords" placeholder="Search for commands..." class="mx-auto">
            <ng-template #empty>No results found</ng-template>
            <ng-template #footer>
                <div class="flex items-center justify-end gap-3">
                    <span class="flex items-center gap-1 text-surface-500 text-xs">
                        <kbd class="bg-surface-100 dark:bg-surface-800 size-5 inline-flex items-center justify-center rounded border border-surface-200 dark:border-surface-700">
                            <svg data-p-icon="arrow-up"></svg>
                        </kbd>
                        <kbd class="bg-surface-100 dark:bg-surface-800 size-5 inline-flex items-center justify-center rounded border border-surface-200 dark:border-surface-700">
                            <svg data-p-icon="arrow-down"></svg>
                        </kbd>
                        Navigate
                    </span>
                    <span class="flex items-center gap-1 text-surface-500 text-xs">
                        <kbd class="bg-surface-100 dark:bg-surface-800 size-5 inline-flex items-center justify-center rounded border border-surface-200 dark:border-surface-700"> &#x21B5; </kbd>
                        Select
                    </span>
                </div>
            </ng-template>
        </p-commandmenu>
    `,
    standalone: true,
    imports: []
})
export class CommandmenuBasicDemo implements OnInit {
    commands!: any[];

    ngOnInit() {
        this.commands = [
            {
                group: 'Recents',
                items: [
                    { label: 'Check For Updates', value: 'check for updates', keywords: ['check', 'updates'] },
                    { label: 'Open Settings', value: 'open settings' },
                    { label: 'Search Files', value: 'search files' },
                    { label: 'Open Terminal', value: 'open terminal' },
                    { label: 'View History', value: 'view history', keywords: ['history', 'recent'] },
                    { label: 'Open Chat', value: 'open chat' }
                ]
            },
            {
                group: 'Files',
                items: [
                    { label: 'New File', value: 'new file' },
                    { label: 'New Folder', value: 'new folder' },
                    { label: 'Save All', value: 'save-all' },
                    { label: 'Change Theme', value: 'change theme' },
                    { label: 'Run Task', value: 'run-task' },
                    { label: 'Stop Task', value: 'stop task' },
                    { label: 'Export Project', value: 'export project' },
                    { label: 'Import Project', value: 'import project' },
                    { label: 'Delete File', value: 'delete file' },
                    { label: 'Duplicate File', value: 'duplicate file' }
                ]
            },
            {
                group: 'Source',
                items: [
                    { label: 'Git: Commit', value: 'git commit' },
                    { label: 'Git: Push', value: 'git push' },
                    { label: 'Git: Pull', value: 'git pull' },
                    { label: 'Switch Account', value: 'switch account' },
                    { label: 'Open Documentation', value: 'open documentation' },
                    { label: 'Git: Sync', value: 'git sync' },
                    { label: 'Git: Create Branch', value: 'git create branch' },
                    { label: 'Git: Create Tag', value: 'git create tag' }
                ]
            },
            {
                group: 'Editor',
                items: [
                    { label: 'Align Left', value: 'align left' },
                    { label: 'Align Center', value: 'align center' },
                    { label: 'Align Right', value: 'align right' },
                    { label: 'Toggle Bold', value: 'toggle bold' },
                    { label: 'Toggle Italic', value: 'toggle italic' },
                    { label: 'Insert Link', value: 'insert link' },
                    { label: 'Insert Image', value: 'insert image' },
                    { label: 'Insert List', value: 'insert list' }
                ]
            },
            {
                group: 'Navigation',
                items: [
                    { label: 'Go to Home', value: 'go to home' },
                    { label: 'Go Back', value: 'go back' },
                    { label: 'Go Forward', value: 'go forward' },
                    { label: 'Open Explorer', value: 'open explorer' },
                    { label: 'View Bookmarks', value: 'view bookmarks' },
                    { label: 'Open Minimap', value: 'open minimap' }
                ]
            },
            {
                group: 'View',
                items: [
                    { label: 'Toggle Preview', value: 'toggle preview' },
                    { label: 'Maximize Window', value: 'maximize window' },
                    { label: 'Minimize Window', value: 'minimize window' },
                    { label: 'Grid View', value: 'grid view' },
                    { label: 'List View', value: 'list view' },
                    { label: 'Light Mode', value: 'light mode' },
                    { label: 'Dark Mode', value: 'dark mode' }
                ]
            },
            {
                group: 'Tools',
                items: [
                    { label: 'Open Calculator', value: 'open calculator' },
                    { label: 'Open Calendar', value: 'open calendar' },
                    { label: 'Open Timer', value: 'open timer' },
                    { label: 'View Analytics', value: 'view analytics' },
                    { label: 'View Trends', value: 'view trends' },
                    { label: 'Open Database', value: 'open database' }
                ]
            }
        ];
    }
}
```

## Controlled

The search value can be controlled with two-way binding using [(search)] . An empty template customizes the message when no results are found.

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
    template: `
        <p-commandmenu
            [options]="commands"
            optionLabel="label"
            optionValue="value"
            [group]="true"
            optionGroupLabel="group"
            optionGroupChildren="items"
            optionKeywords="keywords"
            [(search)]="searchValue"
            placeholder="Search for commands..."
            class="mx-auto"
        >
            <ng-template #empty let-search>
                No results found for <span class="text-surface-900 dark:text-surface-0">"{{ search }}"</span>
            </ng-template>
            <ng-template #footer>
                <div class="flex items-center justify-end gap-3">
                    <span class="flex items-center gap-1 text-surface-500 text-xs">
                        <kbd class="bg-surface-100 dark:bg-surface-800 size-5 inline-flex items-center justify-center rounded border border-surface-200 dark:border-surface-700">
                            <svg data-p-icon="arrow-up"></svg>
                        </kbd>
                        <kbd class="bg-surface-100 dark:bg-surface-800 size-5 inline-flex items-center justify-center rounded border border-surface-200 dark:border-surface-700">
                            <svg data-p-icon="arrow-down"></svg>
                        </kbd>
                        Navigate
                    </span>
                    <span class="flex items-center gap-1 text-surface-500 text-xs">
                        <kbd class="bg-surface-100 dark:bg-surface-800 size-5 inline-flex items-center justify-center rounded border border-surface-200 dark:border-surface-700"> &#x21B5; </kbd>
                        Select
                    </span>
                </div>
            </ng-template>
        </p-commandmenu>
    `,
    standalone: true,
    imports: []
})
export class CommandmenuControlledDemo implements OnInit {
    commands!: any[];
    searchValue: string = '';

    ngOnInit() {
        this.commands = [
            {
                group: 'Recents',
                items: [
                    { label: 'Check For Updates', value: 'check for updates', keywords: ['check', 'updates'] },
                    { label: 'Open Settings', value: 'open settings' },
                    { label: 'Search Files', value: 'search files' },
                    { label: 'Open Terminal', value: 'open terminal' },
                    { label: 'View History', value: 'view history', keywords: ['history', 'recent'] },
                    { label: 'Open Chat', value: 'open chat' }
                ]
            },
            {
                group: 'Files',
                items: [
                    { label: 'New File', value: 'new file' },
                    { label: 'New Folder', value: 'new folder' },
                    { label: 'Save All', value: 'save-all' },
                    { label: 'Change Theme', value: 'change theme' },
                    { label: 'Run Task', value: 'run-task' },
                    { label: 'Stop Task', value: 'stop task' },
                    { label: 'Export Project', value: 'export project' },
                    { label: 'Import Project', value: 'import project' },
                    { label: 'Delete File', value: 'delete file' },
                    { label: 'Duplicate File', value: 'duplicate file' }
                ]
            },
            {
                group: 'Source',
                items: [
                    { label: 'Git: Commit', value: 'git commit' },
                    { label: 'Git: Push', value: 'git push' },
                    { label: 'Git: Pull', value: 'git pull' },
                    { label: 'Switch Account', value: 'switch account' },
                    { label: 'Open Documentation', value: 'open documentation' },
                    { label: 'Git: Sync', value: 'git sync' },
                    { label: 'Git: Create Branch', value: 'git create branch' },
                    { label: 'Git: Create Tag', value: 'git create tag' }
                ]
            },
            {
                group: 'Editor',
                items: [
                    { label: 'Align Left', value: 'align left' },
                    { label: 'Align Center', value: 'align center' },
                    { label: 'Align Right', value: 'align right' },
                    { label: 'Toggle Bold', value: 'toggle bold' },
                    { label: 'Toggle Italic', value: 'toggle italic' },
                    { label: 'Insert Link', value: 'insert link' },
                    { label: 'Insert Image', value: 'insert image' },
                    { label: 'Insert List', value: 'insert list' }
                ]
            },
            {
                group: 'Navigation',
                items: [
                    { label: 'Go to Home', value: 'go to home' },
                    { label: 'Go Back', value: 'go back' },
                    { label: 'Go Forward', value: 'go forward' },
                    { label: 'Open Explorer', value: 'open explorer' },
                    { label: 'View Bookmarks', value: 'view bookmarks' },
                    { label: 'Open Minimap', value: 'open minimap' }
                ]
            },
            {
                group: 'View',
                items: [
                    { label: 'Toggle Preview', value: 'toggle preview' },
                    { label: 'Maximize Window', value: 'maximize window' },
                    { label: 'Minimize Window', value: 'minimize window' },
                    { label: 'Grid View', value: 'grid view' },
                    { label: 'List View', value: 'list view' },
                    { label: 'Light Mode', value: 'light mode' },
                    { label: 'Dark Mode', value: 'dark mode' }
                ]
            },
            {
                group: 'Tools',
                items: [
                    { label: 'Open Calculator', value: 'open calculator' },
                    { label: 'Open Calendar', value: 'open calendar' },
                    { label: 'Open Timer', value: 'open timer' },
                    { label: 'View Analytics', value: 'view analytics' },
                    { label: 'View Trends', value: 'view trends' },
                    { label: 'Open Database', value: 'open database' }
                ]
            }
        ];
    }
}
```

## Custom

Custom content can be displayed for each item using the item template.

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
    template: `
        <p-commandmenu [options]="commands" optionLabel="label" optionValue="value" [group]="true" optionGroupLabel="group" optionGroupChildren="items" optionKeywords="keywords" placeholder="Search for commands..." class="mx-auto">
            <ng-template #item let-item>
                <div class="flex items-center gap-3.5 w-full">
                    <span [class]="'w-5 h-5 rounded-md flex items-center justify-center text-white ' + item.color">
                        <i [class]="'pi ' + item.icon + ' text-xs font-bold'"></i>
                    </span>
                    <span>{{ item.label }}</span>
                    <span class="opacity-50 ml-auto">{{ item.category }}</span>
                </div>
            </ng-template>
            <ng-template #empty>No results found</ng-template>
            <ng-template #footer>
                <div class="flex items-center justify-end gap-3">
                    <span class="flex items-center gap-1 text-surface-500 text-xs">
                        <kbd class="bg-surface-100 dark:bg-surface-800 size-5 inline-flex items-center justify-center rounded border border-surface-200 dark:border-surface-700">
                            <svg data-p-icon="arrow-up"></svg>
                        </kbd>
                        <kbd class="bg-surface-100 dark:bg-surface-800 size-5 inline-flex items-center justify-center rounded border border-surface-200 dark:border-surface-700">
                            <svg data-p-icon="arrow-down"></svg>
                        </kbd>
                        Navigate
                    </span>
                    <span class="flex items-center gap-1 text-surface-500 text-xs">
                        <kbd class="bg-surface-100 dark:bg-surface-800 size-5 inline-flex items-center justify-center rounded border border-surface-200 dark:border-surface-700"> &#x21B5; </kbd>
                        Select
                    </span>
                </div>
            </ng-template>
        </p-commandmenu>
    `,
    standalone: true,
    imports: []
})
export class CommandmenuCustomDemo implements OnInit {
    commands!: any[];

    ngOnInit() {
        this.commands = [
            {
                group: 'Recents',
                items: [
                    { icon: 'pi-refresh', label: 'Check For Updates', category: 'Command', color: 'bg-[linear-gradient(rgb(245,83,84),rgb(235,70,70))]', value: 'check for updates', keywords: ['check', 'updates'] },
                    { icon: 'pi-cog', label: 'Open Settings', category: 'Command', color: 'bg-[linear-gradient(rgb(96,165,250),rgb(59,130,246))]', value: 'open settings' },
                    { icon: 'pi-search', label: 'Search Files', category: 'Command', color: 'bg-[linear-gradient(rgb(167,139,250),rgb(139,92,246))]', value: 'search files' },
                    { icon: 'pi-terminal', label: 'Open Terminal', category: 'View', color: 'bg-[linear-gradient(rgb(148,163,184),rgb(100,116,139))]', value: 'open terminal' },
                    { icon: 'pi-history', label: 'View History', category: 'View', color: 'bg-[linear-gradient(rgb(192,132,252),rgb(168,85,247))]', value: 'view history', keywords: ['history', 'recent'] },
                    { icon: 'pi-comments', label: 'Open Chat', category: 'Communication', color: 'bg-[linear-gradient(rgb(34,211,238),rgb(6,182,212))]', value: 'open chat' }
                ]
            },
            {
                group: 'Files',
                items: [
                    { icon: 'pi-file', label: 'New File', category: 'File', color: 'bg-[linear-gradient(rgb(52,211,153),rgb(16,185,129))]', value: 'new file' },
                    { icon: 'pi-folder', label: 'New Folder', category: 'File', color: 'bg-[linear-gradient(rgb(251,191,36),rgb(245,158,11))]', value: 'new folder' },
                    { icon: 'pi-save', label: 'Save All', category: 'File', color: 'bg-[linear-gradient(rgb(34,197,94),rgb(22,163,74))]', value: 'save-all' },
                    { icon: 'pi-palette', label: 'Change Theme', category: 'Appearance', color: 'bg-[linear-gradient(rgb(251,146,60),rgb(249,115,22))]', value: 'change theme' },
                    { icon: 'pi-play', label: 'Run Task', category: 'Command', color: 'bg-[linear-gradient(rgb(34,197,94),rgb(21,128,61))]', value: 'run-task' },
                    { icon: 'pi-stop', label: 'Stop Task', category: 'Command', color: 'bg-[linear-gradient(rgb(239,68,68),rgb(220,38,38))]', value: 'stop task' },
                    { icon: 'pi-file-export', label: 'Export Project', category: 'File', color: 'bg-[linear-gradient(rgb(147,51,234),rgb(126,34,206))]', value: 'export project' },
                    { icon: 'pi-file-import', label: 'Import Project', category: 'File', color: 'bg-[linear-gradient(rgb(99,102,241),rgb(79,70,229))]', value: 'import project' },
                    { icon: 'pi-trash', label: 'Delete File', category: 'File', color: 'bg-[linear-gradient(rgb(239,68,68),rgb(185,28,28))]', value: 'delete file' },
                    { icon: 'pi-copy', label: 'Duplicate File', category: 'File', color: 'bg-[linear-gradient(rgb(156,163,175),rgb(107,114,128))]', value: 'duplicate file' }
                ]
            },
            {
                group: 'Source',
                items: [
                    { icon: 'pi-git', label: 'Git: Commit', category: 'Source Control', color: 'bg-[linear-gradient(rgb(249,115,22),rgb(234,88,12))]', value: 'git commit' },
                    { icon: 'pi-upload', label: 'Git: Push', category: 'Source Control', color: 'bg-[linear-gradient(rgb(14,165,233),rgb(2,132,199))]', value: 'git push' },
                    { icon: 'pi-download', label: 'Git: Pull', category: 'Source Control', color: 'bg-[linear-gradient(rgb(59,130,246),rgb(37,99,235))]', value: 'git pull' },
                    { icon: 'pi-users', label: 'Switch Account', category: 'Account', color: 'bg-[linear-gradient(rgb(236,72,153),rgb(219,39,119))]', value: 'switch account' },
                    { icon: 'pi-book', label: 'Open Documentation', category: 'Help', color: 'bg-[linear-gradient(rgb(147,197,253),rgb(96,165,250))]', value: 'open documentation' },
                    { icon: 'pi-sync', label: 'Git: Sync', category: 'Source Control', color: 'bg-[linear-gradient(rgb(74,222,128),rgb(34,197,94))]', value: 'git sync' },
                    { icon: 'pi-code-branch', label: 'Git: Create Branch', category: 'Source Control', color: 'bg-[linear-gradient(rgb(251,146,60),rgb(249,115,22))]', value: 'git create branch' },
                    { icon: 'pi-tag', label: 'Git: Create Tag', category: 'Source Control', color: 'bg-[linear-gradient(rgb(196,181,253),rgb(167,139,250))]', value: 'git create tag' }
                ]
            },
            {
                group: 'Editor',
                items: [
                    { icon: 'pi-align-left', label: 'Align Left', category: 'Editor', color: 'bg-[linear-gradient(rgb(147,197,253),rgb(59,130,246))]', value: 'align left' },
                    { icon: 'pi-align-center', label: 'Align Center', category: 'Editor', color: 'bg-[linear-gradient(rgb(147,197,253),rgb(59,130,246))]', value: 'align center' },
                    { icon: 'pi-align-right', label: 'Align Right', category: 'Editor', color: 'bg-[linear-gradient(rgb(147,197,253),rgb(59,130,246))]', value: 'align right' },
                    { icon: 'pi-bold', label: 'Toggle Bold', category: 'Editor', color: 'bg-[linear-gradient(rgb(30,41,59),rgb(15,23,42))]', value: 'toggle bold' },
                    { icon: 'pi-italic', label: 'Toggle Italic', category: 'Editor', color: 'bg-[linear-gradient(rgb(71,85,105),rgb(51,65,85))]', value: 'toggle italic' },
                    { icon: 'pi-link', label: 'Insert Link', category: 'Editor', color: 'bg-[linear-gradient(rgb(59,130,246),rgb(37,99,235))]', value: 'insert link' },
                    { icon: 'pi-image', label: 'Insert Image', category: 'Editor', color: 'bg-[linear-gradient(rgb(168,85,247),rgb(147,51,234))]', value: 'insert image' },
                    { icon: 'pi-list', label: 'Insert List', category: 'Editor', color: 'bg-[linear-gradient(rgb(34,197,94),rgb(22,163,74))]', value: 'insert list' }
                ]
            },
            {
                group: 'Navigation',
                items: [
                    { icon: 'pi-home', label: 'Go to Home', category: 'Navigation', color: 'bg-[linear-gradient(rgb(96,165,250),rgb(59,130,246))]', value: 'go to home' },
                    { icon: 'pi-arrow-left', label: 'Go Back', category: 'Navigation', color: 'bg-[linear-gradient(rgb(148,163,184),rgb(100,116,139))]', value: 'go back' },
                    { icon: 'pi-arrow-right', label: 'Go Forward', category: 'Navigation', color: 'bg-[linear-gradient(rgb(148,163,184),rgb(100,116,139))]', value: 'go forward' },
                    { icon: 'pi-compass', label: 'Open Explorer', category: 'Navigation', color: 'bg-[linear-gradient(rgb(251,191,36),rgb(245,158,11))]', value: 'open explorer' },
                    { icon: 'pi-bookmark', label: 'View Bookmarks', category: 'Navigation', color: 'bg-[linear-gradient(rgb(249,115,22),rgb(234,88,12))]', value: 'view bookmarks' },
                    { icon: 'pi-map', label: 'Open Minimap', category: 'Navigation', color: 'bg-[linear-gradient(rgb(52,211,153),rgb(16,185,129))]', value: 'open minimap' }
                ]
            },
            {
                group: 'View',
                items: [
                    { icon: 'pi-eye', label: 'Toggle Preview', category: 'View', color: 'bg-[linear-gradient(rgb(147,51,234),rgb(126,34,206))]', value: 'toggle preview' },
                    { icon: 'pi-window-maximize', label: 'Maximize Window', category: 'View', color: 'bg-[linear-gradient(rgb(100,116,139),rgb(71,85,105))]', value: 'maximize window' },
                    { icon: 'pi-window-minimize', label: 'Minimize Window', category: 'View', color: 'bg-[linear-gradient(rgb(148,163,184),rgb(100,116,139))]', value: 'minimize window' },
                    { icon: 'pi-th-large', label: 'Grid View', category: 'View', color: 'bg-[linear-gradient(rgb(34,197,94),rgb(22,163,74))]', value: 'grid view' },
                    { icon: 'pi-bars', label: 'List View', category: 'View', color: 'bg-[linear-gradient(rgb(59,130,246),rgb(37,99,235))]', value: 'list view' },
                    { icon: 'pi-sun', label: 'Light Mode', category: 'View', color: 'bg-[linear-gradient(rgb(253,224,71),rgb(250,204,21))]', value: 'light mode' },
                    { icon: 'pi-moon', label: 'Dark Mode', category: 'View', color: 'bg-[linear-gradient(rgb(30,41,59),rgb(15,23,42))]', value: 'dark mode' }
                ]
            },
            {
                group: 'Tools',
                items: [
                    { icon: 'pi-calculator', label: 'Open Calculator', category: 'Tools', color: 'bg-[linear-gradient(rgb(148,163,184),rgb(100,116,139))]', value: 'open calculator' },
                    { icon: 'pi-calendar', label: 'Open Calendar', category: 'Tools', color: 'bg-[linear-gradient(rgb(96,165,250),rgb(59,130,246))]', value: 'open calendar' },
                    { icon: 'pi-clock', label: 'Open Timer', category: 'Tools', color: 'bg-[linear-gradient(rgb(251,146,60),rgb(249,115,22))]', value: 'open timer' },
                    { icon: 'pi-chart-bar', label: 'View Analytics', category: 'Tools', color: 'bg-[linear-gradient(rgb(34,197,94),rgb(22,163,74))]', value: 'view analytics' },
                    { icon: 'pi-chart-line', label: 'View Trends', category: 'Tools', color: 'bg-[linear-gradient(rgb(59,130,246),rgb(37,99,235))]', value: 'view trends' },
                    { icon: 'pi-database', label: 'Open Database', category: 'Tools', color: 'bg-[linear-gradient(rgb(168,85,247),rgb(147,51,234))]', value: 'open database' }
                ]
            }
        ];
    }
}
```

## Filter

A custom filter function can be provided with the filter property. The function receives the label, search term, and optional keywords, and should return a score (0 means no match).

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
    template: `
        <p-commandmenu
            [options]="commands"
            optionLabel="label"
            optionValue="value"
            [group]="true"
            optionGroupLabel="group"
            optionGroupChildren="items"
            optionKeywords="keywords"
            [filter]="fuzzyFilter"
            placeholder="Search for commands..."
            class="mx-auto"
        >
            <ng-template #empty>No results found.</ng-template>
            <ng-template #footer>
                <div class="flex items-center justify-end gap-3">
                    <span class="flex items-center gap-1 text-surface-500 text-xs">
                        <kbd class="bg-surface-100 dark:bg-surface-800 size-5 inline-flex items-center justify-center rounded border border-surface-200 dark:border-surface-700">
                            <svg data-p-icon="arrow-up"></svg>
                        </kbd>
                        <kbd class="bg-surface-100 dark:bg-surface-800 size-5 inline-flex items-center justify-center rounded border border-surface-200 dark:border-surface-700">
                            <svg data-p-icon="arrow-down"></svg>
                        </kbd>
                        Navigate
                    </span>
                    <span class="flex items-center gap-1 text-surface-500 text-xs">
                        <kbd class="bg-surface-100 dark:bg-surface-800 size-5 inline-flex items-center justify-center rounded border border-surface-200 dark:border-surface-700"> &#x21B5; </kbd>
                        Select
                    </span>
                </div>
            </ng-template>
        </p-commandmenu>
    `,
    standalone: true,
    imports: []
})
export class CommandmenuFilterDemo implements OnInit {
    commands!: any[];

    ngOnInit() {
        this.commands = [
            {
                group: 'Recents',
                items: [
                    { label: 'Check For Updates', value: 'check for updates', keywords: ['check', 'updates'] },
                    { label: 'Open Settings', value: 'open settings' },
                    { label: 'Search Files', value: 'search files' },
                    { label: 'Open Terminal', value: 'open terminal' },
                    { label: 'View History', value: 'view history', keywords: ['history', 'recent'] },
                    { label: 'Open Chat', value: 'open chat' }
                ]
            },
            {
                group: 'Files',
                items: [
                    { label: 'New File', value: 'new file' },
                    { label: 'New Folder', value: 'new folder' },
                    { label: 'Save All', value: 'save-all' },
                    { label: 'Change Theme', value: 'change theme' },
                    { label: 'Run Task', value: 'run-task' },
                    { label: 'Stop Task', value: 'stop task' },
                    { label: 'Export Project', value: 'export project' },
                    { label: 'Import Project', value: 'import project' },
                    { label: 'Delete File', value: 'delete file' },
                    { label: 'Duplicate File', value: 'duplicate file' }
                ]
            },
            {
                group: 'Source',
                items: [
                    { label: 'Git: Commit', value: 'git commit' },
                    { label: 'Git: Push', value: 'git push' },
                    { label: 'Git: Pull', value: 'git pull' },
                    { label: 'Switch Account', value: 'switch account' },
                    { label: 'Open Documentation', value: 'open documentation' },
                    { label: 'Git: Sync', value: 'git sync' },
                    { label: 'Git: Create Branch', value: 'git create branch' },
                    { label: 'Git: Create Tag', value: 'git create tag' }
                ]
            },
            {
                group: 'Editor',
                items: [
                    { label: 'Align Left', value: 'align left' },
                    { label: 'Align Center', value: 'align center' },
                    { label: 'Align Right', value: 'align right' },
                    { label: 'Toggle Bold', value: 'toggle bold' },
                    { label: 'Toggle Italic', value: 'toggle italic' },
                    { label: 'Insert Link', value: 'insert link' },
                    { label: 'Insert Image', value: 'insert image' },
                    { label: 'Insert List', value: 'insert list' }
                ]
            },
            {
                group: 'Navigation',
                items: [
                    { label: 'Go to Home', value: 'go to home' },
                    { label: 'Go Back', value: 'go back' },
                    { label: 'Go Forward', value: 'go forward' },
                    { label: 'Open Explorer', value: 'open explorer' },
                    { label: 'View Bookmarks', value: 'view bookmarks' },
                    { label: 'Open Minimap', value: 'open minimap' }
                ]
            },
            {
                group: 'View',
                items: [
                    { label: 'Toggle Preview', value: 'toggle preview' },
                    { label: 'Maximize Window', value: 'maximize window' },
                    { label: 'Minimize Window', value: 'minimize window' },
                    { label: 'Grid View', value: 'grid view' },
                    { label: 'List View', value: 'list view' },
                    { label: 'Light Mode', value: 'light mode' },
                    { label: 'Dark Mode', value: 'dark mode' }
                ]
            },
            {
                group: 'Tools',
                items: [
                    { label: 'Open Calculator', value: 'open calculator' },
                    { label: 'Open Calendar', value: 'open calendar' },
                    { label: 'Open Timer', value: 'open timer' },
                    { label: 'View Analytics', value: 'view analytics' },
                    { label: 'View Trends', value: 'view trends' },
                    { label: 'Open Database', value: 'open database' }
                ]
            }
        ];
    }

    fuzzyFilter(value: string, search: string): number {
        if (!search) return 1;
        
        value = value.toLowerCase();
        search = search.toLowerCase();
        
        let tIndex = 0;
        let sIndex = 0;
        let score = 0;
        
        while (tIndex < value.length && sIndex < search.length) {
            if (value[tIndex] === search[sIndex]) {
                score += 1;
                sIndex++;
            }
        
            tIndex++;
        }
        
        return sIndex === search.length ? score / value.length : 0;
    }
}
```

## With Dialog

CommandMenu can be used inside a Dialog to create a command palette experience. Press Ctrl+K (or Cmd+K on Mac) to open.

```typescript
import { Component, OnInit } from '@angular/core';
import { Dialog, DialogModule } from 'primeng/dialog';

@Component({
    template: `
        <div class="flex items-center justify-center py-8">
            <span class="cursor-pointer" (click)="visible = true">
                Press
                <kbd class="bg-surface-100 dark:bg-surface-950 px-2 py-1 rounded-md border border-surface-200 dark:border-surface-700/50 text-sm ml-2"> CTRL/⌘ + K </kbd>
            </span>
        </div>
        <p-dialog [(visible)]="visible" [modal]="true" [showHeader]="false" styleClass="overflow-hidden max-w-md w-full" [dismissableMask]="true" [contentStyle]="{ padding: '0' }" (onShow)="onDialogShow()">
            <p-commandmenu
                [options]="commands"
                optionLabel="label"
                optionValue="value"
                [group]="true"
                optionGroupLabel="group"
                optionGroupChildren="items"
                optionKeywords="keywords"
                [(search)]="searchValue"
                placeholder="Search for commands..."
                class="w-full rounded-none border-none"
            >
                <ng-template #empty let-search>
                    No results found for <span class="text-surface-900 dark:text-surface-0">"{{ search }}"</span>
                </ng-template>
                <ng-template #footer>
                    <div class="flex items-center justify-end gap-3">
                        <span class="flex items-center gap-1 text-surface-500 text-xs">
                            <kbd class="bg-surface-100 dark:bg-surface-800 size-5 inline-flex items-center justify-center rounded border border-surface-200 dark:border-surface-700">
                                <svg data-p-icon="arrow-up"></svg>
                            </kbd>
                            <kbd class="bg-surface-100 dark:bg-surface-800 size-5 inline-flex items-center justify-center rounded border border-surface-200 dark:border-surface-700">
                                <svg data-p-icon="arrow-down"></svg>
                            </kbd>
                            Navigate
                        </span>
                        <span class="flex items-center gap-1 text-surface-500 text-xs">
                            <kbd class="bg-surface-100 dark:bg-surface-800 size-5 inline-flex items-center justify-center rounded border border-surface-200 dark:border-surface-700"> &#x21B5; </kbd>
                            Select
                        </span>
                    </div>
                </ng-template>
            </p-commandmenu>
        </p-dialog>
    `,
    standalone: true,
    imports: [DialogModule]
})
export class CommandmenuWithDialogDemo implements OnInit {
    visible: boolean = false;
    searchValue: string = '';
    commands!: any[];

    ngOnInit() {
        this.commands = [
            {
                group: 'Recents',
                items: [
                    { label: 'Check For Updates', value: 'check for updates', keywords: ['check', 'updates'] },
                    { label: 'Open Settings', value: 'open settings' },
                    { label: 'Search Files', value: 'search files' },
                    { label: 'Open Terminal', value: 'open terminal' },
                    { label: 'View History', value: 'view history', keywords: ['history', 'recent'] },
                    { label: 'Open Chat', value: 'open chat' }
                ]
            },
            {
                group: 'Files',
                items: [
                    { label: 'New File', value: 'new file' },
                    { label: 'New Folder', value: 'new folder' },
                    { label: 'Save All', value: 'save-all' },
                    { label: 'Change Theme', value: 'change theme' },
                    { label: 'Run Task', value: 'run-task' },
                    { label: 'Stop Task', value: 'stop task' },
                    { label: 'Export Project', value: 'export project' },
                    { label: 'Import Project', value: 'import project' },
                    { label: 'Delete File', value: 'delete file' },
                    { label: 'Duplicate File', value: 'duplicate file' }
                ]
            },
            {
                group: 'Source',
                items: [
                    { label: 'Git: Commit', value: 'git commit' },
                    { label: 'Git: Push', value: 'git push' },
                    { label: 'Git: Pull', value: 'git pull' },
                    { label: 'Switch Account', value: 'switch account' },
                    { label: 'Open Documentation', value: 'open documentation' },
                    { label: 'Git: Sync', value: 'git sync' },
                    { label: 'Git: Create Branch', value: 'git create branch' },
                    { label: 'Git: Create Tag', value: 'git create tag' }
                ]
            },
            {
                group: 'Editor',
                items: [
                    { label: 'Align Left', value: 'align left' },
                    { label: 'Align Center', value: 'align center' },
                    { label: 'Align Right', value: 'align right' },
                    { label: 'Toggle Bold', value: 'toggle bold' },
                    { label: 'Toggle Italic', value: 'toggle italic' },
                    { label: 'Insert Link', value: 'insert link' },
                    { label: 'Insert Image', value: 'insert image' },
                    { label: 'Insert List', value: 'insert list' }
                ]
            },
            {
                group: 'Navigation',
                items: [
                    { label: 'Go to Home', value: 'go to home' },
                    { label: 'Go Back', value: 'go back' },
                    { label: 'Go Forward', value: 'go forward' },
                    { label: 'Open Explorer', value: 'open explorer' },
                    { label: 'View Bookmarks', value: 'view bookmarks' },
                    { label: 'Open Minimap', value: 'open minimap' }
                ]
            },
            {
                group: 'View',
                items: [
                    { label: 'Toggle Preview', value: 'toggle preview' },
                    { label: 'Maximize Window', value: 'maximize window' },
                    { label: 'Minimize Window', value: 'minimize window' },
                    { label: 'Grid View', value: 'grid view' },
                    { label: 'List View', value: 'list view' },
                    { label: 'Light Mode', value: 'light mode' },
                    { label: 'Dark Mode', value: 'dark mode' }
                ]
            },
            {
                group: 'Tools',
                items: [
                    { label: 'Open Calculator', value: 'open calculator' },
                    { label: 'Open Calendar', value: 'open calendar' },
                    { label: 'Open Timer', value: 'open timer' },
                    { label: 'View Analytics', value: 'view analytics' },
                    { label: 'View Trends', value: 'view trends' },
                    { label: 'Open Database', value: 'open database' }
                ]
            }
        ];
    }

    handleKeyboardEvent(event: KeyboardEvent) {
        if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
            event.preventDefault();
            event.stopPropagation();
            this.visible = !this.visible;
        }
    }

    onDialogShow() {
        this.commandmenu.focusInput();
    }
}
```

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| header | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the header's DOM element. |
| input | PassThroughOption<HTMLInputElement, I> | Used to pass attributes to the input's DOM element. |
| pcListbox | any | Used to pass attributes to the Listbox component. |
| empty | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the empty message's DOM element. |
| footer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the footer's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-commandmenu | Class name of the root element |
| p-commandmenu-header | Class name of the header element |
| p-commandmenu-input | Class name of the input element |
| p-commandmenu-empty | Class name of the empty message element |
| p-commandmenu-footer | Class name of the footer element |

