const mongoose = require('mongoose');
const { connect } = require('../connect/mongoose.connect'); // Adjust the path if needed

// Mock the mongoose connect function
jest.mock('mongoose', () => ({
    connect: jest.fn(),
}));

describe('Database Connection', () => {
    it('should call mongoose.connect with the correct URI and options', async () => {
        const expectedUri = 'mongodb+srv://admin:XHHU9hPLA5Sw7K6J@cluster0.jynhvzr.mongodb.net/exam';
        const expectedOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        mongoose.connect.mockResolvedValueOnce('Connected to MongoDB');

        await connect();

        expect(mongoose.connect).toHaveBeenCalledWith(expectedUri, expectedOptions);
    });

    it('should handle connection errors', async () => {
        const errorMessage = 'Connection failed';
        mongoose.connect.mockRejectedValueOnce(new Error(errorMessage));

        await expect(connect()).rejects.toThrow(errorMessage);
    });
});
