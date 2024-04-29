using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Reservations
{
    public class ReservationItemAddRequest
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        public int TableId { get; set; }
        [Required]
        public DateTime Start { get; set; }
        [Required]
        public DateTime End { get; set; }
        [Required]
        public int CreatedBy { get; set; }
        [Required]
        public int ModifiedBy { get; set; }
    }
}
