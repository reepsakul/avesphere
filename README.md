# Setup

Bro wth am I even doing here :skull:

### env

`cp .env.dist .env` and write a password or sth

### Docker or sum

`docker compose up`
this creates two containers:

- app where the app is in (astonishing)
- db where the... yeah you get it
  db is a named volume for reasons explained at the [bottom](#remove-docker-volumes)

### Postgres or sum

`docker exec -it avesphere-db-1 psql -U avesphere`
opens db terminal

### Remove docker volumes:

`docker compose down -v`

`docker compose down` basically doesn't delete the explicitly named volumes
this is intentional to not lose the db content (that's why only the db is named volume)
this way we can mount several instances of that volume into different containers with content that is not in the image
but yeah, if we wanna unmount completely with also deleting named volumes (only the db in our case) we have to use the `-v` flag effectively
