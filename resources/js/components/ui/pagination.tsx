import { Link } from '@inertiajs/react';
import React from 'react';

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginationProps {
  links: PaginationLink[];
  currentPage: number;
  lastPage: number;
}

export function Pagination({ links, currentPage, lastPage }: PaginationProps) {
  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      {links.map((link, index) => {
        // Parse label untuk Previous/Next
        let label = link.label;
        if (label.includes('Previous')) label = '‹';
        if (label.includes('Next')) label = '›';

        // Skip jika tidak ada URL
        if (!link.url) {
          return (
            <span
              key={index}
              className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-lg border border-gray-300 bg-gray-100 text-gray-400"
            >
              {label}
            </span>
          );
        }

        return (
          <Link
            key={index}
            href={link.url}
            preserveState
            className={`flex h-10 w-10 items-center justify-center rounded-lg border font-medium transition-colors ${
              link.active
                ? 'border-orange bg-orange text-white hover:bg-orange/90'
                : 'border-gray-300 bg-white text-gray-700 hover:border-orange hover:bg-orange/10 hover:text-orange'
            }`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
