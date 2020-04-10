using Omu.ValueInjecter;
using SmartRestaurant.Data.Infrastructure;
using SmartRestaurant.Data.Models;
using SmartRestaurant.Services.ProductServices.ProductDTO;
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

        public ProductService(IRepository<Product> prod, IUnitOfWork unitOfWork)
        {
            _productRepo = prod;
            _unitOfWork = unitOfWork;
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
            var prods = await _productRepo.GetAll();
            return prods.Select(p => new ProductDto().InjectFrom(p) as ProductDto);
        }

        public Task<IEnumerable<ProductDto>> GetByType(string type)
        {
            var prods = _productRepo.Query(p=> p.Type.Equals(type)).ToList();
            return Task.FromResult(prods.Select(p => new ProductDto().InjectFrom(p) as ProductDto));
        }
    }
}
