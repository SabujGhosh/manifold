import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-prose px-4 py-20 text-center">
      <p className="font-ui text-6xl font-bold text-accent">∄</p>
      <h1 className="font-ui mt-4 text-2xl font-bold text-ink">Not found</h1>
      <p className="font-serif mt-2 text-ink-muted">
        That page or equation doesn’t exist (yet).
      </p>
      <Link
        to="/equations"
        className="font-ui mt-6 inline-block text-accent underline underline-offset-2"
      >
        Browse equations →
      </Link>
    </div>
  );
}
