using Microsoft.EntityFrameworkCore;
using Omu.ValueInjecter;
using SmartRestaurant.Data.Infrastructure;
using SmartRestaurant.Data.Models;
using SmartRestaurant.Services.ProductServices.ProductServiceDTO;
using SmartRestaurant.Services.RecipeServices;
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
        private readonly IRepository<Recipe> _recipeRepo;
        private readonly IRecipeService _recipeService;

        public ProductService(IRepository<Product> prod, IUnitOfWork unitOfWork,
            IRepository<RecipeIngredientPerPiece> recipeIngredPerPieceRepo,
            IRepository<RecipeIngredientPerUnit> recipeIngredPerUnitRepo,
            IRepository<Recipe> recipeRepo,
            IRecipeService recipeService)
        {
            _productRepo = prod;
            _unitOfWork = unitOfWork;
            _recipeIngredPerPieceRepo = recipeIngredPerPieceRepo;
            _recipeIngredPerUnitRepo = recipeIngredPerUnitRepo;
            _recipeRepo = recipeRepo;
            _recipeService = recipeService;
        }

        public async Task<int> Create(ProductDto product)
        {
            var recipeId = _recipeRepo.Query().Where(x => x.Name.Equals(product.RecipeName)).FirstOrDefault().Id;
            var newProduct = new Product().InjectFrom(product) as Product;
            newProduct.RecipeId = recipeId;

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

        public async Task<ProdDetailsDto> GetByName(string name)
        {
            var prod = _productRepo.Query().Include(x => x.Recipe).Where(x => x.Name.Equals(name)).FirstOrDefault();
            var prodDetails = new ProdDetailsDto().InjectFrom(prod) as ProdDetailsDto;

            var recipeView = await _recipeService.GetByName(prod.Recipe.Name);
            prodDetails.IngredientList = recipeView.IngredList;

            return prodDetails;
        }

        public async Task<bool> Update(ProductDto product)
        {
            var prod = await _productRepo.GetById(product.Id);
            if (prod == null)
            {
                return false;
            }

            prod.InjectFrom(product);
            _productRepo.Update(prod);
            await _unitOfWork.Commit();
            return true;
        }
        //ctr+k+c

        public async Task<bool> UpdateByName(ProductDto product, string oldName)
        {
            var prod = await _productRepo.Query()
                .Include(x=>x.Recipe)
                .Where(x => x.Name.Equals(oldName)).FirstOrDefaultAsync();

            if (prod == null)
            {
                return false;
            }

            prod.InjectFrom(product);
            if (!prod.Recipe.Name.Equals(product.RecipeName))
            {
                var newProductRecipe = await _recipeRepo.Query().Where(x => x.Name.Equals(product.RecipeName)).FirstOrDefaultAsync();
                prod.RecipeId = newProductRecipe.Id;
            }
           
            _productRepo.Update(prod);
            await _unitOfWork.Commit();

            return true;
        }
        public async Task<IEnumerable<ProductDto>> GetAllProducts()
        {
            var prodList = await _productRepo.Query().Include(x => x.Recipe).ToListAsync();

            var prod = prodList.Select(p => new ProductDto
            {
                Name = p.Name,
                Id =  p.Id,
                Price = p.Price,
                Amount = p.Amount,
                FoodType = p.FoodType,
                ImageUrl = p.ImageUrl,
                BoughtDate = p.BoughtDate,
                RecipeName = p.Recipe.Name
            }).ToList();

            return prod;
        }

        public async Task<IEnumerable<ProductDto>> GetByType(int type)
        {
            var prodList = await _productRepo.Query(p => p.FoodType == type).Include(x => x.Recipe).ToListAsync();
            var prods = prodList.Select(p => new ProductDto
            {
                Name = p.Name,
                Id = p.Id,
                Price = p.Price,
                Amount = p.Amount,
                FoodType = p.FoodType,
                ImageUrl = p.ImageUrl,
                BoughtDate = p.BoughtDate,
                RecipeName = p.Recipe.Name
            }).ToList();

            return prods;
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
                    Quantity = x.Quantity,
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
                NumberOfPieces = x.NumberOfPieces,
            }).ToListAsync();

            return ingrdientsPerUnitList.Concat(ingredientsPerPieceList).ToList();
        }

        public async Task<bool> DeleteByName(string name)
        {
            var prod = _productRepo.Query().Where(x => x.Name.Equals(name)).FirstOrDefault();
            if (prod == null)
            {
                return false;
            }

            var isDeleted = await DeleteById(prod.Id);
            return isDeleted;
        }

        public async Task<IEnumerable<ProductDto>> UpdateStocks(IEnumerable<ProductDto> prodList)
        {
            foreach (var prod in prodList)
            {
                var prodFromDb = await GetByName(prod.Name);
                var remainStock = prodFromDb.Amount - prod.Amount;
                prod.Amount = remainStock;
                await UpdateByName(prod, prod.Name);
            }

            return prodList;
        }
    }
}
