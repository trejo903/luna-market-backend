import { Producto } from "src/productos/entities/producto.entity"
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
@Entity()
export class Categoria {
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'varchar',length:100})
    nombre:string

    @Column({type:'varchar',length:255,nullable:true})
    img:string

    @Column({type:'boolean',default:true})
    activa:boolean

    @CreateDateColumn({name:'created_at'})
    createdAt:Date

    @UpdateDateColumn({name:'update_at'})
    updatedAt:Date

    @OneToMany(()=>Producto,(producto)=>producto.categoria)
    productos:Producto[]
}
