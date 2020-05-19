using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace SmartRestaurant.Data
{
    public class SmartRestaurantContextFactory : IDesignTimeDbContextFactory<SmartRestaurantContext>
    {
        public SmartRestaurantContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<SmartRestaurantContext>();
            optionsBuilder.UseSqlServer("Server=DESKTOP-BB3STTJ\\SQLEXPRESS;Database=SmartRestaurant;User Id=dorina;Integrated Security=false;Trusted_Connection=false; password=password");
            //optionsBuilder.UseSqlServer("Server=DESKTOP-4FMT0IA\\SQLEXPRESS;Database=BlogDatabase;User Id=steven;Integrated Security=false;Trusted_Connection=false; password=password");
            //SqlConnection con = new SqlConnection("Server=localhost,Authentication=Windows Authentication, Database=employeedetails");
            return new SmartRestaurantContext(optionsBuilder.Options);
        }
    }
}
