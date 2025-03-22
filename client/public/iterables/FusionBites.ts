interface FusionBitesProps {
  title: string;
  price_hf: number | null;
  price_fl: number;
  hfClicked?: () => void;
  ffClicked: () => void;
  img: string;
}

export const momoMenu: FusionBitesProps[] = [
  {
    title: "Veg Steamed/Fried Momos",
    price_hf: 69,
    price_fl: 99,
    hfClicked: () => alert("HF clicked for Veg Momos"),
    ffClicked: () => alert("FF clicked for Veg Momos"),
    img: "/assets/FusionBites/veg-momos.png",
  },
  {
    title: "Veg Crispy Momos",
    price_hf: null,
    price_fl: 129,
    hfClicked: undefined,
    ffClicked: () => alert("FF clicked for Veg Crispy Momos"),
    img: "/assets/FusionBites/veg-crispy-momos.png",
  },
  {
    title: "Paneer Steamed/Fried Momos",
    price_hf: 79,
    price_fl: 109,
    hfClicked: () => alert("HF clicked for Paneer Momos"),
    ffClicked: () => alert("FF clicked for Paneer Momos"),
    img: "/assets/FusionBites/paneer-momos.png",
  },
  {
    title: "Paneer Crispy Momos",
    price_hf: null,
    price_fl: 139,
    hfClicked: undefined,
    ffClicked: () => alert("FF clicked for Paneer Crispy Momos"),
    img: "/assets/FusionBites/paneer-crispy-momos.png",
  },
];

export const chineseRiceMenu: FusionBitesProps[] = [
  {
    title: "Veg Fried Rice",
    price_hf: 79,
    price_fl: 139,
    hfClicked: () => alert("HF clicked for Veg Fried Rice"),
    ffClicked: () => alert("FF clicked for Veg Fried Rice"),
    img: "/assets/FusionBites/veg-fried-rice.png",
  },
  {
    title: "Veg Schezwan Fried Rice",
    price_hf: 89,
    price_fl: 159,
    hfClicked: () => alert("HF clicked for Veg Schezwan Fried Rice"),
    ffClicked: () => alert("FF clicked for Veg Schezwan Fried Rice"),
    img: "/assets/FusionBites/veg-schezwan-rice.png",
  },
  {
    title: "Manchurian Fried Rice",
    price_hf: 99,
    price_fl: 179,
    hfClicked: () => alert("HF clicked for Manchurian Fried Rice"),
    ffClicked: () => alert("FF clicked for Manchurian Fried Rice"),
    img: "/assets/FusionBites/manchurian-fried-rice.png",
  },
  {
    title: "Paneer Fried Rice",
    price_hf: 99,
    price_fl: 179,
    hfClicked: () => alert("HF clicked for Paneer Fried Rice"),
    ffClicked: () => alert("FF clicked for Paneer Fried Rice"),
    img: "/assets/FusionBites/paneer-fried-rice.png",
  },
  {
    title: "Paneer Schezwan Fried Rice",
    price_hf: 99,
    price_fl: 199,
    hfClicked: () => alert("HF clicked for Paneer Schezwan Fried Rice"),
    ffClicked: () => alert("FF clicked for Paneer Schezwan Fried Rice"),
    img: "/assets/FusionBites/paneer-schezwan-rice.png",
  },
];

export const wokChineseMenu: FusionBitesProps[] = [
  {
    title: "Veg Noodles",
    price_hf: 59,
    price_fl: 119,
    hfClicked: () => alert("HF clicked for Veg Noodles"),
    ffClicked: () => alert("FF clicked for Veg Noodles"),
    img: "/assets/FusionBites/veg-noodles.png",
  },
  {
    title: "Hakka Noodles",
    price_hf: 69,
    price_fl: 139,
    hfClicked: () => alert("HF clicked for Hakka Noodles"),
    ffClicked: () => alert("FF clicked for Hakka Noodles"),
    img: "/assets/FusionBites/hakka-noodles.png",
  },
  {
    title: "Veg Schezwan Noodles",
    price_hf: 79,
    price_fl: 159,
    hfClicked: () => alert("HF clicked for Veg Schezwan Noodles"),
    ffClicked: () => alert("FF clicked for Veg Schezwan Noodles"),
    img: "/assets/FusionBites/veg-schezwan-noodles.png",
  },
  {
    title: "Chilli Garlic Noodles",
    price_hf: 79,
    price_fl: 159,
    hfClicked: () => alert("HF clicked for Chilli Garlic Noodles"),
    ffClicked: () => alert("FF clicked for Chilli Garlic Noodles"),
    img: "/assets/FusionBites/chilli-garlic-noodles.png",
  },
  {
    title: "Manchurian Noodles",
    price_hf: 89,
    price_fl: 179,
    hfClicked: () => alert("HF clicked for Manchurian Noodles"),
    ffClicked: () => alert("FF clicked for Manchurian Noodles"),
    img: "/assets/FusionBites/manchurian-noodles.png",
  },
  {
    title: "Paneer Noodles",
    price_hf: 89,
    price_fl: 179,
    hfClicked: () => alert("HF clicked for Paneer Noodles"),
    ffClicked: () => alert("FF clicked for Paneer Noodles"),
    img: "/assets/FusionBites/paneer-noodles.png",
  },
  {
    title: "Paneer Schezwan Noodles",
    price_hf: 89,
    price_fl: 179,
    hfClicked: () => alert("HF clicked for Paneer Schezwan Noodles"),
    ffClicked: () => alert("FF clicked for Paneer Schezwan Noodles"),
    img: "/assets/FusionBites/paneer-schezwan-noodles.png",
  },
];

export const pastaMenu: FusionBitesProps[] = [
  {
    title: "Red Sauce Pasta",
    price_hf: null,
    price_fl: 129,
    hfClicked: undefined,
    ffClicked: () => alert("FF clicked for Red Sauce Pasta"),
    img: "/assets/FusionBites/red-sauce-pasta.png",
  },
  {
    title: "White Sauce Pasta",
    price_hf: null,
    price_fl: 139,
    hfClicked: undefined,
    ffClicked: () => alert("FF clicked for White Sauce Pasta"),
    img: "/assets/FusionBites/white-sauce-pasta.png",
  },
  {
    title: "Mixed Sauce Pasta",
    price_hf: null,
    price_fl: 139,
    hfClicked: undefined,
    ffClicked: () => alert("FF clicked for Mixed Sauce Pasta"),
    img: "/assets/FusionBites/mixed-sauce-pasta.png",
  },
];

export const chineseStarterMenu: FusionBitesProps[] = [
  {
    title: "All Mix",
    price_hf: null,
    price_fl: 99,
    hfClicked: undefined,
    ffClicked: () => alert("FF clicked for All Mix"),
    img: "/assets/FusionBites/all-mix.png",
  },
  {
    title: "Chilli Potato",
    price_hf: null,
    price_fl: 99,
    hfClicked: undefined,
    ffClicked: () => alert("FF clicked for Chilli Potato"),
    img: "/assets/FusionBites/chilli-potato.png",
  },
  {
    title: "Veg Manchurian",
    price_hf: null,
    price_fl: 119,
    hfClicked: undefined,
    ffClicked: () => alert("FF clicked for Veg Manchurian"),
    img: "/assets/FusionBites/veg-manchurian.png",
  },
  {
    title: "Chilli Paneer",
    price_hf: null,
    price_fl: 139,
    hfClicked: undefined,
    ffClicked: () => alert("FF clicked for Chilli Paneer"),
    img: "/assets/FusionBites/chilli-paneer.png",
  },
];
