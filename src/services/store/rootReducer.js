import { combineReducers } from 'redux';
import userSlice from './slices/userSlice';
import alertSlice from './slices/alertSlice';
import mintcardSlice from './slices/mintcardSlice';
import goldcardSlice from './slices/goldcardSlice';

const rootReducer = combineReducers({
    user: userSlice,
    alert: alertSlice,
    mintcard: mintcardSlice,
    goldcard: goldcardSlice,
});

export default rootReducer;