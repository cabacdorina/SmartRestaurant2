using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartRestaurant.Data.Migrations
{
    public partial class Migration3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Amount",
                table: "Products",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "BoughtDate",
                table: "Products",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Products",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Products",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "RecipeId",
                table: "Products",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Products",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Products_RecipeId",
                table: "Products",
                column: "RecipeId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Recipes_RecipeId",
                table: "Products",
                column: "RecipeId",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Recipes_RecipeId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_RecipeId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Amount",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "BoughtDate",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "RecipeId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Products");
        }
    }
}
