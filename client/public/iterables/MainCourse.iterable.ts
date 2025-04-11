interface MainCourseProps {
  title: string;
  price_hf: number | null;
  price_fl: number;
  hfClicked?: () => void;
  ffClicked: () => void;
  img: string;
}

export const mainCourseDalData: MainCourseProps[] = [
  {
    title: "Dal Fry",
    price_hf: 49,
    price_fl: 89,
    hfClicked: () => alert("HF clicked for DAL"),
    ffClicked: () => alert("FF clicked for DAL"),
    img: "/assets/MainCourse/dal-fry.png",
  },
  {
    title: "Dal Tadka",
    price_hf: 69,
    price_fl: 109,
    hfClicked: () => alert("HF clicked for Paneer"),
    ffClicked: () => alert("FF clicked for Paneer"),
    img: "/assets/MainCourse/dal-tadka.png",
  },
  {
    title: "Masala Khichdi",
    price_hf: 59,
    price_fl: 99,
    hfClicked: () => alert("HF clicked for Chana Masala"),
    ffClicked: () => alert("FF clicked for Chana Masala"),
    img: "/assets/MainCourse/masala-khichdi.png",
  },
  {
    title: "Sadi Khichdi",
    price_hf: 49,
    price_fl: 89,
    hfClicked: () => alert("HF clicked for Chana Masala"),
    ffClicked: () => alert("FF clicked for Chana Masala"),
    img: "/assets/MainCourse/sadi-khichdi.png",
  },
];

export const mainCourseRiceData: MainCourseProps[] = [
  {
    title: "Plain Rice",
    price_hf: 39,
    price_fl: 69,
    hfClicked: () => alert("HF clicked for DAL"),
    ffClicked: () => alert("FF clicked for DAL"),
    img: "/assets/MainCourse/plain-rice.png",
  },
  {
    title: "Jeera Rice",
    price_hf: 49,
    price_fl: 89,
    hfClicked: () => alert("HF clicked for Paneer"),
    ffClicked: () => alert("FF clicked for Paneer"),
    img: "/assets/MainCourse/jeera-rice.png",
  },
  {
    title: "Matar Rice",
    price_hf: 49,
    price_fl: 89,
    hfClicked: () => alert("HF clicked for Chana Masala"),
    ffClicked: () => alert("FF clicked for Chana Masala"),
    img: "/assets/MainCourse/matar-rice.png",
  },
];

export const MainCourseSabjiData: string[] = [
  "Matar Paneer",
  "Sahi Paneer",
  "Butter Paneer",
  "Paneer Punjabi",
  "Paneer Bhurji",
  "Paneer Masala",
  "Paneer Butter Masala",
  "Paneer Lababdar",
  "Paneer Pasanda",
  "Paneer Do Payaza",
  "Kadai Paneer",
  "Paneer Chatpata",
  "Paneer Malai",
  "Palak Paneer",
  "Methi Matar Malai",
  "Kaju Butter Masala",
  "Aloo Jeera",
  "Gobhi Masala",
  "Sev Tamatar",
  "Bhindi Masala",
  "Mixed Veg",
  "Paneer Handi (Chef Special)",
];


export const RotiParathaTitles = [
  "Tawa Roti",
  "Tawa Butter Roti",
  "Aloo Paratha",
  "Gobhi Paratha",
  "Paneer Paratha"
];

export const RaitaTitles = [
  "Boondi Raita",
  "Plain Raita"
];

export const SaladTitles = [
  "Simple Salad",
  "Green Salad",
  "Mixed Salad"
];

  // export const rotiParathaData: MainCourseProps[] = [
  //   {
  //     title: "Tawa Roti",
  //     price_hf: null,
  //     price_fl: 7,
  //     img: "/assets/MainCourse/tawa-roti.png",
  //     ffClicked: () => alert("FF clicked for Tawa Roti"),
  //   },
  //   {
  //     title: "Tawa Butter Roti",
  //     price_hf: null,
  //     price_fl: 10,
  //     img: "/assets/MainCourse/tawa-butter-roti.png",
  //     ffClicked: () => alert("FF clicked for Tawa Butter Roti"),
  //   },
  //   {
  //     title: "Aloo Paratha",
  //     price_hf: null,
  //     price_fl: 49,
  //     img: "/assets/MainCourse/aloo-paratha.png",
  //     ffClicked: () => alert("FF clicked for Aloo Paratha"),
  //   },
  //   {
  //     title: "Gobhi Paratha",
  //     price_hf: null,
  //     price_fl: 59,
  //     img: "/assets/MainCourse/gobhi-paratha.png",
  //     ffClicked: () => alert("FF clicked for Gobhi Paratha"),
  //   },
  //   {
  //     title: "Paneer Paratha",
  //     price_hf: null,
  //     price_fl: 69,
  //     img: "/assets/MainCourse/paneer-paratha.png",
  //     ffClicked: () => alert("FF clicked for Paneer Paratha"),
  //   },
  // ];
  
  // export const raitaData: MainCourseProps[] = [
  //   {
  //     title: "Boondi Raita",
  //     price_hf: null,
  //     price_fl: 29,
  //     img: "/assets/MainCourse/boondi-raita.png",
  //     ffClicked: () => alert("FF clicked for Boondi Raita"),
  //   },
  //   {
  //     title: "Plain Raita",
  //     price_hf: null,
  //     price_fl: 19,
  //     img: "/assets/MainCourse/plain-raita.png",
  //     ffClicked: () => alert("FF clicked for Plain Raita"),
  //   }
  // ];
  
  // export const saladData: MainCourseProps[] = [
  //   {
  //     title: "Simple Salad",
  //     price_hf: null,
  //     price_fl: 39,
  //     img: "/assets/MainCourse/simple-salad.png",
  //     ffClicked: () => alert("FF clicked for Simple Salad"),
  //   },
  //   {
  //     title: "Green Salad",
  //     price_hf: null,
  //     price_fl: 49,
  //     img: "/assets/MainCourse/green-salad.png",
  //     ffClicked: () => alert("FF clicked for Green Salad"),
  //   },
  //   {
  //     title: "Mixed Salad",
  //     price_hf: null,
  //     price_fl: 59,
  //     img: "/assets/MainCourse/mixed-salad.png",
  //     ffClicked: () => alert("FF clicked for Mixed Salad"),
  //   }
  // ];