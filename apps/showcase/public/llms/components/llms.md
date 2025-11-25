# LLMs.txt - PrimeNG

LLM-optimized documentation endpoints for PrimeNG components.

## Introduction

PrimeNG provides LLM-optimized documentation endpoints that make it easy for AI assistants like ChatGPT, Claude, and other large language models to understand and help you build with PrimeNG components. These machine-readable documentation files contain comprehensive information about component APIs, props, events, templates, theming, and code examples in a format that AI systems can easily parse and use to provide accurate assistance.

## llmsfulltxtdoc

The /llms/components.md endpoint provides the complete documentation for all PrimeNG components in a single markdown file. This comprehensive file includes all component descriptions, code examples, API documentation (props, events, templates, methods), Pass Through options, CSS classes, and design tokens.

## llmstxtdoc

The /llms/llms.txt endpoint provides a curated index of all PrimeNG components with brief descriptions and links to detailed documentation. This file follows the llms.txt standard, making it easy for AI assistants to discover available components.

## markdownextensiondoc

Individual component documentation is available at /llms/components/&#123;componentName&#125;.md . This allows AI assistants to fetch only the relevant documentation for a specific component. Each markdown file contains: Component description and import instructions Usage examples with code snippets Complete API documentation (Props, Events, Templates, Methods) Pass Through options for DOM customization Theming information (CSS classes and Design Tokens)

## usageexamplesdoc

Here are some examples of how to use the LLM documentation endpoints with popular AI assistants: ChatGPT You can ask ChatGPT to read the documentation directly: Claude Similarly, you can use Claude with the documentation: MCP Servers For programmatic access, you can use the JSON endpoint with MCP (Model Context Protocol) servers: Copy for AI Button Each component documentation page includes a "Copy for AI" button that allows you to quickly copy the component's markdown documentation or open it directly in ChatGPT or Claude.

