import { User } from "../dB/modals/User.modal.js";
import { Review } from "../dB/modals/Review.modal.js";
import { Order } from "../dB/modals/Orders.modal.js";
import Menu from "../dB/modals/Menu.modal.js";
import { response } from "express";

export const CreateUser = async (req, res) => {
  try {
    const { username, contact, ip, location } = req.body;

    // Basic validation
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }
    if (!contact) {
      return res.status(400).json({ message: "Contact is required" });
    }
    if (!ip || !location) {
      return res.status(400).json({ message: "IP and Location are required" });
    }

    const exists = await User.findOne({ username, contact, ip, location });

    if (exists) {
      return res.json({ message: "User Already Registered" });
    }

    // Save the new user to the database
    const newUser = await User.create({
      username,
      contact,
      ip,
      location,
    });

    // Return the created user with a 201 status code
    return res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      contact: newUser.contact,
      ip: newUser.ip,
      location: newUser.location,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const UpdateUser = async (req, res) => {
  const { username, ip, location, contact } = req.body;

  // Find a user by IP and update, or create a new user if not found
  const updatedUser = await User.findOneAndUpdate(
    { ip }, // Query: Find a user by IP
    { username, contact, ip, location }, // Update: Set these fields
    { upsert: true, new: true, runValidators: true } // Options: upsert = create if not found, new = return the updated document
  );

  // Return the updated or created user
  return res.status(200).json({
    _id: updatedUser._id,
    username: updatedUser.username,
    contact: updatedUser.contact,
    ip: updatedUser.ip,
    location: updatedUser.location,
  });
};
export const CreateReview = async (req, res) => {
  const { author, description } = req.body;
  const review = await Review.create({
    author,
    description,
  });
  return res.json({ review, message: "Review Added" });
};
export const GetMenu = async (req, res) => {
  const MenuList = await Menu.find({});
  res.json(MenuList);
};
export const GetReviews = async (req, res) => {
  return res.json(await Review.find({}));
};

export const GetMyOrders = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({ message: "Customer ID (_id) is required" });
    }

    const orders = await Order.find({ "customer._id": _id });

    return res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const LogoutUser = async (req, res) => {
  try {
    const { id } = req.params; // Get user ID from URL

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find and delete the user
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: `User ${id} logged out and deleted successfully` });
  } catch (error) {
    console.error("Error logging out and deleting user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const DeletePending = async (req, res) => {
  try {
    const { _id } = req.body;
  
    const order = await Order.findById(_id);
  
    if (!order) {
      return res.status(404).json({ message: "Order Not Found" });
    }
  
    if (order.order_status !== "PENDING") {
      return res.status(400).json({ message: `Order cannot be cancelled. Current status: ${order.order_status}` });
    }
  
    await Order.findByIdAndDelete(_id);
    return res.json({ message: "Order has been cancelled" });
  
  } catch (error) {
    console.error("Cancel Order Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
  
  
};
