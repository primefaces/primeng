import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, inject, input, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-doccopymarkdown',
    standalone: true,
    imports: [CommonModule, SplitButtonModule, ToastModule],
    providers: [MessageService],
    template: `
        <p-toast position="top-right" />
        <p-splitbutton label="Copy Markdown" icon="pi pi-copy" severity="secondary" outlined [model]="menuItems" (onClick)="copyMarkdown()" appendTo="body" [menuStyleClass]="'min-w-56'" />
    `
})
export class AppDocCopyMarkdown implements OnInit {
    componentName = input<string>('');
    docType = input<'component' | 'page'>('component');

    private router = inject(Router);
    private messageService = inject(MessageService);
    private document = inject(DOCUMENT);
    private platformId = inject(PLATFORM_ID);

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

    get routePath(): string {
        // Get the full route path without hash
        const url = this.router.url.split('#')[0];
        // Remove leading slash
        return url.startsWith('/') ? url.slice(1) : url;
    }

    get markdownLink(): string {
        if (this.docType() === 'page') {
            return `${this.baseUrl}/llms/pages/${this.currentComponentName.toLowerCase()}.md`;
        }
        return `${this.baseUrl}/llms/components/${this.currentComponentName.toLowerCase()}.md`;
    }

    get githubLink(): string {
        if (this.docType() === 'page') {
            // For pages, use the full route path for nested pages like theming/styled
            const docPath = this.routePath || this.currentComponentName;
            return `https://github.com/primefaces/primeng/tree/master/apps/showcase/doc/${docPath}/`;
        }
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
            this.messageService.add({
                severity: 'success',
                summary: 'Copied',
                detail: 'Markdown content copied to clipboard',
                life: 2000
            });
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
