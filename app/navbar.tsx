'use client';

import Link from 'next/link';
import React from 'react';

const styles: Record<string, React.CSSProperties> = {
  nav: {
    backgroundColor: '#004080',
    color: '#ffffff',
    padding: '1rem 2rem',
    fontFamily: `"VT323", monospace`,
  },
  list: {
    display: 'flex',
    gap: '1.5rem',
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  },
  listItem: {
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, color 0.3s ease',
  },
  listItemHover: {
    transform: 'scale(1.1)',
    color: '#00ffff',
  },
};

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <ul style={styles.list}>
        <li
          style={styles.listItem}
          className="hoverEffect"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform =
              styles.listItemHover.transform as string;
            (e.currentTarget as HTMLElement).style.color =
              styles.listItemHover.color as string;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'none';
            (e.currentTarget as HTMLElement).style.color = '';
          }}
        >
          <Link href="/">Accueil</Link>
        </li>
        <li
          style={styles.listItem}
          className="hoverEffect"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform =
              styles.listItemHover.transform as string;
            (e.currentTarget as HTMLElement).style.color =
              styles.listItemHover.color as string;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'none';
            (e.currentTarget as HTMLElement).style.color = '';
          }}
        >
          <Link href="/characters">Characters</Link> {/* Correction du lien */}
        </li>
        <li
          style={styles.listItem}
          className="hoverEffect"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform =
              styles.listItemHover.transform as string;
            (e.currentTarget as HTMLElement).style.color =
              styles.listItemHover.color as string;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'none';
            (e.currentTarget as HTMLElement).style.color = '';
          }}
        >
          <Link href="/animals">Animals</Link> 
        </li>
      </ul>
    </nav>
  );
}
