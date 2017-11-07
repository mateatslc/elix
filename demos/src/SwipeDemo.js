import TouchSwipeMixin from '../../mixins/TouchSwipeMixin.js';
import TrackpadSwipeMixin from '../../mixins/TrackpadSwipeMixin.js';
import * as props from '../../mixins/props.js';
import symbols from '../../mixins/symbols.js';
import ElementBase from '../../elements/ElementBase.js';


const Base =
  TouchSwipeMixin(
  TrackpadSwipeMixin(
    ElementBase
  ));


class SwipeDemo extends Base {

  get props() {
    const swipeFraction = this.state.swipeFraction;
    const formatted = swipeFraction !== null ?
      swipeFraction.toFixed(3) :
      '—';
    const transform = swipeFraction !== null ?
      `translateX(${swipeFraction * 100}%)` :
      'none';
    return props.merge(super.props, {
      $: {
        block: {
          style: {
            transform
          }
        },
        swipeFraction: {
          textContent: formatted
        }
      }
    });
  }

  get [symbols.template]() {
    return `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          overflow-x: hidden;
        }

        .section {
          flex: 1;
        }

        #message {
          font-size: smaller;
          padding: 1em;
        }

        #container {
          align-items: center;
          display: flex;
          flex-direction: column;
          font-size: 48px;
          justify-content: center;
          text-align: center;
        }

        #block {
          background: linear-gradient(to right, lightgray, gray);
          height: 1em;
          width: 100%;
          will-change: transform;
        }
      </style>
      <div class="section">
        <div id="message">
          This demo shows how a component can use TouchSwipeMixin and
          TrackpadSwipeMixin to listen to horizontal touch swipes and trackpad
          swipes, respectively. Swiping with either input method will show the
          current swipe distance as a fraction of the demo width. It will also
          translate the gray block by that fraction so the user feels like they
          are directly moving the block.
        </div>
      </div>
      <div id="container" class="section">
        <div id="swipeFraction"></div>
        <div id="block"></div>
        <div>&nbsp;</div>
      </div>
      <div class="section"></div>
    `;
  }

}


customElements.define('swipe-demo', SwipeDemo);
export default SwipeDemo;