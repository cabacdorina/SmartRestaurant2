using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SmartRestaurant.Data.Infrastructure
{
    public interface IRepository<T> where T : class
    {
        Task Add(T entity);
        void Update(T entity);
        Task<IEnumerable<T>> GetAll();
        void Delete(T entity);
        IQueryable<T> Query();
		IQueryable<T> Query(Expression<Func<T, bool>> expression);
		Task<T> GetById(int id);
    }
}

