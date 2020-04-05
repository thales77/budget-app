import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DotEnv from 'dotenv';

//detup test env
DotEnv.config({ path: '.env.test' });

//setup enzyme
Enzyme.configure({
    adapter: new Adapter()
});

