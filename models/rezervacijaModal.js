import mongoose from "mongoose";

const rezervacijaSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    panel: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Panel",
    },
    cijena: {
      type: Number,
      required: true,
    },
    odDatuma: {
      type: Date,
      required: true,
    },
    doDatuma: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Rezervacija = mongoose.model("Rezervacija", rezervacijaSchema);

export default Rezervacija;
