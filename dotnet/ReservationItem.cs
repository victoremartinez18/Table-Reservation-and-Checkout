using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Reservations
{
    public class ReservationItem
    {
        public int Id { get; set; }
        public BaseUser UserId { get; set; }
        public LookUp Table { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public DateTime DateAdded { get; set; }
        public DateTime DateModified { get; set; }
        public BaseUser CreatedBy { get; set; }
        public BaseUser ModifiedBy { get; set; }
    }
}
