import { User } from "../dB/modals/User.modal.js";
import { Review } from "../dB/modals/Review.modal.js";
import { Item } from "../dB/modals/Item.modal.js";
import { OrderBook } from "./Admin.controls.js";
import { Order } from "../dB/modals/Orders.modal.js";

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
  const MenuList = await Item.find({});
  res.json(MenuList);
};
export const GetReviews = async (req, res) => {
  return res.json(await Review.find({}));
};
export const GetMyOrders = async (req, res) => {
  const { customer } = req.body;
  return res.json(await Order.find({ customer }));
};
