import { Redirect } from '@/components/Redirect';

export const metadata = { title: 'Boxing' };

export default function BoxingRedirect() {
  return <Redirect to="/about/interests/" />;
}
