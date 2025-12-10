import { runPrimeMcpServer, ComponentsData } from "@primemcp/core";
import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Angular-specific migration data
const migrationGuides = {
  v18_to_v19: {
    version: "v19",
    from: "v18",
    breaking: [
      "PrimeNG v19 requires Angular 17+",
      "New theming architecture with design tokens",
      "Component API changes for better tree-shaking",
    ],
    deprecations: [
      "Legacy theming system deprecated in favor of design tokens",
      "Some component-specific CSS classes renamed for consistency",
    ],
    whatsnew: [
      "New design token system for theming",
      "Improved accessibility across all components",
      "Better Angular 17+ integration with signals support",
    ],
  },
  v19_to_v20: {
    version: "v20",
    from: "v19",
    breaking: [
      "PrimeNG v20 requires Angular 18+",
      "Updated Pass Through (PT) API",
      "Some deprecated APIs removed",
    ],
    deprecations: [
      "Some legacy component APIs deprecated",
      "Old theming presets being phased out",
    ],
    whatsnew: [
      "Full Angular 18 compatibility",
      "Enhanced signal support",
      "New components and features",
    ],
  },
  v20_to_v21: {
    version: "v21",
    from: "v20",
    breaking: [
      "PrimeNG v21 requires Angular 19+",
      "Standalone components are now the default",
      "Updated module structure",
    ],
    deprecations: [
      "NgModule-based imports deprecated in favor of standalone",
    ],
    whatsnew: [
      "Full Angular 19 compatibility",
      "Standalone components by default",
      "Improved performance with zoneless support",
      "New animation system",
    ],
  },
};

// Helper to format migration content
function formatMigrationContent(
  guide: (typeof migrationGuides)[keyof typeof migrationGuides],
  section?: string
): string {
  let content = `# Migration Guide: ${guide.from} to ${guide.version}\n\n`;

  if (!section || section === "breaking") {
    content += `## Breaking Changes\n\n`;
    guide.breaking.forEach((item) => {
      content += `- ${item}\n`;
    });
    content += "\n";
  }

  if (!section || section === "deprecations") {
    content += `## Deprecations\n\n`;
    guide.deprecations.forEach((item) => {
      content += `- ${item}\n`;
    });
    content += "\n";
  }

  if (!section || section === "whatsnew") {
    content += `## What's New\n\n`;
    guide.whatsnew.forEach((item) => {
      content += `- ${item}\n`;
    });
    content += "\n";
  }

  content += `For detailed migration guide, visit: https://primeng.org/installation`;
  return content;
}

// Run PrimeNG MCP server with core + Angular-specific tools
runPrimeMcpServer({
  name: "@primeng/mcp",
  version: "21.3.1",
  baseUrl: "https://primeng.org",
  frameworkName: "PrimeNG",
  slotKey: "templates",
  codeLanguage: "typescript",
  compatibility: "Angular 17+",
  loadComponentsData: async () => {
    const dataPath = join(__dirname, "../data/components.json");
    const fileContent = await readFile(dataPath, "utf-8");
    return JSON.parse(fileContent);
  },
  customTools: [
    // Angular-specific: get_migration_guide
    {
      name: "get_migration_guide",
      description:
        "Get migration guide for upgrading PrimeNG versions (v19, v20, v21)",
      parameters: {
        version: {
          type: "string",
          description:
            "Target version: 'v19', 'v20', or 'v21'. If not specified, returns a summary of all migrations.",
        },
        section: {
          type: "string",
          description:
            "Optional section within the migration guide (e.g., 'breaking', 'deprecations', 'whatsnew')",
        },
      },
      handler: async (_data: ComponentsData, args: Record<string, unknown>) => {
        const version = args.version as string | undefined;
        const section = args.section as string | undefined;

        if (!version) {
          // Return summary of all migrations
          const summary = Object.entries(migrationGuides).map(([key, guide]) => ({
            migration: `${guide.from} → ${guide.version}`,
            breaking_count: guide.breaking.length,
            deprecations_count: guide.deprecations.length,
            new_features_count: guide.whatsnew.length,
          }));
          return {
            content: [
              {
                type: "text" as const,
                text: JSON.stringify(
                  { available_migrations: summary },
                  null,
                  2
                ),
              },
            ],
          };
        }

        const guideKey = `v${version.replace("v", "").split("_")[0]}_to_v${version.replace("v", "")}` as keyof typeof migrationGuides;
        const guide =
          migrationGuides[guideKey] ||
          migrationGuides[
            `v${parseInt(version.replace("v", "")) - 1}_to_${version}` as keyof typeof migrationGuides
          ];

        if (!guide) {
          return {
            content: [
              {
                type: "text" as const,
                text: `Migration guide for ${version} not found. Available: v19, v20, v21`,
              },
            ],
          };
        }

        return {
          content: [
            {
              type: "text" as const,
              text: formatMigrationContent(guide, section),
            },
          ],
        };
      },
    },
    // Angular-specific: migrate_v18_to_v19
    {
      name: "migrate_v18_to_v19",
      description:
        "Migration guide for upgrading PrimeNG from v18 to v19. Covers breaking changes, deprecations, and new features.",
      parameters: {
        section: {
          type: "string",
          description:
            "Optional section: 'breaking', 'deprecations', 'whatsnew'",
        },
      },
      handler: async (_data: ComponentsData, args: Record<string, unknown>) => {
        return {
          content: [
            {
              type: "text" as const,
              text: formatMigrationContent(
                migrationGuides.v18_to_v19,
                args.section as string | undefined
              ),
            },
          ],
        };
      },
    },
    // Angular-specific: migrate_v19_to_v20
    {
      name: "migrate_v19_to_v20",
      description:
        "Migration guide for upgrading PrimeNG from v19 to v20. Covers breaking changes, deprecations, and new features.",
      parameters: {
        section: {
          type: "string",
          description:
            "Optional section: 'breaking', 'deprecations', 'whatsnew'",
        },
      },
      handler: async (_data: ComponentsData, args: Record<string, unknown>) => {
        return {
          content: [
            {
              type: "text" as const,
              text: formatMigrationContent(
                migrationGuides.v19_to_v20,
                args.section as string | undefined
              ),
            },
          ],
        };
      },
    },
    // Angular-specific: migrate_v20_to_v21
    {
      name: "migrate_v20_to_v21",
      description:
        "Migration guide for upgrading PrimeNG from v20 to v21. Covers breaking changes, deprecations, and new features.",
      parameters: {
        section: {
          type: "string",
          description:
            "Optional section: 'breaking', 'deprecations', 'whatsnew'",
        },
      },
      handler: async (_data: ComponentsData, args: Record<string, unknown>) => {
        return {
          content: [
            {
              type: "text" as const,
              text: formatMigrationContent(
                migrationGuides.v20_to_v21,
                args.section as string | undefined
              ),
            },
          ],
        };
      },
    },
  ],
});
