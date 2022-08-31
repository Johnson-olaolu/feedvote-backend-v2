import { CustomRepository } from 'src/config/db/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';

@CustomRepository(Company)
export class CompanyRepository extends Repository<Company> {}
