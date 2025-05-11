import { ProductRepository } from "@/interfaces/products";
import ProductService from "@/services/productService";
import { expect, describe, it } from "@jest/globals";
import CategoryService from "@/services/categoryService";
import { CategoryRepository } from "@/interfaces/categories";
import { mock } from "node:test";
import { ConflictError, NotFoundError } from "@/utils/exceptions/customException";

const mockProductRepository: jest.Mocked<ProductRepository> = {
	save: jest.fn(),
	update: jest.fn(),
	delete: jest.fn(),
	findById: jest.fn(),
	finbByTitleAndCategoryId: jest.fn(),
};

const mockCategoryRepository: jest.Mocked<CategoryRepository> = {
	save: jest.fn(),
	finbByTitleAndOwnerId: jest.fn(),
	findById: jest.fn(),
	update: jest.fn(),
	delete: jest.fn(),
};

const mockCategory = {
	id: "mock-category-id",
	title: "Categoria Teste",
	description: "Categoria teste com vários itens",
	ownerId: "123-456-789",
};

const mockProduct = {
	id: "mock-product-id",
	title: "Product Title",
	description: "Product Description",
	price: 10.0,
	categoryId: "mock-category-id",
};

describe("Suit testes - Product Service", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("Save new product", () => {
		it("Should return success when creating a new product", async () => {
			const categoryService = new CategoryService(mockCategoryRepository);
			jest.spyOn(mockCategoryRepository, "findById").mockResolvedValue(mockCategory);
			jest.spyOn(mockProductRepository, "finbByTitleAndCategoryId").mockResolvedValue(
				null,
			);
			jest.spyOn(mockProductRepository, "save").mockResolvedValue(mockProduct);

			const productService = new ProductService(mockProductRepository, categoryService);
			const result = await productService.create({ ...mockProduct });

			expect(result).toEqual(mockProduct);
			expect(mockCategoryRepository.findById).toHaveBeenCalledWith("mock-category-id");
			expect(mockProductRepository.finbByTitleAndCategoryId).toHaveBeenCalledWith(
				"Product Title",
				"mock-category-id",
			);
		});

		it("Should throw NotFoundError if categoryId not exists", async () => {
			const categoryService = new CategoryService(mockCategoryRepository);
			jest.spyOn(mockCategoryRepository, "findById").mockResolvedValue(null);

			const productService = new ProductService(mockProductRepository, categoryService);
			await expect(productService.create({ ...mockProduct })).rejects.toThrow(
				NotFoundError,
			);
		});

		it("Should throw ConflictError if product already exists", async () => {
			const categoryService = new CategoryService(mockCategoryRepository);
			jest.spyOn(mockCategoryRepository, "findById").mockResolvedValue(mockCategory);

			jest.spyOn(mockProductRepository, "finbByTitleAndCategoryId").mockResolvedValue(
				mockProduct,
			);

			const productService = new ProductService(mockProductRepository, categoryService);

			await expect(productService.create({ ...mockProduct })).rejects.toThrow(
				ConflictError,
			);
		});
	});

	describe("Update fields in the product", () => {
		test.each([
			{ input: { title: "Updated Title" } },
			{ input: { title: "Updated Title", description: "Updated Description" } },
			{
				input: {
					title: "Updated Title",
					description: "Updated Description",
					price: 150.0,
				},
			},
			{ input: { description: "Updated Description", price: 150.0 } },
			{ input: { description: "Updated Description" } },
			{ input: { price: 10.0 } },
		])("Should return success when updating fields of the product", async ({ input }) => {
			const mockProductUpdated = {
				...mockProduct,
				...input,
			};

			const categoryService = new CategoryService(mockCategoryRepository);
			jest.spyOn(mockProductRepository, "findById").mockResolvedValue(mockProduct);
			jest.spyOn(mockProductRepository, "update").mockResolvedValue(mockProductUpdated);

			const productService = new ProductService(mockProductRepository, categoryService);

			const result = await productService.update("mock-product-id", input);
			expect(result).toEqual(mockProductUpdated);
			expect(mockProductRepository.findById).toHaveBeenCalledTimes(1);
		});

		it("Should return success when updating category of a product", async () => {
			const categoryService = new CategoryService(mockCategoryRepository);
			jest.spyOn(mockCategoryRepository, "findById").mockResolvedValue({
				...mockCategory,
				id: "new-category-id",
			});

			jest.spyOn(mockProductRepository, "update").mockResolvedValue({
				...mockProduct,
				categoryId: "new-category-id",
			});

			const productService = new ProductService(mockProductRepository, categoryService);
			const result = await productService.update("mock-product-id", {
				categoryId: "new-category-id",
			});
			expect(result).toEqual({ ...mockProduct, categoryId: "new-category-id" });
			expect(mockCategoryRepository.findById).toHaveBeenCalledWith("new-category-id");
			expect(mockProductRepository.update).toHaveBeenCalledTimes(1);
		});

		it("Should throw NotFoundError when not found category by id", async () => {
			const categoryService = new CategoryService(mockCategoryRepository);
			jest.spyOn(mockCategoryRepository, "findById").mockResolvedValue(null);

			const productService = new ProductService(mockProductRepository, categoryService);
			await expect(
				productService.update("mock-product-id", { ...mockProduct }),
			).rejects.toThrow(NotFoundError);
			expect(mockCategoryRepository.findById).toHaveBeenCalledWith("mock-category-id");
		});
	});

	describe("Delete product", () => {
		it("Should throw NotFoundError if not found product by id", async () => {
			jest.spyOn(mockProductRepository, "findById").mockResolvedValue(null);
			const categoryService = new CategoryService(mockCategoryRepository);
			const productService = new ProductService(mockProductRepository, categoryService);
			await expect(productService.delete("mock-product-id")).rejects.toThrow(
				NotFoundError,
			);
		});

		it("Should return success when deleting product", async () => {
			jest.spyOn(mockProductRepository, "findById").mockResolvedValue(mockProduct);
			jest.spyOn(mockProductRepository, "delete").mockResolvedValue(mockProduct);
			const categoryService = new CategoryService(mockCategoryRepository);

			const productService = new ProductService(mockProductRepository, categoryService);
			const result = await productService.delete("mock-product-id");
			expect(result).toEqual(mockProduct);
			expect(mockProductRepository.findById).toHaveBeenCalledWith("mock-product-id");
			expect(mockProductRepository.delete).toHaveBeenCalledTimes(1);
		});
	});
});
