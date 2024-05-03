using Sabio.Models.Requests;

namespace Sabio.Services
{
    public interface ICheckOutService
    {
        string CreateTestSession(string domain, CheckoutAddRequest model);
    }
}