/*
 * ZMap - Fast Internet Scanner
 * Copyright (c) 2024 AnonOSS
 *
 * Licensed under the Apache License, Version 2.0
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <getopt.h>
#include <signal.h>
#include <time.h>

#include "state.h"
#include "send.h"
#include "recv.h"
#include "logger.h"

static volatile int running = 1;

void signal_handler(int sig) {
    running = 0;
}

int main(int argc, char *argv[]) {
    struct zmap_state *state;
    
    signal(SIGINT, signal_handler);
    signal(SIGTERM, signal_handler);
    
    // Initialize state
    state = zmap_state_init();
    if (!state) {
        fprintf(stderr, "Failed to initialize zmap state\n");
        return 1;
    }
    
    // Parse command line arguments
    if (zmap_parse_args(state, argc, argv) < 0) {
        fprintf(stderr, "Failed to parse arguments\n");
        return 1;
    }
    
    // Initialize logger
    zmap_log_init(state);
    
    // Start scanning
    zmap_log_info("Starting scan...");
    
    // Main scanning loop
    while (running && !zmap_is_complete(state)) {
        zmap_send_packets(state);
        zmap_recv_packets(state);
    }
    
    // Cleanup
    zmap_log_info("Scan complete");
    zmap_state_free(state);
    
    return 0;
}

