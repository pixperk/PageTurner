import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';
import BookCard from '../components/BookCard';
import Login from './Login';

const Orders = () => {
  const [books, setBooks] = useState([]);
  const { user, isLoggedIn, fetchBooks } = useFirebase();

  useEffect(() => {
    if (isLoggedIn) {
      fetchBooks(user.uid).then((books) => setBooks(books.docs));
    }
  }, [fetchBooks, isLoggedIn, user.uid]);

  if (!isLoggedIn) {
    return (
      <div>
        <h1>Please Log in</h1>
        <Login />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-sm font-bold mb-6 mt-5">Your Books</h1>
      {books.map((book) => (
        <BookCard key={book.id} id={book.id} link={`/book/orders/${book.id}`} {...book.data()} />
      ))}
    </div>
  );
};

export default Orders;
