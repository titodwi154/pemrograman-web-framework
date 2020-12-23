import { renderFileToString } from 'https://deno.land/x/dejs/mod.ts';
import { select,  } from '../models/pg_models.ts';
import TSql from '../models/sql.ts';

const home = async({response} : {response : any}) => {
    const dataTable = await select(
        [
            {text : TSql['KtgFindAll']},
            {text : TSql['BlogInfoFindAll']}
        ]
        )
    const html = await renderFileToString("./views/home.ejs", {
        data :{
            pemrograman : dataTable[0],
            blogInfo : dataTable[1]
        },
        subview :{
            namafile : "./views/blog-main.ejs",
            showjumbotron : true
        }
    });
    response.body = new TextEncoder().encode(html);
 }
const signup = async({response} : {response : any}) => {
    const html = await renderFileToString("./views/home.ejs", {
        data : {
            pemrograman : await select({
                text : TSql['KtgFindInKode'],
                args : ['php','ts', 'js']
            }),
            blogInfo : await select({
                text : TSql['BlogInfoFindAll']
            })
        },
        subview : {
            namafile : "./views/signup.ejs",
            showjumbotron : false
        }
    });
    response.body = new TextEncoder().encode(html);
}

const saveuser = async({ request, response} : {request : any, response : any}) => {
     const body = await request.body();

     const namalengkap = body.value.get("fullname");
     const namauser = body.value.get("username");
     const pwd = body.value.get("paswd");

     response.body = "Data yg di POST : "+namalengkap+" ,"+namauser+" ,"+pwd;
 }

export { home, signup, saveuser }