using SmartRestaurant.Services.ProductServices.ProductDTO;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace SmartRestaurant.Services.BusinessModels
{
    public class SaledProductsArray
    {
        private IList<ProductDto> prodArray;
        public SaledProductsArray(IList<ProductDto> prods)
        {
            IList<ProductDto> prodArray = new List<ProductDto>();
            this.prodArray = prods;
        }

        public SaledProductsArray() { }

        public IList<ProductDto> GetProdArray()
        {
            return this.prodArray;
        }

        public Task WriteSaledProdToFile(IEnumerable<ProductDto> prods)
        {

            string path = @"c:\temp\sales.csv";

            if (!File.Exists(path))
            {
                // Create a file to write to.
                using (StreamWriter sw = File.CreateText(path))
                {
                    sw.WriteLine("Name,Price,BoughtDate,Type,Amount");
                    foreach (var prod in prods)
                    {
                        sw.WriteLine(prod.Name + "," + prod.Price + "," +
                        prod.BoughtDate + "," + prod.Type + "," + prod.Amount);
                    }
                }
            }
            else
            {
                using (StreamWriter sw = File.AppendText(path))
                {
                    foreach (var prod in prods)
                    {
                        sw.WriteLine(prod.Name + "," + prod.Price + "," +
                        prod.BoughtDate + "," + prod.Type + "," + prod.Amount);
                    }
                }

            }

            return Task.CompletedTask;
        }
    }
}
