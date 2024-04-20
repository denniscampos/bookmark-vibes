import { ProfileUpload } from './ProfileUpload';
import { UpdateProfile } from './_components/UpdateProfile';

export default function Page() {
  return (
    <div>
      <h1>Profile page.</h1>
      <UpdateProfile />
      {/* <ProfileUpload /> */}
    </div>
  );
}
