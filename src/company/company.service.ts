import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserRespository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { CompanyRepository } from './company.repository';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private companyRepository: CompanyRepository,
    @InjectRepository(User) private userRepository: UserRespository,
    private userService: UserService,
  ) {}
  async create(createCompanyDto: CreateCompanyDto) {
    const {
      address,
      email,
      logo,
      name,
      user_email,
      user_name,
      user_password,
      user_userName,
    } = createCompanyDto;
    const newUser = await this.userService.createUser({
      email: user_email,
      name: user_name,
      password: user_password,
      role_name: 'Owner',
      userName: user_userName,
    });

    const newCompany = await this.companyRepository.create({
      address: address,
      email: email,
      logo: logo,
      name: name,
      owner: newUser,
      users: [newUser],
    });

    return newCompany;
  }

  async findAll(): Promise<Company[]> {
    const companies = await this.companyRepository.find();
    return companies;
  }

  async findOne(id: number): Promise<Company> {
    const company = await this.companyRepository.findOne({ where: { id } });
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    return company;
  }

  async update(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    const company = await this.companyRepository.findOne({ where: { id } });
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    for (const key in updateCompanyDto) {
      company[key] = updateCompanyDto[key];
    }
    await company.save();
    return company;
  }

  async remove(id: number) {
    const company = await this.companyRepository.findOne({ where: { id } });
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    await this.companyRepository.delete(id);
  }
}
