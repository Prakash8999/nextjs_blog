'use client'
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const ChangeablePlaceholderSearchBar = () => {
  const [placeholder, setPlaceholder] = useState('Search on redlone');
  const [query, setQuery] = useState("")
  const router = useRouter();
  const togglePlaceholder = () => {
    setPlaceholder((prevPlaceholder) =>
      prevPlaceholder === 'Search on Redlone' ? 'Search User or Title or Tags' : 'Search on Redlone'
    );
  };
  useEffect(() => {
    const intervalId = setInterval(togglePlaceholder, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const encodedQuery = encodeURI(query)
    router.push(`/search?q=${encodedQuery}`)
    console.log(encodedQuery);

  }
  return (
    <div className="relative w-[50vw]">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <form action="" onSubmit={onSearch}>

        <input
          type="search"
          id="default-search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
          }}
          className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-3xl bg-gray-50 focus:ring-blue-500 outline-none"
          placeholder={placeholder}
          style={{
            transition: 'placeholder 1s ease', // Add a transition for the placeholder property
            WebkitTransition: 'placeholder 0.5s ease', // For older versions of Safari
          }}
          required
        />
      </form>
    </div>
  );
};

export default ChangeablePlaceholderSearchBar;
