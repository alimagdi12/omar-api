const AnnouncementsController = require('../controllers/announcements/announcements.controllers');
const AppError = require('../error/error');

describe('AnnouncementsController', () => {
    let announcementsController;
    let mockAnnouncementsRepository;

    beforeEach(() => {
        mockAnnouncementsRepository = {
            addAnnouncement: jest.fn(),
            updateAnnouncement: jest.fn(),
            getAnnouncementById: jest.fn(),
            deleteAnnouncement: jest.fn(),
            getAllAnnouncements: jest.fn(),
        };
        announcementsController = new AnnouncementsController(mockAnnouncementsRepository);
    });

    describe('addAnnouncement', () => {
        it('should add an announcement successfully', async () => {
            const announcementData = {
                name: 'New Announcement',
                subject: 'Important Update', // Add other required fields as per your validation
                content: 'Details about the announcement', // Assuming 'content' is also required
            };
            const addedAnnouncement = { id: '1', ...announcementData };
            mockAnnouncementsRepository.addAnnouncement.mockResolvedValue(addedAnnouncement);

            const result = await announcementsController.addAnnouncement(announcementData);

            expect(result).toEqual(addedAnnouncement);
            expect(mockAnnouncementsRepository.addAnnouncement).toHaveBeenCalledWith(announcementData);
        });

        it('should throw a validation error if data is invalid', async () => {
            const announcementData = {}; // Invalid data (empty)
            await expect(announcementsController.addAnnouncement(announcementData)).rejects.toThrow(AppError);
            await expect(announcementsController.addAnnouncement(announcementData)).rejects.toThrow('Validation Error');
        });
    });


    describe('getAnnouncementById', () => {
        it('should return an announcement by ID', async () => {
            const announcementData = { id: '1', title: 'New Announcement', content: 'Content' };
            mockAnnouncementsRepository.getAnnouncementById.mockResolvedValue(announcementData);

            const result = await announcementsController.getAnnouncementById('1');

            expect(result).toEqual(announcementData);
            expect(mockAnnouncementsRepository.getAnnouncementById).toHaveBeenCalledWith('1');
        });

        it('should throw a not found error if announcement does not exist', async () => {
            mockAnnouncementsRepository.getAnnouncementById.mockResolvedValue(null);

            await expect(announcementsController.getAnnouncementById('non-existing-id')).rejects.toThrow(AppError);
            await expect(announcementsController.getAnnouncementById('non-existing-id')).rejects.toThrow('Announcement not found');
        });
    });

    describe('getAllAnnouncements', () => {
        it('should return all announcements', async () => {
            const announcementsData = [{ title: 'Announcement 1' }, { title: 'Announcement 2' }];
            mockAnnouncementsRepository.getAllAnnouncements.mockResolvedValue(announcementsData);

            const result = await announcementsController.getAllAnnouncements();

            expect(result).toEqual(announcementsData);
            expect(mockAnnouncementsRepository.getAllAnnouncements).toHaveBeenCalled();
        });
    });

    describe('updateAnnouncement', () => {
        it('should update an announcement successfully', async () => {
            const announcementData = {
                name: 'Updated Announcement',
                subject: 'Updated Subject', // Add other required fields as per your validation
                content: 'Updated content', // Assuming 'content' is also required
            };
            const updatedAnnouncement = { id: '1', ...announcementData };
            mockAnnouncementsRepository.updateAnnouncement.mockResolvedValue(updatedAnnouncement);

            const result = await announcementsController.updateAnnouncement('1', announcementData);

            expect(result).toEqual(updatedAnnouncement);
            expect(mockAnnouncementsRepository.updateAnnouncement).toHaveBeenCalledWith('1', announcementData);
        });

        it('should throw a validation error if data is invalid', async () => {
            const announcementData = {}; // Invalid data (empty)
            await expect(announcementsController.updateAnnouncement('1', announcementData)).rejects.toThrow(AppError);
            await expect(announcementsController.updateAnnouncement('1', announcementData)).rejects.toThrow('Validation Error');
        });

        it('should throw a not found error if announcement does not exist', async () => {
            const announcementData = {
                name: 'Updated Announcement',
                subject: 'Updated Subject',
                content: 'Updated content',
            }; // Provide valid data for update
            mockAnnouncementsRepository.updateAnnouncement.mockResolvedValue(null); // Simulate not found

            await expect(announcementsController.updateAnnouncement('non-existing-id', announcementData)).rejects.toThrow(AppError);
            await expect(announcementsController.updateAnnouncement('non-existing-id', announcementData)).rejects.toThrow('Announcement not found');
        });
    });

    describe('deleteAnnouncement', () => {
        it('should delete an announcement successfully', async () => {
            mockAnnouncementsRepository.deleteAnnouncement.mockResolvedValue(true); // Assume it returns a truthy value on success

            const result = await announcementsController.deleteAnnouncement('1');

            expect(result).toBe(true);
            expect(mockAnnouncementsRepository.deleteAnnouncement).toHaveBeenCalledWith('1');
        });

        it('should throw a not found error if announcement does not exist', async () => {
            mockAnnouncementsRepository.deleteAnnouncement.mockResolvedValue(null);

            await expect(announcementsController.deleteAnnouncement('non-existing-id')).rejects.toThrow(AppError);
            await expect(announcementsController.deleteAnnouncement('non-existing-id')).rejects.toThrow('Announcement not found');
        });
    });
});
