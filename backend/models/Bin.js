import mongoose from "mongoose";

const binSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    binType: { type: String, required: true },
    location: {
      type: {
        lat: { type: Number, required: true }, // Latitude
        lng: { type: Number, required: true }, // Longitude
      },
      required: true,
    },
    weight: { type: Number },
    qrCode: { type: String }, // QR code generated after verification
    isVerified: { type: Boolean, default: false },
    wasteKilos: { type: Number },
  },
  { timestamps: true }
);

const Bin = mongoose.model("Bin", binSchema);

export default Bin;
