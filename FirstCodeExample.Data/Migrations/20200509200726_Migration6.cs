using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartRestaurant.Data.Migrations
{
    public partial class Migration6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "RecipeIngredientPerUnits",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfPieces",
                table: "RecipeIngredientPerPieces",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "RecipeIngredientPerUnits");

            migrationBuilder.DropColumn(
                name: "NumberOfPieces",
                table: "RecipeIngredientPerPieces");
        }
    }
}
