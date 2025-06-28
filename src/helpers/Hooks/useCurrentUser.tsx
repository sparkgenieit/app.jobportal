import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function useCurrentUser() {
  const user = useSelector((state: RootState) => state.user.currentUser);
  return user;
}
