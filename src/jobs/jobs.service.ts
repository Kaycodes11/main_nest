import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JobModel } from './job.model';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';

interface JobFilters {
  from: string;
  to: string;
  title: string;
  location: string | string[];
  salary: string;
  experience: string;
  workType: string;
  provider: string;
  designation: string;
  pageNo: number;
  pageSize: number;
  orderBy: string;
}

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(JobModel) private jobModel: typeof JobModel,
    private sequelize: Sequelize,
  ) {}

  async fetchJobs<T extends Partial<JobFilters>>(user: any, filterMap: T) {
    console.log('user: ', user);
    console.log('filters: ', filterMap);

    const { orderBy, pageNo, pageSize, ...filters } = <JobFilters>filterMap;

    let whereClauses = {};

    if (filters.title) {
      whereClauses = {
        ...whereClauses,
        title: {
          [Op.iLike]: `%${filters.title}%`,
        },
      };
    }

    // raw query

    // const result = await this.sequelize.query();

    console.log('whereClauses', whereClauses);

    const jobs = await this.jobModel.findAll({
      where: whereClauses,
      order: [['title', orderBy]],
      offset: (pageNo - 1) * pageSize,
      limit: pageSize,

      // distinct: true,
      raw: true,
    });
    return jobs;
  }
}
