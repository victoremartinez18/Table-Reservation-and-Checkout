
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*=================================
Author: Victor
Create date: 04-15-2024
Description: Select element by Id.
Code Reviewer:Keysis

MODIFIED BY: Victor Martinez
MODIFIED DATE: 4/24/24
Code Reviewer: Keysis Gonzalez
Note: Added the Price coloumn
==================================*/
CREATE proc [dbo].[Table_Select_ById]
							@Id int

as

/*
						Declare	@Id int = 3

				Execute dbo.[Table_Select_ById]
										   @Id
*/

BEGIN
			  SELECT t.[Id]
					,t.[Name]
					,[VenueId]
					,v.Name as VenueName
					,[AdMainImage]
					,[Capacity]
					,[Price]
					,[StatusTypeId]
					,bs.Name as BookingStatus
					,t.[DateCreated]
					,t.[DateModified]
					,dbo.fn_GetUserJSON(t.CreatedBy) as [CreatedBy]
					,dbo.fn_GetUserJSON(t.ModifiedBy) as [ModifiedBy]
				FROM [dbo].[Table] as t join dbo.BookingStatus as bs
						on t.StatusTypeId = bs.id join dbo.Venues as v
							on v.id = t.VenueId
				Where t.id = @Id
End


GO
