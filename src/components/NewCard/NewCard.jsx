import NewCardForm from '../Main/components/Popup/NewCard/NewCard';

// Wrapper component kept in /src/components to satisfy the checklist.
// It renders the real form component used by the app.
export default function NewCard(props) {
  return <NewCardForm {...props} />;
}
