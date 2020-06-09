using Microsoft.EntityFrameworkCore;
using SmartRestaurant.Data.Infrastructure;
using SmartRestaurant.Data.Models;
using SmartRestaurant.Services.ProductServices;
using SmartRestaurant.Services.ProductServices.ProductServiceDTO;
using SmartRestaurant.Services.ShoppingServiceDTO.ShoppingServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartRestaurant.Services.ShoppingServices
{
    public class ShoppingService : IShoppingService
    {
        private readonly IProductService _prodService;
        private readonly IRepository<IngredientPerUnit> _ingredPerUnitRepo;
        private readonly IRepository<IngredientPerPiece> _ingredPerPieceRepo;
        public ShoppingService(IProductService prodService, 
            IRepository<IngredientPerUnit> ingredPerUnitRepo,
            IRepository<IngredientPerPiece> ingredPerPieceRepo)
        {
            _prodService = prodService;
            _ingredPerPieceRepo = ingredPerPieceRepo;
            _ingredPerUnitRepo = ingredPerUnitRepo;
        }

        public async Task<List<IngredShopDto>> GetIngredListToBuy(List<ProductShopDto> prodList)
        {
            List<IngredShopDto> ingredList = new List<IngredShopDto>();
            List<IngredientDto> allIngredList = new List<IngredientDto>();
            List<IngredShopDto> resultList = new List<IngredShopDto>();

            foreach (var prod in prodList)
            {
                var ingredientsList = (await _prodService.GetAllProductIngredients(prod.Id)).ToList();
                ingredientsList.ForEach(x =>
                {
                    x.Quantity *= prod.PredictedAmount;
                    x.NumberOfPieces *= prod.PredictedAmount;
                });

                allIngredList = allIngredList.Concat(ingredientsList).ToList();
            }

            var sumIngredList = allIngredList.GroupBy(d => new { d.Name, d.UnitType })
                               .Select(
                                    g => new IngredShopDto
                                    {
                                        IngredName = g.Key.Name,
                                        Quantity = g.Sum(s => s.Quantity),
                                        NumberOfPieces = g.Sum(s => s.NumberOfPieces),
                                        UnitType = g.Key.UnitType
                                    })
                               .ToList();

            sumIngredList.ForEach( x =>
            {
                if (x.NumberOfPieces > 0)
                {
                    var ingred =  _ingredPerPieceRepo.Query().Where(y => y.Name.Equals(x.IngredName)).FirstOrDefault();
                    x.NumberOfPiecesToBuy = ingred.NumberOfPieces < x.NumberOfPieces ? x.NumberOfPieces - ingred.NumberOfPieces : 0;
                }

                if (x.Quantity > 0)
                {
                    var ingred =  _ingredPerUnitRepo.Query().Where(y => y.Name.Equals(x.IngredName)).FirstOrDefault();
                    x.QuantityToBuy = ingred.Quantity < x.Quantity ? x.Quantity - ingred.Quantity : 0f;
                }

                if ((x.QuantityToBuy != 0f && x.QuantityToBuy!=null) || (x.NumberOfPiecesToBuy!=0 && x.NumberOfPiecesToBuy!=null))
                {
                    resultList.Add(x);
                }

            });

            return resultList;
        }
    }

    //private KeyValuePair<string, float> ProcessIngreds(List<IngredientDto> ingredList)
    //{
    //    foreach (var ingred in ingredList)
    //    {

    //    }
    //} 

    //private bool isInMap(IngredientDto)
    //{

    //}

}
