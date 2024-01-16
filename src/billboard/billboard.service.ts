import { Injectable } from '@nestjs/common';
import { CreateBillboardDto } from './dto/create-billboard.dto';
import { UpdateBillboardDto } from './dto/update-billboard.dto';
import { BillboardRepository } from './models/billboard.model';

@Injectable()
export class BillboardService {
  constructor(private readonly billboardRepository: BillboardRepository) {}
  create(createBillboardDto: CreateBillboardDto) {
    return this.billboardRepository.create(createBillboardDto);
  }

  findAll() {
    return this.billboardRepository.find({});
  }

  findOne(id: string) {
    return this.billboardRepository.findById(id);
  }

  update(id: string, updateBillboardDto: UpdateBillboardDto) {
    return this.billboardRepository.findByIdAndUpdate(id, updateBillboardDto);
  }

  remove(id: string) {
    return this.billboardRepository.findByIdAndDelete(id);
  }
}
