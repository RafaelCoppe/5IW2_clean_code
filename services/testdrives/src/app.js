const express = require("express");
const app = express();

app.get("/", function(req, res) {
    return res.send("MS Essais de motos");
});

app.listen(3003, function(){
    console.log('Listening on port 3002');
});