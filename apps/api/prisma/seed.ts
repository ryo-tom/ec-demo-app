// prisma/seed.ts
import { prisma } from "../src/lib/prisma";

async function main() {
  // カテゴリを作成
  const electronics = await prisma.category.create({
    data: { name: "電化製品" },
  });

  const clothing = await prisma.category.create({
    data: { name: "衣類" },
  });

  const food = await prisma.category.create({
    data: { name: "食品" },
  });

  // 商品を作成
  await prisma.product.createMany({
    data: [
      {
        name: "スマートフォン",
        description: "最新モデルのスマートフォン",
        price: 99800,
        stock: 50,
        categoryId: electronics.id,
      },
      {
        name: "ワイヤレスイヤホン",
        description: "ノイズキャンセリング機能付き",
        price: 24800,
        stock: 100,
        categoryId: electronics.id,
      },
      {
        name: "Tシャツ",
        description: "綿100%の着心地の良いTシャツ",
        price: 2980,
        stock: 200,
        categoryId: clothing.id,
      },
      {
        name: "デニムパンツ",
        description: "スリムフィットデニム",
        price: 7980,
        stock: 150,
        categoryId: clothing.id,
      },
      {
        name: "有機野菜セット",
        description: "農薬不使用の新鮮野菜セット",
        price: 3500,
        stock: 30,
        categoryId: food.id,
      },
    ],
  });

  console.log("シードデータの投入が完了しました");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());