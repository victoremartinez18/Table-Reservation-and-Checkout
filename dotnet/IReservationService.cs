
{
    public interface IReservationService
    {
        Reservation GetById(int id);
        Paged<Reservation> GetAll(int pageIndex, int pageSize);
        int Add(ReservationAddRequest model, int createdBy);
        void Update(ReservationUpdateRequest model, int modifiedBy);
        void DeleteById(int id);
    }
}
