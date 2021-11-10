import '@testing-library/react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import App from './App';

Enzyme.configure({ adapter: new Adapter() });


/**
 * Factory function to create ShallowWrapper for the App component
 * @function setup
 * @param {object} props - component props specific to this setup.
 * @param {any} state - Initial state for this setup.
 * @returns {ShallowWrapper}
 */
const setup = (props={}, state=null) => {
    return shallow(<App {...props} />)
}


/**
 * 
 * @param {*} wrapper 
 * @param {*} value 
 */
const findByTestAttr = (wrapper, value) => {
    return wrapper.find(`[data-test="${value}"]`)
}

test('renders without error', () => {
    // const wrapper = s
    const wrapper = setup();
    //Here it's trying to find a component with that tag inside the App component
    const appComponent = findByTestAttr(wrapper, 'component-app');
    // Here it is using the expect from jest and is expecting one node of that component with that tag of 'data-test="component-app"'
    expect(appComponent.length).toBe(1);
});

test('renders increment button', () => {
    const wrapper = setup();
    const incrementButton = findByTestAttr(wrapper, 'increment-button');
    expect(incrementButton.length).toBe(1);});

test('renders counter display', () => {
    const wrapper = setup();
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.length).toBe(1);});

test('counter starts at 0', () => {
    // const wrapper = s
});

test('clicking button increments counter display', () => {
    // const wrapper = s
});
