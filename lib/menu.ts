export type MenuSection = "Bekleidung" | "Schuhe";

export const genders = ["damen", "herren"]

export const menu: Record<MenuSection, string[]> = {
  Bekleidung: ["jeans", "hosen", "pullover", "tshirt", "hemden"],
  Schuhe: ["sneaker", "stiefel", "sportschuhe"],
};

export const brands = ["nike", "adidas", "levis", "dickies", "carhartt"]