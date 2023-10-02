import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction.schema';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async create(@Body() data: Partial<Transaction>) {
    return this.transactionsService.createTransaction(data);
  }

  @Patch('restore')
  restorePurchase(
    @Body('userId') userId: string,
    @Body('productId') productId: string,
  ) {
    return this.transactionsService.restorePurchase(userId, productId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: Partial<Transaction>) {
    return this.transactionsService.updateTransaction(id, data);
  }

  @Get('user/:userId')
  async getTransactionsByUserId(@Param('userId') userId: string) {
    return this.transactionsService.findByUserId(userId);
  }
}
