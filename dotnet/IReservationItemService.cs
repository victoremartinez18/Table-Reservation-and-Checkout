
{
    public interface IReservationItemService
    {
        Paged<ReservationItem> GetAll(int pageIndex, int pageSize);
        ReservationItem GetById(int id);
        void DeleteById(int id);
        int Add(ReservationItemAddRequest model, int createdBy);
        void Update(ReservationItemUpdateRequest model, int modifiedBy);
    }
}
