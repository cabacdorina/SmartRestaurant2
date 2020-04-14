using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartRestaurant.Data.Migrations
{
    public partial class Migration2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RecipeIngredientPerPieces_IngredientPerPieces_IngredientPerPieceId",
                table: "RecipeIngredientPerPieces");

            migrationBuilder.DropForeignKey(
                name: "FK_RecipeIngredientPerPieces_Recipes_RecipeId",
                table: "RecipeIngredientPerPieces");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RecipeIngredientPerPieces",
                table: "RecipeIngredientPerPieces");

            migrationBuilder.RenameTable(
                name: "RecipeIngredientPerPieces",
                newName: "RecipeIngredientPerPiece");

            migrationBuilder.RenameIndex(
                name: "IX_RecipeIngredientPerPieces_RecipeId",
                table: "RecipeIngredientPerPiece",
                newName: "IX_RecipeIngredientPerPiece_RecipeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RecipeIngredientPerPiece",
                table: "RecipeIngredientPerPiece",
                columns: new[] { "IngredientPerPieceId", "RecipeId" });

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeIngredientPerPiece_IngredientPerPieces_IngredientPerPieceId",
                table: "RecipeIngredientPerPiece",
                column: "IngredientPerPieceId",
                principalTable: "IngredientPerPieces",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeIngredientPerPiece_Recipes_RecipeId",
                table: "RecipeIngredientPerPiece",
                column: "RecipeId",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RecipeIngredientPerPiece_IngredientPerPieces_IngredientPerPieceId",
                table: "RecipeIngredientPerPiece");

            migrationBuilder.DropForeignKey(
                name: "FK_RecipeIngredientPerPiece_Recipes_RecipeId",
                table: "RecipeIngredientPerPiece");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RecipeIngredientPerPiece",
                table: "RecipeIngredientPerPiece");

            migrationBuilder.RenameTable(
                name: "RecipeIngredientPerPiece",
                newName: "RecipeIngredientPerPieces");

            migrationBuilder.RenameIndex(
                name: "IX_RecipeIngredientPerPiece_RecipeId",
                table: "RecipeIngredientPerPieces",
                newName: "IX_RecipeIngredientPerPieces_RecipeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RecipeIngredientPerPieces",
                table: "RecipeIngredientPerPieces",
                columns: new[] { "IngredientPerPieceId", "RecipeId" });

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeIngredientPerPieces_IngredientPerPieces_IngredientPerPieceId",
                table: "RecipeIngredientPerPieces",
                column: "IngredientPerPieceId",
                principalTable: "IngredientPerPieces",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeIngredientPerPieces_Recipes_RecipeId",
                table: "RecipeIngredientPerPieces",
                column: "RecipeId",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
