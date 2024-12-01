import { Request, Response, NextFunction } from 'express';
import testService from "../services/test.service";

interface TestController {
    getSample(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}

const testController: TestController = {
    async getSample(req, res, next) {
        try {
            const sample = await testService.getSample();
            return res.json(sample);
        } catch (error) {
            next(error);
        }
    }
};

export default testController;