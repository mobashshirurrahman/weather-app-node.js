const path = require("path");
const express = require("express");
const { hasSubscribers } = require("diagnostics_channel");
const hbs = require("hbs");


const app = express();
const port = process.env.PORT || 3000

const geocode = require("./utils/geocode");
const forcast = require("./utils/forcast");

// define path for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPaths = path.join(__dirname, "../templates/partials");

// Set up handlebar engine and view ocation

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPaths);
// set up static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Mobashshir",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Mob",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message:
      "Type the location in the search box to get forcast!",
    title: "Help",
  });
});
// app.get("/weather",(req, res)=>{
//     res.send({
//         forcast:"25",
//         location:"Patna"
//     });
// });
// app.get("/about",(req, res)=>{
//     res.send("<h1>About</h1>");
// });

// app.get("/help",(req, res)=>{
//     res.send('<html><h1>Hello to help</h1></html>');
// });
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      message: "Enter Address",
    });
  }
  console.log(req.query.address);
  geocode(req.query.address, (error, data) => {
    if (error != undefined) {
      return res.send({
        error: error,
      });
    }
    forcast(req.query.address, (error, for_temp) => {
      if (error != undefined) {
        return res.send({
          error: error,
        });
      }
      console.log(for_temp);
      res.send({
        title: "Weather app",
        name: "Mobashshir",
        address: req.query.address,
        geocode: data.place_name,
        forcast: for_temp,
      });
    });
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    message: "Page not Found",
  });
});

app.listen(port, () => {
  console.log("Server is up and running at 3000!");
});
