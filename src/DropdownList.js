import { merge } from './updates.js';
import MenuButton from './MenuButton.js';
import SelectedItemTextValueMixin from './SelectedItemTextValueMixin';


const Base =
  SelectedItemTextValueMixin(
    MenuButton
  );


class DropdownList extends Base {

  // By default, opening the menu re-selects the component item that's currently
  // selected.
  get defaultMenuSelectedIndex() {
    return this.state.selectedIndex;
  }

  get defaultState() {
    return Object.assign({}, super.defaultState, {
      selectionRequired: true
    });
  }

  refineState(state) {
    let result = super.refineState ? super.refineState(state) : true;
    const { closeResult, opened, selectedIndex } = state;
    if (!opened && this.opened && closeResult && selectedIndex !== closeResult) {
      // Closing: Update our selection from menu selection.
      state.selectedIndex = closeResult;
      result = false;
    }
    return result;
  }

  get sourceSlotContent() {
    return `
      <div id="value"></div>
      <slot name="popupIndicator">
        <svg id="downIcon" xmlns="http://www.w3.org/2000/svg" width="10" height="5" viewBox="0 0 10 5">
          <path d="M 0 0 l5 5 5 -5 z"/>
        </svg>
        <svg id="upIcon" xmlns="http://www.w3.org/2000/svg" width="10" height="5" viewBox="0 0 10 5">
          <path d="M 0 5 l5 -5 5 5 z"/>
        </svg>
      </slot>
    `;
  }

  get updates() {
    const popupPosition = this.state.popupPosition;
    return merge(super.updates, {
      $: {
        downIcon: {
          style: {
            display: popupPosition === 'below' ? 'block' : 'none',
            fill: 'currentColor',
            'margin-left': '0.25em',
          }
        },
        upIcon: {
          style: {
            display: popupPosition === 'above' ? 'block' : 'none',
            fill: 'currentColor',
            'margin-left': '0.25em',
          }
        },
        value: {
          textContent: this.value
        }
      }
    });
  }

}


export default DropdownList;
customElements.define('elix-dropdown-list', DropdownList);