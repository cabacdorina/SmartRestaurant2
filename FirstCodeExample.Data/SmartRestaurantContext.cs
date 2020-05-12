using SmartRestaurant.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace SmartRestaurant.Data
{
    public class SmartRestaurantContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<Command> Commands { get; set; }
        public DbSet<IngredientPerPiece> IngredientPerPieces { get; set; }
        public DbSet<IngredientPerUnit> IngredientPerUnits { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductCommand> ProductCommands { get; set; }
        public DbSet<RecipeIngredientPerPiece> RecipeIngredientPerPieces { get; set; }
        public DbSet<RecipeIngredientPerUnit> RecipeIngredientPerUnits { get; set; }


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

            modelBuilder.Entity<Recipe>().HasIndex(r => r.Name).IsUnique();

            modelBuilder.Entity<ProductCommand>().HasKey(sc => new { sc.CommandId, sc.ProductId });

            modelBuilder.Entity<ProductCommand>()
                .HasOne<Product>(pc => pc.Product)
                .WithMany(s => s.ProductCommand)
                .HasForeignKey(pc => pc.ProductId);


            modelBuilder.Entity<ProductCommand>()
                .HasOne<Command>(sc => sc.Command)
                .WithMany(s => s.ProductCommand)
                .HasForeignKey(sc => sc.CommandId);

            modelBuilder.Entity<RecipeIngredientPerPiece>().HasKey(x => new { x.IngredientPerPieceId, x.RecipeId });

            modelBuilder.Entity<RecipeIngredientPerPiece>()
                .HasOne<Recipe>(r => r.Recipe)
                .WithMany(i => i.RecipeIngredientPerPiece)
                .HasForeignKey(f => f.RecipeId);

            modelBuilder.Entity<RecipeIngredientPerPiece>()
                .HasOne<IngredientPerPiece>(ri => ri.IngredientPerPiece)
                .WithMany(r => r.RecipeIngredientPerPiece)
                .HasForeignKey(f => f.IngredientPerPieceId);
            


            modelBuilder.Entity<RecipeIngredientPerUnit>().HasKey(x => new { x.IngredientPerUnitId, x.RecipeId });

            modelBuilder.Entity<RecipeIngredientPerUnit>()
                .HasOne<Recipe>(r => r.Recipe)
                .WithMany(i => i.RecipeIngredientPerUnit)
                .HasForeignKey(f => f.RecipeId);

            modelBuilder.Entity<RecipeIngredientPerUnit>()
                .HasOne<IngredientPerUnit>(ri => ri.IngredientPerUnit)
                .WithMany(r => r.RecipeIngredientPerUnit)
                .HasForeignKey(f => f.IngredientPerUnitId);
        }
    }
}
