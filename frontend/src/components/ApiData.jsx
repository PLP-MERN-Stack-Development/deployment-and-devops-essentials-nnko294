import React, { useEffect, useState } from 'react';

const PAGE_SIZE = 10;

const ApiData = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        if (mounted) setItems(data);
      })
      .catch((err) => {
        if (mounted) setError(err.message || 'Error fetching data');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(t);
  }, [query]);

  const filtered = items.filter((it) =>
    it.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
    it.body.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-4">
        <label htmlFor="search-posts" className="sr-only">Search posts</label>
        <input
          id="search-posts"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1); }}
          placeholder="Search posts..."
          className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          aria-label="Search posts"
        />
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 dark:bg-gray-700 rounded animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="p-4 text-red-500" role="alert">Error: {error}</div>
      ) : (
        <>
          <ul className="space-y-3">
            {paged.map((post) => (
              <li key={post.id} className="border rounded p-3 dark:border-gray-700 hover:shadow-sm transition">
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{post.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center gap-2 justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">Page {page} / {totalPages}</div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                disabled={page === 1}
                aria-label="Previous page"
              >Prev</button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                disabled={page === totalPages}
                aria-label="Next page"
              >Next</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ApiData;
