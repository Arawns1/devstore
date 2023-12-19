import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

/**
 * Cache e Memoization
 * Memoization -> É do react. E é uma técnica de otimização que consiste no cache
 * do retorno de uma função. Se em uma função, o retorno é sempre o mesmo,
 * não é necessário executar a função novamente
 * Porém se trocar de página e voltar, a função será executada novamente sem memoization.
 *
 * Cache -> armazena dados em memória para que não seja necessário buscar novamente.
 * Por exemplo, dados de uma API. Caso eu atualize a página irá buscar do cache.
 *
 * `useMemo` / `memo` / `useCallback`
 */

async function getFeaturedProducts(): Promise<Product[]> {
  const response = await api('/products/featured', {
    // cache: 'force-cache', -> Default. Essa requisição será feita uma vez, e nas próximas vezes será buscada do cache
    // cache: 'no-store', -> Essa requisição não será armazenada em cache, logo todas as vezes será feita uma nova requisição
    next: {
      revalidate: 60 * 60, // -> A cada 1 hora, será feita uma nova requisição
    },
  })
  const products = await response.json()
  return products
}

export const metadata: Metadata = {
  title: 'Home',
}

export default async function Home() {
  const [highLightedProduct, ...otherProducts] = await getFeaturedProducts()

  return (
    <div className="grid max-h-[860px] grid-cols-9 grid-rows-6 gap-6">
      <Link
        href={`/product/${highLightedProduct.slug}`}
        className="group relative col-span-6 row-span-6 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-start "
      >
        <Image
          src={highLightedProduct.image}
          className="group-hover:scale-105 transition-transform duration-500"
          width={920}
          height={920}
          quality={100}
          alt=""
        />
        <div className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="text-sm truncate">{highLightedProduct.title}</span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            {highLightedProduct.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
        </div>
      </Link>
      {otherProducts.map((product) => {
        return (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group relative col-span-3 row-span-3 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-start"
          >
            <Image
              src={product.image}
              className="group-hover:scale-105 transition-transform duration-500"
              width={860}
              height={860}
              quality={100}
              alt=""
            />
            <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
              <span className="text-sm truncate">{product.title}</span>
              <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
