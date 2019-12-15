import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/img';

    //si no viene image
    if (!img) {
      return url + '/usuarios/imagen-por-defecto';
    }

    //si viene imagen de google
    if (img.indexOf('http') >= 0) {
      return img;
    }

    switch (tipo) {
      case 'usuario':
        url += '/usuarios/' + img;
        break;

      case 'hospital':
        url += '/hospitales/' + img;
        break;
      case 'medico':
        url += '/medicos/' + img;
        break;
      default:
        console.log("el tipo de imagen no existe, solo medico, usaurio,hospital");
        url += 'usuarios/no-existe'

    }

    return url;


    return 'FUNCIONA';
  }

}
