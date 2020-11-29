import { Application, Context, Router } from "https://deno.land/x/oak/mod.ts";
import {renderFileToString} from "https://deno.land/x/dejs/mod.ts";
import {Bookings} from "./bookingDb.ts";

const app = new Application();
const router = new Router();

router.get("/",async (ctx) => {

    var path = Deno.cwd() + "/EjsWebserver/ejsFiles/index.ejs";
    console.log("The file is here: " + path)
    var body = await renderFileToString(path, {
        title:"All guests",
        bookings:Bookings
    });

    ctx.response.body = body;
});

router.get("/bookings/:id",async (ctx) => {

    var path = Deno.cwd() + "/EjsWebserver/ejsFiles/booking.ejs";
    console.log("The file is here: " + path)

    var id = ctx.params.id;
    var bookingById;

    for (let index = 0; index < Bookings.length; index++) {
        if(id && Bookings[index].id == +id){ //+ turns string into a number
            bookingById = Bookings[index];
            break;
        }
    }

    var body = await renderFileToString(path, {
        title:"Overview of a booking",
        booking:bookingById
    });

    ctx.response.body = body;

});

app.addEventListener('listen',() => {
    console.log("Server läuft");
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({port:8000});

// deno run --allow-net --allow-read path/to/file