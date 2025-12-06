# ZMap

A fast, stateless, single-packet network scanner designed for Internet-wide network surveys.

## Overview

ZMap is a fast, stateless, single-packet network scanner designed for Internet-wide network surveys. Unlike traditional network scanners like Nmap, ZMap is optimized for scanning large portions of the Internet quickly and efficiently.

## Features

- **High-Speed Scanning**: Can scan the entire IPv4 address space in under 45 minutes on a single machine
- **Stateless Architecture**: Uses a stateless design that doesn't maintain connection state, enabling massive parallelism
- **Single-Packet Probes**: Sends one packet per host, dramatically reducing bandwidth and time requirements
- **Research-Oriented**: Designed specifically for Internet-wide security research and network analysis

## Installation

### Building from Source

```bash
# Clone the repository
git clone https://github.com/AnonOSS/zmap.git
cd zmap

# Build and install
cmake .
make -j4
sudo make install
```

### Requirements

- CMake 3.1 or later
- GNU Make
- GCC with C99 support
- libpcap development libraries
- gengetopt
- flex
- byacc

## Usage

### Simple Port Scan

```bash
# Scan port 80 on the entire Internet
zmap -p 80

# Scan a specific subnet
zmap -p 443 192.168.1.0/24

# Scan multiple ports
zmap -p 80,443,8080
```

### Advanced Options

```bash
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
```

## Output Formats

ZMap supports multiple output formats:
- **Default**: One IP address per line
- **JSON**: Structured JSON output with metadata
- **CSV**: Comma-separated values
- **Redis**: Direct insertion into Redis database

```bash
# JSON output
zmap -p 80 -o results.json --output-args=json

# CSV output
zmap -p 80 -o results.csv --output-args=csv
```

## Ethical Considerations

⚠️ **Important**: Only scan networks you own or have explicit permission to scan. Unauthorized scanning may be illegal in your jurisdiction.

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

Apache License 2.0 - See [LICENSE](LICENSE) file for details.

## Links

- [GitHub Repository](https://github.com/AnonOSS/zmap)
- [Documentation](https://github.com/AnonOSS/zmap/wiki)
- [Issue Tracker](https://github.com/AnonOSS/zmap/issues)

