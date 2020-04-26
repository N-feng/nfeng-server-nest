import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Auth as AuthSchema } from '../../model/auth.model';
import { CreateAuthDto } from '../../dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(AuthSchema) private readonly authModel: ModelType<AuthSchema>) {}

  async find(body) {
    return await this.authModel.find(body)
  }

  async create(body: CreateAuthDto) {
    await this.authModel.create(body)
  }

  async update(id: string, body: CreateAuthDto) {
    return await this.authModel.findByIdAndUpdate({_id: id}, body)
  }

  async delete(id: string) {
    await this.authModel.findByIdAndDelete(id)
  }

  getModel() {
    return this.authModel
  }
}
