// prisma/seed.js
const { PrismaClient, Gender } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Kategorien
  const pullisCategory = await prisma.category.upsert({
    where: { slug: "pullover" },
    update: {},
    create: { name: "Pullover", slug: "pullover" },
  });

    const tshirtCategory = await prisma.category.upsert({
    where: { slug: "tshirt" },
    update: {},
    create: { name: "Tshirt", slug: "tshirt" },
  });

  const hosenCategory = await prisma.category.upsert({
    where: { slug: "hosen" },
    update: {},
    create: { name: "Hosen", slug: "hosen" },
  });

  const sneakerCategory = await prisma.category.upsert({
    where: { slug: "sneaker" },
    update: {},
    create: { name: "Sneaker", slug: "sneaker" },
  });

  // Marken
  const levisBrand = await prisma.brand.upsert({
    where: { slug: "levis" },
    update: {},
    create: { name: "levis", slug: "levis" },
  });

  const nikeBrand = await prisma.brand.upsert({
    where: { slug: "nike" },
    update: {},
    create: { name: "Nike", slug: "nike" },
  });

  const adidasBrand = await prisma.brand.upsert({
    where: { slug: "adidas" },
    update: {},
    create: { name: "Adidas", slug: "adidas" },
  });

    const carharttBrand = await prisma.brand.upsert({
    where: { slug: "carhartt" },
    update: {},
    create: { name: "Carhartt", slug: "carhartt" },
  });

  // Farben
  const navyColor = await prisma.color.upsert({ where: { name: "Navy" }, update: {}, create: { name: "Navy", hex: "#001f3f" } });
  const blackColor = await prisma.color.upsert({ where: { name: "Black" }, update: {}, create: { name: "Black", hex: "#000000" } });
  const blueColor = await prisma.color.upsert({ where: { name: "Blue" }, update: {}, create: { name: "Blue", hex: "#0000FF" } });
  const greyColor = await prisma.color.upsert({ where: { name: "Grey" }, update: {}, create: { name: "Grey", hex: "#888888" } });
  const greenColor = await prisma.color.upsert({ where: { name: "Green" }, update: {}, create: { name: "Green", hex: "#008000" } });
  const yellowColor = await prisma.color.upsert({ where: { name: "Yellow" }, update: {}, create: { name: "Yellow", hex: "#FFDE21" } });
  const redColor = await prisma.color.upsert({ where: { name: "Red" }, update: {}, create: { name: "Red", hex: "#FF0000" } });

  // Größen
  const sizeS = await prisma.size.upsert({ where: { label: "S" }, update: {}, create: { label: "S" } });
  const sizeM = await prisma.size.upsert({ where: { label: "M" }, update: {}, create: { label: "M" } });
  const sizeL = await prisma.size.upsert({ where: { label: "L" }, update: {}, create: { label: "L" } });
  const size32 = await prisma.size.upsert({ where: { label: "32" }, update: {}, create: { label: "32" } });
  const size34 = await prisma.size.upsert({ where: { label: "34" }, update: {}, create: { label: "34" } });
  const oneSize = await prisma.size.upsert({ where: { label: "One Size" }, update: {}, create: { label: "One Size" } });

  // Produkte
  const hoodie = await prisma.product.create({
    data: {
      title: "Classic Hoodie",
      price: 59.99,
      imageUrl: "https://res.cloudinary.com/dacyybkvp/image/upload/v1769778139/Classic_Hoodie_dlfqbf.jpg",
      categoryId: pullisCategory.id,
      brandId: nikeBrand.id,
      gender: "HERREN",
    },
  });

  const tshirt = await prisma.product.create({
    data: {
      title: "Basic T-Shirt",
      price: 29.99,
      imageUrl: "https://res.cloudinary.com/dacyybkvp/image/upload/v1769778143/Basic_T-Shirt_xm60wt.jpg",
      categoryId: tshirtCategory.id,
      brandId: adidasBrand.id,
      gender: "DAMEN",
    },
  });

  const jeans = await prisma.product.create({
    data: {
      title: "501 Original Jeans",
      price: 89.99,
      imageUrl: "https://res.cloudinary.com/dacyybkvp/image/upload/v1769778137/501_Original_Jeans_fdghwq.jpg",
      categoryId: hosenCategory.id,
      brandId: levisBrand.id,
      gender: "HERREN",
    },
  });

    const hose1 = await prisma.product.create({
    data: {
      title: "Chino Blue",
      price: 59.99,
      imageUrl: "https://res.cloudinary.com/dacyybkvp/image/upload/v1770382238/Chino-blue_geawbq.jpg",
      categoryId: hosenCategory.id,
      brandId: levisBrand.id,
      gender: "HERREN",
    },
  });

    const hose2 = await prisma.product.create({
    data: {
      title: "Cargo green levis",
      price: 99.99,
      imageUrl: "https://res.cloudinary.com/dacyybkvp/image/upload/v1770382307/cargo-green_levis_sxoisj.jpg",
      categoryId: hosenCategory.id,
      brandId: levisBrand.id,
      gender: "HERREN",
    },
  });

    const hose3 = await prisma.product.create({
    data: {
      title: "Cargo gelb",
      price: 69.99,
      imageUrl: "https://res.cloudinary.com/dacyybkvp/image/upload/v1770382347/cargo-gelb_e6n8ol.jpg",
      categoryId: hosenCategory.id,
      brandId: adidasBrand.id,
      gender: "HERREN",
    },
  });

    const hose4 = await prisma.product.create({
    data: {
      title: "Chino blue carhartt",
      price: 79.99,
      imageUrl: "https://res.cloudinary.com/dacyybkvp/image/upload/v1770382403/Chino-blue-carhartt_zihspm.jpg",
      categoryId: hosenCategory.id,
      brandId: carharttBrand.id,
      gender: "HERREN",
    },
  });

    const hose5 = await prisma.product.create({
    data: {
      title: "Cargo beige",
      price: 89.99,
      imageUrl: "https://res.cloudinary.com/dacyybkvp/image/upload/v1770382580/Cargo-beige_fomyup.jpg",
      categoryId: hosenCategory.id,
      brandId: adidasBrand.id,
      gender: "HERREN",
    },
  });

    const hose6 = await prisma.product.create({
    data: {
      title: "Chino blau levis",
      price: 109.99,
      imageUrl: "https://res.cloudinary.com/dacyybkvp/image/upload/v1770382630/chino-blue_levis_fgdqgq.jpg",
      categoryId: hosenCategory.id,
      brandId: levisBrand.id,
      gender: "HERREN",
    },
  });

    const hose7 = await prisma.product.create({
    data: {
      title: "Stoffhose blau",
      price: 89.99,
      imageUrl: "https://res.cloudinary.com/dacyybkvp/image/upload/v1770382675/Stoffhose-blue_yfvd1y.jpg",
      categoryId: hosenCategory.id,
      brandId: adidasBrand.id,
      gender: "HERREN",
    },
  });

    const hose8 = await prisma.product.create({
    data: {
      title: "Chino rot",
      price: 39.99,
      imageUrl: "https://res.cloudinary.com/dacyybkvp/image/upload/v1770382708/chino-red_mqt3hd.jpg",
      categoryId: hosenCategory.id,
      brandId: carharttBrand.id,
      gender: "HERREN",
    },
  });

    const hose9 = await prisma.product.create({
    data: {
      title: "Cargo grün carhartt",
      price: 69.99,
      imageUrl: "https://res.cloudinary.com/dacyybkvp/image/upload/v1770382758/Cargo-green_hu3ygm.jpg",
      categoryId: hosenCategory.id,
      brandId: carharttBrand.id,
      gender: "HERREN",
    },
  });

    const hose10 = await prisma.product.create({
    data: {
      title: "Cargo grün Reißverschluss",
      price: 99.99,
      imageUrl: "https://res.cloudinary.com/dacyybkvp/image/upload/v1770382790/cargo-green_rei%C3%9F_sl0ujv.jpg",
      categoryId: hosenCategory.id,
      brandId: levisBrand.id,
      gender: "HERREN",
    },
  });

    const hose11 = await prisma.product.create({
    data: {
      title: "Chino grün Adi",
      price: 89.99,
      imageUrl: "https://res.cloudinary.com/dacyybkvp/image/upload/v1770382852/Chino-green_rpudnn.jpg",
      categoryId: hosenCategory.id,
      brandId: adidasBrand.id,
      gender: "HERREN",
    },
  });

  const sneaker = await prisma.product.create({
    data: {
      title: "Air Max",
      price: 129.99,
      imageUrl: "https://res.cloudinary.com/dacyybkvp/image/upload/v1769778138/Air_Max_vny5ip.jpg",
      categoryId: sneakerCategory.id,
      brandId: nikeBrand.id,
      gender: "DAMEN",
    },
  });

  // Varianten
  await prisma.productVariant.createMany({
    data: [
      { productId: hoodie.id, colorId: navyColor.id, sizeId: sizeM.id, stock: 10 },
      { productId: hoodie.id, colorId: blackColor.id, sizeId: sizeL.id, stock: 5 },
      { productId: tshirt.id, colorId: yellowColor.id, sizeId: sizeS.id, stock: 15 },
      { productId: jeans.id, colorId: blueColor.id, sizeId: size32.id, stock: 8 },
      { productId: jeans.id, colorId: blackColor.id, sizeId: size34.id, stock: 3 },
      { productId: hose1.id, colorId: blueColor.id, sizeId: size34.id, stock: 15 },
      { productId: hose2.id, colorId: greenColor.id, sizeId: size34.id, stock: 25 },
      { productId: hose3.id, colorId: yellowColor.id, sizeId: size34.id, stock: 7 },
      { productId: hose4.id, colorId: blueColor.id, sizeId: size32.id, stock: 16 },
      { productId: hose5.id, colorId: yellowColor.id, sizeId: size34.id, stock: 7 },
      { productId: hose6.id, colorId: blueColor.id, sizeId: size32.id, stock: 7 },
      { productId: hose7.id, colorId: blueColor.id, sizeId: size34.id, stock: 14 },
      { productId: hose8.id, colorId: redColor.id, sizeId: size34.id, stock: 7 },
      { productId: hose9.id, colorId: greenColor.id, sizeId: size34.id, stock: 7 },
      { productId: hose10.id, colorId: greenColor.id, sizeId: size34.id, stock: 15 },
      { productId: hose11.id, colorId: greenColor.id, sizeId: size32.id, stock: 39 },
      { productId: sneaker.id, colorId: greyColor.id, sizeId: oneSize.id, stock: 20 },
    ],
  });

  console.log("Seeding done!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });




