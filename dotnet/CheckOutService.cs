
{
    public class CheckOutService : ICheckOutService
    {
        public string CreateTestSession(string domain, CheckoutAddRequest model) 
        { 
            
            var options = new SessionCreateOptions
            {

                LineItems = new List<SessionLineItemOptions>
                { 
                  new SessionLineItemOptions
                  {
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                    UnitAmountDecimal = model.Total*100M,
                    Currency = "usd",
                    ProductData = new SessionLineItemPriceDataProductDataOptions
                    {
                        Name = model.Name,
                        Images = new List<string> { model.Image }
                    }
                },
                    Quantity = 1,
                  },
                },
                Mode = "payment",
                

                //For development
                //SuccessUrl = "https://localhost:3000/checkoutSuccess",


                //For live site
                SuccessUrl = domain + "/checkoutSuccess",
            }; 
            
            var service = new SessionService();

            Session session = service.Create(options);

            return session.Id; 
        }
    }
} 
