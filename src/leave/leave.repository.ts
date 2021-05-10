import { EntityRepository, getConnection, Repository } from 'typeorm';
import { Leave } from 'src/leave/leave.entity';

@EntityRepository(Leave)
export class LeaveRepository extends Repository<Leave> {
  async recordLeave(leaveDetails: Leave) {
    const leave = await getConnection()
      .getRepository(Leave)
      .insert(leaveDetails);
    return leave;
  }
}
