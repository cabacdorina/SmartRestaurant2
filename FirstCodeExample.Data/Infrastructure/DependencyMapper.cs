using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace SmartRestaurant.Data.Infrastructure
{
    public class DependencyMapper
    {
        public static IServiceCollection GetDependencies(IConfiguration configuration, IServiceCollection services)
        {
            //var connection = configuration.GetConnectionString("BlogDataBaseConnection");
            services.AddDbContext<SmartRestaurantContext>(options => options.UseSqlServer("Server=DESKTOP-BB3STTJ\\SQLEXPRESS;Database=SmartRestaurant;User Id=dorina;Integrated Security=false;Trusted_Connection=false; password=password"));
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            
            return services;
        }
    }
}
