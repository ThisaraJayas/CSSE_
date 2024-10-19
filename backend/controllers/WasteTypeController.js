import WasteType from "../models/WasteType.js";


export const createWasteType = async (req, res) => {
  const { userId, typeName, rate, description, maxWeight, refundableType, basedOnWeight } = req.body;

  try {
      const newWasteType = new WasteType({
          userId, // Assuming you're sending the userId in the request body
          typeName,
          rate,
          description,
          maxWeight,
          refundableType,
          basedOnWeight
      });
      await newWasteType.save();
      res.status(201).json(newWasteType);
  } catch (error) {
      res.status(500).json({ message: 'Error adding waste type', error });
  }
  };

  export const getWasteTypeById = async (req, res) => {
    const { id } = req.params;

    try {
        const wasteType = await WasteType.findById(id);
        if (!wasteType) return res.status(404).json({ message: 'Waste type not found' });
        res.status(200).json(wasteType);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching waste type', error });
    }
};

export const getWasteTypes = async (req, res) => {
  try {
      const wasteTypes = await WasteType.find();
      res.status(200).json(wasteTypes);
  } catch (error) {
      console.error('Error fetching waste types:', error); // Log the error to the console
      res.status(500).json({ message: 'Error fetching waste types', error });
  }
};
