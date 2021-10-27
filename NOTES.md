

https://www.youtube.com/watch?v=WDJacg0NuLo


https://www.npmjs.com/package/oracledb

https://oracle.github.io/node-oracledb/INSTALL.html#quickstart

https://www.oracle.com/database/technologies/appdev/quickstartnodeonprem.html


https://oracle.github.io/node-oracledb/INSTALL.html#quickstart


https://download.oracle.com/otn_software/linux/instantclient/1912000/instantclient-basic-linux.x64-19.12.0.0.0dbru.zip

https://sparida.blogspot.com/2021/08/how-to-use-nodejs-with-knexjs-to-access.html

local/instantclient_19_12

dnf install libaio || libaio1

```
export LD_LIBRARY_PATH=/home/sudowing/Documents/repos/service-engine-docker/local/instantclient_19_12:$LD_LIBRARY_PATH

/home/sudowing/Documents/repos/service-engine-docker/local/instantclient_19_12

```

Client 19 will not run on Oracle Linux 6.

If there is no other Oracle software on the machine that will be impacted, then permanently add Instant Client to the run-time link path. For example, if the Basic package unzipped to /opt/oracle/instantclient_19_11, then run the following using sudo or as the root user: