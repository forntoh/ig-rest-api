import IG from "./api";

const ig = new IG(process.env.IG_API_KEY, true);

// Using promises
ig.login(process.env.IG_USERNAME, process.env.IG_USERNAME)
  // Response data is automatically
  // passed to the resolve callback
  // .then((summary) => {
  //   console.log("summary:", summary);
  //   // Once logged in, use the shorthand
  //   // get(), post(), put() and delete()
  //   // methods to interact with IG's API
  //   ig.get("positions").then((positions) => {
  //     console.log("positions:", positions);
  //   });
  // })
  // Errors are automatically transformed
  // into a more user friendly format with
  // the response status and IG error code
  .catch(console.error);

// Using async await
// try {
//   await ig.login(username, password);
//   const positions = await ig.get("positions");
//   console.log("positions:", positions);
// } catch (error) {
//   console.error(error);
// }

// const express = require("express");
// const app = express();
// const port = 3000;

// const IG = require("./ig.js");

// const ig = new IG("f201f8d7ff222f525a9d25a22b889125ec2c63ab");
// // const ig = new IG("a0b3953d597e2179bdbe0cf4a10ba41f5d51283e", false);

// app.use(express.urlencoded({ extended: true }));

// app.get("/prices", async (req, res) => {
//   try {
//     const evening = await ig.prices({
//       epic: "IX.D.DAX.IFD.IP",
//       resolution: "MINUTE_5",
//       from: "2021-11-03T21:00:00",
//       to: "2021-11-03T21:00:00",
//     });

//     const morning = await ig.prices({
//       epic: "IX.D.DAX.IFD.IP",
//       resolution: "MINUTE_5",
//       from: "2021-11-04T07:00:00",
//       to: "2021-11-04T07:00:00",
//     });

//     const recent = await ig.prices({
//       epic: "IX.D.DAX.IFD.IP",
//       resolution: "MINUTE_5",
//       from: "2021-11-04T06:00:00",
//       to: "2021-11-04T06:55:00",
//     });

//     const gapEvening = evening[0].closePrice.bid - evening[0].openPrice.bid;
//     const gapMorning = morning[0].closePrice.bid - morning[0].openPrice.bid;

//     const aM = gapEvening >= 0.0 ? "bull" : "bear";
//     const bM = gapMorning >= 0.0 ? "bull" : "bear";

//     recent.sort((a, b) => (a.highPrice.bid < b.highPrice.bid ? 1 : -1));

//     const topDist =
//       morning[0].closePrice.bid -
//       recent[0].highPrice.bid +
//       (morning[0].openPrice.bid - morning[0].openPrice.ask);
//     const bottomDist = morning[0].closePrice.bid - evening[0].openPrice.bid;

//     res.json({
//       "21:00": { ...evening[0], aM },
//       "07:00": { ...morning[0], bM },
//       recentHigh: recent[0],
//       topDist,
//       bottomDist,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.get("/logout", (req, res) => {
//   ig.logout()
//     .then((r) => res.send(r))
//     .catch((e) => res.send(e));
// });

// app.listen(port, () => {
//   ig.login({
//     identifier: "forntoh",
//     password: "N@$?MabX84tt6c6S",
//   });
//   //   .then((res) => console.log(res));
// });