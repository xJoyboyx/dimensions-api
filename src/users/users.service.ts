import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
  async deleteById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }
    await this.userModel.findByIdAndDelete(userId).exec();
    return user;
  }
  async findById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }
    return user;
  }
  async create(
    service_type: string,
    external_id: string,
    email?: string,
  ): Promise<User> {
    const existingUser = await this.userModel
      .findOne({
        external_id: external_id,
      })
      .exec();

    if (existingUser) {
      return existingUser;
    }

    const user = new this.userModel({ email, service_type, external_id });
    return user.save();
  }
}
