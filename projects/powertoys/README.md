# PowerToys

A set of utilities for power users to tune and streamline their Windows experience for greater productivity.

## Overview

PowerToys is a set of utilities for power users to tune and streamline their Windows experience for greater productivity. These tools help users maximize their efficiency by providing advanced features and customizations not available in the standard Windows interface.

## Features

### FancyZones
Window manager that makes it easy to create complex window layouts and quickly position windows into those layouts.

### PowerToys Run
Quick launcher for power users that contains additional features without sacrificing performance.

### Keyboard Manager
Remap keys and create custom keyboard shortcuts.

### File Explorer Add-ons
Adds preview pane renderers and context menu handlers to enhance File Explorer.

### Image Resizer
A Windows Shell extension for quickly resizing images.

### PowerRename
Bulk rename utility that enables you to rename multiple files and folders using search and replace or regular expressions.

### Shortcut Guide
Shows available keyboard shortcuts when you hold the Windows key.

### Color Picker
A system-wide color picker activated with a keyboard shortcut.

### Awake
Keeps your computer awake without having to manage power settings.

### Mouse Utilities
Find your mouse pointer quickly and highlight cursor position.

## Installation

### Requirements
- Windows 10 version 2004 (build 19041) or later / Windows 11
- .NET 6.0 Desktop Runtime or later

### Download and Install
1. Download the latest release from [GitHub Releases](https://github.com/AnonOSS/powertoys/releases)
2. Run the installer (.exe file)
3. Follow the installation wizard
4. Launch PowerToys from the Start menu

### Building from Source

```bash
# Clone the repository
git clone https://github.com/AnonOSS/powertoys.git
cd powertoys

# Restore dependencies
dotnet restore

# Build
dotnet build

# Run
dotnet run --project src/PowerToys.sln
```

## Usage

### FancyZones
1. Press `Win + ` to open the zone editor
2. Drag windows into zones
3. Create custom zone layouts

### PowerToys Run
1. Press `Alt + Space` to open the launcher
2. Type to search for applications, files, or run commands
3. Use plugins for additional functionality

### Keyboard Manager
1. Open PowerToys Settings
2. Navigate to Keyboard Manager
3. Click "Remap a key" or "Remap a shortcut"
4. Configure your custom mappings

## Keyboard Shortcuts
- `Win + ``: Open FancyZones editor
- `Alt + Space`: Open PowerToys Run
- `Win + Shift + C`: Open Color Picker
- `Win + Shift + M`: Open Mouse Utilities
- `Win + Shift + S`: Open Shortcut Guide

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

MIT License - See [LICENSE](LICENSE) file for details.

## Links

- [GitHub Repository](https://github.com/AnonOSS/powertoys)
- [Documentation](https://github.com/AnonOSS/powertoys/wiki)
- [Issue Tracker](https://github.com/AnonOSS/powertoys/issues)

