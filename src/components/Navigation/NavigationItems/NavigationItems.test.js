import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems/>', () =>{
    let wrapper;
    beforeEach(()=> {
        wrapper = shallow(<NavigationItems />);
    });
    it("Should render 2 <NavigationItems/> elements if not authanticated", () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    it("Should render 2 <NavigationItems/> elements if authanticated", () => {
        //wrapper = shallow(<NavigationItems isAuthenticated/>);
        wrapper.setProps({
        isAuthenticated: true
    })
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
});
    it("Should render <NavigationItems/> Logout element if authanticated", () => {
        wrapper.setProps({
        isAuthenticated: true
        })
    expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
});
});