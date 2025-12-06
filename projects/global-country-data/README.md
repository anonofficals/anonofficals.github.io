# Global Country Data

A comprehensive, standardized JSON dataset containing detailed metadata for all countries worldwide.

## Overview

Global Country Data is a comprehensive, standardized JSON dataset containing detailed metadata for all countries worldwide. This dataset is designed for developers, analysts, and educators who need accurate and structured country information for various applications.

## Features

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

```bash
# Clone the repository
git clone https://github.com/AnonOSS/global-country-data.git
cd global-country-data
```

### Using as NPM Package

```bash
npm install @anonoss/global-country-data
```

## Usage

### JavaScript/TypeScript

```javascript
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
```

### Python

```python
import json

# Load the data
with open('data/countries.json', 'r') as f:
    countries = json.load(f)

# Find a country
usa = next((c for c in countries if c['iso']['alpha2'] == 'US'), None)

# Filter by region
european_countries = [c for c in countries if c['region'] == 'Europe']
```

## Example Data Structure

```json
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
```

## Use Cases

- **Form Validation**: Country selection dropdowns with proper codes
- **Internationalization**: Currency and language data for i18n
- **Data Visualization**: Geographic mapping and analysis
- **E-commerce**: Shipping and payment processing
- **Educational Tools**: Geography and world studies applications
- **API Development**: Backend data for country-related endpoints

## Contributing

We welcome contributions to improve data accuracy and completeness:
1. Fork the repository
2. Make your changes to the JSON files
3. Submit a pull request with a clear description

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## License

See [LICENSE](LICENSE) file for details.

## Links

- [GitHub Repository](https://github.com/AnonOSS/global-country-data)
- [Documentation](https://github.com/AnonOSS/global-country-data/wiki)
- [Issue Tracker](https://github.com/AnonOSS/global-country-data/issues)

