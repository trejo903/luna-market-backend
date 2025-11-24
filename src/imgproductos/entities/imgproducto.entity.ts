import { Producto } from "src/productos/entities/producto.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Imgproducto {
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'varchar',length:255})
    url:string

    @Column({type:'boolean',default:false})
    principal:boolean

    @Column({type:'integer',default:0})
    order:number

    @Column({name:'producto_id'})
    productoId:number

    @ManyToOne(()=>Producto,(producto)=>producto.imagenes,{
        nullable:false,
        onDelete:'CASCADE'
    })
    @JoinColumn({name:'producto_id'})
    producto:Producto

    @CreateDateColumn({name:'created_at'})
    createdAt:Date
}
