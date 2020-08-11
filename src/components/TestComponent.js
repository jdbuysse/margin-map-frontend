import React, { Component, PropTypes } from 'react';
import { Map , List, is, fromJS } from 'immutable';

class HighlightApp extends Component {
    constructor(props) {
      super(props);
    }


    onTextHighlighted(range) {
        this.props.highlightRange(range);
        window.getSelection().removeAllRanges();
    }

    customRenderer(currentRenderedNodes, currentRenderedRange, currentRenderedIndex, onMouseOverHighlightedWord) {
      return this.tooltipRenderer(currentRenderedNodes, currentRenderedRange, currentRenderedIndex, onMouseOverHighlightedWord);
    }
    
    tooltipRenderer(lettersNode, range, rangeIndex, onMouseOverHighlightedWord) {
      return (<Tooltip key={`${range.data.id}-${rangeIndex}`} onVisibleChange={onMouseOverHighlightedWord.bind(this, range)}
                          placement="top"
                          overlay={<div><RaisedButton label={'Reset highlights'} onClick={this.resetHightlight.bind(this, range)} /></div>}
                          defaultVisible={true}
                          animation="zoom">
          <span>{lettersNode}</span>
      </Tooltip>);
  }
    render () {
        return (
            <div>
            <h1>Example with tooltip</h1>
            <Highlightable ranges={this.props.ranges.get('2', new List()).toJS()}
                   enabled={true}
                   style={{textAlign: 'left'}}
                   onTextHighlighted={this.onTextHighlighted.bind(this)}
                   id={'2'}
                   highlightStyle={{
                     backgroundColor: '#ffcc80'
                   }}
                   rangeRenderer={this.customRenderer.bind(this)}
                   text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae magna lacus. Sed rhoncus tortor eget venenatis faucibus. Vivamus quis nunc vel eros volutpat auctor. Suspendisse sit amet lorem tristique lectus hendrerit aliquet. Aliquam erat volutpat. Vivamus malesuada, neque at consectetur semper, nibh urna ullamcorper metus, in dapibus arcu massa feugiat erat. Nullam hendrerit malesuada dictum. Nullam mattis orci diam, eu accumsan est maximus quis. Cras mauris nibh, bibendum in pharetra vitae, porttitor at ante. Duis pharetra elit ante, ut feugiat nibh imperdiet eget. Aenean at leo consectetur, sodales sem sit amet, consectetur massa. Ut blandit erat et turpis vestibulum euismod. Cras vitae molestie libero, vel gravida risus. Curabitur dapibus risus eu justo maximus, efficitur blandit leo porta. Donec dignissim felis ac turpis pharetra lobortis. Sed quis vehicula nulla.'}
            />
            </div>
        )
    }

}

    function mapStateToProps(state) {
        return {
          ranges: state.app.get('ranges', new Map())
        };
      }
      
    function mapDispatchToProps(dispatch) {
        return {
          highlightRange: range => dispatch(appActions.highlightRange(range)),
          removeHighlightRange: range => dispatch(appActions.removeHighlightRange(range))
        };
      }


