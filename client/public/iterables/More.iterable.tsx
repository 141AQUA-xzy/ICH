"use client"
import PersonPinIcon from "@mui/icons-material/PersonPin"; // ✅ Import the icon correctly
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ShareIcon from '@mui/icons-material/Share';
import LogoutIcon from '@mui/icons-material/Logout';
import CollectionsIcon from '@mui/icons-material/Collections';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import PolicyIcon from '@mui/icons-material/Policy';
import { toast } from "react-hot-toast";
import RateReviewIcon from '@mui/icons-material/RateReview';

// Toast function for notifications
const Toast = (message: string, icon: string) => {
  toast.success(message, {
    duration: 4000,
    style: {
      fontWeight: 600,
      background: "#FCA331",
      borderRadius: "25px",
    },
    icon,
  });
};

export const MoreIterator = (router: any, logout: () => void, clearCart: () => void) => [
  {
    title: "My Profile",
    icon: PersonPinIcon, // ✅ Pass the component reference, NOT JSX
    handleClick: () => {
      alert("Profile Clicked");
    },
  },
  {
    title: "Your Orders",
    icon: ShoppingBagIcon, // ✅ Pass the component reference, NOT JSX
    handleClick: () => {
      router.push("/order-bag")
    },
  },
  {
    title: "Our Services",
    icon: ShoppingBasketIcon, // ✅ Pass the component reference, NOT JSX
    handleClick: () => {
      alert("Profile Clicked");
    },
  }, {
    title: "ICH Gallery",
    icon: CollectionsIcon, // ✅ Pass the component reference, NOT JSX
    handleClick: () => {
      alert("Profile Clicked");
    },

  },
  {
    title: "See Reviews",
    icon: RateReviewIcon, // ✅ Pass the component reference, NOT JSX
    handleClick: () => {
      alert("Profile Clicked");
    },
  },
  {
    title: "Sponsorship",
    icon: SensorOccupiedIcon, // ✅ Pass the component reference, NOT JSX
    handleClick: () => {
      alert("Profile Clicked");
    },
  },
  {
    title: "View Offers",
    icon: LocalOfferIcon, // ✅ Pass the component reference, NOT JSX
    handleClick: () => {
      alert("Profile Clicked");
    },
  },
  {
    title: "How to ?",
    icon: QuestionMarkIcon, // ✅ Pass the component reference, NOT JSX
    handleClick: () => {
      alert("Profile Clicked");
    },
  },
  {
    title: "Terms & Usage",
    icon: PolicyIcon, // ✅ Pass the component reference, NOT JSX
    handleClick: () => {
      alert("Profile Clicked");
    },
  },
  {
    title: "Share",
    icon: ShareIcon, // ✅ Pass the component reference, NOT JSX
    handleClick: () => {
      alert("Profile Clicked");
    },
  },
  {
    title: "Need Support",
    icon: SupportAgentIcon, // ✅ Pass the component reference, NOT JSX
    handleClick: () => {
      alert("Profile Clicked");
    },
  },
  {
    title: "Logout",
    icon: LogoutIcon, // ✅ Pass the component reference, NOT JSX
    handleClick: () => {
      clearCart()
      logout()
      toast.success("Logged Out")
      router.push("/user"); // ✅ Redirect to `/user`
    }
  },
];
