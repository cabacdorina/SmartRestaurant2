using SmartRestaurant.Data.Models;
using SmartRestaurant.Services.CommandService.CommandDTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SmartRestaurant.Services.CommandServices
{
    public interface ICommandService
    {
        Task<int> Create(CommandDto command);
        Task<bool> DeleteById(int commandId);
        Task<bool> Update(CommandDto command, int commandId);
        Task<CommandDto> GetById(int commandId);
        Task<IEnumerable<CommandDto>> GetAllCommands();
    }
}
