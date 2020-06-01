using Microsoft.EntityFrameworkCore;
using Omu.ValueInjecter;
using SmartRestaurant.Data.Infrastructure;
using SmartRestaurant.Data.Models;
using SmartRestaurant.Services.CommandService.CommandDTO;
using SmartRestaurant.Services.ProductServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartRestaurant.Services.CommandServices
{
    public class CommandService : ICommandService
    {
        private readonly IRepository<Command> _commandRepo;
        private readonly IRepository<ProductCommand> _productCommandRepo;
        private readonly IUnitOfWork _unitOfWork;

        private readonly IProductService _prodService;
        public CommandService(IRepository<Command> commandRepo,
            IRepository<ProductCommand> productCommandRepo,
            IUnitOfWork unitOfWork,
            IProductService prodService
            )
        {
            _commandRepo = commandRepo;
            _productCommandRepo = productCommandRepo;
            _unitOfWork = unitOfWork;
            _prodService = prodService;
        }

        public async Task<int> Create(CommandDto commandDto)
        {            
            var command = new Command
            {
                Name = commandDto.Name,
                CommandDate = DateTime.Now
            };
            await _commandRepo.Add(command);
            await _unitOfWork.Commit();

            foreach (var prodCommand in commandDto.ProdList)
            {
                await _productCommandRepo.Add(new ProductCommand
                {
                    ProductId = prodCommand.ProductId,
                    CommandId = command.Id
                });
                await _unitOfWork.Commit();

                var product = await _prodService.GetById(prodCommand.ProductId);
                product.AmountReserved += prodCommand.AmountReserved;
                await _prodService.Update(product);
                await _unitOfWork.Commit();
            }

            return command.Id;
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
