import { Redirect } from '@/components/Redirect';

export const metadata = { title: 'Academic' };

export default function AcademicRedirect() {
  return <Redirect to="/about/" />;
}
