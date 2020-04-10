using SmartRestaurant.Data;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SmartRestaurant.Data.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly SmartRestaurantContext context;

        public UnitOfWork(SmartRestaurantContext context)
        {
            this.context = context;
            context.Database.EnsureCreated();
        }
        public Task<int> Commit()
        {
            return this.context.SaveChangesAsync();
        }
    }
}
