#!/usr/bin/env node

import { readdirSync, statSync, lstatSync, existsSync } from "node:fs"
import { join, relative, basename } from "node:path"

const root = process.cwd()
const ignoredDirs = new Set([
  ".git",
  "node_modules",
  ".next",
  "dist",
  "build",
  "coverage",
  "test-results",
  "playwright-report",
  ".medusa",
  ".yarn",
  "archive",
])

const corePaths = [
  "storefront",
  "backend/medusa",
  "backend/medusa-eval",
  "catalogs",
  "knowledge",
  "artifacts",
  "assets",
  "design",
  "docs",
  "agents",
  "pods",
  "decisions",
  "handoffs",
  "status",
  "templates",
  "integrations",
  "prototypes",
  "scripts",
]

const targetAreas = [
  ["apps", "Future home for storefront/admin/mission-control apps"],
  ["services", "Future home for commerce backends and workers"],
  ["brand", "Future home for identity, assets, and design system"],
  ["growth", "Future home for marketing, sales, campaigns, and outreach"],
  ["commerce", "Future home for catalog, pricing, inventory, fulfillment, and support ops"],
  ["ops", "Future home for agents, pods, handoffs, decisions, status, templates, and SOPs"],
  ["archive", "Future home for raw dumps, old screenshots, and deprecated source files"],
]

function walk(dir, files = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (ignoredDirs.has(entry.name)) continue
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(fullPath, files)
    } else if (entry.isFile()) {
      files.push(fullPath)
    }
  }
  return files
}

function topLevelEntries() {
  return readdirSync(root, { withFileTypes: true }).filter((entry) => entry.name !== ".git")
}

function findDirsNamed(dir, names, results = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory() && names.has(entry.name)) {
      results.push(relative(root, fullPath) || ".")
      if (entry.name === ".git" || entry.name === "node_modules" || entry.name === ".next") continue
    }
    if (entry.isDirectory() && entry.name !== ".git" && entry.name !== "node_modules" && entry.name !== ".next") {
      findDirsNamed(fullPath, names, results)
    }
  }
  return results
}

function humanBytes(bytes) {
  const units = ["B", "KB", "MB", "GB"]
  let size = bytes
  let index = 0
  while (size >= 1024 && index < units.length - 1) {
    size /= 1024
    index += 1
  }
  return `${size.toFixed(index === 0 ? 0 : 1)} ${units[index]}`
}

function dirSize(path) {
  let total = 0
  for (const entry of readdirSync(path, { withFileTypes: true })) {
    if (ignoredDirs.has(entry.name)) continue
    const fullPath = join(path, entry.name)
    let stats
    try {
      stats = lstatSync(fullPath)
    } catch {
      continue
    }
    if (stats.isSymbolicLink()) continue
    total += entry.isDirectory() ? dirSize(fullPath) : stats.size
  }
  return total
}

const allFiles = walk(root)
const relativeFiles = allFiles.map((file) => relative(root, file))
const topEntries = topLevelEntries()
const nestedGitRepos = findDirsNamed(root, new Set([".git"]))
  .map((path) => path.replace(/\/\.git$/, ""))
  .filter((path) => path !== ".git" && path !== ".")
const generatedDirs = findDirsNamed(root, new Set(["node_modules", ".next", ".data", ".playwright-mcp"]))

const localRuntimeFiles = relativeFiles.filter((file) => {
  const name = basename(file)
  return (
    name === ".env" ||
    name === ".env.local" ||
    name.startsWith(".env ") ||
    name.endsWith(".log") ||
    name.endsWith(".db") ||
    name.endsWith(".sqlite") ||
    file.includes("/.data/")
  )
})

const copyArtifacts = relativeFiles.filter((file) => {
  const name = basename(file)
  return /\s2(\.[^.]+)?$/.test(name) || /\scopy(\.[^.]+)?$/i.test(name)
})

const rootLooseFiles = topEntries
  .filter((entry) => entry.isFile())
  .map((entry) => entry.name)
  .filter((name) => !["README.md", "CLAUDE.md", "HARLEY.md", "package.json", "package-lock.json", ".gitignore"].includes(name))

const rootKnowledgeDuplicates = rootLooseFiles.filter((name) => existsSync(join(root, "knowledge", name)))
const missingReadmes = corePaths.filter((path) => existsSync(join(root, path)) && !existsSync(join(root, path, "README.md")))

const largeTopDirs = topEntries
  .filter((entry) => entry.isDirectory() && !entry.name.startsWith(".") && !ignoredDirs.has(entry.name))
  .map((entry) => {
    const path = join(root, entry.name)
    return { path: entry.name, size: dirSize(path) }
  })
  .filter((entry) => entry.size > 25 * 1024 * 1024)
  .sort((a, b) => b.size - a.size)

const absentTargetAreas = targetAreas.filter(([path]) => !existsSync(join(root, path)))

const sections = [
  ["Nested Git Repos", nestedGitRepos, "Expected if these are managed as separate apps/services."],
  ["Generated Or Dependency Directories", generatedDirs, "Keep these ignored; do not move or archive them as source material."],
  ["Local Runtime Files To Keep Out Of Source", localRuntimeFiles, "Check before sharing, archiving, or committing."],
  ["Duplicate Copy Artifacts", copyArtifacts, "Review manually before deleting; many came from Drive sync or local exports."],
  ["Root Files Duplicated In knowledge/", rootKnowledgeDuplicates, "Prefer knowledge/ as source of truth; replace root copies with pointers when safe."],
  ["Core Folders Missing README.md", missingReadmes, "Add a short owner/source-of-truth note to each active area."],
  ["Large Top-Level Folders", largeTopDirs.map((entry) => `${entry.path} (${humanBytes(entry.size)})`), "Large app folders are fine; generated contents should stay ignored."],
  ["Target Structure Folders Not Yet Created", absentTargetAreas.map(([path, purpose]) => `${path}/ - ${purpose}`), "Create these only during an intentional migration pass."],
]

console.log("# Workspace Hygiene Check")
console.log("")
console.log(`Root: ${root}`)
console.log(`Files scanned: ${relativeFiles.length}`)
console.log("")

for (const [title, items, note] of sections) {
  console.log(`## ${title}`)
  console.log(note)
  if (items.length === 0) {
    console.log("- None found")
  } else {
    for (const item of items.slice(0, 80)) {
      console.log(`- ${item}`)
    }
    if (items.length > 80) {
      console.log(`- ...and ${items.length - 80} more`)
    }
  }
  console.log("")
}

console.log("## Safe Cleanup Order")
console.log("- Add or update README.md files before moving folders.")
console.log("- Archive raw dumps and generated exports before deleting anything.")
console.log("- Move app/service paths only with package scripts, Docker config, and docs updated together.")
console.log("- Keep env files, logs, local DBs, .next folders, and node_modules out of source control.")
