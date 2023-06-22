#/bin/bash 
if [ $# -lt 1 ] ; then
        echo No arguments supplied
        exit
fi
for i; do 
   mkdir ex$i
done
