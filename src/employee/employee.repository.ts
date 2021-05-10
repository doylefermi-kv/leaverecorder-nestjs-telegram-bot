import { Employee } from './employee.entity';
import { EntityRepository, getConnection, Repository } from 'typeorm';
import { Leave } from 'src/leave/leave.entity';

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {
  public async getEmployeeById(employeeId: number) {
    const employee = await getConnection()
      .getRepository(Employee)
      .findOne(employeeId);
    return employee;
  }

  public async getAllEmployees() {
    const employee = await getConnection().getRepository(Employee).find();
    return employee;
  }

  public async getEmployeesByQParams(qParam) {
    const query: string = `SELECT * FROM employees WHERE ` + qParam.toString();

    const employee = await getConnection().getRepository(Employee).query(query);
    return employee;
  }

  public async deleteEmployeeById(employeeId: number) {
    const employee = await getConnection()
      .getRepository(Employee)
      .delete(employeeId);
    return employee;
  }

  public async updateEmployee(employeeDetails: Employee) {
    let employeeRecord = await this.getEmployeeById(employeeDetails.id);

    employeeRecord = {
      id: employeeDetails.id,
      firstName: employeeDetails.firstName
        ? employeeDetails.firstName
        : employeeRecord.firstName,
      lastName: employeeDetails.lastName
        ? employeeDetails.lastName
        : employeeRecord.lastName,
      telegramId: employeeDetails.telegramId
        ? employeeDetails.telegramId
        : employeeRecord.telegramId,
      emailAddress: employeeDetails.emailAddress
        ? employeeDetails.emailAddress
        : employeeRecord.emailAddress,
      gender: employeeDetails.gender
        ? employeeDetails.gender
        : employeeRecord.gender,
      leaves: employeeDetails.leaves
        ? employeeDetails.leaves
        : employeeRecord.leaves,
      createdDate: employeeDetails.createdDate
        ? employeeDetails.createdDate
        : employeeRecord.createdDate,
      updatedDate: employeeDetails.updatedDate
        ? employeeDetails.updatedDate
        : employeeRecord.updatedDate,
    };

    const result = await getConnection()
      .getRepository(Employee)
      .update(employeeRecord.id, employeeRecord);
    return result;
  }

  async createEmployee(employeeDetails: Employee) {
    const employee = await getConnection()
      .getRepository(Employee)
      .insert(employeeDetails);
    return employee;
  }

  public async getEmployeeByTelegramId(telegramId: number) {
    const employee = await getConnection()
      .getRepository(Employee)
      .findOne({ where: { telegramId: telegramId } });
    return employee;
  }
}
