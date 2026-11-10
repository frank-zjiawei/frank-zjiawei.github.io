import { Redirect } from '@/components/Redirect';

export const metadata = { title: 'Harvard' };

export default function HarvardRedirect() {
  return <Redirect to="/about/" />;
}
