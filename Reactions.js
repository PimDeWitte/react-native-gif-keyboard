import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    FlatList,
    Text,
    requireNativeComponent,
    NativeModules,
    View,
    ViewPropTypes,
    Image,
    Dimensions,
    Alert
} from 'react-native';

import Api from './Api';
import Tag from './Tag';
import Gif from './Gif';


/**
 * Basic styles that are added to the component in addition to the nativeprops
 */
const styles = StyleSheet.create({
    base: {
        overflow: 'hidden',
    },
    gfy: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});


/**
 * Backup cache that is not in the state, so that we can return to this whenever a user clears their input without hitting the API every time.
 */

const tagCache = [];


export default class Reactions extends PureComponent {

    constructor(props) {
        super();

        this.state = {
            cache: [],
            mode: "tag"
        };

    }

    componentDidMount() {
        this._populateEmptyCache();
    }


    /**
     * Populate tags once from the API if necessary. Other requests are made via state since the UI needs to respond.
     * @private
     */
    _populateEmptyCache() {

        // grab from the API only if backup cache is empty.
        if (tagCache.length > 0) {
            this.setState({
                cache: tagCache
            })
            return;
        }
        Api.get("/reactions/populated?gfyCount=2").then(body => {
            if (body && body.tags) {
                body.tags.forEach(gfy => {
                    if(gfy && gfy.gfycats && gfy.gfycats.length > 0) {
                        if(tagCache.length < 20)
                        tagCache.push(gfy);
                    }
                });

                this.setState({
                    cache: tagCache,
                    mode: "tag"
                });
            }
        });
    }


    render() {

        const nativeProps = Object.assign({}, this.props);
        Object.assign(nativeProps, {
            style: [styles.base, nativeProps.style],
        });

        return <View style={nativeProps.style}>
            <FlatList
                style={{
                    flex: 1
                }}
                initialNumToRender={8}
                data={this.state.cache}
                keyboardShouldPersistTaps={true}
                directionalLockEnabled={true}
                removeClippedSubviews={true}
                numColumns={nativeProps.reactionsPerRow}
                renderItem={this._renderItem}
            />
        </View>
    }

    _handleTagSelection = (tag) => {
        console.log(tag)
        Api.get(`/reactions/populated?tagName=${tag}&gfyCount=20`).then(body => {
            console.log(body);

            if (body && body.gfycats) {
                const results = [];
                body.gfycats.forEach(gfy => {
                        if(results.length < 20) {
                            console.log("pushing gfy");
                            results.push(gfy);
                    }
                });

                this.setState({
                    cache: results,
                    mode: "gfy"
                });
            }
        });
    }
    _handleGifSelection = (gif) => {
        Alert.alert(
            'Selected url for callback:',
            gif,
            [
                {text: 'Ok', onPress: () => Console.log("canceled"), style: 'cancel'},
            ],
            {cancelable: false}
        )
    }

    _renderTag = ({item, index}) => {
        const nativeProps = Object.assign({}, this.props);

        const necessaryProps = {
            src: item.gfycats[0].miniUrl,
            poster: item.gfycats[0].miniPosterUrl,
            tag: item.tag
        }
        return <Tag style={nativeProps.tagStyle} reactionsPerRow={nativeProps.reactionsPerRow} tag={necessaryProps} handleTagSelection={this._handleTagSelection}/>

    }

    _renderGif = ({item, index}) => {
        const nativeProps = Object.assign({}, this.props);

        const necessaryProps = {
            src: item.miniUrl,
            poster: item.miniPosterUrl,
        }
        return <Gif style={nativeProps.tagStyle} reactionsPerRow={nativeProps.reactionsPerRow} gif={necessaryProps} handleGifSelection={this._handleGifSelection}/>

    }

    _renderItem = ({item, index}) => {
        return this.state.mode === "tag" ? this._renderTag({item, index}) : this._renderGif({item, index})
    };
}


Reactions.propTypes = {
    /* Native only */
    reactionsPerRow: PropTypes.number,
    autoPlayEnabled: PropTypes.boolean,
    rowStyle: PropTypes.object,
    tagStyle: PropTypes.object,
    ...ViewPropTypes,
};
