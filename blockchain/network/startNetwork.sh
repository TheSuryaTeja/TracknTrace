#! /bin/sh

minifab netup -s couchdb -e true -o producer.tnt.com &&
minifab create -c tntchannel &&
minifab join -c tntchannel &&
minifab anchorupdate &&
minifab profilegen -c tntchannel
