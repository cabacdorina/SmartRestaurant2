using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SmartRestaurant.Services.ProductServices;
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

            return services;
        }
    }
}
