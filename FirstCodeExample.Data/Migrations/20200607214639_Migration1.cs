﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartRestaurant.Data.Migrations
{
    public partial class Migration1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "IngredientPerPieces",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: false),
                    Price = table.Column<float>(nullable: false),
                    NumberOfPiecesReserved = table.Column<int>(nullable: false),
                    NumberOfPieces = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IngredientPerPieces", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "IngredientPerUnits",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Price = table.Column<float>(nullable: false),
                    UnitType = table.Column<int>(nullable: false),
                    Quantity = table.Column<float>(nullable: false),
                    QuantityReserved = table.Column<float>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IngredientPerUnits", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Recipes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recipes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    Type = table.Column<int>(nullable: false),
                    PhoneNumber = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Price = table.Column<decimal>(nullable: false),
                    Amount = table.Column<int>(nullable: false),
                    AmountReserved = table.Column<int>(nullable: false),
                    FoodType = table.Column<int>(nullable: false),
                    ImageUrl = table.Column<string>(nullable: true),
                    BoughtDate = table.Column<DateTime>(nullable: false),
                    RecipeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Products_Recipes_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RecipeIngredientPerPieces",
                columns: table => new
                {
                    RecipeId = table.Column<int>(nullable: false),
                    IngredientPerPieceId = table.Column<int>(nullable: false),
                    NumberOfPieces = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecipeIngredientPerPieces", x => new { x.IngredientPerPieceId, x.RecipeId });
                    table.ForeignKey(
                        name: "FK_RecipeIngredientPerPieces_IngredientPerPieces_IngredientPerPieceId",
                        column: x => x.IngredientPerPieceId,
                        principalTable: "IngredientPerPieces",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RecipeIngredientPerPieces_Recipes_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RecipeIngredientPerUnits",
                columns: table => new
                {
                    RecipeId = table.Column<int>(nullable: false),
                    IngredientPerUnitId = table.Column<int>(nullable: false),
                    Quantity = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecipeIngredientPerUnits", x => new { x.IngredientPerUnitId, x.RecipeId });
                    table.ForeignKey(
                        name: "FK_RecipeIngredientPerUnits_IngredientPerUnits_IngredientPerUnitId",
                        column: x => x.IngredientPerUnitId,
                        principalTable: "IngredientPerUnits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RecipeIngredientPerUnits_Recipes_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Products_RecipeId",
                table: "Products",
                column: "RecipeId");

            migrationBuilder.CreateIndex(
                name: "IX_RecipeIngredientPerPieces_RecipeId",
                table: "RecipeIngredientPerPieces",
                column: "RecipeId");

            migrationBuilder.CreateIndex(
                name: "IX_RecipeIngredientPerUnits_RecipeId",
                table: "RecipeIngredientPerUnits",
                column: "RecipeId");

            migrationBuilder.CreateIndex(
                name: "IX_Recipes_Name",
                table: "Recipes",
                column: "Name",
                unique: true,
                filter: "[Name] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "RecipeIngredientPerPieces");

            migrationBuilder.DropTable(
                name: "RecipeIngredientPerUnits");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "IngredientPerPieces");

            migrationBuilder.DropTable(
                name: "IngredientPerUnits");

            migrationBuilder.DropTable(
                name: "Recipes");
        }
    }
}
