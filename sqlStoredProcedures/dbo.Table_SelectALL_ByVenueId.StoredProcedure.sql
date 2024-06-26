
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*=================================
Author: Victor
Create date: 04-15-2024
Description: Select paginated elements by VenueId.
Code Reviewer:Keysis

MODIFIED BY: Victor Martinez
MODIFIED DATE: 4/24/24
Code Reviewer: Keysis Gonzalez
Note: Added the Price coloumn
==================================*/
CREATE proc [dbo].[Table_SelectALL_ByVenueId]
									@PageIndex int
								   ,@PageSize int
								   ,@VenueId int

as

/*
						Declare	 @PageIndex int = 0
								,@PageSize int = 10
								,@VenueId int = 2

		Execute dbo.[Table_SelectALL_ByVenueId]
											@PageIndex
										   ,@PageSize
										   ,@VenueId
*/

BEGIN
		Declare @offset int = @PageIndex * @PageSize

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
					,TotalCount = COUNT(1) OVER()
				FROM [dbo].[Table] as t join dbo.BookingStatus as bs
						on t.StatusTypeId = bs.id join dbo.Venues as v
							on v.id = t.VenueId

				Where VenueId = @VenueId
				ORDER BY t.Id

				OFFSET @offSet Rows
		Fetch Next @PageSize Rows ONLY
		
End


GO
