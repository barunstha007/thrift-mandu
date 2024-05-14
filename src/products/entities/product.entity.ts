import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  slug: string;

  @Column('simple-array', { nullable: true, default: [] })
  images: Array<string>;

  @Column({ nullable: false })
  size: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: true })
  quantity: number;

  @Column() // ahile ko lagi rakheko pachi yo relation huncha brand sanga
  brand: string;

  @Column() // ahile ko lagi rakheko pachi yo relation huncha category sanga
  category: string;
}
