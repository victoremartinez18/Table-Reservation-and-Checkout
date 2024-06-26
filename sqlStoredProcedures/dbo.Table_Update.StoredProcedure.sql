
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*=================================
Author: Victor
Create date: 04-15-2024
Description: Update entry in the Table Table.
Code Reviewer:Keysis

MODIFIED BY: Victor Martinez
MODIFIED DATE: 4/24/24
Code Reviewer: Keysis Gonzalez
Note: Added the Price coloumn
==================================*/

CREATE proc [dbo].[Table_Update]
						 @Name nvarchar(100)
						,@VenueId int
						,@AdMainImage nvarchar(255)
						,@Capacity int
						,@Price decimal(18, 2)
						,@StatusTypeId int
						,@ModifiedBy int
						,@Id int
as

/*
					Declare	 @Name nvarchar(100) = 'Table2'
							,@VenueId int = 1
							,@AdMainImage nvarchar(255) = 'url.com'
							,@Capacity int = 4
							,@Price decimal(18, 2) = 25.49
							,@StatusTypeId int = 3
							,@ModifiedBy int = 1
							,@Id int = 4

			Execute dbo.[Table_Update]
							 @Name
							,@VenueId
							,@AdMainImage
							,@Capacity
							,@Price 
							,@StatusTypeId
							,@ModifiedBy
							,@Id
*/

BEGIN
			 UPDATE [dbo].[Table]
				 SET [Name] = @Name
					,[VenueId] = @VenueId
					,[AdMainImage] = @AdMainImage
					,[Capacity] = @Capacity
					,[Price] = @Price
					,[StatusTypeId] = @StatusTypeId
					,[ModifiedBy] = @ModifiedBy
					,[DateModified] = GETUTCDATE()
			 WHERE Id = @Id;
End


GO
