# build.ps1 — Empacota o lean-inception-plugin em build/lean-inception-plugin.plugin

$ErrorActionPreference = 'Stop'

$root      = $PSScriptRoot
$buildDir  = Join-Path $root 'build'
$pluginName = (Get-Content (Join-Path $root '.claude-plugin\plugin.json') | ConvertFrom-Json).name
$outFile   = Join-Path $buildDir "$pluginName.plugin"

# Diretórios e arquivos excluídos do pacote
$excludeDirs  = @('.git', '.claude', 'build', 'node_modules')
$excludeFiles = @('.DS_Store', 'Thumbs.db')

# Garantir que build/ existe
if (-not (Test-Path $buildDir)) {
  New-Item -ItemType Directory -Path $buildDir | Out-Null
}

# Remover build anterior
if (Test-Path $outFile) { Remove-Item $outFile -Force }

Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::Open($outFile, 'Create')

Get-ChildItem -Path $root -Recurse -File | Where-Object {
  $rel = $_.FullName.Substring($root.Length).TrimStart('\', '/')
  $topLevel = ($rel -split '[/\\]')[0]
  $excluded = $excludeDirs -contains $topLevel -or $excludeFiles -contains $_.Name
  -not $excluded
} | ForEach-Object {
  $rel = $_.FullName.Substring($root.Length).TrimStart('\', '/') -replace '\\', '/'
  [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
    $zip, $_.FullName, $rel, 'Optimal'
  ) | Out-Null
}

$zip.Dispose()

$size = (Get-Item $outFile).Length
Write-Host "Build concluído: build/$pluginName.plugin ($size bytes)"
