using SmartRestaurant.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace SmartRestaurant.Data
{
    public class SmartRestaurantContext : DbContext
    {
        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<Command> Commands { get; set; }
        public DbSet<IngredientPerPiece> IngredientPerPieces { get; set; }
        public DbSet<IngredientPerUnit> IngredientPerUnits { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductCommand> ProductCommands { get; set; }

        public SmartRestaurantContext(DbContextOptions<SmartRestaurantContext> options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //modelBuilder.Entity<Product>().HasAlternateKey()

            modelBuilder.Entity<ProductCommand>().HasKey(sc => new { sc.CommandId, sc.ProductId });

            modelBuilder.Entity<ProductCommand>()
                .HasOne<Product>(pc => pc.Product)
                .WithMany(s => s.ProductCommand)
                .HasForeignKey(pc => pc.ProductId);


            modelBuilder.Entity<ProductCommand>()
                .HasOne<Command>(sc => sc.Command)
                .WithMany(s => s.ProductCommand)
                .HasForeignKey(sc => sc.CommandId);

        }
    }
}
