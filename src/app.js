const express = require("express");
const path = require("path");
// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));
// console.log(__filename);
const hbs = require("hbs");
const app = express();
const forecast = require("./utils/forecast.js");
const geocode = require("./utils/geocode.js");
const { readdirSync } = require("fs");

//define paths for express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");
//setup handlebars engine and veiews location

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialpath);
//setup static directory to serve
app.use(express.static(publicDirectory));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather ",
    name: "Omkar Revankar",
  });
});

// app.get("/", (req, res) => {
//   res.send("<h1>Home</h1>");
// });

app.get("/help", (req, res) => {
  res.render("help", {
    msg: "this is just a msg  help ",
    title: "help",
    name: "Omkar Revankar",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "Omkar Revankar",
    title: "About",
  });
});

app.get("/weather", (req, res) => {
  // console.log(req.query.address);

  const addressNew = req.query.address;
  if (!req.query.address) {
    return res.send({
      error: "u must provide an address",
    });
  } else {
    // geocode(addressNew, (str, data) => {
    //   return res.status(str).send(data);
    // });
    geocode(addressNew, (str, data = {}) => {
      const string1 = str;
      const latitude = data.latitude;
      const longitude = data.longitude;
      const location = data.location;
      if (str) {
        return res.send({ error: str });
      }

      forecast(latitude, longitude, (str, data) => {
        if (str) {
          return res.send({ error: str });
        }
        res.send({
          forecast: data,
          location: location,
          address: addressNew,
        });
      });
    });
  }
  // res.send({
  //   forecast: "50 degrees",
  //   location: "safe place",
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send("plz provide the search term ");
  } else {
    res.send(`so u want ${req.query.search}`);
  }

  // res.send({
  //   products: [],
  // });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    err: "help article not found ",
    name: "Omkar Revankar",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    name: "Omkar Revankar",
    err: "page not found",
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server did start correctly ");
});
