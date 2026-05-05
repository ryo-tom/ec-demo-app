type Product = {
  id: number
  name: string
  price: number
  stock: number
}

export default async function Page() {
  const res = await fetch('http://localhost:3001/api/products')
  const products: Product[] = await res.json()

  return (
    <main className="max-w-2xl p-8">
      <h1 className="text-xl font-bold mb-4">商品一覧</h1>
      <ul className="divide-y">
        {products.map((product) => (
          <li key={product.id} className="flex gap-4 py-2">
            <span>{product.name}</span>
            <span>¥{product.price.toLocaleString()}</span>
            <span>在庫: {product.stock}</span>
          </li>
        ))}
      </ul>
    </main>
  )
}
