#!/bin/sh

find ./ -type f

exit 0


echo DIRS:

# list directories (ordered by name)
find ./ -type d  -printf "%f\n"|sort

echo SLIDES:

find . -type f -printf '%h\0%d\0%p\n' | sort -t '\0' -n | awk -F '\0' '{print $3}' | awk '{gsub(/\/.*\//,"",$1); print}' | awk '{print substr($1,2); }'

