--insert into IngredientPerPieces values ('ingredientPiece1',7.8, 0, 10);
--insert into IngredientPerUnits values ('ingredientUnit1',7,  1);
--insert into Recipes values('recipe1');
--insert into RecipeIngredientPerPiece values(1,1);
--insert into RecipeIngredientPerUnit values(1,1);
--insert into Products values('ciocolate',7.4,40,1,'empty','2018-03-29T13:34:00.000',1);
--ctr+k+c  -> ctr+k+u

select * from  IngredientPerPieces;
select * from  IngredientPerUnits;
select * from RecipeIngredientPerPieces;

-- ingredientele unei retete (cantitate)
select u.Name, u.UnitType, u.Quantity from Recipes r join RecipeIngredientPerUnits ru on r.Id=ru.RecipeId
		join IngredientPerUnits u on  ru.IngredientPerUnitId = u.Id 
		where r.Id =12;

-- ingredientele unei retete (BUCATI)
select p.Name, p.NumberOfPieces from Recipes r join RecipeIngredientPerPieces rp on r.Id=rp.RecipeId
		join IngredientPerPieces p on  rp.IngredientPerPieceId = p.Id 
		where r.Id =12;