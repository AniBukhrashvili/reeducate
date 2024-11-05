const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const PORT = 3000;
const DATA_FILE = path.join(__dirname, "data.json");

const randomHTML = `
        <html>
          <head>
            <title>EXAMPLE</title>
          </head>
          <body>
            <h1>ME</h1>
          </body>
        </html>`;

const randomData = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
  },
  {
    id: 4,
    name: "Bob Brown",
    email: "bob.brown@example.com",
  },
];

const server = http.createServer(async (req, res) => {
  if (req.method === "GET") {
    if (req.url === "/") {
      try {
        await fs.access(DATA_FILE);
        const data = await fs.readFile(DATA_FILE, "utf8");
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(data);
      } catch (error) {
        console.error("Error: ", error);
      }
    } else if (req.url === "/random") {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(randomNumber));
    } else if (req.url === "/html") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(randomHTML);
    } else if (req.url === "/current-time") {
      const currentTime = new Date().toISOString();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ currentTime }));
    } else if (req.url === "/api") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(randomData));
    }
  } else {
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
