using Omu.ValueInjecter;
using SmartRestaurant.Data.Infrastructure;
using SmartRestaurant.Data.Models;
using SmartRestaurant.Services.CommandService.CommandDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartRestaurant.Services.CommandServices
{
    public class CommandService : ICommandService
    {
        public readonly IRepository<Command> _commandRepo;
        public readonly IUnitOfWork _unitOfWork;

        public CommandService(IRepository<Command> commandRepo, IUnitOfWork unitOfWork)
        {
            _commandRepo = commandRepo;
            _unitOfWork = unitOfWork;
        }
        public async Task<Command> Create(CommandDto commandDto)
        {
            var command = new Command().InjectFrom(commandDto) as Command;
            await _commandRepo.Add(command);
            await _unitOfWork.Commit();
            return command;
        }

        public async  Task<bool> DeleteById(int commandId)
        {
            var command = await _commandRepo.GetById(commandId);
            if (command == null)
            {
                return false;
            }
            _commandRepo.Delete(command);
            await _unitOfWork.Commit();
            return true;
        }

        public async Task<IEnumerable<CommandDto>> GetAllCommands()
        {
            var commandList = await _commandRepo.GetAll();
            return commandList.Select(c => new CommandDto().InjectFrom(c) as CommandDto);
        }

        public async Task<CommandDto> GetById(int commandId)
        {
            var command=await _commandRepo.GetById(commandId);
            if (command == null)
            {
                return null;
            }
            return new CommandDto().InjectFrom(command) as CommandDto;
        }

        public async Task<bool> Update(CommandDto commandDto, int commandId)
        {
            var command = await _commandRepo.GetById(commandId);
            if (command == null)
            {
                return false;
            }
            command.InjectFrom(commandDto);
            await _unitOfWork.Commit();
            return true;
        }
    }
}
