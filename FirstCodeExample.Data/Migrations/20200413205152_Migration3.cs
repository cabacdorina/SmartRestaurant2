using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartRestaurant.Data.Migrations
{
    public partial class Migration3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RecipeIngredientPerPiece_IngredientPerPieces_IngredientPerPieceId",
                table: "RecipeIngredientPerPiece");

            migrationBuilder.DropForeignKey(
                name: "FK_RecipeIngredientPerPiece_Recipes_RecipeId",
                table: "RecipeIngredientPerPiece");

            migrationBuilder.DropForeignKey(
                name: "FK_RecipeIngredientPerUnit_IngredientPerUnits_IngredientPerUnitId",
                table: "RecipeIngredientPerUnit");

            migrationBuilder.DropForeignKey(
                name: "FK_RecipeIngredientPerUnit_Recipes_RecipeId",
                table: "RecipeIngredientPerUnit");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RecipeIngredientPerUnit",
                table: "RecipeIngredientPerUnit");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RecipeIngredientPerPiece",
                table: "RecipeIngredientPerPiece");

            migrationBuilder.RenameTable(
                name: "RecipeIngredientPerUnit",
                newName: "RecipeIngredientPerUnits");

            migrationBuilder.RenameTable(
                name: "RecipeIngredientPerPiece",
                newName: "RecipeIngredientPerPieces");

            migrationBuilder.RenameIndex(
                name: "IX_RecipeIngredientPerUnit_RecipeId",
                table: "RecipeIngredientPerUnits",
                newName: "IX_RecipeIngredientPerUnits_RecipeId");

            migrationBuilder.RenameIndex(
                name: "IX_RecipeIngredientPerPiece_RecipeId",
                table: "RecipeIngredientPerPieces",
                newName: "IX_RecipeIngredientPerPieces_RecipeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RecipeIngredientPerUnits",
                table: "RecipeIngredientPerUnits",
                columns: new[] { "IngredientPerUnitId", "RecipeId" });

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

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeIngredientPerUnits_IngredientPerUnits_IngredientPerUnitId",
                table: "RecipeIngredientPerUnits",
                column: "IngredientPerUnitId",
                principalTable: "IngredientPerUnits",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeIngredientPerUnits_Recipes_RecipeId",
                table: "RecipeIngredientPerUnits",
                column: "RecipeId",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RecipeIngredientPerPieces_IngredientPerPieces_IngredientPerPieceId",
                table: "RecipeIngredientPerPieces");

            migrationBuilder.DropForeignKey(
                name: "FK_RecipeIngredientPerPieces_Recipes_RecipeId",
                table: "RecipeIngredientPerPieces");

            migrationBuilder.DropForeignKey(
                name: "FK_RecipeIngredientPerUnits_IngredientPerUnits_IngredientPerUnitId",
                table: "RecipeIngredientPerUnits");

            migrationBuilder.DropForeignKey(
                name: "FK_RecipeIngredientPerUnits_Recipes_RecipeId",
                table: "RecipeIngredientPerUnits");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RecipeIngredientPerUnits",
                table: "RecipeIngredientPerUnits");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RecipeIngredientPerPieces",
                table: "RecipeIngredientPerPieces");

            migrationBuilder.RenameTable(
                name: "RecipeIngredientPerUnits",
                newName: "RecipeIngredientPerUnit");

            migrationBuilder.RenameTable(
                name: "RecipeIngredientPerPieces",
                newName: "RecipeIngredientPerPiece");

            migrationBuilder.RenameIndex(
                name: "IX_RecipeIngredientPerUnits_RecipeId",
                table: "RecipeIngredientPerUnit",
                newName: "IX_RecipeIngredientPerUnit_RecipeId");

            migrationBuilder.RenameIndex(
                name: "IX_RecipeIngredientPerPieces_RecipeId",
                table: "RecipeIngredientPerPiece",
                newName: "IX_RecipeIngredientPerPiece_RecipeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RecipeIngredientPerUnit",
                table: "RecipeIngredientPerUnit",
                columns: new[] { "IngredientPerUnitId", "RecipeId" });

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

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeIngredientPerUnit_IngredientPerUnits_IngredientPerUnitId",
                table: "RecipeIngredientPerUnit",
                column: "IngredientPerUnitId",
                principalTable: "IngredientPerUnits",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeIngredientPerUnit_Recipes_RecipeId",
                table: "RecipeIngredientPerUnit",
                column: "RecipeId",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
