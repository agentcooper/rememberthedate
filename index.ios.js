/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  Text,
  View,
} = React;

var Questions = require('./Questions');

var rememberthedate = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Quiz',
          component: Questions
        }}/>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});

AppRegistry.registerComponent('rememberthedate', () => rememberthedate);

module.exports = rememberthedate;
