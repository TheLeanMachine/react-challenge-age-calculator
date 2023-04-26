
import React from 'react';
import Link from 'next/link';

export default function DownloadsHome() {

  let downloads = [
    'Movie 01',
    'Movie 02',
    'Movie 03',
    'Movie 04',
    'Movie 05',
  ];

  return (
    <div>
      <h1 className="text-4xl">Downloads</h1>

      <ul>
        {
          downloads.map((dl, index) =>
            <li key={index}>{dl}</li>
          )
        }
      </ul>

      Navigation: <Link className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href="/blog/">to Blog</Link>
    </div>
  )
}
