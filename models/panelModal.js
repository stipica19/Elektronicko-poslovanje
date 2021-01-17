import mongoose from "mongoose";

const panelSchema = mongoose.Schema(
  {
    dimenzija: {
      type: String,
      required: true,
    },
    id_lokacija: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lokacija",
      required: true,
    },
    brojMjesta: {
      type: Number,
      required: true,
    },
    opis: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Panel = mongoose.model("Panel", panelSchema);

export default Panel;
