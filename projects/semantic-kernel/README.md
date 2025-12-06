# Semantic Kernel

An enterprise-ready orchestration framework for building intelligent AI agents and multi-agent systems.

## Overview

Semantic Kernel is an enterprise-ready orchestration framework designed to build intelligent AI agents and multi-agent systems. It enables developers to integrate AI capabilities seamlessly into their applications, facilitating the creation of complex, context-aware systems that can understand and respond to natural language.

## Features

- **Multi-Agent Systems**: Build and orchestrate multiple AI agents working together
- **Function Chaining**: Chain multiple AI functions to create complex workflows
- **Prompt Templating**: Advanced prompt management and templating system
- **Multiple Language Support**: Available for C#, Python, and JavaScript/TypeScript
- **Plugin Architecture**: Extensible plugin system for custom functionality
- **Memory Management**: Built-in memory and context management for conversations
- **Enterprise Ready**: Designed for production use with proper error handling and logging

## Installation

### C# / .NET

```bash
# Install via NuGet
dotnet add package Microsoft.SemanticKernel

# Or via Package Manager
Install-Package Microsoft.SemanticKernel
```

### Python

```bash
pip install semantic-kernel
```

### JavaScript/TypeScript

```bash
npm install @microsoft/semantic-kernel
```

## Quick Start

### C# Example

```csharp
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
```

### Python Example

```python
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
```

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

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

MIT License - See [LICENSE](LICENSE) file for details.

## Links

- [GitHub Repository](https://github.com/AnonOSS/semantic-kernel)
- [Documentation](https://github.com/AnonOSS/semantic-kernel/wiki)
- [Issue Tracker](https://github.com/AnonOSS/semantic-kernel/issues)

