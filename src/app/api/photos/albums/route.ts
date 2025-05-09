import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function GET() {
  const adobeAuth = await kv.get('adobe:auth')
  // TODO: Fix type issue
  // @ts-ignore
  const accessToken = adobeAuth?.accessToken

  if (!accessToken) {
    return NextResponse.json(
      { error: 'Access token is missing or expired' },
      { status: 401 }
    )
  }

  try {
    const catalogResponse = await fetch('https://lr.adobe.io/v2/catalog', {
      headers: {
        'X-API-Key': process.env.ADOBE_CLIENT_ID || '',
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })

    if (!catalogResponse.ok) {
      const errorData = await catalogResponse.json()
      return NextResponse.json(
        { error: errorData },
        { status: catalogResponse.status }
      )
    }

    // TODO: Get the catalog ID from the resopnse
    // The below doesn't work because it's a readable stream
    const catalogData = await catalogResponse.json()
    const catalogId = catalogData.id

    console.log('Catalog ID:', catalogId)

    const response = await fetch(
      `https://lr.adobe.io/v2/catalog/${catalogId}/albums`,
      {
        headers: {
          'X-API-Key': process.env.ADOBE_CLIENT_ID || '',
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        { error: errorData },
        { status: response.status }
      )
    }

    const albumsData = await response.json()
    return NextResponse.json(albumsData)
  } catch (error) {
    // console.log(error)
    return NextResponse.json(
      { error: 'Failed to fetch albums' },
      { status: 500 }
    )
  }
}
