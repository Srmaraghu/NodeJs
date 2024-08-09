const http = require('http');
const fs = require('fs');
const url=require('url');



// handler func to handle incoming requests using Nodejs
const myServer = http.createServer((req, res) => {

    if(req.url == "/favicon.ico")
        return res.end();

    const log = `${Date.now()}: ${req.method}, ${req.url}, New Request \n`;

    const myUrl= url.parse(req.url,true)
    // console.log(myUrl);

    fs.appendFile('log.txt', log, (err, data) => {
        switch (myUrl.pathname) {
            case '/':
                res.end("Request from Homepage")
                break;

            case "/about":
                const username= myUrl.query.myname
                const age=myUrl.query.age
                res.end(`Hi ${username} and you are ${age}`)
                break;
            
            case "/search":
                const search= myUrl.query.search_query;
                res.end('Here are your results for: '+search)

            case "/signup":
                if (req.method == "GET")
                    {
                        res.end("This is a signup form")
                    }
                else if(req.method=="POST")
                    {
                        //some db queries
                        res.end("Success")
                    }

            default:
                res.end("Error not found")

        }

    })

});



//port for a server
myServer.listen(8000, () => console.log("Server Stared"));