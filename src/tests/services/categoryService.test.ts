import { CategoryRepository } from "@/interfaces/categories";
import CategoryService from "@/services/categoryService";
import { expect, describe, it } from "@jest/globals";

const mockCategoryRepository: jest.Mocked<CategoryRepository> = {
	save: jest.fn(),
	finbByTitleAndOwnerId: jest.fn(),
};

const mockCategory = {
	id: "random-uuid",
	title: "Categoria Teste",
	description: "Categoria teste com vários itens",
	ownerId: "123-456-789",
};

describe("Suit tests - Category Service", () => {
	beforeAll(() => {
		jest.clearAllMocks();
	});

	describe("Save new category", () => {
		it("Should return success when creating a new category", async () => {
			const mockCategoryDTO = {
				...mockCategory,
			};

			mockCategoryRepository.save.mockResolvedValue(mockCategory);

			const service = new CategoryService(mockCategoryRepository);
			const result = await service.create({
				title: "Categoria Teste",
				description: "Categoria teste com vários itens",
				ownerId: "123-456-789",
			});
			expect(result).toEqual(mockCategoryDTO);
			expect(mockCategoryRepository.save).toHaveBeenCalled();
			expect(mockCategoryRepository.finbByTitleAndOwnerId).toHaveBeenCalled();
		});

		it("Should throw error when trying to create an existing category", async () => {
			mockCategoryRepository.finbByTitleAndOwnerId.mockResolvedValue(mockCategory);
			const service = new CategoryService(mockCategoryRepository);
			await expect(
				service.create({
					title: "Categoria Teste",
					description: "Categoria teste com vários itens",
					ownerId: "123-456-789",
				}),
			).rejects.toThrow();
			expect(mockCategoryRepository.finbByTitleAndOwnerId).toHaveBeenCalled();
		});
	});
});
