
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Victor
-- Create date: 04-15-2024
-- Description: deleted entry by Id.
-- Code Reviewer:Keysis

-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[Table_Delete_ById]
							   @Id int
as

/*
						Declare @Id int = 4
		
		Execute dbo.[Table_Delete_ById]
										@Id
		
*/

BEGIN
			  Delete
			  FROM [dbo].[Table]
			  Where Id = @Id;
End


GO
