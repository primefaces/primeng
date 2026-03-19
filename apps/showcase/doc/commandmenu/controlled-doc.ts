import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommandMenuModule } from 'primeng/commandmenu';
import { ArrowDown } from '@primeicons/angular/arrow-down';
import { ArrowUp } from '@primeicons/angular/arrow-up';

@Component({
    selector: 'controlled-doc',
    standalone: true,
    imports: [FormsModule, CommandMenuModule, AppCode, AppDemoWrapper, AppDocSectionText, ArrowUp, ArrowDown],
    template: `
        <app-docsectiontext>
            <p>The search value can be controlled with two-way binding using <i>[(search)]</i>. An <i>empty</i> template customizes the message when no results are found.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
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
                (onItemSelect)="onSelect($event)"
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
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class ControlledDoc implements OnInit {
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

    onSelect(event: any) {
        console.log('Selected:', event.value);
    }
}
