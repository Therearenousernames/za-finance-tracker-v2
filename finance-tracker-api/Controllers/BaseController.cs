using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace finance_tracker_api.Controllers
{
    [ApiController]
    public class BaseController : ControllerBase
    {
        protected int GetUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                throw new UnauthorizedAccessException("User not authenticated.");
            return int.Parse(userIdClaim.Value);
        }
    }
}