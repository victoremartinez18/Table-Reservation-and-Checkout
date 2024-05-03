using Sabio.Data.Providers;
using Sabio.Models.Domain.Reservations;
using Sabio.Models;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Data;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Tables;
using Sabio.Models.Requests.Reservations;
using Stripe.Forwarding;

namespace Sabio.Services
{
    public class ReservationItemService : IReservationItemService
    {
        IDataProvider _data = null;
        ILookUpService _lookUpService = null;

        public ReservationItemService(IDataProvider data, ILookUpService lookUpService)
        {
            _data = data;
            _lookUpService = lookUpService;
        }

        #region ADD
        public int Add(ReservationItemAddRequest model, int createdBy)
        {
            int id = 0;

            string procName = "[dbo].[ReservationItem_Insert]";

            _data.ExecuteNonQuery(procName,
                delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);

                    col.AddWithValue("@CreatedBy", createdBy);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    col.Add(idOut);

                }, delegate (SqlParameterCollection col)
                {
                    object idObj = col["@Id"].Value;
                    int.TryParse(idObj.ToString(), out id);
                }
                );

            return id;
        }
        #endregion

        #region UPDATE
        public void Update(ReservationItemUpdateRequest model, int modifiedBy)
        {
            string procName = "[dbo].[ReservationItem_Update]";

            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@ModifiedBy", modifiedBy);
                col.AddWithValue("@Id", model.Id);
            }, returnParameters: null);
        }
        #endregion

        #region GET ALL PAGINATED   
        public Paged<ReservationItem> GetAll(int pageIndex, int pageSize)
        {
            string procName = "[dbo].[ReservationItem_SelectAll]";
            List<ReservationItem> reservationItems = null;
            Paged<ReservationItem> paged = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName,
                delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);

                }, delegate (IDataReader reader, short set)
                {
                    int index = 0;
                    ReservationItem reservationItem = SingleReservationItemMapper(reader, ref index);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(index++);
                    }

                    if (reservationItems == null)
                    {
                        reservationItems = new List<ReservationItem>();
                    }

                    reservationItems.Add(reservationItem);
                }
                );

            if (reservationItems != null)
            {
                paged = new Paged<ReservationItem>(reservationItems, pageIndex, pageSize, totalCount);
            }

            return paged;
        }
        #endregion

        #region GET BY ID
        public ReservationItem GetById(int id)
        {
            string procName = "[dbo].[ReservationItem_Select_ById]";

            ReservationItem reservation = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            }, delegate (IDataReader reader, short set)
            {
                int index = 0;
                reservation = SingleReservationItemMapper(reader, ref index);

            });

            return reservation;
        }
        #endregion

        #region DELETE BY ID
        public void DeleteById(int id)
        {
            string procName = "[dbo].[ReservationItem_Delete_ById]";

            _data.ExecuteNonQuery(procName,
                delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", id);
                });
        }
        #endregion

        #region SINGLE RESERVATION ITEM MAPPER
        private ReservationItem SingleReservationItemMapper(IDataReader reader, ref int index)
        {
            ReservationItem reservationItem = new ReservationItem();

            reservationItem.Table = new LookUp();

            reservationItem.Id = reader.GetSafeInt32(index++);
            reservationItem.UserId = reader.DeserializeObject<BaseUser>(index++);
            reservationItem.Table = _lookUpService.MapSingleLookUp(reader, ref index);
            reservationItem.Start = reader.GetSafeDateTime(index++);
            reservationItem.End = reader.GetSafeDateTime(index++);
            reservationItem.DateAdded = reader.GetSafeDateTime(index++);
            reservationItem.DateModified = reader.GetSafeDateTime(index++);
            reservationItem.CreatedBy = reader.DeserializeObject<BaseUser>(index++);
            reservationItem.ModifiedBy = reader.DeserializeObject<BaseUser>(index++);
            return reservationItem;
        }
        #endregion

        #region ADD COMMON PARAMS
        private static void AddCommonParams(ReservationItemAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@UserId", model.UserId);
            col.AddWithValue("@TableId", model.TableId);
            col.AddWithValue("@Start", model.Start);
            col.AddWithValue("@End", model.End);
        } 
        #endregion

    }
}
