
import mongoose from "mongoose";

const WasteTypeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // Linking to the user
  typeName: { type: String, required: true },
  rate: { type: Number, required: true },
  description: { type: String, required: true },
  refundableType: { type: Boolean, default: false },
  maxWeight: {
    type: String,
    required: true
},
  basedOnWeight: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const WasteType = mongoose.model('WasteType', WasteTypeSchema);

export default WasteType;