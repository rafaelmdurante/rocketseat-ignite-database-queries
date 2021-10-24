import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM
    const user = await this.repository.createQueryBuilder('user')
      .leftJoinAndSelect('user.games', 'game')
      .where('user.id = :id', { id: user_id })
      .getOne()

    return user
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query(
      `SELECT * FROM users ORDER BY first_name ASC`
    ); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query(
      'SELECT * FROM users AS u WHERE LOWER(u.first_name) = $1 AND LOWER(u.last_name) = $2',
      [ first_name.toLowerCase(), last_name.toLowerCase() ]
    ); 
  }
}
