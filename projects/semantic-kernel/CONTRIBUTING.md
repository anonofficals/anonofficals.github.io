# Contributing to Semantic Kernel

Thank you for your interest in contributing to Semantic Kernel! We welcome contributions from everyone.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/AnonOSS/semantic-kernel/issues)
2. If not, create a new issue with:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Code example (if applicable)

### Submitting Code

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Write or update tests
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Style

- Follow C# coding conventions
- Use meaningful variable and method names
- Add XML documentation comments for public APIs
- Write unit tests for new features
- Ensure all tests pass before submitting

## Development Setup

```bash
git clone https://github.com/AnonOSS/semantic-kernel.git
cd semantic-kernel
dotnet restore
dotnet build
dotnet test
```

## Best Practices

1. **Error Handling**: Always wrap kernel calls in try-catch blocks
2. **Token Management**: Monitor token usage to control costs
3. **Prompt Engineering**: Design prompts carefully for best results
4. **Security**: Never expose API keys in client-side code
5. **Caching**: Use memory and caching to reduce API calls
6. **Testing**: Test your functions thoroughly before deployment

## Questions?

Feel free to open an issue for any questions or concerns.

