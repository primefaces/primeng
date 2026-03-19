import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommandMenu, CommandMenuModule } from 'primeng/commandmenu';
import { DialogModule } from 'primeng/dialog';

@Component({
    selector: 'with-dialog-doc',
    standalone: true,
    imports: [FormsModule, CommandMenuModule, DialogModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>CommandMenu can be used inside a Dialog to create a command palette experience. Press <i>Ctrl+K</i> (or <i>Cmd+K</i> on Mac) to open.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
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
                                    <i class="pi pi-arrow-up text-[0.5rem]"></i>
                                </kbd>
                                <kbd class="bg-surface-100 dark:bg-surface-800 size-5 inline-flex items-center justify-center rounded border border-surface-200 dark:border-surface-700">
                                    <i class="pi pi-arrow-down text-[0.5rem]"></i>
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
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class WithDialogDoc implements OnInit {
    @ViewChild(CommandMenu) commandmenu!: CommandMenu;

    visible = false;

    searchValue = '';

    commands!: any[];

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
            event.preventDefault();
            this.visible = !this.visible;
        }
    }

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

    onDialogShow() {
        this.commandmenu.focusInput();
    }
}
