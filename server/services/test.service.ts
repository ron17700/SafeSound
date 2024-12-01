import TestModel from '../models/test.model';

const TestService = {
    async getSample(): Promise<any> {

        return TestModel.find();
    }
};

export default TestService;
