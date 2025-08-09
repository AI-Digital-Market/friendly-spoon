#!/bin/bash
[[ ! -f .env.production ]] && touch .env.production
[[ ! -f .env.production.local ]] && touch .env.production.local
[[ ! -f file2.txt ]] && touch file2.txt
