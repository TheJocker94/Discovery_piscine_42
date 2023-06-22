#!/bin/bash
args=("$@")
if [ $# -lt 1 ] ; then
        echo No arguments supplied
fi
if [ $# -gt 3 ] ; then
        num=(0 1 2)
else
        num=${!args[@]}
fi
for i in ${num[@]};
do
        echo ${args[$i]}
done
