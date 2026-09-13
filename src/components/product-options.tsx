import Link from "next/link";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__grid content-wrap">
        <div className="site-footer__brand">
          <p className="eyebrow">Enam Wears</p>
          <p>
            Premium movement essentials for confidence in motion.
            Designed with bold energy and everyday versatility.
          </p>
        </div>

        <div>
          <p className="footer-heading">Shop</p>
          <div className="footer-links">
            <Link href="/shop/men">Men</Link>
            <Link href="/shop/women">Women</Link>
            <Link href="/shop/new-in">New In</Link>
            <Link href="/shop/promo-sales">Promo Sales</Link>
          </div>
        </div>

        <div>
          <p className="footer-heading">Help</p>
          <div className="footer-links">
            <span>Delivery & Shipping</span>
            <span>Returns & Exchanges</span>
            <span>Size Guide</span>
            <span>Contact Us</span>
          </div>
        </div>

        <div>
          <p className="footer-heading">Follow</p>
          <div className="footer-links">
            <span>Instagram</span>
            <span>TikTok</span>
            <span>Facebook</span>
            <span>Ghana</span>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom content-wrap">
        <span>© {currentYear} Enam Wears. All rights reserved.</span>
        <span>Built for the everyday.</span>
      </div>
    </footer>
  );
}
