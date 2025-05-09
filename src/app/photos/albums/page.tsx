'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function AlbumsPage() {
  const [albums, setAlbums] = useState<any[]>([])
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null)
  const [photos, setPhotos] = useState<any[]>([])

  useEffect(() => {
    async function fetchAlbums() {
      const response = await fetch('/api/photos/albums')
      const data = await response.json()
      setAlbums(data.resources || [])
    }
    fetchAlbums()
  }, [])

  useEffect(() => {
    async function fetchPhotos() {
      if (selectedAlbum) {
        const response = await fetch(`/api/photos/${selectedAlbum}`)
        const data = await response.json()
        setPhotos(data.resources || [])
      }
    }
    fetchPhotos()
  }, [selectedAlbum])

  return (
    <div>
      <h1>Albums</h1>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <button onClick={() => setSelectedAlbum(album.id)}>
              {album.name}
            </button>
          </li>
        ))}
      </ul>

      {selectedAlbum && (
        <div>
          <h2>Photos in Album</h2>
          <ul>
            {photos.map((photo) => (
              <li key={photo.id}>
                <Image
                  src={photo.thumbnailUrl}
                  alt={photo.name}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
