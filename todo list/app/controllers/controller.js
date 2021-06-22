const Tarea = require('../models/tarea.js');

exports.create = (req,res) =>{
    if (!req.body) {
        res.status(400).send({
          message: 'Hay campos vacios!'
        });
      }
      console.log("REQ:BODY", req.body);
      const tarea = new Tarea ({
        titulo: req.body.Titulo,
        descripcion: req.body.Descripcion,
        fecha: req.body.Fecha,
        autor: req.body.Autor
      });
      Tarea.create(tarea, (err,data) =>{
        if (err)
        res.status(500).send({
          message:
            err.message || "Hubo un error al mandar la informacion"
        });
      else res.send(data);
      });
}

exports.getAll = (req, res) =>{
    Tarea.getAll((err,data) =>{
        if (err)
        res.status(500).send({
          message:
            err.message || "Hubo un error al mandar la informacion"
        });
        else res.send(data);
    });
};

exports.findByStatus0 = (req,res) =>{
  Tarea.findByStatus0((err,data) =>{
    if (err)
    res.status(500).send({
      message:
        err.message || "Hubo un error al mandar la informacion"
    });
    else res.send(data);
  });
};

exports.findByTitle = (req,res) =>{
    Tarea.findByTitle(req.params.titulo, (err,data) =>{
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `No existe el titulo ${req.params.titulo}`
              });
            } else {
              res.status(500).send({
                message: "Error recuperando " + req.params.titulo
              });
            }
          } else res.send(data);
    });
};


exports.modifyById = (req,res) =>{
    if (!req.body) {
        res.status(400).send({
          message: "No puede haber campos vacios"
        });
      }
    Tarea.modifyById(req.params.tareaTitulo, new Tarea(req.body), (err,data) =>{
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `No existe el titulo ${req.params.tareaTitulo}`
              });
            } else {
              res.status(500).send({
                message: "Error recuperando " + req.params.tareaTitulo
              });
            }
          } else res.send(data);
    });
};

exports.extra = (req,res) =>{
  if (!req.body) {
      res.status(400).send({
        message: "No puede haber campos vacios"
      });
    }
  Tarea.extra(req.params.tareaTitulo, req.body.Extra, (err,data) =>{
      if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `No existe el titulo ${req.params.tareaTitulo}`
            });
          } else {
            console.log(req.params.Extra);
            console.log(req.params.tareaTitulo);
            res.status(500).send({
              message: "Error recuperando el extra " + req.params.tareaTitulo
            });
          }
        } else res.send(data);
  });
};

exports.remove = (req,res) =>{
    Tarea.remove(req.params.tareaTitulo, (err,data) =>{
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `No existe el titulo ${req.params.tareaTitulo}`
              });
            } else {
              res.status(500).send({
                message: "Error borrando " + req.params.tareaTitulo
              });
            }
          } else res.send({ message: `Tarea borrada!` });
    });
};

exports.delete = (req,res) =>{
  if (!req.body) {
      res.status(400).send({
        message: "No puede haber campos vacios"
      });
    }
  Tarea.delete(req.params.tareaTitulo, (err,data) =>{
      if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `No existe el titulo ${req.params.tareaTitulo}`
            });
          } else {
            res.status(500).send({
              message: "Error recuperando " + req.params.tareaTitulo
            });
          }
        } else res.send(data);
  });
};