import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, inject, input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Menu, MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-doccopymarkdown',
    standalone: true,
    imports: [CommonModule, ButtonModule, MenuModule, ToastModule],
    providers: [MessageService],
    template: `
        <p-toast position="top-right" />
        <div class="inline-flex">
            <p-button [label]="copyLabel" icon="pi pi-copy" severity="secondary" size="small" (onClick)="copyMarkdown()" styleClass="rounded-r-none" />
            <p-button icon="pi pi-chevron-down" severity="secondary" size="small" (onClick)="menu.toggle($event)" styleClass="rounded-l-none" />
            <p-menu #menu [model]="menuItems" [popup]="true" appendTo="body" [style]="{ 'min-width': '14rem' }" />
        </div>
    `,
    styles: [
        `
            :host ::ng-deep .rounded-r-none {
                border-top-right-radius: 0 !important;
                border-bottom-right-radius: 0 !important;
                border-right: 0 !important;
            }
            :host ::ng-deep .rounded-l-none {
                border-top-left-radius: 0 !important;
                border-bottom-left-radius: 0 !important;
            }
        `
    ]
})
export class AppDocCopyMarkdown implements OnInit {
    @ViewChild('menu') menu!: Menu;

    componentName = input<string>('');

    private router = inject(Router);
    private messageService = inject(MessageService);
    private document = inject(DOCUMENT);
    private platformId = inject(PLATFORM_ID);

    copyLabel = 'Copy Markdown';
    markdownContent = '';

    menuItems: MenuItem[] = [];

    get baseUrl(): string {
        if (isPlatformBrowser(this.platformId)) {
            return this.document.location.origin;
        }
        return 'https://primeng.org';
    }

    get currentComponentName(): string {
        if (this.componentName()) {
            return this.componentName();
        }
        const segments = this.router.url.split('/').filter(Boolean);
        const lastSegment = segments[segments.length - 1]?.split('#')[0];
        return lastSegment || '';
    }

    get markdownLink(): string {
        return `${this.baseUrl}/llms/components/${this.currentComponentName.toLowerCase()}.md`;
    }

    get githubLink(): string {
        if (this.currentComponentName) {
            return `https://github.com/primefaces/primeng/tree/master/apps/showcase/doc/${this.currentComponentName}/`;
        }
        return 'https://github.com/primefaces/primeng/tree/master/apps/showcase/';
    }

    get chatGPTLink(): string {
        const message = `Read ${this.markdownLink}, I want to ask questions about it.`;
        return `https://chatgpt.com/?hints=search&q=${encodeURIComponent(message)}`;
    }

    get claudeLink(): string {
        const message = `Read ${this.markdownLink}, I want to ask questions about it.`;
        return `https://claude.ai/new?q=${encodeURIComponent(message)}`;
    }

    ngOnInit() {
        this.menuItems = [
            {
                label: 'Copy Markdown Link',
                icon: 'pi pi-link',
                command: () => this.copyMarkdownLink()
            },
            {
                label: 'Open in GitHub',
                icon: 'pi pi-github',
                command: () => this.openGithub()
            },
            {
                label: 'Open in ChatGPT',
                icon: 'pi pi-comments',
                command: () => this.openChatGPT()
            },
            {
                label: 'Open in Claude',
                icon: 'pi pi-comment',
                command: () => this.openClaude()
            }
        ];

        if (isPlatformBrowser(this.platformId)) {
            setTimeout(() => this.loadMarkdownContent(), 500);
        }
    }

    async loadMarkdownContent() {
        if (!isPlatformBrowser(this.platformId)) return;

        try {
            const response = await fetch(this.markdownLink);
            if (response.ok) {
                this.markdownContent = await response.text();
            }
        } catch (error) {
            console.error('Failed to load markdown content:', error);
        }
    }

    async copyMarkdown() {
        if (!isPlatformBrowser(this.platformId)) return;

        if (!this.markdownContent) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Loading',
                detail: 'Markdown content is still loading. Please try again.',
                life: 2000
            });
            return;
        }

        try {
            await navigator.clipboard.writeText(this.markdownContent);
            this.copyLabel = 'Copied!';
            this.messageService.add({
                severity: 'success',
                summary: 'Copied',
                detail: 'Markdown content copied to clipboard',
                life: 2000
            });

            setTimeout(() => {
                this.copyLabel = 'Copy Markdown';
            }, 2000);
        } catch (error) {
            console.error('Failed to copy markdown:', error);
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to copy markdown content',
                life: 3000
            });
        }
    }

    async copyMarkdownLink() {
        if (!isPlatformBrowser(this.platformId)) return;

        try {
            await navigator.clipboard.writeText(this.markdownLink);
            this.messageService.add({
                severity: 'success',
                summary: 'Link Copied',
                detail: 'Markdown link copied to clipboard',
                life: 2000
            });
        } catch (error) {
            console.error('Failed to copy link:', error);
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to copy link',
                life: 3000
            });
        }
    }

    openGithub() {
        if (isPlatformBrowser(this.platformId)) {
            window.open(this.githubLink, '_blank', 'noopener,noreferrer');
        }
    }

    openChatGPT() {
        if (isPlatformBrowser(this.platformId)) {
            window.open(this.chatGPTLink, '_blank', 'noopener,noreferrer');
        }
    }

    openClaude() {
        if (isPlatformBrowser(this.platformId)) {
            window.open(this.claudeLink, '_blank', 'noopener,noreferrer');
        }
    }
}
