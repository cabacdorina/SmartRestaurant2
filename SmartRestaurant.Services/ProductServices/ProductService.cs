﻿using Microsoft.EntityFrameworkCore;
using Omu.ValueInjecter;
using SmartRestaurant.Data.Infrastructure;
using SmartRestaurant.Data.Models;
using SmartRestaurant.Services.ProductServices.ProductServiceDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartRestaurant.Services.ProductServices
{
    public class ProductService : IProductService
    {
        private readonly IRepository<Product> _productRepo;
        private readonly IUnitOfWork _unitOfWork;

        private readonly IRepository<RecipeIngredientPerPiece> _recipeIngredPerPieceRepo;
        private readonly IRepository<RecipeIngredientPerUnit> _recipeIngredPerUnitRepo;
        public ProductService(IRepository<Product> prod, IUnitOfWork unitOfWork,
            IRepository<RecipeIngredientPerPiece> recipeIngredPerPieceRepo,
            IRepository<RecipeIngredientPerUnit> recipeIngredPerUnitRepo)
        {
            _productRepo = prod;
            _unitOfWork = unitOfWork;
            _recipeIngredPerPieceRepo = recipeIngredPerPieceRepo;
            _recipeIngredPerUnitRepo = recipeIngredPerUnitRepo;
        }
        public async Task<int> Create(ProductDto product)
        {
            var newProduct = new Product().InjectFrom(product) as Product;
            await _productRepo.Add(newProduct);
            await _unitOfWork.Commit();

            return newProduct.Id;
        }

        public async Task<bool> DeleteById(int productId)
        {
            var prod = await _productRepo.GetById(productId);
            if (prod == null)
            {
                return false;
            }
            _productRepo.Delete(prod);
            await _unitOfWork.Commit();

            return true;
        }

        public async Task<ProductDto> GetById(int productId)
        {
            var prod = await _productRepo.GetById(productId);
            if (prod == null)
            {
                return null;
            }

            return new ProductDto().InjectFrom(prod) as ProductDto;

        }

        public async Task<bool> Update(ProductDto product, int productId)
        {
            var prod = await _productRepo.GetById(productId);
            if (prod == null)
            {
                return false;
            }

            prod.InjectFrom(product);
            await _unitOfWork.Commit();
            return true;
        }

        public async Task<IEnumerable<ProductDto>> GetAllProducts()
        {
            var prodList = await _productRepo.GetAll();
            return prodList.Select(p => new ProductDto().InjectFrom(p) as ProductDto);
        }

        public Task<IEnumerable<ProductDto>> GetByType(string type)
        {
            var prods = _productRepo.Query(p => p.Type.Equals(type)).ToList();
            return Task.FromResult(prods.Select(p => new ProductDto().InjectFrom(p) as ProductDto));
        }

        public async Task<IEnumerable<IngredientDto>> GetAllProductIngredients(int productId)
        {
            var product = await _productRepo.GetById(productId);
            if (product.RecipeId < 1)
            {
                return null;
            }
            var ingrdientsPerUnitList = await _recipeIngredPerUnitRepo.Query()
                .Include(r => r.Recipe)
                .Include(ipu => ipu.IngredientPerUnit)
                .Where(x => x.RecipeId == product.RecipeId)
                .Select(x => new IngredientDto
                {
                    Name = x.IngredientPerUnit.Name,
                    Price = x.IngredientPerUnit.Price,
                    UnitType = x.IngredientPerUnit.UnitType
                }).ToListAsync();

            var ingredientsPerPieceList = await _recipeIngredPerPieceRepo.Query()
            .Include(r => r.Recipe)
            .Include(ipp => ipp.IngredientPerPiece)
            .Where(x => x.RecipeId == product.RecipeId)
            .Select(x => new IngredientDto
             {
                 Name = x.IngredientPerPiece.Name,
                 Price = x.IngredientPerPiece.Price,
                 NumberOfPieces = x.IngredientPerPiece.NumberOfPieces,
                 NumberOfPiecesReserved = x.IngredientPerPiece.NumberOfPiecesReserved
             }).ToListAsync();

            return ingrdientsPerUnitList.Concat(ingredientsPerPieceList).ToList();
        }
    }
}
