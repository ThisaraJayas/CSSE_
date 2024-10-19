import mongoose from 'mongoose';

const WasteReqSchema = new mongoose.Schema(
  {
    binId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bin', // Reference to the 'Bin' model
      required: true, // binId is required
    },
    date: { 
      type: Date, 
      required: true, // Date is required
    },
    notes: {
      type: String, 
      required: true, 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model for user data
        required: true,
      },
      status: {
        type: String,
        default: 'Pending', // Default value for status
      },
  },
  { timestamps: true } // This will add createdAt and updatedAt fields automatically
);

const WasteRequest = mongoose.model('WasteRequest', WasteReqSchema);

export default WasteRequest;
