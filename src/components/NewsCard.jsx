import React from 'react';

export default function NewsCard({ item }) {
  // item: { title, excerpt, image, date, category, slug }
  return (
    <article className="card bg-white dark:bg-gray-900 shadow-soft-lg rounded-lg overflow-hidden transition transform hover:-translate-y-1">
      <a href={`/news/${item.slug}`}>
        <div className="h-44 md:h-36 w-full relative">
          <img src={item.image || '/images/news-placeholder.jpg'} alt={item.title} className="object-cover w-full h-full" />
        </div>
      </a>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-qara-500">{item.category}</span>
          <time className="text-xs text-gray-400">{item.date}</time>
        </div>
        <h3 className="text-lg font-semibold mb-2">
          <a href={`/news/${item.slug}`} className="hover:text-qara-500">{item.title}</a>
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{item.excerpt}</p>
      </div>
    </article>
  );
}
