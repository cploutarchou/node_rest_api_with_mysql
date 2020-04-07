# Docker Compose for mySQL AND phpMyAdmin

Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application’s services. Then, with a single command, you create and start all the services from your configuration. 

Learn more docker compose <a href="https://docs.docker.com/compose/overview/" target="_blank">here</a>
#How to:

1. Install Docker (Learn more about docker installation <a href="https://docs.docker.com/install/" target="_blank">here</a>)

2. Enter on the project root directory 

3.  Up the compose
```
    docker-compose up -d
```
4. Access phpmyadmin
```
    your_ip:8183
    Server: mysql
    Username: root/root
    Password: root/pass
```
5. Access mysql on terminal
```
    docker exec -it mysql_container_name mysql -u root -p
```

## Docker phpmyadmin ENV
<table>
<tr>
<td>PMA_ARBITRARY </td>
<td>when set to 1 connection to the arbitrary server will be allowed</td>
</tr>
<tr>
<td>PPMA_HOST </td>
<td>define address/host name of the MySQL server</td>
</tr>
<tr>
<td>PMA_PORT </td>
<td> define port of the MySQL server</td>
</tr>
</table>

## If you need more information about phpmyadmin image.
<a href="https://hub.docker.com/r/phpmyadmin/phpmyadmin/" target="_blank">READ HERE</a>

## If you need more information about mysql image.
<a href="https://hub.docker.com/_/mysql/" target="_blank">READ HERE</a>
