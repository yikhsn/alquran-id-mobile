// this create in separate file to easier to create themedComponent to apply theme
import { wrapScrollViewConfigured } from 'react-native-scroll-into-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// create wrapScrollViewConfigured for scroll into some ayat section
export const ScrollIntoViewScrollView = wrapScrollViewConfigured({
    refPropName: 'innerRef'
})(KeyboardAwareScrollView);