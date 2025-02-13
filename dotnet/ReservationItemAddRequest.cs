
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
