/*
 * Semantic Kernel - AI Orchestration Framework
 * Copyright (c) 2024 AnonOSS
 */

using Microsoft.SemanticKernel;
using Microsoft.Extensions.Logging;

namespace SemanticKernel
{
    /// <summary>
    /// Main kernel class for orchestrating AI operations
    /// </summary>
    public class Kernel
    {
        private readonly Microsoft.SemanticKernel.Kernel _kernel;
        private readonly ILogger<Kernel>? _logger;

        public Kernel(Microsoft.SemanticKernel.Kernel kernel, ILogger<Kernel>? logger = null)
        {
            _kernel = kernel;
            _logger = logger;
        }

        /// <summary>
        /// Creates a semantic function from a prompt template
        /// </summary>
        public KernelFunction CreateSemanticFunction(string prompt)
        {
            return _kernel.CreateFunctionFromPrompt(prompt);
        }

        /// <summary>
        /// Runs a function with the given input
        /// </summary>
        public async Task<string> RunAsync(KernelFunction function, string input)
        {
            var result = await _kernel.InvokeAsync(function, new KernelArguments { ["input"] = input });
            return result.ToString();
        }

        /// <summary>
        /// Imports functions from a plugin
        /// </summary>
        public KernelPlugin ImportPlugin(object plugin, string pluginName)
        {
            return _kernel.ImportPluginFromObject(plugin, pluginName);
        }
    }
}

