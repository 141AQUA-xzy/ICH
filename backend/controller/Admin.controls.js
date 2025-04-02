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

    console.log("✅ New Order Created:", newOrder);

    res.status(201).json({ message: "Order created & notifications sent!" });
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

// Save admin push notification subscription
export const saveSubscription = async (req, res) => {
  try {
    const { endpoint, keys } = req.body;

    // Avoid duplicates
    const existingSub = await SubscriptionModal.findOne({ endpoint });
    if (!existingSub) {
      await SubscriptionModal.create({ endpoint, keys });
    }
    res.status(201).json({ message: "Subscription saved!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
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
