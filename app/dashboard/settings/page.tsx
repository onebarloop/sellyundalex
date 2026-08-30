import { verifySession } from '@/src/lib/session';
import SettingsForm from './SettingsForm';

export default async function Page() {
  await verifySession();
  return (
    <div>
      <h1 className="font-bold mb-2">Settings</h1>
      <SettingsForm />
    </div>
  );
}
