import { useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer';

function useAuthenticaion() {
    const { user, token } = useSelector((state: RootState) => state.auth)
    return user && token
}

export default useAuthenticaion;