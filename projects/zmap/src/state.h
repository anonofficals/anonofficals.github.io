/*
 * ZMap State Management
 * Copyright (c) 2024 AnonOSS
 */

#ifndef STATE_H
#define STATE_H

#include <stdint.h>
#include <pcap/pcap.h>

struct zmap_state {
    uint16_t port;
    uint32_t rate;
    uint32_t bandwidth;
    char *output_file;
    char *blacklist_file;
    char *whitelist_file;
    pcap_t *pcap_handle;
    uint64_t total_targets;
    uint64_t completed_targets;
    uint64_t successful_targets;
};

struct zmap_state *zmap_state_init(void);
void zmap_state_free(struct zmap_state *state);
int zmap_parse_args(struct zmap_state *state, int argc, char *argv[]);
int zmap_is_complete(struct zmap_state *state);

#endif /* STATE_H */

