import { RecordService } from '../../services/record.service';
import { IRecord, Record } from '../../models/record.model';
import { userId } from "../setup";

jest.mock('../../models/record.model');

describe('RecordService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllRecords', () => {
        describe('when records are fetched successfully', () => {
            let record1: IRecord;
            let record2: IRecord;

            beforeEach(async () => {
                record1 = await Record.create<Partial<IRecord>>({
                    userId: userId.toString(),
                    name: 'New Record',
                    location: {
                        type: 'Point',
                        coordinates: [40.7128, -74.0060],
                    },
                });

                record2 = await Record.create<Partial<IRecord>>({
                    userId: userId.toString(),
                    name: 'New Record',
                    location: {
                        type: 'Point',
                        coordinates: [40.7128, -74.0060],
                    },
                });

                jest.spyOn(Record, 'find').mockReturnValue({
                    populate: jest.fn().mockReturnThis(),
                    exec: jest.fn().mockResolvedValue([record1, record2]),
                } as any);
            });

            it('should return all records', async () => {
                const records = await RecordService.getAllRecords(userId.toString());
                expect(records).toEqual([record1, record2]);
            });
        });
    });
});
