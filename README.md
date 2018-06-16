# react-native-gfycat
WIP! Will post when finished. This is a react native implementation that works with gfycat reactions so that you can implement reactions into your react native apps. The core of it is very simple - we use react-native-video to display all the reactions from the API and give you a callback with the MP4 file that was selected by the user.

You can then choose what to do with the MP4 file. Most of the use cases will include sending the mp4 as a raw text and auto-resolving raw text to <Video> elements on the receiving side.

This is an unofficial library and not officially endorsed by Gfycat.

# Setup

## This library requires you to have set up and linked react-native-video. If you have not set this up (and linked it using react-native link) this library will not work.

# Installation

Make sure react-native-video is linked and installed in your project. It is not added as a dependency by design because it can only be linked once.

1: Install the module from npm
``` npm install react-native-video --save```

2: Import the module at the top of your file
```import Gfycat from 'react-native-gfycat'```

3: Use the module
<Gfycat.Reactions
reactionsPerRow={3}
autoPlayEnabled={true}
rowStyle={{}}
style={{}}
ref={v => {this.gfycatReactionsModal = v;}}/>


## Future development
A major downside is that we currently do not have native video caching for these reactions implemented when autoplay is enabled, resulting in higher data usage off-wifi. I therefore enable turning autoplay off if your users are on mobile networks.  In the future I'd like to cache the default videos for that day using RNFS and load them from cache instead of remotely.



