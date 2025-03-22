import { Request, Response, NextFunction } from 'express';
import { MongoError } from 'mongodb';

interface ValidationError {
    message: string;
    properties?: {
        message: string;
    };
    stack?: string;
}

interface CustomError extends Error {
    errors?: Record<string, ValidationError>;
    status?: number;
}

const errorHandler = (error: CustomError | MongoError, req: Request, res: Response, next: NextFunction): Response => {
    // MongoDB errors
    if (error instanceof MongoError) {
        switch (error.code) {
            case 11000: // Duplicate key error
                return res.status(400).json({message: 'Duplicate key error: A record with this key already exists.'});
            case 121: // Document failed validation
                return res.status(400).json({message: 'Document failed validation.'});
            default:
                return res.status(500).json({message: 'An internal server error occurred.'});
        }
    } else {
        // General errors
        console.error(error.message);
        console.log(error.stack);
        return res.status(error.status || 400).send(error.message);
    }
};

export default errorHandler;
