import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITestModel extends Document {
    name: string;
    description: string;
}

const TestModelSchema = new Schema<ITestModel>({
    name: {
        type: String,
        unique: true,
        required: [true, 'Name is required!'],
        minLength: [1, 'Name should not be empty!']
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [1, 'Description should not be empty!']
    },
}, {
    timestamps: true
});

const TestModel: Model<ITestModel> = mongoose.model('Product', TestModelSchema);

export default TestModel;
