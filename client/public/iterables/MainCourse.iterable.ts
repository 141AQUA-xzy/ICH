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

export const mainCourseSabjiData: MainCourseProps[] = [
  {
    title: "Matar Paneer",
    price_hf: 69,
    price_fl: 139,
    hfClicked: () => alert("HF clicked for Matar Paneer"),
    ffClicked: () => alert("FL clicked for Matar Paneer"),
    img: "/assets/MainCourse/matar-paneer.png",
  },
  {
    title: "Shahi Paneer",
    price_hf: 99,
    price_fl: 179,
    hfClicked: () => alert("HF clicked for Sahi Paneer"),
    ffClicked: () => alert("FL clicked for Sahi Paneer"),
    img: "/assets/MainCourse/shahi-paneer.png",
  },
  {
    title: "Butter Paneer",
    price_hf: 99,
    price_fl: 179,
    hfClicked: () => alert("HF clicked for Butter Paneer"),
    ffClicked: () => alert("FL clicked for Butter Paneer"),
    img: "/assets/MainCourse/butter-paneer.png",
  },
  {
    title: "Paneer Punjabi",
    price_hf: 89,
    price_fl: 169,
    hfClicked: () => alert("HF clicked for Paneer Punjabi"),
    ffClicked: () => alert("FL clicked for Paneer Punjabi"),
    img: "/assets/MainCourse/paneer-punjabi.png",
  },
  {
    title: "Paneer Bhurji",
    price_hf: 119,
    price_fl: 199,
    hfClicked: () => alert("HF clicked for Paneer Bhurji"),
    ffClicked: () => alert("FL clicked for Paneer Bhurji"),
    img: "/assets/MainCourse/paneer-bhurji.png",
  },
  {
    title: "Paneer Masala",
    price_hf: 89,
    price_fl: 169,
    hfClicked: () => alert("HF clicked for Paneer Masala"),
    ffClicked: () => alert("FL clicked for Paneer Masala"),
    img: "/assets/MainCourse/paneer-masala.png",
  },
  {
    title: "Paneer Butter Masala",
    price_hf: 109,
    price_fl: 189,
    hfClicked: () => alert("HF clicked for Paneer Butter Masala"),
    ffClicked: () => alert("FL clicked for Paneer Butter Masala"),
    img: "/assets/MainCourse/paneer-butter-masala.png",
  },
  {
    title: "Paneer Lababdar",
    price_hf: 109,
    price_fl: 189,
    hfClicked: () => alert("HF clicked for Paneer Lababdar"),
    ffClicked: () => alert("FL clicked for Paneer Lababdar"),
    img: "/assets/MainCourse/paneer-lababdar.png",
  },
  {
    title: "Paneer Pasanda",
    price_hf: 109,
    price_fl: 189,
    hfClicked: () => alert("HF clicked for Paneer Pasanda"),
    ffClicked: () => alert("FL clicked for Paneer Pasanda"),
    img: "/assets/MainCourse/paneer-pasanda.png",
  },
  {
    title: "Paneer Do Payaza",
    price_hf: 99,
    price_fl: 179,
    hfClicked: () => alert("HF clicked for Paneer Do Payaza"),
    ffClicked: () => alert("FL clicked for Paneer Do Payaza"),
    img: "/assets/MainCourse/paneer-do-payaza.png",
  },
  {
    title: "Kadai Paneer",
    price_hf: 109,
    price_fl: 189,
    hfClicked: () => alert("HF clicked for Kadai Paneer"),
    ffClicked: () => alert("FL clicked for Kadai Paneer"),
    img: "/assets/MainCourse/kadai-paneer.png",
  },
  {
    title: "Paneer Chatpata",
    price_hf: 119,
    price_fl: 199,
    hfClicked: () => alert("HF clicked for Paneer Chatpata"),
    ffClicked: () => alert("FL clicked for Paneer Chatpata"),
    img: "/assets/MainCourse/paneer-chatpata.png",
  },
  {
    title: "Paneer Malai",
    price_hf: 109,
    price_fl: 189,
    hfClicked: () => alert("HF clicked for Paneer Malai"),
    ffClicked: () => alert("FL clicked for Paneer Malai"),
    img: "/assets/MainCourse/paneer-malai.png",
  },
  {
    title: "Palak Paneer",
    price_hf: 89,
    price_fl: 169,
    hfClicked: () => alert("HF clicked for Palak Paneer"),
    ffClicked: () => alert("FL clicked for Palak Paneer"),
    img: "/assets/MainCourse/palak-paneer.png",
  },
  {
    title: "Methi Matar Malai",
    price_hf: 109,
    price_fl: 189,
    hfClicked: () => alert("HF clicked for Methi Matar Malai"),
    ffClicked: () => alert("FL clicked for Methi Matar Malai"),
    img: "/assets/MainCourse/methi-matar-malai.png",
  },
  {
    title: "Kaju Butter Masala",
    price_hf: 119,
    price_fl: 199,
    hfClicked: () => alert("HF clicked for Kaju Butter Masala"),
    ffClicked: () => alert("FL clicked for Kaju Butter Masala"),
    img: "/assets/MainCourse/kaju-butter-masala.png",
  },
  {
    title: "Aloo Jeera",
    price_hf: 49,
    price_fl: 89,
    hfClicked: () => alert("HF clicked for Aloo Jeera"),
    ffClicked: () => alert("FL clicked for Aloo Jeera"),
    img: "/assets/MainCourse/aloo-jeera.png",
  },
  {
    title: "Gobhi Masala",
    price_hf: 69,
    price_fl: 119,
    hfClicked: () => alert("HF clicked for Gobhi Masala"),
    ffClicked: () => alert("FL clicked for Gobhi Masala"),
    img: "/assets/MainCourse/gobhi-masala.png",
  },
  {
    title: "Sev Tamatar",
    price_hf: 49,
    price_fl: 89,
    hfClicked: () => alert("HF clicked for Sev Tamatar"),
    ffClicked: () => alert("FL clicked for Sev Tamatar"),
    img: "/assets/MainCourse/sev-tamatar.png",
  },
  {
    title: "Bhindi Masala",
    price_hf: 59,
    price_fl: 109,
    hfClicked: () => alert("HF clicked for Bhindi Masala"),
    ffClicked: () => alert("FL clicked for Bhindi Masala"),
    img: "/assets/MainCourse/bhindi-masala.png",
  },
  {
    title: "Mixed Veg",
    price_hf: 59,
    price_fl: 109,
    hfClicked: () => alert("HF clicked for Mixed Veg"),
    ffClicked: () => alert("FL clicked for Mixed Veg"),
    img: "/assets/MainCourse/mixed-veg.png",
  },
  {
    title: "Paneer Handi",
    price_hf: 129,
    price_fl: 229,
    hfClicked: () => alert("HF clicked for Paneer Handi"),
    ffClicked: () => alert("FL clicked for Paneer Handi"),
    img: "/assets/MainCourse/paneer-handi.png",
  },
];

export const rotiParathaData: MainCourseProps[] = [
  {
    title: "Tawa Roti",
    price_hf: null,
    price_fl: 7,
    img: "/assets/MainCourse/tawa-roti.png",
    ffClicked: () => alert("FF clicked for Tawa Roti"),
  },
  {
    title: "Tawa Butter Roti",
    price_hf: null,
    price_fl: 10,
    img: "/assets/MainCourse/tawa-butter-roti.png",
    ffClicked: () => alert("FF clicked for Tawa Butter Roti"),
  },
  {
    title: "Aloo Paratha",
    price_hf: null,
    price_fl: 49,
    img: "/assets/MainCourse/aloo-paratha.png",
    ffClicked: () => alert("FF clicked for Aloo Paratha"),
  },
  {
    title: "Gobhi Paratha",
    price_hf: null,
    price_fl: 59,
    img: "/assets/MainCourse/gobhi-paratha.png",
    ffClicked: () => alert("FF clicked for Gobhi Paratha"),
  },
  {
    title: "Paneer Paratha",
    price_hf: null,
    price_fl: 69,
    img: "/assets/MainCourse/paneer-paratha.png",
    ffClicked: () => alert("FF clicked for Paneer Paratha"),
  },
];

export const raitaData: MainCourseProps[] = [
  {
    title: "Boondi Raita",
    price_hf: null,
    price_fl: 29,
    img: "/assets/MainCourse/boondi-raita.png",
    ffClicked: () => alert("FF clicked for Boondi Raita"),
  },
  {
    title: "Plain Raita",
    price_hf: null,
    price_fl: 19,
    img: "/assets/MainCourse/plain-raita.png",
    ffClicked: () => alert("FF clicked for Plain Raita"),
  }
];

export const saladData: MainCourseProps[] = [
  {
    title: "Simple Salad",
    price_hf: null,
    price_fl: 39,
    img: "/assets/MainCourse/simple-salad.png",
    ffClicked: () => alert("FF clicked for Simple Salad"),
  },
  {
    title: "Green Salad",
    price_hf: null,
    price_fl: 49,
    img: "/assets/MainCourse/green-salad.png",
    ffClicked: () => alert("FF clicked for Green Salad"),
  },
  {
    title: "Mixed Salad",
    price_hf: null,
    price_fl: 59,
    img: "/assets/MainCourse/mixed-salad.png",
    ffClicked: () => alert("FF clicked for Mixed Salad"),
  }
];
