import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './transaction.schema';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}
  async findByUserId(userId: string): Promise<Transaction[]> {
    return this.transactionModel
      .find({
        userId,
        type: 'purchase',
      })
      .exec();
  }
  async createTransaction(data: Partial<Transaction>): Promise<Transaction> {
    const transaction = new this.transactionModel(data);
    return transaction.save();
  }

  async restorePurchase(
    userId: string,
    productId: string,
  ): Promise<Transaction> {
    const updatedTransaction = await this.transactionModel
      .findOneAndUpdate(
        { userId, productId }, // condiciones de búsqueda
        { $set: { type: 'restore' } }, // operación de actualización
        { new: true }, // opciones: retorna el documento actualizado
      )
      .exec();
    if (!updatedTransaction) {
      throw new NotFoundException(
        `Transacción con productId ${productId} y userId ${userId} no encontrada`,
      );
    }

    return updatedTransaction;
  }
  async updateTransaction(
    id: string,
    data: Partial<Transaction>,
  ): Promise<Transaction> {
    return this.transactionModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }
}
