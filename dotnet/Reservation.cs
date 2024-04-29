using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Reservations
{
    public class Reservation
    {
        public int Id { get; set; }
        public string CouponCode { get; set; }
        public decimal DiscountValue { get; set; }
        public decimal Total { get; set; }
        public string ChargeId { get; set; }
        public int PaymentAccountId { get; set; }
        public int BillingAddressId { get; set; }
        public LookUp Table { get; set; }
        public LookUp BookingStatus { get; set; }
        public BaseUser CreatedBy { get; set; }
        public BaseUser ModifiedBy { get; set; }
    }
}
