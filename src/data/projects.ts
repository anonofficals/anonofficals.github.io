import { Project } from "@/components/ProjectCard";

export const projects: Project[] = [
    {
        id: "zmap",
        title: "ZMap",
        description: "A fast, stateless, single-packet network scanner designed for Internet-wide network surveys. ZMap enables researchers to perform comprehensive scans of the entire IPv4 address space in minutes, making it an essential tool for security research and network analysis.",
        tags: ["Network Scanner", "C", "Security"],
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/AnonOSS/zmap",
        stats: {
            stars: 0,
            forks: 0,
            issues: 0
        },
        documentation: `# ZMap Documentation

## Introduction
ZMap is a fast, stateless, single-packet network scanner designed for Internet-wide network surveys. Unlike traditional network scanners like Nmap, ZMap is optimized for scanning large portions of the Internet quickly and efficiently.

## Key Features
- **High-Speed Scanning**: Can scan the entire IPv4 address space in under 45 minutes on a single machine.
- **Stateless Architecture**: Uses a stateless design that doesn't maintain connection state, enabling massive parallelism.
- **Single-Packet Probes**: Sends one packet per host, dramatically reducing bandwidth and time requirements.
- **Research-Oriented**: Designed specifically for Internet-wide security research and network analysis.

## Use Cases
- **Security Research**: Identifying vulnerable services across the Internet.
- **Network Surveys**: Understanding the global deployment of protocols and services.
- **Compliance Monitoring**: Checking for exposed services in your network ranges.
- **Academic Research**: Studying Internet topology and service distribution.

## Installation

### Building from Source
\`\`\`bash
# Clone the repository
git clone https://github.com/AnonOSS/zmap.git
cd zmap

# Build and install
cmake .
make -j4
sudo make install
\`\`\`

### Requirements
- CMake 3.1 or later
- GNU Make
- GCC with C99 support
- libpcap development libraries
- gengetopt
- flex
- byacc

## Basic Usage

### Simple Port Scan
\`\`\`bash
# Scan port 80 on the entire Internet
zmap -p 80

# Scan a specific subnet
zmap -p 443 192.168.1.0/24

# Scan multiple ports
zmap -p 80,443,8080
\`\`\`

### Advanced Options
\`\`\`bash
# Limit bandwidth to 10Mbps
zmap -p 80 -B 10M

# Set maximum target rate (packets per second)
zmap -p 80 -r 10000

# Output results to a file
zmap -p 80 -o results.txt

# Use a whitelist file
zmap -p 80 -w whitelist.txt

# Use a blacklist file
zmap -p 80 -b blacklist.txt
\`\`\`

## Output Formats
ZMap supports multiple output formats:
- **Default**: One IP address per line
- **JSON**: Structured JSON output with metadata
- **CSV**: Comma-separated values
- **Redis**: Direct insertion into Redis database

\`\`\`bash
# JSON output
zmap -p 80 -o results.json --output-args=json

# CSV output
zmap -p 80 -o results.csv --output-args=csv
\`\`\`

## Probes and Protocols
ZMap supports various probe types:
- **TCP SYN**: Default TCP connection probe
- **ICMP Echo**: ICMP ping requests
- **UDP**: UDP packet probes
- **Custom**: Define your own probe packets

## Performance Tuning
- **Bandwidth Limiting**: Use \`-B\` to limit bandwidth usage
- **Rate Limiting**: Use \`-r\` to control packets per second
- **Interface Selection**: Use \`-i\` to specify network interface
- **CPU Affinity**: Bind to specific CPU cores for better performance

## Ethical Considerations
⚠️ **Important**: Only scan networks you own or have explicit permission to scan. Unauthorized scanning may be illegal in your jurisdiction.

## Contributing
We welcome contributions! Please see our [Contributing Guide](https://github.com/AnonOSS/zmap/blob/main/CONTRIBUTING.md) for details.

## License
Apache License 2.0`
    },
    {
        id: "powertoys",
        title: "PowerToys",
        description: "A set of utilities for power users to tune and streamline their Windows experience for greater productivity. Includes window management, keyboard shortcuts, file explorer enhancements, and various tools designed to improve workflow efficiency.",
        tags: ["Windows", "C#", "Productivity"],
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/AnonOSS/powertoys",
        stats: {
            stars: 1,
            forks: 0,
            issues: 0
        },
        documentation: `# PowerToys Documentation

## Introduction
PowerToys is a set of utilities for power users to tune and streamline their Windows experience for greater productivity. These tools help users maximize their efficiency by providing advanced features and customizations not available in the standard Windows interface.

## Key Features

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
\`\`\`bash
# Clone the repository
git clone https://github.com/AnonOSS/powertoys.git
cd powertoys

# Restore dependencies
dotnet restore

# Build
dotnet build

# Run
dotnet run --project src/PowerToys.sln
\`\`\`

## Usage

### FancyZones
1. Press \`Win + \`\` to open the zone editor
2. Drag windows into zones
3. Create custom zone layouts

### PowerToys Run
1. Press \`Alt + Space\` to open the launcher
2. Type to search for applications, files, or run commands
3. Use plugins for additional functionality

### Keyboard Manager
1. Open PowerToys Settings
2. Navigate to Keyboard Manager
3. Click "Remap a key" or "Remap a shortcut"
4. Configure your custom mappings

### File Explorer Add-ons
- **Preview Pane**: Enable preview for various file types
- **SVG Preview**: Preview SVG files in File Explorer
- **Markdown Preview**: Preview Markdown files
- **PDF Preview**: Preview PDF files

### Image Resizer
1. Select one or more images in File Explorer
2. Right-click and choose "Resize pictures"
3. Choose preset sizes or enter custom dimensions
4. Click "Resize"

### PowerRename
1. Select multiple files in File Explorer
2. Right-click and choose "PowerRename"
3. Enter search and replace patterns
4. Preview changes before applying

## Configuration
All PowerToys settings can be configured through the PowerToys Settings window:
- Right-click the PowerToys icon in the system tray
- Select "Settings"
- Navigate to individual tool settings

## Keyboard Shortcuts
- \`Win + \`\`: Open FancyZones editor
- \`Alt + Space\`: Open PowerToys Run
- \`Win + Shift + C\`: Open Color Picker
- \`Win + Shift + M\`: Open Mouse Utilities
- \`Win + Shift + S\`: Open Shortcut Guide

## Contributing
We welcome contributions! Please see our [Contributing Guide](https://github.com/AnonOSS/powertoys/blob/main/CONTRIBUTING.md) for details.

## License
MIT License`
    },
    {
        id: "global-country-data",
        title: "Global Country Data",
        description: "A comprehensive, standardized JSON dataset containing detailed country metadata. Each entry includes country names, ISO codes, flags, currency information, calling codes, regions, languages, and geographical coordinates. Perfect for developers, analysts, and educators.",
        tags: ["Data", "JSON", "API"],
        image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/AnonOSS/global-country-data",
        stats: {
            stars: 1,
            forks: 0,
            issues: 0
        },
        documentation: `# Global Country Data Documentation

## Introduction
Global Country Data is a comprehensive, standardized JSON dataset containing detailed metadata for all countries worldwide. This dataset is designed for developers, analysts, and educators who need accurate and structured country information for various applications.

## Key Features
- **Comprehensive Coverage**: Data for all recognized countries and territories
- **Standardized Format**: Consistent JSON structure across all entries
- **Rich Metadata**: Includes multiple data points per country
- **ISO Compliance**: Uses official ISO 3166 country codes
- **Regular Updates**: Maintained with current information

## Data Structure
Each country entry includes:
- **Basic Information**: Country name (common and official)
- **ISO Codes**: Alpha-2 (e.g., "US") and Alpha-3 (e.g., "USA") codes
- **Flag Information**: Emoji flag and SVG URL
- **Currency**: Name, code, and symbol
- **Calling Code**: International dialing code
- **Geographic Data**: Region, subregion, and coordinates
- **Languages**: List of official and spoken languages
- **Additional Metadata**: Population, area, timezone, etc.

## Installation

### Direct Download
\`\`\`bash
# Clone the repository
git clone https://github.com/AnonOSS/global-country-data.git
cd global-country-data
\`\`\`

### Using as NPM Package
\`\`\`bash
npm install @anonoss/global-country-data
\`\`\`

## Usage

### JavaScript/TypeScript
\`\`\`javascript
// Import the data
import countryData from '@anonoss/global-country-data';

// Or load from JSON file
const countryData = require('./data/countries.json');

// Find a country by ISO code
const usa = countryData.find(country => country.iso.alpha2 === 'US');

// Get all countries in a region
const europeanCountries = countryData.filter(
  country => country.region === 'Europe'
);

// Search by name
const japan = countryData.find(
  country => country.name.common === 'Japan'
);
\`\`\`

### Python
\`\`\`python
import json

# Load the data
with open('data/countries.json', 'r') as f:
    countries = json.load(f)

# Find a country
usa = next((c for c in countries if c['iso']['alpha2'] == 'US'), None)

# Filter by region
european_countries = [c for c in countries if c['region'] == 'Europe']
\`\`\`

### Example Data Structure
\`\`\`json
{
  "name": {
    "common": "United States",
    "official": "United States of America"
  },
  "iso": {
    "alpha2": "US",
    "alpha3": "USA",
    "numeric": "840"
  },
  "flag": {
    "emoji": "🇺🇸",
    "svg": "https://flagcdn.com/us.svg"
  },
  "currency": {
    "name": "United States dollar",
    "code": "USD",
    "symbol": "$"
  },
  "callingCode": "+1",
  "region": "Americas",
  "subregion": "Northern America",
  "languages": ["English"],
  "coordinates": {
    "latitude": 37.0902,
    "longitude": -95.7129
  }
}
\`\`\`

## Use Cases
- **Form Validation**: Country selection dropdowns with proper codes
- **Internationalization**: Currency and language data for i18n
- **Data Visualization**: Geographic mapping and analysis
- **E-commerce**: Shipping and payment processing
- **Educational Tools**: Geography and world studies applications
- **API Development**: Backend data for country-related endpoints

## Data Sources
The dataset is compiled from multiple authoritative sources:
- ISO 3166 for country codes
- UN Statistics Division for regions
- Central banks for currency information
- ITU for calling codes

## Contributing
We welcome contributions to improve data accuracy and completeness:
1. Fork the repository
2. Make your changes to the JSON files
3. Submit a pull request with a clear description

## License
See LICENSE file for details.`
    },
    {
        id: "semantic-kernel",
        title: "Semantic Kernel",
        description: "An enterprise-ready orchestration framework for building intelligent AI agents and multi-agent systems. Facilitates the integration of AI capabilities into applications, enabling the development of complex, context-aware systems with support for multiple programming languages.",
        tags: ["AI", "C#", "Machine Learning"],
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/AnonOSS/semantic-kernel",
        stats: {
            stars: 0,
            forks: 0,
            issues: 0
        },
        documentation: `# Semantic Kernel Documentation

## Introduction
Semantic Kernel is an enterprise-ready orchestration framework designed to build intelligent AI agents and multi-agent systems. It enables developers to integrate AI capabilities seamlessly into their applications, facilitating the creation of complex, context-aware systems that can understand and respond to natural language.

## Key Features
- **Multi-Agent Systems**: Build and orchestrate multiple AI agents working together
- **Function Chaining**: Chain multiple AI functions to create complex workflows
- **Prompt Templating**: Advanced prompt management and templating system
- **Multiple Language Support**: Available for C#, Python, and JavaScript/TypeScript
- **Plugin Architecture**: Extensible plugin system for custom functionality
- **Memory Management**: Built-in memory and context management for conversations
- **Enterprise Ready**: Designed for production use with proper error handling and logging

## Core Concepts

### Plugins
Plugins are collections of functions that can be called by the AI. They can be:
- **Native Functions**: Written in your application language
- **Prompt Functions**: AI-generated functions using prompts
- **API Functions**: Functions that call external APIs

### Memories
Semantic Kernel includes a memory system for storing and retrieving information:
- **Vector Storage**: Store embeddings for semantic search
- **Text Storage**: Store plain text information
- **Metadata**: Attach metadata to memories for filtering

### Plans
Plans allow you to create multi-step workflows:
- **Sequential Plans**: Execute steps in order
- **Parallel Plans**: Execute steps concurrently
- **Conditional Plans**: Execute steps based on conditions

## Installation

### C# / .NET
\`\`\`bash
# Install via NuGet
dotnet add package Microsoft.SemanticKernel

# Or via Package Manager
Install-Package Microsoft.SemanticKernel
\`\`\`

### Python
\`\`\`bash
pip install semantic-kernel
\`\`\`

### JavaScript/TypeScript
\`\`\`bash
npm install @microsoft/semantic-kernel
\`\`\`

## Quick Start

### C# Example
\`\`\`csharp
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Plugins.Core;

var kernel = Kernel.Builder
    .WithOpenAIChatCompletionService(
        modelId: "gpt-4",
        apiKey: "your-api-key")
    .Build();

// Import a plugin
var timePlugin = kernel.ImportFunctions(new TimePlugin(), "time");

// Create a prompt function
var prompt = @"What is the current time in {{$timezone}}?";

var function = kernel.CreateSemanticFunction(prompt);

// Invoke the function
var result = await kernel.RunAsync(
    function,
    new("America/New_York")
);

Console.WriteLine(result);
\`\`\`

### Python Example
\`\`\`python
import semantic_kernel as sk
from semantic_kernel.connectors.ai.open_ai import OpenAIChatCompletion

# Initialize the kernel
kernel = sk.Kernel()
kernel.add_chat_service(
    "chat_completion",
    OpenAIChatCompletion("gpt-4", "your-api-key")
)

# Create a semantic function
prompt = "What is the capital of {{$country}}?"
function = kernel.create_semantic_function(prompt)

# Invoke the function
result = await kernel.run_async(
    function,
    input_str="France"
)

print(result)
\`\`\`

### JavaScript Example
\`\`\`javascript
import { Kernel } from '@microsoft/semantic-kernel';

// Initialize the kernel
const kernel = new Kernel({
  service: {
    type: 'OpenAI',
    modelId: 'gpt-4',
    apiKey: 'your-api-key'
  }
});

// Create a semantic function
const prompt = 'Translate the following to {{$language}}: {{$text}}';
const function = kernel.createSemanticFunction(prompt);

// Invoke the function
const result = await kernel.run(function, {
  language: 'Spanish',
  text: 'Hello, world!'
});

console.log(result);
\`\`\`

## Advanced Features

### Multi-Agent Orchestration
\`\`\`csharp
// Create multiple agents
var agent1 = kernel.CreateSemanticFunction("Agent 1 prompt");
var agent2 = kernel.CreateSemanticFunction("Agent 2 prompt");

// Orchestrate agents
var plan = new Plan();
plan.AddStep(agent1);
plan.AddStep(agent2);

var result = await kernel.RunAsync(plan);
\`\`\`

### Memory Management
\`\`\`csharp
// Store a memory
await kernel.Memory.SaveInformationAsync(
    collection: "facts",
    text: "The capital of France is Paris",
    id: "fact1"
);

// Retrieve memories
var memories = await kernel.Memory.SearchAsync(
    collection: "facts",
    query: "What is the capital of France?",
    limit: 5
);
\`\`\`

### Custom Plugins
\`\`\`csharp
public class WeatherPlugin
{
    [SKFunction("Get the current weather for a location")]
    public async Task<string> GetWeather(string location)
    {
        // Call weather API
        return $"The weather in {location} is sunny";
    }
}

// Import the plugin
kernel.ImportFunctions(new WeatherPlugin(), "weather");
\`\`\`

## Best Practices
1. **Error Handling**: Always wrap kernel calls in try-catch blocks
2. **Token Management**: Monitor token usage to control costs
3. **Prompt Engineering**: Design prompts carefully for best results
4. **Security**: Never expose API keys in client-side code
5. **Caching**: Use memory and caching to reduce API calls
6. **Testing**: Test your functions thoroughly before deployment

## Contributing
We welcome contributions! Please see our [Contributing Guide](https://github.com/AnonOSS/semantic-kernel/blob/main/CONTRIBUTING.md) for details.

## License
MIT License`
    }
];
