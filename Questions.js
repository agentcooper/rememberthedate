'use strict';

var React = require('react-native');
var {
  PickerIOS,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  LinkingIOS
} = React;

var shuffle = require('./shuffle');

var events = shuffle(require('./events'));

var PickerItemIOS = PickerIOS.Item;

var Question = React.createClass({
  render: function() {
    return (
        <Text style={styles.question} onPress={this.open}>
          {this.props.data.event} {this.props.data.year}
        </Text>
    )
  }
});

var Questions = React.createClass({
  getInitialState: function() {
    return {
      year: '2000',
      current: 0,
      showCorrect: false,
      isCorrect: false
    };
  },

  buildYearRange: function(start, end) {
    var res = [];

    for (var year = start; year <= end; year++) {
      res.push(String(year));
    }

    return res;
  },

  isCorrect: function() {
    return String(this.state.year) === String(events[this.state.current].year);
  },

  check: function() {
    if (!this.state.showCorrect) {
      this.setState({
        showCorrect: true
      });
    } else {
      this.setState({
        current: this.state.current + 1,
        showCorrect: false
      });
    }
  },

  render: function() {
    var wrongMessage = 'Wrong, this was in ' + events[this.state.current].year;

    var message = this.isCorrect() ? 'Correct' : wrongMessage;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {this.state.showCorrect ?
            message : 'Choose a correct date for the event'}
        </Text>

        <Question data={events[this.state.current]} />

        <PickerIOS
          style={styles.picker}
          selectedValue={this.state.year}
          onValueChange={(year) => this.setState({year})}>
          {this.buildYearRange(1900, 2015).map((year) => (
            <PickerItemIOS
              key={year}
              value={year}
              label={year}/>
            )
          )}
        </PickerIOS>

        <TouchableOpacity onPress={this.check} style={styles.checkButton}>
          <Text style={styles.big}>
            {this.state.showCorrect ?
              'Continue' : 'Check the answer'}
          </Text>
        </TouchableOpacity>

      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 64
  },
  question: {
    flex: 1,
    alignSelf: 'center',
  },
  picker: {
    flex: 1,
    // flexDirection: 'column',
    // alignSelf: 'center'
  },
  text: {
    flex: 1,
    paddingBottom: 20,
    alignSelf: 'center'
  },
  check: {
    fontSize: 15,
    flex: 1
  },
  checkButton: {
    flex: 1,
    alignSelf: 'flex-end'
  },
  big: {
    paddingBottom: 20,
    fontSize: 25,
    alignSelf: 'center',
  }
});

module.exports = Questions;
