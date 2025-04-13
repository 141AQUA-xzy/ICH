import { Item } from "../dB/modals/Item.modal.js";
import Menu from "../dB/modals/Menu.modal.js";
import { Order } from "../dB/modals/Orders.modal.js";
import { Review } from "../dB/modals/Review.modal.js";

export const CreateOrder = async (req, res) => {
  try {
    const { cart, customer, total, payment_status, order_status } = req.body;

    if (!cart || !customer || total === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newOrder = new Order({
      cart,
      customer,
      total,
      payment_status,
      order_status,
    });

    await newOrder.save();
    
    res.status(201).json({ message: "Order created" });
  } catch (error) {
    console.error("❌ Order Creation Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const OrderBook = async (req, res) => {
  try {
    // Fetch all orders and sort by createdAt in descending order (most recent first)
    const orders = await Order.find({}).sort({ createdAt: -1 });

    // Return the sorted orders
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const DeleteReview = async (req, res) => {
  const { _id } = req.params;

  await Review.findOneAndDelete({ _id });

  return res.json({ message: "Review Deleted" });
};

export const AddItem = async (req, res) => {
  try {
    const { Items } = req.body;

    // Validate if Items is an array and not empty
    if (!Array.isArray(Items)) {
      return res.status(400).json({ message: "Items must be an array" });
    }
    if (Items.length === 0) {
      return res.status(400).json({ message: "Items array cannot be empty" });
    }

    // Create all items in the array
    const createdItems = await Promise.all(
      Items.map(async (item) => {
        const { ItemName, Details, Price, AvlQuantities } = item;
        const newItem = await Item.create({
          ItemName,
          Details,
          Price,
          AvlQuantities,
        });
        return newItem;
      })
    );

    // Return the created items
    return res.status(201).json({
      message: "Items created successfully",
      items: createdItems,
    });
  } catch (error) {
    console.error("Error creating items:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const UpdateItem = async (req, res) => {
  const { _id } = req.params;

  const { Details, Price, AvlQuantities } = req.body;

  const item = await Item.findOneAndUpdate(
    { _id },
    { Details, Price, AvlQuantities }
  );
  return res.status(200).json({ message: "Item Updated", item });
};
export const DeleteItem = async (req, res) => {
  const { _id } = req.params;
  const deletedItem = await Item.findOneAndDelete({ _id });
  return res.json({ deletedItem, message: "Item Deleted Succesfully" });
};
export const Pricing = (req, res) => {};

export const OrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body; // Assuming order ID is sent from frontend

    if (!orderId) {
      return res.status(400).json({ error: "Order ID is required" });
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { _id: orderId }, // Correctly searching by order ID
      { order_status: status }, // Correctly updating order_status
      { new: true } // Returns the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ success: true, message: "Order Approved", order: updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const GetOrderOfStatus = async (req, res) => {
  try {
    const { order_status } = req.body;
    const orders = await Order.find({ order_status });
    res.json({
      orders: orders,
    });
  } catch (error) {
    res.json({ message: `${error.message}` });
  }
};

export const MenuControl = async (req, res) => {
  try {
    const { menu } = req.body;

    if (!menu) {
      return res.status(400).json({ message: "Menu data is required" });
    }

    // ✅ Save or update menu with `AVL` status
    const updatedMenu = await Menu.findOneAndUpdate(
      { _id: "67e3bb0bdb3bfe9b72131166" },
      { menu }, // ✅ Updates full menu including `AVL`
      { new: true, upsert: true }
    );

    res.json({ success: true, menu: updatedMenu.menu });
  } catch (error) {
    console.error("❌ Error updating menu:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const ClearOrders = async (req, res) => {
  try {
    await Order.deleteMany({}); // ✅ Deletes all documents in the collection
    res.json({ message: "Cleaned Up ORDER-BOOK" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const ClearReviews = async (req, res) => {
  try {
    await Review.deleteMany({}); // ✅ Deletes all documents in the collection
    res.json({ message: "Cleaned Up Reviews" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const RestaurantStatus = async (req, res) => {
  try {
    // 🔹 Find the first menu document (since status is a global field)
    const menu = await Menu.findOne();
    if (!menu) return res.status(404).json({ message: "Menu not found" });

    // 🔹 Toggle the status
    menu.status = !menu.status;
    await menu.save(); // ✅ Save the updated status

    res.json({ message: "Status updated", status: menu.status }); // ✅ Send back updated status
  } catch (error) {
    console.error("❌ Error updating status:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Add another endpoint to GET current status
export const GetRestaurantStatus = async (req, res) => {
  try {
    const menu = await Menu.find();
    if (!menu) return res.status(404).json({ message: "Menu not found" });

    res.json({ status: menu[0]?.status }); // ✅ Send back status
  } catch (error) {
    console.error("❌ Error fetching status:", error);
    res.status(500).json({ message: error.message });
  }
};

//edit existing

// export const MenuControl = async (req, res) => {
//   try {
//     const { menu } = req.body;

//     if (!menu || Object.keys(menu).length === 0) {
//       return res.status(400).json({ message: "Menu data is required" });
//     }

//     const existingMenu = await Menu.findOne();
//     if (existingMenu) {
//       existingMenu.menu = menu; // ✅ Update existing menu
//       await existingMenu.save();
//       return res.status(200).json({ message: "Menu updated successfully", menu: existingMenu });
//     } else {
//       const newMenu = new Menu({ menu });
//       await newMenu.save();
//       return res.status(201).json({ message: "Menu saved successfully", menu: newMenu });
//     }
//   } catch (error) {
//     console.error("❌ Error saving/updating menu:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };



// Your 66 menu items as a flat object
const updatedMenuItems = {
  "Student Thali": { "price-hf": 79, "price-fl": 99, AVL: true },
  "Standard Thali": { "price-hf": 109, "price-fl": 129, AVL: true },
  "Executive Thali": { "price-hf": 119, "price-fl": 139, AVL: true },
  "Premium Thali": { "price-hf": 139, "price-fl": 159, AVL: true },
  "Matar paneer": { "price-hf": 69, "price-fl": 139, AVL: true },
  "Sahi paneer": { "price-hf": 99, "price-fl": 179, AVL: true },
  "Butter paneer": { "price-hf": 99, "price-fl": 179, AVL: true },
  "Paneer punjabi": { "price-hf": 89, "price-fl": 169, AVL: true },
  "Paneer bhurji": { "price-hf": 119, "price-fl": 199, AVL: true },
  "Paneer masala": { "price-hf": 89, "price-fl": 169, AVL: true },
  "Paneer butter masala": { "price-hf": 109, "price-fl": 189, AVL: true },
  "Paneer lababdar": { "price-hf": 109, "price-fl": 189, AVL: true },
  "Paneer pasanda": { "price-hf": 109, "price-fl": 189, AVL: true },
  "Paneer do payaza": { "price-hf": 99, "price-fl": 179, AVL: true },
  "Kadai paneer": { "price-hf": 109, "price-fl": 189, AVL: true },
  "Paneer chatpata": { "price-hf": 119, "price-fl": 199, AVL: true },
  "Paneer malai": { "price-hf": 109, "price-fl": 189, AVL: true },
  "Palak paneer": { "price-hf": 89, "price-fl": 169, AVL: true },
  "Methi matar malai": { "price-hf": 109, "price-fl": 189, AVL: true },
  "Kaju butter masala": { "price-hf": 119, "price-fl": 199, AVL: true },
  "Aloo jeera": { "price-hf": 49, "price-fl": 89, AVL: true },
  "Gobhi masala": { "price-hf": 69, "price-fl": 119, AVL: true },
  "Sev tamatar": { "price-hf": 49, "price-fl": 89, AVL: true },
  "Bhindi masala": { "price-hf": 59, "price-fl": 109, AVL: true },
  "Mixed veg": { "price-hf": 59, "price-fl": 109, AVL: true },
  "Paneer handi (Chef Special)": { "price-hf": 129, "price-fl": 229, AVL: true },
  "Tawa roti": { "price-hf": null, "price-fl": 7, AVL: true },
  "Tawa butter roti": { "price-hf": null, "price-fl": 10, AVL: true },
  "Aloo paratha": { "price-hf": null, "price-fl": 49, AVL: true },
  "Gobhi paratha": { "price-hf": null, "price-fl": 59, AVL: true },
  "Paneer paratha": { "price-hf": null, "price-fl": 69, AVL: true },
  "Boondi raita": { "price-hf": 29, "price-fl": 39, AVL: true },
  "Plain raita": { "price-hf": 19, "price-fl": 29, AVL: true },
  "Simple salad": { "price-hf": null, "price-fl": 39, AVL: true },
  "Green salad": { "price-hf": null, "price-fl": 49, AVL: true },
  "Mixed salad": { "price-hf": null, "price-fl": 59, AVL: true },
  "Veg (Steam/Fried) Momos": { "price-hf": 69, "price-fl": 99, AVL: true },
  "Veg Crispy Momos": { "price-hf": null, "price-fl": 129, AVL: true },
  "Paneer (Steam/Fried) Momos": { "price-hf": 79, "price-fl": 99, AVL: true },
  "Paneer Crispy Momos": { "price-hf": null, "price-fl": 139, AVL: true },
  "Veg Fried Rice": { "price-hf": 69, "price-fl": 139, AVL: true },
  "Veg Szechwan Fried Rice": { "price-hf": 79, "price-fl": 159, AVL: true },
  "Manchurian Fried Rice": { "price-hf": 99, "price-fl": 179, AVL: true },
  "Paneer Fried Rice": { "price-hf": 99, "price-fl": 179, AVL: true },
  "Paneer Szechwan Fried Rice": { "price-hf": 99, "price-fl": 179, AVL: true },
  "Veg Noodles": { "price-hf": 59, "price-fl": 109, AVL: true },
  "Hakka Noodles": { "price-hf": 79, "price-fl": 159, AVL: true },
  "Veg Szechwan Noodles": { "price-hf": 79, "price-fl": 159, AVL: true },
  "Chilli Garlic Noodles": { "price-hf": 89, "price-fl": 179, AVL: true },
  "Manchurian Noodles": { "price-hf": 89, "price-fl": 179, AVL: true },
  "Paneer Noodles": { "price-hf": 89, "price-fl": 179, AVL: true },
  "Paneer Szechwan Noodles": { "price-hf": 89, "price-fl": 179, AVL: true },
  "Veg Manchurian": { "price-hf": 69, "price-fl": 139, AVL: true },
  "Chilli Paneer": { "price-hf": 129, "price-fl": 259, AVL: true },
  "All Mix": { "price-hf": 99, "price-fl": 199, AVL: true },
  "Red Sauce Pasta": { "price-hf": null, "price-fl": 129, AVL: true },
  "White Sauce Pasta": { "price-hf": null, "price-fl": 139, AVL: true },
  "Mixed Sauce Pasta": { "price-hf": null, "price-fl": 139, AVL: true },
  "Dal Fry": { "price-hf": 49, "price-fl": 89, AVL: true },
  "Dal Tadka": { "price-hf": 69, "price-fl": 109, AVL: true },
  "Plain Rice": { "price-hf": 39, "price-fl": 69, AVL: true },
  "Jeera Rice": { "price-hf": 49, "price-fl": 89, AVL: true },
  "Matar Rice": { "price-hf": 49, "price-fl": 89, AVL: true },
  "Masala Khichdi": { "price-hf": 59, "price-fl": 99, AVL: true },
  "Sadi Khichdi": { "price-hf": 49, "price-fl": 89, AVL: true }
};

export const UpdateMenu = async (req, res) => {
  try {
    const menuId = "67e3bb0bdb3bfe9b72131166";

    const menuMap = new Map(Object.entries(updatedMenuItems));

    const updated = await Menu.findByIdAndUpdate(
      menuId,
      { menu: menuMap },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Menu not found" });
    }

    return res.status(200).json({
      message: "Menu updated successfully",
      updatedMenu: updated.menu,
    });
  } catch (error) {
    console.error("Error updating menu:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
