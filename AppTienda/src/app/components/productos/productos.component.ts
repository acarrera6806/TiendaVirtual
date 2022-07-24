import { Component, OnInit } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
import { Carrito } from 'src/app/models/Carrito';
import { ProductosService } from 'src/app/services/productos.service';
import { map } from 'rxjs/operators';
import Producto from 'src/app/models/Producto';
import { CarroDeComprasService } from '../../services/carro-de-compras.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos:Producto[] = []
  page_number:number = 1 
  opcion:number = 20
  opciones:number [] = [4,10,20,50,100,200]


/**
 * Constructor de ventana de productos 
 * @param productosService 
 * @param carritoService 
 * @param toastr 
 */
  constructor(private productosService: ProductosService,
    private carritoService:CarroDeComprasService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerProductos()
  }
/**
 * Obtine una lista de los productos disponibles 
 */
  obtenerProductos():void{
    this.productosService.getAll().pipe(
      map(changes =>
        changes.map(c =>
          
          ({ Id: c.payload.doc.id,
            Categoria : c.payload.doc.data()['Categoria'],
            Descripcion : c.payload.doc.data()['Descripcion'],
            Estado: c.payload.doc.data()['Estado'],
            Imagen: c.payload.doc.data()['Imagen'],
            Imagen2: c.payload.doc.data()['Imagen2'],
            Imagen3: c.payload.doc.data()['Imagen3'],
            Nombre: c.payload.doc.data()['Nombre'],
            Oferta: c.payload.doc.data()['Oferta'],
            Precio: c.payload.doc.data()['Precio'],
            Precio_Oferta: c.payload.doc.data()['Precio_Oferta']
          })
        )
      )
    ).subscribe(data => {
      this.productos = data;
      this.productosRespaldo = data;
    });
  }

  productosRespaldo: Producto[] = []
  hayProductos:boolean = true
/**
 * Filtra los productos por categorias 
 * @param query nombre categoria 
 */
  obtenerProductosPorCategorias(query:string){
    let categorias:Producto[];
    if(query == 'Todos'){
      this.productos = this.productosRespaldo
    }else{
      categorias = []
      this.productosRespaldo.forEach(element => {
        if(element.Categoria==query)  
          categorias.push(element)
      });
      this.hayProductos = categorias.length > 0
      this.productos = categorias
    }
  }
/**
 * Agrega el producto al carrito de compras
 * @param producto 
 */
  agregarACarrito(producto:Producto){
    const carrito:Carrito = {
      IdProducto: producto.Id,
      cantidad: 1,
    }
    this.carritoService.agregarProducto(carrito);
    this.toastr.success('Carrito + 1 Item','Producto añadido al carrito!',{
      timeOut:1500,
      closeButton:true
    })
  }

}
