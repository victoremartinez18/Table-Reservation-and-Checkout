
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Reservation](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[CouponCode] [nvarchar](50) NULL,
	[DiscountValue] [decimal](18, 2) NOT NULL,
	[Total] [decimal](18, 2) NOT NULL,
	[ChargeId] [nvarchar](200) NOT NULL,
	[PaymentAccountId] [int] NOT NULL,
	[BillingAddressId] [int] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[TableId] [int] NOT NULL,
	[BookingStatusId] [int] NOT NULL,
 CONSTRAINT [PK_Reservation] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Reservation]  WITH CHECK ADD  CONSTRAINT [FK_Reservation_BookingStatus] FOREIGN KEY([BookingStatusId])
REFERENCES [dbo].[BookingStatus] ([id])
GO
ALTER TABLE [dbo].[Reservation] CHECK CONSTRAINT [FK_Reservation_BookingStatus]
GO
ALTER TABLE [dbo].[Reservation]  WITH CHECK ADD  CONSTRAINT [FK_Reservation_PaymentAccounts] FOREIGN KEY([PaymentAccountId])
REFERENCES [dbo].[PaymentAccounts] ([Id])
GO
ALTER TABLE [dbo].[Reservation] CHECK CONSTRAINT [FK_Reservation_PaymentAccounts]
GO
ALTER TABLE [dbo].[Reservation]  WITH CHECK ADD  CONSTRAINT [FK_Reservation_Table] FOREIGN KEY([TableId])
REFERENCES [dbo].[Table] ([id])
GO
ALTER TABLE [dbo].[Reservation] CHECK CONSTRAINT [FK_Reservation_Table]
GO
ALTER TABLE [dbo].[Reservation]  WITH CHECK ADD  CONSTRAINT [FK_Reservation_Users] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Reservation] CHECK CONSTRAINT [FK_Reservation_Users]
GO
ALTER TABLE [dbo].[Reservation]  WITH CHECK ADD  CONSTRAINT [FK_Reservation_Users1] FOREIGN KEY([ModifiedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Reservation] CHECK CONSTRAINT [FK_Reservation_Users1]
GO
