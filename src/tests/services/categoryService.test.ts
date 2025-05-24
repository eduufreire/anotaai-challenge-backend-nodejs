import { CategoryRepository } from "@/interfaces/categories";
import CategoryService from "@/services/categoryService";
import { MessagingService } from "@/services/sqsService";
import { ConflictError, NotFoundError } from "@/utils/exceptions/customException";
import { expect, describe, it } from "@jest/globals";

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

const messagingServiceMock: jest.Mocked<MessagingService> = {
	sendMessage: jest.fn(),
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

			const service = new CategoryService(mockCategoryRepository, messagingServiceMock);
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
			const service = new CategoryService(mockCategoryRepository, messagingServiceMock);
			await expect(
				service.create({
					title: "Categoria Teste",
					description: "Categoria teste com vários itens",
					ownerId: "123-456-789",
				}),
			).rejects.toThrow(ConflictError);
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

			const service = new CategoryService(mockCategoryRepository, messagingServiceMock);
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
			const service = new CategoryService(mockCategoryRepository, messagingServiceMock);
			await expect(
				service.update("mock-id", { title: "atualizar titulo" }),
			).rejects.toThrow(NotFoundError);
		});
	});

	describe("Delete category", () => {
		it("Should return success when delete category by id", async () => {
			mockCategoryRepository.findById.mockResolvedValue(mockCategory);
			mockCategoryRepository.delete.mockResolvedValue(mockCategory);
			const service = new CategoryService(mockCategoryRepository, messagingServiceMock);

			await service.delete("mock-id", "mock-owner-id");

			expect(mockCategoryRepository.findById).toHaveBeenCalledWith("mock-id")
			expect(mockCategoryRepository.delete).toHaveBeenCalled();
		});

		it("Should throw error if category not exists", async () => {
			mockCategoryRepository.findById.mockResolvedValue(null);
			const service = new CategoryService(mockCategoryRepository, messagingServiceMock);

			await expect(service.delete("mock-id", "mock-owner-id")).rejects.toThrow(
				NotFoundError,
			);
		});
	});

	describe("Find catategory by id", () => {
		it("Should return success when find existing category by id", async () => {
			jest.spyOn(mockCategoryRepository, "findById").mockResolvedValue(mockCategory);
			const categoryService = new CategoryService(
				mockCategoryRepository,
				messagingServiceMock,
			);
			const result = await categoryService.findById("mock-id");
			expect(result).toEqual(mockCategory);
			expect(mockCategoryRepository.findById).toHaveBeenCalledTimes(1);
		});

		it("Should throw NotFoundError when didn't find category by id", async () => {
			jest.spyOn(mockCategoryRepository, "findById").mockResolvedValue(null);
			const categoryService = new CategoryService(
				mockCategoryRepository,
				messagingServiceMock,
			);
			await expect(categoryService.findById("mock-id")).rejects.toThrow(NotFoundError);
			expect(mockCategoryRepository.findById).toHaveBeenCalledTimes(1);
		});
	});
});
