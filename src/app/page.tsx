/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductGrid } from "../components/product-grid";
import { getProductsForCollection } from "../lib/catalog";

export default function HomePage() {
  const newArrivals = getProductsForCollection("new-in").slice(0, 4);
  const bestSellers = getProductsForCollection("best-sellers").slice(0, 4);

  return (
    <>
      <section className="hero">
        <img
          className="hero__image"
          src="https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=2200&q=90"
          alt="Athlete wearing performance apparel"
        />

        <div className="hero__shade" />

        <div className="hero__content content-wrap">
          <p className="eyebrow">Enam Wears / 01</p>

          <h1 className="display">
            Built for
            <br />
            the everyday.
          </h1>

          <p className="hero__copy">
            Premium movement essentials. Clean silhouettes. Confidence in
            every step.
          </p>

          <div className="hero__actions">
            <Link className="button button--light" href="/shop/new-in">
              Shop New In
              <ArrowRight size={18} />
            </Link>

            <Link className="button button--ghost-light" href="/shop/men">
              Explore Men
            </Link>
          </div>
        </div>
      </section>

      <section className="feature-strip">
        <div className="content-wrap feature-strip__inner">
          <div className="feature-item">
            <span>01</span>
            Premium silhouette
          </div>

          <div className="feature-item">
            <span>02</span>
            Designed for movement
          </div>

          <div className="feature-item">
            <span>03</span>
            Ghanaian brand, global energy
          </div>
        </div>
      </section>

      <section className="section content-wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Shop by department</p>
            <h2 className="section-title">Move your way.</h2>
          </div>
        </div>

        <div className="collection-grid">
          <Link className="collection-card" href="/shop/men">
            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1400&q=85"
              alt="Men's Enam Wears collection"
            />

            <div className="collection-card__shade" />

            <div className="collection-card__content">
              <p>Built for movement</p>
              <h3>Men</h3>

              <span>
                Shop collection
                <ArrowRight size={17} />
              </span>
            </div>
          </Link>

          <Link className="collection-card" href="/shop/women">
            <img
              src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1400&q=85"
              alt="Women's Enam Wears collection"
            />

            <div className="collection-card__shade" />

            <div className="collection-card__content">
              <p>Confidence in motion</p>
              <h3>Women</h3>

              <span>
                Shop collection
                <ArrowRight size={17} />
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section className="section section--soft">
        <div className="content-wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Latest release</p>
              <h2 className="section-title">New arrivals.</h2>
            </div>

            <Link className="text-link" href="/shop/new-in">
              View all
              <ArrowRight size={17} />
            </Link>
          </div>

          <ProductGrid products={newArrivals} />
        </div>
      </section>

      <section className="section content-wrap">
        <div className="promo-banner">
          <img
            className="promo-banner__image"
            src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=2200&q=85"
            alt="Woman training outdoors"
          />

          <div className="promo-banner__shade" />

          <div className="promo-banner__content">
            <p className="eyebrow">Edit / Training essentials</p>

            <h2>
              Quiet confidence.
              <br />
              Strong energy.
            </h2>

            <Link
              className="button button--accent"
              href="/shop/promo-sales"
            >
              Explore Promo Sales
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="content-wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Most wanted</p>
              <h2 className="section-title">Best sellers.</h2>
            </div>

            <Link className="text-link" href="/shop/men">
              Shop all
              <ArrowRight size={17} />
            </Link>
          </div>

          <ProductGrid products={bestSellers} />
        </div>
      </section>

      <section className="home-note">
        <div className="content-wrap">
          <p>
            <strong>Catalog preview:</strong> Product pricing, final imagery,
            descriptions, and inventory will be imported from the Enam Wears
            catalog before launch.
          </p>
        </div>
      </section>
    </>
  );
}
