# @primeng/mcp

Model Context Protocol (MCP) server for PrimeNG component library. Provides AI assistants with comprehensive access to PrimeNG component documentation, props, events, templates, theming, and code examples.

## Installation

```bash
npm install @primeng/mcp
```

## Usage

### With npx

```bash
npx @primeng/mcp
```

### Claude Desktop Configuration

Add to your Claude Desktop config (`~/.claude/config.json`):

```json
{
  "mcpServers": {
    "primeng": {
      "command": "npx",
      "args": ["@primeng/mcp"]
    }
  }
}
```

## Available Tools

### Component Tools
- `list_components` - List all available PrimeNG components with their categories
- `get_component` - Get detailed information about a specific component
- `search_components` - Search components by name or description
- `get_component_props` - Get all props/properties for a component
- `get_component_events` - Get all events for a component
- `get_component_methods` - Get all methods for a component
- `get_component_slots` - Get all templates/slots for a component
- `get_usage_example` - Get code examples for a component
- `get_component_pt` - Get Pass Through (PT) options for DOM customization
- `get_component_tokens` - Get design tokens (CSS variables)
- `get_component_styles` - Get CSS class names
- `find_by_prop` - Find components that have a specific prop
- `find_by_event` - Find components that emit a specific event
- `get_component_url` - Get the official documentation URL
- `compare_components` - Compare two components side by side
- `get_categories` - Get all component categories

### Guide Tools
- `list_guides` - List all available guides and documentation pages
- `get_guide` - Get a specific guide by name
- `get_configuration` - Get PrimeNG configuration options
- `get_tailwind_guide` - Get Tailwind CSS integration guide
- `get_icons_guide` - Get icons usage guide
- `get_accessibility_guide` - Get accessibility guide
- `get_installation` - Get installation instructions
- `get_theming_info` - Get theming information
- `get_theming_guide` - Get styled/unstyled mode guide
- `get_passthrough_guide` - Get Pass Through (PT) guide

### Migration Tools
- `get_migration_guide` - Get migration guide for specific versions
- `migrate_v20_to_v21` - v20 to v21 migration guide
- `migrate_v19_to_v20` - v19 to v20 migration guide
- `migrate_v18_to_v19` - v18 to v19 migration guide

### Examples
- `list_examples` - List all available code examples
- `get_example` - Get a specific code example by component and section

### Advanced Tools
- `get_component_sections` - Get all available sections/features for a component
- `get_component_import` - Get the correct import statement
- `find_components_with_feature` - Find components supporting a specific feature
- `validate_props` - Validate props for a component
- `generate_component_template` - Generate a basic component template
- `export_component_docs` - Export documentation in markdown format
- `search_all` - Search across all components and props
- `suggest_component` - Suggest components based on use case

### Utility Tools
- `get_form_components` - Get all form input components
- `get_data_components` - Get all data display components
- `get_overlay_components` - Get all overlay/popup components
- `get_related_components` - Find related components
- `get_accessibility_info` - Get accessibility info for a component
- `get_performance_tips` - Get performance optimization tips
- `get_version_info` - Get version and compatibility info

## Local Development & Testing

### Building the MCP Server

```bash
cd packages/mcp

# Install dependencies
npm install

# Build the project
npm run build

# Watch mode for development
npm run dev
```

### Testing with Claude Code

Using the JSON command (recommended for reliability):

```bash
# Add to user config (available in all projects)
claude mcp add-json primeng '{"type":"stdio","command":"node","args":["/path/to/primeng/packages/mcp/dist/index.js"]}' -s user

# Or add to current project only
claude mcp add-json primeng '{"type":"stdio","command":"node","args":["/path/to/primeng/packages/mcp/dist/index.js"]}'
```

Or manually add to `~/.claude.json` (user-level) or `.claude/settings.json` (project-level):

```json
{
  "mcpServers": {
    "primeng": {
      "type": "stdio",
      "command": "node",
      "args": ["/path/to/primeng/packages/mcp/dist/index.js"]
    }
  }
}
```

Useful commands:
```bash
claude mcp list          # List all MCP servers
claude mcp get primeng   # Get server details
claude mcp remove primeng   # Remove the server
```

### Testing with Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "primeng": {
      "command": "node",
      "args": ["/path/to/primeng/packages/mcp/dist/index.js"]
    }
  }
}
```

### Testing with Cursor

Add to your Cursor MCP config (`.cursor/mcp.json` in your project or globally):

```json
{
  "mcpServers": {
    "primeng": {
      "command": "node",
      "args": ["/path/to/primeng/packages/mcp/dist/index.js"]
    }
  }
}
```

### Development Workflow

1. Make changes to `src/index.ts`
2. Run `npm run build` (or use `npm run dev` for watch mode)
3. Restart Claude Code / Claude Desktop / Cursor to reload the MCP server
4. Test the tools by asking the AI about PrimeNG components

### Debugging

To test the MCP server directly:

```bash
# Run the server and see stdio output
node dist/index.js
```

The server uses stdio transport, so it will wait for JSON-RPC messages on stdin.

## License

MIT
