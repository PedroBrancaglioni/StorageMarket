jest.mock('./src/datasource', () => ({
  AppDataSource: {
    getRepository: jest.fn().mockReturnValue({
      // Mock dos métodos que você usa no controller
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOneBy: jest.fn(),
    }),
  },
}));