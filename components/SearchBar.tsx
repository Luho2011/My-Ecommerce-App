'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from 'next/link';

type ProductSuggestion = {
  id: string;
  title: string;
  slug: string;
};

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname(); // z.B "/herren"
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);

  useEffect(() => {
    if (query.length < 2) {
    setSuggestions([]);
    return;
  }

    const fetchSuggestions = async () => {
      const url = `/api/search?q=${query}`;
      const res = await fetch(url);
      const data: ProductSuggestion[] = await res.json();
      setSuggestions(data);
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [query]);

    // Submit (Enter oder Button „Los“)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuggestions([]);

    const url = `${pathname}?q=${encodeURIComponent(query)}`;

    router.push(url);
  };

  return (
    <div className='relative w-full'>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nach Artikeln und Marken suchen"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full min-w-0 h-11 pl-4 pr-4 py-2 rounded-xl bg-white focus:outline-none"
        />
          <button
            type="submit"
            className="text-black cursor-pointer absolute right-5 top-1/2 -translate-y-1/2"
          >
            <MagnifyingGlassIcon className="h-7 w-7 hover:scale-120" />
          </button>
      </form>

      {suggestions.length > 0 && (
        <ul className="absolute mt-1 w-full bg-white border rounded-xl shadow-lg z-10">
          {suggestions.map((product) => (
            <li key={product.id}>
            <Link
              href={`${pathname}?q=${encodeURIComponent(product.title)}`}
              className="block px-3 py-2 hover:bg-gray-100 rounded-xl"
              onClick={() => setSuggestions([])}
            >
              {product.title}
            </Link>
            </li>
          ))}
        </ul>
      )}

    </div>
  )
}

