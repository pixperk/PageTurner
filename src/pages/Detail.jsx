import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';

const Detail = () => {
  const { getBookById, getImageURL, placeOrder } = useFirebase();
  const params = useParams();

  const [data, setData] = useState(null);
  const [url, setUrl] = useState(null);
  const [quantity, setQuantity] = useState(1);


  useEffect(() => {
    const fetchData = async () => {
      const bookData = await getBookById(params.bookId);
      setData(bookData.data());
    };
    fetchData();
  }, [getBookById, params.bookId]);

  useEffect(() => {
    if (data) {
      const imageUrl = data.imageURL;
      getImageURL(imageUrl).then(url => setUrl(url));
    }
  }, [data, getImageURL]);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const order = async() => {
    const result = await placeOrder(params.bookId, quantity)
    console.log(result);
  }

  if (!data) return <h1>Loading...</h1>;
  
  return (
    <section className="overflow-hidden">
      <div className="mx-auto max-w-5xl px-5 py-24">
        <div className="mx-auto flex flex-wrap items-center lg:w-4/5">
          <div className="relative w-full lg:w-1/2">
            <img
              alt="Book Cover"
              className="h-auto w-full rounded-lg object-contain transition-transform duration-300 transform hover:scale-105"
              src={url}
            />
          </div>
          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
            <h2 className="text-sm font-semibold tracking-widest text-gray-500">Book</h2>
            <h1 className="my-4 text-3xl font-semibold text-black">{data.name}</h1>
            <div className="mb-5 mt-6 flex items-center border-b-2 border-gray-100 pb-5">
              <div className="flex items-center">
                <span className="mr-3 text-sm font-semibold">Author</span>
                <span className="text-sm">{data.author}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="title-font text-xl font-bold text-gray-900">₹{data.price}</span>
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  className="rounded-md border-gray-300 border py-1 px-2 mr-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
                <button
                onClick={order}
                  type="button"
                  className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="px-2 py-10 md:px-0">
        <div className="mx-auto max-w-4xl">
          <div className="md:flex md:items-center md:justify-center md:space-x-14">
            <div className="relative h-20 w-20 flex-shrink-0">
              <img
                className="relative h-20 w-20 rounded-full object-cover"
                src={data.photoURL}
                alt=""
              />
            </div>

            <div className="mt-10 md:mt-0">
              <blockquote>
                <p className="text-xl text-black">
                  Sold By
                </p>
              </blockquote>
              <p className="mt-7 text-lg font-semibold text-black">{data.displayName}</p>
              <p className="mt-1 text-base text-gray-600">{data.userEmail}</p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Detail;
