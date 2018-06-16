import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    StyleSheet,
    ViewPropTypes,
    TouchableOpacity,
} from 'react-native';

import Video from "react-native-video";


/**
 * Basic styles that are added to the component in addition to the nativeprops
 */
const styles = StyleSheet.create({
    gif: {
        height: 100,
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5,
    },
});

export default class Gif extends PureComponent {


    render() {

        const nativeProps = Object.assign({}, this.props);

        Object.assign(nativeProps, {
            style: [styles.gif, nativeProps.style, {flex: 1}],
            gif: nativeProps.gif
        });

        return <TouchableOpacity onPress={() => {this.props.handleGifSelection(nativeProps.gif.src)}} style={{flex:1/nativeProps.reactionsPerRow, backgroundColor:'#000'}}>
            <Video source={{uri: nativeProps.gif.src}}
                   repeat={true}
                      ref={(ref) => {
                          this.player = ref
                      }}
                      resizeMode='cover'
                   style={[nativeProps.style]}/>

        </TouchableOpacity>
    }
}


Gif.propTypes = {
    /* Native only */
    gif: PropTypes.object,
    handleGifSelection: PropTypes.function,
    ...ViewPropTypes,
};
