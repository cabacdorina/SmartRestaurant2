using SmartRestaurant.Services.ProductServices.ProductServiceDTO;
using SmartRestaurantML.Model;
using SmartRestaurantML.ModelBuilder;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SmartRestaurant.Services.PredictServices
{
    public class PredictService: IPredictService
    {
        public PredictService()
        {
            ModelBuilder.CreateModel();
        }

        public Task<int> PredictAmount(ProductDto productDto)
        {
            var modelInput = new ModelInput
            {
                Amount = productDto.Amount,
                BoughtDate = productDto.BoughtDate.ToString(),
                Name = productDto.Name,
                Price = (float)productDto.Price,
                Type = productDto.FoodType
            };

            // Make a single prediction on the sample data and print results
            var predictionResult = ConsumeModel.Predict(modelInput);
            return Task.FromResult((int)Math.Ceiling(predictionResult.Score));

        }

        public async Task<List<int>> PredictAmountForProductList(List<ProductDto> prodList)
        {
            List<int> predictedValues = new List<int>();
            foreach (var product in prodList)
            {
                var predictedValue = await this.PredictAmount(product);
                predictedValues.Add(predictedValue);
            }

            return await Task.FromResult(predictedValues);
        }
    }
}
