import Company, { ICompany } from '../models/Company';

export class CompanyService {
    constructor() {
      
    }

    async create(company: ICompany) {
        try {
            let response: ICompany = await Company.create(company);
            return response;
        } catch (error) {
            throw Error('Company with this name already exists');
        }
    }
    
}