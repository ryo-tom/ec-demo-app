import { redirect } from 'next/navigation'

async function createProduct(formData: FormData) {
  'use server'

  await fetch('http://localhost:3001/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: formData.get('name'),
      price: Number(formData.get('price')),
      stock: Number(formData.get('stock')),
    }),
  })

  redirect('/')
}

export default function NewPage() {
  return (
    <main className="p-8">
      <h1 className="text-xl font-bold mb-4">商品登録</h1>
      <form action={createProduct} className="space-y-4">
        <div>
          <label>商品名</label>
          <input name="name" type="text" className="border ml-2 px-2 py-1" />
        </div>
        <div>
          <label>価格</label>
          <input name="price" type="number" className="border ml-2 px-2 py-1" />
        </div>
        <div>
          <label>在庫</label>
          <input name="stock" type="number" className="border ml-2 px-2 py-1" />
        </div>
        <button type="submit" className="px-4 py-2 bg-black text-white">
          登録
        </button>
      </form>
    </main>
  )
}
