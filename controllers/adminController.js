import asyncHandler from "express-async-handler";
import Lokacija from "../models/lokacijaModal.js";
import Panel from "../models/panelModal.js";

//Dohvacanje jedne lokacije
const getLocation = asyncHandler(async (req, res) => {
  const lokacija = await Lokacija.findById(req.params.id);
  console.log(lokacija);
  if (lokacija) {
    res.json(lokacija);
  } else {
    res.status(404);
    throw new Error("Lokacija ne postoji");
  }
});

//Dohvacanje svih lokacija
const getLocations = asyncHandler(async (req, res) => {
  const locations = await Lokacija.find({});
  res.json(locations);
});

//Dodavanje lokacije
const addLocation = asyncHandler(async (req, res) => {
  const { grad, adresa } = req.body;

  const locationExists = await Lokacija.findOne({ adresa });

  if (locationExists) {
    res.status(400);
    throw new Error("Lokacija vec postoji");
  }

  const location = await Lokacija.create({
    grad,
    adresa,
  });
  if (location) {
    res.status(201).json({
      _id: location._id,
      grad: location.grad,
      adresa: location.adresa,
    });
  } else {
    res.status(400);
    throw new Error("Pogrešni podaci za lokaciju");
  }
});

//Update lokacije
const updateLocation = asyncHandler(async (req, res) => {
  const location = await Lokacija.findById(req.params.id);

  if (location) {
    location.grad = req.body.grad || location.grad;
    location.adresa = req.body.adresa || location.adresa;

    const updateLocation = await location.save();

    res.json({
      _id: updateLocation._id,
      grad: updateLocation.grad,
      adresa: updateLocation.adresa,
    });
  } else {
    res.status(404);
    throw new Error("Lokacija za update ne postoji!!");
  }
});

//Brisanje lokacije
const deleteLocation = asyncHandler(async (req, res) => {
  const location = await Lokacija.findById(req.params.id);

  if (location) {
    await location.remove();
    res.json({ message: "Lokacija izbrisana" });
  } else {
    res.status(404);
    throw new Error("Lokacija za brisanje ne postoji!!");
  }
});

/*=================PANEL CONTROLLER========================*/
const addPanel = asyncHandler(async (req, res) => {
  const { dimenzija, id_lokacija, brojMjesta, opis } = req.body;

  const panelExists = await Panel.findOne({ id_lokacija });

  if (panelExists) {
    res.status(400);
    throw new Error("Panel na toj lokacij vec postoji");
  }
  const panel = await Panel.create({
    dimenzija,
    id_lokacija,
    brojMjesta,
    opis,
  });
  console.log(panel);

  if (panel) {
    res.status(201).json({
      dimenzija,
      id_lokacija,
      brojMjesta,
      opis,
    });
  } else {
    res.status(400);
    throw new Error("Greška prilikom dodavanja novog panela");
  }
});

const getPanelById = asyncHandler(async (req, res) => {
  const panel = await Panel.findById(req.params.id);

  if (panel) {
    res.json(panel);
  } else {
    res.status(404);
    throw new Error("Panel ne postoji");
  }
});

const getPanels = asyncHandler(async (req, res) => {
  const panel = await Panel.find({});

  if (panel) {
    res.json(panel);
  } else {
    res.status(404);
    throw new Error("Greška kod dohvacanja svih panela");
  }
});

const updatePanel = asyncHandler(async (req, res) => {
  const panel = await Panel.findById(req.params.id);

  if (panel) {
    panel.dimenzija = req.body.dimenzija || panel.dimenzija;
    panel.id_lokacija = req.body.id_lokacija || panel.id_lokacija;
    panel.brojMjesta = req.body.brojMjesta || panel.brojMjesta;
    panel.opis = req.body.opis || panel.opis;

    const updatePanel = await panel.save();

    res.json({
      _id: updatePanel._id,
      dimenzije: updatePanel.dimenzija,
      id_lokacija: updatePanel.id_lokacija,
      brojMjesta: updatePanel.brojMjesta,
      opis: updatePanel.opis,
    });
  } else {
    res.status(404);
    throw new Error("Panel za update ne postoji!!");
  }
});

const deletePanel = asyncHandler(async (req, res) => {
  const panel = await Panel.findById(req.params.id);

  if (panel) {
    await panel.remove();
    res.json({ message: "Panel uspjesno izbrisana" });
  } else {
    res.status(404);
    throw new Error("Panel za brisanje ne postoji!!");
  }
});

export {
  getLocation,
  getLocations,
  addLocation,
  updateLocation,
  deleteLocation,
  addPanel,
  getPanelById,
  getPanels,
  updatePanel,
  deletePanel,
};
