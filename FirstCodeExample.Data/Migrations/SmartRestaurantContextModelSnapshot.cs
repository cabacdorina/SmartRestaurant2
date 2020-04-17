﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SmartRestaurant.Data;

namespace SmartRestaurant.Data.Migrations
{
    [DbContext(typeof(SmartRestaurantContext))]
    partial class SmartRestaurantContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("SmartRestaurant.Data.Models.Command", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CommandDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Commands");
                });

            modelBuilder.Entity("SmartRestaurant.Data.Models.IngredientPerPiece", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("NumberOfPieces")
                        .HasColumnType("int");

                    b.Property<int>("NumberOfPiecesReserved")
                        .HasColumnType("int");

                    b.Property<float>("Price")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.ToTable("IngredientPerPieces");
                });

            modelBuilder.Entity("SmartRestaurant.Data.Models.IngredientPerUnit", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(20)")
                        .HasMaxLength(20);

                    b.Property<float>("Price")
                        .HasColumnType("real");

                    b.Property<int>("UnitType")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("IngredientPerUnits");
                });

            modelBuilder.Entity("SmartRestaurant.Data.Models.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Amount")
                        .HasColumnType("int");

                    b.Property<DateTime>("BoughtDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("RecipeId")
                        .HasColumnType("int");

                    b.Property<string>("Type")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("RecipeId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("SmartRestaurant.Data.Models.ProductCommand", b =>
                {
                    b.Property<int>("CommandId")
                        .HasColumnType("int");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.HasKey("CommandId", "ProductId");

                    b.HasIndex("ProductId");

                    b.ToTable("ProductCommands");
                });

            modelBuilder.Entity("SmartRestaurant.Data.Models.Recipe", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Recipes");
                });

            modelBuilder.Entity("SmartRestaurant.Data.Models.RecipeIngredientPerPiece", b =>
                {
                    b.Property<int>("IngredientPerPieceId")
                        .HasColumnType("int");

                    b.Property<int>("RecipeId")
                        .HasColumnType("int");

                    b.HasKey("IngredientPerPieceId", "RecipeId");

                    b.HasIndex("RecipeId");

                    b.ToTable("RecipeIngredientPerPieces");
                });

            modelBuilder.Entity("SmartRestaurant.Data.Models.RecipeIngredientPerUnit", b =>
                {
                    b.Property<int>("IngredientPerUnitId")
                        .HasColumnType("int");

                    b.Property<int>("RecipeId")
                        .HasColumnType("int");

                    b.HasKey("IngredientPerUnitId", "RecipeId");

                    b.HasIndex("RecipeId");

                    b.ToTable("RecipeIngredientPerUnits");
                });

            modelBuilder.Entity("SmartRestaurant.Data.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("SmartRestaurant.Data.Models.Product", b =>
                {
                    b.HasOne("SmartRestaurant.Data.Models.Recipe", "Recipe")
                        .WithMany()
                        .HasForeignKey("RecipeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SmartRestaurant.Data.Models.ProductCommand", b =>
                {
                    b.HasOne("SmartRestaurant.Data.Models.Command", "Command")
                        .WithMany("ProductCommand")
                        .HasForeignKey("CommandId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SmartRestaurant.Data.Models.Product", "Product")
                        .WithMany("ProductCommand")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SmartRestaurant.Data.Models.RecipeIngredientPerPiece", b =>
                {
                    b.HasOne("SmartRestaurant.Data.Models.IngredientPerPiece", "IngredientPerPiece")
                        .WithMany("RecipeIngredientPerPiece")
                        .HasForeignKey("IngredientPerPieceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SmartRestaurant.Data.Models.Recipe", "Recipe")
                        .WithMany("RecipeIngredientPerPiece")
                        .HasForeignKey("RecipeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SmartRestaurant.Data.Models.RecipeIngredientPerUnit", b =>
                {
                    b.HasOne("SmartRestaurant.Data.Models.IngredientPerUnit", "IngredientPerUnit")
                        .WithMany("RecipeIngredientPerUnit")
                        .HasForeignKey("IngredientPerUnitId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SmartRestaurant.Data.Models.Recipe", "Recipe")
                        .WithMany("RecipeIngredientPerUnit")
                        .HasForeignKey("RecipeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
