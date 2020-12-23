import { Router } from 'https://deno.land/x/oak/mod.ts';
import { home, signup, saveuser} from './controllers/blog.ts';

const router = new Router(); 

router 
    .get ("/", home )
    .get ("/daftar", signup ) 
    .post ("/simpanuser", saveuser)
    .get ("/kategori", async(ctx) =>{
        ctx.response.body = "ini halaman kategori";
    });

export default router;

