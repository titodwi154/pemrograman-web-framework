// deno run --allow-net --allow-read app.ts
//1. import modul aplication dari https://deno.land/x/oak/mod.ts
import { Application, send } from 'https://deno.land/x/oak/mod.ts';
import router from './rute.ts';

//.2 new instance aplication ke variabel kita
const app = new Application();


app.use(router.routes())
app.use(router.allowedMethods());

app.use(async (context) => {
    await send(context, context.request.url.pathname, {
      root: `${Deno.cwd()}`
    });
  });

//4. jalankan server
console.log("service berjalan di port 8000");
await app.listen({port : 8000});

