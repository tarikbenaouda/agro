import { ImageSourcePropType } from "react-native";

export type Culture = {
  title: string;
  image: ImageSourcePropType;
  recommended?: boolean;
};

export type CultureGroup = {
  title: string;
  cultures: Culture[];
};

export const CULTURE_GROUPS: CultureGroup[] = [
  {
    title: "Céréales",
    cultures: [
      {
        title: "Blé",
        image: require("../assets/images/wheat.jpg"),
        recommended: true,
      },
      {
        title: "Orge",
        image: require("../assets/images/barley.jpg"),
        recommended: true,
      },
      { title: "Avoine", image: require("../assets/images/oats.jpg") },
      {
        title: "Maïs",
        image: require("../assets/images/wheat.jpg"),
        recommended: true,
      },
      { title: "Sorgho", image: require("../assets/images/barley.jpg") },
      { title: "Seigle", image: require("../assets/images/oats.jpg") },
    ],
  },
  {
    title: "Arbres fruitiers",
    cultures: [
      {
        title: "Olivier",
        image: require("../assets/images/olives.jpg"),
        recommended: true,
      },
      {
        title: "Oranger",
        image: require("../assets/images/oranges.jpg"),
        recommended: true,
      },
      {
        title: "Citronnier",
        image: require("../assets/images/oranges.jpg"),
        recommended: true,
      },
      {
        title: "Amandier",
        image: require("../assets/images/olives.jpg"),
        recommended: true,
      },
      { title: "Figuier", image: require("../assets/images/olives.jpg") },
      { title: "Grenadier", image: require("../assets/images/oranges.jpg") },
    ],
  },
  {
    title: "Légumineuses",
    cultures: [
      {
        title: "Pois chiche",
        image: require("../assets/images/oats.jpg"),
        recommended: true,
      },
      {
        title: "Lentille",
        image: require("../assets/images/oats.jpg"),
        recommended: true,
      },
      { title: "Fève", image: require("../assets/images/leaf.png") },
      { title: "Pois", image: require("../assets/images/leaf.png") },
      { title: "Haricot", image: require("../assets/images/leaf.png") },
      { title: "Soja", image: require("../assets/images/leaf.png") },
    ],
  },
  {
    title: "Cultures maraîchères",
    cultures: [
      {
        title: "Tomate",
        image: require("../assets/images/oranges.jpg"),
        recommended: true,
      },
      { title: "Pomme de terre", image: require("../assets/images/wheat.jpg") },
      {
        title: "Oignon",
        image: require("../assets/images/wheat.jpg"),
        recommended: true,
      },
      { title: "Carotte", image: require("../assets/images/wheat.jpg") },
      { title: "Poivron", image: require("../assets/images/oranges.jpg") },
      { title: "Courgette", image: require("../assets/images/leaf.png") },
    ],
  },
  {
    title: "Plantes aromatiques",
    cultures: [
      {
        title: "Menthe",
        image: require("../assets/images/leaf.png"),
        recommended: true,
      },
      { title: "Basilic", image: require("../assets/images/leaf.png") },
      {
        title: "Thym",
        image: require("../assets/images/leaf.png"),
        recommended: true,
      },
      {
        title: "Romarin",
        image: require("../assets/images/leaf.png"),
        recommended: true,
      },
      { title: "Coriandre", image: require("../assets/images/leaf.png") },
      { title: "Persil", image: require("../assets/images/leaf.png") },
    ],
  },
];
