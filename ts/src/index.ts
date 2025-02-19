import fastify from 'fastify';
import fastify_view from "@fastify/view";
import fastify_static from "@fastify/static";
import { Liquid } from "liquidjs";
import path from "path";
import { IpcNetConnectOpts } from 'net';

const app = fastify({
    logger: true,
    ignoreTrailingSlash: true,
});

const dirname = path.resolve(path.dirname(""));

const engine = new Liquid({
    root: path.join(dirname, "views"),
    extname: ".liquid",
});

app.register(fastify_view, {
    engine: {
      liquid: engine,
    },
});


// app.register(fastify_static, {
//     root: path.join(dirname, "static"),
//     prefix: "/static/",
// });

interface IParamsThing {
    query: string;
}

app.get("/", async (req, res) => {
    return res.view("./views/template.liquid", {lang: "TypeScript/Javascript", engine: "Fastify"});
});

app.get<{Params: IParamsThing}>("/search/:query", (req, res) => {
    const {query} = req.params;
    return res.view("./views/search.liquid", {query: query});
});


app.listen({port: 8080}, (err, address) => {
    if (err){
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`)
});
