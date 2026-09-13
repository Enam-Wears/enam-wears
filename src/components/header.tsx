"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowRight,
  Menu,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { searchCatalog } from "../lib/catalog";
import { useCart } from "../components/cart-provider";

const navigation = [
  { label: "Men", href: "/shop/men" },
  { label: "Women", href: "/shop/women" },
  { label: "New In", href: "/shop/new-in" },
  { label: "Promo Sales", href: "/shop/promo-sales" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const { itemCount, openCart } = useCart();

  const searchResults = useMemo(
    () => searchCatalog(query).slice(0, 5),
    [query],
  );

  useEffect(() => {
    if (!isSearchOpen) {
      return;
    }

    const timeout = window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 50);

    return () => window.clearTimeout(timeout);
  }, [isSearchOpen]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") {
        return;
      }

      setIsMobileMenuOpen(false);
      setIsSearchOpen(false);
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function isActiveRoute(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function closePanels() {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }

  function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    closePanels();
    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  }

  return (
    <>
      <div className="announcement">
        <div className="announcement__inner content-wrap">
          Enam Wears — Confidence in Motion
        </div>
      </div>

      <header className="site-header">
        <div className="site-header__inner content-wrap">
          <Link
            className="brand"
            href="/"
            onClick={closePanels}
            aria-label="Enam Wears home"
          >
            <span className="brand__mark">E</span>
            <span className="brand__name">Enam Wears</span>
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navigation.map((item) => (
              <Link
                className={`nav-link ${
                  isActiveRoute(item.href) ? "nav-link--active" : ""
                }`}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="nav-actions">
            <button
              className="icon-button"
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              aria-label="Search products"
            >
              <Search size={20} strokeWidth={1.9} />
            </button>

            <button
              className="icon-button"
              type="button"
              onClick={openCart}
              aria-label={`Open shopping bag with ${itemCount} items`}
            >
              <ShoppingBag size={20} strokeWidth={1.9} />
              {itemCount > 0 ? (
                <span className="cart-count">{itemCount}</span>
              ) : null}
            </button>

            <button
              className="icon-button mobile-trigger"
              type="button"
              onClick={() => {
                setIsSearchOpen(false);
                setIsMobileMenuOpen((current) => !current);
              }}
              aria-label={
                isMobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? (
                <X size={22} strokeWidth={1.9} />
              ) : (
                <Menu size={22} strokeWidth={1.9} />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen ? (
          <div className="mobile-panel" id="mobile-navigation">
            <nav className="mobile-nav content-wrap" aria-label="Mobile navigation">
              {navigation.map((item) => (
                <Link
                  className="mobile-nav__link"
                  href={item.href}
                  key={item.href}
                  onClick={closePanels}
                >
                  {item.label}
                  <ArrowRight size={17} />
                </Link>
              ))}
            </nav>
          </div>
        ) : null}
      </header>

      {isSearchOpen ? (
        <div className="search-overlay">
          <button
            className="search-overlay__backdrop"
            type="button"
            aria-label="Close search"
            onClick={() => setIsSearchOpen(false)}
          />

          <div
            className="search-overlay__panel"
            role="dialog"
            aria-modal="true"
            aria-label="Search Enam Wears products"
          >
            <div className="search-overlay__header">
              <p>Search Enam Wears</p>

              <button
                className="icon-button"
                type="button"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close search"
              >
                <X size={20} />
              </button>
            </div>

            <form
              className="search-overlay__form"
              onSubmit={handleSearchSubmit}
            >
              <Search size={22} strokeWidth={1.8} />

              <input
                ref={searchInputRef}
                className="search-overlay__input"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search tees, jackets, leggings..."
                aria-label="Search products"
              />

              <button
                className="search-overlay__button"
                type="submit"
              >
                Search
              </button>
            </form>

            {query.trim() ? (
              <div className="search-overlay__results">
                {searchResults.length ? (
                  <>
                    {searchResults.map((product) => (
                      <Link
                        className="search-overlay__result"
                        href={`/products/${product.slug}`}
                        key={product.id}
                        onClick={closePanels}
                      >
                        <img
                          className="search-overlay__image"
                          src={product.images[0]}
                          alt={product.name}
                        />

                        <span className="search-overlay__copy">
                          <strong>{product.name}</strong>
                          <span>{product.department}</span>
                        </span>

                        <ArrowRight size={18} />
                      </Link>
                    ))}

                    <Link
                      className="search-overlay__all"
                      href={`/search?q=${encodeURIComponent(query.trim())}`}
                      onClick={closePanels}
                    >
                      View all results
                      <ArrowRight size={16} />
                    </Link>
                  </>
                ) : (
                  <p className="search-overlay__empty">
                    No products matched “{query}”.
                  </p>
                )}
              </div>
            ) : (
              <p className="search-overlay__empty">
                Try searching by product name, category, color, or SKU.
              </p>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
