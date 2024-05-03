using Sabio.Models;
using Sabio.Models.Domain.Reservations;
using Sabio.Models.Requests.Reservations;

namespace Sabio.Services.Interfaces
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