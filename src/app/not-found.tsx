import Link from "next/link";

export default function NotFound() {
  return (
    <section className="empty-state content-wrap">
      <p className="eyebrow">404</p>
      <h1 className="empty-state__title">This page moved differently.</h1>
      <p>
        The product, collection, or page you requested could not be found.
      </p>
      <Link className="button button--dark" href="/">
        Return home
      </Link>
    </section>
  );
}
