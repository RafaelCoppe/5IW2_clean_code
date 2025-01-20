const express = require("express");
const app = express();

app.get("/", function(req, res) {
    return res.send("MS Pièces Détachées");
});

app.listen(3002, function(){
    console.log('Listening on port 3002');
});