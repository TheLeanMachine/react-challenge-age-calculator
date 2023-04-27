
import React from 'react';
import Link from 'next/link';

export default function BlogsHome() {

  let foo = 'jabadaba duuuh!';

  return (
    <div>
      <h1 className="text-4xl">What an amazing blog! - {foo}</h1>

      <br />
      Navigation: <Link className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href="/">Home</Link>, <Link className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href="/downloads/">to Downloads</Link>
    </div>
  )
}
