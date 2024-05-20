import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import BookCard from "../components/BookCard";

const Home = () => {
  const { isLoggedIn, listAllBooks } = useFirebase();
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      listAllBooks().then((books) => setBooks(books.docs));
    }
  }, [isLoggedIn, listAllBooks, navigate]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>
          <p className="text-2xl font-bold mb-4">Please log in or sign up to view content.</p>
          <div className="flex space-x-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
        {books.map((book) => (
          <BookCard key={book.id} link={`/book/view/${book.id}`} id={book.id} {...book.data()} />
        ))}
      </div>
    </div>
  );
};

export default Home;
