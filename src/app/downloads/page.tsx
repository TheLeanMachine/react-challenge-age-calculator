
import React from 'react'

export default function DownloadsHome() {

  let downloads = [
    'Movie 01',
    'Movie 02',
    'Movie 03',
    'Movie 04',
    'Movie 05',
  ];

  return (
    <ul>
      {
        downloads.map((dl, index) =>
          <li key={index}>{dl}</li>
        )
      }
    </ul>
  )
}
