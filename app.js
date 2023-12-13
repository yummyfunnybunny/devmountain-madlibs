import express from "express";
import morgan from "morgan";
import nunjucks from "nunjucks";
import sample from "lodash.sample";
import path from "path";
import url from "url";

const rootDir = url.fileURLToPath(new URL(".", import.meta.url));

const app = express();
const port = "8000";

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

// Run the server.
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${server.address().port}...`);
});

const COMPLIMENTS = [
  "awesome",
  "terrific",
  "fantastic",
  "neato",
  "fantabulous",
  "wowza",
  "oh-so-not-meh",
  "brilliant",
  "ducky",
  "coolio",
  "incredible",
  "wonderful",
  "smashing",
  "lovely",
];

// Display the homepage
app.get("/", (req, res) => {
  res.render("index.html");
});

// Display a form that asks for the user's name.
app.get("/hello", (req, res) => {
  res.render("hello.html");
});

// Handle the form from /hello and greet the user.
app.get("/greet", (req, res) => {
  const compliment = sample(COMPLIMENTS);
  const name = req.query.name || "stranger";
  res.render("greet.html.njk", { name: name, compliment: compliment });
});

app.get("/game", (req, res) => {
  // res.render("greet.html.njk");
  const play = req.query.play;
  // console.log(playGame);
  console.log(play);
  if (play === "yes") {
    res.render("game.html.njk");
  } else if (play === "no") {
    res.render("goodbye.html.njk");
  }
});

app.get("/madlib", (req, res) => {
  console.log(`req.query`);
  console.log(req.query);
  const { name, color, noun, adjective } = req.query;
  res.render("madlib.html.njk", {
    name: name,
    color: color,
    noun: noun,
    adjective: adjective,
  });
});
