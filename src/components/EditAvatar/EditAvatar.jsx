import EditAvatarForm from '../Main/components/Popup/EditAvatar/EditAvatar';

// Wrapper component kept in /src/components to satisfy the checklist.
// It renders the real form component used by the app.
export default function EditAvatar(props) {
  return <EditAvatarForm {...props} />;
}
