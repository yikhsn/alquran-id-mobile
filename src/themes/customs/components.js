import { createThemedComponent } from 'react-native-theming';
import {
    TouchableOpacity,
    TouchableHighlight,
    ScrollView,
    Switch,
    StatusBar,
    Picker,
    TextInput
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import MaterialsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
    ScrollIntoViewScrollView, 
} from '../../components/ScrollIntoViewScrollView/ScrollIntoViewScrollView';

export const Bar 
    = createThemedComponent(StatusBar, ['barStyle', 'backgroundColor']);

export const ThemedSwitch 
    = createThemedComponent(Switch, ['trackColor', 'thumbColor']);

export const ThemedMaterialsIcon 
    = createThemedComponent(MaterialsIcon, ['color']);

export const ThemedFontAwesome 
    = createThemedComponent(FontAwesome, ['color']);

export const ThemedIonicons 
    = createThemedComponent(Ionicons, ['color']);

export const ThemedMatIcon 
    = createThemedComponent(MatIcon, ['color']);

export const ThemedScrollView 
    = createThemedComponent(ScrollView);

export const ThemedSwipeout 
    = createThemedComponent(Swipeout);

export const ThemedTouchableOpacity 
    = createThemedComponent(TouchableOpacity);

export const ThemedTouchableHighlight 
    = createThemedComponent(TouchableHighlight, ['underlayColor']);

export const ThemedTextInput 
    = createThemedComponent(TextInput, ['placeholderTextColor', 'underlineColorAndroid'])

export const ThemedScrollIntoViewScrollView 
    = createThemedComponent(ScrollIntoViewScrollView);

export const ThemedPicker
    = createThemedComponent(Picker);

export const ThemedPickerItem
    = createThemedComponent(Picker.Item);