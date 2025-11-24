import { Categoria } from "src/categorias/entities/categoria.entity"
import { Imgproducto } from "src/imgproductos/entities/imgproducto.entity"
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
@Entity()
export class Producto {
    @PrimaryGeneratedColumn()
    id:number
    @Column({type:'varchar',length:150})
    nombre:string
    @Column({type:'char',length:6,unique:true})
    sku:string
    @Column({type:'integer',default:0})
    cantidad:number
    @Column({type:'numeric',precision:10,scale:2})
    precio:number

    @Column({name:'categoria_id'})
    categoriaId:number

    @ManyToOne(()=>Categoria,(categoria)=>categoria.productos,{
        nullable:false,
        onDelete:'RESTRICT'
    })
    @JoinColumn({name:'categoria_id'})
    categoria:Categoria

    @OneToMany(()=>Imgproducto,(img)=>img.producto,{
        cascade:true
    })
    imagenes:Imgproducto[];
}
