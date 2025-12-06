# Contributing to Global Country Data

Thank you for your interest in contributing to Global Country Data! We welcome contributions from everyone.

## How to Contribute

### Reporting Issues

1. Check if the issue has already been reported in [Issues](https://github.com/AnonOSS/global-country-data/issues)
2. If not, create a new issue with:
   - Clear description of the issue
   - Country or data point affected
   - Source of correct information (if applicable)

### Updating Data

1. Fork the repository
2. Make your changes to `data/countries.json`
3. Ensure JSON is valid
4. Run validation: `npm run validate`
5. Commit your changes (`git commit -m 'Update country data'`)
6. Push to your fork
7. Open a Pull Request

### Data Standards

- Use official ISO 3166 country codes
- Verify currency information from central banks
- Use official country names
- Include accurate coordinates
- Provide sources for disputed information

## Validation

Before submitting, ensure your JSON is valid:

```bash
npm run validate
```

## Questions?

Feel free to open an issue for any questions or concerns.

