#!/usr/bin/env node
/**
 * scripts/install.ts
 *
 * Injects SDD Kit entries into .vscode/settings.json without overwriting
 * existing content. Creates the file from scratch if it does not exist.
 *
 * Usage:
 *   npx tsx scripts/install.ts [sdd-kit-path]
 *
 * Arguments:
 *   sdd-kit-path  Path to the sdd-kit folder (default: ".github")
 */

import fs from "node:fs";
import path from "node:path";

const SETTINGS_PATH = path.resolve(".vscode", "settings.json");

function parseArgs(): string {
  const arg = process.argv[2];
  return arg ?? ".github";
}

function readSettings(): Record<string, unknown> {
  if (!fs.existsSync(SETTINGS_PATH)) {
    return {};
  }
  const raw = fs.readFileSync(SETTINGS_PATH, "utf-8").trim();
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    console.error(
      `Error: could not parse ${SETTINGS_PATH}. Fix the JSON syntax before running this script.`
    );
    process.exit(1);
  }
}

function mergeLocations(
  existing: Record<string, unknown> | undefined,
  newEntries: Record<string, boolean>
): Record<string, boolean> {
  const base =
    existing && typeof existing === "object"
      ? (existing as Record<string, boolean>)
      : {};
  return { ...base, ...newEntries };
}

function writeSettings(settings: Record<string, unknown>): void {
  const dir = path.dirname(SETTINGS_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 2) + "\n", "utf-8");
}

function run(): void {
  const sddPath = parseArgs();
  const agentsPath = path.join(sddPath, "agents").replace(/\\/g, "/");
  const promptsPath = path.join(sddPath, "prompts").replace(/\\/g, "/");

  const settings = readSettings();

  const existed = fs.existsSync(SETTINGS_PATH);

  settings["chat.agentFilesLocations"] = mergeLocations(
    settings["chat.agentFilesLocations"] as Record<string, unknown> | undefined,
    { [agentsPath]: true }
  );
  settings["chat.promptFilesLocations"] = mergeLocations(
    settings["chat.promptFilesLocations"] as Record<string, unknown> | undefined,
    { [promptsPath]: true }
  );

  writeSettings(settings);

  if (existed) {
    console.log(`Updated ${SETTINGS_PATH} (merged SDD Kit entries).`);
  } else {
    console.log(`Created ${SETTINGS_PATH} with SDD Kit entries.`);
  }
  console.log(`  chat.agentFilesLocations  → "${agentsPath}": true`);
  console.log(`  chat.promptFilesLocations → "${promptsPath}": true`);
}

run();
