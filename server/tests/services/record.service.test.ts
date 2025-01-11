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

    // describe('when fetching records fails', () => {
    //     beforeEach(() => {
    //         jest.clearAllMocks();
    //
    //         jest.spyOn(Record, 'find').mockReturnValue({
    //             populate: jest.fn().mockReturnThis(),
    //             exec: jest.fn().mockRejectedValue(new Error('Fetch failed')),
    //         } as unknown as ReturnType<typeof Record.find>);
    //     });
    //
    //     it('should throw an error', async () => {
    //         await expect(RecordService.getAllRecords(userId.toString())).rejects.toThrow('Fetch failed');
    //     });
    // });
    //
    // describe('getRecord', () => {
    //     describe('when record is found', () => {
    //         it('should return a record by id', async () => {
    //             const mockRecord = { id: 'recordId', name: 'Record' };
    //             (Record.findById as jest.Mock).mockResolvedValue(mockRecord);
    //
    //             const record = await RecordService.getRecord(userId.toString(), 'recordId');
    //             expect(record).toEqual(mockRecord);
    //         });
    //     });
    //
    //     describe('when record is not found', () => {
    //         it('should return null', async () => {
    //             (Record.findById as jest.Mock).mockResolvedValue(null);
    //
    //             const record = await RecordService.getRecord(userId.toString(), 'nonexistentRecordId');
    //             expect(record).toBeNull();
    //         });
    //     });
    // });
    //
    // describe('addRecord', () => {
    //     describe('when record is added successfully', () => {
    //         it('should add a new record', async () => {
    //             const mockRecord = { id: 'newRecordId', name: 'New Record' };
    //             (Record.create as jest.Mock).mockResolvedValue(mockRecord);
    //
    //             const record = await RecordService.addRecord({
    //                 name: 'New Record',
    //                 userId: userId.toString(),
    //                 file: 'file',
    //                 isPublic: false,
    //                 longitude: 0,
    //                 latitude: 0
    //             });
    //             expect(record).toEqual(mockRecord);
    //         });
    //     });
    //
    //     describe('when adding record fails', () => {
    //         it('should throw an error', async () => {
    //             (Record.create as jest.Mock).mockRejectedValue(new Error('Add failed'));
    //
    //             await expect(RecordService.addRecord({
    //                 name: 'New Record',
    //                 userId: userId.toString(),
    //                 file: 'file',
    //                 isPublic: false,
    //                 longitude: 0,
    //                 latitude: 0 })).rejects.toThrow('Add failed');
    //         });
    //     });
    // });
    //
    // describe('updateRecord', () => {
    //     describe('when record is updated successfully', () => {
    //         it('should update a record', async () => {
    //             const mockRecord = { id: 'recordId', name: 'Updated Record' };
    //             (Record.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockRecord);
    //
    //             const record = await RecordService.updateRecord('recordId', {
    //                 name: 'Updated Record',
    //                 userId: userId.toString(),
    //                 file: 'file',
    //                 isPublic: false
    //             });
    //             expect(record).toEqual(mockRecord);
    //         });
    //     });
    //
    //     describe('when record is not found', () => {
    //         it('should return null', async () => {
    //             (Record.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);
    //
    //             const record = await RecordService.updateRecord('nonexistentRecordId', {
    //                 name: 'Updated Record',
    //                 userId: userId.toString(),
    //                 file: 'file',
    //                 isPublic: false,
    //             });
    //             expect(record).toBeNull();
    //         });
    //     });
    // });
    //
    // describe('deleteRecord', () => {
    //     describe('when record is deleted successfully', () => {
    //         it('should delete a record', async () => {
    //             (Record.findByIdAndDelete as jest.Mock).mockResolvedValue(true);
    //
    //             const result = await RecordService.deleteRecord('recordId', userId.toString());
    //             expect(result).toBe(true);
    //         });
    //     });
    //
    //     describe('when record is not found', () => {
    //         it('should return false', async () => {
    //             (Record.findByIdAndDelete as jest.Mock).mockResolvedValue(false);
    //
    //             const result = await RecordService.deleteRecord('nonexistentRecordId', userId.toString());
    //             expect(result).toBe(false);
    //         });
    //     });
    // });
});
