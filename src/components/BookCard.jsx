import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

function BookCard({ link, name, isbn, author, price, displayName, imageURL }) {
  const { getImageURL } = useFirebase();
  const [url, setUrl] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    getImageURL(imageURL).then(url => setUrl(url));
  }, [getImageURL, imageURL]);

  return (
    <div className="relative w-[300px] rounded-md border overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
      <img
        src={url}
        alt={name}
        className="h-[400px] w-full object-contain"
      />
      <div className="p-4">
        <h1 className="inline-flex items-center text-lg font-semibold">
          {name} <ArrowUpRight className="ml-2 h-4 w-4" />
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {isbn}
        </p>
        <p className="mt-1 text-sm text-gray-600">
          {author}
        </p>
        <h2 className="mt-2 text-sm font-semibold text-gray-900">
          ₹{price}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Uploaded by: {displayName}
        </p>
        <button
        onClick={e=>navigate(link)}
          type="button"
          className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Learn More
        </button>
      </div>
    </div>
  );
}

export default BookCard;
