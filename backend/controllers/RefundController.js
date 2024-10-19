import Refund from '../models/RefundModel.js';

export const createRefund = async (req, res) => {
    const { amount, note, userId } = req.body;
  
    try {
      const refund = new Refund({
        amount,
        note,
        userId,
      });
  
      await refund.save();
      res.status(201).json({ message: 'Refund created successfully', refund });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

  export const getAllRefunds = async (req, res) => {
    try {
      const refunds = await Refund.find().populate('userId', 'name'); // assuming User model has a 'name' field
      res.status(200).json(refunds);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  // Update Refund Status (Accept/Reject)
  export const updateRefundStatus = async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
  
    try {
      const refund = await Refund.findById(id);
  
      if (!refund) {
        return res.status(404).json({ message: 'Refund not found' });
      }
  
      refund.status = status;
      await refund.save();
      res.status(200).json({ message: `Refund ${status.toLowerCase()} successfully`, refund });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };