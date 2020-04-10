using SmartRestaurant.Data;
using SmartRestaurant.Data.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SmartRestaurant.Data.Infrastructure
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly DbContext context;
        private readonly DbSet<T> dbSet;

        public Repository(SmartRestaurantContext context)
        {
            this.context = context;
            dbSet = this.context.Set<T>();
        }

        public async Task Add(T entity)
        {
            await dbSet.AddAsync(entity);
        }

        public void Delete(T entity)
        {
            dbSet.Remove(entity);
        }

        public void Delete(IEnumerable<T> entities)
        {
            dbSet.RemoveRange(entities);
		}

		public async Task<IEnumerable<T>> GetAll()
        {
            return await dbSet.ToListAsync();
        }

        public async Task<T> GetById(int id)
        {
            return await dbSet.FindAsync(id);
        }

        public IQueryable<T> Query(Expression<Func<T, bool>> expression)
        {
            return dbSet.Where(expression);
        }

        public IQueryable<T> Query()
        {
            return dbSet.AsQueryable();
        }

        public void Update(T entity)
        {
            dbSet.Attach(entity);
            context.Entry(entity).State = EntityState.Modified;
        }
    }
}
