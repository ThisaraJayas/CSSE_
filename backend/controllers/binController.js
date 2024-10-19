// controllers/binController.js
import Bin from "../models/Bin.js";
import generateQRCode from "../utils/qrCodeGenerator.js";

// Add a new bin
export const addBin = async (req, res) => {
  try {
    const { ownerId, binType, location } = req.body;

    // Validate input
    if (!ownerId || !binType || !location || !location.lat || !location.lng) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create new bin
    const newBin = new Bin({ ownerId, binType, location });

    // Save to the database
    await newBin.save();

    res.status(201).json({ message: "Bin added successfully", bin: newBin });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Get bins for a specific user
export const getUserBins = async (req, res) => {
  try {
    const userId = req.user._id; // Get userId from the authenticated user
    const bins = await Bin.find({ ownerId: userId });

    if (!bins.length) {
      return res.status(404).json({ message: "No bins found for this user" });
    }

    res.status(200).json(bins);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching user bins", error: err.message });
  }
};
// Get all bins
export const getAllBins = async (req, res) => {
  try {
    const bins = await Bin.find(); // Retrieve all bins from the database

    if (!bins.length) {
      return res.status(404).json({ message: "No bins found" });
    }

    res.status(200).json(bins); // Return the bins
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching bins", error: err.message });
  }
};
export const verifyBin = async (req, res) => {
  try {
    const { binId } = req.params;
    const bin = await Bin.findById(binId);

    if (!bin) {
      return res.status(404).json({ message: "Bin not found" });
    }

    if (bin.isVerified) {
      return res.status(400).json({ message: "Bin is already verified" });
    }

    // Generate QR code with bin coordinates and waste type
    const qrData = `Type: ${bin.binType}, Location: (${bin.location.lat}, ${bin.location.lng})`;
    const qrCode = await generateQRCode(qrData);

    bin.isVerified = true;
    bin.qrCode = qrCode;
    await bin.save();

    res
      .status(200)
      .json({ message: "Bin verified and QR code generated", bin });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error verifying bin", error: err.message });
  }
};

// Reject bin
export const rejectBin = async (req, res) => {
  try {
    const { binId } = req.params;
    const bin = await Bin.findById(binId);

    if (!bin) {
      return res.status(404).json({ message: "Bin not found" });
    }

    res.status(200).json(bins);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching user bins", error: err.message });
  }
};

//binMAPuseriD
export const GetBinByUserId = async (req, res) => {
  try {
    const userId = req.params.userId; // Read userId from the URL path
    const bins = await Bin.find({ ownerId: userId });
    console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDD", bins);

    if (!bins.length) {
      return res.status(404).json({ message: "No bins found for this user" });
    }

    res.status(200).json(bins);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching user bins", error: err.message });
  }
};


export const addWeight = async (req, res) => {
  try {
    const { binId } = req.params;
    const { weight } = req.body;

    const bin = await Bin.findByIdAndUpdate(
      { _id: binId },
      { weight },
      { new: true }
    );
    res.status(200).json(bin);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding weight to bin", error: err.message });
  }
};

// Get all bins
// export const getAllBins = async (req, res) => {
//   try {
//     const bins = await Bin.find(); // Retrieve all bins from the database

//     if (!bins.length) {
//       return res.status(404).json({ message: 'No bins found' });
//     }

//     await bin.deleteOne();


//     res.status(200).json({ message: 'Bin rejected and removed' });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: 'Error rejecting bin', error: err.message });
//   }
// };


