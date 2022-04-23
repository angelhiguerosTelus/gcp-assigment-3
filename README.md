
##  crear las VMS
```sh
#!/usr/bin/env bash

echo '*** COMPUTE ENGINE ***'

echo '> Creando VM 1...'
gcloud compute instances create app1 \
    --image-family debian-9 \
    --image-project debian-cloud \
    --tags webapp \
    --metadata startup-script="#! /bin/bash
        sudo apt update -y; 
        sudo apt install docker.io -y; 
        sudo chmod 666 /var/run/docker.sock; 
        docker network create mynetworkgcp

        docker run \
                -it \
                --rm \
                -v ${PWD}:/app \
                -v /app/node_modules \
                --network mynetworkgcp \
                -p 80:3000 \
                -e CHOKIDAR_USEPOLLING=true \
                -e REACT_APP_VM=VM1 \
                assigment4
    "

echo '> Creando VM 2...'
gcloud compute instances create app2 \
    --image-family debian-9 \
    --image-project debian-cloud \
    --tags webapp \
    --metadata startup-script="#! /bin/bash
        sudo apt update -y; 
        sudo apt install docker.io -y; 
        sudo chmod 666 /var/run/docker.sock; 
        docker network create mynetworkgcp

        docker run \
                -it \
                --rm \
                -v ${PWD}:/app \
                -v /app/node_modules \
                --network mynetworkgcp \
                -p 80:3000 \
                -e CHOKIDAR_USEPOLLING=true \
                -e REACT_APP_VM=VM2 \
                assigment4
    "

echo '> Creando VM 3...'
gcloud compute instances create app3 \
    --image-family debian-9 \
    --image-project debian-cloud \
    --tags webapp \
    --metadata startup-script="#! /bin/bash
        sudo apt update -y; 
        sudo apt install docker.io -y; 
        sudo chmod 666 /var/run/docker.sock; 
        docker network create mynetworkgcp

        docker run \
                -it \
                --rm \
                -v ${PWD}:/app \
                -v /app/node_modules \
                --network mynetworkgcp \
                -p 80:3000 \
                -e CHOKIDAR_USEPOLLING=true \
                -e REACT_APP_VM=VM3 \
                assigment4
    "

    echo '> VMs creadas'
    gcloud compute instances list

    echo '> Creando regla INGRESS en el firewall -> Puerto 80...'
    gcloud compute firewall-rules create www-firewall-network-lb \
        --target-tags webapp \
        --allow tcp:80
   
```
## crear el Network Load Balancer
```sh
echo '*** NETWORK LOAD BALANCER ***'
echo '> Creando load balancer...'
gcloud compute addresses create loadbalancer-1

echo '> Agregando un health-check...'
gcloud compute http-health-checks create hc1

echo '> Creando un target pool con el health check'
gcloud compute target-pools create www-pool \
    --http-health-check hc1

echo '> Agregar las instancias al target pool'
gcloud compute target-pools add-instances www-pool \
echo '> Agregando una regla de entrada'
gcloud compute forwarding-rules create www-rule \
    --ports 80 \
    --address loadbalancer-1 \
    --target-pool www-pool

echo '> Revisando la informacion del load balancer'
gcloud compute forwarding-rules describe www-rule

```
## Desplegar React APP en Docker
```sh
docker build -t assigment4 . 

docker tag assigment4:latest angelhigueros11/assigment4 

docker push angelhigueros11/assigment4  

docker run \
        -it \
        --rm \
        -v ${PWD}:/app \
        -v /app/node_modules \
        --network mynetworkgcp \
        -p 80:3000 \
        -e CHOKIDAR_USEPOLLING=true \
        -e REACT_APP_VM=VM1 \
        assigment4
```
