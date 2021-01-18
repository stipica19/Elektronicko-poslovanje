import express from "express";
const router = express.Router();

import {
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
  addRezervacija,
} from "../controllers/adminController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router
  .route("/lokacije")
  .post(protect, admin, addLocation) //radi
  .get(protect, admin, getLocations); //radi

//Rute za jednu lokaciju
router
  .route("/lokacije/:id")
  .delete(protect, admin, deleteLocation) //radi
  .get(protect, admin, getLocation) //radi
  .put(protect, admin, updateLocation);

/*==========RUTE ZA PANEL ============ */
router
  .route("/paneli")
  .post(protect, admin, addPanel) //radi
  .get(getPanels) //radi
  .post(protect, addRezervacija);

router.route("/paneli/:id/dodavanjeRezervacije").post(protect, addRezervacija);

router
  .route("/paneli/:id")
  .delete(protect, admin, deletePanel) //radi
  .get(getPanelById) //radi
  .put(protect, admin, updatePanel);

export default router;
