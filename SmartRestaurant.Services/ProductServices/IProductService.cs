using SmartRestaurant.Services.ProductServices.ProductServiceDTO;
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
        Task<IEnumerable<ProductDto>> GetByType(int type);
        Task<IEnumerable<IngredientDto>> GetAllProductIngredients(int id);
        Task<ProdDetailsDto> GetByName(string name);
    }
}
