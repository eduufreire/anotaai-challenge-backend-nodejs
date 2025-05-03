import { CategoryRepository } from "@/interfaces/categories";
import CategoryService from "@/services/categoryService";
import { expect, describe, it } from "@jest/globals";
import { mock } from "node:test";

const mockCategoryRepository: jest.Mocked<CategoryRepository> = {
	save: jest.fn(),
	finbByTitleAndOwnerId: jest.fn(),
	findById: jest.fn(),
	update: jest.fn(),
	delete: jest.fn(),
};

const mockCategory = {
	id: "random-uuid",
	title: "Categoria Teste",
	description: "Categoria teste com vários itens",
	ownerId: "123-456-789",
};

describe("Suit tests - Category Service", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
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

	describe("Update category", () => {
		test.each([
			{ input: { title: "Titulo atualizado", description: "Descrição atualizada" } },
			{ input: { title: "Titulo atualizado" } },
			{ input: { description: "Descricao atualizada" } },
		])("Update category", async ({ input }) => {
			const mockUpdatedCategory = {
				...mockCategory,
				...input,
			};

			mockCategoryRepository.findById.mockResolvedValue(mockCategory);
			mockCategoryRepository.update.mockResolvedValue(mockUpdatedCategory);

			const service = new CategoryService(mockCategoryRepository);
			const result = await service.update("mock-id-category", input);

			expect(result).toEqual(mockUpdatedCategory);
			expect(mockCategoryRepository.findById).toHaveBeenCalledWith("mock-id-category");
			expect(mockCategoryRepository.update).toHaveBeenCalled();
			expect(mockCategoryRepository.update).toHaveBeenCalledWith(
				"mock-id-category",
				input,
			);
		});

		it("Should throw error if not find category by id", async () => {
			mockCategoryRepository.findById.mockResolvedValue(null);
			const service = new CategoryService(mockCategoryRepository);
			await expect(
				service.update("mock-id", { title: "atualizar titulo" }),
			).rejects.toThrow();
		});
	});

	describe("Delete category", () => {
		it("Should return success when delete category by id", async () => {
			mockCategoryRepository.findById.mockResolvedValue(mockCategory);
			mockCategoryRepository.delete.mockResolvedValue(mockCategory);
			const service = new CategoryService(mockCategoryRepository);

			const result = await service.delete("mock-id");

			expect(mockCategory).toEqual(result);
			expect(mockCategoryRepository.delete).toHaveBeenCalled();
		});

		it("Should throw error if category not exists", async () => {
			mockCategoryRepository.findById.mockResolvedValue(null);
			const service = new CategoryService(mockCategoryRepository);

			await expect(service.delete("mock-id")).rejects.toThrow();
		});
	});
});
