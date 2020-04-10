using SmartRestaurant.Services.ProductServices.ProductDTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SmartRestaurant.Services.ProductServices
{
    public interface IProductService
    {
        Task<int> Create(ProductDto product);
        Task<bool> DeleteById(int productId);
        Task<bool> Update(ProductDto product, int productId);
        Task<ProductDto> GetById(int productId);
        Task<IEnumerable<ProductDto>> GetAllProducts();
        Task<IEnumerable<ProductDto>> GetByType(string type);
    }
}
