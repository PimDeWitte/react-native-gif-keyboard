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
    tag: {
        height: 100,
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5,
    },
});

export default class Tag extends PureComponent {


    render() {

        const nativeProps = Object.assign({}, this.props);

        Object.assign(nativeProps, {
            style: [styles.tag, nativeProps.style, {flex: 1}],
            tag: nativeProps.tag
        });

        return <TouchableOpacity onPress={() => {this.props.handleTagSelection(nativeProps.tag.tag)}} style={{flex:1/nativeProps.reactionsPerRow, backgroundColor:'#000'}}>
            <Video source={{uri: nativeProps.tag.src}}
                   repeat={true}
                      ref={(ref) => {
                          this.player = ref
                      }}
                      resizeMode='cover'
                   style={[nativeProps.style]}>
                <View style={{backgroundColor:'rgba(0,0,0,0.5)', flex: 1, flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color:'#fff', fontWeight:'bold'}}>{nativeProps.tag.tag.toUpperCase()}</Text>
                </View>
            </Video>

        </TouchableOpacity>
    }
}


Tag.propTypes = {
    /* Native only */
    tag: PropTypes.object,
    handleTagSelection: PropTypes.function,
    ...ViewPropTypes,
};
