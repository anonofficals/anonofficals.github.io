cmake_minimum_required(VERSION 3.1)
project(zmap C)

set(CMAKE_C_STANDARD 99)
set(CMAKE_C_STANDARD_REQUIRED ON)

# Find required packages
find_package(PkgConfig REQUIRED)
pkg_check_modules(LIBPCAP REQUIRED libpcap)

# Include directories
include_directories(${LIBPCAP_INCLUDE_DIRS})
include_directories(src)

# Source files
set(ZMAP_SOURCES
    src/zmap.c
    src/state.c
    src/recv.c
    src/send.c
    src/probe_modules.c
    src/output_modules.c
    src/fieldset.c
    src/logger.c
    src/blacklist.c
    src/whitelist.c
    src/iterator.c
    src/cyclic.c
    src/random.c
    src/aesrand.c
    src/xalloc.c
    src/queue.c
    src/lockfd.c
)

# Executable
add_executable(zmap ${ZMAP_SOURCES})

# Link libraries
target_link_libraries(zmap ${LIBPCAP_LIBRARIES} m pthread)

# Install
install(TARGETS zmap DESTINATION bin)

