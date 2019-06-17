import { combineReducers } from 'redux';
import gnome from '../gnome/reducer';
import application from '../application/reducer';

export default combineReducers({
  gnome,
  application
});
