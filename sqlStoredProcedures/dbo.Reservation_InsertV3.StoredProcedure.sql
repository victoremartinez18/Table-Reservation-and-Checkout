
CREATE PROC [dbo].[Reservation_InsertV3]
					 @CouponCode nvarchar(50)
					,@DiscountValue decimal(18,2)
					,@Total decimal(18,2)
					,@ChargeId nvarchar(200)
					,@PaymentAccountId int
					,@BillingAddressId int
					,@CreatedBy int
					,@TableId int
					,@BookingStatusId int
					,@Id int OUTPUT
					,@BatchReservationItems as dbo.BatchReservationItems READONLY

/*
					Declare	 @CouponCode nvarchar(50) = 'TESTCOUPON4'
							,@DiscountValue decimal(18,2) = 15
							,@Total decimal(18,2) = 12.18
							,@ChargeId nvarchar(200) = 'chargeIdTest'
							,@PaymentAccountId int = 44
							,@BillingAddressId int = 1
							,@CreatedBy int = 1
							,@TableId int = 2
							,@BookingStatusId int = 3
							,@Id int = 0
							,@BatchReservationItems dbo.BatchReservationItems


			INSERT INTO dbo.ReservationItem 
							(UserId
							,TableId
							,[Start]
							,[End]
							,CreatedBy
							,ModifiedBy)

					Values  (1
							,3
							,'2024-04-20'
							,'2024-04-21'
							,1
							,1)


		Execute [dbo].[Reservation_InsertV3]
							 @CouponCode
							,@DiscountValue
							,@Total 
							,@ChargeId 
							,@PaymentAccountId 
							,@BillingAddressId 
							,@CreatedBy 
							,@TableId 
							,@BookingStatusId
							,@Id OUTPUT
							,@BatchReservationItems
*/

as

BEGIN

	   INSERT INTO [dbo].[Reservation]
						([CouponCode]
						,[DiscountValue]
						,[Total]
						,[ChargeId]
						,[PaymentAccountId]
						,[BillingAddressId]
						,[CreatedBy]
						,[ModifiedBy]
						,[TableId]
						,[BookingStatusId])
					VALUES
						(@CouponCode
						,@DiscountValue
						,@Total 
						,@ChargeId 
						,@PaymentAccountId 
						,@BillingAddressId 
						,@CreatedBy 
						,@CreatedBy 
						,@TableId 
						,@BookingStatusId)

		SET @Id = SCOPE_IDENTITY()

		INSERT INTO dbo.ReservationItem 
					(UserId
					,TableId
					,[Start]
					,[End]
					,CreatedBy
					,ModifiedBy)
		
				Select UserId
					  ,TableId
					  ,[Start]
					  ,[End]
					  ,CreatedBy
					  ,ModifiedBy 
				FROM @BatchReservationItems

END
