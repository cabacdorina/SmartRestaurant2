// This file was auto-generated by ML.NET Model Builder. 

using Microsoft.ML.Data;

namespace SmartRestaurantML.Model
{
    public class ModelInput
    {
        [ColumnName("Name"), LoadColumn(0)]
        public string Name { get; set; }


        [ColumnName("Price"), LoadColumn(1)]
        public float Price { get; set; }


        [ColumnName("BoughtDate"), LoadColumn(2)]
        public string BoughtDate { get; set; }


        [ColumnName("Type"), LoadColumn(3)]
        public float Type { get; set; }


        [ColumnName("Amount"), LoadColumn(4)]
        public float Amount { get; set; }


    }
}
