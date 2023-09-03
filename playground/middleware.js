




app.use((req, res, next) => {
    console.log(req.method, req.path);
  });


  
app.use((req, res, next) => {
    if (req.method === "GET") {
      res.send("Get requests are disabled !");
    } else {
      next();
    }
    console.log(req.method, req.path);
  });


  app.use((req, res, next) => {
    res.status(503).send('Site is currently down ,Check back soon!')
  });