/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import StackNavigation from './lib/Navigation/StackNavigation';

AppRegistry.registerComponent(appName, () => StackNavigation);
