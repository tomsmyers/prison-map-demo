# Prison map demo

Runs a simple demo app on port 5000 showing prisons on an 
[Ordnance Survey Vector Tile](https://osdatahub.os.uk/docs/vts/overview) map.

## Node quickstart
 
```
npm install
OS_VECTOR_TILE_API_KEY=<api-key> npm run start:watch
```

## Docker quickstart

```
docker run --name=prison-map-demo -v$(pwd):/app -p5000:5000 -eOS_VECTOR_TILE_API_KEY=<api-key> node:lts-alpine /bin/sh -c 'cd /app && npm i && npm run start:watch'
```