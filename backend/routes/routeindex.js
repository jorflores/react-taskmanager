const express = require("express");
const router = express();
const Task = require("../model/task");


// Nos regresaria las tareas guardadas en la BD con el método find(). Una vez obtenidas las tareas las regresamos a la pagina principal.

router.get("/api/tasks", async function (req, res) {
  let tasks = await Task.find();
  console.log(tasks);

  res.json(tasks);
});

router.get("/api/tasks/:id", async function (req, res) {
  let tasks = await Task.findById(req.params.id)
  console.log(tasks);
  res.json(tasks);
});


router.post("/api/addTask", async (req, res) => {
  let task = new Task(req.body);
  console.log(req.body);
  console.log("Task values from body" + task);
  let status = await task.save();
  console.log(status);
  res.json("ok");
});

router.delete("/api/delete/:id", async (req, res) => {
  let id = req.params.id;
  await Task.deleteOne({ _id: id });
  res.json("ok");
});

router.put("/api/change_status/:id", async (req, res, next) => {
  let id = req.params.id;
  let task = await Task.findById(id);
  task.status = !task.status;
  await task.save();
  res.json("ok");
});

router.put("/api/editTask/", async (req, res) => {
  console.log(req.body.id)
  await Task.updateOne({ _id: req.body.id }, req.body);

  res.json("ok");
});



module.exports = router;
