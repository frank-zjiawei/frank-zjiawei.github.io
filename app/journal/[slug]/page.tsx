import { Redirect } from '@/components/Redirect';

export function generateStaticParams() {
  return [{ slug: 'why-a-graph-for-a-portfolio' }, { slug: 'cv-to-substance' }];
}

export default function JournalSlugRedirect() {
  return <Redirect to="/" />;
}
