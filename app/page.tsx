import { LangProvider } from '@/components/LangProvider';
import Site from '@/components/Site';

export default function Page() {
  return (
    <LangProvider>
      <Site />
    </LangProvider>
  );
}
