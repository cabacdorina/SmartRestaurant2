using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SmartRestaurant.Services.CommandServices;
using SmartRestaurant.Services.IngredientServices;
using SmartRestaurant.Services.IngredientServices.IngredientInterfaces;
using SmartRestaurant.Services.PredictServices;
using SmartRestaurant.Services.ProductServices;
using SmartRestaurant.Services.RecipeServices;
using SmartRestaurant.Services.ShoppingServices;
using SmartRestaurant.Services.UserServices;
using SmartRestaurantML.ModelBuilder;
using System;
using System.Collections.Generic;
using System.Text;

namespace SmartRestaurant.Services.Infrastructure
{
    public static class DependencyMapper
    {
        public static IServiceCollection GetDependencies(IConfiguration configuration, IServiceCollection services)
        {
            services = SmartRestaurant.Data.Infrastructure.DependencyMapper.GetDependencies(configuration, services);
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IIngredientPerPieceService, IngredientPerPieceService>();
            services.AddScoped<IIngredientPerUnitService, IngredientPerUnitService>();
            services.AddScoped<IRecipeService, RecipeService>();
            services.AddScoped<ICommandService, CommandServices.CommandService>();
            services.AddScoped<IUserService, UserService>();
            services.AddSingleton<IPredictService, PredictService>();
            services.AddScoped<IShoppingService, ShoppingService>();

            return services;
        }
    } 
}
