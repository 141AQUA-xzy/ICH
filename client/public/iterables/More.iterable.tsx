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
import RateReviewIcon from '@mui/icons-material/RateReview';


export const MoreIterator = (
  router: any,
  logout: (_id?: string) => void,
  showLoading: () => void,
  hideLoading: () => void,
  clearCart: () => void,
  setView: (view: string) => void,
  _id?: string,
) => [
    {
      title: "My Profile",
      icon: PersonPinIcon, // ✅ Pass the component reference, NOT JSX
      handleClick: () => {
        alert("Coming Soon...");
      },
    },
    {
      title: "Your Orders",
      icon: ShoppingBagIcon, // ✅ Pass the component reference, NOT JSX
      handleClick: () => {
        showLoading()
        router.push("/order-bag")
        hideLoading()
      },
    },
    {
      title: "Our Services",
      icon: ShoppingBasketIcon, // ✅ Pass the component reference, NOT JSX
      handleClick: () => {
        setView("Services")
      },
    }, {
      title: "ICH Gallery",
      icon: CollectionsIcon, // ✅ Pass the component reference, NOT JSX
      handleClick: () => {
        alert("Coming Soon...");
      },

    },
    {
      title: "See Reviews",
      icon: RateReviewIcon, // ✅ Pass the component reference, NOT JSX
      handleClick: () => {
        alert("Coming Soon...");
      },
    },
    {
      title: "Sponsorship",
      icon: SensorOccupiedIcon, // ✅ Pass the component reference, NOT JSX
      handleClick: () => {
        alert("Coming Soon...");
      },
    },
    {
      title: "View Offers",
      icon: LocalOfferIcon, // ✅ Pass the component reference, NOT JSX
      handleClick: () => {
        alert("Coming Soon...");
      },
    },
    {
      title: "How to ?",
      icon: QuestionMarkIcon, // ✅ Pass the component reference, NOT JSX
      handleClick: () => {
        alert("Coming Soon...");
      },
    },
    {
      title: "Terms & Usage",
      icon: PolicyIcon, // ✅ Pass the component reference, NOT JSX
      handleClick: () => {
        alert("Coming Soon...");
      },
    },
    {
      title: "Share",
      icon: ShareIcon, // ✅ Pass the component reference, NOT JSX
      handleClick: () => {
        alert("Coming Soon...");
      },
    },
    {
      title: "Need Support",
      icon: SupportAgentIcon, // ✅ Pass the component reference, NOT JSX
      handleClick: () => {
        alert("Coming Soon...");
      },
    },
    {
      title: "Logout",
      icon: LogoutIcon, // ✅ Pass the component reference, NOT JSX
      handleClick: async () => {
        showLoading()
        localStorage.removeItem("ICHuser");
        localStorage.removeItem("cart");
        clearCart();
        logout(); // ✅ Awaiting if `logout` is async
        router.replace("/user"); // ✅ Redirect to `/user`
        setView("null")
        window.location.reload()
        hideLoading()
      }
    },
  ];
