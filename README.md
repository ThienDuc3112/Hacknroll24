# Spotify queue sharer

This **was** the repo for my (first) attempt at a 24h hackathon

It has now converted to a normal project

Env variables needed:
- Backend:
  - `PORT`: The port of the server
  - `SPOTIFY_TOKEN`: Spotify client secret
  - `SPOTIFY_CLIENT_ID`: Spotify client id
  - `REDIRECT_URI`: Spotify redirect url
  - `CLIENT_URL`: Client url, for enabling cors on socket.io
- Client:
  - `API_URL`: URL of server, can be changed in src/public/constants.ts as well

To run: 
- Add in all the require env variables
- Create 2 terminal instance, one at the client folder, one at server
- run `npm run dev` on both