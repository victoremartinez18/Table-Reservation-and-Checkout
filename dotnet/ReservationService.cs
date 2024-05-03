using Sabio.Data.Providers;
using Sabio.Models.Domain.Reservations;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Domain.Tables;
using Sabio.Data;
using Sabio.Models.Domain;
using Sabio.Models;
using Sabio.Models.Requests.Reservations;

namespace Sabio.Services
{
    public class ReservationService : IReservationService
    {
        IDataProvider _data = null;
        ILookUpService _lookUpService = null;

        public ReservationService(IDataProvider data, ILookUpService lookUpService)
        {
            _data = data;
            _lookUpService = lookUpService;
        }

        #region ADD V3 (DataTable)
        public int Add(ReservationAddRequest model, int createdBy)
        {
            int id = 0;
            string procName = "[dbo].[Reservation_InsertV3]";

            DataTable reservationItemsTable = null;

            if (model.BatchReservationItems != null)
            {
                reservationItemsTable = MapItemsToTable(model.BatchReservationItems, createdBy);
            }

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);

                col.AddWithValue("@CreatedBy", createdBy);

                col.AddWithValue("@BatchReservationItems", reservationItemsTable);


                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);

                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);
            },
            returnParameters: delegate (SqlParameterCollection returnCol)
            {
                object outId = returnCol["@Id"].Value;

                int.TryParse(outId.ToString(), out id);
            });

            return id;
        }

        private DataTable MapItemsToTable(List<ReservationItemAddRequest> reservationItems, int createdBy)
        {
            DataTable table = new DataTable();

            table.Columns.Add("UserId", typeof(int));
            table.Columns.Add("TableId", typeof(int));
            table.Columns.Add("Start", typeof(DateTime));
            table.Columns.Add("End", typeof(DateTime));
            table.Columns.Add("CreatedBy", typeof(int));
            table.Columns.Add("ModifiedBy", typeof(int));

            foreach (ReservationItemAddRequest element in reservationItems)
            {
                table.Rows.Add(
                    createdBy
                    , element.TableId
                    , element.Start
                    , element.End
                    , createdBy
                    , createdBy);
            }
            return table;
        }
        #endregion

        #region UPDATE
        public void Update(ReservationUpdateRequest model, int modifiedBy)
        {
            string procName = "[dbo].[Reservation_Update]";

            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@ModifiedBy", modifiedBy);
                col.AddWithValue("@Id", model.Id);
            }, returnParameters: null);
        } 
        #endregion

        #region GET BY ID
        public Reservation GetById(int id)
        {
            string procName = "[dbo].[Reservation_Select_ById]";

            Reservation reservation = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            }, delegate (IDataReader reader, short set)
            {
                int index = 0;
                reservation = SingleReservationMapper(reader, ref index);

            });

            return reservation;
        }
        #endregion

        #region GET ALL PAGINATED   
        public Paged<Reservation> GetAll(int pageIndex, int pageSize)
        {
            string procName = "[dbo].[Reservation_SelectAll]";
            List<Reservation> reservations = null;
            Paged<Reservation> paged = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName,
                delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);

                }, delegate (IDataReader reader, short set)
                {
                    int index = 0;
                    Reservation reservation = SingleReservationMapper(reader, ref index);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(index++);
                    }

                    if (reservations == null)
                    {
                        reservations = new List<Reservation>();
                    }

                    reservations.Add(reservation);
                }
                );

            if (reservations != null)
            {
                paged = new Paged<Reservation>(reservations, pageIndex, pageSize, totalCount);
            }

            return paged;
        }
        #endregion

        #region DELETE BY ID
        public void DeleteById(int id)
        {
            string procName = "[dbo].[Reservation_Delete_ById]";

            _data.ExecuteNonQuery(procName,
                delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", id);
                });
        }
        #endregion

        #region SINGLE RESERVATION MAPPER   
        private Reservation SingleReservationMapper(IDataReader reader, ref int index)
        {
            Reservation reservation = new Reservation();

            reservation.BookingStatus = new LookUp();
            reservation.Table = new LookUp();

            reservation.Id = reader.GetSafeInt32(index++);
            reservation.CouponCode = reader.GetSafeString(index++);
            reservation.DiscountValue = reader.GetSafeDecimal(index++);
            reservation.Total = reader.GetSafeDecimal(index++);
            reservation.ChargeId = reader.GetSafeString(index++);
            reservation.PaymentAccountId = reader.GetSafeInt32(index++);
            reservation.BillingAddressId = reader.GetSafeInt32(index++);
            reservation.Table = _lookUpService.MapSingleLookUp(reader, ref index);
            reservation.BookingStatus = _lookUpService.MapSingleLookUp(reader, ref index);
            reservation.CreatedBy = reader.DeserializeObject<BaseUser>(index++);
            reservation.ModifiedBy = reader.DeserializeObject<BaseUser>(index++);

            return reservation;
        }
        #endregion

        #region ADD COMMON PARAMS   
        private static void AddCommonParams(ReservationAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@CouponCode", model.CouponCode);
            col.AddWithValue("@DiscountValue", model.DiscountValue);
            col.AddWithValue("@Total", model.Total);
            col.AddWithValue("@ChargeId", model.ChargeId);
            col.AddWithValue("@PaymentAccountId", model.PaymentAccountId);
            col.AddWithValue("@BillingAddressId", model.BillingAddressId);
            col.AddWithValue("@TableId", model.TableId);
            col.AddWithValue("@BookingStatusId", model.BookingStatusId);
        }
        #endregion
    }
}