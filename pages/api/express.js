import express from "express";
const app = express();
const PORT = 4000;
export default function handler() {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

//   <div className="name">
//     <h1>Hello John</h1>
//   </div>;

  app.get("test", (req, res) => {
    res.send("Hello John");
  });
}
