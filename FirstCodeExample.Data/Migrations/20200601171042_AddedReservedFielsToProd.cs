using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartRestaurant.Data.Migrations
{
    public partial class AddedReservedFielsToProd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AmountReserved",
                table: "Products",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AmountReserved",
                table: "Products");
        }
    }
}
