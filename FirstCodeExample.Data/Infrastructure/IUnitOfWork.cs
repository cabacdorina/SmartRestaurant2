using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SmartRestaurant.Data.Infrastructure
{
    public interface IUnitOfWork
    {
        Task<int> Commit();
    }
}
