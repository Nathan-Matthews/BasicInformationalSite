var http = require('http');
var url = require('url');
var fs = require('fs');

const server = http.createServer((req, res) => {
    // q parses the url and makes the html file name.
    let q = url.parse(req.url, true);
    let filename = "." + q.pathname + ".html";
    // if the url doesn't have extension, assume index.html
    if(filename == "./.html"){
        filename = "./index.html";
    }

    // Reads the file name from the end of the url adn displays that html document.
    fs.readFile(filename, function(err,data){
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Page Not Found");
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

