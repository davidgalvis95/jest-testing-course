import '@testing-library/react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import App from './App';
import Modal from './Modal';

Enzyme.configure({ adapter: new Adapter() });


/**
 * Factory function to create ShallowWrapper for the App component
 * @function setup
 * @param {object} props - component props specific to this setup.
 * @param {any} state - Initial state for this setup.
 * @returns {ShallowWrapper}
 */
const setup = (props={}, state=null) => {
    //The shallow method renders a particular component
    const wrapper =  shallow(<App {...props} />)
    if(state){
        wrapper.setState(state);
    }
    return wrapper;
}

const modalSetup = (props={}, state=null) => {
    //The shallow method renders a particular component
    const wrapper =  shallow(<Modal {...props} />)
    if(state){
        wrapper.setState(state);
    }
    return wrapper;
}


/**
 * 
 * @param {*} wrapper 
 * @param {*} value 
 */
const findByTestAttr = (wrapper, value) => {
    //The find method allow us to find the element that is rendered using some identifier
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
    const wrapper = setup();
    //The following is a function of enzyme that is in the docs which allows to get the actual state of a particular component or wrapper
    const initialCounterState = wrapper.state('counter');
    expect(initialCounterState).toBe(0);
});

test('clicking button increments counter display', () => {
    //passing on the new state to the wrapper
    const counter = 7;
    const wrapper = setup(null, {counter: counter});

    // find the button and click it
    const incrementButton = findByTestAttr(wrapper, 'increment-button');
    //The simulate is a shallowWrapper method that simulates an event happening
    incrementButton.simulate('click');
    //wrapper update will run this again and set the new state after this wrapper has already run
    wrapper.update();

    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    //here we are using one more shallowWrapper methods, the text one to get the text that is inside a particular element
    //The other is the toContain method of jest that evaluates if something is contained under a particular test or array
    expect(counterDisplay.text()).toContain(counter +1);
});

test('clicking button decrements counter display but displays Modal if is less than 0', () => {
    const counter = 1;
    const wrapper = setup(null, {counter: counter});


    const decrementButton = findByTestAttr(wrapper, 'decrement-button');
    decrementButton.simulate('click');
    wrapper.update();

    const errorMessage = findByTestAttr(wrapper, 'component-app-error');
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).toContain(counter -1);
    expect(wrapper.state().show).toBe(false);
    expect(errorMessage.text()).toBe("");
    
    decrementButton.simulate('click');
    wrapper.update();
    
    const errorMessage1 = findByTestAttr(wrapper, 'component-app-error');
    expect(wrapper.state().show).toBe(true);
    expect(counterDisplay.text()).toContain(counter -1);
    expect(errorMessage1.text()).toBe("The counter cannot be decremented less than 0");

    //TODO find the way to test this using the whole logic
    // const modalWrapper =  modalSetup({show: true}, null);
    // const modalCloseButton = findByTestAttr(modalWrapper, 'close-modal-button');
    // modalCloseButton.simulate('click');
    // modalWrapper.update();
    const wrapperInstance = wrapper.instance(); 
    wrapperInstance.hideModal();
    wrapper.update();
    
    const errorMessage2 = findByTestAttr(wrapper, 'component-app-error');
    expect(errorMessage2.text()).toBe("");
    expect(wrapper.state().show).toBe(false);
});
