using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Services.Interfaces;
using Sabio.Services;
using Sabio.Models.Domain.Tables;
using Sabio.Models.Domain;
using Sabio.Web.Models.Responses;
using System;
using Sabio.Models.Domain.Reservations;
using Sabio.Web.Controllers;
using Sabio.Models;
using System.Data.SqlClient;
using System.Data;
using Sabio.Models.Requests.Reservations;
using Sabio.Models.Requests.Tables;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/reservation")]
    [ApiController]
    public class ReservationApiController : BaseApiController
    {
        #region SERVICE / AUTH  
        private IReservationService _service = null;
        private IAuthenticationService<int> _authService = null;

        public ReservationApiController(IReservationService service,
            ILogger<ReservationApiController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }
        #endregion

        #region CREATE V3
        [HttpPost]
        public ActionResult<ItemResponse<int>> Add(ReservationAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();

                int id = _service.Add(model, userId);

                ItemResponse<int> response = new ItemResponse<int> { Item = id };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }

            return result;
        } 
        #endregion

        #region UPDATE  
        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(ReservationUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int modifiedBy = _authService.GetCurrentUserId();
                _service.Update(model, modifiedBy);

                response = new SuccessResponse();

            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }


            return StatusCode(code, response);
        }
        #endregion

        #region GET BY ID
        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Reservation>> GetById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Reservation reservation = _service.GetById(id);

                if (reservation == null)
                {
                    code = 404;
                    response = new ErrorResponse("Resource not Found");
                }
                else
                {
                    response = new ItemResponse<Reservation>() { Item = reservation };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
        #endregion

        #region GET ALL (PAGINATED)
        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<Reservation>>> GetAll(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            if (pageIndex >= 0 && pageSize > 0)
            {

                try
                {
                    Paged<Reservation> paged = _service.GetAll(pageIndex, pageSize);

                    if (paged == null || paged?.TotalCount == 0)
                    {
                        code = 404;
                        response = new ErrorResponse("Resource not found.");
                    }
                    else
                    {
                        response = new ItemResponse<Paged<Reservation>> { Item = paged };
                    }
                }
                catch (Exception ex)
                {
                    code = 500;
                    response = new ErrorResponse(ex.Message);
                    base.Logger.LogError(ex.ToString());
                }
            }

            return StatusCode(code, response);
        }
        #endregion

        #region DELETE
        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;

            if (id > 0)
            {
                try
                {
                    _service.DeleteById(id);

                    response = new SuccessResponse();
                }
                catch (Exception ex)
                {
                    code = 500;
                    response = new ErrorResponse(ex.Message);
                    base.Logger.LogError(ex.ToString());
                }
            }
            else
            {
                code = 400;
                response = new ErrorResponse("Bad Request");
            }

            return StatusCode(code, response);
        }
        #endregion
    }
}
