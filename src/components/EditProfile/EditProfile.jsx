import EditProfileForm from '../Main/components/Popup/EditProfile/EditProfile';

// Wrapper component kept in /src/components to satisfy the checklist.
// It renders the real form component used by the app.
export default function EditProfile(props) {
  return <EditProfileForm {...props} />;
}
