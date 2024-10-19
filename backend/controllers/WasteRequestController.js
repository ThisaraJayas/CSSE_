import WasteRequest from '../models/WasteRequest.js'; 

export const createWasteRequest = async (req, res) => {
  try {
    const { binId, date, notes, userId } = req.body;  
    console.log("CREATE", binId);
    
    // const userId = req.user.userId;

    // if (!userId) {
    //   return res.status(400).json({ message: 'User not authenticated.' });
    // }

    const newWasteRequest = new WasteRequest({
      binId,
      date,
      notes,
      userId, 
    });

    await newWasteRequest.save();

    return res.status(201).json({
      message: 'Waste request created successfully',
      wasteRequest: newWasteRequest,
    });

  } catch (error) {
    console.error('Error creating waste request:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


export const getWasteRequestsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const wasteRequests = await WasteRequest.find({ userId });

    if (!wasteRequests.length) {
      return res.status(404).json({ message: 'No waste requests found for this user.' });
    }

    return res.status(200).json({
      message: 'Waste requests retrieved successfully',
      wasteRequests,
    });

  } catch (error) {
    console.error('Error fetching waste requests:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getAllWasteRequests = async (req, res) => {
  try {
      const wasteRequests = await WasteRequest.find();

      if (!wasteRequests.length) {
          return res.status(404).json({ message: 'No waste requests found.' });
      }

      return res.status(200).json({
          message: 'Waste requests retrieved successfully',
          wasteRequests,
      });

  } catch (error) {
      console.error('Error fetching waste requests:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateWasteRequestStatus = async (req, res) => {
  try {
      const { status } = req.body;
      const { requestId } = req.params;

      const updatedRequest = await WasteRequest.findByIdAndUpdate(requestId, { status }, { new: true });

      if (!updatedRequest) {
          return res.status(404).json({ message: 'Waste request not found.' });
      }

      return res.status(200).json({
          message: 'Waste request status updated successfully',
          wasteRequest: updatedRequest,
      });

  } catch (error) {
      console.error('Error updating waste request status:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
};