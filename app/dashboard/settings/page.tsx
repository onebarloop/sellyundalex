import { verifySession } from '@/src/lib/session';
import SettingsForm from './SettingsForm';

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default async function Page() {
  await verifySession();
  return (
    <div>
      <h1 className="font-bold mb-2">Settings</h1>
      <SettingsForm />
    </div>
  );
}
