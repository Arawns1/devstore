import { z } from 'zod'
import data from '../data.json'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 3000))

  const { searchParams } = request.nextUrl

  const query = z.string().parse(searchParams.get('q'))

  const products = data.products.filter((product) => {
    return product.title.toLowerCase().includes(query.toLowerCase())
  })

  return Response.json(products)
}
